const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/reviewController");
const { verifyToken, requireRole } = require("../middleware/authMiddleware");

// Créer un avis (élève)
router.post("/", reviewController.createReview);

// Avis d'un professeur
router.get("/teacher/:id", reviewController.getReviewsByTeacher);

// Admin : tous les avis
router.get(
  "/",
  verifyToken,
  requireRole("admin"),
  reviewController.getAllReviews
);

// Admin : supprimer un avis
router.delete(
  "/:id",
  verifyToken,
  requireRole("admin"),
  reviewController.deleteReview
);

module.exports = router;