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
    background: "#EFF6FF",
    color: "#2563EB",
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
    background: "linear-gradient(135deg,#2563EB,#1D4ED8)",
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
    background: "#2563EB",
    border: "1px solid #2563EB",
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

  cardAction: {
    fontSize: 13,
    fontWeight: 500,
    color: "#2563EB",
    textDecoration: "none",
  },

  cardDesc: {
    fontSize: 15,
    color: "#9CA3AF",
    lineHeight: 1.7,
    marginBottom: 16,
  },

  btn: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "inherit",
    fontSize: 14,
    fontWeight: 600,
    padding: "10px 20px",
    borderRadius: 9,
    border: "none",
    cursor: "pointer",
    textDecoration: "none",
  },

  btnPrimary: { background: "#2563EB", color: "#fff" },
  btnGhost: { background: "#F3F4F6", color: "#4B5563" },
  btnOutline: {
    background: "transparent",
    color: "#2563EB",
    border: "1.5px solid #2563EB",
  },

  btnFull: {
    width: "100%",
    justifyContent: "center",
    padding: "13px",
    marginTop: 14,
    fontSize: 15,
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

  profileGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 10,
  },

  profileItem: {
    background: "#F9FAFB",
    border: "1px solid #E5E7EB",
    borderRadius: 9,
    padding: 14,
  },

  profileLabel: {
    fontSize: 12,
    color: "#9CA3AF",
    marginBottom: 4,
  },

  profileValue: {
    fontSize: 15,
    fontWeight: 600,
    color: "#111827",
  },
};

