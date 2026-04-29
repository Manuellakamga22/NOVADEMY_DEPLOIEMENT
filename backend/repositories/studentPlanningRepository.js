const db = require("../db");

exports.getStudentPlanningByStudentId = async (studentId) => {
  const [rows] = await db.query(
    `
    SELECT
      tr.id,
      tr.student_id,
      tr.teacher_id,
      tr.announcement_id,
      tr.planning_id,
      tr.requested_day,
      tr.requested_start_time,
      tr.requested_end_time,
      tr.status,
      tr.created_at,
      a.subject,
      a.title AS announcement_title,
      a.mode,
      u.nom AS teacher_nom,
      u.prenom AS teacher_prenom
    FROM trial_requests tr
    LEFT JOIN announcements a ON a.id = tr.announcement_id
    LEFT JOIN users u ON u.id = tr.teacher_id
    WHERE tr.student_id = ?
    ORDER BY tr.created_at DESC
    `,
    [studentId]
  );

  return rows;
};