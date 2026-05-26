const repository = require("../repositories/teacherPlanningRepository");

const joursValides = [
  "lundi","mardi","mercredi","jeudi","vendredi","samedi","dimanche",
];

// ces deux valeurs correspondent à l'ENUM de la table teacher_planning
const typesValides = ["cours_essai", "cours"];

// normalise une heure "HH:MM" en "HH:MM:SS"
const normaliserHeure = (h) => {
  if (!h) return null;
  const val = String(h).trim();
  if (/^\d{2}:\d{2}$/.test(val)) return `${val}:00`;
  return val;
};

// calcule la durée en minutes entre deux heures
const calculerDuree = (debut, fin) => {
  const [hd, md] = String(debut).slice(0, 5).split(":").map(Number);
  const [hf, mf] = String(fin).slice(0, 5).split(":").map(Number);
  return hf * 60 + mf - (hd * 60 + md);
};

// calcule l'heure de fin à partir de l'heure de début + durée en minutes
const calculerHeureFin = (heureDebut, dureeMinutes) => {
  const [h, m] = String(heureDebut).slice(0, 5).split(":").map(Number);
  const totalMin = h * 60 + m + Number(dureeMinutes);
  const hf = Math.floor(totalMin / 60);
  const mf = totalMin % 60;
  return `${String(hf).padStart(2, "0")}:${String(mf).padStart(2, "0")}:00`;
};

// valide et nettoie les données avant insert/update
const validerDonnees = (data) => {
  const teacher_id = data.teacher_id;
  const day_of_week = String(data.day_of_week || "").trim().toLowerCase();
  const start_time = normaliserHeure(data.start_time);
  const duration_minutes = Number(data.duration_minutes || 60);

  // si end_time est fourni on l'utilise, sinon on le calcule
  const end_time = data.end_time
    ? normaliserHeure(data.end_time)
    : calculerHeureFin(start_time, duration_minutes);

  const course_type = data.course_type ? String(data.course_type).trim() : "cours_essai";

  if (!teacher_id || !day_of_week || !start_time) {
    throw { status: 400, message: "teacher_id, day_of_week et start_time sont obligatoires." };
  }

  if (!joursValides.includes(day_of_week)) {
    throw { status: 400, message: "Jour invalide." };
  }

  if (!typesValides.includes(course_type)) {
    throw { status: 400, message: "Type de cours invalide." };
  }

  const duree = duration_minutes || calculerDuree(start_time, end_time);

  if (duree < 60 || duree > 240) {
    throw { status: 400, message: "La durée doit être entre 1h et 4h." };
  }

  return {
    teacher_id,
    planning_date: data.planning_date || null,
    day_of_week,
    start_time,
    end_time,
    duration_minutes: duree,
    week_label: data.week_label || null,
    course_title: data.course_title || "Disponible",
    course_type,
    status: data.status || "available",
    is_reported: data.is_reported ? 1 : 0,
  };
};

// crée un nouveau créneau
exports.createPlanning = async (data) => {
  const propre = validerDonnees(data);
  const result = await repository.createPlanning(propre);

  return {
    message: "Créneau ajouté avec succès.",
    insertId: result.insertId,
  };
};

// récupère tous les créneaux actifs d'un prof
exports.getPlanningByTeacherId = async (teacherId) => {
  if (!teacherId) {
    throw { status: 400, message: "teacherId manquant." };
  }

  return await repository.getPlanningByTeacherId(teacherId);
};

// récupère les créneaux d'un prof pour une semaine donnée
exports.getPlanningParSemaine = async (teacherId, dateDebut, dateFin) => {
  if (!teacherId || !dateDebut || !dateFin) {
    throw { status: 400, message: "teacherId, dateDebut et dateFin sont obligatoires." };
  }

  return await repository.getPlanningByTeacherIdAndWeek(teacherId, dateDebut, dateFin);
};

// modifie un créneau existant
exports.updatePlanning = async (planningId, data) => {
  if (!planningId) {
    throw { status: 400, message: "planningId manquant." };
  }

  const existant = await repository.getPlanningById(planningId);

  if (!existant) {
    throw { status: 404, message: "Créneau introuvable." };
  }

  if (Number(existant.teacher_id) !== Number(data.teacher_id)) {
    throw { status: 403, message: "Vous ne pouvez pas modifier ce créneau." };
  }

  const propre = validerDonnees(data);
  await repository.updatePlanning(planningId, propre);

  return {
    message: propre.is_reported ? "Créneau reporté avec succès." : "Créneau modifié avec succès.",
  };
};

// désactive un créneau (suppression douce)
exports.deactivatePlanning = async (planningId, teacherId) => {
  if (!planningId || !teacherId) {
    throw { status: 400, message: "planningId et teacherId sont obligatoires." };
  }

  const existant = await repository.getPlanningById(planningId);

  if (!existant) {
    throw { status: 404, message: "Créneau introuvable." };
  }

  if (Number(existant.teacher_id) !== Number(teacherId)) {
    throw { status: 403, message: "Vous ne pouvez pas supprimer ce créneau." };
  }

  await repository.deactivatePlanning(planningId, teacherId);

  return { message: "Créneau supprimé avec succès." };
};
