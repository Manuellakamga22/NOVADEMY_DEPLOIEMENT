import { useState } from "react";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("${import.meta.env.VITE_API_URL}/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Erreur");
        return;
      }

      alert(data.message);
    } catch (error) {
      alert("Erreur de connexion au serveur");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #eef2ff 0%, #f8fafc 45%, #f5f3ff 100%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Arial, sans-serif",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "460px",
          backgroundColor: "white",
          borderRadius: "20px",
          padding: "40px 32px",
          boxShadow: "0 20px 50px rgba(79, 70, 229, 0.15)",
          border: "1px solid #e5e7eb",
        }}
      >
        <div style={{ marginBottom: "16px" }}>
          <a
            href="/login"
            style={{
              textDecoration: "none",
              fontWeight: "bold",
              color: "#4f46e5",
              fontSize: "18px",
            }}
          >
            ← Retour à la connexion
          </a>
        </div>

        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <h2
            style={{
              margin: 0,
              fontSize: "34px",
              color: "#312e81",
              fontWeight: "bold",
            }}
          >
            NOVADEMY
          </h2>

          <h1
            style={{
              marginTop: "12px",
              marginBottom: "8px",
              fontSize: "34px",
              color: "#111827",
            }}
          >
            Mot de passe oublié
          </h1>

          <p style={{ margin: 0, color: "#6b7280", fontSize: "19px", lineHeight: "1.6" }}>
            Entrez votre email pour recevoir un lien de réinitialisation
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "22px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                color: "#374151",
                fontWeight: "600",
                fontSize: "18px",
              }}
            >
              Email
            </label>
            <input
              type="email"
              placeholder="Entrez votre email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: "100%",
                padding: "16px",
                borderRadius: "12px",
                border: "1px solid #d1d5db",
                backgroundColor: "#f9fafb",
                outline: "none",
                fontSize: "19px",
                boxSizing: "border-box",
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "16px",
              border: "none",
              borderRadius: "12px",
              background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
              color: "white",
              fontSize: "20px",
              fontWeight: "bold",
              cursor: "pointer",
              boxShadow: "0 12px 24px rgba(79, 70, 229, 0.25)",
            }}
          >
            Envoyer le lien
          </button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;