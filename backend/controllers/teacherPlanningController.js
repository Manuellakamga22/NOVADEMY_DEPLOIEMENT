const service = require("../services/teacherPlanningService");

exports.createPlanning = async (req, res) => {
  try {
    const result = await service.createPlanning(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(error.status || 500).json({
      message: error.message || "Erreur serveur.",
    });
  }
};

exports.getPlanningByTeacherId = async (req, res) => {
  try {
    const { teacherId } = req.params;
    const result = await service.getPlanningByTeacherId(teacherId);
    res.status(200).json(result);
  } catch (error) {
    res.status(error.status || 500).json({
      message: error.message || "Erreur serveur.",
    });
  }
};

exports.deactivatePlanning = async (req, res) => {
  try {
    const { id } = req.params;
    const { teacher_id } = req.body;

    const result = await service.deactivatePlanning(id, teacher_id);

    res.status(200).json(result);
  } catch (error) {
    res.status(error.status || 500).json({
      message: error.message || "Erreur serveur.",
    });
  }
};