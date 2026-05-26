import React, { useEffect, useState } from "react";

const S = {
  wrap: { fontFamily: "'Segoe UI', sans-serif", minHeight: "100vh", background: "#F9FAFB" },
  dash: { display: "grid", gridTemplateColumns: "280px 1fr", minHeight: "100vh" },
  sidebar: { background: "#fff", borderRight: "1px solid #E5E7EB", display: "flex", flexDirection: "column", position: "sticky", top: 0, height: "100vh", overflowY: "auto" },
  sbBrand: { padding: "26px 22px", borderBottom: "1px solid #E5E7EB" },
  logo: { fontSize: 21, fontWeight: 800, letterSpacing: "-0.02em" },
  logoEm: { color: "#2563EB" },
  sbRole: { display: "inline-block", marginTop: 10, fontSize: 14, fontWeight: 700, textTransform: "uppercase", padding: "5px 12px", borderRadius: 20, background: "#EFF6FF", color: "#2563EB" },
  sbNav: { padding: 14, flex: 1 },
  sbLabel: { fontSize: 13, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "#9CA3AF", padding: "0 10px", margin: "18px 0 8px", display: "block" },
  sbLink: { display: "flex", alignItems: "center", gap: 12, padding: "14px 15px", borderRadius: 10, fontSize: 17, fontWeight: 500, color: "#4B5563", textDecoration: "none", marginBottom: 4 },
  sbLinkActive: { display: "flex", alignItems: "center", gap: 12, padding: "14px 15px", borderRadius: 10, fontSize: 17, fontWeight: 700, color: "#2563EB", background: "#EFF6FF", textDecoration: "none", marginBottom: 4 },
  sbUser: { padding: "18px 22px", borderTop: "1px solid #E5E7EB", display: "flex", alignItems: "center", gap: 12 },
  av: { width: 42, height: 42, borderRadius: "50%", background: "linear-gradient(135deg,#2563EB,#1D4ED8)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 17, flexShrink: 0 },
  main: { padding: "30px" },
  pageTitle: { fontSize: 28, fontWeight: 800, color: "#111827", marginBottom: 6 },
  pageSub: { fontSize: 16, color: "#6B7280", marginBottom: 24 },
  card: { background: "#fff", border: "1px solid #E5E7EB", borderRadius: 14, padding: "20px 22px", marginBottom: 18 },
  cardTitle: { fontSize: 17, fontWeight: 800, marginBottom: 14, color: "#111827" },
  successMsg: { background: "#ECFDF5", border: "1px solid #A7F3D0", color: "#059669", borderRadius: 10, padding: "12px 16px", fontSize: 14, marginBottom: 16 },
  errorMsg: { background: "#FEF2F2", border: "1px solid #FCA5A5", color: "#DC2626", borderRadius: 10, padding: "12px 16px", fontSize: 14, marginBottom: 16 },
  empty: { textAlign: "center", padding: "28px", color: "#9CA3AF", fontSize: 15 },
  navRow: { display: "flex", alignItems: "center", gap: 10, marginBottom: 18, flexWrap: "wrap" },
  navBtn: { background: "#fff", border: "1px solid #E5E7EB", borderRadius: 8, padding: "8px 16px", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", color: "#374151" },
  navTitre: { flex: 1, textAlign: "center", fontSize: 15, fontWeight: 700, color: "#111827" },
  agendaWrap: { background: "#fff", border: "1px solid #E5E7EB", borderRadius: 16, overflow: "auto", marginBottom: 20 },
  agendaTable: { width: "100%", borderCollapse: "collapse", minWidth: 600 },
  thHeure: { padding: "12px 8px", fontSize: 12, fontWeight: 700, color: "#9CA3AF", background: "#F9FAFB", borderBottom: "1px solid #E5E7EB", borderRight: "1px solid #E5E7EB", width: 90, textAlign: "center" },
  thJour: { padding: "12px 8px", fontSize: 13, fontWeight: 700, color: "#374151", background: "#F9FAFB", borderBottom: "1px solid #E5E7EB", borderRight: "1px solid #F3F4F6", textAlign: "center" },
  thJourAujourd: { padding: "12px 8px", fontSize: 13, fontWeight: 700, color: "#2563EB", background: "#EFF6FF", borderBottom: "2px solid #2563EB", borderRight: "1px solid #F3F4F6", textAlign: "center" },
  tdHeure: { padding: "10px 8px", fontSize: 12, color: "#9CA3AF", background: "#F9FAFB", borderBottom: "1px solid #F3F4F6", borderRight: "1px solid #E5E7EB", textAlign: "center", fontWeight: 600 },
  tdCell: { padding: 6, borderBottom: "1px solid #F3F4F6", borderRight: "1px solid #F3F4F6", textAlign: "center", cursor: "pointer" },
  tdCellSelected: { padding: 6, borderBottom: "1px solid #F3F4F6", borderRight: "1px solid #F3F4F6", textAlign: "center", cursor: "pointer", background: "#EFF6FF" },
  checkbox: { width: 22, height: 22, borderRadius: 6, border: "2px solid #D1D5DB", background: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", cursor: "pointer" },
  checkboxSelected: { width: 22, height: 22, borderRadius: 6, border: "2px solid #2563EB", background: "#2563EB", display: "inline-flex", alignItems: "center", justifyContent: "center", cursor: "pointer" },
  daysRow: { display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" },
  dayChip: { padding: "8px 14px", borderRadius: 20, border: "1.5px solid #E5E7EB", background: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer", color: "#374151", fontFamily: "inherit" },
  dayChipActive: { padding: "8px 14px", borderRadius: 20, border: "1.5px solid #2563EB", background: "#EFF6FF", fontSize: 13, fontWeight: 700, cursor: "pointer", color: "#2563EB", fontFamily: "inherit" },
  actionsRow: { display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap" },
  btnPrimary: { background: "#2563EB", color: "#fff", border: "none", borderRadius: 10, padding: "12px 22px", fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" },
  btnGhost: { background: "#F3F4F6", color: "#4B5563", border: "none", borderRadius: 10, padding: "12px 22px", fontSize: 15, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" },
  btnDanger: { background: "#FEF2F2", color: "#DC2626", border: "1px solid #FCA5A5", borderRadius: 10, padding: "10px 20px", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" },
  pill: { fontSize: 12, fontWeight: 700, padding: "3px 9px", borderRadius: 20, background: "#EFF6FF", color: "#2563EB", display: "inline-block", margin: "2px 3px" },
  overlay: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: 20 },
  modal: { background: "#fff", borderRadius: 16, padding: "28px 26px", width: "100%", maxWidth: 460, boxShadow: "0 20px 60px rgba(0,0,0,.15)" },
  modalTitle: { fontSize: 18, fontWeight: 800, color: "#111827", marginBottom: 20 },
  label: { fontSize: 13, fontWeight: 700, color: "#374151", display: "block", marginBottom: 6 },
  input: { width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid #D1D5DB", fontSize: 14, fontFamily: "inherit", boxSizing: "border-box", marginBottom: 14 },
  dureeRow: { display: "flex", alignItems: "center", gap: 10, marginBottom: 14 },
  dureeBtn: { width: 36, height: 36, borderRadius: 8, border: "1px solid #D1D5DB", background: "#F3F4F6", fontSize: 20, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "inherit", color: "#374151" },
  dureeVal: { minWidth: 80, textAlign: "center", fontSize: 15, fontWeight: 800, color: "#111827" },
  heureFinBox: { padding: "10px 12px", borderRadius: 8, background: "#EFF6FF", color: "#2563EB", fontWeight: 800, textAlign: "center", marginBottom: 14 },
  modalActions: { display: "flex", gap: 10, marginTop: 6, flexWrap: "wrap" },
};

const JOURS = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];
const CRENEAUX = [
  "08:00-09:00", "09:00-10:00", "10:00-11:00", "11:00-12:00",
  "12:00-13:00", "13:00-14:00", "14:00-15:00", "15:00-16:00",
  "16:00-17:00", "17:00-18:00", "18:00-19:00", "19:00-20:00"
];

function getLundi(date) {
  const d = new Date(date);
  const j = d.getDay();
  d.setDate(d.getDate() + (j === 0 ? -6 : 1 - j));
  d.setHours(0, 0, 0, 0);
  return d;
}

function fmt(date) {
  return `${String(date.getDate()).padStart(2, "0")}/${String(date.getMonth() + 1).padStart(2, "0")}`;
}

function calcFin(debut, dureeMin) {
  if (!debut) return "--:--";
  const [h, m] = debut.split(":").map(Number);
  const tot = h * 60 + m + dureeMin;
  return `${String(Math.floor(tot / 60)).padStart(2, "0")}:${String(tot % 60).padStart(2, "0")}`;
}

function formatDuree(min) {
  const h = Math.floor(min / 60);
  const m = min % 60;
  return m === 0 ? `${h}h` : `${h}h${String(m).padStart(2, "0")}`;
}

function TeacherPlanning() {
  const savedUser = localStorage.getItem("user");
  const user = savedUser ? JSON.parse(savedUser) : null;
  const token = localStorage.getItem("token");

  const [lundi, setLundi] = useState(() => getLundi(new Date()));
  const [selected, setSelected] = useState(new Set());
  const [creneauxDB, setCreneauxDB] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // modal
  const [modalOuvert, setModalOuvert] = useState(false);
  const [modeModal, setModeModal] = useState("modif");
  const [creneauEdite, setCreneauEdite] = useState(null);
  const [formDate, setFormDate] = useState("");
  const [formHeure, setFormHeure] = useState("09:00");
  const [formDuree, setFormDuree] = useState(60);
  const [formTitre, setFormTitre] = useState("");
  const fin = calcFin(formHeure, formDuree);

  const joursSemaine = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(lundi);
    d.setDate(d.getDate() + i);
    return d;
  });
  const dimanche = joursSemaine[6];
  const aujourdStr = new Date().toDateString();

  const chargerCreneaux = async () => {
    if (!user?.id) { setLoading(false); return; }
    setLoading(true);
    try {
      const res = await fetch(
        `http://localhost:5001/api/teacher-planning/teacher/${user.id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (!res.ok) throw new Error();
      const data = await res.json();
      setCreneauxDB(data);

      // reconstitue les cases cochées depuis la base
      const sel = new Set();
      data.forEach(item => {
        const jourLabel = item.day_of_week.charAt(0).toUpperCase() + item.day_of_week.slice(1);
        const start = item.start_time.slice(0, 5);
        const end = item.end_time.slice(0, 5);
        sel.add(`${jourLabel}|${start}-${end}`);
      });
      setSelected(sel);
    } catch {
      setErrorMsg("Impossible de charger le planning.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { chargerCreneaux(); }, []);

  const toggle = (jour, creneau) => {
    const key = `${jour}|${creneau}`;
    setSelected(prev => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  };

  const toggleJournee = (jour) => {
    const keys = CRENEAUX.map(c => `${jour}|${c}`);
    const tousCoches = keys.every(k => selected.has(k));
    setSelected(prev => {
      const next = new Set(prev);
      tousCoches ? keys.forEach(k => next.delete(k)) : keys.forEach(k => next.add(k));
      return next;
    });
  };

  const isJourneeComplete = (jour) => CRENEAUX.every(c => selected.has(`${jour}|${c}`));

  const handleSave = async () => {
    if (selected.size === 0) { alert("Sélectionnez au moins un créneau."); return; }
    setSaving(true);
    try {
      for (const item of creneauxDB) {
        await fetch(`http://localhost:5001/api/teacher-planning/${item.id}/deactivate`, {
          method: "PUT",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify({ teacher_id: user.id }),
        });
      }
      for (const key of selected) {
        const [jour, creneau] = key.split("|");
        const [start, end] = creneau.split("-");
        const [hs, ms] = start.split(":").map(Number);
        const [he, me] = end.split(":").map(Number);
        const dureeMin = (he * 60 + me) - (hs * 60 + ms);
        await fetch("http://localhost:5001/api/teacher-planning", {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify({
            teacher_id: user.id,
            day_of_week: jour.toLowerCase(),
            start_time: `${start}:00`,
            end_time: `${end}:00`,
            duration_minutes: dureeMin,
            week_label: "semaine",
            course_title: "Disponible",
            course_type: "cours_essai",
          }),
        });
      }
      setSuccessMsg(`✓ ${selected.size} créneau(x) enregistré(s) !`);
      setTimeout(() => setSuccessMsg(""), 4000);
      chargerCreneaux();
    } catch {
      setErrorMsg("Erreur lors de la sauvegarde.");
    } finally {
      setSaving(false);
    }
  };

  const ouvrirModif = (jour, creneau, mode = "modif") => {
    const [start] = creneau.split("-");
    const item = creneauxDB.find(c =>
      c.day_of_week === jour.toLowerCase() && c.start_time.slice(0, 5) === start
    );
    if (!item) return;
    setCreneauEdite(item);
    setModeModal(mode);
    setFormDate(item.planning_date ? item.planning_date.slice(0, 10) : "");
    setFormHeure(item.start_time.slice(0, 5));
    setFormDuree(item.duration_minutes || 60);
    setFormTitre(item.course_title || "");
    setModalOuvert(true);
  };

  const fermerModal = () => { setModalOuvert(false); setCreneauEdite(null); };

  const handleModifier = async () => {
    if (!creneauEdite) return;
    try {
      const res = await fetch(`http://localhost:5001/api/teacher-planning/${creneauEdite.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          teacher_id: user.id,
          planning_date: formDate || null,
          day_of_week: creneauEdite.day_of_week,
          start_time: formHeure,
          end_time: fin,
          duration_minutes: formDuree,
          course_title: formTitre || "Disponible",
          course_type: creneauEdite.course_type || "cours_essai",
          is_reported: modeModal === "report" ? 1 : 0,
          status: "available",
        }),
      });
      if (!res.ok) throw new Error();
      setSuccessMsg(modeModal === "report" ? "Créneau reporté !" : "Créneau modifié !");
      setTimeout(() => setSuccessMsg(""), 3000);
      fermerModal();
      chargerCreneaux();
    } catch {
      setErrorMsg("Erreur lors de la modification.");
    }
  };

  const handleSupprimer = async () => {
    if (!creneauEdite) return;
    if (!window.confirm("Supprimer ce créneau ?")) return;
    try {
      await fetch(`http://localhost:5001/api/teacher-planning/${creneauEdite.id}/deactivate`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ teacher_id: user.id }),
      });
      setSuccessMsg("Créneau supprimé.");
      setTimeout(() => setSuccessMsg(""), 3000);
      fermerModal();
      chargerCreneaux();
    } catch {
      setErrorMsg("Impossible de supprimer ce créneau.");
    }
  };

  return (
    <div style={S.wrap}>
      <div style={S.dash}>
        <aside style={S.sidebar}>
          <div style={S.sbBrand}>
            <div style={S.logo}>NOVA<span style={S.logoEm}>DEMY</span></div>
            <span style={S.sbRole}>Professeur</span>
          </div>
          <nav style={S.sbNav}>
            <span style={S.sbLabel}>Principal</span>
            <a style={S.sbLink} href="/teacher/dashboard">🏠 Tableau de bord</a>
            <a style={S.sbLink} href="/teacher/profile">👤 Mon profil</a>
            <a style={S.sbLink} href="/teacher/announcements">📢 Mes annonces</a>
            <span style={S.sbLabel}>Organisation</span>
            <a style={S.sbLinkActive} href="/teacher/planning">📅 Planning</a>
            <a style={S.sbLink} href="/teacher/requests">📋 Demandes</a>
            <a style={S.sbLink} href="/teacher/students">👩‍🎓 Mes élèves</a>
            <a style={S.sbLink} href="/student/chat">💬 Messages</a>
            <span style={S.sbLabel}>Compte</span>
            <a style={S.sbLink} href="/teacher/revenue">💰 Revenus</a>
            <a style={S.sbLink} href="/teacher/collective/classes">👥 Classes collectives</a>
          </nav>
          <div style={S.sbUser}>
            <div style={S.av}>{user?.prenom?.[0]?.toUpperCase() || "P"}</div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700 }}>{user ? `${user.prenom} ${user.nom}` : "Prof"}</div>
              <div style={{ fontSize: 13, color: "#9CA3AF" }}>Professeur</div>
            </div>
          </div>
        </aside>

        <main style={S.main}>
          <div style={S.pageTitle}>📅 Mon planning</div>
          <div style={S.pageSub}>Cochez vos créneaux disponibles. Les élèves verront exactement cette grille pour choisir leur cours.</div>

          {successMsg && <div style={S.successMsg}>{successMsg}</div>}
          {errorMsg && <div style={S.errorMsg}>{errorMsg}</div>}

          {/* navigation semaine */}
          <div style={S.navRow}>
            <button style={S.navBtn} onClick={() => {
              const d = new Date(lundi); d.setDate(d.getDate() - 7); setLundi(new Date(d));
            }}>← Semaine préc.</button>
            <span style={S.navTitre}>Semaine du {fmt(lundi)} au {fmt(dimanche)}</span>
            <button style={S.navBtn} onClick={() => {
              const d = new Date(lundi); d.setDate(d.getDate() + 7); setLundi(new Date(d));
            }}>Semaine suiv. →</button>
            <button style={{ ...S.btnPrimary, fontSize: 14, padding: "8px 16px" }}
              onClick={() => setLundi(getLundi(new Date()))}>
              Aujourd'hui
            </button>
          </div>

          {/* chips sélection rapide journée */}
          <div style={S.card}>
            <div style={S.cardTitle}>Sélectionner une journée entière</div>
            <div style={S.daysRow}>
              {JOURS.map(jour => (
                <button key={jour}
                  style={isJourneeComplete(jour) ? S.dayChipActive : S.dayChip}
                  onClick={() => toggleJournee(jour)}>
                  {isJourneeComplete(jour) ? "✓ " : ""}{jour}
                </button>
              ))}
            </div>
          </div>

          {/* grille agenda */}
          <div style={S.agendaWrap}>
            {loading ? <div style={S.empty}>Chargement…</div> : (
              <table style={S.agendaTable}>
                <thead>
                  <tr>
                    <th style={S.thHeure}>Heure</th>
                    {joursSemaine.map((jour, i) => {
                      const estAuj = jour.toDateString() === aujourdStr;
                      return (
                        <th key={i} style={estAuj ? S.thJourAujourd : S.thJour}>
                          {JOURS[i]}
                          <br />
                          <span style={{ fontSize: 11, fontWeight: 500 }}>{fmt(jour)}</span>
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody>
                  {CRENEAUX.map(creneau => (
                    <tr key={creneau}>
                      <td style={S.tdHeure}>{creneau}</td>
                      {JOURS.map(jour => {
                        const key = `${jour}|${creneau}`;
                        const sel = selected.has(key);
                        const [start] = creneau.split("-");
                        const existeEnBase = creneauxDB.some(
                          c => c.day_of_week === jour.toLowerCase() && c.start_time.slice(0, 5) === start
                        );
                        return (
                          <td key={jour}
                            style={sel ? S.tdCellSelected : S.tdCell}
                            onClick={() => toggle(jour, creneau)}>
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 5 }}>
                              <div style={sel ? S.checkboxSelected : S.checkbox}>
                                {sel && <span style={{ color: "#fff", fontSize: 13, fontWeight: 800 }}>✓</span>}
                              </div>
                              {existeEnBase && (
                                <span
                                  title="Modifier"
                                  style={{ fontSize: 12, cursor: "pointer", opacity: 0.55, lineHeight: 1 }}
                                  onClick={e => { e.stopPropagation(); ouvrirModif(jour, creneau); }}>
                                  ✏️
                                </span>
                              )}
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* boutons action */}
          <div style={S.actionsRow}>
            <button style={S.btnPrimary} onClick={handleSave} disabled={saving}>
              {saving ? "Enregistrement…" : `✅ Valider mes disponibilités (${selected.size})`}
            </button>
            <button style={S.btnGhost} onClick={() => setSelected(new Set())}>Tout effacer</button>
          </div>

          {/* récapitulatif */}
          {selected.size > 0 && (
            <div style={S.card}>
              <div style={S.cardTitle}>Récapitulatif — {selected.size} créneau(x) sélectionné(s)</div>
              {JOURS.map(jour => {
                const cs = CRENEAUX.filter(c => selected.has(`${jour}|${c}`));
                if (!cs.length) return null;
                return (
                  <div key={jour} style={{ marginBottom: 10 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: "#374151", marginBottom: 4 }}>{jour}</div>
                    <div>{cs.map(c => <span key={c} style={S.pill}>{c}</span>)}</div>
                  </div>
                );
              })}
            </div>
          )}
        </main>
      </div>

      {/* Modal modifier / reporter */}
      {modalOuvert && (
        <div style={S.overlay} onClick={fermerModal}>
          <div style={S.modal} onClick={e => e.stopPropagation()}>
            <div style={S.modalTitle}>
              {modeModal === "report" ? "🔄 Reporter le créneau" : "✏️ Modifier le créneau"}
            </div>

            <label style={S.label}>Date (optionnel)</label>
            <input type="date" value={formDate}
              onChange={e => setFormDate(e.target.value)} style={S.input} />

            <label style={S.label}>Heure de début</label>
            <input type="time" value={formHeure} step="900"
              onChange={e => setFormHeure(e.target.value)} style={S.input} />

            <label style={S.label}>Durée (1h min — 4h max)</label>
            <div style={S.dureeRow}>
              <button style={S.dureeBtn} type="button"
                onClick={() => setFormDuree(d => Math.max(d - 15, 60))}
                disabled={formDuree <= 60}>−</button>
              <span style={S.dureeVal}>{formatDuree(formDuree)}</span>
              <button style={S.dureeBtn} type="button"
                onClick={() => setFormDuree(d => Math.min(d + 15, 240))}
                disabled={formDuree >= 240}>+</button>
              <span style={{ fontSize: 12, color: "#9CA3AF" }}>+15 min par clic</span>
            </div>

            <label style={S.label}>Heure de fin (calculée automatiquement)</label>
            <div style={S.heureFinBox}>{fin}</div>

            <label style={S.label}>Titre (optionnel)</label>
            <input type="text" value={formTitre}
              onChange={e => setFormTitre(e.target.value)}
              placeholder="Ex : Maths niveau lycée" style={S.input} />

            <div style={S.modalActions}>
              <button style={S.btnPrimary} onClick={handleModifier}>
                {modeModal === "report" ? "Confirmer le report" : "Enregistrer"}
              </button>
              {modeModal === "modif" && (
                <button style={S.btnGhost} onClick={() => setModeModal("report")}>
                  🔄 Reporter
                </button>
              )}
              <button style={S.btnDanger} onClick={handleSupprimer}>Supprimer</button>
              <button style={S.btnGhost} onClick={fermerModal}>Annuler</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TeacherPlanning;