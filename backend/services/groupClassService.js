const repo            = require("../repositories/groupClassRepository");
const invitationRepo  = require("../repositories/collectiveInvitationRepository");
const eventRepo       = require("../repositories/collectiveEventRepository");

// génère un code unique style "MATH-4521"
const genererCode = (subject) => {
  const prefix = String(subject).toUpperCase().slice(0, 5).replace(/\s/g, "");
  const num = Math.floor(1000 + Math.random() * 9000);
  return `${prefix}-${num}`;
};

// l'élève crée une session collective
exports.createGroupClass = async ({
  student_id,
  teacher_id,
  subject,
  level,
  min_students,
  max_students,
  opening_date,
  closing_date,
  prix_base,
}) => {
  if (!student_id || !teacher_id || !subject || !opening_date) {
    throw { status: 400, message: "Champs obligatoires manquants." };
  }

  const min = Number(min_students) || 2;
  const max = Number(max_students) || 4;

  if (min < 2) {
    throw { status: 400, message: "Le minimum doit être d'au moins 2 élèves." };
  }

  if (max < min) {
    throw { status: 400, message: "Le maximum doit être supérieur ou égal au minimum." };
  }

  // code unique pour la session
  const session_code = genererCode(subject);

  const result = await repo.createGroupClass({
    teacher_id,
    announcement_id: null,
    subject,
    level: level || "college",
    min_students: min,
    max_students: max,
    opening_date,
    closing_date: closing_date || null,
    session_code,
    prix_base: prix_base || null,
    created_by_student: student_id,
  });

  // l'élève créateur est automatiquement inscrit
  await repo.enroll(result.insertId, student_id);

  // log MongoDB
  try {
    await invitationRepo.creer({
      session_code,
      group_class_id:     result.insertId,
      teacher_id:         Number(teacher_id),
      created_by_student: Number(student_id),
      subject,
      level:              level || "college",
      min_students:       min,
      max_students:       max,
      participants:       [{ student_id: Number(student_id) }],
    });

    await eventRepo.loggerEvenement({
      group_class_id: result.insertId,
      session_code,
      type: "session_creee",
      data: { student_id, subject, min_students: min, max_students: max },
    });
  } catch {
    // MongoDB optionnel
  }

  return {
    message: "Session collective créée avec succès !",
    id: result.insertId,
    session_code,
  };
};

// le prof accepte ou refuse une session
exports.repondreSession = async (groupClassId, teacherId, decision) => {
  if (!["accepted", "refused"].includes(decision)) {
    throw { status: 400, message: "Décision invalide (accepted ou refused)." };
  }

  const session = await repo.getById(groupClassId);

  if (!session) throw { status: 404, message: "Session introuvable." };

  if (Number(session.teacher_id) !== Number(teacherId)) {
    throw { status: 403, message: "Action non autorisée." };
  }

  await repo.updateTeacherStatus(groupClassId, decision);

  // si le prof refuse → on annule la session
  if (decision === "refused") {
    await repo.updateStatus(groupClassId, "annulee");
    await repo.updateAllEnrollments(groupClassId, "annule");
  }

  // update MongoDB
  try {
    const reponse = decision === "accepted" ? "acceptee" : "refusee";
    await invitationRepo.mettreAJourReponseProf(session.session_code, reponse);

    if (decision === "refused") {
      await invitationRepo.mettreAJourStatut(session.session_code, "annulee");
      await invitationRepo.mettreAJourParticipants(session.session_code, "annule");
    }

    await eventRepo.loggerEvenement({
      group_class_id: Number(groupClassId),
      session_code:   session.session_code,
      type:           decision === "accepted" ? "prof_accepte" : "prof_refuse",
      data:           { teacher_id: Number(teacherId) },
    });
  } catch {
    // MongoDB optionnel
  }

  return {
    message: decision === "accepted"
      ? "Session acceptée ! Les élèves peuvent maintenant rejoindre."
      : "Session refusée.",
  };
};

// sessions d'un prof (pour qu'il voie les demandes et les sessions actives)
exports.getByTeacher = async (teacherId) => {
  if (!teacherId) throw { status: 400, message: "ID professeur manquant." };
  return await repo.getByTeacher(teacherId);
};

// sessions ouvertes (visibles par les élèves)
exports.getOpen = async () => {
  return await repo.getOpen();
};

