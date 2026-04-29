import React, { useEffect, useMemo, useState } from "react";

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

  pageHead: {
    marginBottom: 32,
    paddingBottom: 24,
    borderBottom: "1px solid #F3F4F6",
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

  g2: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 18,
    marginBottom: 18,
  },

  card: {
    background: "#fff",
    border: "1px solid #E5E7EB",
    borderRadius: 14,
    padding: "22px 24px",
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

  cardAction: {
    fontSize: 13,
    fontWeight: 500,
    color: "#2563EB",
    textDecoration: "none",
  },

  empty: {
    textAlign: "center",
    padding: "28px 20px",
    color: "#9CA3AF",
  },

  emptyIcon: { fontSize: 32, marginBottom: 12 },
  emptyText: { fontSize: 15 },

  pill: {
    fontSize: 12,
    fontWeight: 600,
    padding: "4px 12px",
    borderRadius: 20,
    display: "inline-block",
  },

  sessionCard: {
    background: "#F9FAFB",
    border: "1px solid #E5E7EB",
    borderRadius: 12,
    padding: 16,
  },

  sessionTitle: {
    fontSize: 15,
    fontWeight: 700,
    color: "#111827",
    marginBottom: 6,
  },

  sessionMeta: {
    fontSize: 13,
    color: "#6B7280",
    lineHeight: 1.6,
  },
};

function StudentPlanning() {
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
        `http://localhost:5000/api/student-planning/${user.id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Erreur chargement calendrier élève");
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

  const upcomingSessions = useMemo(() => {
    return requests.filter(
      (item) => item.status === "pending" || item.status === "reported"
    );
  }, [requests]);

  const acceptedSessions = useMemo(() => {
    return requests.filter((item) => item.status === "accepted");
  }, [requests]);

  const refusedSessions = useMemo(() => {
    return requests.filter((item) => item.status === "refused");
  }, [requests]);

  const formatSlot = (item) => {
    const day = item.requested_day || "Jour non précisé";
    const start = item.requested_start_time
      ? String(item.requested_start_time).slice(0, 5)
      : "--:--";
    const end = item.requested_end_time
      ? String(item.requested_end_time).slice(0, 5)
      : "--:--";

    return `${day} • ${start}-${end}`;
  };

  const getStatusLabel = (status) => {
    if (status === "accepted") return "Acceptée";
    if (status === "reported") return "Reportée";
    if (status === "refused") return "Refusée";
    return "En attente";
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
              📬 Demandes d'essai <span style={S.sbBadge}>{requests.length}</span>
            </a>
            <a style={S.sbLink} href="/student/courses">
              📚 Mes cours
            </a>
            <a style={S.sbLinkActive} href="/student/planning">
              📅 Mon calendrier
            </a>
            <a style={S.sbLink} href="/chat">
              💬 Messages <span style={S.sbBadge}>0</span>
            </a>

            <span style={S.sbLabel}>Compte</span>
            <a style={S.sbLink} href="/payment">
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
            <div style={S.pageTitle}>📅 Mon calendrier</div>
            <div style={S.pageSub}>
              Consultez vos demandes d’essai, vos séances validées et leur statut
              depuis un seul espace.
            </div>
          </div>

          <div style={S.stats}>
            <div style={S.statAccent}>
              <div style={S.statLabelW}>Demandes à venir</div>
              <div style={S.statValW}>{upcomingSessions.length}</div>
            </div>
            <div style={S.stat}>
              <div style={S.statLabel}>Séances validées</div>
              <div style={S.statVal}>{acceptedSessions.length}</div>
            </div>
            <div style={S.stat}>
              <div style={S.statLabel}>Demandes refusées</div>
              <div style={S.statVal}>{refusedSessions.length}</div>
            </div>
            <div style={S.stat}>
              <div style={S.statLabel}>Demandes totales</div>
              <div style={S.statVal}>{requests.length}</div>
            </div>
          </div>

          <div style={S.g2}>
            <div style={S.card}>
              <div style={S.cardTitle}>
                🗓️ Demandes en attente ou reportées
                <a href="/student/requests" style={S.cardAction}>
                  Voir mes demandes →
                </a>
              </div>
              <p style={S.cardDesc}>
                Retrouvez ici les demandes encore en attente de réponse ou reportées.
              </p>

              {loading ? (
                <div style={S.empty}>
                  <div style={S.emptyText}>Chargement du calendrier...</div>
                </div>
              ) : upcomingSessions.length === 0 ? (
                <div style={S.empty}>
                  <div style={S.emptyIcon}>🗓️</div>
                  <p style={S.emptyText}>
                    Aucune demande en attente ou reportée.
                  </p>
                </div>
              ) : (
                <div style={{ display: "grid", gap: 12 }}>
                  {upcomingSessions.map((session) => (
                    <div key={session.id} style={S.sessionCard}>
                      <div style={S.sessionTitle}>
                        Demande #{session.id} — Professeur #{session.teacher_id}
                      </div>
                      <div style={S.sessionMeta}>
                        {formatSlot(session)}
                        <br />
                        Statut : {getStatusLabel(session.status)}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div style={S.card}>
              <div style={S.cardTitle}>✅ Séances validées</div>
              <p style={S.cardDesc}>
                Les demandes acceptées apparaissent ici comme séances validées.
              </p>

              {loading ? (
                <div style={S.empty}>
                  <div style={S.emptyText}>Chargement des séances...</div>
                </div>
              ) : acceptedSessions.length === 0 ? (
                <div style={S.empty}>
                  <div style={S.emptyIcon}>✅</div>
                  <p style={S.emptyText}>
                    Aucune séance validée pour le moment.
                  </p>
                </div>
              ) : (
                <div style={{ display: "grid", gap: 12 }}>
                  {acceptedSessions.map((session) => (
                    <div key={session.id} style={S.sessionCard}>
                      <div style={S.sessionTitle}>
                        Demande #{session.id} — Professeur #{session.teacher_id}
                      </div>
                      <div style={S.sessionMeta}>
                        {formatSlot(session)}
                        <br />
                        Statut : {getStatusLabel(session.status)}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div style={S.g2}>
            <div style={S.card}>
              <div style={S.cardTitle}>❌ Demandes refusées</div>
              <p style={S.cardDesc}>
                Retrouvez ici les demandes qui n’ont pas été acceptées.
              </p>

              {loading ? (
                <div style={S.empty}>
                  <div style={S.emptyText}>Chargement...</div>
                </div>
              ) : refusedSessions.length === 0 ? (
                <div style={S.empty}>
                  <div style={S.emptyIcon}>❌</div>
                  <p style={S.emptyText}>
                    Aucune demande refusée pour le moment.
                  </p>
                </div>
              ) : (
                <div style={{ display: "grid", gap: 12 }}>
                  {refusedSessions.map((session) => (
                    <div key={session.id} style={S.sessionCard}>
                      <div style={S.sessionTitle}>
                        Demande #{session.id} — Professeur #{session.teacher_id}
                      </div>
                      <div style={S.sessionMeta}>
                        {formatSlot(session)}
                        <br />
                        Statut : {getStatusLabel(session.status)}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div style={S.card}>
              <div style={S.cardTitle}>ℹ️ Informations utiles</div>
              <p style={S.cardDesc}>
                Votre calendrier regroupe actuellement vos demandes de cours d’essai.
                Il pourra ensuite intégrer les cours validés, visios et classes collectives.
              </p>
              <div style={S.empty}>
                <div style={S.emptyIcon}>ℹ️</div>
                <p style={S.emptyText}>
                  Les nouvelles séances apparaîtront ici après validation du professeur.
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default StudentPlanning;