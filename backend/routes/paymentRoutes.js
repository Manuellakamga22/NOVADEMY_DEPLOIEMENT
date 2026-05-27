const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/paymentController");
const { verifyToken, requireRole } = require("../middleware/authMiddleware");

router.get(
  "/",
  verifyToken,
  requireRole("admin"),
  paymentController.getAllPayments
);

router.post(
  "/create-checkout-session",
  verifyToken,
  requireRole("student"),
  paymentController.createCheckoutSession
);

router.post(
  "/confirm/:sessionId",
  verifyToken,
  requireRole("student"),
  paymentController.confirmStripePayment
);

router.post(
  "/",
  verifyToken,
  requireRole("student"),
  paymentController.createPayment
);

router.get(
  "/student/:id",
  verifyToken,
  requireRole("student"),
  paymentController.getPaymentsByStudent
);

router.get(
  "/teacher/:id",
  verifyToken,
  requireRole("teacher"),
  paymentController.getPaymentsByTeacher
);

module.exports = router;