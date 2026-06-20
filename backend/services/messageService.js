const messageRepository = require("../repositories/messageRepository");
const trialRepository = require("../repositories/trialRequestRepository");
const notifService = require("./notificationService");
const alertIARepository = require("../repositories/alertIARepository");
const db = require("../db");

// récupère les messages entre deux utilisateurs
exports.getMessagesBetweenUsers = async (senderId, receiverId) => {
  if (!senderId || !receiverId) {
    throw { status: 400, message: "senderId et receiverId obligatoires" };
  }
  return await messageRepository.getMessagesBetweenUsers(senderId, receiverId);
};

// envoie un message
exports.sendMessage = async ({ sender_id, receiver_id, content }) => {
  if (!sender_id || !receiver_id || !content?.trim()) {
    throw { status: 400, message: "Champs obligatoires manquants" };
  }

  const sender = Number(sender_id);
  const receiver = Number(receiver_id);

  // vérifier la relation élève-prof
  const relationOk =
    await trialRepository.hasAcceptedTrialBetweenUsers(sender, receiver) ||
    await trialRepository.hasAcceptedTrialBetweenUsers(receiver, sender);

  if (!relationOk) {
    throw {
      status: 403,
      message: "Le chat est disponible uniquement après acceptation du cours d'essai.",
    };
  }

  // filtre coordonnées
  const emailRegex = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i;
  const telRegex   = /(\+?\d[\d\s.-]{7,}\d)/;
  const hasEmail   = emailRegex.test(content);
  const hasTel     = telRegex.test(content);
  const bloque     = hasEmail || hasTel;
  const contenuFinal = bloque ? "[Message bloqué : coordonnées interdites]" : content;

  const result = await messageRepository.createMessage({
    sender_id,
    receiver_id,
    content: contenuFinal,
    blocked_content_detected: bloque ? 1 : 0,
  });

  // infos users
  let senderInfo   = { prenom: "", nom: "", role: "" };
  let receiverInfo = { prenom: "", nom: "", role: "" };
  try {
    const [userRows] = await db.query(
      `SELECT id, prenom, nom, role FROM users WHERE id IN (?, ?)`,
      [sender, receiver]
    );
    const s = userRows.find(u => u.id === sender);
    const r = userRows.find(u => u.id === receiver);
    if (s) senderInfo   = { prenom: s.prenom || "", nom: s.nom || "", role: s.role || "" };
    if (r) receiverInfo = { prenom: r.prenom || "", nom: r.nom || "", role: r.role || "" };
  } catch { /* on continue même sans les noms */ }

  // si bloqué — on enregistre le log dans MongoDB
  if (bloque) {
    try {
      await alertIARepository.creer({
        sender_id:        sender,
        sender_prenom:    senderInfo.prenom,
        sender_nom:       senderInfo.nom,
        sender_role:      senderInfo.role,
        receiver_id:      receiver,
        receiver_prenom:  receiverInfo.prenom,
        receiver_nom:     receiverInfo.nom,
        contenu_original: content,
        type_detection:   hasEmail && hasTel ? "mixte" : hasEmail ? "email" : "telephone",
      });
    } catch { /* le log est optionnel, le message est déjà traité */ }
  }

  // notif
  if (!bloque) {
    try {
      const nom = `${senderInfo.prenom} ${senderInfo.nom}`.trim();
      await notifService.nouveauMessage({
        user_id: receiver,
        expediteur_nom: nom,
        conversation_id: result.insertId,
      });
    } catch {
      // notif optionnelle
    }
  }

  return {
    message: bloque ? "Message bloqué car il contient des coordonnées." : "Message envoyé",
    id: result.insertId,
    blocked_content_detected: bloque,
  };
};