import React, { useEffect, useState } from "react";

const S = {
  wrap: {
    fontFamily: "'Segoe UI', sans-serif",
    minHeight: "100vh",
    background: "#F9FAFB",
  },
  logo: { fontSize: 24, fontWeight: 800, letterSpacing: "-0.02em" },
  logoEm: { color: "#2563EB" },
  dash: {
    display: "grid",
    gridTemplateColumns: "280px 1fr",
    minHeight: "100vh",
  },
  sidebar: {
    background: "#fff",
    borderRight: "1px solid #E5E7EB",
    display: "flex",
    flexDirection: "column",
    position: "sticky",
    top: 0,
    height: "100vh",
    overflowY: "auto",
  },
  sbBrand: {
    padding: "26px 22px",
    borderBottom: "1px solid #E5E7EB",
  },
  sbRole: {
    display: "inline-block",
    marginTop: 10,
    fontSize: 13,
    fontWeight: 700,
    letterSpacing: ".08em",
    textTransform: "uppercase",
    padding: "5px 12px",
    borderRadius: 20,
    background: "#ECFDF5",
    color: "#059669",
  },
  sbNav: { padding: 14, flex: 1 },
  sbLabel: {
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: ".12em",
    textTransform: "uppercase",
    color: "#9CA3AF",
    padding: "0 10px",
    margin: "18px 0 8px",
    display: "block",
  },
  sbLink: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "14px 15px",
    borderRadius: 10,
    fontSize: 17,
    fontWeight: 500,
    color: "#4B5563",
    textDecoration: "none",
    marginBottom: 4,
  },
  sbLinkActive: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "14px 15px",
    borderRadius: 10,
    fontSize: 17,
    fontWeight: 700,
    color: "#2563EB",
    background: "#EFF6FF",
    textDecoration: "none",
    marginBottom: 4,
  },
  sbBadge: {
    marginLeft: "auto",
    background: "#2563EB",
    color: "#fff",
    fontSize: 12,
    fontWeight: 700,
    padding: "3px 9px",
    borderRadius: 10,
  },
  sbUser: {
    padding: "18px 22px",
    borderTop: "1px solid #E5E7EB",
    display: "flex",
    alignItems: "center",
    gap: 12,
  },
  av: {
    width: 42,
    height: 42,
    borderRadius: "50%",
    background: "linear-gradient(135deg,#059669,#0891B2)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    fontWeight: 700,
    fontSize: 16,
    flexShrink: 0,
  },
  main: {
    padding: "30px 30px",
  },
  topBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 16,
    marginBottom: 22,
    flexWrap: "wrap",
  },
  smallTitle: {
    fontSize: 28,
    fontWeight: 800,
    color: "#111827",
    margin: 0,
  },
  smallSub: {
    fontSize: 17,
    color: "#6B7280",
    marginTop: 8,
    lineHeight: 1.7,
    maxWidth: "920px",
  },
  infoBanner: {
    background: "#EFF6FF",
    border: "1px solid #BFDBFE",
    color: "#1D4ED8",
    borderRadius: 14,
    padding: "16px 18px",
    fontSize: 16,
    lineHeight: 1.7,
    marginBottom: 20,
  },
  grid2: {
    display: "grid",
    gridTemplateColumns: "1.1fr 0.9fr",
    gap: 18,
    marginBottom: 18,
  },
  card: {
    background: "#fff",
    border: "1px solid #E5E7EB",
    borderRadius: 16,
    padding: "22px 24px",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 800,
    color: "#111827",
    marginBottom: 14,
  },
  cardDesc: {
    fontSize: 16,
    color: "#6B7280",
    lineHeight: 1.7,
    marginBottom: 16,
  },
  field: {
    marginBottom: 16,
  },
  label: {
    display: "block",
    fontSize: 16,
    fontWeight: 700,
    color: "#374151",
    marginBottom: 8,
  },
  input: {
    width: "100%",
    padding: "13px 14px",
    borderRadius: 10,
    border: "1.5px solid #E5E7EB",
    fontFamily: "inherit",
    fontSize: 16,
    outline: "none",
    background: "#fff",
    boxSizing: "border-box",
  },
  select: {
    width: "100%",
    padding: "13px 14px",
    borderRadius: 10,
    border: "1.5px solid #E5E7EB",
    fontFamily: "inherit",
    fontSize: 16,
    outline: "none",
    background: "#fff",
    boxSizing: "border-box",
  },
  summaryGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 12,
    marginBottom: 14,
  },
  summaryBox: {
    background: "#F9FAFB",
    border: "1px solid #E5E7EB",
    borderRadius: 12,
    padding: 14,
  },
  summaryLabel: {
    fontSize: 12,
    color: "#9CA3AF",
    marginBottom: 6,
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: 700,
    color: "#111827",
    lineHeight: 1.6,
  },
  bigPriceBox: {
    background: "#F9FAFB",
    border: "1px solid #E5E7EB",
    borderRadius: 14,
    padding: 18,
    marginBottom: 16,
  },
  bigPrice: {
    fontSize: 32,
    fontWeight: 800,
    color: "#111827",
    marginBottom: 6,
  },
  priceSub: {
    fontSize: 14,
    color: "#6B7280",
  },
  helperText: {
    fontSize: 15,
    color: "#6B7280",
    lineHeight: 1.7,
  },
  btnRow: {
    display: "flex",
    gap: 10,
    flexWrap: "wrap",
    marginTop: 16,
  },
  btn: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "inherit",
    fontSize: 15,
    fontWeight: 700,
    padding: "11px 16px",
    borderRadius: 10,
    border: "none",
    cursor: "pointer",
    textDecoration: "none",
  },
  btnPrimary: {
    background: "#2563EB",
    color: "#fff",
  },
  btnGhost: {
    background: "#F3F4F6",
    color: "#4B5563",
  },
  empty: {
    textAlign: "center",
    padding: "40px 20px",
    color: "#9CA3AF",
    fontSize: 16,
    lineHeight: 1.7,
  },
};

