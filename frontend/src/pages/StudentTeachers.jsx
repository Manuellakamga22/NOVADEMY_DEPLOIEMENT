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
  topBar: { marginBottom: 22 },
  smallTitle: { fontSize: 28, fontWeight: 800, color: "#111827", margin: 0 },
  smallSub: { fontSize: 17, color: "#6B7280", marginTop: 8, lineHeight: 1.7, maxWidth: "920px" },
  stats: { display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 22 },
  statAccent: { background: "#2563EB", border: "1px solid #2563EB", borderRadius: 16, padding: "22px 24px" },
  stat: { background: "#fff", border: "1px solid #E5E7EB", borderRadius: 16, padding: "22px 24px" },
  statLabelW: { fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,.78)", textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 10 },
  statLabel: { fontSize: 13, fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 10 },
  statValW: { fontSize: 32, fontWeight: 800, color: "#fff" },
  statVal: { fontSize: 32, fontWeight: 800, color: "#111827" },
  card: { background: "#fff", border: "1px solid #E5E7EB", borderRadius: 16, padding: "22px 24px", marginBottom: 18 },
  cardTitle: { fontSize: 18, fontWeight: 800, marginBottom: 14, color: "#111827" },
  teacherList: { display: "flex", flexDirection: "column", gap: 14 },
  teacherCard: { background: "#F9FAFB", border: "1px solid #E5E7EB", borderRadius: 14, padding: 18 },
  itemTop: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 14, flexWrap: "wrap", marginBottom: 10 },
  itemTitle: { margin: 0, fontSize: 18, fontWeight: 800, color: "#111827" },
  itemSub: { margin: "8px 0 0 0", fontSize: 15, color: "#6B7280", lineHeight: 1.6 },
  pillRow: { display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 10 },
  pill: { fontSize: 12, fontWeight: 700, padding: "5px 11px", borderRadius: 999, display: "inline-block" },
  btnRow: { display: "flex", gap: 10, flexWrap: "wrap", marginTop: 10 },
  btn: { display: "inline-flex", alignItems: "center", justifyContent: "center", fontFamily: "inherit", fontSize: 15, fontWeight: 700, padding: "10px 16px", borderRadius: 10, border: "none", cursor: "pointer", textDecoration: "none" },
  btnPrimary: { background: "#2563EB", color: "#fff" },
  btnGhost: { background: "#F3F4F6", color: "#4B5563" },
  empty: { textAlign: "center", padding: "34px 20px", color: "#9CA3AF" },
};

function StudentTeachers() {
  const savedUser = localStorage.getItem("user");
  const user  = savedUser ? JSON.parse(savedUser) : null;
  const token = localStorage.getItem("token");

  const [teachers, setTeachers] = useState([]);
  const [loading,  setLoading]  = useState(true);

  // je charge les profs depuis les formules acceptées/payées
  useEffect(() => {
    if (!user?.id) { setLoading(false); return; }

    const fetchTeachers = async () => {
      try {
        const res  = await fetch(
          `${import.meta.env.VITE_API_URL}/api/trials/student/${user.id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (!res.ok) return;
        const trials = await res.json();

        // je récupère aussi les formules acceptées/payées
        const resP = await fetch(
          `${import.meta.env.VITE_API_URL}/api/packs/student/${user.id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const proposals = resP.ok ? await resP.json() : [];

        // je déduplique les profs qui ont une formule acceptée ou payée
        const seen = new Set();
        const list = [];

        for (const t of trials) {
          if (t.status !== "accepted") continue;
          if (seen.has(t.teacher_id)) continue;

          // je cherche si ce prof a une formule acceptée/payée
          const formula = proposals.find(
            p => Number(p.teacher_id) === Number(t.teacher_id) &&
                 ["acceptee", "payee"].includes(p.status)
          );

          seen.add(t.teacher_id);
          list.push({
            id:        t.teacher_id,
            name:      `${t.teacher_prenom || ""} ${t.teacher_nom || ""}`.trim() || `Prof #${t.teacher_id}`,
            subject:   t.subject || "—",
            formula:   formula ? formula.type : "Essai accepté",
            status:    formula ? (formula.status === "payee" ? "actif" : "en attente") : "essai",
          });
        }

        setTeachers(list);
      } catch { /* silencieux */ }
      finally  { setLoading(false); }
    };

    fetchTeachers();
  }, []);

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
            <a style={S.sbLink} href="/search">🔍 Trouver un prof</a>
            <span style={S.sbLabel}>Mes cours</span>
            <a style={S.sbLink} href="/student/requests">📄 Mes demandes</a>
            <a style={S.sbLink} href="/student/courses">📚 Mes cours</a>
            <a style={S.sbLinkActive} href="/student/teachers">👩‍🏫 Mes professeurs</a>
            <a style={S.sbLink} href="/student/planning">📅 Mon calendrier</a>
            <a style={S.sbLink} href="/student/chat">💬 Messages</a>
            <span style={S.sbLabel}>Compte</span>
            <a style={S.sbLink} href="/payment">💳 Paiements</a>
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
            <p style={S.smallTitle}>Mes professeurs</p>
            <div style={S.smallSub}>
              Retrouvez ici les professeurs avec qui vous avez un suivi après validation de la formule.
            </div>
          </div>

          <div style={S.stats}>
            <div style={S.statAccent}>
              <div style={S.statLabelW}>Professeurs suivis</div>
              <div style={S.statValW}>{loading ? "…" : teachers.length}</div>
            </div>
            <div style={S.stat}>
              <div style={S.statLabel}>Formules actives</div>
              <div style={S.statVal}>{loading ? "…" : teachers.filter(t => t.status === "actif").length}</div>
            </div>
            <div style={S.stat}>
              <div style={S.statLabel}>En attente</div>
              <div style={S.statVal}>{loading ? "…" : teachers.filter(t => t.status !== "actif").length}</div>
            </div>
            <div style={S.stat}>
              <div style={S.statLabel}>Avis possibles</div>
              <div style={S.statVal}>{loading ? "…" : teachers.length}</div>
            </div>
          </div>

          <div style={S.card}>
            <div style={S.cardTitle}>Liste de mes professeurs</div>
            {loading ? (
              <div style={S.empty}>Chargement…</div>
            ) : teachers.length === 0 ? (
              <div style={S.empty}>Aucun professeur suivi pour le moment.</div>
            ) : (
              <div style={S.teacherList}>
                {teachers.map((teacher) => (
                  <div key={teacher.id} style={S.teacherCard}>
                    <div style={S.itemTop}>
                      <div>
                        <h4 style={S.itemTitle}>{teacher.name}</h4>
                        <p style={S.itemSub}>Matière : {teacher.subject}</p>
                      </div>
                      <span style={{ ...S.pill, background: teacher.status === "actif" ? "#ECFDF5" : "#FEF9C3", color: teacher.status === "actif" ? "#059669" : "#92400E" }}>
                        {teacher.status}
                      </span>
                    </div>
                    <div style={S.pillRow}>
                      <span style={{ ...S.pill, background: "#EFF6FF", color: "#2563EB" }}>
                        {teacher.formula}
                      </span>
                    </div>
                    <div style={S.btnRow}>
                      <a href="/student/chat" style={{ ...S.btn, ...S.btnPrimary }}>Ouvrir le chat</a>
                      <a href="/student/review" style={{ ...S.btn, ...S.btnGhost }}>Donner un avis</a>
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

export default StudentTeachers;