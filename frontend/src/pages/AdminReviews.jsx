import React, { useEffect, useState } from "react";

import S from "../styles/pages/AdminReviews.styles.js";
import { apiFetch } from "../config/api.js";
import Sidebar from "../components/layout/Sidebar.jsx";

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
        const res = await apiFetch("/api/reviews", { headers });
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
      const res = await apiFetch(`/api/reviews/${id}`, {
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
        {/* ── SIDEBAR ── */}
        <Sidebar role={"admin"} user={user} active={"/admin/reviews"} />

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