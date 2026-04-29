const express = require("express");
const router  = express.Router();
const paymentController = require("../controllers/paymentController");
const { verifyToken, requireRole } = require("../middleware/authMiddleware");

// Admin : tous les paiements
router.get(
  "/",
  verifyToken,
  requireRole("admin"),
  paymentController.getAllPayments
);

// Enregistrer un paiement
router.post("/", paymentController.createPayment);

// Paiements d'un élève
router.get("/student/:id", paymentController.getPaymentsByStudent);

// Revenus d'un prof
router.get(
  "/teacher/:id",
  verifyToken,
  requireRole("teacher"),
  paymentController.getPaymentsByTeacher
);

module.exports = router;