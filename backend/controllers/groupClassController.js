const groupClassService = require("../services/groupClassService");

// Créer une session collective
exports.createGroupClass = async (req, res) => {
  try {
    const result = await groupClassService.createGroupClass(req.body);
    return res.status(201).json(result);
  } catch (error) {
    return res.status(error.status || 500).json({ message: error.message || "Erreur serveur" });
  }
};

// Sessions d'un prof
exports.getByTeacher = async (req, res) => {
  try {
    const result = await groupClassService.getByTeacher(req.params.teacherId);
    return res.json(result);
  } catch (error) {
    return res.status(error.status || 500).json({ message: error.message || "Erreur serveur" });
  }
};

// Sessions ouvertes (élèves)
exports.getOpen = async (req, res) => {
  try {
    const result = await groupClassService.getOpen();
    return res.json(result);
  } catch (error) {
    return res.status(error.status || 500).json({ message: error.message || "Erreur serveur" });
  }
};

// Inscrire un élève
exports.enroll = async (req, res) => {
  try {
    const { groupClassId } = req.params;
    const { student_id } = req.body;
    const result = await groupClassService.enroll(groupClassId, student_id);
    return res.status(201).json(result);
  } catch (error) {
    return res.status(error.status || 500).json({ message: error.message || "Erreur serveur" });
  }
};

// Clore une session
exports.closeSession = async (req, res) => {
  try {
    const { groupClassId } = req.params;
    const teacherId = req.user.id;
    const result = await groupClassService.closeSession(groupClassId, teacherId);
    return res.json(result);
  } catch (error) {
    return res.status(error.status || 500).json({ message: error.message || "Erreur serveur" });
  }
};

// Inscriptions d'un élève
exports.getEnrollmentsByStudent = async (req, res) => {
  try {
    const result = await groupClassService.getEnrollmentsByStudent(req.params.studentId);
    return res.json(result);
  } catch (error) {
    return res.status(error.status || 500).json({ message: error.message || "Erreur serveur" });
  }
};

// Inscrits d'une session (prof)
exports.getEnrollmentsByClass = async (req, res) => {
  try {
    const result = await groupClassService.getEnrollmentsByClass(
      req.params.groupClassId,
      req.user.id
    );
    return res.json(result);
  } catch (error) {
    return res.status(error.status || 500).json({ message: error.message || "Erreur serveur" });
  }
};