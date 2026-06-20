const express = require("express");
const router = express.Router();
const controller = require("../controllers/teacherPlanningController");
const { verifyToken, requireRole } = require("../middleware/authMiddleware");

// créer un créneau
router.post(
  "/",
  verifyToken,
  requireRole("teacher"),
  controller.createPlanning
);

// récupérer les créneaux avec statut réservation (usage élève — TrialRequest)
router.get(
  "/teacher/:teacherId/disponibilites",
  verifyToken,
  controller.getPlanningWithStatus
);

// récupérer tous les créneaux d'un prof
router.get(
  "/teacher/:teacherId",
  verifyToken,
  controller.getPlanningByTeacherId
);

// récupérer les créneaux d'un prof pour une semaine précise
// ?debut=2026-05-12&fin=2026-05-18
router.get(
  "/teacher/:teacherId/semaine",
  verifyToken,
  controller.getPlanningParSemaine
);

// modifier ou reporter un créneau
router.put(
  "/:id",
  verifyToken,
  requireRole("teacher"),
  controller.updatePlanning
);

// désactiver (supprimer) un créneau
router.put(
  "/:id/deactivate",
  verifyToken,
  requireRole("teacher"),
  controller.deactivatePlanning
);

module.exports = router;
