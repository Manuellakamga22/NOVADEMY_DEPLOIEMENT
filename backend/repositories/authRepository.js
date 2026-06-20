const db = require("../db");

exports.findUserByEmail = async (email) => {
  const [rows] = await db.query(
    "SELECT * FROM users WHERE email = ?",
    [email]
  );
  return rows[0] || null;
};

exports.createUser = async ({ nom, prenom, email, password, role }) => {
  const [result] = await db.query(
    `INSERT INTO users (nom, prenom, email, password, role, is_active)
     VALUES (?, ?, ?, ?, ?, 1)`,
    [nom, prenom, email, password, role]
  );
  return result;
};

exports.findByActivationToken = async (token) => {
  const [rows] = await db.query(
    "SELECT * FROM users WHERE activation_token = ? LIMIT 1",
    [token]
  );
  return rows[0] || null;
};

exports.activateUser = async (userId) => {
  await db.query(
    "UPDATE users SET is_active = 1, activation_token = NULL, activation_token_expires_at = NULL WHERE id = ?",
    [userId]
  );
};

exports.createResetToken = async (userId, token, expiresAt) => {
  const formattedExpiresAt = expiresAt
    .toISOString()
    .slice(0, 19)
    .replace("T", " ");

  const [result] = await db.query(
    "INSERT INTO password_resets (user_id, token, expires_at) VALUES (?, ?, ?)",
    [userId, token, formattedExpiresAt]
  );

  return result;
};

exports.findLatestResetToken = async (token) => {
  const [rows] = await db.query(
    "SELECT * FROM password_resets WHERE token = ? ORDER BY created_at DESC LIMIT 1",
    [token]
  );
  return rows[0] || null;
};

exports.updatePassword = async (userId, hashedPassword) => {
  const [result] = await db.query(
    "UPDATE users SET password = ? WHERE id = ?",
    [hashedPassword, userId]
  );
  return result;
};

exports.deleteResetTokensByUserId = async (userId) => {
  const [result] = await db.query(
    "DELETE FROM password_resets WHERE user_id = ?",
    [userId]
  );
  return result;
};