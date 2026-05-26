const db = require("../db");

// crée une session collective
exports.createGroupClass = async ({
  teacher_id, announcement_id, subject, level,
  min_students, max_students, opening_date, closing_date,
  session_code, prix_base, created_by_student,
}) => {
  const [result] = await db.query(
    `INSERT INTO group_classes
     (teacher_id, announcement_id, subject, level, min_students, max_students,
      opening_date, closing_date, status, session_code, prix_base, created_by_student, teacher_status)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'ouverte', ?, ?, ?, 'pending')`,
    [teacher_id, announcement_id || null, subject, level || "college",
     min_students, max_students, opening_date, closing_date || null,
     session_code || null, prix_base || null, created_by_student || null]
  );
  return result;
};

// cherche une session par son code
exports.getByCode = async (code) => {
  const [rows] = await db.query(
    `SELECT gc.*,
       COUNT(gce.id) AS enrolled_count
     FROM group_classes gc
     LEFT JOIN group_class_enrollments gce
       ON gce.group_class_id = gc.id AND gce.status != 'annule'
     WHERE gc.session_code = ?
     GROUP BY gc.id`,
    [code]
  );
  return rows[0] || null;
};

// récupère les sessions d'un prof
exports.getByTeacher = async (teacherId) => {
  const [rows] = await db.query(
    `SELECT gc.*,
       COUNT(gce.id) AS enrolled_count
     FROM group_classes gc
     LEFT JOIN group_class_enrollments gce
       ON gce.group_class_id = gc.id AND gce.status != 'annule'
     WHERE gc.teacher_id = ?
     GROUP BY gc.id
     ORDER BY gc.created_at DESC`,
    [teacherId]
  );
  return rows;
};

// sessions ouvertes et acceptées par le prof
exports.getOpen = async () => {
  const [rows] = await db.query(
    `SELECT gc.*,
       COUNT(gce.id) AS enrolled_count
     FROM group_classes gc
     LEFT JOIN group_class_enrollments gce
       ON gce.group_class_id = gc.id AND gce.status != 'annule'
     WHERE gc.status = 'ouverte'
     GROUP BY gc.id
     ORDER BY gc.opening_date ASC`
  );
  return rows;
};

// récupère une session par id
exports.getById = async (id) => {
  const [rows] = await db.query(
    `SELECT gc.*,
       COUNT(gce.id) AS enrolled_count
     FROM group_classes gc
     LEFT JOIN group_class_enrollments gce
       ON gce.group_class_id = gc.id AND gce.status != 'annule'
     WHERE gc.id = ?
     GROUP BY gc.id`,
    [id]
  );
  return rows[0] || null;
};

// met à jour le statut de la session
exports.updateStatus = async (id, status) => {
  await db.query(
    `UPDATE group_classes SET status = ?, updated_at = NOW() WHERE id = ?`,
    [status, id]
  );
};

// met à jour la réponse du professeur
exports.updateTeacherStatus = async (id, teacherStatus) => {
  await db.query(
    `UPDATE group_classes SET teacher_status = ?, updated_at = NOW() WHERE id = ?`,
    [teacherStatus, id]
  );
};

// inscrit un élève à une session
exports.enroll = async (groupClassId, studentId) => {
  await db.query(
    `INSERT INTO group_class_enrollments (group_class_id, student_id, status)
     VALUES (?, ?, 'inscrit')`,
    [groupClassId, studentId]
  );
};

// vérifie si un élève est déjà inscrit
exports.isEnrolled = async (groupClassId, studentId) => {
  const [rows] = await db.query(
    `SELECT id FROM group_class_enrollments
     WHERE group_class_id = ? AND student_id = ? AND status != 'annule'`,
    [groupClassId, studentId]
  );
  return rows.length > 0;
};

// met à jour le statut de toutes les inscriptions d'une session
exports.updateAllEnrollments = async (groupClassId, status) => {
  await db.query(
    `UPDATE group_class_enrollments SET status = ? WHERE group_class_id = ?`,
    [status, groupClassId]
  );
};

// inscriptions d'un élève avec infos de la session
exports.getEnrollmentsByStudent = async (studentId) => {
  const [rows] = await db.query(
    `SELECT gce.*, gc.subject, gc.level, gc.session_code,
       gc.opening_date, gc.status AS session_status,
       gc.teacher_status, gc.min_students, gc.max_students,
       COUNT(gce2.id) AS enrolled_count
     FROM group_class_enrollments gce
     JOIN group_classes gc ON gc.id = gce.group_class_id
     LEFT JOIN group_class_enrollments gce2
       ON gce2.group_class_id = gc.id AND gce2.status != 'annule'
     WHERE gce.student_id = ?
     GROUP BY gce.id
     ORDER BY gce.created_at DESC`,
    [studentId]
  );
  return rows;
};

// inscrits d'une session avec infos de l'élève
exports.getEnrollmentsByClass = async (groupClassId) => {
  const [rows] = await db.query(
    `SELECT gce.*, u.prenom, u.nom, u.email
     FROM group_class_enrollments gce
     JOIN users u ON u.id = gce.student_id
     WHERE gce.group_class_id = ?
     ORDER BY gce.created_at ASC`,
    [groupClassId]
  );
  return rows;
};
