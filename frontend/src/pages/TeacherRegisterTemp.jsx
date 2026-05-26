import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function TeacherRegisterTemp() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    password: "",
    role: "teacher",
  });

  const isStrongPassword = (password) => {
    return /^(?=.*[A-Z])(?=.*\d).{8,}$/.test(password);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("SUBMIT REGISTER PROF déclenché");
    console.log("Données envoyées :", formData);

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
      alert("Le mot de passe doit contenir au moins 8 caractères, 1 majuscule et 1 chiffre.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5001/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      console.log("STATUS HTTP REGISTER PROF :", response.status);

      const data = await response.json();
      console.log("REPONSE BACKEND REGISTER PROF :", data);

      if (!response.ok) {
        alert(data.message || "Erreur lors de l'inscription");
        return;
      }

      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      alert(data.message || "Utilisateur créé avec succès");
      navigate("/teacher/profile");
    } catch (error) {
      console.error("Erreur register professeur :", error);
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
            8 caractères minimum, avec 1 majuscule et 1 chiffre.
          </p>

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

export default TeacherRegisterTemp;