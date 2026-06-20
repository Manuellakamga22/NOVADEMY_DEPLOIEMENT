const express = require("express");
const router = express.Router();
const messageController = require("../controllers/messageController");
const { verifyToken, requireRole } = require("../middleware/authMiddleware");

// alertes IA — admin uniquement — doit être avant /:senderId/:receiverId
router.get("/admin/bloques", verifyToken, requireRole("admin"), messageController.getAlertesBloquees);

// récupérer les messages entre deux utilisateurs
router.get("/:senderId/:receiverId", messageController.getMessagesBetweenUsers);

// envoyer un message
router.post("/", messageController.sendMessage);

module.exports = router;
