const messageService = require("../services/messageService");

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