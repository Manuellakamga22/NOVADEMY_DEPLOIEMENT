import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "../config/api.js";

function TeacherRegisterTemp() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    password: "",
    role: "teacher",
  });

  const [cguAccepted, setCguAccepted] = useState(false);

  const isStrongPassword = (password) => {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{12,}$/.test(password);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();



    if (
      !formData.nom.trim() ||
      !formData.prenom.trim() ||
      !formData.email.trim() ||
      !formData.password.trim()
    ) {
      alert("Veuillez remplir tous les champs.");
      return;
    }

    if (!isStrongPassword(formData.password)) {
      alert("Le mot de passe doit contenir au moins 12 caractères, 1 minuscule, 1 majuscule, 1 chiffre et 1 caractère spécial.");
      return;
    }

    if (!cguAccepted) {
      alert("Veuillez accepter les Conditions Générales d'Utilisation pour continuer.");
      return;
    }

    try {
      const response = await apiFetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });


      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Erreur lors de l'inscription");
        return;
      }

      alert(data.message || "Votre compte a été créé avec succès. Vous pouvez maintenant vous connecter.");
      navigate("/login");
    } catch {
      alert("Erreur de connexion au serveur");
    }
  };

  return (
    <div style={page}>
      <div style={card}>
        <div style={topBar}>
          <a href="/" style={homeLink}>← Accueil</a>
        </div>

        <div style={header}>
          <h2 style={logo}>NOVADEMY</h2>
          <h1 style={title}>Inscription Professeur</h1>
          <p style={subtitle}>
            Créez votre compte pour compléter votre profil et publier vos annonces
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <input
            name="nom"
            style={input}
            placeholder="Nom"
            value={formData.nom}
            onChange={handleChange}
            required
          />

          <input
            name="prenom"
            style={input}
            placeholder="Prénom"
            value={formData.prenom}
            onChange={handleChange}
            required
          />

          <input
            name="email"
            type="email"
            style={input}
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            name="password"
            type="password"
            style={input}
            placeholder="Mot de passe"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <p style={hint}>
            12 caractères minimum, avec 1 minuscule, 1 majuscule, 1 chiffre et 1 caractère spécial (ex: @#$%!).
          </p>

          <div style={cguRow}>
            <input
              type="checkbox"
              id="cgu-prof"
              checked={cguAccepted}
              onChange={e => setCguAccepted(e.target.checked)}
              style={{ width: 18, height: 18, cursor: "pointer", flexShrink: 0 }}
            />
            <label htmlFor="cgu-prof" style={cguLabel}>
              J'accepte les{" "}
              <a href="/cgu" style={cguLien}>Conditions Générales d'Utilisation</a>
              {" "}et la{" "}
              <a href="/politique-confidentialite" style={cguLien}>Politique de confidentialité</a>
            </label>
          </div>

          <button type="submit" style={button}>Créer mon compte professeur</button>
        </form>

        <p style={footer}>
          Déjà un compte ? <a href="/login">Se connecter</a>
        </p>
      </div>
    </div>
  );
}

const page = {
  minHeight: "100vh",
  background: "linear-gradient(135deg, #eef2ff, #f8fafc, #f5f3ff)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontFamily: "Arial, sans-serif",
  padding: "24px",
};

const card = {
  background: "white",
  padding: "46px",
  borderRadius: "20px",
  width: "100%",
  maxWidth: "520px",
  boxShadow: "0 20px 45px rgba(0,0,0,0.08)",
  border: "1px solid #e5e7eb",
};

const topBar = {
  marginBottom: "12px",
};

const homeLink = {
  textDecoration: "none",
  fontWeight: "bold",
  color: "#4f46e5",
  fontSize: "18px",
};

const header = {
  textAlign: "center",
  marginBottom: "28px",
};

const logo = {
  fontSize: "38px",
  color: "#4f46e5",
  marginBottom: "12px",
};

const title = {
  fontSize: "40px",
  marginBottom: "10px",
  color: "#111827",
};

const subtitle = {
  fontSize: "21px",
  color: "#666",
  marginBottom: "10px",
  lineHeight: "1.6",
};

const input = {
  width: "100%",
  padding: "18px",
  marginBottom: "16px",
  borderRadius: "12px",
  border: "1px solid #ddd",
  fontSize: "20px",
  backgroundColor: "#fafafa",
  boxSizing: "border-box",
};

const hint = {
  fontSize: "15px",
  color: "#666",
  marginTop: "-8px",
  marginBottom: "14px",
};

const button = {
  width: "100%",
  padding: "18px",
  background: "#4f46e5",
  color: "white",
  border: "none",
  borderRadius: "12px",
  fontSize: "21px",
  fontWeight: "bold",
  cursor: "pointer",
  marginTop: "8px",
};

const footer = {
  textAlign: "center",
  marginTop: "24px",
  fontSize: "18px",
  color: "#555",
};

const cguRow = {
  display: "flex",
  alignItems: "flex-start",
  gap: 10,
  marginBottom: 18,
  marginTop: 4,
};

const cguLabel = {
  fontSize: 15,
  color: "#374151",
  lineHeight: 1.5,
  cursor: "pointer",
};

const cguLien = {
  color: "#4f46e5",
  fontWeight: 600,
  textDecoration: "none",
};

export default TeacherRegisterTemp;