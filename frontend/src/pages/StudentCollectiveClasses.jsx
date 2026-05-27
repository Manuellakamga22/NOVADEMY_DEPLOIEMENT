import React, { useEffect, useState } from "react";

const S = {
  wrap: { fontFamily: "'Segoe UI', sans-serif", minHeight: "100vh", background: "#F9FAFB" },
  dash: { display: "grid", gridTemplateColumns: "260px 1fr", minHeight: "100vh" },
  sidebar: { background: "#fff", borderRight: "1px solid #E5E7EB", display: "flex", flexDirection: "column", position: "sticky", top: 0, height: "100vh", overflowY: "auto" },
  sbBrand: { padding: "24px 22px", borderBottom: "1px solid #E5E7EB" },
  logo: { fontSize: 20, fontWeight: 800, letterSpacing: "-0.02em" },
  logoEm: { color: "#2563EB" },
  sbRole: { display: "inline-block", marginTop: 8, fontSize: 12, fontWeight: 700, textTransform: "uppercase", padding: "4px 12px", borderRadius: 20, background: "#ECFDF5", color: "#059669" },
  sbNav: { padding: 14, flex: 1 },
  sbLabel: { fontSize: 11, fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", color: "#9CA3AF", padding: "0 10px", margin: "18px 0 6px", display: "block" },
  sbLink: { display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", borderRadius: 9, fontSize: 15, fontWeight: 500, color: "#4B5563", textDecoration: "none", marginBottom: 2 },
  sbLinkActive: { display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", borderRadius: 9, fontSize: 15, fontWeight: 600, color: "#2563EB", background: "#EFF6FF", textDecoration: "none", marginBottom: 2 },
  sbUser: { padding: "18px 22px", borderTop: "1px solid #E5E7EB", display: "flex", alignItems: "center", gap: 12 },
  av: { width: 38, height: 38, borderRadius: "50%", background: "linear-gradient(135deg,#059669,#0891B2)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 15, flexShrink: 0 },
  main: { padding: "30px" },
  pageTitle: { fontSize: 28, fontWeight: 800, color: "#111827", marginBottom: 6 },
  pageSub: { fontSize: 15, color: "#6B7280", marginBottom: 24, lineHeight: 1.6 },
  grid2: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, marginBottom: 18 },
  card: { background: "#fff", border: "1px solid #E5E7EB", borderRadius: 14, padding: "22px 24px", marginBottom: 18 },
  cardTitle: { fontSize: 17, fontWeight: 800, marginBottom: 16, color: "#111827" },
  label: { fontSize: 13, fontWeight: 700, color: "#374151", display: "block", marginBottom: 6 },
  input: { width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid #D1D5DB", fontSize: 14, fontFamily: "inherit", boxSizing: "border-box", marginBottom: 14 },
  select: { width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid #D1D5DB", fontSize: 14, fontFamily: "inherit", boxSizing: "border-box", marginBottom: 14, background: "#fff" },
  btnPrimary: { background: "#059669", color: "#fff", border: "none", borderRadius: 10, padding: "11px 22px", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" },
  btnBlue: { background: "#2563EB", color: "#fff", border: "none", borderRadius: 10, padding: "11px 22px", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" },
  successMsg: { background: "#ECFDF5", border: "1px solid #A7F3D0", color: "#059669", borderRadius: 10, padding: "12px 16px", fontSize: 14, marginBottom: 16 },
  errorMsg: { background: "#FEF2F2", border: "1px solid #FCA5A5", color: "#DC2626", borderRadius: 10, padding: "12px 16px", fontSize: 14, marginBottom: 16 },
  sessionCard: { background: "#F9FAFB", border: "1px solid #E5E7EB", borderRadius: 12, padding: 16, marginBottom: 12 },
  sessionTop: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 },
  sessionTitle: { fontSize: 15, fontWeight: 700, color: "#111827" },
  codeBadge: { background: "#EFF6FF", color: "#2563EB", fontWeight: 800, fontSize: 13, padding: "4px 10px", borderRadius: 8, letterSpacing: ".05em" },
  sessionMeta: { fontSize: 13, color: "#6B7280", lineHeight: 1.7 },
  progressBar: { height: 6, background: "#E5E7EB", borderRadius: 4, marginTop: 8 },
  progressFill: (pct) => ({ height: 6, borderRadius: 4, background: pct >= 100 ? "#059669" : "#2563EB", width: `${Math.min(pct, 100)}%` }),
  pill: { fontSize: 11, fontWeight: 700, padding: "3px 8px", borderRadius: 12, display: "inline-block" },
  empty: { textAlign: "center", padding: "24px", color: "#9CA3AF", fontSize: 14 },
  // compteur élèves
  countRow: { display: "flex", alignItems: "center", gap: 10, marginBottom: 14 },
  countBtn: { width: 34, height: 34, borderRadius: 8, border: "1px solid #D1D5DB", background: "#F3F4F6", fontSize: 18, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "inherit" },
  countVal: { minWidth: 50, textAlign: "center", fontSize: 15, fontWeight: 800, color: "#111827" },
};

function StudentCollectiveClasses() {
  const savedUser = localStorage.getItem("user");
  const user = savedUser ? JSON.parse(savedUser) : null;
  const token = localStorage.getItem("token");

  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // -- Créer une session --
  const [formSubject, setFormSubject] = useState("");
  const [formLevel, setFormLevel] = useState("lycee");
  const [formTeacherId, setFormTeacherId] = useState("");
  const [formMin, setFormMin] = useState(2);
  const [formMax, setFormMax] = useState(4);
  const [formDate, setFormDate] = useState("");
  const [creating, setCreating] = useState(false);
  const [sessionCreee, setSessionCreee] = useState(null);

  // -- Rejoindre par code --
  const [codeJoin, setCodeJoin] = useState("");
  const [joining, setJoining] = useState(false);

  // -- Mes sessions --
  const [mesSessions, setMesSessions] = useState([]);
  const [loadingMes, setLoadingMes] = useState(true);

  // -- Sessions ouvertes --
  const [sessionsOuvertes, setSessionsOuvertes] = useState([]);
  const [loadingOpen, setLoadingOpen] = useState(true);

  const chargerMesSessions = async () => {
    if (!user?.id) return;
    setLoadingMes(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/group-classes/student/${user.id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const data = await res.json();
      setMesSessions(Array.isArray(data) ? data : []);
    } catch { /* silencieux */ }
    finally { setLoadingMes(false); }
  };

  const chargerSessionsOuvertes = async () => {
    setLoadingOpen(true);
    try {
      const res = await fetch(
        "${import.meta.env.VITE_API_URL}/api/group-classes/open",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const data = await res.json();
      setSessionsOuvertes(Array.isArray(data) ? data : []);
    } catch { /* silencieux */ }
    finally { setLoadingOpen(false); }
  };

  useEffect(() => {
    chargerMesSessions();
    chargerSessionsOuvertes();
  }, []);

  // crée une nouvelle session collective
  const handleCreer = async () => {
    if (!formSubject || !formTeacherId || !formDate) {
      setErrorMsg("Matière, professeur et date sont obligatoires.");
      return;
    }
    setCreating(true);
    try {
      const res = await fetch("${import.meta.env.VITE_API_URL}/api/group-classes", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          student_id: user.id,
          teacher_id: Number(formTeacherId),
          subject: formSubject,
          level: formLevel,
          min_students: formMin,
          max_students: formMax,
          opening_date: formDate,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Erreur");

      setSessionCreee(data.session_code);
      setSuccessMsg(`✓ Session créée ! Votre code : ${data.session_code}`);
      setTimeout(() => setSuccessMsg(""), 8000);
      setFormSubject(""); setFormTeacherId(""); setFormDate("");
      chargerMesSessions();
    } catch (err) {
      setErrorMsg(err.message || "Erreur lors de la création.");
    } finally {
      setCreating(false);
    }
  };

  // rejoint une session par son code
  const handleJoindre = async () => {
    if (!codeJoin.trim()) { setErrorMsg("Saisissez un code."); return; }
    setJoining(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/group-classes/code/${codeJoin.trim().toUpperCase()}/join`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify({ student_id: user.id }),
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Erreur");

      setSuccessMsg(`✓ Vous avez rejoint la session ${data.session_code} !`);
      setTimeout(() => setSuccessMsg(""), 5001);
      setCodeJoin("");
      chargerMesSessions();
    } catch (err) {
      setErrorMsg(err.message || "Code invalide ou session indisponible.");
    } finally {
      setJoining(false);
    }
  };

  // rejoint une session depuis la liste des sessions ouvertes
  const handleJoindreSession = async (sessionId) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/group-classes/${sessionId}/enroll`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify({ student_id: user.id }),
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Erreur");
      setSuccessMsg("✓ Inscription confirmée !");
      setTimeout(() => setSuccessMsg(""), 4000);
      chargerMesSessions();
      chargerSessionsOuvertes();
    } catch (err) {
      setErrorMsg(err.message || "Impossible de rejoindre cette session.");
    }
  };

  const pillStatutSession = (s) => {
    const styles = {
      ouverte:  { background: "#ECFDF5", color: "#059669" },
      pending:  { background: "#FEF9C3", color: "#92400E" },
      accepted: { background: "#EFF6FF", color: "#1D4ED8" },
      refused:  { background: "#FEF2F2", color: "#991B1B" },
      annulee:  { background: "#FEF2F2", color: "#991B1B" },
      validee:  { background: "#ECFDF5", color: "#065F46" },
      complete: { background: "#F3E8FF", color: "#6B21A8" },
    };
    const st = styles[s] || { background: "#F3F4F6", color: "#6B7280" };
    return <span style={{ ...S.pill, ...st }}>{s}</span>;
  };

  return (
    <div style={S.wrap}>
      <div style={S.dash}>
        <aside style={S.sidebar}>
          <div style={S.sbBrand}>
            <div style={S.logo}>NOVA<span style={S.logoEm}>DEMY</span></div>
            <span style={S.sbRole}>Élève</span>
          </div>
          <nav style={S.sbNav}>
            <span style={S.sbLabel}>Principal</span>
            <a style={S.sbLink} href="/student/dashboard">🏠 Tableau de bord</a>
            <a style={S.sbLink} href="/student/profile">👤 Mon profil</a>
            <a style={S.sbLink} href="/search">🔍 Trouver un prof</a>
            <span style={S.sbLabel}>Mes cours</span>
            <a style={S.sbLink} href="/student/requests">📬 Mes demandes</a>
            <a style={S.sbLink} href="/student/courses">📚 Mes cours</a>
            <a style={S.sbLink} href="/student/planning">📅 Mon calendrier</a>
            <a style={S.sbLinkActive} href="/student/collective">👥 Classes collectives</a>
            <a style={S.sbLink} href="/student/chat">💬 Messages</a>
            <span style={S.sbLabel}>Compte</span>
            <a style={S.sbLink} href="/student/payments">💳 Paiements</a>
          </nav>
          <div style={S.sbUser}>
            <div style={S.av}>{user?.prenom?.[0]?.toUpperCase() || "É"}</div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 600 }}>{user ? `${user.prenom} ${user.nom}` : "Élève"}</div>
              <div style={{ fontSize: 13, color: "#9CA3AF" }}>Élève</div>
            </div>
          </div>
        </aside>

        <main style={S.main}>
          <div style={S.pageTitle}>👥 Classes collectives</div>
          <div style={S.pageSub}>
            Organisez des cours en groupe pour réduire le coût et apprendre ensemble. Créez une session, partagez le code à vos amis, et le professeur confirme.
          </div>

          {successMsg && <div style={S.successMsg}>{successMsg}</div>}
          {errorMsg && <div style={S.errorMsg} onClick={() => setErrorMsg("")}>{errorMsg}</div>}

          {/* code généré affiché en gros */}
          {sessionCreee && (
            <div style={{ background: "#EFF6FF", border: "2px solid #BFDBFE", borderRadius: 14, padding: "18px 24px", marginBottom: 20, textAlign: "center" }}>
              <div style={{ fontSize: 13, color: "#6B7280", marginBottom: 8 }}>Partagez ce code à vos amis pour qu'ils rejoignent la session :</div>
              <div style={{ fontSize: 32, fontWeight: 900, color: "#1D4ED8", letterSpacing: ".1em" }}>{sessionCreee}</div>
              <div style={{ fontSize: 12, color: "#9CA3AF", marginTop: 6 }}>Le professeur doit accepter avant que la session soit active.</div>
            </div>
          )}

          <div style={S.grid2}>
            {/* créer une session */}
            <div style={S.card}>
              <div style={S.cardTitle}>➕ Créer une session collective</div>

              <label style={S.label}>Matière</label>
              <input type="text" value={formSubject} onChange={e => setFormSubject(e.target.value)}
                placeholder="Ex : Mathématiques, React, Python…" style={S.input} />

              <label style={S.label}>Niveau</label>
              <select value={formLevel} onChange={e => setFormLevel(e.target.value)} style={S.select}>
                <option value="college">Collège</option>
                <option value="lycee">Lycée</option>
                <option value="superieur">Supérieur</option>
                <option value="prepa">Prépa</option>
              </select>

              <label style={S.label}>ID du professeur</label>
              <input type="number" value={formTeacherId} onChange={e => setFormTeacherId(e.target.value)}
                placeholder="Ex : 3" style={S.input} />

              <label style={S.label}>Date souhaitée</label>
              <input type="date" value={formDate} onChange={e => setFormDate(e.target.value)} style={S.input} />

              <label style={S.label}>Nombre d'élèves</label>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 }}>
                <div>
                  <div style={{ fontSize: 12, color: "#9CA3AF", marginBottom: 4 }}>Minimum (≥ 2)</div>
                  <div style={S.countRow}>
                    <button style={S.countBtn} type="button" onClick={() => setFormMin(v => Math.max(v - 1, 2))}>−</button>
                    <span style={S.countVal}>{formMin}</span>
                    <button style={S.countBtn} type="button" onClick={() => setFormMin(v => Math.min(v + 1, formMax))}>+</button>
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: 12, color: "#9CA3AF", marginBottom: 4 }}>Maximum</div>
                  <div style={S.countRow}>
                    <button style={S.countBtn} type="button" onClick={() => setFormMax(v => Math.max(v - 1, formMin))}>−</button>
                    <span style={S.countVal}>{formMax}</span>
                    <button style={S.countBtn} type="button" onClick={() => setFormMax(v => Math.min(v + 1, 10))}>+</button>
                  </div>
                </div>
              </div>

              <button style={S.btnPrimary} onClick={handleCreer} disabled={creating}>
                {creating ? "Création…" : "Créer la session"}
              </button>
            </div>

            {/* rejoindre par code */}
            <div>
              <div style={S.card}>
                <div style={S.cardTitle}>🔑 Rejoindre une classe virtuelle</div>
                <p style={{ fontSize: 14, color: "#6B7280", marginBottom: 16, lineHeight: 1.6 }}>
                  Un ami vous a partagé un code ? Saisissez-le ici pour rejoindre sa session directement.
                </p>
                <label style={S.label}>Code de la session</label>
                <input
                  type="text"
                  value={codeJoin}
                  onChange={e => setCodeJoin(e.target.value.toUpperCase())}
                  placeholder="Ex : MATH-4521"
                  style={{ ...S.input, textTransform: "uppercase", letterSpacing: ".08em", fontWeight: 700, fontSize: 15 }}
                  maxLength={12}
                />
                <button style={S.btnBlue} onClick={handleJoindre} disabled={joining}>
                  {joining ? "Recherche…" : "Rejoindre"}
                </button>
              </div>

              {/* Mes sessions */}
              <div style={S.card}>
                <div style={S.cardTitle}>📋 Mes sessions</div>
                {loadingMes ? (
                  <div style={S.empty}>Chargement…</div>
                ) : mesSessions.length === 0 ? (
                  <div style={S.empty}>Vous n'avez pas encore de session.</div>
                ) : (
                  mesSessions.map(s => {
                    const pct = Math.round((Number(s.enrolled_count) / Number(s.max_students)) * 100);
                    return (
                      <div key={s.id} style={S.sessionCard}>
                        <div style={S.sessionTop}>
                          <div style={S.sessionTitle}>{s.subject} — {s.level}</div>
                          <div style={S.codeBadge}>{s.session_code || "—"}</div>
                        </div>
                        <div style={S.sessionMeta}>
                          {s.enrolled_count}/{s.max_students} élèves ·{" "}
                          {s.opening_date ? new Date(s.opening_date).toLocaleDateString("fr-FR") : "—"}<br />
                          Prof : {pillStatutSession(s.teacher_status || "pending")} · Session : {pillStatutSession(s.session_status || s.status)}
                        </div>
                        <div style={S.progressBar}>
                          <div style={S.progressFill(pct)} />
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>

          {/* Sessions ouvertes */}
          <div style={S.card}>
            <div style={S.cardTitle}>🌐 Sessions ouvertes</div>
            <p style={{ fontSize: 14, color: "#6B7280", marginBottom: 16 }}>
              Rejoignez une session déjà existante créée par d'autres élèves.
            </p>
            {loadingOpen ? (
              <div style={S.empty}>Chargement…</div>
            ) : sessionsOuvertes.length === 0 ? (
              <div style={S.empty}>Aucune session ouverte pour le moment.</div>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
                {sessionsOuvertes.map(s => {
                  const pct = Math.round((Number(s.enrolled_count) / Number(s.max_students)) * 100);
                  const dejaInscrit = mesSessions.some(m => m.group_class_id === s.id || m.id === s.id);
                  return (
                    <div key={s.id} style={{ ...S.sessionCard, marginBottom: 0 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                        <span style={{ fontSize: 15, fontWeight: 700 }}>{s.subject}</span>
                        <span style={S.codeBadge}>{s.session_code || "—"}</span>
                      </div>
                      <div style={{ fontSize: 13, color: "#6B7280", marginBottom: 8 }}>
                        {s.enrolled_count} / {s.max_students} élèves · {s.level}
                      </div>
                      <div style={S.progressBar}>
                        <div style={S.progressFill(pct)} />
                      </div>
                      <button
                        style={{ ...S.btnPrimary, marginTop: 10, padding: "8px 14px", fontSize: 13, width: "100%", opacity: dejaInscrit ? 0.5 : 1 }}
                        onClick={() => !dejaInscrit && handleJoindreSession(s.id)}
                        disabled={dejaInscrit}
                      >
                        {dejaInscrit ? "✓ Déjà inscrit" : "Rejoindre"}
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default StudentCollectiveClasses;
