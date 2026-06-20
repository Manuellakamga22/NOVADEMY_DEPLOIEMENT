const service = require("../services/groupClassService");

// l'élève crée une session collective
exports.createGroupClass = async (req, res) => {
  try {
    const result = await service.createGroupClass(req.body);
    return res.status(201).json(result);
  } catch (err) {
    return res.status(err.status || 500).json({ message: err.message || "Erreur serveur" });
  }
};

// le prof répond à une demande de session (accepte ou refuse)
exports.repondreSession = async (req, res) => {
  try {
    const { groupClassId } = req.params;
    const { decision } = req.body; // "accepted" ou "refused"
    const teacherId = req.user?.id || req.body.teacher_id;
    const result = await service.repondreSession(groupClassId, teacherId, decision);
    return res.json(result);
  } catch (err) {
    return res.status(err.status || 500).json({ message: err.message || "Erreur serveur" });
  }
};

// sessions d'un prof
exports.getByTeacher = async (req, res) => {
  try {
    const result = await service.getByTeacher(req.params.teacherId);
    return res.json(result);
  } catch (err) {
    return res.status(err.status || 500).json({ message: err.message || "Erreur serveur" });
  }
};

// sessions ouvertes (élèves)
exports.getOpen = async (req, res) => {
  try {
    const result = await service.getOpen();
    return res.json(result);
  } catch (err) {
    return res.status(err.status || 500).json({ message: err.message || "Erreur serveur" });
  }
};

// rejoindre une session par son code
exports.joinByCode = async (req, res) => {
  try {
    const { code } = req.params;
    const studentId = req.body.student_id || req.user?.id;
    const result = await service.joinByCode(code, studentId);
    return res.status(201).json(result);
  } catch (err) {
    return res.status(err.status || 500).json({ message: err.message || "Erreur serveur" });
  }
};

// chercher une session par code (pour afficher les infos avant de rejoindre)
exports.getByCode = async (req, res) => {
  try {
    const result = await service.getByCode(req.params.code);
    if (!result) return res.status(404).json({ message: "Session introuvable" });
    return res.json(result);
  } catch (err) {
    return res.status(err.status || 500).json({ message: err.message || "Erreur serveur" });
  }
};

// clore une session (prof)
exports.closeSession = async (req, res) => {
  try {
    const result = await service.closeSession(req.params.groupClassId, req.user.id);
    return res.json(result);
  } catch (err) {
    return res.status(err.status || 500).json({ message: err.message || "Erreur serveur" });
  }
};

// inscriptions d'un élève
exports.getEnrollmentsByStudent = async (req, res) => {
  try {
    const result = await service.getEnrollmentsByStudent(req.params.studentId);
    return res.json(result);
  } catch (err) {
    return res.status(err.status || 500).json({ message: err.message || "Erreur serveur" });
  }
};

// inscrits d'une session (prof)
exports.getEnrollmentsByClass = async (req, res) => {
  try {
    const result = await service.getEnrollmentsByClass(req.params.groupClassId, req.user.id);
    return res.json(result);
  } catch (err) {
    return res.status(err.status || 500).json({ message: err.message || "Erreur serveur" });
  }
};

// invitation MongoDB par code de session (participants + statuts)
exports.getInvitationParCode = async (req, res) => {
  try {
    const result = await service.getInvitationParCode(req.params.code);
    if (!result) return res.status(404).json({ message: "Invitation introuvable" });
    return res.json(result);
  } catch (err) {
    return res.status(err.status || 500).json({ message: err.message || "Erreur serveur" });
  }
};

// historique des événements d'une session
exports.getHistoriqueSession = async (req, res) => {
  try {
    const result = await service.getHistoriqueSession(req.params.groupClassId);
    return res.json(result);
  } catch (err) {
    return res.status(err.status || 500).json({ message: err.message || "Erreur serveur" });
  }
};
