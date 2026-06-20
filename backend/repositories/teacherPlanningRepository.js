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

// récupère les créneaux d'un prof avec leur statut de réservation
// un créneau est RESERVE si une demande avec status='accepted' pointe dessus
exports.getPlanningWithStatus = async (teacherId) => {
  const [rows] = await db.query(
    `
    SELECT
      tp.id,
      tp.teacher_id,
      tp.planning_date,
      tp.day_of_week,
      tp.start_time,
      tp.end_time,
      tp.duration_minutes,
      tp.week_label,
      tp.is_active,
      tp.course_title,
      tp.course_type,
      CASE WHEN tr.id IS NOT NULL THEN 1 ELSE 0 END AS is_reserved,
      tr.student_id AS reserved_by_student_id
    FROM teacher_planning tp
    LEFT JOIN trial_requests tr
      ON tr.planning_id = tp.id AND tr.status = 'accepted'
    WHERE tp.teacher_id = ? AND tp.is_active = 1
    ORDER BY
      tp.planning_date ASC,
      FIELD(tp.day_of_week, 'lundi','mardi','mercredi','jeudi','vendredi','samedi','dimanche'),
      tp.start_time ASC
    `,
    [teacherId]
  );
  return rows;
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
