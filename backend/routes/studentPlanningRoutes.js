const express = require("express");
const router = express.Router();
const studentPlanningController = require("../controllers/studentPlanningController");
const { verifyToken, requireRole } = require("../middleware/authMiddleware");

router.get(
  "/:studentId",
  verifyToken,
  requireRole("student"),
  studentPlanningController.getStudentPlanning
);

module.exports = router;