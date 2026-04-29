const repository = require("../repositories/teacherPlanningRepository");

const allowedDays = [
  "lundi",
  "mardi",
  "mercredi",
  "jeudi",
  "vendredi",
  "samedi",
  "dimanche",
];

const allowedCourseTypes = ["cours_essai", "cours"];

exports.createPlanning = async (data) => {
  const {
    teacher_id,
    day_of_week,
    start_time,
    end_time,
    week_label,
    course_title,
    course_type,
  } = data;

  if (!teacher_id || !day_of_week || !start_time || !end_time) {
    throw {
      status: 400,
      message:
        "teacher_id, day_of_week, start_time et end_time sont obligatoires.",
    };
  }

  const normalizedDay = String(day_of_week).trim().toLowerCase();

  if (!allowedDays.includes(normalizedDay)) {
    throw {
      status: 400,
      message: "Jour invalide.",
    };
  }

  const normalizedType = course_type
    ? String(course_type).trim()
    : "cours_essai";

  if (!allowedCourseTypes.includes(normalizedType)) {
    throw {
      status: 400,
      message: "Type de cours invalide.",
    };
  }

  if (start_time >= end_time) {
    throw {
      status: 400,
      message: "L'heure de fin doit être supérieure à l'heure de début.",
    };
  }

  await repository.createPlanning({
    teacher_id,
    day_of_week: normalizedDay,
    start_time,
    end_time,
    week_label: week_label || null,
    course_title: course_title || null,
    course_type: normalizedType,
  });

  return {
    message: "Créneau ajouté au planning avec succès.",
  };
};

exports.getPlanningByTeacherId = async (teacherId) => {
  if (!teacherId) {
    throw {
      status: 400,
      message: "teacherId manquant.",
    };
  }

  return await repository.getPlanningByTeacherId(teacherId);
};

exports.deactivatePlanning = async (planningId, teacherId) => {
  if (!planningId || !teacherId) {
    throw {
      status: 400,
      message: "planningId et teacherId sont obligatoires.",
    };
  }

  const existingPlanning = await repository.getPlanningById(planningId);

  if (!existingPlanning) {
    throw {
      status: 404,
      message: "Créneau introuvable.",
    };
  }

  if (Number(existingPlanning.teacher_id) !== Number(teacherId)) {
    throw {
      status: 403,
      message: "Vous ne pouvez pas modifier ce créneau.",
    };
  }

  await repository.deactivatePlanning(planningId, teacherId);

  return {
    message: "Créneau désactivé avec succès.",
  };
};