// rejoindre une session par son code
exports.joinByCode = async (code, studentId) => {
  if (!code || !studentId) {
    throw { status: 400, message: "Code et ID élève obligatoires." };
  }

  const session = await repo.getByCode(code);

  if (!session) {
    throw { status: 404, message: "Aucune session trouvée avec ce code." };
  }

  if (session.status !== "ouverte") {
    throw { status: 400, message: "Cette session n'est plus ouverte." };
  }

  if (session.teacher_status === "refused") {
    throw { status: 400, message: "Le professeur a refusé cette session." };
  }

  if (Number(session.enrolled_count) >= Number(session.max_students)) {
    throw { status: 400, message: "La session est complète." };
  }

  const dejaInscrit = await repo.isEnrolled(session.id, studentId);
  if (dejaInscrit) {
    throw { status: 400, message: "Vous êtes déjà inscrit à cette session." };
  }

  await repo.enroll(session.id, studentId);

  // log MongoDB
  try {
    await invitationRepo.ajouterParticipant(code, Number(studentId));

    await eventRepo.loggerEvenement({
      group_class_id: session.id,
      session_code:   code,
      type:           "eleve_rejoint",
      data:           { student_id: studentId },
    });
  } catch {
    // MongoDB optionnel
  }

  // si max atteint → complete
  const updated = await repo.getById(session.id);
  if (Number(updated.enrolled_count) >= Number(updated.max_students)) {
    await repo.updateStatus(session.id, "complete");

    try {
      await invitationRepo.mettreAJourStatut(code, "complete");
      await eventRepo.loggerEvenement({
        group_class_id: session.id,
        session_code:   code,
        type:           "session_complete",
        data:           { max_students: session.max_students },
      });
    } catch { /* MongoDB optionnel */ }
  }

  return {
    message: "Inscription confirmée !",
    session_code: code,
    subject: session.subject,
  };
};

// clore une session (prof)
exports.closeSession = async (groupClassId, teacherId) => {
  const session = await repo.getById(groupClassId);

  if (!session) throw { status: 404, message: "Session introuvable." };

  if (Number(session.teacher_id) !== Number(teacherId)) {
    throw { status: 403, message: "Action non autorisée." };
  }

  const enrolled = Number(session.enrolled_count);
  const min = Number(session.min_students);

  if (enrolled >= min) {
    await repo.updateStatus(groupClassId, "validee");
    await repo.updateAllEnrollments(groupClassId, "confirme");

    try {
      await invitationRepo.mettreAJourStatut(session.session_code, "validee");
      await invitationRepo.mettreAJourParticipants(session.session_code, "confirme");
      await eventRepo.loggerEvenement({
        group_class_id: Number(groupClassId),
        session_code:   session.session_code,
        type:           "session_validee",
        data:           { enrolled, teacher_id: Number(teacherId) },
      });
    } catch { /* MongoDB optionnel */ }

    return {
      message: `Session validée. ${enrolled} élève(s) confirmé(s).`,
      status: "validee",
    };
  } else {
    await repo.updateStatus(groupClassId, "annulee");
    await repo.updateAllEnrollments(groupClassId, "annule");

    try {
      await invitationRepo.mettreAJourStatut(session.session_code, "annulee");
      await invitationRepo.mettreAJourParticipants(session.session_code, "annule");
      await eventRepo.loggerEvenement({
        group_class_id: Number(groupClassId),
        session_code:   session.session_code,
        type:           "session_annulee",
        data:           { enrolled, min_required: min },
      });
    } catch { /* MongoDB optionnel */ }

    return {
      message: `Session annulée : ${enrolled} inscrit(s) sur ${min} requis.`,
      status: "annulee",
    };
  }
};

// inscriptions d'un élève
exports.getEnrollmentsByStudent = async (studentId) => {
  if (!studentId) throw { status: 400, message: "ID élève manquant." };
  return await repo.getEnrollmentsByStudent(studentId);
};

// inscrits d'une session (pour le prof)
exports.getEnrollmentsByClass = async (groupClassId, teacherId) => {
  const session = await repo.getById(groupClassId);
  if (!session) throw { status: 404, message: "Session introuvable." };
  if (Number(session.teacher_id) !== Number(teacherId)) {
    throw { status: 403, message: "Action non autorisée." };
  }
  return await repo.getEnrollmentsByClass(groupClassId);
};

// recherche par code (utilisé côté élève pour rejoindre)
exports.getByCode = async (code) => {
  if (!code) throw { status: 400, message: "Code manquant." };
  return await repo.getByCode(code);
};

// récupère les détails d'invitation MongoDB pour une session (participants, historique)
exports.getInvitationParCode = async (code) => {
  if (!code) throw { status: 400, message: "Code manquant." };
  return await invitationRepo.getParCode(code);
};

// récupère l'historique des événements d'une session
exports.getHistoriqueSession = async (groupClassId) => {
  if (!groupClassId) throw { status: 400, message: "ID session manquant." };
  return await eventRepo.getHistoriqueSession(Number(groupClassId));
};
