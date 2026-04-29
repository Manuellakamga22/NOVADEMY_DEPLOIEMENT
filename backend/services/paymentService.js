const paymentRepository = require("../repositories/paymentRepository");
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

  // j'insère le paiement
  const result = await paymentRepository.createPayment({
    student_id,
    pack_id,
    amount,
    payment_method: payment_method || null,
    payment_date:   payment_date   || null
  });

  // je mets à jour la formule en "payee" pour que le prof soit notifié
  await db.query(
    `UPDATE formula_proposals SET status = 'payee' WHERE id = ?`,
    [pack_id]
  );

  return {
    message:   "Paiement enregistré avec succès",
    paymentId: result.insertId
  };
};

exports.getPaymentsByStudent = async (studentId) => {
  if (!studentId) throw { status: 400, message: "ID élève manquant" };
  return await paymentRepository.getPaymentsByStudent(studentId);
};

// je récupère les revenus d'un prof depuis ses formules payées
exports.getPaymentsByTeacher = async (teacherId) => {
  if (!teacherId) throw { status: 400, message: "ID professeur manquant" };
  return await paymentRepository.getPaymentsByTeacher(teacherId);
};

// Admin : tous les paiements
exports.getAllPayments = async () => {
  return await paymentRepository.getAllPayments();
};