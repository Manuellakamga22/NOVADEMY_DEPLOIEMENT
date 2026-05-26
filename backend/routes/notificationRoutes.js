const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/notificationController");
const { verifyToken } = require("../middleware/authMiddleware");

// toutes les routes nécessitent d'être connecté
router.get("/", verifyToken, ctrl.getMesNotifications);
router.put("/:id/lue", verifyToken, ctrl.marquerLue);
router.put("/toutes/lues", verifyToken, ctrl.marquerToutesLues);
router.delete("/:id", verifyToken, ctrl.supprimer);

module.exports = router;
