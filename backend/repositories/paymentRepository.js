const db = require("../db");

exports.createPayment = async ({
  student_id,
  pack_id,
  amount,
  payment_method,
  payment_date,
  stripe_session_id,
  status,
}) => {
  const [result] = await db.query(
    `INSERT INTO payments 
     (student_id, pack_id, amount, payment_method, payment_date, stripe_session_id, status)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      student_id,
      pack_id,
      amount,
      payment_method || null,
      payment_date || new Date(),
      stripe_session_id || null,
      status || "paid",
    ]
  );

  return result;
};

exports.findByStripeSessionId = async (sessionId) => {
  const [rows] = await db.query(
    `SELECT * FROM payments WHERE stripe_session_id = ? LIMIT 1`,
    [sessionId]
  );

  return rows[0];
};

exports.getPaymentsByStudent = async (studentId) => {
  const [rows] = await db.query(
    `SELECT p.*, fp.type AS formula_type, fp.teacher_id,
            u.prenom AS teacher_prenom, u.nom AS teacher_nom
     FROM payments p
     LEFT JOIN formula_proposals fp ON fp.id = p.pack_id
     LEFT JOIN users u ON u.id = fp.teacher_id
     WHERE p.student_id = ?
     ORDER BY p.created_at DESC`,
    [studentId]
  );

  return rows;
};

exports.getPaymentsByTeacher = async (teacherId) => {
  const [rows] = await db.query(
    `SELECT p.*, fp.type AS formula_type, fp.final_price, fp.teacher_rate,
            fp.total_hours,
            u.prenom AS student_prenom, u.nom AS student_nom
     FROM payments p
     LEFT JOIN formula_proposals fp ON fp.id = p.pack_id
     LEFT JOIN users u ON u.id = p.student_id
     WHERE fp.teacher_id = ?
     ORDER BY p.created_at DESC`,
    [teacherId]
  );

  return rows;
};

exports.getAllPayments = async () => {
  const [rows] = await db.query(
    `SELECT p.*,
       u.prenom AS student_prenom, u.nom AS student_nom,
       fp.type AS formula_type, fp.teacher_id
     FROM payments p
     LEFT JOIN users u ON u.id = p.student_id
     LEFT JOIN formula_proposals fp ON fp.id = p.pack_id
     ORDER BY p.payment_date DESC`
  );

  return rows;
};