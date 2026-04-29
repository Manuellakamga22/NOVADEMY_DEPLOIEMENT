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
    background: "#EFF6FF",
    color: "#2563EB",
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
    background: "linear-gradient(135deg,#2563EB,#1D4ED8)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    fontWeight: 700,
    fontSize: 16,
    flexShrink: 0,
  },

  main: { padding: "30px 30px" },

  topBar: { marginBottom: 22 },

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
    maxWidth: "940px",
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
  },

  cardDesc: {
    fontSize: 16,
    color: "#6B7280",
    lineHeight: 1.7,
    marginBottom: 16,
  },

  noteBox: {
    background: "#EFF6FF",
    border: "1px solid #BFDBFE",
    color: "#1D4ED8",
    borderRadius: 12,
    padding: "15px 16px",
    fontSize: 16,
    lineHeight: 1.7,
    marginBottom: 16,
  },

  warningBox: {
    background: "#FFF7ED",
    border: "1px solid #FED7AA",
    color: "#C2410C",
    borderRadius: 12,
    padding: "15px 16px",
    fontSize: 15,
    lineHeight: 1.7,
    marginBottom: 16,
  },

  fieldGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 12,
    marginBottom: 16,
  },

  field: {
    marginBottom: 14,
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

  btnRow: {
    display: "flex",
    gap: 10,
    flexWrap: "wrap",
    marginTop: 8,
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

  btnPrimary: { background: "#2563EB", color: "#fff" },
  btnGhost:   { background: "#F3F4F6", color: "#4B5563" },
  btnDanger:  { background: "#FEF2F2", color: "#DC2626" },
  btnSuccess: { background: "#ECFDF5", color: "#059669" },

  list: {
    display: "flex",
    flexDirection: "column",
    gap: 14,
  },

  classCard: {
    background: "#F9FAFB",
    border: "1px solid #E5E7EB",
    borderRadius: 14,
    padding: 18,
  },

  itemTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 14,
    flexWrap: "wrap",
    marginBottom: 10,
  },

  itemTitle: {
    margin: 0,
    fontSize: 20,
    fontWeight: 800,
    color: "#111827",
  },

  itemSub: {
    margin: "8px 0 0 0",
    fontSize: 15,
    color: "#6B7280",
    lineHeight: 1.6,
  },

  pillRow: {
    display: "flex",
    gap: 6,
    flexWrap: "wrap",
    marginBottom: 10,
  },

  pill: {
    fontSize: 12,
    fontWeight: 700,
    padding: "5px 11px",
    borderRadius: 999,
    display: "inline-block",
  },

  itemInfo: {
    fontSize: 15,
    color: "#4B5563",
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

  empty: {
    textAlign: "center",
    padding: "34px 20px",
    color: "#9CA3AF",
  },

  emptyIcon: { fontSize: 34, marginBottom: 12 },
  emptyText:  { fontSize: 16, lineHeight: 1.7 },
};

const STATUS_COLORS = {
  ouverte:  { bg: "#ECFDF5", col: "#059669" },
  complete: { bg: "#EFF6FF", col: "#2563EB" },
  validee:  { bg: "#ECFDF5", col: "#059669" },
  annulee:  { bg: "#FEF2F2", col: "#DC2626" },
  fermee:   { bg: "#F3F4F6", col: "#6B7280" },
};

const LEVEL_LABELS = {
  college:   "Collège",
  lycee:     "Lycée",
  superieur: "Supérieur",
  prepa:     "Prépa",
};

function TeacherCollectiveClasses() {
  const savedUser = localStorage.getItem("user");
  const user  = savedUser ? JSON.parse(savedUser) : null;
  const token = localStorage.getItem("token");

  const [classes,     setClasses]     = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [loading,     setLoading]     = useState(true);
  const [submitting,  setSubmitting]  = useState(false);

  // Formulaire
  const [announcementId, setAnnouncementId] = useState("");
  const [level,          setLevel]          = useState("");
  const [minStudents,    setMinStudents]     = useState("2");
  const [maxStudents,    setMaxStudents]     = useState("6");
  const [openingDate,    setOpeningDate]     = useState("");
  const [closingDate,    setClosingDate]     = useState("");

  const headers = { Authorization: `Bearer ${token}` };

  // ── Chargement initial ──────────────────────────────────────────────────────
  useEffect(() => {
    if (!user?.id) { setLoading(false); return; }

    const fetchAll = async () => {
      try {
        const [classesRes, annRes] = await Promise.all([
          fetch(`http://localhost:5000/api/group-classes/teacher/${user.id}`, { headers }),
          fetch(`http://localhost:5000/api/announcements`, { headers }),
        ]);

        if (classesRes.ok) {
          const data = await classesRes.json();
          setClasses(Array.isArray(data) ? data : []);
        }

        if (annRes.ok) {
          const data = await annRes.json();
          // Filtrer uniquement les annonces du prof connecté
          const mine = Array.isArray(data)
            ? data.filter((a) => Number(a.teacher_id) === Number(user.id))
            : [];
          setAnnouncements(mine);
        }
      } catch {
        // silencieux
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  // ── Créer une session ───────────────────────────────────────────────────────
  const handleCreate = async (e) => {
    e.preventDefault();

    if (!announcementId || !level || !minStudents || !maxStudents || !openingDate || !closingDate) {
      alert("Veuillez remplir tous les champs.");
      return;
    }

    if (Number(minStudents) < 2) {
      alert("Le minimum doit être d'au moins 2 élèves.");
      return;
    }

    if (Number(maxStudents) < Number(minStudents)) {
      alert("Le maximum doit être supérieur ou égal au minimum.");
      return;
    }

    // Récupérer la matière depuis l'annonce sélectionnée
    const ann = announcements.find((a) => String(a.id) === String(announcementId));

    setSubmitting(true);
    try {
      const res = await fetch("http://localhost:5000/api/group-classes", {
        method:  "POST",
        headers: { "Content-Type": "application/json", ...headers },
        body: JSON.stringify({
          teacher_id:      user.id,
          announcement_id: announcementId,
          subject:         ann?.subject || "—",
          level,
          min_students:    minStudents,
          max_students:    maxStudents,
          opening_date:    openingDate,
          closing_date:    closingDate,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Erreur création session");
        return;
      }

      alert("Session collective créée !");
      // Recharger la liste
      const refreshRes = await fetch(
        `http://localhost:5000/api/group-classes/teacher/${user.id}`,
        { headers }
      );
      if (refreshRes.ok) {
        const refreshed = await refreshRes.json();
        setClasses(Array.isArray(refreshed) ? refreshed : []);
      }

      // Reset form
      setAnnouncementId("");
      setLevel("");
      setMinStudents("2");
      setMaxStudents("6");
      setOpeningDate("");
      setClosingDate("");
    } catch {
      alert("Erreur de connexion au serveur");
    } finally {
      setSubmitting(false);
    }
  };

  // ── Clore une session ───────────────────────────────────────────────────────
  const handleClose = async (classId) => {
    if (!window.confirm("Clore cette session ? Le résultat sera définitif.")) return;

    try {
      const res = await fetch(
        `http://localhost:5000/api/group-classes/${classId}/close`,
        { method: "PUT", headers }
      );
      const data = await res.json();
      alert(data.message || "Session close");

      // Recharger
      const refreshRes = await fetch(
        `http://localhost:5000/api/group-classes/teacher/${user.id}`,
        { headers }
      );
      if (refreshRes.ok) {
        const refreshed = await refreshRes.json();
        setClasses(Array.isArray(refreshed) ? refreshed : []);
      }
    } catch {
      alert("Erreur de connexion au serveur");
    }
  };

  // ── Stats ───────────────────────────────────────────────────────────────────
  const countOuverte  = classes.filter((c) => c.status === "ouverte").length;
  const countValidee  = classes.filter((c) => c.status === "validee").length;
  const countAnnulee  = classes.filter((c) => c.status === "annulee").length;
  const totalInscrits = classes.reduce((acc, c) => acc + Number(c.enrolled_count || 0), 0);

  const initiale = user?.prenom?.[0]?.toUpperCase() || "P";

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
            <a style={S.sbLink} href="/teacher/dashboard">🏠 Tableau de bord</a>
            <a style={S.sbLink} href="/teacher/profile">👤 Mon profil</a>
            <a style={S.sbLink} href="/teacher/announcements">📢 Annonces</a>

            <span style={S.sbLabel}>Organisation</span>
            <a style={S.sbLink} href="/teacher/planning">📅 Planning</a>
            <a style={S.sbLinkActive} href="/teacher/collective/classes">👥 Classes collectives</a>
            <a style={S.sbLink} href="/teacher/requests">📬 Demandes d'essai</a>
            <a style={S.sbLink} href="/student/chat">💬 Messages</a>

            <span style={S.sbLabel}>Compte</span>
            <a style={S.sbLink} href="/teacher/revenue">💳 Revenus</a>
            <a style={S.sbLink} href="/teacher/propose/formula">📦 Nos formules</a>
          </nav>

          <div style={S.sbUser}>
            <div style={S.av}>{initiale}</div>
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

        {/* ── MAIN ── */}
        <main style={S.main}>
          <div style={S.topBar}>
            <p style={S.smallTitle}>Classes collectives</p>
            <div style={S.smallSub}>
              Ouvrez une session collective sur une période définie. Si le nombre
              minimum d'élèves n'est pas atteint à la clôture, la session sera
              annulée et les élèves inscrits seront notifiés.
            </div>
          </div>

          {/* ── STATS ── */}
          <div style={S.stats}>
            <div style={S.statAccent}>
              <div style={S.statLabelW}>Sessions ouvertes</div>
              <div style={S.statValW}>{loading ? "…" : countOuverte}</div>
            </div>
            <div style={S.stat}>
              <div style={S.statLabel}>Élèves inscrits</div>
              <div style={S.statVal}>{loading ? "…" : totalInscrits}</div>
            </div>
            <div style={S.stat}>
              <div style={S.statLabel}>Validées</div>
              <div style={S.statVal}>{loading ? "…" : countValidee}</div>
            </div>
            <div style={S.stat}>
              <div style={S.statLabel}>Annulées</div>
              <div style={S.statVal}>{loading ? "…" : countAnnulee}</div>
            </div>
          </div>

          {/* ── FORMULAIRE ── */}
          <div style={S.card}>
            <div style={S.cardTitle}>Créer une session collective</div>
            <div style={S.cardDesc}>
              Associez la session à l'une de vos annonces. Les élèves pourront s'inscrire
              jusqu'à la date de clôture.
            </div>

            <div style={S.noteBox}>
              Une session est maintenue uniquement si le nombre minimum d'élèves est
              atteint à la date de clôture. Dans le cas contraire, elle est annulée
              automatiquement lors de la clôture.
            </div>

            <form onSubmit={handleCreate}>
              <div style={S.field}>
                <label style={S.label}>Annonce associée</label>
                <select
                  value={announcementId}
                  onChange={(e) => setAnnouncementId(e.target.value)}
                  style={S.input}
                >
                  <option value="">Sélectionner une annonce</option>
                  {announcements.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.title} — {a.subject}
                    </option>
                  ))}
                </select>
              </div>

              <div style={S.fieldGrid}>
                <div style={S.field}>
                  <label style={S.label}>Niveau</label>
                  <select
                    value={level}
                    onChange={(e) => setLevel(e.target.value)}
                    style={S.input}
                  >
                    <option value="">Choisir un niveau</option>
                    <option value="college">Collège</option>
                    <option value="lycee">Lycée</option>
                    <option value="superieur">Supérieur</option>
                    <option value="prepa">Prépa</option>
                  </select>
                </div>

                <div style={S.field}>
                  <label style={S.label}>Nombre minimum d'élèves</label>
                  <input
                    type="number"
                    min="2"
                    value={minStudents}
                    onChange={(e) => setMinStudents(e.target.value)}
                    style={S.input}
                  />
                </div>
              </div>

              <div style={S.fieldGrid}>
                <div style={S.field}>
                  <label style={S.label}>Nombre maximum d'élèves</label>
                  <input
                    type="number"
                    min={minStudents}
                    value={maxStudents}
                    onChange={(e) => setMaxStudents(e.target.value)}
                    style={S.input}
                  />
                </div>

                <div style={S.field}>
                  <label style={S.label}>Date d'ouverture</label>
                  <input
                    type="datetime-local"
                    value={openingDate}
                    onChange={(e) => setOpeningDate(e.target.value)}
                    style={S.input}
                  />
                </div>
              </div>

              <div style={S.field}>
                <label style={S.label}>Date de clôture des inscriptions</label>
                <input
                  type="datetime-local"
                  value={closingDate}
                  onChange={(e) => setClosingDate(e.target.value)}
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
                    cursor:  submitting ? "not-allowed" : "pointer",
                  }}
                >
                  {submitting ? "Création…" : "Créer la session"}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setAnnouncementId("");
                    setLevel("");
                    setMinStudents("2");
                    setMaxStudents("6");
                    setOpeningDate("");
                    setClosingDate("");
                  }}
                  style={{ ...S.btn, ...S.btnGhost }}
                >
                  Réinitialiser
                </button>
              </div>
            </form>
          </div>

          {/* ── LISTE DES SESSIONS ── */}
          <div style={S.card}>
            <div style={S.cardTitle}>Mes sessions collectives</div>

            {loading ? (
              <div style={S.empty}><p style={S.emptyText}>Chargement…</p></div>
            ) : classes.length === 0 ? (
              <div style={S.empty}>
                <div style={S.emptyIcon}>👥</div>
                <div style={S.emptyText}>Aucune session collective créée pour le moment.</div>
              </div>
            ) : (
              <div style={S.list}>
                {classes.map((c) => {
                  const statusColor = STATUS_COLORS[c.status] || STATUS_COLORS.fermee;
                  const enrolled    = Number(c.enrolled_count || 0);
                  const max         = Number(c.max_students);
                  const min         = Number(c.min_students);
                  const pct         = max > 0 ? Math.min((enrolled / max) * 100, 100) : 0;
                  const progressColor = enrolled >= min ? "#059669" : "#2563EB";

                  return (
                    <div key={c.id} style={S.classCard}>
                      <div style={S.itemTop}>
                        <div>
                          <h4 style={S.itemTitle}>{c.subject}</h4>
                          <p style={S.itemSub}>
                            Ouverture : {new Date(c.opening_date).toLocaleDateString("fr-FR")}
                            {" → "}
                            Clôture : {new Date(c.closing_date).toLocaleDateString("fr-FR")}
                          </p>
                        </div>
                        <span style={{ ...S.pill, background: statusColor.bg, color: statusColor.col }}>
                          {c.status}
                        </span>
                      </div>

                      <div style={S.pillRow}>
                        <span style={{ ...S.pill, background: "#EFF6FF", color: "#2563EB" }}>
                          {LEVEL_LABELS[c.level] || c.level}
                        </span>
                        <span style={{ ...S.pill, background: "#F3F4F6", color: "#4B5563" }}>
                          Min {c.min_students} · Max {c.max_students} élèves
                        </span>
                      </div>

                      {/* Barre de progression */}
                      <div style={S.itemInfo}>
                        Inscrits : <strong>{enrolled}</strong> / {max}
                        {enrolled < min && (
                          <span style={{ color: "#EA580C", marginLeft: 8 }}>
                            (min {min} requis)
                          </span>
                        )}
                      </div>
                      <div style={S.progressBar}>
                        <div style={{ ...S.progressFill, width: `${pct}%`, background: progressColor }} />
                      </div>

                      {/* Bouton clore (uniquement si ouverte ou complete) */}
                      {(c.status === "ouverte" || c.status === "complete") && (
                        <div style={{ ...S.btnRow, marginTop: 12 }}>
                          <button
                            type="button"
                            onClick={() => handleClose(c.id)}
                            style={{ ...S.btn, ...S.btnDanger }}
                          >
                            Clore la session
                          </button>
                        </div>
                      )}

                      {c.status === "annulee" && (
                        <div style={{ ...S.warningBox, marginTop: 12, marginBottom: 0 }}>
                          Session annulée — minimum non atteint. Les élèves inscrits ont été notifiés.
                        </div>
                      )}

                      {c.status === "validee" && (
                        <div style={{ ...S.noteBox, marginTop: 12, marginBottom: 0 }}>
                          Session validée — {enrolled} élève(s) confirmé(s).
                        </div>
                      )}
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

export default TeacherCollectiveClasses;