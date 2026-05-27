const paymentService = require("../services/paymentService");

exports.createPayment = async (req, res) => {
  try {
    const result = await paymentService.createPayment(req.body);
    return res.status(201).json(result);
  } catch (error) {
    return res.status(error.status || 500).json({ message: error.message || "Erreur serveur" });
  }
};

exports.getPaymentsByStudent = async (req, res) => {
  try {
    const result = await paymentService.getPaymentsByStudent(req.params.id);
    return res.json(result);
  } catch (error) {
    return res.status(error.status || 500).json({ message: error.message || "Erreur serveur" });
  }
};

// je récupère les revenus d'un prof
exports.getPaymentsByTeacher = async (req, res) => {
  try {
    const result = await paymentService.getPaymentsByTeacher(req.params.id);
    return res.json(result);
  } catch (error) {
    return res.status(error.status || 500).json({ message: error.message || "Erreur serveur" });
  }
};

// Admin : tous les paiements
exports.getAllPayments = async (req, res) => {
  try {
    const result = await paymentService.getAllPayments();
    return res.json(result);
  } catch (error) {
    return res.status(error.status || 500).json({ message: error.message || "Erreur serveur" });
  }
};