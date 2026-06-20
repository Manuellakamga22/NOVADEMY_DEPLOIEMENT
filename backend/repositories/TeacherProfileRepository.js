const db = require("../db");

// profil prof par son user_id
exports.getTeacherProfileByUserId = async (userId) => {
  const [rows] = await db.query(
    `SELECT * FROM teacher_profiles WHERE user_id = ? LIMIT 1`,
    [userId]
  );
  return rows[0] || null;
};

// create un profil prof - colonnes réelles en BDD
exports.createTeacherProfile = async ({
  user_id,
  city,
  teaching_levels,
  diplomas,
  experience,
}) => {
  const [result] = await db.query(
    `INSERT INTO teacher_profiles
     (user_id, city, teaching_levels, diplomas, experience)
     VALUES (?, ?, ?, ?, ?)`,
    [
      user_id,
      city || null,
      JSON.stringify(teaching_levels || []),
      diplomas || null,
      experience || null,
    ]
  );
  return result;
};

// update le profil prof - colonnes réelles en BDD
exports.updateTeacherProfile = async ({
  user_id,
  city,
  teaching_levels,
  diplomas,
  experience,
}) => {
  const [result] = await db.query(
    `UPDATE teacher_profiles
     SET city = ?, teaching_levels = ?, diplomas = ?, experience = ?
     WHERE user_id = ?`,
    [
      city || null,
      JSON.stringify(teaching_levels || []),
      diplomas || null,
      experience || null,
      user_id,
    ]
  );
  return result;
};

// update la photo du prof
exports.updateTeacherPhoto = async (userId, photoUrl) => {
  const [result] = await db.query(
    `UPDATE teacher_profiles SET photo_url = ? WHERE user_id = ?`,
    [photoUrl, userId]
  );
  return result;
};