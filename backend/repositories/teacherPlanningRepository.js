const db = require("../db");

exports.createPlanning = async ({
  teacher_id,
  day_of_week,
  start_time,
  end_time,
  week_label,
  course_title,
  course_type,
}) => {
  const [result] = await db.query(
    `
    INSERT INTO teacher_planning
    (
      teacher_id,
      day_of_week,
      start_time,
      end_time,
      week_label,
      is_active,
      course_title,
      course_type
    )
    VALUES (?, ?, ?, ?, ?, 1, ?, ?)
    `,
    [
      teacher_id,
      day_of_week,
      start_time,
      end_time,
      week_label,
      course_title,
      course_type,
    ]
  );

  return result;
};

exports.getPlanningByTeacherId = async (teacherId) => {
  const [rows] = await db.query(
    `
    SELECT
      id,
      teacher_id,
      day_of_week,
      start_time,
      end_time,
      week_label,
      is_active,
      course_title,
      course_type,
      created_at,
      updated_at
    FROM teacher_planning
    WHERE teacher_id = ? AND is_active = 1
    ORDER BY
      FIELD(day_of_week, 'lundi','mardi','mercredi','jeudi','vendredi','samedi','dimanche'),
      start_time ASC
    `,
    [teacherId]
  );

  return rows;
};

exports.getPlanningById = async (planningId) => {
  const [rows] = await db.query(
    `
    SELECT *
    FROM teacher_planning
    WHERE id = ?
    `,
    [planningId]
  );

  return rows[0];
};

exports.deactivatePlanning = async (planningId, teacherId) => {
  const [result] = await db.query(
    `
    UPDATE teacher_planning
    SET is_active = 0
    WHERE id = ? AND teacher_id = ?
    `,
    [planningId, teacherId]
  );

  return result;
};