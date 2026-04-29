const express = require("express");
const router = express.Router();
const announcementController = require("../controllers/announcementController");

// Créer une annonce
router.post("/", announcementController.createAnnouncement);

// Rechercher les annonces actives
router.get("/", announcementController.getActiveAnnouncements);

// Récupérer les annonces d'un professeur
router.get("/teacher/:id", announcementController.getTeacherAnnouncements);

// Récupérer une annonce par id
router.get("/:id", announcementController.getAnnouncementById);

module.exports = router;