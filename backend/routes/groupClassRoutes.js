const express = require("express");
const router = express.Router();
const groupClassController = require("../controllers/groupClassController");
const { verifyToken, requireRole } = require("../middleware/authMiddleware");

// Créer une session collective (prof)
router.post(
  "/",
  verifyToken,
  requireRole("teacher"),
  groupClassController.createGroupClass
);

// Sessions d'un prof
router.get(
  "/teacher/:teacherId",
  verifyToken,
  requireRole("teacher"),
  groupClassController.getByTeacher
);

// Sessions ouvertes (élèves)
router.get(
  "/open",
  verifyToken,
  groupClassController.getOpen
);

// Inscrire un élève à une session
router.post(
  "/:groupClassId/enroll",
  verifyToken,
  requireRole("student"),
  groupClassController.enroll
);

// Clore une session (prof)
router.put(
  "/:groupClassId/close",
  verifyToken,
  requireRole("teacher"),
  groupClassController.closeSession
);

// Inscriptions d'un élève
router.get(
  "/student/:studentId",
  verifyToken,
  requireRole("student"),
  groupClassController.getEnrollmentsByStudent
);

// Inscrits d'une session (prof)
router.get(
  "/:groupClassId/enrollments",
  verifyToken,
  requireRole("teacher"),
  groupClassController.getEnrollmentsByClass
);

module.exports = router;