import React, { useEffect, useState, useMemo, useCallback } from "react";

const S = {
  wrap: { fontFamily: "'Segoe UI', sans-serif", minHeight: "100vh", background: "#F9FAFB" },
  dash: { display: "grid", gridTemplateColumns: "260px 1fr", minHeight: "100vh" },
  sidebar: { background: "#fff", borderRight: "1px solid #E5E7EB", display: "flex", flexDirection: "column", position: "sticky", top: 0, height: "100vh", overflowY: "auto" },
  sbBrand: { padding: "24px 22px", borderBottom: "1px solid #E5E7EB" },
  logo: { fontSize: 22, fontWeight: 800, letterSpacing: "-0.02em" },
  logoEm: { color: "#2563EB" },
  sbRole: { display: "inline-block", marginTop: 8, fontSize: 13, fontWeight: 700, textTransform: "uppercase", padding: "5px 13px", borderRadius: 20, background: "#ECFDF5", color: "#059669" },
  sbNav: { padding: 14, flex: 1 },
  sbLabel: { fontSize: 12, fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", color: "#9CA3AF", padding: "0 10px", margin: "18px 0 6px", display: "block" },
  sbLink: { display: "flex", alignItems: "center", gap: 12, padding: "13px 14px", borderRadius: 9, fontSize: 17, fontWeight: 500, color: "#4B5563", textDecoration: "none", marginBottom: 2 },
  sbLinkActive: { display: "flex", alignItems: "center", gap: 12, padding: "13px 14px", borderRadius: 9, fontSize: 17, fontWeight: 600, color: "#2563EB", background: "#EFF6FF", textDecoration: "none", marginBottom: 2 },
  sbBadge: { marginLeft: "auto", background: "#2563EB", color: "#fff", fontSize: 12, fontWeight: 700, padding: "2px 8px", borderRadius: 10 },
  sbUser: { padding: "18px 22px", borderTop: "1px solid #E5E7EB", display: "flex", alignItems: "center", gap: 12 },
  av: { width: 40, height: 40, borderRadius: "50%", background: "linear-gradient(135deg,#059669,#0891B2)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 16, flexShrink: 0 },
  main: { padding: "30px 30px" },
  pageTitle: { fontSize: 34, fontWeight: 800, color: "#111827", marginBottom: 8 },
  pageSub: { fontSize: 18, color: "#6B7280", marginBottom: 24 },
  stats: { display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 24 },
  statAccent: { background: "#059669", borderRadius: 14, padding: "20px 22px" },
  stat: { background: "#fff", border: "1px solid #E5E7EB", borderRadius: 14, padding: "20px 22px" },
  statLabelW: { fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,.78)", textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 8 },
  statLabel: { fontSize: 13, fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 8 },
  statValW: { fontSize: 36, fontWeight: 800, color: "#fff" },
  statVal: { fontSize: 36, fontWeight: 800, color: "#111827" },
  card: { background: "#fff", border: "1px solid #E5E7EB", borderRadius: 14, padding: "22px 24px", marginBottom: 18 },
  cardTitle: { fontSize: 20, fontWeight: 800, marginBottom: 16, display: "flex", alignItems: "center", justifyContent: "space-between" },
  cardDesc: { fontSize: 17, color: "#6B7280", marginBottom: 14, lineHeight: 1.7 },
  successMsg: { background: "#ECFDF5", border: "1px solid #A7F3D0", color: "#059669", borderRadius: 10, padding: "13px 16px", fontSize: 16, marginBottom: 16 },
  errorMsg: { background: "#FEF2F2", border: "1px solid #FCA5A5", color: "#DC2626", borderRadius: 10, padding: "13px 16px", fontSize: 16, marginBottom: 16 },
  empty: { textAlign: "center", padding: "24px", color: "#9CA3AF", fontSize: 16 },
  navSemaine: { display: "flex", alignItems: "center", gap: 12, marginBottom: 14, flexWrap: "wrap" },
  navBtn: { background: "#fff", border: "1px solid #E5E7EB", borderRadius: 8, padding: "9px 15px", fontSize: 15, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", color: "#374151" },
  semaineTitre: { fontSize: 18, fontWeight: 700, color: "#111827", flex: 1 },
  agendaWrap: { background: "#fff", border: "1px solid #E5E7EB", borderRadius: 14, overflow: "auto", marginBottom: 18 },
  agendaTable: { width: "100%", borderCollapse: "collapse", minWidth: 640 },
  thHeure: { padding: "12px 6px", fontSize: 13, fontWeight: 700, color: "#9CA3AF", background: "#F9FAFB", borderBottom: "1px solid #E5E7EB", borderRight: "1px solid #E5E7EB", width: 65, textAlign: "center" },
  thJour: { padding: "12px 6px", fontSize: 14, fontWeight: 700, color: "#374151", background: "#F9FAFB", borderBottom: "1px solid #E5E7EB", borderRight: "1px solid #F3F4F6", textAlign: "center" },
  thJourAujourd: { padding: "12px 6px", fontSize: 14, fontWeight: 700, color: "#2563EB", background: "#EFF6FF", borderBottom: "2px solid #2563EB", borderRight: "1px solid #F3F4F6", textAlign: "center" },
  tdHeure: { padding: "8px 5px", fontSize: 13, color: "#9CA3AF", background: "#F9FAFB", borderBottom: "1px solid #F3F4F6", borderRight: "1px solid #E5E7EB", textAlign: "center", fontWeight: 600 },
  tdCell: { padding: 4, borderBottom: "1px solid #F3F4F6", borderRight: "1px solid #F3F4F6", textAlign: "center", verticalAlign: "top", minHeight: 34 },
  creneauDispo: { background: "#EFF6FF", border: "1px solid #BFDBFE", borderRadius: 6, padding: "6px 7px", fontSize: 13, color: "#1D4ED8", fontWeight: 600, marginBottom: 2, cursor: "pointer", textAlign: "left" },
  creneauSelectionne: { background: "#059669", border: "1px solid #059669", borderRadius: 6, padding: "6px 7px", fontSize: 13, color: "#fff", fontWeight: 700, marginBottom: 2, cursor: "pointer", textAlign: "left" },
  label: { fontSize: 16, fontWeight: 700, color: "#374151", display: "block", marginBottom: 8 },
  input: { width: "100%", padding: "12px 14px", borderRadius: 8, border: "1px solid #D1D5DB", fontSize: 16, fontFamily: "inherit", boxSizing: "border-box", marginBottom: 14 },
  select: { width: "100%", padding: "12px 14px", borderRadius: 8, border: "1px solid #D1D5DB", fontSize: 16, fontFamily: "inherit", boxSizing: "border-box", marginBottom: 14, background: "#fff" },
  dureeRow: { display: "flex", alignItems: "center", gap: 10, marginBottom: 14 },
  dureeBtn: { width: 38, height: 38, borderRadius: 8, border: "1px solid #D1D5DB", background: "#F3F4F6", fontSize: 20, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "inherit", color: "#374151" },
  dureeVal: { minWidth: 74, textAlign: "center", fontSize: 18, fontWeight: 800, color: "#111827" },
  heureFinBox: { padding: "12px 14px", borderRadius: 8, background: "#EFF6FF", color: "#2563EB", fontWeight: 800, textAlign: "center", marginBottom: 14, fontSize: 18 },
  btnPrimary: { background: "#059669", color: "#fff", border: "none", borderRadius: 10, padding: "13px 24px", fontSize: 16, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" },
  sessionCard: { background: "#F9FAFB", border: "1px solid #E5E7EB", borderRadius: 10, padding: 15, marginBottom: 10 },
  sessionTitle: { fontSize: 17, fontWeight: 700, color: "#111827", marginBottom: 5 },
  sessionMeta: { fontSize: 15, color: "#6B7280", lineHeight: 1.6 },
  g2: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 },
  pillPending: { fontSize: 12, fontWeight: 700, padding: "3px 9px", borderRadius: 12, background: "#FEF9C3", color: "#92400E", display: "inline-block" },
  pillAccepted: { fontSize: 12, fontWeight: 700, padding: "3px 9px", borderRadius: 12, background: "#ECFDF5", color: "#065F46", display: "inline-block" },
  pillRefused: { fontSize: 12, fontWeight: 700, padding: "3px 9px", borderRadius: 12, background: "#FEF2F2", color: "#991B1B", display: "inline-block" },
  pillReported: { fontSize: 12, fontWeight: 700, padding: "3px 9px", borderRadius: 12, background: "#EFF6FF", color: "#1D4ED8", display: "inline-block" },
};

const HEURES = Array.from({ length: 13 }, (_, i) => `${String(i + 8).padStart(2, "0")}:00`);
const JOURS_COURT = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
const JOURS_FR = ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"];

function getLundi(date) {
  const d = new Date(date);
  const j = d.getDay();
  d.setDate(d.getDate() + (j === 0 ? -6 : 1 - j));
  d.setHours(0, 0, 0, 0);
  return d;
}

function toISO(date) {
  return date.toISOString().slice(0, 10);
}

function formatJourCourt(date) {
  return `${String(date.getDate()).padStart(2, "0")}/${String(date.getMonth() + 1).padStart(2, "0")}`;
}

function getJoursSemaine(lundi) {
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(lundi);
    d.setDate(d.getDate() + i);
    return d;
  });
}

function calculerHeureFin(heureDebut, dureeMin) {
  if (!heureDebut) return "--:--";
  const [h, m] = heureDebut.split(":").map(Number);
  const total = h * 60 + m + Number(dureeMin);
  return `${String(Math.floor(total / 60)).padStart(2, "0")}:${String(total % 60).padStart(2, "0")}`;
}

function formatDuree(min) {
  const h = Math.floor(min / 60);
  const m = min % 60;
  return m === 0 ? `${h}h` : `${h}h${String(m).padStart(2, "0")}`;
}

function StudentPlanning() {
  const savedUser = localStorage.getItem("user");
  const user = savedUser ? JSON.parse(savedUser) : null;
  const token = localStorage.getItem("token");

  const params = new URLSearchParams(window.location.search);
  const teacherId = params.get("teacher_id") || "";
  const announcementId = params.get("announcement_id") || "";
  const teacherName = params.get("teacher_name") || "Professeur";
  const subject = params.get("subject") || "Matière";

  const today = useMemo(() => new Date(), []);
  const [lundiActuel, setLundiActuel] = useState(() => getLundi(new Date()));
  const [creneauxProf, setCreneauxProf] = useState([]);
  const [loadingAgenda, setLoadingAgenda] = useState(false);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [courseType, setCourseType] = useState("cours_essai");
  const [selectedDate, setSelectedDate] = useState(toISO(today));
  const [periodEnd, setPeriodEnd] = useState(toISO(new Date(today.getFullYear(), today.getMonth() + 1, today.getDate())));
  const [startHour, setStartHour] = useState("09:00");
  const [duration, setDuration] = useState(60);
  const [creneauChoisi, setCreneauChoisi] = useState(null);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const heureFin = calculerHeureFin(startHour, duration);
  const aujourdISO = toISO(today);
  const joursAffich = getJoursSemaine(lundiActuel);
  const dimanche = joursAffich[6];

  const chargerDemandes = useCallback(async () => {
    if (!user?.id) {
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/student-planning/${user.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setRequests(Array.isArray(data) ? data : []);
    } catch {
      setRequests([]);
    } finally {
      setLoading(false);
    }
  }, [user?.id, token]);

  useEffect(() => {
    chargerDemandes();
  }, [chargerDemandes]);

  const chargerPlanningProf = useCallback(async () => {
    if (!teacherId) {
      setCreneauxProf([]);
      return;
    }

    setLoadingAgenda(true);

    try {
      const debut = toISO(lundiActuel);
      const fin = toISO(joursAffich[6]);

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/teacher-planning/teacher/${teacherId}/semaine?debut=${debut}&fin=${fin}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (!res.ok) throw new Error();

      const data = await res.json();
      setCreneauxProf(Array.isArray(data) ? data : []);
    } catch {
      try {
        const res2 = await fetch(`${import.meta.env.VITE_API_URL}/api/teacher-planning/teacher/${teacherId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data2 = await res2.json();
        setCreneauxProf(Array.isArray(data2) ? data2 : []);
      } catch {
        setCreneauxProf([]);
      }
    } finally {
      setLoadingAgenda(false);
    }
  }, [teacherId, lundiActuel, token]);

  useEffect(() => {
    chargerPlanningProf();
  }, [chargerPlanningProf]);

  const semainePrecedente = () => {
    setLundiActuel((prev) => {
      const d = new Date(prev);
      d.setDate(d.getDate() - 7);
      return d;
    });
  };

  const semaineSuivante = () => {
    setLundiActuel((prev) => {
      const d = new Date(prev);
      d.setDate(d.getDate() + 7);
      return d;
    });
  };

  const getCreneauxCellule = (dateJour, heureDebut) => {
    const dateISO = toISO(dateJour);

    return creneauxProf.filter((c) => {
      const dateC = c.planning_date;

      if (!dateC) {
        const indexJour = JOURS_FR.indexOf(c.day_of_week);
        if (indexJour < 0) return false;

        const dateCalc = toISO(joursAffich[indexJour]);
        if (dateCalc !== dateISO) return false;
      } else {
        if (dateC.slice(0, 10) !== dateISO) return false;
      }

      const hC = c.start_time.slice(0, 5);
      return hC >= heureDebut && hC < calculerHeureFin(heureDebut, 60);
    });
  };

  const selectionnerCreneau = (c, dateJour) => {
    setCreneauChoisi(c);
    setSelectedDate(toISO(dateJour));
    setStartHour(c.start_time.slice(0, 5));
    setDuration(c.duration_minutes || 60);
  };

  const demandesEnAttente = useMemo(
    () => requests.filter((r) => r.status === "pending" || r.status === "reported"),
    [requests]
  );

  const demandesAcceptees = useMemo(
    () => requests.filter((r) => r.status === "accepted"),
    [requests]
  );

  const demandesRefusees = useMemo(
    () => requests.filter((r) => r.status === "refused"),
    [requests]
  );

  const handleEnvoyer = async () => {
    if (!user?.id) {
      setErrorMsg("Vous n'êtes pas connecté.");
      return;
    }

    if (!token) {
      setErrorMsg("Votre session a expiré. Veuillez vous reconnecter.");
      return;
    }

    if (!teacherId || !announcementId) {
      setErrorMsg("Professeur ou annonce introuvable. Veuillez revenir depuis la recherche.");
      return;
    }

    if (courseType === "cours_essai" && !creneauChoisi) {
      setErrorMsg("Choisissez un créneau disponible dans le planning du professeur.");
      return;
    }

    if (!selectedDate) {
      setErrorMsg("Choisissez une date.");
      return;
    }

    try {
      const res = await fetch("${import.meta.env.VITE_API_URL}/api/trial-requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          announcement_id: Number(announcementId),
          student_id: user.id,
          teacher_id: Number(teacherId),
          planning_id: creneauChoisi?.id || null,
          requested_date: selectedDate,
          requested_day: selectedDate,
          requested_start_time: `${startHour}:00`,
          requested_end_time: `${heureFin}:00`,
          duration_minutes: duration,
          course_type: courseType,
          period_end: courseType === "suivi_regulier" ? periodEnd : null,
          status: "pending",
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Erreur");
      }

      setSuccessMsg("Demande envoyée au professeur.");
      setTimeout(() => setSuccessMsg(""), 4000);
      setCreneauChoisi(null);
      setDuration(60);
      setStartHour("09:00");
      setSelectedDate(toISO(today));
      chargerDemandes();
    } catch (err) {
      setErrorMsg(err.message || "Erreur lors de l'envoi.");
      setTimeout(() => setErrorMsg(""), 5001);
    }
  };

  const pillStatut = (status) => {
    if (status === "accepted") return <span style={S.pillAccepted}>Acceptée</span>;
    if (status === "refused") return <span style={S.pillRefused}>Refusée</span>;
    if (status === "reported") return <span style={S.pillReported}>Reportée</span>;
    return <span style={S.pillPending}>En attente</span>;
  };

  const formatSlot = (item) => {
    const day = item.requested_date || item.requested_day || "—";
    const start = item.requested_start_time ? String(item.requested_start_time).slice(0, 5) : "--:--";
    const end = item.requested_end_time ? String(item.requested_end_time).slice(0, 5) : "--:--";
    return `${day} · ${start} → ${end}`;
  };

  return (
    <div style={S.wrap}>
      <div style={S.dash}>
        <aside style={S.sidebar}>
          <div style={S.sbBrand}>
            <div style={S.logo}>
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
            <a style={S.sbLink} href="/trial-request">
              📬 Demandes d'essai <span style={S.sbBadge}>{requests.length}</span>
            </a>
            <a style={S.sbLink} href="/student/courses">📚 Mes cours</a>
            <a style={S.sbLinkActive} href="/student/planning">📅 Mon calendrier</a>
            <a style={S.sbLink} href="/chat">💬 Messages</a>

            <span style={S.sbLabel}>Compte</span>
            <a style={S.sbLink} href="/payment">💳 Paiements</a>
            <a style={S.sbLink} href="/student/review">⭐ Donner un avis</a>
          </nav>

          <div style={S.sbUser}>
            <div style={S.av}>{user?.prenom?.[0]?.toUpperCase() || "É"}</div>
            <div>
              <div style={{ fontSize: 17, fontWeight: 600 }}>
                {user ? `${user.prenom} ${user.nom}` : "Élève"}
              </div>
              <div style={{ fontSize: 15, color: "#9CA3AF" }}>Élève</div>
            </div>
          </div>
        </aside>

        <main style={S.main}>
          <div style={S.pageTitle}>📅 Mon calendrier</div>
          <div style={S.pageSub}>
            Consultez les disponibilités du professeur sélectionné et envoyez votre demande de cours.
          </div>

          {successMsg && <div style={S.successMsg}>{successMsg}</div>}
          {errorMsg && <div style={S.errorMsg}>{errorMsg}</div>}

          <div style={S.stats}>
            <div style={S.statAccent}>
              <div style={S.statLabelW}>En attente</div>
              <div style={S.statValW}>{demandesEnAttente.length}</div>
            </div>
            <div style={S.stat}>
              <div style={S.statLabel}>Acceptées</div>
              <div style={S.statVal}>{demandesAcceptees.length}</div>
            </div>
            <div style={S.stat}>
              <div style={S.statLabel}>Refusées</div>
              <div style={S.statVal}>{demandesRefusees.length}</div>
            </div>
            <div style={S.stat}>
              <div style={S.statLabel}>Total</div>
              <div style={S.statVal}>{requests.length}</div>
            </div>
          </div>

          <div style={S.card}>
            <div style={S.cardTitle}>Professeur sélectionné</div>
            <div style={S.cardDesc}>
              Vous consultez les disponibilités de <strong>{teacherName}</strong> pour le cours de{" "}
              <strong>{subject}</strong>.
            </div>

            {!teacherId || !announcementId ? (
              <div style={S.errorMsg}>
                Aucun professeur n’a été sélectionné. Revenez dans “Trouver un prof”, choisissez une annonce, puis ouvrez le calendrier depuis cette annonce.
              </div>
            ) : null}
          </div>

          <div style={S.card}>
            <div style={S.cardTitle}>Préparer une demande de cours</div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 14, marginBottom: 4 }}>
              <div>
                <label style={S.label}>Type de cours</label>
                <select value={courseType} onChange={(e) => setCourseType(e.target.value)} style={S.select}>
                  <option value="cours_essai">Cours d'essai (un seul créneau)</option>
                  <option value="suivi_regulier">Suivi régulier</option>
                </select>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: courseType === "suivi_regulier" ? "1fr 1fr" : "1fr", gap: 14, marginBottom: 4 }}>
              <div>
                <label style={S.label}>{courseType === "cours_essai" ? "Date du cours" : "Date de début"}</label>
                <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} style={S.input} />
              </div>

              {courseType === "suivi_regulier" && (
                <div>
                  <label style={S.label}>Date de fin de période</label>
                  <input type="date" value={periodEnd} onChange={(e) => setPeriodEnd(e.target.value)} style={S.input} />
                </div>
              )}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 4 }}>
              <div>
                <label style={S.label}>Heure de début</label>
                <input type="time" value={startHour} onChange={(e) => setStartHour(e.target.value)} step="900" style={S.input} />
              </div>

              <div>
                <label style={S.label}>Durée</label>
                <div style={S.dureeRow}>
                  <button style={S.dureeBtn} onClick={() => setDuration((d) => Math.max(d - 15, 15))} disabled={duration <= 15} type="button">
                    −
                  </button>
                  <span style={S.dureeVal}>{formatDuree(duration)}</span>
                  <button style={S.dureeBtn} onClick={() => setDuration((d) => Math.min(d + 15, 240))} disabled={duration >= 240} type="button">
                    +
                  </button>
                  <span style={{ fontSize: 14, color: "#9CA3AF" }}>par 15 min</span>
                </div>
              </div>
            </div>

            <label style={S.label}>Heure de fin calculée automatiquement</label>
            <div style={S.heureFinBox}>{heureFin}</div>

            {creneauChoisi && (
              <div style={{ background: "#EFF6FF", border: "1px solid #BFDBFE", borderRadius: 8, padding: "12px 14px", marginBottom: 14, fontSize: 15, color: "#1D4ED8" }}>
                Créneau sélectionné : {selectedDate} · {startHour} → {heureFin} ({formatDuree(duration)})
              </div>
            )}

            <div style={{ background: "#F9FAFB", border: "1px solid #E5E7EB", borderRadius: 10, padding: 14, marginBottom: 14, fontSize: 15, color: "#374151", lineHeight: 1.6 }}>
              <strong>Récapitulatif :</strong> {courseType === "cours_essai" ? "Cours d'essai" : "Suivi régulier"} — {selectedDate} de {startHour} à {heureFin} ({formatDuree(duration)})
              {courseType === "suivi_regulier" && (
                <>
                  <br />
                  <span style={{ color: "#6B7280" }}>Période : du {selectedDate} au {periodEnd}</span>
                </>
              )}
            </div>

            <button style={S.btnPrimary} onClick={handleEnvoyer}>
              Envoyer la demande au professeur
            </button>
          </div>

          {teacherId && (
            <div style={S.card}>
              <div style={S.cardTitle}>
                📅 Planning de {teacherName}
                {courseType === "cours_essai" && (
                  <span style={{ fontSize: 14, fontWeight: 500, color: "#6B7280" }}>
                    Cliquez sur un créneau pour le sélectionner
                  </span>
                )}
              </div>

              <div style={S.navSemaine}>
                <button style={S.navBtn} onClick={semainePrecedente}>← Préc.</button>
                <span style={S.semaineTitre}>
                  Semaine du {formatJourCourt(lundiActuel)} au {formatJourCourt(dimanche)}
                </span>
                <button style={S.navBtn} onClick={semaineSuivante}>Suiv. →</button>
                <button style={{ ...S.navBtn, border: "1px solid #2563EB", color: "#2563EB" }} onClick={() => setLundiActuel(getLundi(new Date()))}>
                  Cette semaine
                </button>
              </div>

              <div style={S.agendaWrap}>
                {loadingAgenda ? (
                  <div style={S.empty}>Chargement du planning…</div>
                ) : creneauxProf.length === 0 ? (
                  <div style={S.empty}>
                    Aucun créneau disponible pour cette semaine.
                    <br />
                    Essayez une autre semaine ou revenez sur l’annonce du professeur.
                  </div>
                ) : (
                  <table style={S.agendaTable}>
                    <thead>
                      <tr>
                        <th style={S.thHeure}>Heure</th>
                        {joursAffich.map((jour, i) => {
                          const estAujd = toISO(jour) === aujourdISO;
                          return (
                            <th key={i} style={estAujd ? S.thJourAujourd : S.thJour}>
                              {JOURS_COURT[i]}
                              <br />
                              <span style={{ fontSize: 12, fontWeight: 500 }}>{formatJourCourt(jour)}</span>
                            </th>
                          );
                        })}
                      </tr>
                    </thead>

                    <tbody>
                      {HEURES.map((heure) => (
                        <tr key={heure}>
                          <td style={S.tdHeure}>{heure}</td>
                          {joursAffich.map((jour, i) => {
                            const cellCreneaux = getCreneauxCellule(jour, heure);

                            return (
                              <td key={i} style={S.tdCell}>
                                {cellCreneaux.map((c) => {
                                  const estSelectionne = creneauChoisi?.id === c.id;

                                  return (
                                    <div
                                      key={c.id}
                                      style={estSelectionne ? S.creneauSelectionne : S.creneauDispo}
                                      onClick={() => courseType === "cours_essai" && selectionnerCreneau(c, jour)}
                                      title={`${c.course_title || "Disponible"} — ${c.start_time.slice(0, 5)} → ${c.end_time.slice(0, 5)}`}
                                    >
                                      {c.start_time.slice(0, 5)} · {formatDuree(c.duration_minutes || 60)}
                                      {estSelectionne ? " ✓" : ""}
                                    </div>
                                  );
                                })}
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          )}

          <div style={S.g2}>
            <div style={S.card}>
              <div style={S.cardTitle}>
                En attente ou reportées
                <a href="/student/requests" style={{ fontSize: 15, fontWeight: 500, color: "#2563EB", textDecoration: "none" }}>Voir tout →</a>
              </div>

              {loading ? (
                <div style={S.empty}>Chargement…</div>
              ) : demandesEnAttente.length === 0 ? (
                <div style={S.empty}>Aucune demande en attente.</div>
              ) : (
                demandesEnAttente.map((r) => (
                  <div key={r.id} style={S.sessionCard}>
                    <div style={S.sessionTitle}>{r.teacher_name || `Prof #${r.teacher_id}`}</div>
                    <div style={S.sessionMeta}>
                      {formatSlot(r)}
                      <br />
                      {r.subject && <span style={{ color: "#374151" }}>{r.subject} · </span>}
                      {pillStatut(r.status)}
                    </div>
                  </div>
                ))
              )}
            </div>

            <div style={S.card}>
              <div style={S.cardTitle}>Séances acceptées</div>

              {loading ? (
                <div style={S.empty}>Chargement…</div>
              ) : demandesAcceptees.length === 0 ? (
                <div style={S.empty}>Aucune séance acceptée pour l’instant.</div>
              ) : (
                demandesAcceptees.map((r) => (
                  <div key={r.id} style={S.sessionCard}>
                    <div style={S.sessionTitle}>{r.teacher_name || `Prof #${r.teacher_id}`}</div>
                    <div style={S.sessionMeta}>
                      {formatSlot(r)}
                      <br />
                      {r.subject && <span>{r.subject} · </span>}
                      {pillStatut(r.status)}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div style={S.card}>
            <div style={S.cardTitle}>Demandes refusées</div>

            {loading ? (
              <div style={S.empty}>Chargement…</div>
            ) : demandesRefusees.length === 0 ? (
              <div style={S.empty}>Aucune demande refusée.</div>
            ) : (
              <div style={{ display: "grid", gap: 10 }}>
                {demandesRefusees.map((r) => (
                  <div key={r.id} style={S.sessionCard}>
                    <div style={S.sessionTitle}>{r.teacher_name || `Prof #${r.teacher_id}`}</div>
                    <div style={S.sessionMeta}>
                      {formatSlot(r)} · {pillStatut(r.status)}
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

export default StudentPlanning;