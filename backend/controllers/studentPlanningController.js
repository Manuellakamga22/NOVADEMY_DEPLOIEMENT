const studentPlanningService = require("../services/studentPlanningService");

exports.getStudentPlanning = async (req, res) => {
  try {
    const result = await studentPlanningService.getStudentPlanning(req.params.studentId);
    return res.json(result);
  } catch (error) {
    return res.status(error.status || 500).json({
      message: error.message || "Erreur serveur.",
    });
  }
};