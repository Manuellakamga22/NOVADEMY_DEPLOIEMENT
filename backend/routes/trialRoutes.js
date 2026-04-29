const express = require("express");
const router = express.Router();
const trialController = require("../controllers/trialController");
const { verifyToken, requireRole } = require("../middleware/authMiddleware");

// Récupérer tous les trials (admin)
router.get(
  "/",
  verifyToken,
  requireRole("admin"),
  trialController.getAllTrials
);

// Créer une demande de cours d'essai
router.post(
  "/",
  verifyToken,
  requireRole("student"),
  trialController.createTrialRequest
);

// Récupérer les demandes d'un professeur
router.get(
  "/teacher/:teacherId",
  verifyToken,
  requireRole("teacher"),
  trialController.getTeacherTrials
);

// Récupérer les demandes d'un élève
router.get(
  "/student/:studentId",
  verifyToken,
  requireRole("student"),
  trialController.getStudentTrials
);

// Mettre à jour le statut (accepter / refuser / reporter)
router.put(
  "/status/:id",
  verifyToken,
  requireRole("teacher"),
  trialController.updateTrialStatus
);

module.exports = router;