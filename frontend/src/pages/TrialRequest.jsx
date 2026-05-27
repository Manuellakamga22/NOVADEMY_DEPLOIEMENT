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

  main: { padding: "28px 28px" },

  topBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 16,
    marginBottom: 20,
    flexWrap: "wrap",
  },

  smallTitle: {
    fontSize: 20,
    fontWeight: 800,
    color: "#111827",
    margin: 0,
  },

  smallSub: {
    fontSize: 14,
    color: "#9CA3AF",
    marginTop: 6,
    lineHeight: 1.6,
  },

  stats: {
    display: "grid",
    gridTemplateColumns: "repeat(4,1fr)",
    gap: 14,
    marginBottom: 20,
  },

  statAccent: {
    background: "#2563EB",
    border: "1px solid #2563EB",
    borderRadius: 14,
    padding: "18px 20px",
  },

  stat: {
    background: "#fff",
    border: "1px solid #E5E7EB",
    borderRadius: 14,
    padding: "18px 20px",
  },

  statLabelW: {
    fontSize: 11,
    fontWeight: 700,
    color: "rgba(255,255,255,.8)",
    textTransform: "uppercase",
    letterSpacing: ".06em",
    marginBottom: 8,
  },

  statLabel: {
    fontSize: 11,
    fontWeight: 700,
    color: "#9CA3AF",
    textTransform: "uppercase",
    letterSpacing: ".06em",
    marginBottom: 8,
  },

  statValW: {
    fontSize: 26,
    fontWeight: 800,
    color: "#fff",
  },

  statVal: {
    fontSize: 26,
    fontWeight: 800,
    color: "#111827",
  },

  card: {
    background: "#fff",
    border: "1px solid #E5E7EB",
    borderRadius: 14,
    padding: "20px 22px",
    marginBottom: 18,
  },

  cardTitle: {
    fontSize: 15,
    fontWeight: 700,
    marginBottom: 14,
    color: "#111827",
  },

  infoGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 12,
  },

  infoBox: {
    background: "#F9FAFB",
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

  noteBox: {
    background: "#EFF6FF",
    border: "1px solid #BFDBFE",
    color: "#1D4ED8",
    borderRadius: 12,
    padding: "14px 16px",
    fontSize: 14,
    lineHeight: 1.6,
    marginBottom: 14,
  },

  warningBox: {
    background: "#FFF7ED",
    border: "1px solid #FED7AA",
    color: "#C2410C",
    borderRadius: 12,
    padding: "14px 16px",
    fontSize: 14,
    lineHeight: 1.6,
    marginBottom: 16,
  },

  field: {
    marginBottom: 16,
  },

  label: {
    display: "block",
    fontSize: 14,
    fontWeight: 700,
    color: "#374151",
    marginBottom: 8,
  },

  input: {
    width: "100%",
    padding: "12px 14px",
    borderRadius: 9,
    border: "1.5px solid #E5E7EB",
    fontFamily: "inherit",
    fontSize: 15,
    outline: "none",
    background: "#fff",
    boxSizing: "border-box",
  },

  textarea: {
    width: "100%",
    minHeight: 120,
    padding: "12px 14px",
    borderRadius: 9,
    border: "1.5px solid #E5E7EB",
    fontFamily: "inherit",
    fontSize: 15,
    outline: "none",
    background: "#fff",
    boxSizing: "border-box",
    resize: "vertical",
  },

  scheduleHead: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    marginBottom: 14,
    flexWrap: "wrap",
  },

  navBtn: {
    border: "none",
    borderRadius: 10,
    background: "#F3F4F6",
    color: "#374151",
    fontSize: 14,
    fontWeight: 700,
    padding: "10px 14px",
    cursor: "pointer",
  },

  scheduleTitle: {
    fontSize: 14,
    fontWeight: 700,
    color: "#4B5563",
  },

  slotsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: 10,
  },

  slotBtn: {
    padding: "12px 14px",
    borderRadius: 10,
    border: "1.5px solid #E5E7EB",
    background: "#fff",
    color: "#374151",
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
    textAlign: "left",
    minHeight: "68px",
  },

  slotBtnActive: {
    padding: "12px 14px",
    borderRadius: 10,
    border: "1.5px solid #2563EB",
    background: "#EFF6FF",
    color: "#2563EB",
    fontSize: 14,
    fontWeight: 700,
    cursor: "pointer",
    textAlign: "left",
    minHeight: "68px",
  },

  slotDay: {
    display: "block",
    fontSize: 14,
    fontWeight: 800,
    marginBottom: 6,
  },

  slotHour: {
    display: "block",
    fontSize: 13,
    fontWeight: 600,
  },

  slotType: {
    display: "block",
    fontSize: 12,
    marginTop: 6,
    opacity: 0.9,
  },

  btnRow: {
    display: "flex",
    gap: 10,
    flexWrap: "wrap",
    marginTop: 10,
  },

  btn: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "inherit",
    fontSize: 14,
    fontWeight: 600,
    padding: "10px 18px",
    borderRadius: 9,
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
    padding: "28px 20px",
    color: "#9CA3AF",
  },

  emptyIcon: {
    fontSize: 30,
    marginBottom: 10,
  },

  emptyText: {
    fontSize: 14,
    lineHeight: 1.6,
  },
};

