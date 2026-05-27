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
    gridTemplateColumns: "260px 1fr",
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
    padding: "24px 22px",
    borderBottom: "1px solid #E5E7EB",
  },

  sbRole: {
    display: "inline-block",
    marginTop: 8,
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: ".08em",
    textTransform: "uppercase",
    padding: "4px 12px",
    borderRadius: 20,
    background: "#ECFDF5",
    color: "#059669",
  },

  sbNav: { padding: 14, flex: 1 },

  sbLabel: {
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: ".12em",
    textTransform: "uppercase",
    color: "#9CA3AF",
    padding: "0 10px",
    margin: "18px 0 6px",
    display: "block",
  },

  sbLink: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "12px 14px",
    borderRadius: 9,
    fontSize: 15,
    fontWeight: 500,
    color: "#4B5563",
    textDecoration: "none",
    marginBottom: 2,
  },

  sbLinkActive: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "12px 14px",
    borderRadius: 9,
    fontSize: 15,
    fontWeight: 600,
    color: "#2563EB",
    background: "#EFF6FF",
    textDecoration: "none",
    marginBottom: 2,
  },

  sbBadge: {
    marginLeft: "auto",
    background: "#2563EB",
    color: "#fff",
    fontSize: 11,
    fontWeight: 700,
    padding: "2px 8px",
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
    width: 38,
    height: 38,
    borderRadius: "50%",
    background: "linear-gradient(135deg,#059669,#0891B2)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    fontWeight: 700,
    fontSize: 15,
    flexShrink: 0,
  },

  main: { padding: "36px 36px" },

  pageHead: {
    marginBottom: 32,
    paddingBottom: 24,
    borderBottom: "1px solid #F3F4F6",
  },

  pageTitle: {
    fontSize: 28,
    fontWeight: 800,
    letterSpacing: "-0.01em",
    marginBottom: 8,
  },

  pageSub: {
    fontSize: 16,
    color: "#9CA3AF",
    lineHeight: 1.6,
  },

  stats: {
    display: "grid",
    gridTemplateColumns: "repeat(4,1fr)",
    gap: 16,
    marginBottom: 28,
  },

  statAccent: {
    background: "#059669",
    border: "1px solid #059669",
    borderRadius: 14,
    padding: "20px 22px",
  },

  stat: {
    background: "#fff",
    border: "1px solid #E5E7EB",
    borderRadius: 14,
    padding: "20px 22px",
  },

  statLabelW: {
    fontSize: 12,
    fontWeight: 600,
    color: "rgba(255,255,255,.7)",
    textTransform: "uppercase",
    letterSpacing: ".06em",
    marginBottom: 10,
  },

  statLabel: {
    fontSize: 12,
    fontWeight: 600,
    color: "#9CA3AF",
    textTransform: "uppercase",
    letterSpacing: ".06em",
    marginBottom: 10,
  },

  statValW: { fontSize: 30, fontWeight: 800, color: "#fff" },
  statVal: { fontSize: 30, fontWeight: 800, color: "#111827" },

  card: {
    background: "#fff",
    border: "1px solid #E5E7EB",
    borderRadius: 14,
    padding: "22px 24px",
    marginBottom: 18,
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: 700,
    marginBottom: 16,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },

  cardDesc: {
    fontSize: 15,
    color: "#9CA3AF",
    lineHeight: 1.7,
    marginBottom: 16,
  },

  empty: {
    textAlign: "center",
    padding: "28px 20px",
    color: "#9CA3AF",
  },

  emptyIcon: {
    fontSize: 32,
    marginBottom: 12,
  },

  emptyText: {
    fontSize: 15,
  },

  requestsList: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },

  requestCard: {
    background: "#F9FAFB",
    border: "1px solid #E5E7EB",
    borderRadius: 12,
    padding: 18,
  },

  requestHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 16,
    flexWrap: "wrap",
    marginBottom: 14,
  },

  requestTitle: {
    margin: 0,
    fontSize: 18,
    fontWeight: 700,
    color: "#111827",
  },

  requestSub: {
    marginTop: 6,
    marginBottom: 0,
    fontSize: 14,
    color: "#6B7280",
  },

  badge: {
    fontSize: 12,
    fontWeight: 700,
    padding: "6px 12px",
    borderRadius: 999,
    display: "inline-block",
  },

  infoGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 12,
    marginBottom: 14,
  },

  infoBox: {
    background: "#fff",
    border: "1px solid #E5E7EB",
    borderRadius: 10,
    padding: 14,
  },

  infoLabel: {
    fontSize: 12,
    color: "#9CA3AF",
    marginBottom: 6,
  },

  infoValue: {
    fontSize: 15,
    fontWeight: 600,
    color: "#111827",
  },

  messageBox: {
    background: "#fff",
    border: "1px solid #E5E7EB",
    borderRadius: 10,
    padding: 14,
  },

  messageText: {
    margin: "8px 0 0 0",
    fontSize: 15,
    color: "#374151",
    lineHeight: 1.7,
  },
};

