const express = require("express");
const router = express.Router();
const controller = require("../controllers/teacherPlanningController");

router.post("/", controller.createPlanning);
router.get("/teacher/:teacherId", controller.getPlanningByTeacherId);
router.put("/:id/deactivate", controller.deactivatePlanning);

module.exports = router;