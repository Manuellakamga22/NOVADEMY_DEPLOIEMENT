const service = require("../services/teacherPlanningService");

// crée un créneau
exports.createPlanning = async (req, res) => {
  try {
    const body = {
      ...req.body,
      teacher_id: req.body.teacher_id || req.user?.id,
    };

    const result = await service.createPlanning(body);
    res.status(201).json(result);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message || "Erreur serveur." });
  }
};

// récupère tous les créneaux d'un prof
exports.getPlanningByTeacherId = async (req, res) => {
  try {
    const { teacherId } = req.params;
    const result = await service.getPlanningByTeacherId(teacherId);
    res.status(200).json(result);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message || "Erreur serveur." });
  }
};

// récupère les créneaux d'un prof pour une semaine
// GET /api/teacher-planning/teacher/:teacherId/semaine?debut=2026-05-12&fin=2026-05-18
exports.getPlanningParSemaine = async (req, res) => {
  try {
    const { teacherId } = req.params;
    const { debut, fin } = req.query;
    const result = await service.getPlanningParSemaine(teacherId, debut, fin);
    res.status(200).json(result);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message || "Erreur serveur." });
  }
};

// modifie ou reporte un créneau
exports.updatePlanning = async (req, res) => {
  try {
    const { id } = req.params;
    const body = {
      ...req.body,
      teacher_id: req.body.teacher_id || req.user?.id,
    };

    const result = await service.updatePlanning(id, body);
    res.status(200).json(result);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message || "Erreur serveur." });
  }
};

// désactive un créneau
exports.deactivatePlanning = async (req, res) => {
  try {
    const { id } = req.params;
    const teacherId = req.body.teacher_id || req.user?.id;

    const result = await service.deactivatePlanning(id, teacherId);
    res.status(200).json(result);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message || "Erreur serveur." });
  }
};
