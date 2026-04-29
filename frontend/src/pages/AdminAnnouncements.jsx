import React, { useEffect, useState } from "react";

const S = {
  wrap: {
    fontFamily: "'Segoe UI', sans-serif",
    minHeight: "100vh",
    background: "#F9FAFB",
  },

  logo: { fontSize: 20, fontWeight: 800 },
  logoEm: { color: "#2563EB" },

  dash: {
    display: "grid",
    gridTemplateColumns: "240px 1fr",
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

  sbBrand: { padding: 20, borderBottom: "1px solid #E5E7EB" },

  sbRole: {
    display: "inline-block",
    marginTop: 6,
    fontSize: 10,
    fontWeight: 700,
    letterSpacing: ".08em",
    textTransform: "uppercase",
    padding: "2px 10px",
    borderRadius: 20,
    background: "#FEF2F2",
    color: "#DC2626",
  },

  sbNav: { padding: 12, flex: 1 },

  sbLabel: {
    fontSize: 10,
    fontWeight: 700,
    letterSpacing: ".1em",
    textTransform: "uppercase",
    color: "#9CA3AF",
    padding: "0 10px",
    margin: "14px 0 4px",
    display: "block",
  },

  sbLink: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "10px 12px",
    borderRadius: 8,
    fontSize: 13,
    fontWeight: 500,
    color: "#4B5563",
    textDecoration: "none",
    marginBottom: 1,
  },

  sbLinkActive: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "10px 12px",
    borderRadius: 8,
    fontSize: 13,
    fontWeight: 600,
    color: "#2563EB",
    background: "#EFF6FF",
    textDecoration: "none",
    marginBottom: 1,
  },

  sbBadge: {
    marginLeft: "auto",
    background: "#EA580C",
    color: "#fff",
    fontSize: 10,
    fontWeight: 700,
    padding: "1px 6px",
    borderRadius: 10,
  },

  sbUser: {
    padding: "14px 20px",
    borderTop: "1px solid #E5E7EB",
    display: "flex",
    alignItems: "center",
    gap: 10,
  },

  av: {
    width: 34,
    height: 34,
    borderRadius: "50%",
    background: "linear-gradient(135deg,#6B7280,#374151)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    fontWeight: 700,
    fontSize: 12,
    flexShrink: 0,
  },

  main: { padding: "28px 32px" },
  pageTitle: { fontSize: 24, fontWeight: 800, marginBottom: 6 },
  pageSub:   { fontSize: 14, color: "#9CA3AF", marginBottom: 20 },

  stats: {
    display: "grid",
    gridTemplateColumns: "repeat(4,1fr)",
    gap: 14,
    marginBottom: 22,
  },

  statAccent: {
    background: "#2563EB",
    border: "1px solid #2563EB",
    borderRadius: 12,
    padding: 18,
  },

  stat: {
    background: "#fff",
    border: "1px solid #E5E7EB",
    borderRadius: 12,
    padding: 18,
  },

  statLabelW: {
    fontSize: 11,
    fontWeight: 600,
    color: "rgba(255,255,255,.7)",
    textTransform: "uppercase",
    letterSpacing: ".06em",
    marginBottom: 8,
  },

  statLabel: {
    fontSize: 11,
    fontWeight: 600,
    color: "#9CA3AF",
    textTransform: "uppercase",
    letterSpacing: ".06em",
    marginBottom: 8,
  },

  statValW: { fontSize: 28, fontWeight: 800, color: "#fff" },
  statVal:  { fontSize: 28, fontWeight: 800, color: "#111827" },

  g2: {
    display: "grid",
    gridTemplateColumns: "1.2fr 0.8fr",
    gap: 16,
    marginBottom: 16,
  },

  card: {
    background: "#fff",
    border: "1px solid #E5E7EB",
    borderRadius: 12,
    padding: 20,
  },

  cardTitle: {
    fontSize: 15,
    fontWeight: 700,
    marginBottom: 14,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },

  btn: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "inherit",
    fontSize: 12,
    fontWeight: 600,
    padding: "8px 14px",
    borderRadius: 8,
    border: "none",
    cursor: "pointer",
    textDecoration: "none",
  },

  btnPrimary: { background: "#2563EB", color: "#fff" },
  btnGhost:   { background: "#F3F4F6", color: "#4B5563" },
  btnDanger:  { background: "#FEF2F2", color: "#DC2626" },

  btnFull: {
    width: "100%",
    justifyContent: "center",
    padding: 12,
    marginTop: 10,
    fontSize: 13,
  },

  input: {
    width: "100%",
    padding: "11px 14px",
    borderRadius: 8,
    border: "1.5px solid #E5E7EB",
    fontFamily: "inherit",
    fontSize: 13,
    outline: "none",
    boxSizing: "border-box",
    background: "#fff",
  },

  searchRow: {
    display: "grid",
    gridTemplateColumns: "1fr 160px 160px 120px",
    gap: 10,
    marginBottom: 14,
  },

  tbl: { width: "100%", borderCollapse: "collapse" },

  tblTh: {
    textAlign: "left",
    padding: "9px 12px",
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: ".06em",
    textTransform: "uppercase",
    color: "#9CA3AF",
    borderBottom: "1.5px solid #E5E7EB",
  },

  tblTd: {
    padding: "12px",
    borderBottom: "1px solid #F3F4F6",
    fontSize: 13,
    verticalAlign: "top",
  },

  pill: {
    fontSize: 11,
    fontWeight: 600,
    padding: "3px 10px",
    borderRadius: 20,
    display: "inline-block",
  },

  actionRow: { display: "flex", gap: 8, flexWrap: "wrap" },

  empty: { textAlign: "center", padding: "20px", color: "#9CA3AF" },
  emptyIcon: { fontSize: 24, marginBottom: 8 },

  infoBox: {
    background: "#F9FAFB",
    border: "1px solid #E5E7EB",
    borderRadius: 10,
    padding: 14,
    marginBottom: 10,
  },

  infoLabel: { fontSize: 11, color: "#9CA3AF", marginBottom: 4 },
  infoValue: { fontSize: 20, fontWeight: 800, color: "#111827" },
};

