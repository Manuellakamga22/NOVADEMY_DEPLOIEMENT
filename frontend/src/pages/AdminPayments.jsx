import React, { useEffect, useState } from "react";

const S = {
  wrap: { fontFamily: "'Segoe UI', sans-serif", minHeight: "100vh", background: "#F9FAFB" },
  logo: { fontSize: 20, fontWeight: 800 },
  logoEm: { color: "#2563EB" },

  dash: { display: "grid", gridTemplateColumns: "240px 1fr", minHeight: "100vh" },

  sidebar: {
    background: "#fff",
    borderRight: "1px solid #E5E7EB",
    display: "flex",
    flexDirection: "column",
    position: "sticky",
    top: 0,
    height: "100vh",
  },

  sbBrand: { padding: 20, borderBottom: "1px solid #E5E7EB" },

  sbRole: {
    marginTop: 6,
    fontSize: 10,
    fontWeight: 700,
    textTransform: "uppercase",
    padding: "2px 10px",
    borderRadius: 20,
    background: "#FEF2F2",
    color: "#DC2626",
    display: "inline-block",
  },

  sbNav: { padding: 12, flex: 1 },

  sbLink: {
    display: "flex",
    padding: "10px 12px",
    borderRadius: 8,
    fontSize: 13,
    color: "#4B5563",
    textDecoration: "none",
    marginBottom: 2,
  },

  sbLinkActive: {
    display: "flex",
    padding: "10px 12px",
    borderRadius: 8,
    fontSize: 13,
    color: "#2563EB",
    background: "#EFF6FF",
    textDecoration: "none",
    marginBottom: 2,
  },

  sbUser: {
    padding: "14px 20px",
    borderTop: "1px solid #E5E7EB",
    display: "flex",
    alignItems: "center",
    gap: 10,
  },

  av: {
    width: 34,
    height: 34,
    borderRadius: "50%",
    background: "linear-gradient(135deg,#6B7280,#374151)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    fontWeight: 700,
    fontSize: 12,
    flexShrink: 0,
  },

  main: { padding: 30 },

  pageTitle: { fontSize: 24, fontWeight: 800 },
  pageSub:   { fontSize: 14, color: "#9CA3AF", marginBottom: 20 },

  stats: {
    display: "grid",
    gridTemplateColumns: "repeat(4,1fr)",
    gap: 14,
    marginBottom: 20,
  },

  stat: {
    background: "#fff",
    border: "1px solid #E5E7EB",
    borderRadius: 12,
    padding: 18,
  },

  statAccent: {
    background: "#2563EB",
    borderRadius: 12,
    padding: 18,
    color: "white",
  },

  statLabel: {
    fontSize: 11,
    fontWeight: 600,
    color: "#9CA3AF",
    textTransform: "uppercase",
    letterSpacing: ".06em",
    marginBottom: 8,
  },

  statLabelW: {
    fontSize: 11,
    fontWeight: 600,
    color: "rgba(255,255,255,.7)",
    textTransform: "uppercase",
    letterSpacing: ".06em",
    marginBottom: 8,
  },

  statVal:  { fontSize: 28, fontWeight: 800, color: "#111827" },
  statValW: { fontSize: 28, fontWeight: 800, color: "#fff" },

  searchRow: {
    display: "grid",
    gridTemplateColumns: "1fr 140px",
    gap: 10,
    marginBottom: 14,
  },

  input: {
    width: "100%",
    padding: "10px 14px",
    borderRadius: 8,
    border: "1.5px solid #E5E7EB",
    fontFamily: "inherit",
    fontSize: 13,
    outline: "none",
    boxSizing: "border-box",
    background: "#fff",
  },

  tbl: { width: "100%", borderCollapse: "collapse" },

  tblTh: {
    textAlign: "left",
    padding: 10,
    fontSize: 11,
    color: "#9CA3AF",
    borderBottom: "1px solid #E5E7EB",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: ".06em",
  },

  tblTd: {
    padding: 12,
    borderBottom: "1px solid #F3F4F6",
    fontSize: 13,
  },

  pill: {
    fontSize: 11,
    fontWeight: 600,
    padding: "3px 10px",
    borderRadius: 20,
    display: "inline-block",
  },

  btn: {
    padding: "8px 14px",
    borderRadius: 8,
    fontSize: 12,
    fontWeight: 600,
    border: "none",
    cursor: "pointer",
    fontFamily: "inherit",
  },

  btnPrimary: { background: "#2563EB", color: "white" },
  btnGhost:   { background: "#F3F4F6", color: "#4B5563" },
};

const TYPE_LABELS = {
  suivi_regulier:   "Suivi régulier",
  pack_heures:      "Pack d'heures",
  classe_virtuelle: "Classe virtuelle",
};

