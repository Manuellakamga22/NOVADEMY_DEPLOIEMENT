const db = require("../db");

// crée un créneau dans le planning
exports.createPlanning = async ({
  teacher_id,
  planning_date,
  day_of_week,
  start_time,
  end_time,
  duration_minutes,
  week_label,
  course_title,
  course_type,
  status,
  is_reported,
}) => {
  const [result] = await db.query(
    `
    INSERT INTO teacher_planning
    (
      teacher_id,
      planning_date,
      day_of_week,
      start_time,
      end_time,
      duration_minutes,
      week_label,
      is_active,
      course_title,
      course_type,
      status,
      is_reported
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, 1, ?, ?, ?, ?)
    `,
    [
      teacher_id,
      planning_date,
      day_of_week,
      start_time,
      end_time,
      duration_minutes,
      week_label,
      course_title,
      course_type,
      status,
      is_reported,
    ]
  );

  return result;
};

// récupère tous les créneaux actifs d'un prof
exports.getPlanningByTeacherId = async (teacherId) => {
  const [rows] = await db.query(
    `
    SELECT
      id,
      teacher_id,
      planning_date,
      day_of_week,
      start_time,
      end_time,
      duration_minutes,
      week_label,
      is_active,
      course_title,
      course_type,
      status,
      is_reported,
      created_at,
      updated_at
    FROM teacher_planning
    WHERE teacher_id = ? AND is_active = 1
    ORDER BY
      planning_date ASC,
      FIELD(day_of_week, 'lundi','mardi','mercredi','jeudi','vendredi','samedi','dimanche'),
      start_time ASC
    `,
    [teacherId]
  );

  return rows;
};

// récupère les créneaux d'un prof sur une plage de dates (pour l'agenda semaine)
exports.getPlanningByTeacherIdAndWeek = async (teacherId, dateDebut, dateFin) => {
  const [rows] = await db.query(
    `
    SELECT
      id,
      teacher_id,
      planning_date,
      day_of_week,
      start_time,
      end_time,
      duration_minutes,
      course_title,
      course_type,
      status,
      is_reported
    FROM teacher_planning
    WHERE teacher_id = ?
      AND is_active = 1
      AND (
        planning_date BETWEEN ? AND ?
        OR planning_date IS NULL
      )
    ORDER BY planning_date ASC, start_time ASC
    `,
    [teacherId, dateDebut, dateFin]
  );

  return rows;
};

// récupère un seul créneau par son id
exports.getPlanningById = async (planningId) => {
  const [rows] = await db.query(
    `SELECT * FROM teacher_planning WHERE id = ? LIMIT 1`,
    [planningId]
  );

  return rows[0] || null;
};

// met à jour un créneau existant
exports.updatePlanning = async (
  planningId,
  {
    planning_date,
    day_of_week,
    start_time,
    end_time,
    duration_minutes,
    week_label,
    course_title,
    course_type,
    status,
    is_reported,
  }
) => {
  const [result] = await db.query(
    `
    UPDATE teacher_planning
    SET
      planning_date = ?,
      day_of_week = ?,
      start_time = ?,
      end_time = ?,
      duration_minutes = ?,
      week_label = ?,
      course_title = ?,
      course_type = ?,
      status = ?,
      is_reported = ?,
      updated_at = NOW()
    WHERE id = ?
    `,
    [
      planning_date,
      day_of_week,
      start_time,
      end_time,
      duration_minutes,
      week_label,
      course_title,
      course_type,
      status,
      is_reported,
      planningId,
    ]
  );

  return result;
};

// désactive un créneau (soft delete)
exports.deactivatePlanning = async (planningId, teacherId) => {
  const [result] = await db.query(
    `
    UPDATE teacher_planning
    SET is_active = 0, updated_at = NOW()
    WHERE id = ? AND teacher_id = ?
    `,
    [planningId, teacherId]
  );

  return result;
};
