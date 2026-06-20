import React, { useEffect, useState } from "react";

import S from "../styles/pages/StudentCollectiveClasses.styles.js";
import { apiFetch } from "../config/api.js";
import Sidebar from "../components/layout/Sidebar.jsx";

function StudentCollectiveClasses() {
  const savedUser = localStorage.getItem("user");
  const user = savedUser ? JSON.parse(savedUser) : null;
  const token = localStorage.getItem("token");

  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // -- Créer une session --
  const [formSubject, setFormSubject]     = useState("");
  const [formLevel, setFormLevel]         = useState("lycee");
  const [formTeacherId, setFormTeacherId] = useState("");
  const [formTeacherNom, setFormTeacherNom] = useState("");
  const [formMin, setFormMin]             = useState(2);
  const [formMax, setFormMax]             = useState(4);
  const [formDate, setFormDate]           = useState("");
  const [creating, setCreating]           = useState(false);
  const [sessionCreee, setSessionCreee]   = useState(null);

  // -- Recherche de professeurs --
  const [profs, setProfs]           = useState([]);
  const [rechercheProf, setRechercheProf] = useState("");
  const [showProfs, setShowProfs]   = useState(false);

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
      const res = await apiFetch(`/api/group-classes/student/${user.id}`);
      const data = await res.json();
      setMesSessions(Array.isArray(data) ? data : []);
    } catch { /* silencieux */ }
    finally { setLoadingMes(false); }
  };

  const chargerSessionsOuvertes = async () => {
    setLoadingOpen(true);
    try {
      const res = await apiFetch("/api/group-classes/open");
      const data = await res.json();
      setSessionsOuvertes(Array.isArray(data) ? data : []);
    } catch { /* silencieux */ }
    finally { setLoadingOpen(false); }
  };

  const chargerProfs = async () => {
    try {
      const res = await apiFetch("/api/teachers");
      const data = await res.json();
      setProfs(Array.isArray(data) ? data : []);
    } catch { /* silencieux */ }
  };

  useEffect(() => {
    chargerMesSessions();
    chargerSessionsOuvertes();
    chargerProfs();
  }, []);

  const profsFiltres = profs.filter(p => {
    if (!rechercheProf) return true;
    const nom = `${p.prenom} ${p.nom}`.toLowerCase();
    return nom.includes(rechercheProf.toLowerCase());
  });

  const choisirProf = (p) => {
    setFormTeacherId(p.id);
    setFormTeacherNom(`${p.prenom} ${p.nom}`);
    setRechercheProf(`${p.prenom} ${p.nom}`);
    setShowProfs(false);
  };

  // crée une nouvelle session collective
  const handleCreer = async () => {
    if (!formSubject || !formTeacherId || !formDate) {
      setErrorMsg("Matière, professeur et date sont obligatoires.");
      return;
    }
    setCreating(true);
    try {
      const res = await apiFetch("/api/group-classes", {
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

  // rejoint une session depuis la liste des sessions ouvertes (via le code)
  const handleJoindreSession = async (sessionCode) => {
    if (!sessionCode) return;
    try {
      const res = await apiFetch(`/api/group-classes/code/${sessionCode}/join`, {
        method: "POST",
        body: JSON.stringify({ student_id: user.id }),
      });
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
        {/* ── SIDEBAR ── */}
        <Sidebar role={"eleve"} user={user} active={"/student/collective"} />

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

              <label style={S.label}>Professeur</label>
              <div style={{ position: "relative" }}>
                <input
                  type="text"
                  value={rechercheProf}
                  onChange={e => { setRechercheProf(e.target.value); setFormTeacherId(""); setShowProfs(true); }}
                  onFocus={() => setShowProfs(true)}
                  placeholder="Rechercher un professeur par nom..."
                  style={S.input}
                  autoComplete="off"
                />
                {showProfs && rechercheProf.length > 0 && profsFiltres.length > 0 && (
                  <div style={{
                    position: "absolute", top: "100%", left: 0, right: 0, zIndex: 10,
                    background: "#fff", border: "1px solid #E5E7EB", borderRadius: 8,
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)", maxHeight: 200, overflowY: "auto",
                  }}>
                    {profsFiltres.map(p => (
                      <div
                        key={p.id}
                        onClick={() => choisirProf(p)}
                        style={{
                          padding: "10px 14px", cursor: "pointer", fontSize: 15,
                          borderBottom: "1px solid #F3F4F6",
                        }}
                        onMouseEnter={e => e.currentTarget.style.background = "#F9FAFB"}
                        onMouseLeave={e => e.currentTarget.style.background = "#fff"}
                      >
                        <strong>{p.prenom} {p.nom}</strong>
                        <span style={{ fontSize: 13, color: "#9CA3AF", marginLeft: 8 }}>{p.email}</span>
                      </div>
                    ))}
                  </div>
                )}
                {formTeacherNom && formTeacherId && (
                  <div style={{ marginTop: 6, fontSize: 14, color: "#059669", fontWeight: 600 }}>
                    ✓ {formTeacherNom} sélectionné
                  </div>
                )}
              </div>

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
                        onClick={() => !dejaInscrit && handleJoindreSession(s.session_code)}
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