function StudentRequests() {
  const savedUser = localStorage.getItem("user");
  const user = savedUser ? JSON.parse(savedUser) : null;

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    if (!user?.id) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/trials/student/${user.id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Erreur chargement des demandes");
        return;
      }

      setRequests(Array.isArray(data) ? data : []);
    } catch (error) {
      alert("Erreur de connexion au serveur");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [user?.id]);

  const getStatusLabel = (status) => {
    if (status === "accepted") return "Acceptée";
    if (status === "reported") return "Reportée";
    if (status === "refused") return "Refusée";
    if (status === "pending") return "En attente";
    return "En attente";
  };

  const getStatusStyle = (status) => {
    if (status === "accepted") {
      return { background: "#ECFDF5", color: "#059669" };
    }
    if (status === "reported") {
      return { background: "#EFF6FF", color: "#2563EB" };
    }
    if (status === "refused") {
      return { background: "#FEF2F2", color: "#DC2626" };
    }
    return { background: "#FFF7ED", color: "#EA580C" };
  };

  const formatSlot = (request) => {
    const day = request.requested_day || "Jour non précisé";
    const start = request.requested_start_time
      ? String(request.requested_start_time).slice(0, 5)
      : "--:--";
    const end = request.requested_end_time
      ? String(request.requested_end_time).slice(0, 5)
      : "--:--";

    return `${day} • ${start}-${end}`;
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
            <a style={S.sbLinkActive} href="/student/requests">
              📬 Mes demandes <span style={S.sbBadge}>{requests.length}</span>
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
            <a style={S.sbLink} href="/notifications">
              🔔 Notifications
            </a>

            <span style={S.sbLabel}>Compte</span>
            <a style={S.sbLink} href="/student/payments">
              💳 Paiements
            </a>
            <a style={S.sbLink} href="/student/review">
              ⭐ Donner un avis
            </a>
          </nav>

          <div style={S.sbUser}>
            <div style={S.av}>É</div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 600 }}>
                {user ? `${user.prenom} ${user.nom}` : "Prénom Nom"}
              </div>
              <div style={{ fontSize: 13, color: "#9CA3AF", marginTop: 2 }}>
                Élève
              </div>
            </div>
          </div>
        </aside>

        <main style={S.main}>
          <div style={S.pageHead}>
            <div style={S.pageTitle}>📬 Mes demandes de cours d’essai</div>
            <div style={S.pageSub}>
              Suivez les demandes envoyées aux professeurs après votre recherche
              d’annonce. Vous retrouvez ici le créneau demandé, le professeur
              choisi et le statut de la demande.
            </div>
          </div>

          <div style={S.stats}>
            <div style={S.statAccent}>
              <div style={S.statLabelW}>Demandes envoyées</div>
              <div style={S.statValW}>{requests.length}</div>
            </div>

            <div style={S.stat}>
              <div style={S.statLabel}>En attente</div>
              <div style={S.statVal}>
                {requests.filter((r) => r.status === "pending").length}
              </div>
            </div>

            <div style={S.stat}>
              <div style={S.statLabel}>Acceptées</div>
              <div style={S.statVal}>
                {requests.filter((r) => r.status === "accepted").length}
              </div>
            </div>

            <div style={S.stat}>
              <div style={S.statLabel}>Reportées</div>
              <div style={S.statVal}>
                {requests.filter((r) => r.status === "reported").length}
              </div>
            </div>
          </div>

          <div style={S.card}>
            <div style={S.cardTitle}>Liste de mes demandes</div>
            <p style={S.cardDesc}>
              Une demande correspond à un professeur choisi, une annonce
              précise, un créneau proposé et un besoin pédagogique transmis
              avant le cours d’essai.
            </p>

            {loading ? (
              <div style={S.empty}>
                <div style={S.emptyText}>Chargement des demandes...</div>
              </div>
            ) : requests.length === 0 ? (
              <div style={S.empty}>
                <div style={S.emptyIcon}>📭</div>
                <p style={S.emptyText}>
                  Aucune demande envoyée pour le moment.
                </p>
              </div>
            ) : (
              <div style={S.requestsList}>
                {requests.map((request) => (
                  <div key={request.id} style={S.requestCard}>
                    <div style={S.requestHeader}>
                      <div>
                        <h4 style={S.requestTitle}>
                          {request.teacher_prenom || ""} {request.teacher_nom || ""}
                        </h4>
                        <p style={S.requestSub}>
                          Annonce #{request.announcement_id}
                        </p>
                      </div>

                      <span
                        style={{
                          ...S.badge,
                          ...getStatusStyle(request.status),
                        }}
                      >
                        {getStatusLabel(request.status)}
                      </span>
                    </div>

                    <div style={S.infoGrid}>
                      <div style={S.infoBox}>
                        <div style={S.infoLabel}>Professeur</div>
                        <div style={S.infoValue}>{request.teacher_prenom || ""} {request.teacher_nom || ""}</div>
                      </div>

                      <div style={S.infoBox}>
                        <div style={S.infoLabel}>Créneau demandé</div>
                        <div style={S.infoValue}>{formatSlot(request)}</div>
                      </div>
                    </div>

                    <div style={S.messageBox}>
                      <div style={S.infoLabel}>Statut actuel</div>
                      <p style={S.messageText}>{getStatusLabel(request.status)}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default StudentRequests;