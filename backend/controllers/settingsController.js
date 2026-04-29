const settingsService = require("../services/settingsService");

exports.getAll = async (req, res) => {
  try {
    const result = await settingsService.getAll();
    return res.json(result);
  } catch (error) {
    return res.status(error.status || 500).json({
      message: error.message || "Erreur serveur",
    });
  }
};

exports.updateMany = async (req, res) => {
  try {
    const result = await settingsService.updateMany(req.body);
    return res.json(result);
  } catch (error) {
    return res.status(error.status || 500).json({
      message: error.message || "Erreur serveur",
    });
  }
};