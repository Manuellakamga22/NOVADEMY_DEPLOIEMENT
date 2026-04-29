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
  sbUser: { padding: "18px 22px", borderTop: "1px solid #E5E7EB", display: "flex", alignItems: "center", gap: 12 },
  av: { width: 42, height: 42, borderRadius: "50%", background: "linear-gradient(135deg,#059669,#0891B2)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 16, flexShrink: 0 },
  main: { padding: "30px 32px" },
  pageTitle: { fontSize: 28, fontWeight: 800, color: "#111827", marginBottom: 6 },
  pageSub: { fontSize: 15, color: "#9CA3AF", marginBottom: 22 },
  stats: { display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, marginBottom: 24 },
  statAccent: { background: "#2563EB", borderRadius: 14, padding: "20px 22px" },
  stat: { background: "#fff", border: "1px solid #E5E7EB", borderRadius: 14, padding: "20px 22px" },
  statLabelW: { fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,.7)", textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 8 },
  statLabel: { fontSize: 12, fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 8 },
  statValW: { fontSize: 28, fontWeight: 800, color: "#fff" },
  statVal: { fontSize: 28, fontWeight: 800, color: "#111827" },
  card: { background: "#fff", border: "1px solid #E5E7EB", borderRadius: 14, padding: "22px 24px", marginBottom: 18 },
  cardTitle: { fontSize: 17, fontWeight: 700, marginBottom: 16, color: "#111827" },
  tbl: { width: "100%", borderCollapse: "collapse" },
  tblTh: { textAlign: "left", padding: "10px 14px", fontSize: 12, fontWeight: 700, letterSpacing: ".06em", textTransform: "uppercase", color: "#9CA3AF", borderBottom: "1.5px solid #E5E7EB" },
  tblTd: { padding: "14px", borderBottom: "1px solid #F3F4F6", fontSize: 14, verticalAlign: "middle" },
  pill: { fontSize: 12, fontWeight: 600, padding: "4px 12px", borderRadius: 20, display: "inline-block" },
  empty: { textAlign: "center", padding: "40px 20px", color: "#9CA3AF" },
  emptyIcon: { fontSize: 32, marginBottom: 12 },
  btn: { display: "inline-flex", alignItems: "center", justifyContent: "center", fontFamily: "inherit", fontSize: 14, fontWeight: 600, padding: "10px 18px", borderRadius: 10, border: "none", cursor: "pointer", textDecoration: "none" },
  btnPrimary: { background: "#2563EB", color: "#fff" },
  btnGhost: { background: "#F3F4F6", color: "#4B5563" },
};

const TYPE_LABELS = {
  suivi_regulier:   "Suivi régulier",
  pack_heures:      "Pack d'heures",
  classe_virtuelle: "Classe virtuelle",
};

function StudentPayments() {
  const savedUser = localStorage.getItem("user");
  const user  = savedUser ? JSON.parse(savedUser) : null;
  const token = localStorage.getItem("token");

  const [payments, setPayments] = useState([]);
  const [loading,  setLoading]  = useState(true);

  // je charge l'historique des paiements de l'élève
  useEffect(() => {
    if (!user?.id) { setLoading(false); return; }

    const fetchPayments = async () => {
      try {
        const res  = await fetch(
          `http://localhost:5000/api/payments/student/${user.id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (!res.ok) return;
        const data = await res.json();
        setPayments(Array.isArray(data) ? data : []);
      } catch { /* silencieux */ }
      finally  { setLoading(false); }
    };

    fetchPayments();
  }, []);

  const totalPaid = payments.reduce((acc, p) => acc + Number(p.amount || 0), 0);

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
            <a style={S.sbLink} href="/student/teachers">👩‍🏫 Mes professeurs</a>
            <a style={S.sbLink} href="/student/planning">📅 Mon calendrier</a>
            <a style={S.sbLink} href="/student/chat">💬 Messages</a>
            <span style={S.sbLabel}>Compte</span>
            <a style={S.sbLinkActive} href="/student/payments">💳 Mes paiements</a>
            <a style={S.sbLink} href="/student/review">⭐ Avis</a>
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
          <div style={S.pageTitle}>Mes paiements</div>
          <div style={S.pageSub}>Historique de tous vos paiements effectués sur NOVADEMY.</div>

          <div style={S.stats}>
            <div style={S.statAccent}>
              <div style={S.statLabelW}>Total payé</div>
              <div style={S.statValW}>{loading ? "…" : `${totalPaid.toFixed(2)} €`}</div>
            </div>
            <div style={S.stat}>
              <div style={S.statLabel}>Paiements</div>
              <div style={S.statVal}>{loading ? "…" : payments.length}</div>
            </div>
            <div style={S.stat}>
              <div style={S.statLabel}>Profs payés</div>
              <div style={S.statVal}>{loading ? "…" : new Set(payments.map(p => p.teacher_id)).size}</div>
            </div>
          </div>

          <div style={S.card}>
            <div style={S.cardTitle}>Historique des paiements</div>

            {loading ? (
              <div style={S.empty}><p>Chargement…</p></div>
            ) : payments.length === 0 ? (
              <div style={S.empty}>
                <div style={S.emptyIcon}>💳</div>
                <p>Aucun paiement effectué pour le moment.</p>
                <a href="/student/packs" style={{ ...S.btn, ...S.btnPrimary, marginTop: 12, display: "inline-flex" }}>
                  Voir mes formules
                </a>
              </div>
            ) : (
              <table style={S.tbl}>
                <thead>
                  <tr>
                    <th style={S.tblTh}>Professeur</th>
                    <th style={S.tblTh}>Formule</th>
                    <th style={S.tblTh}>Montant</th>
                    <th style={S.tblTh}>Moyen de paiement</th>
                    <th style={S.tblTh}>Date</th>
                    <th style={S.tblTh}>Statut</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((p) => (
                    <tr key={p.id}>
                      <td style={S.tblTd}>
                        <div style={{ fontWeight: 600 }}>
                          {p.teacher_prenom || ""} {p.teacher_nom || ""}
                        </div>
                      </td>
                      <td style={S.tblTd}>
                        {TYPE_LABELS[p.formula_type] || p.formula_type || "—"}
                      </td>
                      <td style={S.tblTd}>
                        <strong>{Number(p.amount).toFixed(2)} €</strong>
                      </td>
                      <td style={S.tblTd}>{p.payment_method || "—"}</td>
                      <td style={S.tblTd}>
                        {p.payment_date
                          ? new Date(p.payment_date).toLocaleDateString("fr-FR")
                          : p.created_at
                          ? new Date(p.created_at).toLocaleDateString("fr-FR")
                          : "—"}
                      </td>
                      <td style={S.tblTd}>
                        <span style={{ ...S.pill, background: "#ECFDF5", color: "#059669" }}>
                          Validé
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default StudentPayments;