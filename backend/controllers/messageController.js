const messageService = require("../services/messageService");
const alertIARepository = require("../repositories/alertIARepository");

exports.getMessagesBetweenUsers = async (req, res) => {
  try {
    const result = await messageService.getMessagesBetweenUsers(
      req.params.senderId,
      req.params.receiverId
    );
    return res.json(result);
  } catch (error) {
    return res.status(error.status || 500).json({
      message: error.message || "Erreur serveur"
    });
  }
};

exports.sendMessage = async (req, res) => {
  try {
    const result = await messageService.sendMessage(req.body);
    return res.status(201).json(result);
  } catch (error) {
    return res.status(error.status || 500).json({
      message: error.message || "Erreur serveur"
    });
  }
};

exports.getAlertesBloquees = async (req, res) => {
  try {
    const alertes = await alertIARepository.getToutes();
    const formatted = alertes.map(a => ({
      id:              a._id,
      sender_id:       a.sender_id,
      sender_prenom:   a.sender_prenom,
      sender_nom:      a.sender_nom,
      sender_role:     a.sender_role,
      receiver_prenom: a.receiver_prenom,
      receiver_nom:    a.receiver_nom,
      content:         a.contenu_original,
      type_detection:  a.type_detection,
      created_at:      a.createdAt,
    }));
    return res.json(formatted);
  } catch (error) {
    return res.status(500).json({ message: "Erreur serveur" });
  }
};