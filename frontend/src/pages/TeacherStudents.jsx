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
  sbBadge: { marginLeft: "auto", background: "#2563EB", color: "#fff", fontSize: 12, fontWeight: 700, padding: "3px 9px", borderRadius: 10 },
  sbUser: { padding: "18px 22px", borderTop: "1px solid #E5E7EB", display: "flex", alignItems: "center", gap: 12 },
  av: { width: 42, height: 42, borderRadius: "50%", background: "linear-gradient(135deg,#2563EB,#1D4ED8)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 16, flexShrink: 0 },
  main: { padding: "30px" },
  pageTitle: { fontSize: 28, fontWeight: 800, color: "#111827", marginBottom: 6 },
  pageSub: { fontSize: 17, color: "#6B7280", marginBottom: 24, lineHeight: 1.7, maxWidth: 920 },
  stats: { display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 22 },
  statAccent: { background: "#2563EB", borderRadius: 16, padding: "22px 24px" },
  stat: { background: "#fff", border: "1px solid #E5E7EB", borderRadius: 16, padding: "22px 24px" },
  statLabelW: { fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,.78)", textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 10 },
  statLabel: { fontSize: 13, fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 10 },
  statValW: { fontSize: 32, fontWeight: 800, color: "#fff" },
  statVal: { fontSize: 32, fontWeight: 800, color: "#111827" },
  card: { background: "#fff", border: "1px solid #E5E7EB", borderRadius: 16, padding: "22px 24px", marginBottom: 18 },
  cardTitle: { fontSize: 18, fontWeight: 800, marginBottom: 14, color: "#111827" },
  studentCard: { background: "#F9FAFB", border: "1px solid #E5E7EB", borderRadius: 14, padding: 18, marginBottom: 14 },
  itemTop: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 14, flexWrap: "wrap", marginBottom: 10 },
  itemTitle: { fontSize: 18, fontWeight: 800, color: "#111827", margin: 0 },
  itemSub: { fontSize: 15, color: "#6B7280", marginTop: 6, lineHeight: 1.6 },
  pillRow: { display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 10 },
  pill: { fontSize: 12, fontWeight: 700, padding: "5px 11px", borderRadius: 999, display: "inline-block" },
  btnRow: { display: "flex", gap: 10, flexWrap: "wrap", marginTop: 10 },
  btn: { display: "inline-flex", alignItems: "center", justifyContent: "center", fontFamily: "inherit", fontSize: 15, fontWeight: 700, padding: "10px 16px", borderRadius: 10, border: "none", cursor: "pointer", textDecoration: "none" },
  btnPrimary: { background: "#2563EB", color: "#fff" },
  btnGhost: { background: "#F3F4F6", color: "#4B5563" },
  empty: { textAlign: "center", padding: "34px 20px", color: "#9CA3AF", fontSize: 15 },
  successMsg: { background: "#ECFDF5", border: "1px solid #A7F3D0", color: "#059669", borderRadius: 10, padding: "12px 16px", fontSize: 14, marginBottom: 16 },
};

