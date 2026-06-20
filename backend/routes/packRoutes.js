const express = require("express");
const router = express.Router();
const packController = require("../controllers/packController");
const { verifyToken, requireRole } = require("../middleware/authMiddleware");

// catalogue des formules (accessible à tous les utilisateurs connectés)
router.get("/catalog", verifyToken, packController.getCatalog);

// proposer une formule - prof
router.post("/propose", verifyToken, requireRole("teacher"), packController.proposeFormula);

// IMPORTANT : /all doit être AVANT /:studentId pour ne pas être capturé par le param
// toutes les formules d'un élève (pour StudentCourses)
router.get(
  "/student/:studentId/all",
  verifyToken,
  requireRole("student"),
  packController.getAllStudentFormulas
);

// formule déjà acceptée d'un élève
router.get(
  "/student/:studentId/accepted",
  verifyToken,
  requireRole("student"),
  packController.getAcceptedFormula
);

// propositions en attente pour un élève
router.get(
  "/student/:studentId",
  verifyToken,
  requireRole("student"),
  packController.getStudentProposals
);

// accepter une formule - élève
router.put("/accept/:id", verifyToken, requireRole("student"), packController.acceptFormula);

// refuser une formule - élève
router.put("/reject/:id", verifyToken, requireRole("student"), packController.rejectFormula);

// récupérer une formule par son id
router.get("/formula/:id", verifyToken, packController.getFormulaById);

module.exports = router;