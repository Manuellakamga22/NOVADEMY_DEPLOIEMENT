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

  formulaGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 16,
    marginBottom: 20,
  },

  formulaCard: {
    background: "#fff",
    border: "1px solid #E5E7EB",
    borderRadius: 18,
    padding: "22px 22px",
    boxShadow: "0 4px 14px rgba(0,0,0,0.03)",
  },

  formulaCardActive: {
    background: "#fff",
    border: "2px solid #2563EB",
    borderRadius: 18,
    padding: "22px 22px",
    boxShadow: "0 6px 18px rgba(37,99,235,0.08)",
  },

  formulaTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 12,
    marginBottom: 14,
  },

  formulaTitle: {
    margin: 0,
    fontSize: 22,
    fontWeight: 800,
    color: "#111827",
  },

  formulaTag: {
    fontSize: 12,
    fontWeight: 700,
    padding: "6px 10px",
    borderRadius: 999,
    background: "#EFF6FF",
    color: "#2563EB",
  },

  formulaText: {
    fontSize: 16,
    color: "#4B5563",
    lineHeight: 1.8,
    marginBottom: 16,
  },

  formulaPrice: {
    fontSize: 28,
    fontWeight: 800,
    color: "#111827",
    marginBottom: 6,
  },

  formulaPriceSub: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 14,
  },

  list: {
    margin: 0,
    paddingLeft: 20,
    color: "#374151",
    fontSize: 15,
    lineHeight: 1.9,
  },

  btnRow: {
    display: "flex",
    gap: 10,
    flexWrap: "wrap",
    marginTop: 18,
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

  summaryCard: {
    background: "#fff",
    border: "1px solid #E5E7EB",
    borderRadius: 16,
    padding: "22px 24px",
  },

  summaryTitle: {
    fontSize: 18,
    fontWeight: 800,
    color: "#111827",
    marginBottom: 14,
  },

  summaryGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 12,
    marginBottom: 16,
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

  helperText: {
    fontSize: 15,
    color: "#6B7280",
    lineHeight: 1.7,
  },

  empty: {
    textAlign: "center",
    padding: "40px 20px",
    color: "#9CA3AF",
  },

  emptyIcon: {
    fontSize: 36,
    marginBottom: 12,
  },

  emptyText: {
    fontSize: 17,
    lineHeight: 1.7,
  },
};

const TYPE_LABELS = {
  suivi_regulier: "Suivi régulier",
  pack_heures: "Pack d'heures",
  classe_virtuelle: "Classe virtuelle",
};