const STATUS_COLORS = {
  active:   { bg: "#ECFDF5", col: "#059669", label: "Active" },
  inactive: { bg: "#F3F4F6", col: "#6B7280", label: "Inactive" },
  draft:    { bg: "#FFF7ED", col: "#EA580C", label: "Brouillon" },
};

const MODE_LABELS = {
  visio:       "Visio",
  presentiel:  "Présentiel",
  hybride:     "Hybride",
};

function AdminAnnouncements() {
  const savedUser = localStorage.getItem("user");
  const user  = savedUser ? JSON.parse(savedUser) : null;
  const token = localStorage.getItem("token");

  const [announcements, setAnnouncements] = useState([]);
  const [teachers,      setTeachers]      = useState([]);
  const [search,        setSearch]        = useState("");
  const [filterSubject, setFilterSubject] = useState("");
  const [filterStatus,  setFilterStatus]  = useState("");
  const [loading,       setLoading]       = useState(true);

  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [annRes, teachersRes] = await Promise.all([
          fetch("http://localhost:5000/api/announcements", { headers }),
          fetch("http://localhost:5000/api/teachers",      { headers }),
        ]);

        if (annRes.ok) {
          const data = await annRes.json();
          setAnnouncements(Array.isArray(data) ? data : []);
        }
        if (teachersRes.ok) {
          const data = await teachersRes.json();
          setTeachers(Array.isArray(data) ? data : []);
        }
      } catch {
        // silencieux
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  // Résoudre le nom du prof depuis teacher_id
  const getTeacherName = (teacherId) => {
    const t = teachers.find((t) => Number(t.id) === Number(teacherId));
    return t ? `${t.prenom} ${t.nom}` : `#${teacherId}`;
  };

  // Sujets uniques pour le filtre
  const allSubjects = [...new Set(announcements.map((a) => a.subject))];

  // Filtrage
  const filtered = announcements.filter((a) => {
    const matchSearch =
      search === "" ||
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.subject.toLowerCase().includes(search.toLowerCase());
    const matchSubject =
      filterSubject === "" || a.subject === filterSubject;
    const matchStatus =
      filterStatus === "" || a.status === filterStatus;
    return matchSearch && matchSubject && matchStatus;
  });

  // Stats
  const countActive   = announcements.filter((a) => a.status === "active").length;
  const countInactive = announcements.filter((a) => a.status === "inactive").length;
  const countDraft    = announcements.filter((a) => a.status === "draft").length;

  return (
    <div style={S.wrap}>
      <div style={S.dash}>
        {/* ── SIDEBAR ── */}
        <aside style={S.sidebar}>
          <div style={S.sbBrand}>
            <div style={{ ...S.logo, fontSize: 17 }}>
              NOVA<span style={S.logoEm}>DEMY</span>
            </div>
            <span style={S.sbRole}>Admin</span>
          </div>

          <nav style={S.sbNav}>
            <span style={S.sbLabel}>Vue globale</span>
            <a style={S.sbLink} href="/admin/dashboard">📊 Tableau de bord</a>
            <a style={S.sbLink} href="/admin/teachers">👩‍🏫 Professeurs</a>
            <a style={S.sbLink} href="/admin/students">🎓 Élèves</a>
            <a style={S.sbLinkActive} href="/admin/announcements">📢 Annonces</a>

            <span style={S.sbLabel}>Suivi</span>
            <a style={S.sbLink} href="/admin/trials">🧪 Cours d'essai</a>
            <a style={S.sbLink} href="/admin/reviews">💬 Modération avis</a>
            <a style={S.sbLink} href="/admin/alerts">
              🛡️ Alertes IA <span style={S.sbBadge}>0</span>
            </a>
            <a style={S.sbLink} href="/admin/payments">💳 Paiements</a>

            <span style={S.sbLabel}>Finance</span>
            <a style={S.sbLink} href="/admin/stats">📈 Statistiques</a>
            <a style={S.sbLink} href="/admin/settings">⚙️ Paramètres</a>
          </nav>

          <div style={S.sbUser}>
            <div style={S.av}>
              {user?.prenom?.[0]?.toUpperCase() || "A"}
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600 }}>
                {user ? `${user.prenom} ${user.nom}` : "Administrateur"}
              </div>
              <div style={{ fontSize: 11, color: "#9CA3AF" }}>Super Admin</div>
            </div>
          </div>
        </aside>

        {/* ── MAIN ── */}
        <main style={S.main}>
          <div style={S.pageTitle}>Gestion des annonces</div>
          <div style={S.pageSub}>Contrôle, validation et suspension des annonces</div>

          {/* ── STATS ── */}
          <div style={S.stats}>
            <div style={S.statAccent}>
              <div style={S.statLabelW}>Annonces</div>
              <div style={S.statValW}>{loading ? "…" : announcements.length}</div>
            </div>
            <div style={S.stat}>
              <div style={S.statLabel}>Actives</div>
              <div style={S.statVal}>{loading ? "…" : countActive}</div>
            </div>
            <div style={S.stat}>
              <div style={S.statLabel}>Brouillons</div>
              <div style={S.statVal}>{loading ? "…" : countDraft}</div>
            </div>
            <div style={S.stat}>
              <div style={S.statLabel}>Inactives</div>
              <div style={S.statVal}>{loading ? "…" : countInactive}</div>
            </div>
          </div>

          <div style={S.g2}>
            {/* ── LISTE ── */}
            <div style={S.card}>
              <div style={S.cardTitle}>Liste des annonces</div>

              <div style={S.searchRow}>
                <input
                  style={S.input}
                  placeholder="Rechercher une annonce"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <select
                  style={S.input}
                  value={filterSubject}
                  onChange={(e) => setFilterSubject(e.target.value)}
                >
                  <option value="">Toutes matières</option>
                  {allSubjects.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
                <select
                  style={S.input}
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="">Tous statuts</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="draft">Brouillon</option>
                </select>
                <button
                  style={{ ...S.btn, ...S.btnGhost }}
                  onClick={() => {
                    setSearch("");
                    setFilterSubject("");
                    setFilterStatus("");
                  }}
                >
                  Réinitialiser
                </button>
              </div>

              {loading ? (
                <div style={S.empty}>
                  <p style={{ fontSize: 13 }}>Chargement…</p>
                </div>
              ) : filtered.length === 0 ? (
                <div style={S.empty}>
                  <div style={S.emptyIcon}>📢</div>
                  <p style={{ fontSize: 13 }}>Aucune annonce trouvée.</p>
                </div>
              ) : (
                <div style={{ overflowX: "auto" }}>
                  <table style={S.tbl}>
                    <thead>
                      <tr>
                        <th style={S.tblTh}>Titre</th>
                        <th style={S.tblTh}>Matière</th>
                        <th style={S.tblTh}>Professeur</th>
                        <th style={S.tblTh}>Ville</th>
                        <th style={S.tblTh}>Mode</th>
                        <th style={S.tblTh}>Statut</th>
                        <th style={S.tblTh}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filtered.map((a) => {
                        const st = STATUS_COLORS[a.status] || STATUS_COLORS.inactive;
                        return (
                          <tr key={a.id}>
                            <td style={S.tblTd}>
                              <div style={{ fontWeight: 600 }}>{a.title}</div>
                            </td>
                            <td style={S.tblTd}>{a.subject}</td>
                            <td style={S.tblTd}>{getTeacherName(a.teacher_id)}</td>
                            <td style={S.tblTd}>{a.city}</td>
                            <td style={S.tblTd}>
                              <span style={{ ...S.pill, background: "#EFF6FF", color: "#2563EB" }}>
                                {MODE_LABELS[a.mode] || a.mode}
                              </span>
                            </td>
                            <td style={S.tblTd}>
                              <span style={{ ...S.pill, background: st.bg, color: st.col }}>
                                {st.label}
                              </span>
                            </td>
                            <td style={S.tblTd}>
                              <div style={S.actionRow}>
                                <a
                                  href={`/admin/announcements/${a.id}`}
                                  style={{ ...S.btn, ...S.btnGhost }}
                                >
                                  Voir
                                </a>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* ── ACTIONS RAPIDES ── */}
            <div style={S.card}>
              <div style={S.cardTitle}>Actions rapides</div>

              <div style={S.infoBox}>
                <div style={S.infoLabel}>Annonces actives</div>
                <div style={S.infoValue}>{loading ? "…" : countActive}</div>
              </div>

              <div style={S.infoBox}>
                <div style={S.infoLabel}>Brouillons</div>
                <div style={S.infoValue}>{loading ? "…" : countDraft}</div>
              </div>

              <div style={S.infoBox}>
                <div style={S.infoLabel}>Inactives</div>
                <div style={S.infoValue}>{loading ? "…" : countInactive}</div>
              </div>

              <a
                href="/admin/teachers"
                style={{ ...S.btn, ...S.btnPrimary, ...S.btnFull }}
              >
                Gérer les professeurs
              </a>

              <a
                href="/admin/dashboard"
                style={{ ...S.btn, ...S.btnGhost, ...S.btnFull }}
              >
                Retour au tableau de bord
              </a>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminAnnouncements;