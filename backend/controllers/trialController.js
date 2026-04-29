const trialService = require("../services/trialService");

exports.createTrialRequest = async (req, res) => {
  try {
    const result = await trialService.createTrialRequest(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(error.status || 500).json({
      message: error.message || "Erreur serveur",
    });
  }
};

exports.getAllTrials = async (req, res) => {
  try {
    const result = await trialService.getAllTrials();
    res.status(200).json(result);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message || "Erreur serveur" });
  }
};

exports.getTeacherTrials = async (req, res) => {
  try {
    const { teacherId } = req.params;
    const result = await trialService.getTeacherTrials(teacherId);
    res.status(200).json(result);
  } catch (error) {
    res.status(error.status || 500).json({
      message: error.message || "Erreur serveur",
    });
  }
};

exports.getStudentTrials = async (req, res) => {
  try {
    const { studentId } = req.params;
    const result = await trialService.getStudentTrials(studentId);
    res.status(200).json(result);
  } catch (error) {
    res.status(error.status || 500).json({
      message: error.message || "Erreur serveur",
    });
  }
};

exports.updateTrialStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const result = await trialService.updateTrialStatus(id, status);
    res.status(200).json(result);
  } catch (error) {
    res.status(error.status || 500).json({
      message: error.message || "Erreur serveur",
    });
  }
};