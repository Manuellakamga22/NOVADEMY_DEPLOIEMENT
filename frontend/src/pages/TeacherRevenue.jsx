import React, { useEffect, useState } from "react";

const S = {
  wrap: {
    fontFamily: "'Segoe UI', sans-serif",
    minHeight: "100vh",
    background: "#F9FAFB",
  },

  logo: {
    fontSize: 24,
    fontWeight: 800,
    letterSpacing: "-0.02em",
  },

  logoEm: {
    color: "#2563EB",
  },

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
    background: "#EFF6FF",
    color: "#2563EB",
  },

  sbNav: {
    padding: 14,
    flex: 1,
  },

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
    background: "linear-gradient(135deg,#2563EB,#1D4ED8)",
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
    maxWidth: "900px",
  },

  stats: {
    display: "grid",
    gridTemplateColumns: "repeat(4,1fr)",
    gap: 16,
    marginBottom: 22,
  },

  statAccent: {
    background: "#2563EB",
    border: "1px solid #2563EB",
    borderRadius: 16,
    padding: "22px 24px",
  },

  stat: {
    background: "#fff",
    border: "1px solid #E5E7EB",
    borderRadius: 16,
    padding: "22px 24px",
  },

  statLabelW: {
    fontSize: 13,
    fontWeight: 700,
    color: "rgba(255,255,255,.78)",
    textTransform: "uppercase",
    letterSpacing: ".06em",
    marginBottom: 10,
  },

  statLabel: {
    fontSize: 13,
    fontWeight: 700,
    color: "#9CA3AF",
    textTransform: "uppercase",
    letterSpacing: ".06em",
    marginBottom: 10,
  },

  statValW: {
    fontSize: 32,
    fontWeight: 800,
    color: "#fff",
  },

  statVal: {
    fontSize: 32,
    fontWeight: 800,
    color: "#111827",
  },

  card: {
    background: "#fff",
    border: "1px solid #E5E7EB",
    borderRadius: 16,
    padding: "22px 24px",
    marginBottom: 18,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: 800,
    marginBottom: 14,
    color: "#111827",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
    flexWrap: "wrap",
  },

  cardDesc: {
    fontSize: 16,
    color: "#6B7280",
    lineHeight: 1.7,
    marginBottom: 16,
  },

  tabs: {
    display: "flex",
    gap: 10,
    flexWrap: "wrap",
    marginBottom: 18,
  },

  tab: {
    padding: "10px 16px",
    borderRadius: 10,
    border: "1px solid #E5E7EB",
    background: "#fff",
    color: "#4B5563",
    fontSize: 15,
    fontWeight: 700,
    cursor: "pointer",
  },

  tabActive: {
    padding: "10px 16px",
    borderRadius: 10,
    border: "1px solid #2563EB",
    background: "#EFF6FF",
    color: "#2563EB",
    fontSize: 15,
    fontWeight: 700,
    cursor: "pointer",
  },

  revenueList: {
    display: "flex",
    flexDirection: "column",
    gap: 14,
  },

  revenueItem: {
    background: "#F9FAFB",
    border: "1px solid #E5E7EB",
    borderRadius: 14,
    padding: 18,
  },

  revenueHead: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 14,
    flexWrap: "wrap",
    marginBottom: 12,
  },

  revenueTitle: {
    margin: 0,
    fontSize: 18,
    fontWeight: 800,
    color: "#111827",
  },

  revenueSub: {
    margin: "8px 0 0 0",
    fontSize: 15,
    color: "#6B7280",
    lineHeight: 1.6,
  },

  badge: {
    fontSize: 13,
    fontWeight: 700,
    padding: "6px 12px",
    borderRadius: 999,
    display: "inline-block",
  },

  infoGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4,1fr)",
    gap: 12,
    marginBottom: 12,
  },

  infoBox: {
    background: "#fff",
    border: "1px solid #E5E7EB",
    borderRadius: 12,
    padding: 14,
  },

  infoLabel: {
    fontSize: 12,
    color: "#9CA3AF",
    marginBottom: 6,
  },

  infoValue: {
    fontSize: 15,
    fontWeight: 700,
    color: "#111827",
    lineHeight: 1.6,
  },

  textBox: {
    background: "#fff",
    border: "1px solid #E5E7EB",
    borderRadius: 12,
    padding: 14,
  },

  textTitle: {
    fontSize: 14,
    fontWeight: 700,
    color: "#374151",
    marginBottom: 8,
  },

  textValue: {
    margin: 0,
    fontSize: 15,
    color: "#4B5563",
    lineHeight: 1.7,
  },

  empty: {
    textAlign: "center",
    padding: "34px 20px",
    color: "#9CA3AF",
  },

  emptyIcon: {
    fontSize: 34,
    marginBottom: 12,
  },

  emptyText: {
    fontSize: 16,
    lineHeight: 1.7,
  },
};