function TeacherDashboard() {
  const savedUser = localStorage.getItem("user");
  const user = savedUser ? JSON.parse(savedUser) : null;
  const token = localStorage.getItem("token");

  const [teacherProfile, setTeacherProfile] = useState({});
  const [announcements, setAnnouncements] = useState([]);
  const [planning, setPlanning] = useState([]);
  const [trials, setTrials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.id) {
      setLoading(false);
      return;
    }

    const headers = { Authorization: `Bearer ${token}` };

    const loadDashboardData = async () => {
      try {
        const [planningRes, trialsRes, announcementsRes, profileRes] =
          await Promise.all([
            fetch(
              `http://localhost:5000/api/teacher-planning/teacher/${user.id}`,
              { headers }
            ),
            fetch(
              `http://localhost:5000/api/trials/teacher/${user.id}`,
              { headers }
            ),
            fetch(
              `http://localhost:5000/api/announcements`,
              { headers }
            ),
            fetch(
              `http://localhost:5000/api/teacher-profile/${user.id}`,
              { headers }
            ),
          ]);

        const planningData = planningRes.ok ? await planningRes.json() : [];
        setPlanning(Array.isArray(planningData) ? planningData : []);

        const trialsData = trialsRes.ok ? await trialsRes.json() : [];
        setTrials(Array.isArray(trialsData) ? trialsData : []);

        if (announcementsRes.ok) {
          const allAnnouncements = await announcementsRes.json();
          const filtered = Array.isArray(allAnnouncements)
            ? allAnnouncements.filter(
                (item) => Number(item.teacher_id) === Number(user.id)
              )
            : [];
          setAnnouncements(filtered);
        }

        const profileData = profileRes.ok ? await profileRes.json() : {};
        setTeacherProfile(profileData || {});
      } catch {
        // silencieux : les compteurs resteront à 0
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  const pendingTrialsCount = useMemo(
    () => trials.filter((t) => t.status === "pending").length,
    [trials]
  );

  const activeStudentsCount = useMemo(() => {
    const ids = trials
      .filter((t) => t.status === "accepted")
      .map((t) => t.student_id);
    return new Set(ids).size;
  }, [trials]);

  const profileCompletionCount = [
    teacherProfile?.city,
    teacherProfile?.preferred_mode,
    teacherProfile?.headline,
    teacherProfile?.presentation,
    teacherProfile?.diplomas,
    teacherProfile?.experience,
    teacherProfile?.methodology,
  ].filter(Boolean).length;

  const profileCompletionPercent = Math.round(
    (profileCompletionCount / 7) * 100
  );

  const profileLevel = useMemo(() => {
    if (profileCompletionPercent >= 90) return { label: "Expert",        commission: "3 %" };
    if (profileCompletionPercent >= 70) return { label: "Avancé",        commission: "7 %" };
    if (profileCompletionPercent >= 40) return { label: "Intermédiaire", commission: "12 %" };
    return                                     { label: "Débutant",      commission: "15 %" };
  }, [profileCompletionPercent]);

  return (
    <div style={S.wrap}>
      <div style={S.dash}>
        {/* ── SIDEBAR ── */}
        <aside style={S.sidebar}>
          <div style={S.sbBrand}>
            <div style={{ ...S.logo, fontSize: 20 }}>
              NOVA<span style={S.logoEm}>DEMY</span>
            </div>
            <span style={S.sbRole}>Professeur</span>
          </div>

          <nav style={S.sbNav}>
            <span style={S.sbLabel}>Principal</span>
            <a style={S.sbLinkActive} href="/teacher/dashboard">
              🏠 Tableau de bord
            </a>
            <a style={S.sbLink} href="/teacher/profile">
              👤 Mon profil
            </a>
            <a style={S.sbLink} href="/teacher/announcements">
              📢 Mes annonces
            </a>
            <a style={S.sbLink} href="/teacher/students">
              🎓 Mes élèves
            </a>

            <span style={S.sbLabel}>Organisation</span>
            <a style={S.sbLink} href="/teacher/planning">
              📅 Planning
            </a>
            <a style={S.sbLink} href="/teacher/requests">
              📬 Demandes d'essai{" "}
              {pendingTrialsCount > 0 && (
                <span style={S.sbBadge}>{pendingTrialsCount}</span>
              )}
            </a>
            <a style={S.sbLink} href="/student/chat">
              💬 Messages
            </a>

            <span style={S.sbLabel}>Compte</span>
            <a style={S.sbLink} href="/teacher/revenue">
              💳 Revenus
            </a>
            <a style={S.sbLink} href="/teacher/propose/formula">
              📦 Nos formules
            </a>
            <a style={S.sbLink} href="/teacher/collective/classes">
              👥 Classes collectives
            </a>
            <a style={S.sbLink} href="/">
              ↩ Accueil
            </a>
          </nav>

          <div style={S.sbUser}>
            <div style={S.av}>
              {user?.prenom ? user.prenom.charAt(0).toUpperCase() : "P"}
            </div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 600 }}>
                {user ? `${user.prenom} ${user.nom}` : "Prénom Nom"}
              </div>
              <div style={{ fontSize: 13, color: "#9CA3AF", marginTop: 2 }}>
                Professeur
              </div>
            </div>
          </div>
        </aside>

        {/* ── MAIN ── */}
        <main style={S.main}>
          <div style={S.pageHead}>
            <div style={S.pageTitle}>
              👋 Bienvenue{user ? `, ${user.prenom}` : " dans votre espace professeur"}
            </div>
            <div style={S.pageSub}>
              Gérez votre profil, vos annonces, vos disponibilités et les
              demandes de cours d'essai depuis un seul espace.
            </div>
          </div>

          {/* ── STATS ── */}
          <div style={S.stats}>
            <div style={S.statAccent}>
              <div style={S.statLabelW}>Mes annonces</div>
              <div style={S.statValW}>{loading ? "…" : announcements.length}</div>
            </div>
            <div style={S.stat}>
              <div style={S.statLabel}>Demandes d'essai</div>
              <div style={S.statVal}>{loading ? "…" : trials.length}</div>
            </div>
            <div style={S.stat}>
              <div style={S.statLabel}>Messages</div>
              <div style={S.statVal}>
                <a href="/student/chat" style={{ color: "#111827", textDecoration: "none" }}>→</a>
              </div>
            </div>
            <div style={S.stat}>
              <div style={S.statLabel}>Élèves actifs</div>
              <div style={S.statVal}>{loading ? "…" : activeStudentsCount}</div>
            </div>
          </div>

          {/* ── PROFIL + ANNONCES ── */}
          <div style={S.g2}>
            <div style={S.card}>
              <div style={S.cardTitle}>
                👤 Mon profil
                <a href="/teacher/profile" style={S.cardAction}>Modifier →</a>
              </div>
              <p style={S.cardDesc}>
                Complétez votre profil avec vos diplômes, votre expérience et
                vos informations professionnelles.
              </p>

              <div style={S.profileGrid}>
                {[
                  ["Ville",           teacherProfile?.city               || "—"],
                  ["Niveau",          profileLevel.label],
                  ["Commission",      profileLevel.commission],
                  ["Profil complété", `${profileCompletionPercent} %`],
                ].map(([lbl, val]) => (
                  <div key={lbl} style={S.profileItem}>
                    <div style={S.profileLabel}>{lbl}</div>
                    <div style={S.profileValue}>{val}</div>
                  </div>
                ))}
              </div>

              <a
                href="/teacher/profile"
                style={{ ...S.btn, ...S.btnGhost, ...S.btnFull }}
              >
                Modifier mon profil
              </a>
            </div>

            <div style={S.card}>
              <div style={S.cardTitle}>
                📢 Mes annonces
                <a href="/teacher/announcements" style={S.cardAction}>
                  Créer / gérer →
                </a>
              </div>
              <p style={S.cardDesc}>
                Créez vos annonces par matière et rendez-les visibles aux élèves.
              </p>

              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 14 }}>
                <span style={{ ...S.pill, background: "#EFF6FF", color: "#2563EB" }}>Active</span>
                <span style={{ ...S.pill, background: "#F3F4F6", color: "#6B7280" }}>Brouillon</span>
                <span style={{ ...S.pill, background: "#ECFDF5", color: "#059669" }}>Visible</span>
              </div>

              {loading ? (
                <div style={S.empty}><p style={S.emptyText}>Chargement des annonces…</p></div>
              ) : announcements.length === 0 ? (
                <div style={S.empty}>
                  <div style={S.emptyIcon}>📢</div>
                  <p style={S.emptyText}>Aucune annonce créée pour le moment.</p>
                </div>
              ) : (
                <div style={S.empty}>
                  <div style={S.emptyIcon}>📢</div>
                  <p style={S.emptyText}>
                    {announcements.length} annonce(s) disponible(s).
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* ── BOUTON FORMULE ── */}
          <div style={{ marginBottom: 18 }}>
            <a href="/teacher/propose/formula" style={{ ...S.btn, ...S.btnPrimary }}>
              Proposer une formule
            </a>
          </div>

          {/* ── PLANNING + DEMANDES ── */}
          <div style={S.g2}>
            <div style={S.card}>
              <div style={S.cardTitle}>
                📅 Mes disponibilités
                <a href="/teacher/planning" style={S.cardAction}>Gérer →</a>
              </div>
              <p style={S.cardDesc}>
                Définissez vos créneaux pour permettre aux élèves de réserver un
                cours d'essai selon votre planning.
              </p>

              {loading ? (
                <div style={S.empty}><p style={S.emptyText}>Chargement des disponibilités…</p></div>
              ) : planning.length === 0 ? (
                <div style={S.empty}>
                  <div style={S.emptyIcon}>🗓️</div>
                  <p style={S.emptyText}>Aucune disponibilité ajoutée pour le moment.</p>
                </div>
              ) : (
                <div style={S.empty}>
                  <div style={S.emptyIcon}>🗓️</div>
                  <p style={S.emptyText}>{planning.length} créneau(x) disponible(s).</p>
                </div>
              )}
            </div>

            <div style={S.card}>
              <div style={S.cardTitle}>
                📬 Demandes de cours d'essai
                <a href="/teacher/requests" style={S.cardAction}>Voir →</a>
              </div>
              <p style={S.cardDesc}>
                Consultez les demandes reçues et répondez en acceptant, reportant
                ou refusant.
              </p>

              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 14 }}>
                {[
                  ["#FFF7ED", "#EA580C", "En attente"],
                  ["#ECFDF5", "#059669", "Acceptée"],
                  ["#EFF6FF", "#2563EB", "Reportée"],
                  ["#FEF2F2", "#DC2626", "Refusée"],
                ].map(([bg, col, lbl]) => (
                  <span key={lbl} style={{ ...S.pill, background: bg, color: col }}>{lbl}</span>
                ))}
              </div>

              {loading ? (
                <div style={S.empty}><p style={S.emptyText}>Chargement des demandes…</p></div>
              ) : trials.length === 0 ? (
                <div style={S.empty}>
                  <div style={S.emptyIcon}>📭</div>
                  <p style={S.emptyText}>Aucune demande reçue pour le moment.</p>
                </div>
              ) : (
                <div style={S.empty}>
                  <div style={S.emptyIcon}>📬</div>
                  <p style={S.emptyText}>
                    {trials.length} demande(s) reçue(s), dont {pendingTrialsCount} en attente.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* ── ÉLÈVES + MESSAGES ── */}
          <div style={S.g2}>
            <div style={S.card}>
              <div style={S.cardTitle}>
                🎓 Mes élèves
                <a href="/teacher/students" style={S.cardAction}>Voir →</a>
              </div>
              <p style={S.cardDesc}>
                Retrouvez ici les élèves qui suivent vos cours et vos formules actives.
              </p>

              {loading ? (
                <div style={S.empty}><p style={S.emptyText}>Chargement des élèves…</p></div>
              ) : activeStudentsCount === 0 ? (
                <div style={S.empty}>
                  <div style={S.emptyIcon}>🎓</div>
                  <p style={S.emptyText}>Aucun élève actif pour le moment.</p>
                </div>
              ) : (
                <div style={S.empty}>
                  <div style={S.emptyIcon}>🎓</div>
                  <p style={S.emptyText}>{activeStudentsCount} élève(s) actif(s).</p>
                </div>
              )}
            </div>

            <div style={S.card}>
              <div style={S.cardTitle}>
                💬 Messages
                <a href="/student/chat" style={S.cardAction}>Ouvrir le chat →</a>
              </div>
              <p style={S.cardDesc}>
                Échangez avec vos élèves dans la plateforme avant et après la
                validation de la formule selon les règles du site.
              </p>
              {trials.filter((t) => t.status === "accepted").length === 0 ? (
                <div style={S.empty}>
                  <div style={S.emptyIcon}>💬</div>
                  <p style={S.emptyText}>Aucune conversation active pour le moment.</p>
                </div>
              ) : (
                <div style={S.empty}>
                  <div style={S.emptyIcon}>💬</div>
                  <p style={S.emptyText}>
                    {trials.filter((t) => t.status === "accepted").length} conversation(s) active(s).
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* ── REVENUS ── */}
          <div style={S.card}>
            <div style={S.cardTitle}>
              💳 Revenus
              <a href="/teacher/revenue" style={S.cardAction}>Consulter →</a>
            </div>
            <p style={S.cardDesc}>
              Consultez vos revenus liés aux cours actifs et aux formules validées.
            </p>
            <div style={S.empty}>
              <div style={S.emptyIcon}>💳</div>
              <p style={S.emptyText}>Aucun revenu affiché pour le moment.</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default TeacherDashboard;