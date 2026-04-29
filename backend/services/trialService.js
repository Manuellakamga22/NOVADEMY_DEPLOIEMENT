const trialRepository = require("../repositories/trialRequestRepository");
const teacherPlanningRepository = require("../repositories/teacherPlanningRepository");

exports.createTrialRequest = async ({
  announcement_id,
  student_id,
  teacher_id,
  planning_id,
}) => {
  if (!announcement_id || !student_id || !teacher_id || !planning_id) {
    throw {
      status: 400,
      message:
        "announcement_id, student_id, teacher_id et planning_id sont obligatoires",
    };
  }

  const activeTrialsCount =
    await trialRepository.countActiveTrialsByStudent(student_id);

  if (activeTrialsCount >= 3) {
    throw {
      status: 400,
      message:
        "Vous avez déjà atteint la limite de 3 demandes de cours d'essai actives.",
    };
  }

  const selectedPlanning =
    await teacherPlanningRepository.getPlanningById(planning_id);

  if (!selectedPlanning) {
    throw {
      status: 404,
      message: "Créneau introuvable.",
    };
  }

  if (Number(selectedPlanning.teacher_id) !== Number(teacher_id)) {
    throw {
      status: 400,
      message: "Ce créneau n'appartient pas à ce professeur.",
    };
  }

  if (!selectedPlanning.is_active) {
    throw {
      status: 400,
      message: "Ce créneau n'est plus disponible.",
    };
  }

  const existingRequest = await trialRepository.findExistingTrialRequest(
    announcement_id,
    student_id,
    teacher_id
  );

  if (existingRequest) {
    throw {
      status: 400,
      message: "Une demande de cours d'essai existe déjà pour ce professeur.",
    };
  }

  const result = await trialRepository.createTrialRequest({
    announcement_id,
    student_id,
    teacher_id,
    planning_id,
    requested_day: selectedPlanning.day_of_week,
    requested_start_time: selectedPlanning.start_time,
    requested_end_time: selectedPlanning.end_time,
  });

  return {
    message: "Demande envoyée",
    id: result.insertId,
  };
};

exports.getTeacherTrials = async (teacherId) => {
  if (!teacherId) {
    throw { status: 400, message: "teacherId manquant" };
  }

  return await trialRepository.getTeacherTrials(teacherId);
};

exports.getStudentTrials = async (studentId) => {
  if (!studentId) {
    throw { status: 400, message: "studentId manquant" };
  }

  return await trialRepository.getStudentTrials(studentId);
};

// Tous les trials (admin)
exports.getAllTrials = async () => {
  return await trialRepository.getAllTrials();
};

exports.updateTrialStatus = async (id, status) => {
  if (!id || !status) {
    throw { status: 400, message: "ID et statut obligatoires" };
  }

  const allowedStatuses = ["pending", "accepted", "refused", "reported"];
  if (!allowedStatuses.includes(status)) {
    throw { status: 400, message: "Statut invalide" };
  }

  // Générer un lien visio Jitsi uniquement à l'acceptation
  let visioLink = null;
  if (status === "accepted") {
    const crypto = require("crypto");
    const roomId = crypto.randomBytes(8).toString("hex");
    visioLink = `https://meet.jit.si/novademy-${roomId}`;
    await trialRepository.saveVisioLink(id, visioLink);
  }

  await trialRepository.updateTrialStatus(id, status);

  return {
    message: "Statut mis à jour",
    visioLink,
  };
};