import React from "react";

const S = {
  wrap: {
    fontFamily: "'Segoe UI', sans-serif",
    minHeight: "100vh",
    background: "#F0FDF4",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px 20px",
  },
  card: {
    background: "#fff",
    borderRadius: 20,
    padding: "48px 40px",
    maxWidth: 520,
    width: "100%",
    textAlign: "center",
    boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
    border: "1px solid #D1FAE5",
  },
  iconBox: {
    width: 80,
    height: 80,
    borderRadius: "50%",
    background: "#ECFDF5",
    border: "3px solid #6EE7B7",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 28px",
    fontSize: 36,
  },
  title: {
    fontSize: 26,
    fontWeight: 800,
    color: "#111827",
    margin: "0 0 12px",
  },
  sub: {
    fontSize: 16,
    color: "#6B7280",
    lineHeight: 1.7,
    margin: "0 0 32px",
  },
  divider: {
    borderTop: "1px solid #E5E7EB",
    margin: "0 0 28px",
  },
  infoRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 0",
    fontSize: 15,
    color: "#374151",
  },
  infoLabel: {
    color: "#9CA3AF",
    fontSize: 14,
  },
  infoValue: {
    fontWeight: 700,
    color: "#111827",
  },
  btnRow: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
    marginTop: 32,
  },
  btnPrimary: {
    display: "block",
    background: "#2563EB",
    color: "#fff",
    fontFamily: "inherit",
    fontSize: 16,
    fontWeight: 700,
    padding: "14px 20px",
    borderRadius: 12,
    border: "none",
    cursor: "pointer",
    textDecoration: "none",
    textAlign: "center",
  },
  btnGhost: {
    display: "block",
    background: "#F3F4F6",
    color: "#4B5563",
    fontFamily: "inherit",
    fontSize: 15,
    fontWeight: 600,
    padding: "12px 20px",
    borderRadius: 12,
    border: "none",
    cursor: "pointer",
    textDecoration: "none",
    textAlign: "center",
  },
};

const TYPE_LABELS = {
  suivi_regulier:   "Suivi régulier",
  pack_heures:      "Pack d'heures",
  classe_virtuelle: "Classe virtuelle",
};

function PaymentSuccess() {
  const params      = new URLSearchParams(window.location.search);
  const amount      = params.get("amount");
  const formulaRaw  = params.get("formula") || "";
  const formula     = TYPE_LABELS[formulaRaw] || formulaRaw || "Formule NOVADEMY";

  return (
    <div style={S.wrap}>
      <div style={S.card}>
        <div style={S.iconBox}>✓</div>

        <h1 style={S.title}>Paiement confirmé !</h1>
        <p style={S.sub}>
          Votre paiement a été traité avec succès. Votre formule est maintenant
          active et vous pouvez commencer vos cours.
        </p>

        <div style={S.divider} />

        {amount && (
          <div style={S.infoRow}>
            <span style={S.infoLabel}>Montant réglé</span>
            <span style={S.infoValue}>{amount} €</span>
          </div>
        )}

        {formula && (
          <div style={S.infoRow}>
            <span style={S.infoLabel}>Formule</span>
            <span style={S.infoValue}>{formula}</span>
          </div>
        )}

        <div style={S.infoRow}>
          <span style={S.infoLabel}>Statut</span>
          <span style={{ ...S.infoValue, color: "#059669" }}>Payé</span>
        </div>

        <div style={S.btnRow}>
          <a href="/student/courses" style={S.btnPrimary}>
            Accéder à mes cours
          </a>
          <a href="/student/dashboard" style={S.btnGhost}>
            Retour au tableau de bord
          </a>
        </div>
      </div>
    </div>
  );
}

export default PaymentSuccess;
