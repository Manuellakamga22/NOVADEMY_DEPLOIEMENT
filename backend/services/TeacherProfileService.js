const teacherProfileRepository = require("../repositories/TeacherProfileRepository");

// profil prof
exports.getTeacherProfile = async (userId) => {
  if (!userId) throw { status: 400, message: "userId manquant" };

  const profile = await teacherProfileRepository.getTeacherProfileByUserId(userId);
  if (!profile) return {};

  let parsedLevels = [];
  try {
    parsedLevels = profile.teaching_levels
      ? JSON.parse(profile.teaching_levels)
      : [];
  } catch {
    parsedLevels = [];
  }

  return {
    ...profile,
    teaching_levels: Array.isArray(parsedLevels) ? parsedLevels : [],
  };
};

// save profil
exports.saveTeacherProfile = async ({
  user_id,
  city,
  teaching_levels,
  diplomas,
  experience,
}) => {
  if (!user_id) throw { status: 400, message: "user_id obligatoire" };

  if (!city || !diplomas || !experience) {
    throw {
      status: 400,
      message: "Veuillez remplir la ville, les diplômes et l'expérience",
    };
  }

  // j'accepte string ou tableau pour teaching_levels
  let levelsArray = teaching_levels;
  if (typeof teaching_levels === "string" && teaching_levels.trim() !== "") {
    levelsArray = [teaching_levels];
  }
  if (!Array.isArray(levelsArray) || levelsArray.length === 0) {
    throw {
      status: 400,
      message: "Veuillez sélectionner au moins un niveau d'enseignement",
    };
  }

  const payload = {
    user_id,
    city: city.trim(),
    teaching_levels: levelsArray,
    diplomas: diplomas.trim(),
    experience: experience.trim(),
  };

  const existing = await teacherProfileRepository.getTeacherProfileByUserId(user_id);

  if (existing) {
    await teacherProfileRepository.updateTeacherProfile(payload);
    return { message: "Profil professeur mis à jour avec succès" };
  }

  const result = await teacherProfileRepository.createTeacherProfile(payload);
  return {
    message: "Profil professeur enregistré avec succès",
    id: result.insertId,
  };
};

// update photo
exports.saveTeacherPhoto = async (userId, photoUrl) => {
  if (!userId || !photoUrl) throw { status: 400, message: "Paramètres manquants" };

  const existing = await teacherProfileRepository.getTeacherProfileByUserId(userId);
  if (!existing) {
    throw {
      status: 404,
      message: "Le profil professeur doit être créé avant d'ajouter une photo",
    };
  }

  await teacherProfileRepository.updateTeacherPhoto(userId, photoUrl);
  return { message: "Photo enregistrée", photo_url: photoUrl };
};