function TeacherStudents() {
  const savedUser = localStorage.getItem("user");
  const user = savedUser ? JSON.parse(savedUser) : null;
  const token = localStorage.getItem("token");

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [successMsg, setSuccessMsg] = useState("");

  // charge les élèves ayant un paiement validé avec ce prof
  useEffect(() => {
    if (!user?.id) { setLoading(false); return; }
    const charger = async () => {
      try {
        // on charge les paiements du prof pour récupérer les élèves
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/payments/teacher/${user.id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (!res.ok) throw new Error();
        const data = await res.json();
        // on déduplique par student_id
        const vus = new Set();
        const uniques = data.filter(p => {
          if (vus.has(p.student_id)) return false;
          vus.add(p.student_id);
          return true;
        });
        setStudents(uniques);
      } catch {
        // pas d'erreur bloquante, on affiche vide
      } finally {
        setLoading(false);
      }
    };
    charger();
  }, []);

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
            <a style={S.sbLink} href="/teacher/announcements">📢 Annonces</a>
            <span style={S.sbLabel}>Organisation</span>
            <a style={S.sbLink} href="/teacher/planning">📅 Planning</a>
            <a style={S.sbLink} href="/teacher/requests">📬 Demandes <span style={S.sbBadge}>0</span></a>
            <a style={S.sbLinkActive} href="/teacher/students">🎓 Mes élèves</a>
            <a style={S.sbLink} href="/chat">💬 Messages</a>
            <span style={S.sbLabel}>Compte</span>
            <a style={S.sbLink} href="/teacher/revenue">💳 Revenus</a>
            <a style={S.sbLink} href="/teacher/collective/classes">👥 Classes collectives</a>
          </nav>
          <div style={S.sbUser}>
            <div style={S.av}>{user?.prenom?.[0]?.toUpperCase() || "P"}</div>
            <div>
              <div style={{ fontSize: 16, fontWeight: 700 }}>{user ? `${user.prenom} ${user.nom}` : "Prof"}</div>
              <div style={{ fontSize: 14, color: "#9CA3AF", marginTop: 2 }}>Professeur</div>
            </div>
          </div>
        </aside>

        <main style={S.main}>
          <div style={S.pageTitle}>🎓 Mes élèves</div>
          <div style={S.pageSub}>
            Les élèves apparaissent ici après qu'un paiement a été validé. Vous pouvez les contacter directement depuis cette page.
          </div>

          {successMsg && <div style={S.successMsg}>{successMsg}</div>}

          <div style={S.stats}>
            <div style={S.statAccent}>
              <div style={S.statLabelW}>Élèves suivis</div>
              <div style={S.statValW}>{students.length}</div>
            </div>
            <div style={S.stat}>
              <div style={S.statLabel}>Formules actives</div>
              <div style={S.statVal}>{students.length}</div>
            </div>
            <div style={S.stat}>
              <div style={S.statLabel}>Cours prévus</div>
              <div style={S.statVal}>—</div>
            </div>
            <div style={S.stat}>
              <div style={S.statLabel}>Total paiements</div>
              <div style={S.statVal}>{students.length}</div>
            </div>
          </div>

          <div style={S.card}>
            <div style={S.cardTitle}>Liste de mes élèves</div>
            {loading ? (
              <div style={S.empty}>Chargement…</div>
            ) : students.length === 0 ? (
              <div style={S.empty}>
                Aucun élève pour le moment.<br />
                <span style={{ fontSize: 13 }}>Les élèves apparaîtront ici après paiement validé.</span>
              </div>
            ) : (
              students.map((s, i) => (
                <div key={i} style={S.studentCard}>
                  <div style={S.itemTop}>
                    <div>
                      <h4 style={S.itemTitle}>
                        {s.student_prenom || s.prenom || "Élève"} {s.student_nom || s.nom || ""}
                      </h4>
                      <p style={S.itemSub}>
                        {s.student_email || s.email || "—"}
                      </p>
                    </div>
                    <span style={{ ...S.pill, background: "#ECFDF5", color: "#059669" }}>
                      actif
                    </span>
                  </div>

                  <div style={S.pillRow}>
                    <span style={{ ...S.pill, background: "#EFF6FF", color: "#2563EB" }}>
                      {s.amount ? `${s.amount} €` : "Paiement validé"}
                    </span>
                    <span style={{ ...S.pill, background: "#F3F4F6", color: "#4B5563" }}>
                      {s.payment_date ? new Date(s.payment_date).toLocaleDateString("fr-FR") : "—"}
                    </span>
                  </div>

                  <div style={S.btnRow}>
                    <a href="/chat" style={{ ...S.btn, ...S.btnPrimary }}>💬 Ouvrir le chat</a>
                    <a href="/teacher/planning" style={{ ...S.btn, ...S.btnGhost }}>📅 Voir le planning</a>
                  </div>
                </div>
              ))
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default TeacherStudents;
