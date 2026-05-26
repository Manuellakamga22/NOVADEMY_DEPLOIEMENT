const paymentRepository = require("../repositories/paymentRepository");
const notifService = require("./notificationService");
const db = require("../db");

// je crée le paiement et je mets à jour la formule en "payee"
exports.createPayment = async ({
  student_id,
  pack_id,
  amount,
  payment_method,
  payment_date
}) => {
  if (!student_id || !pack_id || !amount) {
    throw { status: 400, message: "Champs paiement obligatoires manquants" };
  }

  const result = await paymentRepository.createPayment({
    student_id,
    pack_id,
    amount,
    payment_method: payment_method || null,
    payment_date:   payment_date   || null
  });

  // je mets à jour la formule en "payee"
  await db.query(
    `UPDATE formula_proposals SET status = 'payee' WHERE id = ?`,
    [pack_id]
  );

  // je notifie le prof qu'un paiement vient d'être reçu
  try {
    const [rows] = await db.query(
      `SELECT fp.teacher_id, u.prenom AS student_prenom, u.nom AS student_nom
       FROM formula_proposals fp
       JOIN users u ON u.id = ?
       WHERE fp.id = ?
       LIMIT 1`,
      [student_id, pack_id]
    );

    if (rows.length > 0) {
      const { teacher_id, student_prenom, student_nom } = rows[0];
      const studentNom = `${student_prenom || ""} ${student_nom || ""}`.trim() || "Un élève";

      await notifService.paiementRecu({
        teacher_id: Number(teacher_id),
        student_nom: studentNom,
        montant: amount,
      });
    }
  } catch {
    // non bloquant
  }

  return {
    message:   "Paiement enregistré avec succès",
    paymentId: result.insertId
  };
};

exports.getPaymentsByStudent = async (studentId) => {
  if (!studentId) throw { status: 400, message: "ID élève manquant" };
  return await paymentRepository.getPaymentsByStudent(studentId);
};

exports.getPaymentsByTeacher = async (teacherId) => {
  if (!teacherId) throw { status: 400, message: "ID professeur manquant" };
  return await paymentRepository.getPaymentsByTeacher(teacherId);
};

exports.getAllPayments = async () => {
  return await paymentRepository.getAllPayments();
};