function TrialRequest() {
  // ── Récupération de l'utilisateur connecté depuis localStorage
  const savedUser = localStorage.getItem("user");
  const user = savedUser ? JSON.parse(savedUser) : null;

  // ── Paramètres transmis depuis SearchTeachers via l'URL
  const params = new URLSearchParams(window.location.search);
  const announcementId = params.get("announcement_id");
  const teacherId      = params.get("teacher_id");
  const teacherName    = params.get("teacher_name") || "Professeur";
  const subject        = params.get("subject")       || "Matière";
  const title          = params.get("title")         || "Annonce sélectionnée";
  const mode           = params.get("mode")          || "visio";

  // ── State
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot,   setSelectedSlot]   = useState(null);
  const [message,        setMessage]         = useState("");
  const [page,           setPage]            = useState(0);
  const [loadingSlots,   setLoadingSlots]    = useState(true);
  const [submitting,     setSubmitting]      = useState(false);
  // Nombre de demandes actives déjà envoyées par l'élève (max 3 autorisé)
  const [activeTrialsCount, setActiveTrialsCount] = useState(0);

  // ── Infos de l'annonce issues de l'URL
  const announcement = useMemo(
    () => ({
      id:           announcementId || "",
      teacher_id:   teacherId      || "",
      teacher_name: teacherName,
      title,
      subject,
      mode,
    }),
    [announcementId, teacherId, teacherName, title, subject, mode]
  );

  // ── 1. Charger les créneaux RÉELS du professeur depuis l'API
  useEffect(() => {
    if (!teacherId) {
      setLoadingSlots(false);
      return;
    }

    const fetchSlots = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/teacher-planning/teacher/${teacherId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const data = await res.json();

        if (!res.ok) {
          alert(data.message || "Erreur chargement créneaux");
          return;
        }

        // Formater pour l'affichage : { id, day, hour, type }
        const formatted = Array.isArray(data)
          ? data.map((item) => ({
              id:   item.id,
              day:  item.day_of_week,
              hour: `${String(item.start_time).slice(0, 5)} - ${String(item.end_time).slice(0, 5)}`,
              type: item.course_type || "cours_essai",
            }))
          : [];

        setAvailableSlots(formatted);
      } catch {
        alert("Erreur de connexion au serveur (créneaux)");
      } finally {
        setLoadingSlots(false);
      }
    };

    fetchSlots();
  }, [teacherId]);

  // ── 2. Charger le nombre de demandes actives de l'élève (limite = 3)
  useEffect(() => {
    if (!user?.id) return;

    const fetchStudentTrials = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/trials/student/${user.id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const data = await res.json();

        if (res.ok && Array.isArray(data)) {
          // Compter uniquement les demandes encore actives
          const active = data.filter((t) =>
            ["pending", "accepted", "reported"].includes(t.status)
          );
          setActiveTrialsCount(active.length);
        }
      } catch {
        // Non bloquant — on affiche juste le formulaire
      }
    };

    fetchStudentTrials();
  }, [user?.id]);

  // ── Pagination des créneaux (4 par page)
  const slotsPerPage = 4;
  const maxPage = Math.max(
    Math.ceil(availableSlots.length / slotsPerPage) - 1,
    0
  );

  const visibleSlots = useMemo(() => {
    const start = page * slotsPerPage;
    return availableSlots.slice(start, start + slotsPerPage);
  }, [page, availableSlots]);

  // ── Envoi de la demande de cours d'essai
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user?.id) {
      alert("Vous devez être connecté.");
      return;
    }

    if (!announcementId || !teacherId) {
      alert("Annonce ou professeur introuvable. Revenez depuis la recherche.");
      return;
    }

    if (!selectedSlot) {
      alert("Veuillez choisir un créneau.");
      return;
    }

    // Bloquer si déjà 3 demandes actives (règle métier)
    if (activeTrialsCount >= 3) {
      alert(
        "Vous avez déjà 3 demandes de cours d'essai actives. Attendez une réponse avant d'en créer une nouvelle."
      );
      return;
    }

    setSubmitting(true);

    try {
      const token = localStorage.getItem("token");

      const res = await fetch("${import.meta.env.VITE_API_URL}/api/trials", {
        method: "POST",
        headers: {
          "Content-Type":  "application/json",
          Authorization:   `Bearer ${token}`,
        },
        body: JSON.stringify({
          announcement_id: Number(announcementId),
          student_id:      user.id,
          teacher_id:      Number(teacherId),
          planning_id:     selectedSlot.id,   // ← vrai ID du créneau
          message:         message.trim() || null,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Erreur lors de l'envoi de la demande.");
        return;
      }

      alert(data.message || "Demande de cours d'essai envoyée avec succès !");
      window.location.href = "/student/requests";
    } catch {
      alert("Erreur de connexion au serveur.");
    } finally {
      setSubmitting(false);
    }
  };

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
            <a style={S.sbLinkActive} href="/trial-request">📬 Demande d'essai</a>
            <a style={S.sbLink} href="/student/requests">
              📄 Mes demandes{" "}
              <span style={S.sbBadge}>{activeTrialsCount}</span>
            </a>
            <a style={S.sbLink} href="/student/courses">📚 Mes cours</a>
            <a style={S.sbLink} href="/student/planning">📅 Mon calendrier</a>
            <a style={S.sbLink} href="/chat">
              💬 Messages <span style={S.sbBadge}>0</span>
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

        {/* ── MAIN ── */}
        <main style={S.main}>

          {/* En-tête */}
          <div style={S.topBar}>
            <div>
              <p style={S.smallTitle}>Demande de cours d'essai</p>
              <div style={S.smallSub}>
                Choisissez un créneau disponible et envoyez votre demande.
              </div>
            </div>
          </div>

          {/* Alerte limite 3 profs */}
          {activeTrialsCount >= 3 && (
            <div style={{
              background: "#FEF2F2",
              border: "1px solid #FECACA",
              color: "#DC2626",
              borderRadius: 12,
              padding: "14px 16px",
              fontSize: 14,
              lineHeight: 1.6,
              marginBottom: 18,
            }}>
              ⛔ Vous avez atteint la limite de <strong>3 demandes actives</strong>.
              Attendez une réponse de l'un de vos professeurs avant d'en envoyer une nouvelle.
            </div>
          )}

          {/* Stats */}
          <div style={S.stats}>
            <div style={S.statAccent}>
              <div style={S.statLabelW}>Créneaux disponibles</div>
              <div style={S.statValW}>{availableSlots.length}</div>
            </div>
            <div style={S.stat}>
              <div style={S.statLabel}>Créneau choisi</div>
              <div style={S.statVal}>{selectedSlot ? "1" : "0"}</div>
            </div>
            <div style={S.stat}>
              <div style={S.statLabel}>Durée cours d'essai</div>
              <div style={S.statVal}>1h</div>
            </div>
            <div style={S.stat}>
              <div style={S.statLabel}>Demandes actives</div>
              <div style={S.statVal}>{activeTrialsCount} / 3</div>
            </div>
          </div>

          {/* Récap annonce */}
          <div style={S.card}>
            <div style={S.cardTitle}>Annonce choisie</div>
            <div style={S.infoGrid}>
              <div style={S.infoBox}>
                <div style={S.infoLabel}>Professeur</div>
                <div style={S.infoValue}>{announcement.teacher_name}</div>
              </div>
              <div style={S.infoBox}>
                <div style={S.infoLabel}>Annonce</div>
                <div style={S.infoValue}>{announcement.title}</div>
              </div>
              <div style={S.infoBox}>
                <div style={S.infoLabel}>Matière</div>
                <div style={S.infoValue}>{announcement.subject}</div>
              </div>
              <div style={S.infoBox}>
                <div style={S.infoLabel}>Mode</div>
                <div style={S.infoValue}>{announcement.mode}</div>
              </div>
            </div>
          </div>

          {/* Sélection créneaux */}
          <div style={S.card}>
            <div style={S.cardTitle}>Créneaux disponibles</div>

            <div style={S.noteBox}>
              Choisissez un seul créneau parmi les disponibilités réelles du professeur.
            </div>

            <div style={S.warningBox}>
              Après acceptation du professeur, le chat pourra s'ouvrir entre vous.
            </div>

            {/* Navigation pagination */}
            <div style={S.scheduleHead}>
              <button
                type="button"
                onClick={() => setPage((p) => Math.max(p - 1, 0))}
                disabled={page === 0}
                style={{ ...S.navBtn, opacity: page === 0 ? 0.4 : 1 }}
              >
                ← Créneaux précédents
              </button>

              <div style={S.scheduleTitle}>
                {availableSlots.length > 0
                  ? `Créneaux ${page + 1} / ${maxPage + 1}`
                  : "Aucun créneau"}
              </div>

              <button
                type="button"
                onClick={() => setPage((p) => Math.min(p + 1, maxPage))}
                disabled={page >= maxPage}
                style={{ ...S.navBtn, opacity: page >= maxPage ? 0.4 : 1 }}
              >
                Créneaux suivants →
              </button>
            </div>

            {/* Affichage des créneaux */}
            {loadingSlots ? (
              <div style={S.empty}>
                <div style={S.emptyText}>Chargement des créneaux...</div>
              </div>
            ) : visibleSlots.length === 0 ? (
              <div style={S.empty}>
                <div style={S.emptyIcon}>🕒</div>
                <div style={S.emptyText}>
                  Aucun créneau disponible pour le moment.
                  <br />
                  Ce professeur n'a pas encore renseigné ses disponibilités.
                </div>
              </div>
            ) : (
              <div style={S.slotsGrid}>
                {visibleSlots.map((slot) => {
                  const isActive = selectedSlot?.id === slot.id;
                  return (
                    <button
                      key={slot.id}
                      type="button"
                      onClick={() => setSelectedSlot(slot)}
                      style={isActive ? S.slotBtnActive : S.slotBtn}
                    >
                      <span style={S.slotDay}>{slot.day}</span>
                      <span style={S.slotHour}>{slot.hour}</span>
                      <span style={S.slotType}>
                        {slot.type === "cours_essai" ? "Cours d'essai" : "Cours"}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Formulaire d'envoi */}
          <div style={S.card}>
            <div style={S.cardTitle}>Votre besoin</div>

            <form onSubmit={handleSubmit}>
              <div style={S.field}>
                <label style={S.label}>Message pour le professeur</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Expliquez vos difficultés, vos objectifs et ce que vous attendez du cours d'essai."
                  style={S.textarea}
                />
              </div>

              <div style={S.field}>
                <label style={S.label}>Créneau choisi</label>
                <input
                  value={
                    selectedSlot
                      ? `${selectedSlot.day} — ${selectedSlot.hour}`
                      : ""
                  }
                  readOnly
                  placeholder="Aucun créneau sélectionné"
                  style={S.input}
                />
              </div>

              <div style={S.btnRow}>
                <button
                  type="submit"
                  disabled={submitting || activeTrialsCount >= 3}
                  style={{
                    ...S.btn,
                    ...S.btnPrimary,
                    opacity: submitting || activeTrialsCount >= 3 ? 0.5 : 1,
                    cursor: submitting || activeTrialsCount >= 3 ? "not-allowed" : "pointer",
                  }}
                >
                  {submitting ? "Envoi en cours..." : "Envoyer la demande"}
                </button>

                <a href="/search" style={{ ...S.btn, ...S.btnGhost }}>
                  Retour à la recherche
                </a>
              </div>
            </form>
          </div>

        </main>
      </div>
    </div>
  );
}

export default TrialRequest;