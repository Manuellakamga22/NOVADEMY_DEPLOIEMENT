const Stripe = require("stripe");
const paymentRepository = require("../repositories/paymentRepository");
const notifService = require("./notificationService");
const db = require("../db");

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

exports.createCheckoutSession = async ({ pack_id, amount }, user) => {
  if (!user?.id) {
    throw { status: 401, message: "Utilisateur non connecté" };
  }

  if (!pack_id || !amount) {
    throw { status: 400, message: "Formule ou montant manquant" };
  }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",

    line_items: [
      {
        price_data: {
          currency: "eur",
          product_data: {
            name: `Formule NOVADEMY #${pack_id}`,
          },
          unit_amount: Math.round(Number(amount) * 100),
        },
        quantity: 1,
      },
    ],

    success_url: `${process.env.FRONTEND_URL}/payment?success=true&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.FRONTEND_URL}/payment?canceled=true`,

    metadata: {
      student_id: String(user.id),
      pack_id: String(pack_id),
      amount: String(amount),
    },
  });

  return { url: session.url };
};

exports.confirmStripePayment = async (sessionId, user) => {
  if (!sessionId) {
    throw { status: 400, message: "Session Stripe manquante" };
  }

  const session = await stripe.checkout.sessions.retrieve(sessionId);

  if (session.payment_status !== "paid") {
    throw { status: 400, message: "Paiement non validé par Stripe" };
  }

  const studentId = Number(session.metadata.student_id);
  const packId = Number(session.metadata.pack_id);
  const amount = Number(session.metadata.amount);

  if (studentId !== Number(user.id)) {
    throw { status: 403, message: "Paiement non autorisé" };
  }

  const existing = await paymentRepository.findByStripeSessionId(sessionId);

  if (existing) {
    return {
      message: "Paiement déjà confirmé",
      paymentId: existing.id,
    };
  }

  const result = await paymentRepository.createPayment({
    student_id: studentId,
    pack_id: packId,
    amount,
    payment_method: "Stripe",
    payment_date: new Date(),
    stripe_session_id: sessionId,
    status: "paid",
  });

  await db.query(
    `UPDATE formula_proposals SET status = 'payee' WHERE id = ?`,
    [packId]
  );

  try {
    const [rows] = await db.query(
      `SELECT fp.teacher_id, u.prenom AS student_prenom, u.nom AS student_nom
       FROM formula_proposals fp
       JOIN users u ON u.id = ?
       WHERE fp.id = ?
       LIMIT 1`,
      [studentId, packId]
    );

    if (rows.length > 0) {
      const { teacher_id, student_prenom, student_nom } = rows[0];

      await notifService.paiementRecu({
        teacher_id: Number(teacher_id),
        student_nom:
          `${student_prenom || ""} ${student_nom || ""}`.trim() || "Un élève",
        montant: amount,
      });
    }
  } catch {
    // notification non bloquante
  }

  return {
    message: "Paiement Stripe confirmé avec succès",
    paymentId: result.insertId,
  };
};

exports.createPayment = async ({
  student_id,
  pack_id,
  amount,
  payment_method,
  payment_date,
}) => {
  if (!student_id || !pack_id || !amount) {
    throw { status: 400, message: "Champs paiement obligatoires manquants" };
  }

  const result = await paymentRepository.createPayment({
    student_id,
    pack_id,
    amount,
    payment_method: payment_method || "Manuel",
    payment_date: payment_date || new Date(),
    stripe_session_id: null,
    status: "paid",
  });

  await db.query(
    `UPDATE formula_proposals SET status = 'payee' WHERE id = ?`,
    [pack_id]
  );

  return {
    message: "Paiement enregistré avec succès",
    paymentId: result.insertId,
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