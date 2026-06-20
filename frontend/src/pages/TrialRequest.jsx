import React, { useEffect, useMemo, useState } from "react";

import S from "../styles/pages/TrialRequest.styles.js";
import { apiFetch } from "../config/api.js";
import Sidebar from "../components/layout/Sidebar.jsx";

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
  const [dureeMinutes,   setDureeMinutes]    = useState(60);
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
        const res = await apiFetch(
          `/api/teacher-planning/teacher/${teacherId}/disponibilites`
        );
        const data = await res.json();

        if (!res.ok) {
          alert(data.message || "Erreur chargement créneaux");
          return;
        }

        // format affichage
        const formatted = Array.isArray(data)
          ? data.map((item) => ({
              id:          item.id,
              day:         item.day_of_week,
              start_time:  String(item.start_time).slice(0, 5),
              end_time:    String(item.end_time).slice(0, 5),
              hour:        `${String(item.start_time).slice(0, 5)} - ${String(item.end_time).slice(0, 5)}`,
              type:        item.course_type || "cours_essai",
              is_reserved: !!item.is_reserved,
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

  // calcule l'heure de fin à partir de l'heure de début + durée en minutes
  const calculerHeureFin = (heureDebut, duree) => {
    if (!heureDebut) return "";
    const [h, m] = heureDebut.split(":").map(Number);
    const total = h * 60 + m + duree;
    const hf = Math.floor(total / 60);
    const mf = total % 60;
    return `${String(hf).padStart(2, "0")}:${String(mf).padStart(2, "0")}`;
  };

  const heureFin = selectedSlot
    ? calculerHeureFin(selectedSlot.start_time, dureeMinutes)
    : null;

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

    // max 3 demandes
    if (activeTrialsCount >= 3) {
      alert(
        "Vous avez déjà 3 demandes de cours d'essai actives. Attendez une réponse avant d'en créer une nouvelle."
      );
      return;
    }

    setSubmitting(true);

    try {
      const token = localStorage.getItem("token");

      const heureFinCalculee = calculerHeureFin(selectedSlot.start_time, dureeMinutes);

      const res = await apiFetch("/api/trials", {
        method: "POST",
        body: JSON.stringify({
          announcement_id:       Number(announcementId),
          student_id:            user.id,
          teacher_id:            Number(teacherId),
          planning_id:           selectedSlot.id,
          requested_start_time:  selectedSlot.start_time,
          requested_end_time:    heureFinCalculee,
          duration_minutes:      dureeMinutes,
          message:               message.trim() || null,
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

        
        
        <Sidebar role={"eleve"} user={user} active={"/trial-request"} />

        
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
                  const isActive   = selectedSlot?.id === slot.id;
                  const isReserved = slot.is_reserved;
                  return (
                    <button
                      key={slot.id}
                      type="button"
                      onClick={() => !isReserved && setSelectedSlot(slot)}
                      disabled={isReserved}
                      style={{
                        ...(isActive ? S.slotBtnActive : S.slotBtn),
                        ...(isReserved ? {
                          opacity: 0.45,
                          cursor: "not-allowed",
                          background: "#F3F4F6",
                          borderColor: "#D1D5DB",
                          color: "#9CA3AF",
                        } : {}),
                      }}
                    >
                      <span style={S.slotDay}>{slot.day}</span>
                      <span style={S.slotHour}>{slot.hour}</span>
                      <span style={S.slotType}>
                        {isReserved
                          ? "Réservé"
                          : slot.type === "cours_essai" ? "Cours d'essai" : "Cours"}
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

              {/* Sélecteur de durée — tranches de 15 minutes */}
              <div style={S.field}>
                <label style={S.label}>Durée du cours</label>
                <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 6 }}>
                  <button
                    type="button"
                    onClick={() => setDureeMinutes(d => Math.max(30, d - 15))}
                    style={S.navBtn}
                  >
                    −
                  </button>
                  <span style={{ fontSize: 18, fontWeight: 700, minWidth: 80, textAlign: "center" }}>
                    {Math.floor(dureeMinutes / 60) > 0 && `${Math.floor(dureeMinutes / 60)}h`}
                    {dureeMinutes % 60 > 0 && `${dureeMinutes % 60}min`}
                  </span>
                  <button
                    type="button"
                    onClick={() => setDureeMinutes(d => Math.min(180, d + 15))}
                    style={S.navBtn}
                  >
                    +
                  </button>
                </div>
                {selectedSlot && heureFin && (
                  <div style={{ marginTop: 8, fontSize: 15, color: "#2563EB", fontWeight: 600 }}>
                    Début : {selectedSlot.start_time} → Fin : {heureFin}
                  </div>
                )}
              </div>

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