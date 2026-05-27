const paymentService = require("../services/paymentService");

exports.createPayment = async (req, res) => {
  try {
    const result = await paymentService.createPayment(req.body);
    return res.status(201).json(result);
  } catch (error) {
    return res.status(error.status || 500).json({
      message: error.message || "Erreur serveur",
    });
  }
};

exports.createCheckoutSession = async (req, res) => {
  try {
    const result = await paymentService.createCheckoutSession(req.body, req.user);
    return res.json(result);
  } catch (error) {
    return res.status(error.status || 500).json({
      message: error.message || "Erreur serveur",
    });
  }
};

exports.confirmStripePayment = async (req, res) => {
  try {
    const result = await paymentService.confirmStripePayment(
      req.params.sessionId,
      req.user
    );
    return res.json(result);
  } catch (error) {
    return res.status(error.status || 500).json({
      message: error.message || "Erreur serveur",
    });
  }
};

exports.getPaymentsByStudent = async (req, res) => {
  try {
    const result = await paymentService.getPaymentsByStudent(req.params.id);
    return res.json(result);
  } catch (error) {
    return res.status(error.status || 500).json({
      message: error.message || "Erreur serveur",
    });
  }
};

exports.getPaymentsByTeacher = async (req, res) => {
  try {
    const result = await paymentService.getPaymentsByTeacher(req.params.id);
    return res.json(result);
  } catch (error) {
    return res.status(error.status || 500).json({
      message: error.message || "Erreur serveur",
    });
  }
};

exports.getAllPayments = async (req, res) => {
  try {
    const result = await paymentService.getAllPayments();
    return res.json(result);
  } catch (error) {
    return res.status(error.status || 500).json({
      message: error.message || "Erreur serveur",
    });
  }
};