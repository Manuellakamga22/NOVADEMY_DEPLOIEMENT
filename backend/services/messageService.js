const messageRepository = require("../repositories/messageRepository");
const trialRepository = require("../repositories/trialRequestRepository");

// je récupère les messages entre deux users
exports.getMessagesBetweenUsers = async (senderId, receiverId) => {
  if (!senderId || !receiverId) {
    throw { status: 400, message: "senderId et receiverId obligatoires" };
  }
  return await messageRepository.getMessagesBetweenUsers(senderId, receiverId);
};

const containsForbiddenContact = (text) => {
  if (!text) return false;
  const emailRegex = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i;
  const phoneRegex = /(\+?\d[\d\s.-]{7,}\d)/;
  return emailRegex.test(text) || phoneRegex.test(text);
};

// j'envoie un message
exports.sendMessage = async ({
  sender_id,
  receiver_id,
  content
}) => {
  if (!sender_id || !receiver_id || !content?.trim()) {
    throw { status: 400, message: "Champs obligatoires manquants" };
  }

  const sender  = Number(sender_id);
  const receiver = Number(receiver_id);

  // règle métier : chat autorisé seulement si essai accepté
  const acceptedRelation =
    await trialRepository.hasAcceptedTrialBetweenUsers(sender, receiver) ||
    await trialRepository.hasAcceptedTrialBetweenUsers(receiver, sender);

  if (!acceptedRelation) {
    throw {
      status: 403,
      message: "Le chat est disponible uniquement après acceptation du cours d'essai.",
    };
  }

  // je bloque les coordonnées personnelles
  const blocked = containsForbiddenContact(content);
  const finalContent = blocked
    ? "[Message bloqué : coordonnées interdites]"
    : content;

  const result = await messageRepository.createMessage({
    sender_id,
    receiver_id,
    content: finalContent,
    blocked_content_detected: blocked ? 1 : 0
  });

  return {
    message: blocked
      ? "Message bloqué car il contient des coordonnées."
      : "Message envoyé",
    id: result.insertId,
    blocked_content_detected: blocked
  };
};