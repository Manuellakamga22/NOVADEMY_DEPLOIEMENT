import { useState } from "react";
export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "/login";
}

function LoginTemp() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5001/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Erreur de connexion");
        return;
      }

      if (!data.user) {
        alert("Réponse utilisateur invalide");
        return;
      }

      const safeUser = {
        id: data.user.id,
        prenom: data.user.prenom,
        nom: data.user.nom,
        email: data.user.email,
        role: data.user.role,
      };

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(safeUser));

      alert(data.message);

      if (safeUser.role === "student") {
        window.location.href = "/student/dashboard";
      } else if (safeUser.role === "teacher") {
        window.location.href = "/teacher/dashboard";
      } else if (safeUser.role === "admin") {
        window.location.href = "/admin/dashboard";
      } else {
        window.location.href = "/";
      }
    } catch (error) {
      alert("Erreur de connexion au serveur");
    }
  };

  return (
    <div style={pageStyle}>
      <div style={cardStyle}>
        <div style={topBarStyle}>
          <a href="/" style={homeLinkStyle}>
            ← Accueil
          </a>
        </div>

        <div style={headerStyle}>
          <h2 style={logoStyle}>NOVADEMY</h2>
          <h1 style={titleStyle}>Connexion</h1>
          <p style={subtitleStyle}>
            Connectez-vous à votre espace élève, professeur ou administrateur
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={fieldStyle}>
            <label style={labelStyle}>Email</label>
            <input
              name="email"
              type="email"
              placeholder="Entrez votre email"
              value={formData.email}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>

          <div style={fieldStyle}>
            <label style={labelStyle}>Mot de passe</label>
            <input
              name="password"
              type="password"
              placeholder="Entrez votre mot de passe"
              value={formData.password}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>

          <div style={forgotWrapperStyle}>
            <a href="/forgot-password" style={forgotLinkStyle}>
              Mot de passe oublié ?
            </a>
          </div>

          <button type="submit" style={buttonStyle}>
            Se connecter
          </button>
        </form>

        <p style={footerStyle}>
          Pas encore de compte ?{" "}
          <a href="/register" style={footerLinkStyle}>
            S&apos;inscrire
          </a>
        </p>
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
  fontSize: "40px",
  marginBottom: "10px",
  color: "#111827",
};

const subtitleStyle = {
  fontSize: "21px",
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

const forgotWrapperStyle = {
  display: "flex",
  justifyContent: "flex-end",
  marginBottom: "24px",
};

const forgotLinkStyle = {
  textDecoration: "none",
  color: "#4f46e5",
  fontWeight: "600",
  fontSize: "16px",
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

const footerStyle = {
  textAlign: "center",
  marginTop: "24px",
  color: "#6b7280",
  fontSize: "18px",
};

const footerLinkStyle = {
  color: "#4f46e5",
  fontWeight: "600",
  textDecoration: "none",
};

export default LoginTemp;