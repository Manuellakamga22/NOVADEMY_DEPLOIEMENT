const db = require("../db");

// Créer une session collective
exports.createGroupClass = async ({
  teacher_id,
  announcement_id,
  subject,
  level,
  min_students,
  max_students,
  opening_date,
  closing_date,
}) => {
  const [result] = await db.query(
    `INSERT INTO group_classes
     (teacher_id, announcement_id, subject, level, min_students, max_students, opening_date, closing_date, status)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'ouverte')`,
    [teacher_id, announcement_id, subject, level, min_students, max_students, opening_date, closing_date]
  );
  return result;
};

// Récupérer toutes les sessions d'un prof avec le nombre d'inscrits
exports.getByTeacher = async (teacherId) => {
  const [rows] = await db.query(
    `SELECT gc.*,
       COUNT(gce.id) AS enrolled_count
     FROM group_classes gc
     LEFT JOIN group_class_enrollments gce
       ON gce.group_class_id = gc.id AND gce.status != 'annule'
     WHERE gc.teacher_id = ?
     GROUP BY gc.id
     ORDER BY gc.opening_date DESC`,
    [teacherId]
  );
  return rows;
};

// Récupérer toutes les sessions ouvertes (pour les élèves)
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

// Récupérer une session par id
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

// Mettre à jour le statut d'une session
exports.updateStatus = async (id, status) => {
  const [result] = await db.query(
    `UPDATE group_classes SET status = ? WHERE id = ?`,
    [status, id]
  );
  return result;
};

// Inscrire un élève
exports.enroll = async (group_class_id, student_id) => {
  const [result] = await db.query(
    `INSERT INTO group_class_enrollments (group_class_id, student_id, status)
     VALUES (?, ?, 'inscrit')`,
    [group_class_id, student_id]
  );
  return result;
};

// Vérifier si un élève est déjà inscrit
exports.isEnrolled = async (group_class_id, student_id) => {
  const [rows] = await db.query(
    `SELECT id FROM group_class_enrollments
     WHERE group_class_id = ? AND student_id = ? AND status != 'annule'`,
    [group_class_id, student_id]
  );
  return rows.length > 0;
};

// Récupérer les inscriptions d'un élève
exports.getEnrollmentsByStudent = async (studentId) => {
  const [rows] = await db.query(
    `SELECT gc.*, gce.status AS enrollment_status, gce.created_at AS enrolled_at,
       COUNT(gce2.id) AS enrolled_count
     FROM group_class_enrollments gce
     JOIN group_classes gc ON gc.id = gce.group_class_id
     LEFT JOIN group_class_enrollments gce2
       ON gce2.group_class_id = gc.id AND gce2.status != 'annule'
     WHERE gce.student_id = ? AND gce.status != 'annule'
     GROUP BY gc.id, gce.status, gce.created_at
     ORDER BY gce.created_at DESC`,
    [studentId]
  );
  return rows;
};

// Récupérer tous les inscrits d'une session
exports.getEnrollmentsByClass = async (groupClassId) => {
  const [rows] = await db.query(
    `SELECT gce.*, u.prenom, u.nom, u.email
     FROM group_class_enrollments gce
     JOIN users u ON u.id = gce.student_id
     WHERE gce.group_class_id = ?`,
    [groupClassId]
  );
  return rows;
};

// Mettre à jour le statut d'une inscription
exports.updateEnrollmentStatus = async (group_class_id, student_id, status) => {
  const [result] = await db.query(
    `UPDATE group_class_enrollments SET status = ?
     WHERE group_class_id = ? AND student_id = ?`,
    [status, group_class_id, student_id]
  );
  return result;
};

// Mettre à jour toutes les inscriptions d'une session
exports.updateAllEnrollments = async (group_class_id, status) => {
  const [result] = await db.query(
    `UPDATE group_class_enrollments SET status = ?
     WHERE group_class_id = ?`,
    [status, group_class_id]
  );
  return result;
};