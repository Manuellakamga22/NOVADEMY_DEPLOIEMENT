import { useState } from "react";

function CookieBanner() {
  const [visible, setVisible] = useState(
    () => !localStorage.getItem("cookies_accepted")
  );

  if (!visible) return null;

  const accepter = () => {
    localStorage.setItem("cookies_accepted", "true");
    setVisible(false);
  };

  const refuser = () => {
    localStorage.setItem("cookies_accepted", "false");
    setVisible(false);
  };

  return (
    <div style={banner}>
      <p style={texte}>
        NOVADEMY utilise des cookies strictement nécessaires au fonctionnement du site
        (session, authentification). Aucun cookie publicitaire n'est utilisé.{" "}
        <a href="/politique-confidentialite" style={lien}>
          Politique de confidentialité
        </a>
      </p>
      <div style={btns}>
        <button style={btnRefus} onClick={refuser}>Refuser</button>
        <button style={btnAccept} onClick={accepter}>Accepter</button>
      </div>
    </div>
  );
}

const banner = {
  position: "fixed",
  bottom: 0,
  left: 0,
  right: 0,
  background: "#1F2937",
  color: "#F9FAFB",
  padding: "18px 28px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 20,
  zIndex: 9999,
  flexWrap: "wrap",
  boxShadow: "0 -4px 20px rgba(0,0,0,0.15)",
};

const texte = {
  margin: 0,
  fontSize: 15,
  lineHeight: 1.6,
  flex: 1,
};

const lien = {
  color: "#93C5FD",
  textDecoration: "underline",
};

const btns = {
  display: "flex",
  gap: 10,
  flexShrink: 0,
};

const btnAccept = {
  padding: "10px 22px",
  background: "#2563EB",
  color: "#fff",
  border: "none",
  borderRadius: 8,
  fontWeight: 600,
  fontSize: 14,
  cursor: "pointer",
};

const btnRefus = {
  padding: "10px 22px",
  background: "transparent",
  color: "#D1D5DB",
  border: "1px solid #4B5563",
  borderRadius: 8,
  fontWeight: 600,
  fontSize: 14,
  cursor: "pointer",
};

export default CookieBanner;