function StudentPacks() {
  const savedUser = localStorage.getItem("user");
  const user = savedUser ? JSON.parse(savedUser) : null;

  const [proposals, setProposals] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [accepting, setAccepting] = useState(false);

  // Charger les propositions de formules envoyées par les profs
  const fetchProposals = async () => {
    if (!user?.id) {
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/packs/student/${user.id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const data = await res.json();

      if (res.ok) {
        setProposals(Array.isArray(data) ? data : []);
        if (data.length > 0) setSelectedId(data[0].id);
      } else {
        alert(data.message || "Erreur chargement des formules");
      }
    } catch {
      alert("Erreur de connexion au serveur");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProposals();
  }, []);

  // Accepter une formule proposée
  const handleAccept = async (proposalId) => {
    setAccepting(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/packs/accept/${proposalId}`,
        {
          method: "PUT",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Erreur acceptation de la formule");
        return;
      }

      alert("Formule acceptée ! Vous pouvez maintenant procéder au paiement.");
      window.location.href = "/payment";
    } catch {
      alert("Erreur de connexion au serveur");
    } finally {
      setAccepting(false);
    }
  };

  const selected = proposals.find((p) => p.id === selectedId);

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
            <a style={S.sbLink} href="/student/requests">
              📄 Mes demandes <span style={S.sbBadge}>0</span>
            </a>
            <a style={S.sbLinkActive} href="/student/packs">
              📦 Formules
            </a>
            <a style={S.sbLink} href="/student/courses">
              📚 Mes cours
            </a>
            <a style={S.sbLink} href="/student/planning">
              📅 Mon calendrier
            </a>
            <a style={S.sbLink} href="/chat">
              💬 Messages <span style={S.sbBadge}>0</span>
            </a>

            <span style={S.sbLabel}>Compte</span>
            <a style={S.sbLink} href="/payment">
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
              <p style={S.smallTitle}>Formules proposées</p>
              <p style={S.smallSub}>
                Votre professeur vous a proposé une formule après le cours
                d'essai. Choisissez et acceptez pour continuer.
              </p>
            </div>
          </div>

          {loading ? (
            <div style={S.empty}>
              <div style={S.emptyText}>Chargement des formules...</div>
            </div>
          ) : proposals.length === 0 ? (
            <div style={S.empty}>
              <div style={S.emptyIcon}>📦</div>
              <p style={S.emptyText}>
                Aucune formule proposée pour le moment.
                <br />
                Votre professeur vous enverra une proposition après le cours
                d'essai.
              </p>
            </div>
          ) : (
            <>
              <div style={S.formulaGrid}>
                {proposals.map((proposal) => (
                  <div
                    key={proposal.id}
                    style={
                      selectedId === proposal.id
                        ? S.formulaCardActive
                        : S.formulaCard
                    }
                  >
                    <div style={S.formulaTop}>
                      <h3 style={S.formulaTitle}>
                        {TYPE_LABELS[proposal.type] || proposal.type}
                      </h3>
                      <span style={S.formulaTag}>
                        {proposal.duration_months
                          ? `${proposal.duration_months} mois`
                          : "Flexible"}
                      </span>
                    </div>

                    <div style={S.formulaText}>
                      Professeur #{proposal.teacher_id}
                    </div>

                    <div style={S.formulaPrice}>{proposal.final_price} €</div>
                    <div style={S.formulaPriceSub}>prix total</div>

                    <ul style={S.list}>
                      {proposal.total_hours && (
                        <li>{proposal.total_hours}h au total</li>
                      )}
                      {proposal.hours_per_week && (
                        <li>{proposal.hours_per_week}h par semaine</li>
                      )}
                      {proposal.engagement_required === 1 && (
                        <li>Engagement {proposal.engagement_months} mois</li>
                      )}
                    </ul>

                    <div style={S.btnRow}>
                      <button
                        type="button"
                        onClick={() => setSelectedId(proposal.id)}
                        style={{ ...S.btn, ...S.btnPrimary }}
                      >
                        Choisir
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div style={S.summaryCard}>
                <div style={S.summaryTitle}>Récapitulatif</div>

                <div style={S.summaryGrid}>
                  <div style={S.summaryBox}>
                    <div style={S.summaryLabel}>Formule sélectionnée</div>
                    <div style={S.summaryValue}>
                      {selected
                        ? TYPE_LABELS[selected.type] || selected.type
                        : "—"}
                    </div>
                  </div>

                  <div style={S.summaryBox}>
                    <div style={S.summaryLabel}>Tarif</div>
                    <div style={S.summaryValue}>
                      {selected ? `${selected.final_price} €` : "—"}
                    </div>
                  </div>
                </div>

                <div style={S.btnRow}>
                  <button
                    type="button"
                    disabled={!selectedId || accepting}
                    onClick={() => handleAccept(selectedId)}
                    style={{
                      ...S.btn,
                      ...S.btnPrimary,
                      opacity: !selectedId || accepting ? 0.5 : 1,
                      cursor: !selectedId || accepting ? "not-allowed" : "pointer",
                    }}
                  >
                    {accepting ? "En cours..." : "Accepter et continuer vers le paiement"}
                  </button>

                  <a href="/trial-request" style={{ ...S.btn, ...S.btnGhost }}>
                    Retour
                  </a>
                </div>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}

export default StudentPacks;