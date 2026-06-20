const reviewRepository = require("../repositories/reviewRepository");
const paymentRepository = require("../repositories/paymentRepository");
const trialRepository   = require("../repositories/trialRequestRepository");

exports.createReview = async ({ student_id, teacher_id, course_id, rating, comment }) => {
  if (!student_id || !teacher_id || !rating) {
    throw { status: 400, message: "student_id, teacher_id et rating sont obligatoires" };
  }
  if (rating < 1 || rating > 5) {
    throw { status: 400, message: "La note doit être entre 1 et 5" };
  }

  // un avis n'est autorisé qu'après un paiement validé ou un cours d'essai accepté
  const paiements = await paymentRepository.getPaymentsByStudent(student_id);
  const aPaye = paiements.some(p => Number(p.teacher_id) === Number(teacher_id));

  const aUnEssaiAccepte = await trialRepository.hasAcceptedTrialBetweenUsers(
    Number(student_id),
    Number(teacher_id)
  );

  if (!aPaye && !aUnEssaiAccepte) {
    throw {
      status: 403,
      message: "Vous ne pouvez laisser un avis qu'après un paiement validé ou un cours d'essai effectué.",
    };
  }

  const result = await reviewRepository.createReview({
    student_id, teacher_id, course_id: course_id || null, rating, comment: comment || null
  });
  return { message: "Avis enregistré avec succès", reviewId: result.insertId };
};

exports.getReviewsByTeacher = async (teacherId) => {
  if (!teacherId) throw { status: 400, message: "ID professeur manquant" };
  return await reviewRepository.getReviewsByTeacher(teacherId);
};

// Admin
exports.getAllReviews = async () => {
  return await reviewRepository.getAllReviews();
};

exports.deleteReview = async (id) => {
  if (!id) throw { status: 400, message: "ID avis manquant" };
  await reviewRepository.deleteReview(id);
  return { message: "Avis supprimé" };
};