const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const authRepository = require("../repositories/authRepository");

const isStrongPassword = (password) => {
  const regex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
  return regex.test(password);
};

exports.register = async ({ nom, prenom, email, password, role }) => {
  if (!nom || !prenom || !email || !password || !role) {
    throw { status: 400, message: "Tous les champs sont obligatoires." };
  }

  if (!isStrongPassword(password)) {
    throw {
      status: 400,
      message: "Le mot de passe doit contenir au moins 8 caractères, 1 majuscule et 1 chiffre.",
    };
  }

  const existingUser = await authRepository.findUserByEmail(email);
  if (existingUser) {
    throw { status: 400, message: "Email déjà utilisé." };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const result = await authRepository.createUser({
    nom,
    prenom,
    email,
    password: hashedPassword,
    role,
  });

  return {
    message: "Utilisateur créé avec succès",
    user: {
      id: result.insertId,
      nom,
      prenom,
      email,
      role,
    },
  };
};

exports.login = async ({ email, password }) => {
  if (!email || !password) {
    throw { status: 400, message: "Email et mot de passe obligatoires." };
  }

  const user = await authRepository.findUserByEmail(email);

  if (!user) {
    throw { status: 404, message: "Utilisateur introuvable." };
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw { status: 401, message: "Mot de passe incorrect." };
  }

  const token = jwt.sign(
    { id: user.id, role: user.role, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  return {
    message: "Connexion réussie",
    token,
    user: {
      id: user.id,
      nom: user.nom,
      prenom: user.prenom,
      email: user.email,
      role: user.role,
    },
  };
};

exports.forgotPassword = async ({ email }) => {
  if (!email) {
    throw { status: 400, message: "Email obligatoire." };
  }

  const user = await authRepository.findUserByEmail(email);

  if (!user) {
    throw { status: 404, message: "Aucun utilisateur avec cet email." };
  }

  const resetToken = crypto.randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000);

  await authRepository.createResetToken(user.id, resetToken, expiresAt);

  return {
    message: "Lien de réinitialisation généré.",
    resetToken,
  };
};

exports.resetPassword = async ({ token, newPassword }) => {
  if (!token || !newPassword) {
    throw { status: 400, message: "Token et nouveau mot de passe obligatoires." };
  }

  if (!isStrongPassword(newPassword)) {
    throw {
      status: 400,
      message: "Mot de passe non sécurisé.",
    };
  }

  const resetRow = await authRepository.findLatestResetToken(token);

  if (!resetRow) {
    throw { status: 404, message: "Token invalide." };
  }

  const now = new Date();
  const expiresAt = new Date(resetRow.expires_at);

  if (now > expiresAt) {
    throw { status: 400, message: "Token expiré." };
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  await authRepository.updatePassword(resetRow.user_id, hashedPassword);
  await authRepository.deleteResetTokensByUserId(resetRow.user_id);

  return {
    message: "Mot de passe réinitialisé avec succès.",
  };
};