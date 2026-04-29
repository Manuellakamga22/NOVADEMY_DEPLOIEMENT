const db = require("../db");

exports.createReview = async ({
  student_id,
  teacher_id,
  course_id,
  rating,
  comment
}) => {
  const [result] = await db.query(
    `INSERT INTO reviews (student_id, teacher_id, course_id, rating, comment)
     VALUES (?, ?, ?, ?, ?)`,
    [student_id, teacher_id, course_id, rating, comment]
  );
  return result;
};

exports.getReviewsByTeacher = async (teacherId) => {
  const [rows] = await db.query(
    "SELECT * FROM reviews WHERE teacher_id = ?",
    [teacherId]
  );
  return rows;
};

// Admin : tous les avis avec noms élève et prof
exports.getAllReviews = async () => {
  const [rows] = await db.query(
    `SELECT r.*,
       u_student.prenom AS student_prenom, u_student.nom AS student_nom,
       u_teacher.prenom AS teacher_prenom, u_teacher.nom AS teacher_nom
     FROM reviews r
     LEFT JOIN users u_student ON u_student.id = r.student_id
     LEFT JOIN users u_teacher ON u_teacher.id = r.teacher_id
     ORDER BY r.created_at DESC`
  );
  return rows;
};

// Admin : supprimer un avis
exports.deleteReview = async (id) => {
  const [result] = await db.query(
    "DELETE FROM reviews WHERE id = ?",
    [id]
  );
  return result;
};