import { useState } from "react";

function ResetPassword() {
  const [formData, setFormData] = useState({
    token: "",
    newPassword: "",
  });

  const isStrongPassword = (password) => {
    return /^(?=.*[A-Z])(?=.*\d).{8,}$/.test(password);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isStrongPassword(formData.newPassword)) {
      alert("Le mot de passe doit contenir au moins 8 caractères, 1 majuscule et 1 chiffre.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Erreur");
        return;
      }

      alert(data.message);
      window.location.href = "/login";
    } catch (error) {
      alert("Erreur de connexion au serveur");
    }
  };

  return (
    <div style={pageStyle}>
      <div style={cardStyle}>
        <div style={topBarStyle}>
          <a href="/login" style={homeLinkStyle}>
            ← Retour à la connexion
          </a>
        </div>

        <div style={headerStyle}>
          <h2 style={logoStyle}>NOVADEMY</h2>
          <h1 style={titleStyle}>Réinitialiser le mot de passe</h1>
          <p style={subtitleStyle}>
            Entrez le token reçu et choisissez un nouveau mot de passe
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={fieldStyle}>
            <label style={labelStyle}>Token</label>
            <input
              name="token"
              type="text"
              placeholder="Collez le token ici"
              value={formData.token}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>

          <div style={fieldStyle}>
            <label style={labelStyle}>Nouveau mot de passe</label>
            <input
              name="newPassword"
              type="password"
              placeholder="Nouveau mot de passe"
              value={formData.newPassword}
              onChange={handleChange}
              style={inputStyle}
            />
            <p style={hintStyle}>
              8 caractères minimum, avec 1 majuscule et 1 chiffre.
            </p>
          </div>

          <button type="submit" style={buttonStyle}>
            Réinitialiser
          </button>
        </form>
      </div>
    </div>
  );
}

const pageStyle = {
  minHeight: "100vh",
  background: "linear-gradient(180deg, #f5f3ff 0%, #f8fafc 40%, #f7f7f7 100%)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "24px",
  fontFamily: "Arial, sans-serif",
};

const cardStyle = {
  width: "100%",
  maxWidth: "520px",
  backgroundColor: "white",
  borderRadius: "20px",
  padding: "42px",
  boxShadow: "0 20px 45px rgba(0,0,0,0.08)",
  border: "1px solid #e5e7eb",
};

const topBarStyle = {
  marginBottom: "12px",
};

const homeLinkStyle = {
  textDecoration: "none",
  fontWeight: "bold",
  color: "#4f46e5",
  fontSize: "18px",
};

const headerStyle = {
  textAlign: "center",
  marginBottom: "28px",
};

const logoStyle = {
  fontSize: "38px",
  color: "#4f46e5",
  marginBottom: "12px",
};

const titleStyle = {
  fontSize: "36px",
  marginBottom: "10px",
  color: "#111827",
};

const subtitleStyle = {
  fontSize: "20px",
  color: "#666",
  lineHeight: "1.6",
  margin: 0,
};

const fieldStyle = {
  marginBottom: "18px",
};

const labelStyle = {
  display: "block",
  marginBottom: "8px",
  color: "#374151",
  fontWeight: "bold",
  fontSize: "18px",
};

const inputStyle = {
  width: "100%",
  padding: "18px",
  borderRadius: "12px",
  border: "1px solid #d1d5db",
  backgroundColor: "#f9fafb",
  fontSize: "19px",
  boxSizing: "border-box",
  outline: "none",
};

const hintStyle = {
  fontSize: "15px",
  color: "#666",
  marginTop: "8px",
};

const buttonStyle = {
  width: "100%",
  padding: "18px",
  border: "none",
  borderRadius: "12px",
  background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
  color: "white",
  fontSize: "21px",
  fontWeight: "bold",
  cursor: "pointer",
  boxShadow: "0 12px 24px rgba(79, 70, 229, 0.25)",
};

export default ResetPassword;