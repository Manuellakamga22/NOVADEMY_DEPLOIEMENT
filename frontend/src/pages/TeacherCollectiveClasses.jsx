import React, { useEffect, useState } from "react";

const S = {
  wrap: { fontFamily: "'Segoe UI', sans-serif", minHeight: "100vh", background: "#F9FAFB" },
  dash: { display: "grid", gridTemplateColumns: "280px 1fr", minHeight: "100vh" },
  sidebar: { background: "#fff", borderRight: "1px solid #E5E7EB", display: "flex", flexDirection: "column", position: "sticky", top: 0, height: "100vh", overflowY: "auto" },
  sbBrand: { padding: "26px 22px", borderBottom: "1px solid #E5E7EB" },
  logo: { fontSize: 21, fontWeight: 800, letterSpacing: "-0.02em" },
  logoEm: { color: "#2563EB" },
  sbRole: { display: "inline-block", marginTop: 10, fontSize: 13, fontWeight: 700, textTransform: "uppercase", padding: "5px 12px", borderRadius: 20, background: "#EFF6FF", color: "#2563EB" },
  sbNav: { padding: 14, flex: 1 },
  sbLabel: { fontSize: 12, fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", color: "#9CA3AF", padding: "0 10px", margin: "18px 0 8px", display: "block" },
  sbLink: { display: "flex", alignItems: "center", gap: 12, padding: "14px 15px", borderRadius: 10, fontSize: 17, fontWeight: 500, color: "#4B5563", textDecoration: "none", marginBottom: 4 },
  sbLinkActive: { display: "flex", alignItems: "center", gap: 12, padding: "14px 15px", borderRadius: 10, fontSize: 17, fontWeight: 700, color: "#2563EB", background: "#EFF6FF", textDecoration: "none", marginBottom: 4 },
  sbUser: { padding: "18px 22px", borderTop: "1px solid #E5E7EB", display: "flex", alignItems: "center", gap: 12 },
  av: { width: 42, height: 42, borderRadius: "50%", background: "linear-gradient(135deg,#2563EB,#1D4ED8)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 17, flexShrink: 0 },
  main: { padding: "30px" },
  pageTitle: { fontSize: 28, fontWeight: 800, color: "#111827", marginBottom: 6 },
  pageSub: { fontSize: 15, color: "#6B7280", marginBottom: 24, lineHeight: 1.6 },
  stats: { display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, marginBottom: 22 },
  statAccent: { background: "#2563EB", borderRadius: 14, padding: "20px 22px" },
  stat: { background: "#fff", border: "1px solid #E5E7EB", borderRadius: 14, padding: "20px 22px" },
  statLabelW: { fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,.78)", textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 8 },
  statLabel: { fontSize: 12, fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 8 },
  statValW: { fontSize: 30, fontWeight: 800, color: "#fff" },
  statVal: { fontSize: 30, fontWeight: 800, color: "#111827" },
  card: { background: "#fff", border: "1px solid #E5E7EB", borderRadius: 14, padding: "22px 24px", marginBottom: 18 },
  cardTitle: { fontSize: 17, fontWeight: 800, marginBottom: 16, color: "#111827" },
  sessionCard: { background: "#F9FAFB", border: "1px solid #E5E7EB", borderRadius: 12, padding: 18, marginBottom: 14 },
  sessionTop: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 },
  sessionTitle: { fontSize: 16, fontWeight: 700, color: "#111827" },
  codeBadge: { background: "#EFF6FF", color: "#2563EB", fontWeight: 800, fontSize: 13, padding: "4px 10px", borderRadius: 8, letterSpacing: ".05em" },
  sessionMeta: { fontSize: 13, color: "#6B7280", lineHeight: 1.8, marginBottom: 12 },
  btnRow: { display: "flex", gap: 10, flexWrap: "wrap" },
  btnAccept: { background: "#059669", color: "#fff", border: "none", borderRadius: 8, padding: "9px 18px", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" },
  btnRefuse: { background: "#FEF2F2", color: "#DC2626", border: "1px solid #FCA5A5", borderRadius: 8, padding: "9px 18px", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" },
  btnClose: { background: "#F3F4F6", color: "#4B5563", border: "none", borderRadius: 8, padding: "9px 18px", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" },
  pill: { fontSize: 11, fontWeight: 700, padding: "3px 8px", borderRadius: 12, display: "inline-block" },
  progressBar: { height: 6, background: "#E5E7EB", borderRadius: 4, margin: "8px 0" },
  progressFill: (pct) => ({ height: 6, borderRadius: 4, background: pct >= 100 ? "#059669" : "#2563EB", width: `${Math.min(pct, 100)}%` }),
  successMsg: { background: "#ECFDF5", border: "1px solid #A7F3D0", color: "#059669", borderRadius: 10, padding: "12px 16px", fontSize: 14, marginBottom: 16 },
  errorMsg: { background: "#FEF2F2", border: "1px solid #FCA5A5", color: "#DC2626", borderRadius: 10, padding: "12px 16px", fontSize: 14, marginBottom: 16 },
  empty: { textAlign: "center", padding: "24px", color: "#9CA3AF", fontSize: 14 },
};

function TeacherCollectiveClasses() {
  const savedUser = localStorage.getItem("user");
  const user = savedUser ? JSON.parse(savedUser) : null;
  const token = localStorage.getItem("token");

  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const charger = async () => {
    if (!user?.id) { setLoading(false); return; }
    setLoading(true);
    try {
      const res = await fetch(
        `http://localhost:5001/api/group-classes/teacher/${user.id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const data = await res.json();
      setSessions(Array.isArray(data) ? data : []);
    } catch {
      setErrorMsg("Impossible de charger les sessions.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { charger(); }, []);

  // le prof accepte ou refuse une session
  const repondre = async (sessionId, decision) => {
    const label = decision === "accepted" ? "accepter" : "refuser";
    if (!window.confirm(`Voulez-vous vraiment ${label} cette session ?`)) return;
    try {
      const res = await fetch(
        `http://localhost:5001/api/group-classes/${sessionId}/repondre`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify({ decision, teacher_id: user.id }),
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Erreur");
      setSuccessMsg(data.message);
      setTimeout(() => setSuccessMsg(""), 4000);
      charger();
    } catch (err) {
      setErrorMsg(err.message || "Erreur.");
    }
  };

  // le prof clôt une session
  const clore = async (sessionId) => {
    if (!window.confirm("Clore cette session ? Si le minimum d'élèves est atteint, elle sera validée.")) return;
    try {
      const res = await fetch(
        `http://localhost:5001/api/group-classes/${sessionId}/close`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify({ teacher_id: user.id }),
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Erreur");
      setSuccessMsg(data.message);
      setTimeout(() => setSuccessMsg(""), 5001);
      charger();
    } catch (err) {
      setErrorMsg(err.message || "Erreur lors de la clôture.");
    }
  };

  const pillStatut = (s) => {
    const map = {
      pending:  { bg: "#FEF9C3", txt: "#92400E", label: "En attente" },
      accepted: { bg: "#ECFDF5", txt: "#065F46", label: "Acceptée" },
      refused:  { bg: "#FEF2F2", txt: "#991B1B", label: "Refusée" },
      ouverte:  { bg: "#EFF6FF", txt: "#1D4ED8", label: "Ouverte" },
      complete: { bg: "#F3E8FF", txt: "#6B21A8", label: "Complète" },
      validee:  { bg: "#ECFDF5", txt: "#065F46", label: "Validée" },
      annulee:  { bg: "#FEF2F2", txt: "#991B1B", label: "Annulée" },
    };
    const st = map[s] || { bg: "#F3F4F6", txt: "#6B7280", label: s };
    return <span style={{ ...S.pill, background: st.bg, color: st.txt }}>{st.label}</span>;
  };

  const enAttente = sessions.filter(s => s.teacher_status === "pending");
  const actives   = sessions.filter(s => s.teacher_status === "accepted" && s.status === "ouverte");
  const autres    = sessions.filter(s => s.teacher_status !== "pending" && (s.status !== "ouverte" || s.teacher_status === "refused"));

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
            <a style={S.sbLink} href="/teacher/planning">📅 Planning</a>
            <a style={S.sbLink} href="/teacher/requests">📬 Demandes</a>
            <a style={S.sbLink} href="/teacher/students">🎓 Mes élèves</a>
            <a style={S.sbLink} href="/chat">💬 Messages</a>
            <span style={S.sbLabel}>Compte</span>
            <a style={S.sbLink} href="/teacher/revenue">💳 Revenus</a>
            <a style={S.sbLinkActive} href="/teacher/collective/classes">👥 Classes collectives</a>
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
          <div style={S.pageTitle}>👥 Classes collectives</div>
          <div style={S.pageSub}>
            Les élèves créent des sessions de groupe et vous les soumettent. Acceptez ou refusez les demandes, puis clôturez quand la session est terminée.
          </div>

          {successMsg && <div style={S.successMsg}>{successMsg}</div>}
          {errorMsg && <div style={S.errorMsg} onClick={() => setErrorMsg("")}>{errorMsg}</div>}

          <div style={S.stats}>
            <div style={S.statAccent}>
              <div style={S.statLabelW}>En attente</div>
              <div style={S.statValW}>{enAttente.length}</div>
            </div>
            <div style={S.stat}>
              <div style={S.statLabel}>Sessions actives</div>
              <div style={S.statVal}>{actives.length}</div>
            </div>
            <div style={S.stat}>
              <div style={S.statLabel}>Total sessions</div>
              <div style={S.statVal}>{sessions.length}</div>
            </div>
          </div>

          {/* Demandes en attente */}
          <div style={S.card}>
            <div style={S.cardTitle}>
              🕐 Demandes en attente
              {enAttente.length > 0 && (
                <span style={{ ...S.pill, background: "#FEF9C3", color: "#92400E", marginLeft: 10, fontSize: 12 }}>
                  {enAttente.length} nouvelle{enAttente.length > 1 ? "s" : ""}
                </span>
              )}
            </div>
            {loading ? (
              <div style={S.empty}>Chargement…</div>
            ) : enAttente.length === 0 ? (
              <div style={S.empty}>Aucune demande en attente.</div>
            ) : (
              enAttente.map(s => {
                const pct = Math.round((Number(s.enrolled_count) / Number(s.max_students)) * 100);
                return (
                  <div key={s.id} style={S.sessionCard}>
                    <div style={S.sessionTop}>
                      <div style={S.sessionTitle}>{s.subject} — {s.level}</div>
                      <div style={S.codeBadge}>{s.session_code || "—"}</div>
                    </div>
                    <div style={S.sessionMeta}>
                      {s.enrolled_count} / {s.max_students} élèves (min. {s.min_students})<br />
                      Date souhaitée : {s.opening_date ? new Date(s.opening_date).toLocaleDateString("fr-FR") : "—"}
                    </div>
                    <div style={S.progressBar}>
                      <div style={S.progressFill(pct)} />
                    </div>
                    <div style={{ ...S.btnRow, marginTop: 12 }}>
                      <button style={S.btnAccept} onClick={() => repondre(s.id, "accepted")}>
                        ✓ Accepter
                      </button>
                      <button style={S.btnRefuse} onClick={() => repondre(s.id, "refused")}>
                        ✗ Refuser
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Sessions actives */}
          <div style={S.card}>
            <div style={S.cardTitle}>✅ Sessions actives</div>
            {actives.length === 0 ? (
              <div style={S.empty}>Aucune session active.</div>
            ) : (
              actives.map(s => {
                const pct = Math.round((Number(s.enrolled_count) / Number(s.max_students)) * 100);
                return (
                  <div key={s.id} style={S.sessionCard}>
                    <div style={S.sessionTop}>
                      <div style={S.sessionTitle}>{s.subject} — {s.level}</div>
                      <div style={S.codeBadge}>{s.session_code}</div>
                    </div>
                    <div style={S.sessionMeta}>
                      {s.enrolled_count} / {s.max_students} élèves · min. {s.min_students} requis<br />
                      {pillStatut(s.status)} · {pillStatut(s.teacher_status)}
                    </div>
                    <div style={S.progressBar}>
                      <div style={S.progressFill(pct)} />
                    </div>
                    <div style={{ ...S.btnRow, marginTop: 12 }}>
                      <button style={S.btnClose} onClick={() => clore(s.id)}>
                        Clôturer la session
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Historique */}
          {autres.length > 0 && (
            <div style={S.card}>
              <div style={S.cardTitle}>📁 Historique</div>
              {autres.map(s => (
                <div key={s.id} style={S.sessionCard}>
                  <div style={S.sessionTop}>
                    <div style={S.sessionTitle}>{s.subject} — {s.level}</div>
                    <div>{pillStatut(s.status)}</div>
                  </div>
                  <div style={S.sessionMeta}>
                    {s.enrolled_count} / {s.max_students} élèves ·{" "}
                    {s.opening_date ? new Date(s.opening_date).toLocaleDateString("fr-FR") : "—"}
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default TeacherCollectiveClasses;
