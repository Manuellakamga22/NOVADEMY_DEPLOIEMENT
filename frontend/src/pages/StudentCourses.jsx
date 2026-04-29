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

  main: { padding: "30px 30px" },

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

  statValW: { fontSize: 32, fontWeight: 800, color: "#fff" },
  statVal: { fontSize: 32, fontWeight: 800, color: "#111827" },

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

  courseList: {
    display: "flex",
    flexDirection: "column",
    gap: 14,
  },

  courseItem: {
    background: "#F9FAFB",
    border: "1px solid #E5E7EB",
    borderRadius: 14,
    padding: 18,
  },

  courseHead: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 14,
    flexWrap: "wrap",
    marginBottom: 12,
  },

  courseTitle: {
    margin: 0,
    fontSize: 18,
    fontWeight: 800,
    color: "#111827",
  },

  courseSub: {
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
    gridTemplateColumns: "repeat(3,1fr)",
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
    marginBottom: 12,
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

  actions: {
    display: "flex",
    gap: 10,
    flexWrap: "wrap",
    marginTop: 12,
  },

  btn: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "inherit",
    fontSize: 15,
    fontWeight: 700,
    padding: "10px 16px",
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

  btnOutline: {
    background: "transparent",
    color: "#2563EB",
    border: "1.5px solid #2563EB",
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

function StudentCourses() {
  const savedUser = localStorage.getItem("user");
  const user  = savedUser ? JSON.parse(savedUser) : null;
  const token = localStorage.getItem("token");

  const [activeTab, setActiveTab] = useState("actifs");
  const [courses,   setCourses]   = useState([]);
  const [loading,   setLoading]   = useState(true);

  // je charge les formules acceptées et payées de l'élève
  useEffect(() => {
    if (!user?.id) { setLoading(false); return; }

    const fetchCourses = async () => {
      try {
        const res  = await fetch(
          `http://localhost:5000/api/packs/student/${user.id}/all`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (!res.ok) return;
        const data = await res.json();

        // je mappe les formules vers un format lisible
        const list = Array.isArray(data) ? data.map(p => ({
          id:          p.id,
          title:       p.type === "suivi_regulier" ? "Suivi régulier"
                     : p.type === "pack_heures"    ? "Pack d'heures"
                     : "Classe virtuelle",
          teacherName: `${p.teacher_prenom || ""} ${p.teacher_nom || ""}`.trim() || `Prof #${p.teacher_id}`,
          subject:     p.subject || "—",
          offerType:   p.type || "—",
          frequency:   p.hours_per_week ? `${p.hours_per_week}h/semaine` : "—",
          mode:        "À définir avec le prof",
          objective:   "Progresser et atteindre les objectifs fixés",
          status:      p.status === "payee"    ? "actif"
                     : p.status === "acceptee" ? "en_attente"
                     : "en_attente",
        })) : [];

        setCourses(list);
      } catch { /* silencieux */ }
      finally  { setLoading(false); }
    };

    fetchCourses();
  }, []);

  const activeCourses  = courses.filter((c) => c.status === "actif");
  const pendingCourses = courses.filter((c) => c.status === "en_attente");
  const finishedCourses = courses.filter((c) => c.status === "termine");

  const getDisplayedCourses = () => {
    if (activeTab === "actifs") return activeCourses;
    if (activeTab === "attente") return pendingCourses;
    return finishedCourses;
  };

  const displayedCourses = getDisplayedCourses();

  const getStatusBadge = (status) => {
    if (status === "actif") {
      return { background: "#ECFDF5", color: "#059669", label: "Actif" };
    }
    if (status === "en_attente") {
      return { background: "#FFF7ED", color: "#EA580C", label: "En attente" };
    }
    return { background: "#F3F4F6", color: "#6B7280", label: "Terminé" };
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
            <a style={S.sbLink} href="/student/requests">
              📬 Mes demandes <span style={S.sbBadge}>0</span>
            </a>
            <a style={S.sbLinkActive} href="/student/courses">
              📚 Mes cours
            </a>
            <a style={S.sbLink} href="/student/planning">
              📅 Mon calendrier
            </a>
            <a style={S.sbLink} href="/student/chat">
              💬 Messages <span style={S.sbBadge}>0</span>
            </a>

            <span style={S.sbLabel}>Compte</span>
            <a style={S.sbLink} href="/student/payments">
              💳 Paiements
            </a>
            <a style={S.sbLink} href="#">
              ⭐ Donner un avis
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
              <p style={S.smallTitle}>Mes cours</p>
              <div style={S.smallSub}>
                Retrouvez ici vos cours en cours, vos formules validées et les
                séances terminées après acceptation du cours d’essai.
              </div>
            </div>
          </div>

          <div style={S.stats}>
            <div style={S.statAccent}>
              <div style={S.statLabelW}>Cours actifs</div>
              <div style={S.statValW}>{activeCourses.length}</div>
            </div>

            <div style={S.stat}>
              <div style={S.statLabel}>En attente</div>
              <div style={S.statVal}>{pendingCourses.length}</div>
            </div>

            <div style={S.stat}>
              <div style={S.statLabel}>Terminés</div>
              <div style={S.statVal}>{finishedCourses.length}</div>
            </div>

            <div style={S.stat}>
              <div style={S.statLabel}>Total</div>
              <div style={S.statVal}>{courses.length}</div>
            </div>
          </div>

          <div style={S.card}>
            <div style={S.cardTitle}>Suivi des cours</div>
            {loading && <div style={{ textAlign: "center", padding: "20px", color: "#9CA3AF" }}>Chargement…</div>}
            <div style={S.cardDesc}>
              Après le cours d’essai et la validation d’une formule, les cours
              apparaissent ici avec le professeur, la matière, le rythme et le
              statut.
            </div>

            <div style={S.tabs}>
              <button
                type="button"
                onClick={() => setActiveTab("actifs")}
                style={activeTab === "actifs" ? S.tabActive : S.tab}
              >
                Actifs
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
                onClick={() => setActiveTab("termines")}
                style={activeTab === "termines" ? S.tabActive : S.tab}
              >
                Terminés
              </button>
            </div>

            {displayedCourses.length === 0 ? (
              <div style={S.empty}>
                <div style={S.emptyIcon}>📚</div>
                <div style={S.emptyText}>
                  Aucun cours affiché pour cette catégorie.
                </div>
              </div>
            ) : (
              <div style={S.courseList}>
                {displayedCourses.map((course) => {
                  const badge = getStatusBadge(course.status);

                  return (
                    <div key={course.id} style={S.courseItem}>
                      <div style={S.courseHead}>
                        <div>
                          <h4 style={S.courseTitle}>{course.title}</h4>
                          <p style={S.courseSub}>
                            {course.teacherName} • {course.subject}
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
                          <div style={S.infoValue}>{course.offerType}</div>
                        </div>

                        <div style={S.infoBox}>
                          <div style={S.infoLabel}>Rythme</div>
                          <div style={S.infoValue}>{course.frequency}</div>
                        </div>

                        <div style={S.infoBox}>
                          <div style={S.infoLabel}>Mode</div>
                          <div style={S.infoValue}>{course.mode}</div>
                        </div>
                      </div>

                      <div style={S.textBox}>
                        <div style={S.textTitle}>Objectif du suivi</div>
                        <p style={S.textValue}>{course.objective}</p>
                      </div>

                      <div style={S.actions}>
                        <a
                          href="/student/planning"
                          style={{ ...S.btn, ...S.btnPrimary }}
                        >
                          Voir le calendrier
                        </a>

                        <a
                          href="/student/chat"
                          style={{ ...S.btn, ...S.btnOutline }}
                        >
                          Ouvrir le chat
                        </a>

                        <a
                          href="/student/payments"
                          style={{ ...S.btn, ...S.btnGhost }}
                        >
                          Paiements
                        </a>
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

export default StudentCourses;