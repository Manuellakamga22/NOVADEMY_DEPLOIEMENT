import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { apiFetch } from "../config/api.js";

function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const isStrongPassword = (password) => {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{12,}$/.test(password);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      alert("Token manquant ou invalide.");
      return;
    }

    if (!isStrongPassword(formData.newPassword)) {
      alert("Le mot de passe doit contenir au moins 12 caractères, 1 minuscule, 1 majuscule, 1 chiffre et 1 caractère spécial.");
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      alert("Les deux mots de passe ne correspondent pas.");
      return;
    }

    try {
      const response = await apiFetch("/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: token,
          newPassword: formData.newPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Erreur lors de la réinitialisation.");
        return;
      }

      alert("Mot de passe réinitialisé avec succès.");
      navigate("/login");
    } catch (error) {
      alert("Erreur de connexion au serveur.");
    }
  };

  return (
    <div style={pageStyle}>
      <div style={cardStyle}>
        <a href="/login" style={homeLinkStyle}>
          ← Retour à la connexion
        </a>

        <div style={headerStyle}>
          <h2 style={logoStyle}>NOVA<span style={{ color: "#111827" }}>DEMY</span></h2>
          <h1 style={titleStyle}>Nouveau mot de passe</h1>
          <p style={subtitleStyle}>
            Choisissez un nouveau mot de passe pour récupérer votre compte.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={fieldStyle}>
            <label style={labelStyle}>Nouveau mot de passe</label>
            <input
              name="newPassword"
              type="password"
              placeholder="Ex : Novademy2026"
              value={formData.newPassword}
              onChange={handleChange}
              style={inputStyle}
            />
            <p style={hintStyle}>8 caractères minimum, 1 majuscule et 1 chiffre.</p>
          </div>

          <div style={fieldStyle}>
            <label style={labelStyle}>Confirmer le mot de passe</label>
            <input
              name="confirmPassword"
              type="password"
              placeholder="Confirmez le mot de passe"
              value={formData.confirmPassword}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>

          <button type="submit" style={buttonStyle}>
            Réinitialiser mon mot de passe
          </button>
        </form>
      </div>
    </div>
  );
}

const pageStyle = {
  minHeight: "100vh",
  background: "#F5F7FF",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: 24,
  fontFamily: "'Segoe UI', sans-serif",
};

const cardStyle = {
  width: "100%",
  maxWidth: 500,
  backgroundColor: "#fff",
  borderRadius: 18,
  padding: 38,
  boxShadow: "0 12px 30px rgba(0,0,0,0.08)",
  border: "1px solid #E5E7EB",
};

const homeLinkStyle = {
  textDecoration: "none",
  fontWeight: 600,
  color: "#2563EB",
  fontSize: 16,
};

const headerStyle = {
  textAlign: "center",
  margin: "25px 0",
};

const logoStyle = {
  fontSize: 34,
  color: "#2563EB",
  marginBottom: 10,
};

const titleStyle = {
  fontSize: 30,
  marginBottom: 8,
  color: "#111827",
};

const subtitleStyle = {
  fontSize: 17,
  color: "#6B7280",
  lineHeight: 1.5,
};

const fieldStyle = {
  marginBottom: 18,
};

const labelStyle = {
  display: "block",
  marginBottom: 7,
  color: "#374151",
  fontWeight: 700,
  fontSize: 16,
};

const inputStyle = {
  width: "100%",
  padding: 15,
  borderRadius: 10,
  border: "1px solid #D1D5DB",
  backgroundColor: "#F9FAFB",
  fontSize: 16,
  boxSizing: "border-box",
};

const hintStyle = {
  fontSize: 14,
  color: "#6B7280",
  marginTop: 7,
};

const buttonStyle = {
  width: "100%",
  padding: 16,
  border: "none",
  borderRadius: 10,
  background: "#2563EB",
  color: "#fff",
  fontSize: 18,
  fontWeight: 700,
  cursor: "pointer",
};

export default ResetPassword;