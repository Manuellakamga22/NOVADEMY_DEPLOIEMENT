const express = require("express");
const router = express.Router();
const controller = require("../controllers/groupClassController");
const { verifyToken, requireRole } = require("../middleware/authMiddleware");

// l'élève crée une session collective
router.post("/", verifyToken, requireRole("student"), controller.createGroupClass);

// le prof répond à une session (accepte / refuse)
router.put("/:groupClassId/repondre", verifyToken, requireRole("teacher"), controller.repondreSession);

// rejoindre une session par son code (élève)
router.post("/code/:code/join", verifyToken, requireRole("student"), controller.joinByCode);

// chercher une session par son code (aperçu avant de rejoindre)
router.get("/code/:code", verifyToken, controller.getByCode);

// sessions d'un prof
router.get("/teacher/:teacherId", verifyToken, requireRole("teacher"), controller.getByTeacher);

// sessions ouvertes (élèves)
router.get("/open", verifyToken, controller.getOpen);

// inscriptions d'un élève
router.get("/student/:studentId", verifyToken, requireRole("student"), controller.getEnrollmentsByStudent);

// clore une session (prof)
router.put("/:groupClassId/close", verifyToken, requireRole("teacher"), controller.closeSession);

// inscrits d'une session (prof)
router.get("/:groupClassId/enrollments", verifyToken, requireRole("teacher"), controller.getEnrollmentsByClass);

// détails invitation MongoDB (participants + statuts) par code
router.get("/code/:code/invitation", verifyToken, controller.getInvitationParCode);

// historique des événements d'une session (MongoDB)
router.get("/:groupClassId/historique", verifyToken, controller.getHistoriqueSession);

module.exports = router;
