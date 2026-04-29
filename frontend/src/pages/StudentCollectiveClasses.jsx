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

  btnPrimary: { background: "#2563EB", color: "#fff" },
  btnGhost:   { background: "#F3F4F6", color: "#4B5563" },
  btnSuccess: { background: "#ECFDF5", color: "#059669" },
  btnDanger:  { background: "#FEF2F2", color: "#DC2626" },

  summaryCard: {
    background: "#fff",
    border: "1px solid #E5E7EB",
    borderRadius: 16,
    padding: "22px 24px",
    marginBottom: 20,
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

  progressBar: {
    height: 8,
    borderRadius: 4,
    background: "#E5E7EB",
    margin: "10px 0",
    overflow: "hidden",
  },

  progressFill: {
    height: "100%",
    borderRadius: 4,
    background: "#2563EB",
    transition: "width .3s",
  },

  pill: {
    fontSize: 12,
    fontWeight: 700,
    padding: "5px 11px",
    borderRadius: 999,
    display: "inline-block",
  },

  empty: {
    textAlign: "center",
    padding: "40px 20px",
    color: "#9CA3AF",
  },

  emptyIcon: { fontSize: 36, marginBottom: 12 },
  emptyText:  { fontSize: 17, lineHeight: 1.7 },
};

const LEVEL_LABELS = {
  college:   "Collège",
  lycee:     "Lycée",
  superieur: "Supérieur",
  prepa:     "Prépa",
};

const ENROLLMENT_STATUS = {
  inscrit:  { bg: "#EFF6FF", col: "#2563EB", label: "Inscrit" },
  confirme: { bg: "#ECFDF5", col: "#059669", label: "Confirmé" },
  refuse:   { bg: "#FEF2F2", col: "#DC2626", label: "Refusé" },
  annule:   { bg: "#F3F4F6", col: "#6B7280", label: "Annulé" },
};

