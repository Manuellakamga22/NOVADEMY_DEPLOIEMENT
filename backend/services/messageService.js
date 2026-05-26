const messageRepository = require("../repositories/messageRepository");
const trialRepository = require("../repositories/trialRequestRepository");
const notifService = require("./notificationService");
const db = require("../db");

// récupère les messages entre deux utilisateurs
exports.getMessagesBetweenUsers = async (senderId, receiverId) => {
  if (!senderId || !receiverId) {
    throw { status: 400, message: "senderId et receiverId obligatoires" };
  }
  return await messageRepository.getMessagesBetweenUsers(senderId, receiverId);
};

// vérifie si le message contient un email ou un numéro de téléphone
function contientCoordonnees(text) {
  if (!text) return false;
  const email = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i;
  const telephone = /(\+?\d[\d\s.-]{7,}\d)/;
  return email.test(text) || telephone.test(text);
}

// envoie un message
exports.sendMessage = async ({ sender_id, receiver_id, content }) => {
  if (!sender_id || !receiver_id || !content?.trim()) {
    throw { status: 400, message: "Champs obligatoires manquants" };
  }

  const sender = Number(sender_id);
  const receiver = Number(receiver_id);

  // on vérifie qu'un cours d'essai a bien été accepté entre les deux
  const relationOk =
    await trialRepository.hasAcceptedTrialBetweenUsers(sender, receiver) ||
    await trialRepository.hasAcceptedTrialBetweenUsers(receiver, sender);

  if (!relationOk) {
    throw {
      status: 403,
      message: "Le chat est disponible uniquement après acceptation du cours d'essai.",
    };
  }

  // on bloque si le message contient des coordonnées personnelles
  const bloque = contientCoordonnees(content);
  const contenuFinal = bloque ? "[Message bloqué : coordonnées interdites]" : content;

  const result = await messageRepository.createMessage({
    sender_id,
    receiver_id,
    content: contenuFinal,
    blocked_content_detected: bloque ? 1 : 0,
  });

  // on envoie une notification au destinataire (seulement si le message n'est pas bloqué)
  if (!bloque) {
    try {
      const [rows] = await db.query(
        `SELECT prenom, nom FROM users WHERE id = ? LIMIT 1`,
        [sender]
      );

      if (rows.length > 0) {
        const nom = `${rows[0].prenom || ""} ${rows[0].nom || ""}`.trim();
        await notifService.nouveauMessage({
          user_id: receiver,
          expediteur_nom: nom,
          conversation_id: result.insertId,
        });
      }
    } catch {
      // si la notif ne part pas, le message est quand même envoyé
    }
  }

  return {
    message: bloque ? "Message bloqué car il contient des coordonnées." : "Message envoyé",
    id: result.insertId,
    blocked_content_detected: bloque,
  };
};