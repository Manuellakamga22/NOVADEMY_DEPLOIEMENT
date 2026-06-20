const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const authRepository = require("../repositories/authRepository");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

function isStrongPassword(password) {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{12,}$/.test(password);
}

exports.register = async ({ nom, prenom, email, password, role }) => {
  if (!nom || !prenom || !email || !password || !role) {
    throw { status: 400, message: "Tous les champs sont obligatoires." };
  }
  if (!isStrongPassword(password)) {
    throw { status: 400, message: "Le mot de passe doit contenir au moins 12 caractères, 1 minuscule, 1 majuscule, 1 chiffre et 1 caractère spécial." };
  }
  const existingUser = await authRepository.findUserByEmail(email);
  if (existingUser) {
    throw { status: 400, message: "Email déjà utilisé." };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await authRepository.createUser({ nom, prenom, email, password: hashedPassword, role });

  const annee = new Date().getFullYear();
  const mailOptions = {
    from: `"NOVADEMY" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Bienvenue sur NOVADEMY",
    html: `
      <div style="font-family:'Segoe UI',Arial,sans-serif;max-width:520px;margin:0 auto;padding:32px 24px;background:#fff;border:1px solid #E5E7EB;border-radius:12px;">
        <div style="text-align:center;margin-bottom:28px;">
          <span style="font-size:26px;font-weight:800;letter-spacing:-0.02em;color:#111827;">
            NOVA<span style="color:#2563EB;">DEMY</span>
          </span>
        </div>
        <h2 style="font-size:20px;font-weight:700;color:#111827;margin-bottom:16px;">Bienvenue sur NOVADEMY !</h2>
        <p style="color:#374151;font-size:15px;line-height:1.7;margin-bottom:10px;">Bonjour <strong>${prenom}</strong>,</p>
        <p style="color:#374151;font-size:15px;line-height:1.7;margin-bottom:24px;">
          Votre compte NOVADEMY a bien été créé. Vous pouvez dès maintenant vous connecter et commencer à utiliser la plateforme.
        </p>
        <p style="color:#9CA3AF;font-size:13px;line-height:1.6;">
          Si vous n'avez pas créé de compte sur NOVADEMY, ignorez cet email.
        </p>
        <hr style="border:none;border-top:1px solid #F3F4F6;margin:24px 0;" />
        <p style="color:#9CA3AF;font-size:12px;text-align:center;margin:0;">
          © ${annee} NOVADEMY — Plateforme de cours particuliers
        </p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (err) {
    console.error("Erreur envoi email bienvenue :", err.message);
  }

  return { message: "Votre compte a été créé avec succès. Vous pouvez maintenant vous connecter." };
};

exports.login = async ({ email, password }) => {
  if (!email || !password) {
    throw { status: 400, message: "Email et mot de passe obligatoires." };
  }
  const user = await authRepository.findUserByEmail(email);
  if (!user) throw { status: 404, message: "Utilisateur introuvable." };

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw { status: 401, message: "Mot de passe incorrect." };

  const token = jwt.sign(
    { id: user.id, role: user.role, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  return {
    message: "Connexion réussie",
    token,
    user: { id: user.id, nom: user.nom, prenom: user.prenom, email: user.email, role: user.role },
  };
};

exports.forgotPassword = async ({ email }) => {
  if (!email) throw { status: 400, message: "Email obligatoire." };

  const user = await authRepository.findUserByEmail(email);
  if (!user) throw { status: 404, message: "Aucun utilisateur avec cet email." };

  const resetToken = crypto.randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000);

  await authRepository.createResetToken(user.id, resetToken, expiresAt);

  const resetUrl = `${process.env.FRONTEND_URL || "http://localhost:5173"}/reset-password/${resetToken}`;
  const annee = new Date().getFullYear();

  const mailOptions = {
    from: `"NOVADEMY" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Réinitialisation de votre mot de passe — NOVADEMY",
    html: `
      <div style="font-family:'Segoe UI',Arial,sans-serif;max-width:520px;margin:0 auto;padding:32px 24px;background:#fff;border:1px solid #E5E7EB;border-radius:12px;">
        <div style="text-align:center;margin-bottom:28px;">
          <span style="font-size:26px;font-weight:800;letter-spacing:-0.02em;color:#111827;">
            NOVA<span style="color:#2563EB;">DEMY</span>
          </span>
        </div>
        <h2 style="font-size:20px;font-weight:700;color:#111827;margin-bottom:16px;">Réinitialisation de mot de passe</h2>
        <p style="color:#374151;font-size:15px;line-height:1.7;margin-bottom:10px;">Bonjour <strong>${user.prenom}</strong>,</p>
        <p style="color:#374151;font-size:15px;line-height:1.7;margin-bottom:24px;">
          Vous avez demandé la réinitialisation de votre mot de passe sur NOVADEMY.<br/>
          Cliquez sur le bouton ci-dessous — ce lien est valide <strong>1 heure</strong>.
        </p>
        <div style="text-align:center;margin:28px 0;">
          <a href="${resetUrl}" style="background:#2563EB;color:#fff;padding:14px 30px;text-decoration:none;border-radius:8px;font-weight:700;font-size:15px;display:inline-block;">
            Réinitialiser mon mot de passe
          </a>
        </div>
        <p style="color:#9CA3AF;font-size:13px;line-height:1.6;">
          Si vous n'êtes pas à l'origine de cette demande, ignorez cet email. Votre mot de passe ne sera pas modifié.
        </p>
        <hr style="border:none;border-top:1px solid #F3F4F6;margin:24px 0;" />
        <p style="color:#9CA3AF;font-size:12px;text-align:center;margin:0;">
          © ${annee} NOVADEMY — Plateforme de cours particuliers
        </p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { message: "Un email de réinitialisation a été envoyé." };
  } catch (error) {
    console.error("Erreur envoi email :", error);
    throw { status: 500, message: "Erreur lors de l'envoi de l'email." };
  }
};

exports.activateAccount = async (token) => {
  if (!token) throw { status: 400, message: "Token manquant." };

  const user = await authRepository.findByActivationToken(token);
  if (!user) throw { status: 404, message: "Lien d'activation invalide ou déjà utilisé." };

  if (new Date() > new Date(user.activation_token_expires_at)) {
    throw { status: 400, message: "Lien d'activation expiré. Veuillez vous réinscrire." };
  }

  await authRepository.activateUser(user.id);

  return { message: "Votre compte est maintenant activé. Vous pouvez vous connecter." };
};

exports.resetPassword = async ({ token, newPassword }) => {
  if (!token || !newPassword) {
    throw { status: 400, message: "Token et nouveau mot de passe obligatoires." };
  }
  if (!isStrongPassword(newPassword)) {
    throw { status: 400, message: "Le mot de passe doit contenir au moins 12 caractères, 1 minuscule, 1 majuscule, 1 chiffre et 1 caractère spécial." };
  }

  const resetRow = await authRepository.findLatestResetToken(token);
  if (!resetRow) throw { status: 404, message: "Token invalide ou expiré." };

  if (new Date() > new Date(resetRow.expires_at)) {
    throw { status: 400, message: "Token expiré." };
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  await authRepository.updatePassword(resetRow.user_id, hashedPassword);
  await authRepository.deleteResetTokensByUserId(resetRow.user_id);

  return { message: "Mot de passe réinitialisé avec succès." };
};