function StudentCollectiveClasses() {
  const savedUser = localStorage.getItem("user");
  const user  = savedUser ? JSON.parse(savedUser) : null;
  const token = localStorage.getItem("token");

  const [sessions,     setSessions]     = useState([]);  // sessions ouvertes
  const [enrollments,  setEnrollments]  = useState([]);  // mes inscriptions
  const [loading,      setLoading]      = useState(true);
  const [enrollingId,  setEnrollingId]  = useState(null);

  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    if (!user?.id) { setLoading(false); return; }

    const fetchAll = async () => {
      try {
        const [sessionsRes, enrollmentsRes] = await Promise.all([
          fetch("http://localhost:5000/api/group-classes/open", { headers }),
          fetch(`http://localhost:5000/api/group-classes/student/${user.id}`, { headers }),
        ]);

        if (sessionsRes.ok) {
          const data = await sessionsRes.json();
          setSessions(Array.isArray(data) ? data : []);
        }

        if (enrollmentsRes.ok) {
          const data = await enrollmentsRes.json();
          setEnrollments(Array.isArray(data) ? data : []);
        }
      } catch {
        // silencieux
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  // Vérifier si l'élève est déjà inscrit à une session
  const getEnrollment = (sessionId) =>
    enrollments.find((e) => Number(e.id) === Number(sessionId)) || null;

  // S'inscrire à une session
  const handleEnroll = async (sessionId) => {
    setEnrollingId(sessionId);
    try {
      const res = await fetch(
        `http://localhost:5000/api/group-classes/${sessionId}/enroll`,
        {
          method:  "POST",
          headers: { "Content-Type": "application/json", ...headers },
          body:    JSON.stringify({ student_id: user.id }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Erreur lors de l'inscription");
        return;
      }

      alert("Inscription confirmée !");

      // Recharger les inscriptions
      const enrollmentsRes = await fetch(
        `http://localhost:5000/api/group-classes/student/${user.id}`,
        { headers }
      );
      if (enrollmentsRes.ok) {
        const updated = await enrollmentsRes.json();
        setEnrollments(Array.isArray(updated) ? updated : []);
      }

      // Recharger les sessions (pour mettre à jour le compteur)
      const sessionsRes = await fetch(
        "http://localhost:5000/api/group-classes/open",
        { headers }
      );
      if (sessionsRes.ok) {
        const updated = await sessionsRes.json();
        setSessions(Array.isArray(updated) ? updated : []);
      }
    } catch {
      alert("Erreur de connexion au serveur");
    } finally {
      setEnrollingId(null);
    }
  };

  const initiale = user?.prenom?.[0]?.toUpperCase() || "É";

  return (
    <div style={S.wrap}>
      <div style={S.dash}>
        {/* ── SIDEBAR ── */}
        <aside style={S.sidebar}>
          <div style={S.sbBrand}>
            <div style={{ ...S.logo, fontSize: 20 }}>
              NOVA<span style={S.logoEm}>DEMY</span>
            </div>
            <span style={S.sbRole}>Élève</span>
          </div>

          <nav style={S.sbNav}>
            <span style={S.sbLabel}>Principal</span>
            <a style={S.sbLink} href="/student/dashboard">🏠 Tableau de bord</a>
            <a style={S.sbLink} href="/student/profile">👤 Mon profil</a>
            <a style={S.sbLink} href="/search">🔍 Trouver un prof</a>

            <span style={S.sbLabel}>Mes cours</span>
            <a style={S.sbLink} href="/trial-request">📬 Demande d'essai</a>
            <a style={S.sbLink} href="/student/packs">📦 Formules</a>
            <a style={S.sbLink} href="/student/courses">📚 Mes cours</a>
            <a style={S.sbLinkActive} href="/student/collective-classes">👥 Classes collectives</a>
            <a style={S.sbLink} href="/student/planning">📅 Mon calendrier</a>
            <a style={S.sbLink} href="/student/chat">💬 Messages</a>

            <span style={S.sbLabel}>Compte</span>
            <a style={S.sbLink} href="/payment">💳 Paiement</a>
          </nav>

          <div style={S.sbUser}>
            <div style={S.av}>{initiale}</div>
            <div>
              <div style={{ fontSize: 16, fontWeight: 700 }}>
                {user ? `${user.prenom} ${user.nom}` : "Prénom Nom"}
              </div>
              <div style={{ fontSize: 14, color: "#9CA3AF", marginTop: 2 }}>Élève</div>
            </div>
          </div>
        </aside>

        {/* ── MAIN ── */}
        <main style={S.main}>
          <div style={S.topBar}>
            <div>
              <p style={S.smallTitle}>Classes collectives</p>
              <p style={S.smallSub}>
                Inscrivez-vous à une session collective ouverte par un professeur.
                La session est confirmée uniquement si le nombre minimum d'élèves est atteint.
              </p>
            </div>
          </div>

          <div style={S.infoBanner}>
            Une session collective est maintenue uniquement si le nombre minimum
            d'élèves requis est atteint à la date de clôture. Si ce n'est pas le cas,
            votre inscription sera annulée et vous en serez informé.
          </div>

          {/* ── MES INSCRIPTIONS ── */}
          {enrollments.length > 0 && (
            <div style={{ ...S.summaryCard, marginBottom: 24 }}>
              <div style={S.summaryTitle}>Mes inscriptions</div>
              {enrollments.map((e) => {
                const st = ENROLLMENT_STATUS[e.enrollment_status] || ENROLLMENT_STATUS.inscrit;
                const enrolled = Number(e.enrolled_count || 0);
                const max      = Number(e.max_students);
                const min      = Number(e.min_students);
                const pct      = max > 0 ? Math.min((enrolled / max) * 100, 100) : 0;

                return (
                  <div
                    key={e.id}
                    style={{
                      background: "#F9FAFB",
                      border: "1px solid #E5E7EB",
                      borderRadius: 12,
                      padding: 16,
                      marginBottom: 12,
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                      <div style={{ fontWeight: 700, fontSize: 16 }}>{e.subject}</div>
                      <span style={{ ...S.pill, background: st.bg, color: st.col }}>
                        {st.label}
                      </span>
                    </div>
                    <div style={{ fontSize: 14, color: "#6B7280", marginBottom: 8 }}>
                      {LEVEL_LABELS[e.level] || e.level} •{" "}
                      Clôture : {new Date(e.closing_date).toLocaleDateString("fr-FR")}
                    </div>
                    <div style={{ fontSize: 14, color: "#4B5563" }}>
                      Inscrits : <strong>{enrolled}</strong> / {max}
                      {enrolled < min && (
                        <span style={{ color: "#EA580C", marginLeft: 8 }}>
                          (min {min} requis)
                        </span>
                      )}
                    </div>
                    <div style={S.progressBar}>
                      <div
                        style={{
                          ...S.progressFill,
                          width: `${pct}%`,
                          background: enrolled >= min ? "#059669" : "#2563EB",
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* ── SESSIONS OUVERTES ── */}
          <div style={S.summaryTitle}>Sessions disponibles</div>

          {loading ? (
            <div style={S.empty}>
              <p style={S.emptyText}>Chargement des sessions…</p>
            </div>
          ) : sessions.length === 0 ? (
            <div style={S.empty}>
              <div style={S.emptyIcon}>👥</div>
              <p style={S.emptyText}>
                Aucune session collective ouverte pour le moment.
                <br />
                Revenez plus tard ou consultez les annonces des professeurs.
              </p>
            </div>
          ) : (
            <div style={S.formulaGrid}>
              {sessions.map((s) => {
                const enrollment = getEnrollment(s.id);
                const enrolled   = Number(s.enrolled_count || 0);
                const max        = Number(s.max_students);
                const min        = Number(s.min_students);
                const pct        = max > 0 ? Math.min((enrolled / max) * 100, 100) : 0;
                const isFull     = enrolled >= max;
                const isEnrolled = !!enrollment;

                return (
                  <div
                    key={s.id}
                    style={isEnrolled ? S.formulaCardActive : S.formulaCard}
                  >
                    <div style={S.formulaTop}>
                      <h3 style={S.formulaTitle}>{s.subject}</h3>
                      <span style={S.formulaTag}>
                        {LEVEL_LABELS[s.level] || s.level}
                      </span>
                    </div>

                    <div style={S.formulaText}>
                      Professeur #{s.teacher_id}
                    </div>

                    <ul style={S.list}>
                      <li>
                        Ouverture : {new Date(s.opening_date).toLocaleDateString("fr-FR")}
                      </li>
                      <li>
                        Clôture : {new Date(s.closing_date).toLocaleDateString("fr-FR")}
                      </li>
                      <li>
                        Min {s.min_students} · Max {s.max_students} élèves
                      </li>
                    </ul>

                    {/* Barre de progression */}
                    <div style={{ marginTop: 14 }}>
                      <div style={{ fontSize: 13, color: "#6B7280", marginBottom: 4 }}>
                        Inscrits : <strong>{enrolled}</strong> / {max}
                        {enrolled < min && (
                          <span style={{ color: "#EA580C", marginLeft: 6 }}>
                            (min {min} requis)
                          </span>
                        )}
                      </div>
                      <div style={S.progressBar}>
                        <div
                          style={{
                            ...S.progressFill,
                            width: `${pct}%`,
                            background: enrolled >= min ? "#059669" : "#2563EB",
                          }}
                        />
                      </div>
                    </div>

                    <div style={S.btnRow}>
                      {isEnrolled ? (
                        <span style={{ ...S.btn, ...S.btnSuccess, cursor: "default" }}>
                          ✓ Inscrit
                        </span>
                      ) : isFull ? (
                        <span style={{ ...S.btn, ...S.btnGhost, cursor: "not-allowed", opacity: 0.6 }}>
                          Session complète
                        </span>
                      ) : (
                        <button
                          type="button"
                          disabled={enrollingId === s.id}
                          onClick={() => handleEnroll(s.id)}
                          style={{
                            ...S.btn,
                            ...S.btnPrimary,
                            opacity: enrollingId === s.id ? 0.5 : 1,
                            cursor:  enrollingId === s.id ? "not-allowed" : "pointer",
                          }}
                        >
                          {enrollingId === s.id ? "Inscription…" : "S'inscrire"}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default StudentCollectiveClasses;