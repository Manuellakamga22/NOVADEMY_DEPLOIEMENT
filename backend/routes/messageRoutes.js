const express = require("express");
const router = express.Router();
const messageController = require("../controllers/messageController");

// récupérer les messages entre deux utilisateurs
router.get("/:senderId/:receiverId", messageController.getMessagesBetweenUsers);

// envoyer un message
router.post("/", messageController.sendMessage);

module.exports = router;