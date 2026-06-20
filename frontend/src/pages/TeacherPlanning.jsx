import React, { useEffect, useState } from "react";

import S from "../styles/pages/TeacherPlanning.styles.js";
import { apiFetch } from "../config/api.js";
import Sidebar from "../components/layout/Sidebar.jsx";

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
  const [formTitre, setFormTitre] = useState("");
  // la durée est toujours 60 min (blocs fixes d'1h) — le prof ne choisit pas la durée
  const fin = calcFin(formHeure, 60);

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
        `${import.meta.env.VITE_API_URL}/api/teacher-planning/teacher/${user.id}`,
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
        await apiFetch(`/api/teacher-planning/${item.id}/deactivate`, {
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
        await apiFetch("/api/teacher-planning", {
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
    setFormTitre(item.course_title || "");
    setModalOuvert(true);
  };

  const fermerModal = () => { setModalOuvert(false); setCreneauEdite(null); };

  const handleModifier = async () => {
    if (!creneauEdite) return;
    try {
      const res = await apiFetch(`/api/teacher-planning/${creneauEdite.id}`, {
        method: "PUT",
        body: JSON.stringify({
          teacher_id: user.id,
          planning_date: formDate || null,
          day_of_week: creneauEdite.day_of_week,
          start_time: formHeure,
          end_time: fin,
          duration_minutes: 60,
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
      await apiFetch(`/api/teacher-planning/${creneauEdite.id}/deactivate`, {
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
        
        <Sidebar role={"professeur"} user={user} active={"/teacher/planning"} />

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

            <label style={S.label}>Heure de fin</label>
            <div style={S.heureFinBox}>{fin} <span style={{ fontSize: 12, color: "#9CA3AF" }}>(1h — fixé par le créneau)</span></div>

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