const TYPE_LABELS = {
  suivi_regulier: "Suivi régulier",
  pack_heures: "Pack d'heures",
  classe_virtuelle: "Classe virtuelle",
};

function Payment() {
  const savedUser = localStorage.getItem("user");
  const user = savedUser ? JSON.parse(savedUser) : null;

  // Formule acceptée récupérée depuis l'API
  const [acceptedFormula, setAcceptedFormula] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    payment_method: "",
    payment_date: "",
    card_holder: "",
    iban: "",
  });

  // Charger la formule acceptée par l'élève
  useEffect(() => {
    if (!user?.id) {
      setLoading(false);
      return;
    }

    const fetchAcceptedFormula = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(
          `http://localhost:5000/api/packs/student/${user.id}/accepted`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const data = await res.json();

        if (res.ok && data) {
          setAcceptedFormula(data);
        }
      } catch {
        alert("Erreur de connexion au serveur");
      } finally {
        setLoading(false);
      }
    };

    fetchAcceptedFormula();
  }, []);

  // Calcul du montant à payer maintenant selon la consigne :
  // - pack_heures → paiement total
  // - suivi_regulier → premier mois seulement
  const amountToPayNow = acceptedFormula
    ? acceptedFormula.type === "suivi_regulier" && acceptedFormula.duration_months
      ? parseFloat(
          (acceptedFormula.final_price / acceptedFormula.duration_months).toFixed(2)
        )
      : parseFloat(acceptedFormula.final_price)
    : 0;

  const paymentExplanation = acceptedFormula
    ? acceptedFormula.type === "suivi_regulier"
      ? `Vous réglez ici le premier mois. Les ${
          (acceptedFormula.duration_months || 1) - 1
        } mois suivants seront prélevés ensuite.`
      : "Vous réglez ici la totalité du pack."
    : "";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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

    if (!formData.payment_method || !formData.payment_date) {
      alert("Veuillez compléter les informations de paiement.");
      return;
    }

    setSubmitting(true);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/payments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          student_id: user.id,
          pack_id: acceptedFormula.id,
          amount: amountToPayNow,
          payment_method: formData.payment_method,
          payment_date: formData.payment_date,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Erreur lors du paiement");
        return;
      }

      alert(data.message || "Paiement validé avec succès !");
      window.location.href = "/student/courses";
    } catch {
      alert("Erreur de connexion au serveur");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={S.wrap}>
      <div style={S.dash}>
        <aside style={S.sidebar}>
          <div style={S.sbBrand}>
            <div style={{ ...S.logo, fontSize: 20 }}>
              NOVA<span style={S.logoEm}>DEMY</span>
            </div>
            <span style={S.sbRole}>Élève</span>
          </div>

          <nav style={S.sbNav}>
            <span style={S.sbLabel}>Principal</span>
            <a style={S.sbLink} href="/student/dashboard">
              🏠 Tableau de bord
            </a>
            <a style={S.sbLink} href="/student/profile">
              👤 Mon profil
            </a>
            <a style={S.sbLink} href="/search">
              🔍 Trouver un prof
            </a>

            <span style={S.sbLabel}>Mes cours</span>
            <a style={S.sbLink} href="/trial-request">
              📬 Demande d'essai
            </a>
            <a style={S.sbLink} href="/student/packs">
              📦 Formules
            </a>
            <a style={S.sbLink} href="/student/courses">
              📚 Mes cours
            </a>
            <a style={S.sbLink} href="/student/planning">
              📅 Mon calendrier
            </a>
            <a style={S.sbLink} href="/student/chat">
              💬 Messages <span style={S.sbBadge}>0</span>
            </a>

            <span style={S.sbLabel}>Compte</span>
            <a style={S.sbLinkActive} href="/payment">
              💳 Paiement
            </a>
          </nav>

          <div style={S.sbUser}>
            <div style={S.av}>É</div>
            <div>
              <div style={{ fontSize: 16, fontWeight: 700 }}>
                {user ? `${user.prenom} ${user.nom}` : "Prénom Nom"}
              </div>
              <div style={{ fontSize: 14, color: "#9CA3AF", marginTop: 2 }}>
                Élève
              </div>
            </div>
          </div>
        </aside>

        <main style={S.main}>
          <div style={S.topBar}>
            <div>
              <p style={S.smallTitle}>Paiement</p>
              <div style={S.smallSub}>
                Après acceptation de la formule, vous confirmez ici le paiement
                correspondant à votre engagement.
              </div>
            </div>
          </div>

          <div style={S.infoBanner}>
            Si la formule est un pack, vous payez la totalité. Si la formule
            correspond à un engagement sur 3 mois, vous payez seulement le
            premier mois maintenant.
          </div>

          {loading ? (
            <div style={S.empty}>Chargement de votre formule...</div>
          ) : !acceptedFormula ? (
            <div style={S.empty}>
              Aucune formule acceptée pour le moment.
              <br />
              Rendez-vous sur la page{" "}
              <a href="/student/packs" style={{ color: "#2563EB" }}>
                Formules
              </a>{" "}
              pour accepter la proposition de votre professeur.
            </div>
          ) : (
            <div style={S.grid2}>
              {/* Formulaire paiement */}
              <div style={S.card}>
                <div style={S.cardTitle}>Confirmer le paiement</div>
                <div style={S.cardDesc}>
                  Vérifiez les informations de la formule puis renseignez votre
                  moyen de paiement.
                </div>

                <form onSubmit={handleSubmit}>
                  <div style={S.field}>
                    <label style={S.label}>Moyen de paiement</label>
                    <select
                      name="payment_method"
                      value={formData.payment_method}
                      onChange={handleChange}
                      style={S.select}
                    >
                      <option value="">Choisir un moyen de paiement</option>
                      <option value="Carte bancaire">Carte bancaire</option>
                      <option value="Virement">Virement</option>
                      <option value="Prélèvement automatique">
                        Prélèvement automatique
                      </option>
                    </select>
                  </div>

                  <div style={S.field}>
                    <label style={S.label}>Date du paiement</label>
                    <input
                      type="date"
                      name="payment_date"
                      value={formData.payment_date}
                      onChange={handleChange}
                      style={S.input}
                    />
                  </div>

                  <div style={S.field}>
                    <label style={S.label}>Titulaire du paiement</label>
                    <input
                      name="card_holder"
                      value={formData.card_holder}
                      onChange={handleChange}
                      placeholder="Ex : Rosalie Manuella"
                      style={S.input}
                    />
                  </div>

                  <div style={S.field}>
                    <label style={S.label}>IBAN / référence bancaire</label>
                    <input
                      name="iban"
                      value={formData.iban}
                      onChange={handleChange}
                      placeholder="Ex : FR76..."
                      style={S.input}
                    />
                  </div>

                  <div style={S.btnRow}>
                    <button
                      type="submit"
                      disabled={submitting}
                      style={{
                        ...S.btn,
                        ...S.btnPrimary,
                        opacity: submitting ? 0.5 : 1,
                        cursor: submitting ? "not-allowed" : "pointer",
                      }}
                    >
                      {submitting ? "Traitement en cours..." : "Confirmer le paiement"}
                    </button>

                    <a href="/student/chat" style={{ ...S.btn, ...S.btnGhost }}>
                      Retour au chat
                    </a>
                  </div>
                </form>
              </div>

              {/* Récapitulatif */}
              <div style={S.card}>
                <div style={S.cardTitle}>Récapitulatif</div>

                <div style={S.bigPriceBox}>
                  <div style={S.bigPrice}>{amountToPayNow} €</div>
                  <div style={S.priceSub}>Montant à payer maintenant</div>
                </div>

                <div style={S.summaryGrid}>
                  <div style={S.summaryBox}>
                    <div style={S.summaryLabel}>Formule</div>
                    <div style={S.summaryValue}>
                      {TYPE_LABELS[acceptedFormula.type] || acceptedFormula.type}
                    </div>
                  </div>

                  <div style={S.summaryBox}>
                    <div style={S.summaryLabel}>Durée</div>
                    <div style={S.summaryValue}>
                      {acceptedFormula.duration_months
                        ? `${acceptedFormula.duration_months} mois`
                        : "Flexible"}
                    </div>
                  </div>

                  <div style={S.summaryBox}>
                    <div style={S.summaryLabel}>Total heures</div>
                    <div style={S.summaryValue}>
                      {acceptedFormula.total_hours
                        ? `${acceptedFormula.total_hours}h`
                        : "—"}
                    </div>
                  </div>

                  <div style={S.summaryBox}>
                    <div style={S.summaryLabel}>Montant total formule</div>
                    <div style={S.summaryValue}>
                      {acceptedFormula.final_price} €
                    </div>
                  </div>

                  <div style={S.summaryBox}>
                    <div style={S.summaryLabel}>Professeur</div>
                    <div style={S.summaryValue}>
                      #{acceptedFormula.teacher_id}
                    </div>
                  </div>

                  <div style={S.summaryBox}>
                    <div style={S.summaryLabel}>Engagement</div>
                    <div style={S.summaryValue}>
                      {acceptedFormula.engagement_required
                        ? `${acceptedFormula.engagement_months} mois`
                        : "Sans engagement"}
                    </div>
                  </div>
                </div>

                <div style={S.helperText}>{paymentExplanation}</div>

                {acceptedFormula.type === "suivi_regulier" &&
                  acceptedFormula.duration_months > 1 && (
                    <div style={{ ...S.helperText, marginTop: 12 }}>
                      Mois suivants prévus :{" "}
                      {parseFloat(
                        (
                          acceptedFormula.final_price /
                          acceptedFormula.duration_months
                        ).toFixed(2)
                      )}{" "}
                      € / mois.
                    </div>
                  )}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default Payment;