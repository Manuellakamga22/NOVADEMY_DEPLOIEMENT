import React, { useEffect, useState, useMemo, useCallback } from "react";

import S from "../styles/pages/StudentPlanning.styles.js";
import { apiFetch } from "../config/api.js";
import Sidebar from "../components/layout/Sidebar.jsx";

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
      const res = await apiFetch(`/api/student-planning/${user.id}`, {
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
      // endpoint avec statut de réservation — créneaux grisés si déjà acceptés
      const res = await apiFetch(`/api/teacher-planning/teacher/${teacherId}/disponibilites`);
      if (!res.ok) throw new Error();
      const data = await res.json();
      setCreneauxProf(Array.isArray(data) ? data : []);
    } catch {
      setCreneauxProf([]);
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
    if (c.is_reserved) return; // créneau déjà accepté — non sélectionnable
    setCreneauChoisi(c);
    setSelectedDate(toISO(dateJour));
    setStartHour(c.start_time.slice(0, 5));
    // ne touche pas à la durée — c'est l'élève qui choisit
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
      const res = await apiFetch("/api/trials", {
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
        
        <Sidebar role={"eleve"} user={user} active={"/student/planning"} />

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

          {/* ── INFO PROF ── */}
          <div style={S.card}>
            <div style={S.cardTitle}>📅 Disponibilités de {teacherName} — {subject}</div>

            {!teacherId || !announcementId ? (
              <div style={S.errorMsg}>
                Aucun professeur sélectionné. Revenez dans "Trouver un prof" et choisissez une annonce.
              </div>
            ) : (
              <>
                <div style={{ fontSize: 15, color: "#6B7280", marginBottom: 14 }}>
                  Cliquez sur un créneau <span style={{ color: "#2563EB", fontWeight: 600 }}>disponible</span> pour le réserver.
                  Les créneaux <span style={{ color: "#9CA3AF" }}>grisés</span> sont déjà pris.
                </div>

                <div style={S.navSemaine}>
                  <button style={S.navBtn} onClick={semainePrecedente}>← Préc.</button>
                  <span style={S.semaineTitre}>
                    Semaine du {formatJourCourt(lundiActuel)} au {formatJourCourt(dimanche)}
                  </span>
                  <button style={S.navBtn} onClick={semaineSuivante}>Suiv. →</button>
                  <button style={{ ...S.navBtn, border: "1px solid #2563EB", color: "#2563EB" }} onClick={() => setLundiActuel(getLundi(new Date()))}>
                    Aujourd'hui
                  </button>
                </div>

                <div style={S.agendaWrap}>
                  {loadingAgenda ? (
                    <div style={S.empty}>Chargement du planning…</div>
                  ) : creneauxProf.length === 0 ? (
                    <div style={S.empty}>
                      Aucun créneau cette semaine. Essayez une autre semaine.
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
                                    const estReserve = !!c.is_reserved;
                                    return (
                                      <div
                                        key={c.id}
                                        onClick={() => !estReserve && selectionnerCreneau(c, jour)}
                                        title={estReserve ? "Déjà réservé" : `Disponible — ${c.start_time.slice(0, 5)}`}
                                        style={{
                                          ...(estSelectionne ? S.creneauSelectionne : S.creneauDispo),
                                          ...(estReserve ? {
                                            opacity: 0.35,
                                            cursor: "not-allowed",
                                            background: "#F3F4F6",
                                            color: "#9CA3AF",
                                          } : {}),
                                        }}
                                      >
                                        {c.start_time.slice(0, 5)}
                                        {estReserve ? " · 🔒" : estSelectionne ? " ✓" : ""}
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
              </>
            )}
          </div>

          {/* ── FORMULAIRE — s'affiche uniquement après sélection d'un créneau ── */}
          {creneauChoisi && (
            <div style={{ ...S.card, border: "2px solid #2563EB" }}>
              <div style={S.cardTitle}>Configurer votre demande</div>

              <div style={{ background: "#EFF6FF", border: "1px solid #BFDBFE", borderRadius: 8, padding: "12px 16px", marginBottom: 18, fontSize: 15, color: "#1D4ED8" }}>
                Créneau choisi : <strong>{selectedDate}</strong> à <strong>{startHour}</strong>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                <div>
                  <label style={S.label}>Type de cours</label>
                  <select value={courseType} onChange={(e) => setCourseType(e.target.value)} style={S.select}>
                    <option value="cours_essai">Cours d'essai</option>
                    <option value="suivi_regulier">Suivi régulier</option>
                  </select>
                </div>

                {courseType === "suivi_regulier" && (
                  <div>
                    <label style={S.label}>Date de fin de période</label>
                    <input type="date" value={periodEnd} onChange={(e) => setPeriodEnd(e.target.value)} style={S.input} />
                  </div>
                )}
              </div>

              <div style={{ marginBottom: 16 }}>
                <label style={S.label}>Durée du cours</label>
                <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 6 }}>
                  <button style={S.dureeBtn} onClick={() => setDuration(d => Math.max(d - 15, 15))} disabled={duration <= 15} type="button">−</button>
                  <span style={{ ...S.dureeVal, minWidth: 70, textAlign: "center" }}>{formatDuree(duration)}</span>
                  <button style={S.dureeBtn} onClick={() => setDuration(d => Math.min(d + 15, 180))} disabled={duration >= 180} type="button">+</button>
                  <span style={{ fontSize: 14, color: "#9CA3AF" }}>par 15 min</span>
                </div>
              </div>

              <div style={{ background: "#F0FDF4", border: "1px solid #BBF7D0", borderRadius: 8, padding: "12px 16px", marginBottom: 18, fontSize: 15 }}>
                <strong>{selectedDate}</strong> · {startHour} → <strong>{heureFin}</strong>
                <span style={{ color: "#059669", marginLeft: 8 }}>({formatDuree(duration)})</span>
              </div>

              <button style={S.btnPrimary} onClick={handleEnvoyer}>
                Envoyer la demande à {teacherName}
              </button>
              <button
                style={{ ...S.navBtn, marginLeft: 10 }}
                onClick={() => setCreneauChoisi(null)}
                type="button"
              >
                Changer de créneau
              </button>
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
                <div style={S.empty}>Aucune séance acceptée pour l'instant.</div>
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