import React, { useEffect, useState } from "react";
import { apiFetch } from "../config/api.js";



function Payment() {
  const savedUser = localStorage.getItem("user");
  const user = savedUser ? JSON.parse(savedUser) : null;

  const [acceptedFormula, setAcceptedFormula] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // je récupère la formule à payer
  const fetchAcceptedFormula = async () => {
    if (!user?.id) {
      setLoading(false);
      return;
    }

    try {
      const params = new URLSearchParams(window.location.search);
      const formulaIdFromUrl = params.get("formula_id");

      // Priorité : formula_id dans l'URL (vient du chat après acceptation)
      if (formulaIdFromUrl) {
        const token = localStorage.getItem("token");
        const response = await apiFetch(`/api/packs/formula/${formulaIdFromUrl}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.ok) {
          const data = await response.json();
          if (data && data.id) {
            setAcceptedFormula(data);
            setLoading(false);
            return;
          }
        }
      }

      // Fallback : formule acceptée de l'élève
      const response = await apiFetch(`/api/packs/student/${user.id}/accepted`);
      if (response.ok) {
        const data = await response.json();
        if (data && data.id) {
          setAcceptedFormula(data);
        }
      }
    } catch {
      setAcceptedFormula(null);
    } finally {
      setLoading(false);
    }
  };

  // je confirme le paiement quand Stripe renvoie vers la page
  const confirmStripePayment = async (sessionId) => {
    try {
      const response = await apiFetch(`/api/payments/confirm/${sessionId}`, {
        method: "POST",
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Erreur lors de la confirmation du paiement.");
        return;
      }

      // Redirection vers la page de confirmation avec les vrais détails du backend
      const confirmedAmount  = data.amount || acceptedFormula?.final_price || "";
      const confirmedFormula = data.formula_type || acceptedFormula?.type || "";
      window.location.href = `/payment/success?amount=${encodeURIComponent(confirmedAmount)}&formula=${encodeURIComponent(confirmedFormula)}`;
    } catch (error) {
      alert("Erreur de connexion au serveur.");
    }
  };

  useEffect(() => {
    fetchAcceptedFormula();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const success = params.get("success");
    const canceled = params.get("canceled");
    const sessionId = params.get("session_id");

    if (success === "true" && sessionId) {
      confirmStripePayment(sessionId);
    }

    if (canceled === "true") {
      alert("Paiement annulé.");
      window.history.replaceState({}, "", "/payment");
    }
  }, []);

  const getAmount = () => {
    if (!acceptedFormula) return 0;

    return (
      Number(acceptedFormula.final_price) ||
      Number(acceptedFormula.amount) ||
      Number(acceptedFormula.price) ||
      0
    );
  };

  const amountToPayNow = getAmount();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("Vous devez être connecté.");
      return;
    }

    if (!acceptedFormula) {
      alert("Aucune formule acceptée trouvée.");
      return;
    }

    if (!amountToPayNow || amountToPayNow <= 0) {
      alert("Montant invalide.");
      return;
    }

    setSubmitting(true);

    try {
      const response = await apiFetch("/api/payments/create-checkout-session", {
        method: "POST",
        body: JSON.stringify({
          pack_id: acceptedFormula.id,
          amount: amountToPayNow,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Erreur lors de la création du paiement Stripe.");
        return;
      }

      window.location.href = data.url;
    } catch (error) {
      alert("Erreur de connexion au serveur.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={pageStyle}>
      <div style={cardStyle}>
        <a href="/student/dashboard" style={backLinkStyle}>
          ← Retour au tableau de bord
        </a>

        <div style={headerStyle}>
          <h1 style={titleStyle}>Paiement sécurisé</h1>
          <p style={subtitleStyle}>
            Réglez votre formule NOVADEMY via Stripe.
          </p>
        </div>

        {loading ? (
          <div style={emptyStyle}>Chargement de la formule...</div>
        ) : !acceptedFormula ? (
          <div style={emptyStyle}>
            Aucune formule acceptée à payer pour le moment.
            <br />
            <a href="/student/packs" style={simpleLinkStyle}>
              Voir mes formules
            </a>
          </div>
        ) : (
          <>
            <div style={summaryStyle}>
              <div style={rowStyle}>
                <span>Formule</span>
                <strong>
                  {acceptedFormula.type || acceptedFormula.title || "Formule NOVADEMY"}
                </strong>
              </div>

              <div style={rowStyle}>
                <span>Nombre d'heures</span>
                <strong>
                  {acceptedFormula.total_hours || acceptedFormula.hours || "—"}
                </strong>
              </div>

              <div style={rowStyle}>
                <span>Professeur</span>
                <strong>
                  {acceptedFormula.teacher_prenom || acceptedFormula.teacher_nom
                    ? `${acceptedFormula.teacher_prenom || ""} ${
                        acceptedFormula.teacher_nom || ""
                      }`
                    : `Professeur #${acceptedFormula.teacher_id || "—"}`}
                </strong>
              </div>

              <div style={totalRowStyle}>
                <span>Total à payer</span>
                <strong>{amountToPayNow} €</strong>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <button type="submit" style={buttonStyle} disabled={submitting}>
                {submitting ? "Redirection vers Stripe..." : "Payer avec Stripe"}
              </button>
            </form>

            <p style={hintStyle}>
              Paiement sécurisé par Stripe. Vos données bancaires ne transitent pas par nos serveurs.
            </p>
          </>
        )}
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
  maxWidth: 560,
  background: "#fff",
  border: "1px solid #E5E7EB",
  borderRadius: 18,
  padding: 34,
  boxShadow: "0 12px 32px rgba(0,0,0,0.08)",
};

const backLinkStyle = {
  color: "#2563EB",
  textDecoration: "none",
  fontWeight: 700,
  fontSize: 16,
};

const headerStyle = {
  marginTop: 24,
  marginBottom: 26,
  textAlign: "center",
};

const titleStyle = {
  fontSize: 32,
  fontWeight: 800,
  color: "#111827",
  marginBottom: 8,
};

const subtitleStyle = {
  fontSize: 17,
  color: "#6B7280",
  lineHeight: 1.5,
};

const summaryStyle = {
  background: "#F9FAFB",
  border: "1px solid #E5E7EB",
  borderRadius: 14,
  padding: 20,
  marginBottom: 22,
};

const rowStyle = {
  display: "flex",
  justifyContent: "space-between",
  gap: 16,
  padding: "12px 0",
  borderBottom: "1px solid #E5E7EB",
  fontSize: 16,
  color: "#374151",
};

const totalRowStyle = {
  display: "flex",
  justifyContent: "space-between",
  gap: 16,
  paddingTop: 16,
  fontSize: 21,
  color: "#111827",
};

const buttonStyle = {
  width: "100%",
  border: "none",
  borderRadius: 12,
  padding: 16,
  background: "#2563EB",
  color: "#fff",
  fontSize: 18,
  fontWeight: 800,
  cursor: "pointer",
};

const emptyStyle = {
  background: "#F9FAFB",
  border: "1px solid #E5E7EB",
  borderRadius: 14,
  padding: 24,
  textAlign: "center",
  color: "#6B7280",
  fontSize: 17,
  lineHeight: 1.6,
};

const simpleLinkStyle = {
  display: "inline-block",
  marginTop: 12,
  color: "#2563EB",
  fontWeight: 700,
  textDecoration: "none",
};

const hintStyle = {
  marginTop: 14,
  fontSize: 14,
  color: "#6B7280",
  textAlign: "center",
};

export default Payment;