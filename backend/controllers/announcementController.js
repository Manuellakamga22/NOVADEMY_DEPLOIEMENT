const announcementService = require("../services/announcementService");

exports.createAnnouncement = async (req, res) => {
  try {
    const result = await announcementService.createAnnouncement(req.body);
    return res.status(201).json(result);
  } catch (error) {
    console.error("ERREUR CREATE ANNOUNCEMENT :", error);
    return res.status(error.status || 500).json({
      message: error.message || "Erreur serveur.",
    });
  }
};

exports.getActiveAnnouncements = async (req, res) => {
  try {
    const result = await announcementService.getActiveAnnouncements(req.query);
    return res.json(result);
  } catch (error) {
    return res.status(error.status || 500).json({
      message: error.message || "Erreur serveur.",
    });
  }
};

exports.getAnnouncementById = async (req, res) => {
  try {
    const result = await announcementService.getAnnouncementById(req.params.id);
    return res.json(result);
  } catch (error) {
    return res.status(error.status || 500).json({
      message: error.message || "Erreur serveur.",
    });
  }
};

exports.getTeacherAnnouncements = async (req, res) => {
  try {
    const result = await announcementService.getTeacherAnnouncements(req.params.id);
    return res.json(result);
  } catch (error) {
    return res.status(error.status || 500).json({
      message: error.message || "Erreur serveur.",
    });
  }
};