function TeacherRevenue() {
  const savedUser = localStorage.getItem("user");
  const user  = savedUser ? JSON.parse(savedUser) : null;
  const token = localStorage.getItem("token");

  const [activeTab, setActiveTab] = useState("valides");
  const [revenues,  setRevenues]  = useState([]);
  const [loading,   setLoading]   = useState(true);

  // je charge les revenus du prof depuis ses paiements reçus
  useEffect(() => {
    if (!user?.id) { setLoading(false); return; }

    const fetchRevenues = async () => {
      try {
        const res  = await fetch(
          `http://localhost:5001/api/payments/teacher/${user.id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (!res.ok) return;
        const data = await res.json();

        // je mappe les paiements vers le format revenus
        const list = Array.isArray(data) ? data.map(p => ({
          id:          p.id,
          title:       p.formula_type === "suivi_regulier" ? "Suivi régulier"
                     : p.formula_type === "pack_heures"    ? "Pack d'heures"
                     : "Classe virtuelle",
          studentName: `${p.student_prenom || ""} ${p.student_nom || ""}`.trim() || `Élève #${p.student_id}`,
          amount:      p.amount,
          paymentDate: p.payment_date
            ? new Date(p.payment_date).toLocaleDateString("fr-FR")
            : "—",
          status:      "paye",
        })) : [];

        setRevenues(list);
      } catch { /* silencieux */ }
      finally  { setLoading(false); }
    };

    fetchRevenues();
  }, []);

  const paidRevenues    = revenues.filter((r) => r.status === "paye");
  const pendingRevenues = revenues.filter((r) => r.status === "en_attente");
  const archivedRevenues = revenues.filter((r) => r.status === "archive");

  const getDisplayedRevenues = () => {
    if (activeTab === "valides") return paidRevenues;
    if (activeTab === "attente") return pendingRevenues;
    return archivedRevenues;
  };

  const displayedRevenues = getDisplayedRevenues();

  const getStatusBadge = (status) => {
    if (status === "paye") {
      return { background: "#ECFDF5", color: "#059669", label: "Payé" };
    }
    if (status === "en_attente") {
      return { background: "#FFF7ED", color: "#EA580C", label: "En attente" };
    }
    return { background: "#F3F4F6", color: "#6B7280", label: "Archivé" };
  };

  return (
    <div style={S.wrap}>
      <div style={S.dash}>
        <aside style={S.sidebar}>
          <div style={S.sbBrand}>
            <div style={{ ...S.logo, fontSize: 20 }}>
              NOVA<span style={S.logoEm}>DEMY</span>
            </div>
            <span style={S.sbRole}>Professeur</span>
          </div>

          <nav style={S.sbNav}>
            <span style={S.sbLabel}>Principal</span>
            <a style={S.sbLink} href="/teacher/dashboard">
              🏠 Tableau de bord
            </a>
            <a style={S.sbLink} href="/teacher/profile">
              👤 Mon profil
            </a>
            <a style={S.sbLink} href="/teacher/announcements">
              📢 Annonces
            </a>

            <span style={S.sbLabel}>Organisation</span>
            <a style={S.sbLink} href="/teacher/planning">
              📅 Planning
            </a>
            <a style={S.sbLink} href="/teacher/requests">
              📬 Demandes <span style={S.sbBadge}>0</span>
            </a>
            <a style={S.sbLink} href="/student/chat">
              💬 Messages <span style={S.sbBadge}>0</span>
            </a>

            <span style={S.sbLabel}>Compte</span>
            <a style={S.sbLinkActive} href="/teacher/revenue">
              💳 Revenus
            </a>
          </nav>

          <div style={S.sbUser}>
            <div style={S.av}>P</div>
            <div>
              <div style={{ fontSize: 16, fontWeight: 700 }}>
                {user ? `${user.prenom} ${user.nom}` : "Prénom Nom"}
              </div>
              <div style={{ fontSize: 14, color: "#9CA3AF", marginTop: 2 }}>
                Professeur
              </div>
            </div>
          </div>
        </aside>

        <main style={S.main}>
          <div style={S.topBar}>
            <div>
              <p style={S.smallTitle}>Mes revenus</p>
              <div style={S.smallSub}>
                Suivez les montants liés aux formules validées, aux paiements
                reçus et aux cours actifs.
              </div>
            </div>
          </div>

          <div style={S.stats}>
            <div style={S.statAccent}>
              <div style={S.statLabelW}>Montant encaissé</div>
              <div style={S.statValW}>0 €</div>
            </div>

            <div style={S.stat}>
              <div style={S.statLabel}>Paiements validés</div>
              <div style={S.statVal}>{paidRevenues.length}</div>
            </div>

            <div style={S.stat}>
              <div style={S.statLabel}>En attente</div>
              <div style={S.statVal}>{pendingRevenues.length}</div>
            </div>

            <div style={S.stat}>
              <div style={S.statLabel}>Historique</div>
              <div style={S.statVal}>{revenues.length}</div>
            </div>
          </div>

          <div style={S.card}>
            <div style={S.cardTitle}>Suivi financier</div>
            <div style={S.cardDesc}>
              Les revenus apparaissent après validation de la formule et paiement
              effectué par l’élève sur la plateforme.
            </div>

            <div style={S.tabs}>
              <button
                type="button"
                onClick={() => setActiveTab("valides")}
                style={activeTab === "valides" ? S.tabActive : S.tab}
              >
                Validés
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("attente")}
                style={activeTab === "attente" ? S.tabActive : S.tab}
              >
                En attente
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("archives")}
                style={activeTab === "archives" ? S.tabActive : S.tab}
              >
                Archivés
              </button>
            </div>

            {displayedRevenues.length === 0 ? (
              <div style={S.empty}>
                <div style={S.emptyIcon}>💳</div>
                <div style={S.emptyText}>
                  Aucun revenu affiché pour cette catégorie.
                </div>
              </div>
            ) : (
              <div style={S.revenueList}>
                {displayedRevenues.map((item) => {
                  const badge = getStatusBadge(item.status);

                  return (
                    <div key={item.id} style={S.revenueItem}>
                      <div style={S.revenueHead}>
                        <div>
                          <h4 style={S.revenueTitle}>{item.title}</h4>
                          <p style={S.revenueSub}>
                            {item.studentName} • {item.subject}
                          </p>
                        </div>

                        <span
                          style={{
                            ...S.badge,
                            background: badge.background,
                            color: badge.color,
                          }}
                        >
                          {badge.label}
                        </span>
                      </div>

                      <div style={S.infoGrid}>
                        <div style={S.infoBox}>
                          <div style={S.infoLabel}>Formule</div>
                          <div style={S.infoValue}>{item.offerType}</div>
                        </div>

                        <div style={S.infoBox}>
                          <div style={S.infoLabel}>Montant prof</div>
                          <div style={S.infoValue}>{item.teacherAmount} €</div>
                        </div>

                        <div style={S.infoBox}>
                          <div style={S.infoLabel}>Montant élève</div>
                          <div style={S.infoValue}>{item.studentAmount} €</div>
                        </div>

                        <div style={S.infoBox}>
                          <div style={S.infoLabel}>Date</div>
                          <div style={S.infoValue}>{item.paymentDate}</div>
                        </div>
                      </div>

                      <div style={S.textBox}>
                        <div style={S.textTitle}>Détail</div>
                        <p style={S.textValue}>{item.details}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default TeacherRevenue;