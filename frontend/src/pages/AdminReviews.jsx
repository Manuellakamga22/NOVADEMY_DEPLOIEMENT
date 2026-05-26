import React, { useEffect, useState } from "react";

const S = {
  wrap: { fontFamily: "'Segoe UI', sans-serif", minHeight: "100vh", background: "#F9FAFB" },
  logo: { fontSize: 20, fontWeight: 800 },
  logoEm: { color: "#2563EB" },
  dash: { display: "grid", gridTemplateColumns: "240px 1fr", minHeight: "100vh" },
  sidebar: { background: "#fff", borderRight: "1px solid #E5E7EB", display: "flex", flexDirection: "column", position: "sticky", top: 0, height: "100vh", overflowY: "auto" },
  sbBrand: { padding: 20, borderBottom: "1px solid #E5E7EB" },
  sbRole: { display: "inline-block", marginTop: 6, fontSize: 10, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", padding: "2px 10px", borderRadius: 20, background: "#FEF2F2", color: "#DC2626" },
  sbNav: { padding: 12, flex: 1 },
  sbLabel: { fontSize: 10, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "#9CA3AF", padding: "0 10px", margin: "14px 0 4px", display: "block" },
  sbLink: { display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 8, fontSize: 13, fontWeight: 500, color: "#4B5563", textDecoration: "none", marginBottom: 1 },
  sbLinkActive: { display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 8, fontSize: 13, fontWeight: 600, color: "#2563EB", background: "#EFF6FF", textDecoration: "none", marginBottom: 1 },
  sbBadge: { marginLeft: "auto", background: "#EA580C", color: "#fff", fontSize: 10, fontWeight: 700, padding: "1px 6px", borderRadius: 10 },
  sbUser: { padding: "14px 20px", borderTop: "1px solid #E5E7EB", display: "flex", alignItems: "center", gap: 10 },
  av: { width: 34, height: 34, borderRadius: "50%", background: "linear-gradient(135deg,#6B7280,#374151)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 12, flexShrink: 0 },
  main: { padding: "28px 32px" },
  pageTitle: { fontSize: 24, fontWeight: 800, marginBottom: 6 },
  pageSub: { fontSize: 14, color: "#9CA3AF", marginBottom: 20 },
  stats: { display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginBottom: 22 },
  statAccent: { background: "#2563EB", border: "1px solid #2563EB", borderRadius: 12, padding: 18 },
  stat: { background: "#fff", border: "1px solid #E5E7EB", borderRadius: 12, padding: 18 },
  statLabelW: { fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,.7)", textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 8 },
  statLabel: { fontSize: 11, fontWeight: 600, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 8 },
  statValW: { fontSize: 28, fontWeight: 800, color: "#fff" },
  statVal: { fontSize: 28, fontWeight: 800, color: "#111827" },
  card: { background: "#fff", border: "1px solid #E5E7EB", borderRadius: 12, padding: 20, marginBottom: 16 },
  cardTitle: { fontSize: 15, fontWeight: 700, marginBottom: 14, display: "flex", alignItems: "center", justifyContent: "space-between" },
  searchRow: { display: "grid", gridTemplateColumns: "1fr 160px 120px", gap: 10, marginBottom: 14 },
  input: { width: "100%", padding: "11px 14px", borderRadius: 8, border: "1.5px solid #E5E7EB", fontFamily: "inherit", fontSize: 13, outline: "none", boxSizing: "border-box", background: "#fff" },
  btn: { display: "inline-flex", alignItems: "center", justifyContent: "center", fontFamily: "inherit", fontSize: 12, fontWeight: 600, padding: "8px 14px", borderRadius: 8, border: "none", cursor: "pointer", textDecoration: "none" },
  btnGhost: { background: "#F3F4F6", color: "#4B5563" },
  btnDanger: { background: "#FEF2F2", color: "#DC2626" },
  tbl: { width: "100%", borderCollapse: "collapse" },
  tblTh: { textAlign: "left", padding: "9px 12px", fontSize: 11, fontWeight: 700, letterSpacing: ".06em", textTransform: "uppercase", color: "#9CA3AF", borderBottom: "1.5px solid #E5E7EB" },
  tblTd: { padding: "12px", borderBottom: "1px solid #F3F4F6", fontSize: 13, verticalAlign: "top" },
  pill: { fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 20, display: "inline-block" },
  stars: { color: "#F59E0B", fontSize: 14, letterSpacing: 1 },
  comment: { fontSize: 12, color: "#6B7280", fontStyle: "italic", marginTop: 4, maxWidth: 260 },
  empty: { textAlign: "center", padding: "28px 20px", color: "#9CA3AF" },
  emptyIcon: { fontSize: 28, marginBottom: 10 },
};

function StarRating({ rating }) {
  return (
    <span style={S.stars}>
      {"★".repeat(Number(rating))}{"☆".repeat(5 - Number(rating))}
    </span>
  );
}

function AdminReviews() {
  const savedUser = localStorage.getItem("user");
  const user  = savedUser ? JSON.parse(savedUser) : null;
  const token = localStorage.getItem("token");
  const headers = { Authorization: `Bearer ${token}` };

  const [reviews,      setReviews]      = useState([]);
  const [search,       setSearch]       = useState("");
  const [filterRating, setFilterRating] = useState("");
  const [loading,      setLoading]      = useState(true);
  const [deletingId,   setDeletingId]   = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch("http://localhost:5001/api/reviews", { headers });
        if (res.ok) {
          const data = await res.json();
          setReviews(Array.isArray(data) ? data : []);
        }
      } catch { /* silencieux */ }
      finally { setLoading(false); }
    };
    fetchReviews();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Supprimer cet avis définitivement ?")) return;
    setDeletingId(id);
    try {
      const res = await fetch(`http://localhost:5001/api/reviews/${id}`, {
        method: "DELETE",
        headers,
      });
      if (res.ok) {
        setReviews((prev) => prev.filter((r) => r.id !== id));
      }
    } catch { /* silencieux */ }
    finally { setDeletingId(null); }
  };

  // Filtrage
  const filtered = reviews.filter((r) => {
    const studentName = `${r.student_prenom || ""} ${r.student_nom || ""}`.toLowerCase();
    const teacherName = `${r.teacher_prenom || ""} ${r.teacher_nom || ""}`.toLowerCase();
    const matchSearch =
      search === "" ||
      studentName.includes(search.toLowerCase()) ||
      teacherName.includes(search.toLowerCase()) ||
      (r.comment || "").toLowerCase().includes(search.toLowerCase());
    const matchRating =
      filterRating === "" || String(r.rating) === filterRating;
    return matchSearch && matchRating;
  });

  // Stats
  const avgRating = reviews.length > 0
    ? (reviews.reduce((acc, r) => acc + Number(r.rating), 0) / reviews.length).toFixed(1)
    : "—";
  const count5 = reviews.filter((r) => Number(r.rating) === 5).length;
  const count1 = reviews.filter((r) => Number(r.rating) <= 2).length;

  return (
    <div style={S.wrap}>
      <div style={S.dash}>

        {/* ── SIDEBAR ── */}
        <aside style={S.sidebar}>
          <div style={S.sbBrand}>
            <div style={{ ...S.logo, fontSize: 17 }}>
              NOVA<span style={S.logoEm}>DEMY</span>
            </div>
            <span style={S.sbRole}>Admin</span>
          </div>
          <nav style={S.sbNav}>
            <span style={S.sbLabel}>Vue globale</span>
            <a style={S.sbLink} href="/admin/dashboard">📊 Tableau de bord</a>
            <a style={S.sbLink} href="/admin/teachers">👩‍🏫 Professeurs</a>
            <a style={S.sbLink} href="/admin/students">🎓 Élèves</a>
            <a style={S.sbLink} href="/admin/announcements">📢 Annonces</a>
            <span style={S.sbLabel}>Suivi</span>
            <a style={S.sbLink} href="/admin/trials">🧪 Cours d'essai</a>
            <a style={S.sbLinkActive} href="/admin/reviews">💬 Modération avis</a>
            <a style={S.sbLink} href="/admin/payments">💳 Paiements</a>
            <span style={S.sbLabel}>Finance</span>
            <a style={S.sbLink} href="/admin/stats">📈 Statistiques</a>
            <a style={S.sbLink} href="/admin/settings">⚙️ Paramètres</a>
          </nav>
          <div style={S.sbUser}>
            <div style={S.av}>{user?.prenom?.[0]?.toUpperCase() || "A"}</div>
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
          <div style={S.pageTitle}>Modération des avis</div>
          <div style={S.pageSub}>Consultez et supprimez les avis laissés par les élèves</div>

          {/* ── STATS ── */}
          <div style={S.stats}>
            <div style={S.statAccent}>
              <div style={S.statLabelW}>Total avis</div>
              <div style={S.statValW}>{loading ? "…" : reviews.length}</div>
            </div>
            <div style={S.stat}>
              <div style={S.statLabel}>Note moyenne</div>
              <div style={S.statVal}>{loading ? "…" : `${avgRating} / 5`}</div>
            </div>
            <div style={S.stat}>
              <div style={S.statLabel}>5 étoiles</div>
              <div style={S.statVal}>{loading ? "…" : count5}</div>
            </div>
            <div style={S.stat}>
              <div style={S.statLabel}>Notes ≤ 2</div>
              <div style={S.statVal}>{loading ? "…" : count1}</div>
            </div>
          </div>

          {/* ── LISTE ── */}
          <div style={S.card}>
            <div style={S.cardTitle}>Liste des avis</div>

            <div style={S.searchRow}>
              <input
                style={S.input}
                placeholder="Rechercher élève, prof ou commentaire"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <select
                style={S.input}
                value={filterRating}
                onChange={(e) => setFilterRating(e.target.value)}
              >
                <option value="">Toutes notes</option>
                <option value="5">★★★★★ (5)</option>
                <option value="4">★★★★☆ (4)</option>
                <option value="3">★★★☆☆ (3)</option>
                <option value="2">★★☆☆☆ (2)</option>
                <option value="1">★☆☆☆☆ (1)</option>
              </select>
              <button
                style={{ ...S.btn, ...S.btnGhost }}
                onClick={() => { setSearch(""); setFilterRating(""); }}
              >
                Réinitialiser
              </button>
            </div>

            {loading ? (
              <div style={S.empty}><p>Chargement…</p></div>
            ) : filtered.length === 0 ? (
              <div style={S.empty}>
                <div style={S.emptyIcon}>💬</div>
                <p>Aucun avis trouvé.</p>
              </div>
            ) : (
              <div style={{ overflowX: "auto" }}>
                <table style={S.tbl}>
                  <thead>
                    <tr>
                      <th style={S.tblTh}>Élève</th>
                      <th style={S.tblTh}>Professeur</th>
                      <th style={S.tblTh}>Note</th>
                      <th style={S.tblTh}>Commentaire</th>
                      <th style={S.tblTh}>Date</th>
                      <th style={S.tblTh}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((r) => (
                      <tr key={r.id}>
                        <td style={S.tblTd}>
                          <div style={{ fontWeight: 600 }}>
                            {r.student_prenom} {r.student_nom}
                          </div>
                        </td>
                        <td style={S.tblTd}>
                          {r.teacher_prenom} {r.teacher_nom}
                        </td>
                        <td style={S.tblTd}>
                          <StarRating rating={r.rating} />
                          <div style={{ fontSize: 11, color: "#9CA3AF", marginTop: 2 }}>
                            {r.rating} / 5
                          </div>
                        </td>
                        <td style={S.tblTd}>
                          <div style={S.comment}>
                            {r.comment || <em style={{ color: "#D1D5DB" }}>Aucun commentaire</em>}
                          </div>
                        </td>
                        <td style={S.tblTd}>
                          {r.created_at
                            ? new Date(r.created_at).toLocaleDateString("fr-FR")
                            : "—"}
                        </td>
                        <td style={S.tblTd}>
                          <button
                            style={{
                              ...S.btn,
                              ...S.btnDanger,
                              opacity: deletingId === r.id ? 0.5 : 1,
                              cursor:  deletingId === r.id ? "not-allowed" : "pointer",
                            }}
                            onClick={() => handleDelete(r.id)}
                            disabled={deletingId === r.id}
                          >
                            {deletingId === r.id ? "…" : "Supprimer"}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminReviews;