const packRepository  = require("../repositories/packRepository");
const trialRepository = require("../repositories/trialRequestRepository");
const db = require("../db");

exports.getCatalog = async () => {
  return await packRepository.getCatalog();
};

exports.proposeFormula = async ({
  trial_request_id, teacher_id, student_id, formula_id
}) => {
  if (!trial_request_id || !teacher_id || !student_id || !formula_id) {
    throw { status: 400, message: "Champs obligatoires manquants" };
  }

  const trial = await trialRepository.getTrialById(trial_request_id);
  if (!trial) throw { status: 404, message: "Demande d'essai introuvable" };

  if (Number(trial.teacher_id) !== Number(teacher_id)) {
    throw { status: 403, message: "Vous ne pouvez pas proposer une formule pour cette demande" };
  }
  if (Number(trial.student_id) !== Number(student_id)) {
    throw { status: 400, message: "L'élève renseigné ne correspond pas à la demande" };
  }
  if (!["accepted", "acceptee"].includes(trial.status)) {
    throw { status: 400, message: "La formule ne peut être proposée qu'après acceptation du cours d'essai" };
  }

  const announcement_id = trial.announcement_id;
  const [annRows] = await db.query(
    "SELECT teacher_rate FROM announcements WHERE id = ? LIMIT 1",
    [announcement_id]
  );
  const teacher_rate = annRows.length > 0 ? annRows[0].teacher_rate : 0;

  const result = await packRepository.proposeFormula({
    trial_request_id, teacher_id, student_id, announcement_id, teacher_rate, formula_id
  });

  return { message: "Formule proposée avec succès", id: result.insertId };
};

// propositions en attente pour un élève
exports.getStudentProposals = async (studentId) => {
  if (!studentId) throw { status: 400, message: "studentId manquant" };
  return await packRepository.getStudentProposals(studentId);
};

// toutes les formules d'un élève (pour StudentCourses)
exports.getAllStudentFormulas = async (studentId) => {
  if (!studentId) throw { status: 400, message: "studentId manquant" };
  return await packRepository.getAllStudentFormulas(studentId);
};

exports.acceptFormula = async (id) => {
  if (!id) throw { status: 400, message: "ID formule manquant" };
  await packRepository.acceptFormula(id);
  return { message: "Formule acceptée" };
};

exports.getAcceptedFormula = async (studentId) => {
  if (!studentId) throw { status: 400, message: "studentId manquant" };
  return await packRepository.getAcceptedFormula(studentId);
};