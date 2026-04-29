const express = require("express");
const router = express.Router();
const settingsController = require("../controllers/settingsController");
const { verifyToken, requireRole } = require("../middleware/authMiddleware");

// Lire tous les paramètres (admin)
router.get(
  "/",
  verifyToken,
  requireRole("admin"),
  settingsController.getAll
);

// Mettre à jour les paramètres (admin)
router.put(
  "/",
  verifyToken,
  requireRole("admin"),
  settingsController.updateMany
);

module.exports = router;