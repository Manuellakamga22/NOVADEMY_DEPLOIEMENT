import React, { useEffect, useState } from "react";

import S from "../styles/pages/StudentReview.styles.js";
import { apiFetch } from "../config/api.js";
import Sidebar from "../components/layout/Sidebar.jsx";

function StudentReview() {
  const savedUser = localStorage.getItem("user");
  const user  = savedUser ? JSON.parse(savedUser) : null;
  const token = localStorage.getItem("token");

  const [teachers,          setTeachers]          = useState([]);
  const [selectedTeacherId, setSelectedTeacherId] = useState("");
  const [rating,            setRating]            = useState(0);
  const [comment,           setComment]           = useState("");
  const [submitting,        setSubmitting]         = useState(false);
  const [loading,           setLoading]           = useState(true);
  const [successMsg,        setSuccessMsg]        = useState("");

  // je charge les profs avec essai accepté
  useEffect(() => {
    if (!user?.id) { setLoading(false); return; }

    const fetchTeachers = async () => {
      try {
        const res  = await fetch(
          `${import.meta.env.VITE_API_URL}/api/trials/student/${user.id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (!res.ok) return;
        const data = await res.json();

        const accepted = Array.isArray(data) ? data.filter(t => t.status === "accepted") : [];

        const seen = new Set();
        const list = [];
        for (const t of accepted) {
          if (!seen.has(t.teacher_id)) {
            seen.add(t.teacher_id);
            list.push({
              id:      t.teacher_id,
              name:    `${t.teacher_prenom || ""} ${t.teacher_nom || ""}`.trim() || `Prof #${t.teacher_id}`,
              subject: t.subject || "—",
            });
          }
        }

        setTeachers(list);
        if (list.length > 0) setSelectedTeacherId(String(list[0].id));
      } catch { /* silencieux */ }
      finally  { setLoading(false); }
    };

    fetchTeachers();
  }, []);

  const selectedTeacher = teachers.find(t => t.id === Number(selectedTeacherId)) || null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!rating)          { alert("Veuillez choisir une note."); return; }
    if (!comment.trim())  { alert("Veuillez écrire un avis."); return; }
    if (!selectedTeacherId) { alert("Aucun professeur disponible."); return; }

    setSubmitting(true);
    try {
      const res  = await apiFetch("/api/reviews", {
        method:  "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          student_id: user.id,
          teacher_id: Number(selectedTeacherId),
          rating,
          comment:    comment.trim(),
        }),
      });
      const data = await res.json();
      if (!res.ok) { alert(data.message || "Erreur envoi avis"); return; }

      setSuccessMsg("Votre avis a bien été envoyé !");
      setRating(0);
      setComment("");
      setTimeout(() => {
        setSuccessMsg("");
        window.location.href = "/student/dashboard";
      }, 2000);
    } catch { alert("Erreur de connexion au serveur"); }
    finally  { setSubmitting(false); }
  };

  return (
    <div style={S.wrap}>
      <div style={S.dash}>
        {/* ── SIDEBAR ── */}
        <Sidebar role={"eleve"} user={user} active={"/student/review"} />

        <main style={S.main}>
          <div style={S.topBar}>
            <div>
              <p style={S.smallTitle}>Laisser un avis</p>
              <div style={S.smallSub}>L'avis intervient après le déroulement du cours.</div>
            </div>
          </div>

          <div style={S.infoBanner}>
            L'avis se fait après une séance effectuée. Il ne remplace pas la validation de la formule ni le paiement.
          </div>

          {successMsg && <div style={S.successMsg}>✓ {successMsg}</div>}

          {loading ? (
            <div style={S.empty}>Chargement…</div>
          ) : teachers.length === 0 ? (
            <div style={{ ...S.card, textAlign: "center", color: "#9CA3AF", padding: 30 }}>
              Aucun cours d'essai accepté pour le moment. Vous pourrez laisser un avis après votre premier cours.
            </div>
          ) : (
            <>
              <div style={S.grid2}>
                <div style={S.card}>
                  <div style={S.cardTitle}>Cours concerné</div>
                  <div style={S.cardDesc}>Choisissez le professeur pour lequel vous souhaitez laisser un avis.</div>

                  <div style={S.field}>
                    <label style={S.label}>Professeur</label>
                    <select
                      style={S.select}
                      value={selectedTeacherId}
                      onChange={e => setSelectedTeacherId(e.target.value)}
                    >
                      {teachers.map(t => (
                        <option key={t.id} value={t.id}>{t.name} — {t.subject}</option>
                      ))}
                    </select>
                  </div>

                  <div style={S.summaryBox}>
                    <div style={S.summaryLabel}>Professeur sélectionné</div>
                    <div style={S.summaryValue}>{selectedTeacher?.name || "—"}</div>
                  </div>
                  <div style={S.summaryBox}>
                    <div style={S.summaryLabel}>Matière</div>
                    <div style={S.summaryValue}>{selectedTeacher?.subject || "—"}</div>
                  </div>
                </div>

                <div style={S.card}>
                  <div style={S.cardTitle}>Votre note</div>
                  <div style={S.cardDesc}>Donnez une note globale sur votre expérience.</div>
                  <div style={S.starsRow}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button key={star} type="button" onClick={() => setRating(star)}
                        style={rating >= star ? S.starBtnActive : S.starBtn}>★</button>
                    ))}
                  </div>
                  <div style={{ fontSize: 16, color: "#4B5563" }}>
                    Note sélectionnée : <strong>{rating}/5</strong>
                  </div>
                </div>
              </div>

              <div style={S.card}>
                <div style={S.cardTitle}>Commentaire</div>
                <form onSubmit={handleSubmit}>
                  <div style={S.field}>
                    <label style={S.label}>Votre avis</label>
                    <textarea
                      value={comment}
                      onChange={e => setComment(e.target.value)}
                      placeholder="Décrivez votre expérience, la pédagogie, la clarté des explications..."
                      style={S.textarea}
                    />
                  </div>
                  <div style={S.btnRow}>
                    <button type="submit" disabled={submitting}
                      style={{ ...S.btn, ...S.btnPrimary, opacity: submitting ? 0.5 : 1, cursor: submitting ? "not-allowed" : "pointer" }}>
                      {submitting ? "Envoi en cours…" : "Envoyer l'avis"}
                    </button>
                    <a href="/student/courses" style={{ ...S.btn, ...S.btnGhost }}>Retour aux cours</a>
                  </div>
                </form>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}

export default StudentReview;