function AdminPayments() {
  const savedUser = localStorage.getItem("user");
  const user  = savedUser ? JSON.parse(savedUser) : null;
  const token = localStorage.getItem("token");

  const [payments, setPayments] = useState([]);
  const [search,   setSearch]   = useState("");
  const [loading,  setLoading]  = useState(true);

  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const res = await fetch("http://localhost:5001/api/payments", { headers });
        if (res.ok) {
          const data = await res.json();
          setPayments(Array.isArray(data) ? data : []);
        }
      } catch {
        // silencieux
      } finally {
        setLoading(false);
      }
    };
    fetchPayments();
  }, []);

  // Filtrage
  const filtered = payments.filter((p) => {
    if (search === "") return true;
    const name = `${p.student_prenom || ""} ${p.student_nom || ""}`.toLowerCase();
    return name.includes(search.toLowerCase());
  });

  // Stats
  const totalAmount    = payments.reduce((acc, p) => acc + Number(p.amount || 0), 0);
  const countPayments  = payments.length;

  return (
    <div style={S.wrap}>
      <div style={S.dash}>
        {/* ── SIDEBAR ── */}
        <aside style={S.sidebar}>
          <div style={S.sbBrand}>
            <div style={S.logo}>NOVA<span style={S.logoEm}>DEMY</span></div>
            <span style={S.sbRole}>Admin</span>
          </div>

          <nav style={S.sbNav}>
            <a href="/admin/dashboard"     style={S.sbLink}>📊 Dashboard</a>
            <a href="/admin/teachers"      style={S.sbLink}>👩‍🏫 Professeurs</a>
            <a href="/admin/students"      style={S.sbLink}>🎓 Élèves</a>
            <a href="/admin/announcements" style={S.sbLink}>📢 Annonces</a>
            <a href="/admin/trials"        style={S.sbLink}>🧪 Cours d'essai</a>
            <a href="/admin/payments"      style={S.sbLinkActive}>💳 Paiements</a>
            <a href="/admin/stats"         style={S.sbLink}>📈 Statistiques</a>
            <a href="/admin/settings"      style={S.sbLink}>⚙️ Paramètres</a>
          </nav>

          <div style={S.sbUser}>
            <div style={S.av}>
              {user?.prenom?.[0]?.toUpperCase() || "A"}
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600 }}>
                {user ? `${user.prenom} ${user.nom}` : "Administrateur"}
              </div>
              <div style={{ fontSize: 11, color: "#9CA3AF" }}>Super Admin</div>
            </div>
          </div>
        </aside>

        {/* ── MAIN ── */}
        <main style={S.main}>
          <div style={S.pageTitle}>Paiements plateforme</div>
          <div style={S.pageSub}>Suivi des paiements après acceptation formule</div>

          {/* ── STATS ── */}
          <div style={S.stats}>
            <div style={S.statAccent}>
              <div style={S.statLabelW}>Total paiements</div>
              <div style={S.statValW}>{loading ? "…" : `${totalAmount.toFixed(2)} €`}</div>
            </div>
            <div style={S.stat}>
              <div style={S.statLabel}>Paiements validés</div>
              <div style={S.statVal}>{loading ? "…" : countPayments}</div>
            </div>
            <div style={S.stat}>
              <div style={S.statLabel}>Élèves payeurs</div>
              <div style={S.statVal}>
                {loading ? "…" : new Set(payments.map((p) => p.student_id)).size}
              </div>
            </div>
            <div style={S.stat}>
              <div style={S.statLabel}>Remboursements</div>
              <div style={S.statVal}>0</div>
            </div>
          </div>

          {/* ── RECHERCHE ── */}
          <div style={S.searchRow}>
            <input
              style={S.input}
              placeholder="Rechercher un élève"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              style={{ ...S.btn, ...S.btnGhost }}
              onClick={() => setSearch("")}
            >
              Réinitialiser
            </button>
          </div>

          {/* ── TABLEAU ── */}
          <table style={S.tbl}>
            <thead>
              <tr>
                <th style={S.tblTh}>Élève</th>
                <th style={S.tblTh}>Formule</th>
                <th style={S.tblTh}>Montant</th>
                <th style={S.tblTh}>Moyen</th>
                <th style={S.tblTh}>Date</th>
                <th style={S.tblTh}>Statut</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" style={{ padding: 20, textAlign: "center", color: "#9CA3AF" }}>
                    Chargement…
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ padding: 20, textAlign: "center", color: "#9CA3AF" }}>
                    Aucun paiement pour le moment.
                  </td>
                </tr>
              ) : (
                filtered.map((p) => (
                  <tr key={p.id}>
                    <td style={S.tblTd}>
                      <div style={{ fontWeight: 600 }}>
                        {p.student_prenom} {p.student_nom}
                      </div>
                    </td>
                    <td style={S.tblTd}>
                      {TYPE_LABELS[p.formula_type] || p.formula_type || `#${p.pack_id}`}
                    </td>
                    <td style={S.tblTd}>
                      <strong>{Number(p.amount).toFixed(2)} €</strong>
                    </td>
                    <td style={S.tblTd}>
                      {p.payment_method || "—"}
                    </td>
                    <td style={S.tblTd}>
                      {p.payment_date
                        ? new Date(p.payment_date).toLocaleDateString("fr-FR")
                        : "—"}
                    </td>
                    <td style={S.tblTd}>
                      <span style={{
                        ...S.pill,
                        background: "#ECFDF5",
                        color: "#059669",
                      }}>
                        Validé
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </main>
      </div>
    </div>
  );
}

export default AdminPayments;