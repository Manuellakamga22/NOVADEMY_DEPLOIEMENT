const teacherProfileService = require("../services/TeacherProfileService");

exports.getTeacherProfile = async (req, res) => {
  try {
    const requestedUserId = Number(req.params.userId);
    const connectedUserId = Number(req.user.id);

    if (requestedUserId !== connectedUserId) {
      return res.status(403).json({
        message: "Accès refusé à ce profil professeur",
      });
    }

    const result = await teacherProfileService.getTeacherProfile(requestedUserId);
    return res.json(result);
  } catch (error) {
    return res
      .status(error.status || 500)
      .json({ message: error.message || "Erreur serveur" });
  }
};

exports.saveTeacherProfile = async (req, res) => {
  try {
    const connectedUserId = Number(req.user.id);
    const bodyUserId = Number(req.body.user_id);

    if (bodyUserId !== connectedUserId) {
      return res.status(403).json({
        message: "Vous ne pouvez pas modifier le profil d'un autre utilisateur",
      });
    }

    const result = await teacherProfileService.saveTeacherProfile(req.body);
    return res.json(result);
  } catch (error) {
    return res
      .status(error.status || 500)
      .json({ message: error.message || "Erreur serveur" });
  }
};

exports.uploadPhoto = async (req, res) => {
  try {
    if (!req.file) {
      throw { status: 400, message: "Aucun fichier reçu" };
    }

    const requestedUserId = Number(req.params.userId);
    const connectedUserId = Number(req.user.id);

    if (requestedUserId !== connectedUserId) {
      return res.status(403).json({
        message: "Vous ne pouvez pas modifier la photo d'un autre utilisateur",
      });
    }

    const photoUrl = `/uploads/photos/${req.file.filename}`;
    const result = await teacherProfileService.saveTeacherPhoto(
      requestedUserId,
      photoUrl
    );

    return res.json(result);
  } catch (error) {
    return res
      .status(error.status || 500)
      .json({ message: error.message || "Erreur serveur" });
  }
};