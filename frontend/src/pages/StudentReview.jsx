import React, { useEffect, useState } from "react";

const S = {
  wrap: { fontFamily: "'Segoe UI', sans-serif", minHeight: "100vh", background: "#F9FAFB" },
  logo: { fontSize: 24, fontWeight: 800, letterSpacing: "-0.02em" },
  logoEm: { color: "#2563EB" },
  dash: { display: "grid", gridTemplateColumns: "280px 1fr", minHeight: "100vh" },
  sidebar: { background: "#fff", borderRight: "1px solid #E5E7EB", display: "flex", flexDirection: "column", position: "sticky", top: 0, height: "100vh", overflowY: "auto" },
  sbBrand: { padding: "26px 22px", borderBottom: "1px solid #E5E7EB" },
  sbRole: { display: "inline-block", marginTop: 10, fontSize: 13, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", padding: "5px 12px", borderRadius: 20, background: "#ECFDF5", color: "#059669" },
  sbNav: { padding: 14, flex: 1 },
  sbLabel: { fontSize: 12, fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", color: "#9CA3AF", padding: "0 10px", margin: "18px 0 8px", display: "block" },
  sbLink: { display: "flex", alignItems: "center", gap: 12, padding: "14px 15px", borderRadius: 10, fontSize: 17, fontWeight: 500, color: "#4B5563", textDecoration: "none", marginBottom: 4 },
  sbLinkActive: { display: "flex", alignItems: "center", gap: 12, padding: "14px 15px", borderRadius: 10, fontSize: 17, fontWeight: 700, color: "#2563EB", background: "#EFF6FF", textDecoration: "none", marginBottom: 4 },
  sbBadge: { marginLeft: "auto", background: "#2563EB", color: "#fff", fontSize: 12, fontWeight: 700, padding: "3px 9px", borderRadius: 10 },
  sbUser: { padding: "18px 22px", borderTop: "1px solid #E5E7EB", display: "flex", alignItems: "center", gap: 12 },
  av: { width: 42, height: 42, borderRadius: "50%", background: "linear-gradient(135deg,#059669,#0891B2)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 16, flexShrink: 0 },
  main: { padding: "30px 30px" },
  topBar: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16, marginBottom: 22, flexWrap: "wrap" },
  smallTitle: { fontSize: 28, fontWeight: 800, color: "#111827", margin: 0 },
  smallSub: { fontSize: 17, color: "#6B7280", marginTop: 8, lineHeight: 1.7, maxWidth: "920px" },
  infoBanner: { background: "#EFF6FF", border: "1px solid #BFDBFE", color: "#1D4ED8", borderRadius: 14, padding: "16px 18px", fontSize: 16, lineHeight: 1.7, marginBottom: 20 },
  grid2: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, marginBottom: 18 },
  card: { background: "#fff", border: "1px solid #E5E7EB", borderRadius: 16, padding: "22px 24px" },
  cardTitle: { fontSize: 18, fontWeight: 800, color: "#111827", marginBottom: 14 },
  cardDesc: { fontSize: 16, color: "#6B7280", lineHeight: 1.7, marginBottom: 16 },
  summaryBox: { background: "#F9FAFB", border: "1px solid #E5E7EB", borderRadius: 12, padding: 14, marginBottom: 12 },
  summaryLabel: { fontSize: 12, color: "#9CA3AF", marginBottom: 6 },
  summaryValue: { fontSize: 16, fontWeight: 700, color: "#111827", lineHeight: 1.6 },
  starsRow: { display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 18 },
  starBtn: { width: 52, height: 52, borderRadius: "50%", border: "1.5px solid #E5E7EB", background: "#fff", fontSize: 24, cursor: "pointer" },
  starBtnActive: { width: 52, height: 52, borderRadius: "50%", border: "1.5px solid #2563EB", background: "#EFF6FF", color: "#2563EB", fontSize: 24, cursor: "pointer" },
  field: { marginBottom: 16 },
  label: { display: "block", fontSize: 16, fontWeight: 700, color: "#374151", marginBottom: 8 },
  select: { width: "100%", padding: "13px 14px", borderRadius: 10, border: "1.5px solid #E5E7EB", fontFamily: "inherit", fontSize: 15, outline: "none", background: "#fff", boxSizing: "border-box" },
  textarea: { width: "100%", minHeight: 140, padding: "13px 14px", borderRadius: 10, border: "1.5px solid #E5E7EB", fontFamily: "inherit", fontSize: 16, outline: "none", background: "#fff", boxSizing: "border-box", resize: "vertical" },
  btnRow: { display: "flex", gap: 10, flexWrap: "wrap", marginTop: 10 },
  btn: { display: "inline-flex", alignItems: "center", justifyContent: "center", fontFamily: "inherit", fontSize: 15, fontWeight: 700, padding: "11px 16px", borderRadius: 10, border: "none", cursor: "pointer", textDecoration: "none" },
  btnPrimary: { background: "#2563EB", color: "#fff" },
  btnGhost: { background: "#F3F4F6", color: "#4B5563" },
  empty: { textAlign: "center", padding: "30px", color: "#9CA3AF" },
  successMsg: { background: "#ECFDF5", border: "1px solid #A7F3D0", color: "#059669", borderRadius: 8, padding: "12px 16px", fontSize: 15, marginBottom: 16 },
};

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
          `http://localhost:5000/api/trials/student/${user.id}`,
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
      const res  = await fetch("http://localhost:5000/api/reviews", {
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
        <aside style={S.sidebar}>
          <div style={S.sbBrand}>
            <div style={{ ...S.logo, fontSize: 20 }}>NOVA<span style={S.logoEm}>DEMY</span></div>
            <span style={S.sbRole}>Élève</span>
          </div>
          <nav style={S.sbNav}>
            <span style={S.sbLabel}>Principal</span>
            <a style={S.sbLink} href="/student/dashboard">🏠 Tableau de bord</a>
            <a style={S.sbLink} href="/student/profile">👤 Mon profil</a>
            <a style={S.sbLink} href="/student/courses">📚 Mes cours</a>
            <a style={S.sbLink} href="/student/planning">📅 Mon calendrier</a>
            <a style={S.sbLink} href="/student/chat">💬 Messages</a>
            <span style={S.sbLabel}>Compte</span>
            <a style={S.sbLinkActive} href="/student/review">⭐ Avis</a>
          </nav>
          <div style={S.sbUser}>
            <div style={S.av}>{user?.prenom?.[0]?.toUpperCase() || "É"}</div>
            <div>
              <div style={{ fontSize: 16, fontWeight: 700 }}>{user ? `${user.prenom} ${user.nom}` : "Prénom Nom"}</div>
              <div style={{ fontSize: 14, color: "#9CA3AF", marginTop: 2 }}>Élève</div>
            </div>
          </div>
        </aside>

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