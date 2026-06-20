import React, { useEffect, useState } from "react";

import S from "../styles/pages/TeacherCollectiveClasses.styles.js";
import { apiFetch } from "../config/api.js";
import Sidebar from "../components/layout/Sidebar.jsx";

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
        `${import.meta.env.VITE_API_URL}/api/group-classes/teacher/${user.id}`,
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
        `${import.meta.env.VITE_API_URL}/api/group-classes/${sessionId}/repondre`,
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
        `${import.meta.env.VITE_API_URL}/api/group-classes/${sessionId}/close`,
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
        {/* ── SIDEBAR ── */}
        <Sidebar role={"professeur"} user={user} active={"/teacher/collective/classes"} />

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
