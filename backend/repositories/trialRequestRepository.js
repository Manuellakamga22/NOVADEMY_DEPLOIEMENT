const db = require("../db");

exports.findExistingTrialRequest = async (
  announcement_id,
  student_id,
  teacher_id,
  course_type = "cours_essai"
) => {
  const params = [student_id, teacher_id, course_type];
  let announcementFilter = "";

  // si j'ai une annonce, je vérifie aussi dessus, sinon je vérifie seulement prof + élève + type
  if (announcement_id) {
    announcementFilter = "AND announcement_id = ?";
    params.push(announcement_id);
  }

  const [rows] = await db.query(
    `
    SELECT *
    FROM trial_requests
    WHERE student_id = ?
      AND teacher_id = ?
      AND course_type = ?
      ${announcementFilter}
      AND status IN ('pending', 'accepted', 'reported')
    LIMIT 1
    `,
    params
  );

  return rows[0] || null;
};

exports.countActiveTrialsByStudent = async (studentId) => {
  const [rows] = await db.query(
    `
    SELECT COUNT(*) AS total
    FROM trial_requests
    WHERE student_id = ?
      AND course_type = 'cours_essai'
      AND status IN ('pending', 'accepted', 'reported')
    `,
    [studentId]
  );

  return rows[0].total;
};

exports.createTrialRequest = async ({
  announcement_id,
  student_id,
  teacher_id,
  planning_id,
  requested_date,
  requested_day,
  requested_start_time,
  requested_end_time,
  duration_minutes,
  course_type,
  period_end,
}) => {
  const [result] = await db.query(
    `
    INSERT INTO trial_requests
    (
      announcement_id,
      student_id,
      teacher_id,
      planning_id,
      requested_date,
      requested_day,
      requested_start_time,
      requested_end_time,
      duration_minutes,
      course_type,
      period_end,
      status
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')
    `,
    [
      announcement_id,
      student_id,
      teacher_id,
      planning_id,
      requested_date,
      requested_day,
      requested_start_time,
      requested_end_time,
      duration_minutes,
      course_type,
      period_end,
    ]
  );

  return result;
};

exports.getTeacherTrials = async (teacherId) => {
  const [rows] = await db.query(
    `
    SELECT
      tr.*,
      u.prenom AS student_prenom,
      u.nom AS student_nom,
      u.email AS student_email,
      a.subject,
      a.title AS announcement_title
    FROM trial_requests tr
    LEFT JOIN users u ON u.id = tr.student_id
    LEFT JOIN announcements a ON a.id = tr.announcement_id
    WHERE tr.teacher_id = ?
    ORDER BY tr.created_at DESC
    `,
    [teacherId]
  );

  return rows;
};

exports.getStudentTrials = async (studentId) => {
  const [rows] = await db.query(
    `
    SELECT
      tr.*,
      u.prenom AS teacher_prenom,
      u.nom AS teacher_nom,
      u.email AS teacher_email,
      a.subject,
      a.title AS announcement_title
    FROM trial_requests tr
    LEFT JOIN users u ON u.id = tr.teacher_id
    LEFT JOIN announcements a ON a.id = tr.announcement_id
    WHERE tr.student_id = ?
    ORDER BY tr.created_at DESC
    `,
    [studentId]
  );

  return rows;
};

exports.getTrialById = async (trialId) => {
  const [rows] = await db.query(
    `
    SELECT *
    FROM trial_requests
    WHERE id = ?
    LIMIT 1
    `,
    [trialId]
  );

  return rows[0] || null;
};

// vérifie si un créneau est déjà bloqué par une demande acceptée
exports.isSlotReserved = async (planningId) => {
  const [rows] = await db.query(
    `SELECT id FROM trial_requests
     WHERE planning_id = ? AND status = 'accepted'
     LIMIT 1`,
    [planningId]
  );
  return !!rows[0];
};

exports.hasAcceptedTrialBetweenUsers = async (studentId, teacherId) => {
  const [rows] = await db.query(
    `
    SELECT id
    FROM trial_requests
    WHERE student_id = ?
      AND teacher_id = ?
      AND status = 'accepted'
    LIMIT 1
    `,
    [studentId, teacherId]
  );

  return !!rows[0];
};

exports.updateTrialStatus = async (id, status) => {
  const [result] = await db.query(
    `
    UPDATE trial_requests
    SET status = ?
    WHERE id = ?
    `,
    [status, id]
  );

  return result;
};

exports.getAllTrials = async () => {
  const [rows] = await db.query(
    `
    SELECT
      tr.*,
      u_student.prenom AS student_prenom,
      u_student.nom AS student_nom,
      u_teacher.prenom AS teacher_prenom,
      u_teacher.nom AS teacher_nom,
      a.subject
    FROM trial_requests tr
    LEFT JOIN users u_student ON u_student.id = tr.student_id
    LEFT JOIN users u_teacher ON u_teacher.id = tr.teacher_id
    LEFT JOIN announcements a ON a.id = tr.announcement_id
    ORDER BY tr.created_at DESC
    `
  );

  return rows;
};

exports.saveVisioLink = async (trialId, visioLink) => {
  const [result] = await db.query(
    `
    UPDATE trial_requests
    SET visio_link = ?
    WHERE id = ?
    `,
    [visioLink, trialId]
  );

  return result;
};
