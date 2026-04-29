const reviewService = require("../services/reviewService");

exports.createReview = async (req, res) => {
  try {
    const result = await reviewService.createReview(req.body);
    return res.status(201).json(result);
  } catch (error) {
    return res.status(error.status || 500).json({ message: error.message || "Erreur serveur" });
  }
};

exports.getReviewsByTeacher = async (req, res) => {
  try {
    const result = await reviewService.getReviewsByTeacher(req.params.id);
    return res.json(result);
  } catch (error) {
    return res.status(error.status || 500).json({ message: error.message || "Erreur serveur" });
  }
};

// Admin : tous les avis
exports.getAllReviews = async (req, res) => {
  try {
    const result = await reviewService.getAllReviews();
    return res.json(result);
  } catch (error) {
    return res.status(error.status || 500).json({ message: error.message || "Erreur serveur" });
  }
};

// Admin : supprimer un avis
exports.deleteReview = async (req, res) => {
  try {
    const result = await reviewService.deleteReview(req.params.id);
    return res.json(result);
  } catch (error) {
    return res.status(error.status || 500).json({ message: error.message || "Erreur serveur" });
  }
};