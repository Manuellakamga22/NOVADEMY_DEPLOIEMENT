import React, { useEffect, useState } from "react";
import { apiFetch } from "../config/api.js";

function AccountActivation() {
  const [status,  setStatus]  = useState("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const parts = window.location.pathname.split("/");
    const token = parts[parts.length - 1];

    if (!token) {
      setStatus("error");
      setMessage("Lien invalide.");
      return;
    }

    apiFetch(`/api/auth/activate/${token}`)
      .then(async (res) => {
        const data = await res.json();
        if (res.ok) {
          setStatus("success");
          setMessage(data.message);
        } else {
          setStatus("error");
          setMessage(data.message || "Lien invalide ou expiré.");
        }
      })
      .catch(() => {
        setStatus("error");
        setMessage("Erreur de connexion au serveur.");
      });
  }, []);

  const wrap = {
    fontFamily: "'Segoe UI', sans-serif",
    minHeight: "100vh",
    background: "#F9FAFB",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px 20px",
  };

  const card = {
    background: "#fff",
    borderRadius: 16,
    padding: "48px 40px",
    maxWidth: 480,
    width: "100%",
    textAlign: "center",
    boxShadow: "0 4px 20px rgba(0,0,0,0.07)",
    border: "1px solid #E5E7EB",
  };

  const icon = {
    fontSize: 48,
    marginBottom: 20,
  };

  const title = {
    fontSize: 22,
    fontWeight: 800,
    color: "#111827",
    margin: "0 0 14px",
  };

  const msg = {
    fontSize: 15,
    color: "#6B7280",
    lineHeight: 1.7,
    margin: "0 0 28px",
  };

  const btn = {
    display: "inline-block",
    background: "#2563EB",
    color: "#fff",
    padding: "12px 24px",
    borderRadius: 10,
    fontFamily: "inherit",
    fontSize: 15,
    fontWeight: 700,
    textDecoration: "none",
  };

  if (status === "loading") {
    return (
      <div style={wrap}>
        <div style={card}>
          <p style={{ color: "#9CA3AF", fontSize: 15 }}>Vérification en cours…</p>
        </div>
      </div>
    );
  }

  return (
    <div style={wrap}>
      <div style={card}>
        <div style={logo}>
          <span style={{ fontSize: 24, fontWeight: 800, color: "#111827" }}>
            NOVA<span style={{ color: "#2563EB" }}>DEMY</span>
          </span>
        </div>

        <div style={icon}>{status === "success" ? "✅" : "❌"}</div>

        <h1 style={title}>
          {status === "success" ? "Compte activé !" : "Activation impossible"}
        </h1>

        <p style={msg}>{message}</p>

        <a href="/login" style={btn}>
          {status === "success" ? "Se connecter" : "Retour à la connexion"}
        </a>
      </div>
    </div>
  );
}

const logo = { marginBottom: 24 };

export default AccountActivation;
