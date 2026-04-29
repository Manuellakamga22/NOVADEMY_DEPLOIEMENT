const repo = require("../repositories/groupClassRepository");

// Créer une session collective
exports.createGroupClass = async ({
  teacher_id,
  announcement_id,
  subject,
  level,
  min_students,
  max_students,
  opening_date,
  closing_date,
}) => {
  if (!teacher_id || !announcement_id || !subject || !level || !opening_date || !closing_date) {
    throw { status: 400, message: "Champs obligatoires manquants" };
  }

  const min = Number(min_students);
  const max = Number(max_students);

  if (min < 2) {
    throw { status: 400, message: "Le minimum doit être d'au moins 2 élèves" };
  }

  if (max < min) {
    throw { status: 400, message: "Le maximum doit être supérieur ou égal au minimum" };
  }

  if (new Date(closing_date) <= new Date(opening_date)) {
    throw { status: 400, message: "La date de clôture doit être après la date d'ouverture" };
  }

  const result = await repo.createGroupClass({
    teacher_id,
    announcement_id,
    subject,
    level,
    min_students: min,
    max_students: max,
    opening_date,
    closing_date,
  });

  return { message: "Session collective créée avec succès", id: result.insertId };
};

// Sessions d'un prof
exports.getByTeacher = async (teacherId) => {
  if (!teacherId) throw { status: 400, message: "ID professeur manquant" };
  return await repo.getByTeacher(teacherId);
};

// Sessions ouvertes (pour les élèves)
exports.getOpen = async () => {
  return await repo.getOpen();
};

// Inscrire un élève à une session
exports.enroll = async (groupClassId, studentId) => {
  if (!groupClassId || !studentId) {
    throw { status: 400, message: "Paramètres manquants" };
  }

  const session = await repo.getById(groupClassId);

  if (!session) {
    throw { status: 404, message: "Session introuvable" };
  }

  if (session.status !== "ouverte") {
    throw { status: 400, message: "Cette session n'est plus ouverte aux inscriptions" };
  }

  if (Number(session.enrolled_count) >= Number(session.max_students)) {
    throw { status: 400, message: "La session est complète" };
  }

  const alreadyEnrolled = await repo.isEnrolled(groupClassId, studentId);
  if (alreadyEnrolled) {
    throw { status: 400, message: "Vous êtes déjà inscrit à cette session" };
  }

  await repo.enroll(groupClassId, studentId);

  // Si max atteint → passer la session en 'complete'
  const updatedSession = await repo.getById(groupClassId);
  if (Number(updatedSession.enrolled_count) >= Number(updatedSession.max_students)) {
    await repo.updateStatus(groupClassId, "complete");
  }

  return { message: "Inscription confirmée avec succès" };
};

// Clore une session : vérifier si le min est atteint
// Si oui → validee + confirme tous les inscrits
// Si non → annulee + refuse tous les inscrits
exports.closeSession = async (groupClassId, teacherId) => {
  const session = await repo.getById(groupClassId);

  if (!session) throw { status: 404, message: "Session introuvable" };

  if (Number(session.teacher_id) !== Number(teacherId)) {
    throw { status: 403, message: "Action non autorisée" };
  }

  const enrolled = Number(session.enrolled_count);
  const min      = Number(session.min_students);

  if (enrolled >= min) {
    // Minimum atteint → session validée
    await repo.updateStatus(groupClassId, "validee");
    await repo.updateAllEnrollments(groupClassId, "confirme");
    return {
      message: `Session validée. ${enrolled} élève(s) confirmé(s).`,
      status: "validee",
    };
  } else {
    // Minimum non atteint → session annulée, élèves refusés
    await repo.updateStatus(groupClassId, "annulee");
    await repo.updateAllEnrollments(groupClassId, "refuse");
    return {
      message: `Session annulée : seulement ${enrolled} inscrit(s) sur ${min} requis. Les élèves ont été notifiés.`,
      status: "annulee",
    };
  }
};

// Inscriptions d'un élève
exports.getEnrollmentsByStudent = async (studentId) => {
  if (!studentId) throw { status: 400, message: "ID élève manquant" };
  return await repo.getEnrollmentsByStudent(studentId);
};

// Inscrits d'une session (pour le prof)
exports.getEnrollmentsByClass = async (groupClassId, teacherId) => {
  const session = await repo.getById(groupClassId);
  if (!session) throw { status: 404, message: "Session introuvable" };
  if (Number(session.teacher_id) !== Number(teacherId)) {
    throw { status: 403, message: "Action non autorisée" };
  }
  return await repo.getEnrollmentsByClass(groupClassId);
};