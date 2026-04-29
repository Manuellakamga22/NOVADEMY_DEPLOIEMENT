const announcementRepository = require("../repositories/announcementRepository");

exports.createAnnouncement = async ({
  teacher_id,
  subject,
  level,
  city,
  mode,
  title,
  description,
  methodology,
  student_rate,
  teacher_rate,
}) => {
  if (
    !teacher_id ||
    !subject ||
    !level ||
    !city ||
    !mode ||
    !title ||
    !description ||
    !methodology ||
    !student_rate ||
    !teacher_rate
  ) {
    throw { status: 400, message: "Tous les champs sont obligatoires." };
  }

  const existingAnnouncement =
    await announcementRepository.findTeacherAnnouncementBySubject(
      teacher_id,
      subject
    );

  if (existingAnnouncement) {
    throw {
      status: 400,
      message: "Vous avez déjà créé une annonce pour cette matière.",
    };
  }

  const result = await announcementRepository.createAnnouncement({
    teacher_id,
    subject,
    level,
    city,
    mode,
    title,
    description,
    methodology,
    student_rate,
    teacher_rate,
  });

  return {
    message: "Annonce créée avec succès",
    id: result.insertId,
  };
};

exports.getActiveAnnouncements = async ({ subject, city, mode }) => {
  return await announcementRepository.getActiveAnnouncements({
    subject,
    city,
    mode,
  });
};

exports.getAnnouncementById = async (id) => {
  if (!id) {
    throw { status: 400, message: "ID annonce manquant" };
  }

  const announcement = await announcementRepository.getAnnouncementById(id);

  if (!announcement) {
    throw { status: 404, message: "Annonce introuvable" };
  }

  return announcement;
};

exports.getTeacherAnnouncements = async (teacherId) => {
  if (!teacherId) {
    throw { status: 400, message: "ID professeur manquant" };
  }

  return await announcementRepository.getTeacherAnnouncements(teacherId);
};