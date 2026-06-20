const trialRepository = require("../repositories/trialRequestRepository");
const teacherPlanningRepository = require("../repositories/teacherPlanningRepository");
const notifService = require("./notificationService");

const normalizeTime = (time) => {
  if (!time) return null;
  const value = String(time).trim();
  if (/^\d{2}:\d{2}$/.test(value)) return `${value}:00`;
  return value;
};

const calculateMinutes = (startTime, endTime) => {
  const start = String(startTime).slice(0, 5).split(":").map(Number);
  const end = String(endTime).slice(0, 5).split(":").map(Number);
  return end[0] * 60 + end[1] - (start[0] * 60 + start[1]);
};

exports.createTrialRequest = async (data) => {
  const {
    announcement_id = null,
    student_id,
    teacher_id,
    planning_id = null,
    requested_date = null,
    requested_day = null,
    requested_start_time = null,
    requested_end_time = null,
    duration_minutes = null,
    course_type = "cours_essai",
    period_end = null,
  } = data;

  if (!student_id || !teacher_id) {
    throw { status: 400, message: "student_id et teacher_id sont obligatoires" };
  }

  const normalizedType = String(course_type || "cours_essai").trim();
  const allowedTypes = ["cours_essai", "suivi_regulier"];

  if (!allowedTypes.includes(normalizedType)) {
    throw { status: 400, message: "Type de cours invalide." };
  }

  let finalDate = requested_date || null;
  let finalDay = requested_day || requested_date || null;
  let finalStart = normalizeTime(requested_start_time);
  let finalEnd = normalizeTime(requested_end_time);
  let finalDuration = Number(duration_minutes || 0);

  if (planning_id) {
    const selectedPlanning = await teacherPlanningRepository.getPlanningById(planning_id);

    if (!selectedPlanning) {
      throw { status: 404, message: "Créneau introuvable." };
    }

    if (Number(selectedPlanning.teacher_id) !== Number(teacher_id)) {
      throw { status: 400, message: "Ce créneau n'appartient pas à ce professeur." };
    }

    if (!selectedPlanning.is_active) {
      throw { status: 400, message: "Ce créneau n'est plus disponible." };
    }

    // un créneau déjà accepté pour un autre élève ne peut pas être réservé
    const dejaReserve = await trialRepository.isSlotReserved(planning_id);
    if (dejaReserve) {
      throw { status: 400, message: "Ce créneau est déjà réservé par un autre élève." };
    }

    finalDate = selectedPlanning.planning_date || selectedPlanning.availability_date || requested_date || null;
    finalDay = selectedPlanning.day_of_week;
    finalStart = selectedPlanning.start_time;
    finalEnd = selectedPlanning.end_time;
    finalDuration = Number(selectedPlanning.duration_minutes || calculateMinutes(finalStart, finalEnd));
  }

  if (!finalStart || !finalEnd) {
    throw { status: 400, message: "L'heure de début et l'heure de fin sont obligatoires." };
  }

  if (!finalDuration) {
    finalDuration = calculateMinutes(finalStart, finalEnd);
  }

  if (finalDuration < 15 || finalDuration > 240) {
    throw { status: 400, message: "La durée du cours doit être comprise entre 15 minutes et 4h." };
  }

  if (finalStart >= finalEnd) {
    throw { status: 400, message: "L'heure de fin doit être après l'heure de début." };
  }

  if (normalizedType === "suivi_regulier" && !period_end) {
    throw { status: 400, message: "La date de fin de période est obligatoire pour un suivi régulier." };
  }

  const activeTrialsCount = await trialRepository.countActiveTrialsByStudent(student_id);

  if (normalizedType === "cours_essai" && activeTrialsCount >= 3) {
    throw {
      status: 400,
      message: "Vous avez déjà atteint la limite de 3 demandes de cours d'essai actives.",
    };
  }

  const existingRequest = await trialRepository.findExistingTrialRequest(
    announcement_id,
    student_id,
    teacher_id,
    normalizedType
  );

  if (existingRequest) {
    throw { status: 400, message: "Une demande active existe déjà pour ce professeur." };
  }

  const result = await trialRepository.createTrialRequest({
    announcement_id,
    student_id,
    teacher_id,
    planning_id,
    requested_date: finalDate,
    requested_day: finalDay,
    requested_start_time: finalStart,
    requested_end_time: finalEnd,
    duration_minutes: finalDuration,
    course_type: normalizedType,
    period_end: normalizedType === "suivi_regulier" ? period_end : null,
  });

  // notif prof
  // nom élève
  try {
    const trials = await trialRepository.getStudentTrials(student_id);
    const trial = trials.find(t => t.id === result.insertId);
    const studentNom = trial
      ? `${trial.student_prenom || ""} ${trial.student_nom || ""}`.trim()
      : "Un élève";

    await notifService.nouvelleDemande({
      teacher_id: Number(teacher_id),
      student_nom: studentNom || "Un élève",
      trial_id: result.insertId,
    });
  } catch {
    // notif non bloquante
  }

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

  let visioLink = null;

  if (status === "accepted") {
    const crypto = require("crypto");
    const roomId = crypto.randomBytes(8).toString("hex");
    visioLink = `https://meet.jit.si/novademy-${roomId}`;
    await trialRepository.saveVisioLink(id, visioLink);
  }

  await trialRepository.updateTrialStatus(id, status);

  // notif élève
  try {
    const trials = await trialRepository.getAllTrials();
    const trial = trials.find(t => t.id === Number(id));

    if (trial) {
      const teacherNom = `${trial.teacher_prenom || ""} ${trial.teacher_nom || ""}`.trim() || "Votre professeur";

      if (status === "accepted") {
        await notifService.demandeAcceptee({
          student_id: Number(trial.student_id),
          teacher_nom: teacherNom,
          trial_id: Number(id),
        });
      } else if (status === "refused") {
        await notifService.demandeRefusee({
          student_id: Number(trial.student_id),
          teacher_nom: teacherNom,
          trial_id: Number(id),
        });
      }
    }
  } catch {
    // notif non bloquante
  }

  return {
    message: "Statut mis à jour",
    visioLink,
  };
};