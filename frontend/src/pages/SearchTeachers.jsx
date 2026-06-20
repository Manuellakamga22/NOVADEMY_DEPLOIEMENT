import React, { useState } from "react";

import S from "../styles/pages/SearchTeachers.styles.js";
import { apiFetch } from "../config/api.js";
import Sidebar from "../components/layout/Sidebar.jsx";

function SearchTeachers() {
  const savedUser = localStorage.getItem("user");
  const user = savedUser ? JSON.parse(savedUser) : null;

  const [filters, setFilters] = useState({ subject: "", city: "", mode: "" });
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSearch = async () => {
    setLoading(true);
    try {
      const query = new URLSearchParams();
      if (filters.subject) query.append("subject", filters.subject);
      if (filters.city) query.append("city", filters.city);
      if (filters.mode) query.append("mode", filters.mode);

      const res = await apiFetch(`/api/announcements?${query.toString()}`);
      const data = await res.json();

      if (!res.ok) { alert(data.message || "Erreur lors de la recherche"); return; }

      setResults(data);
      setSearched(true);
    } catch {
      alert("Erreur de connexion au serveur");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={S.wrap}>
      <div style={S.dash}>
        {/* ── SIDEBAR ── */}
        <Sidebar role={"eleve"} user={user} active={"/search"} />

        <main style={S.main}>
          <div style={S.pageTitle}>🔍 Trouver un professeur</div>
          <div style={S.pageSub}>
            Recherchez parmi les annonces publiées par les professeurs selon la matière, la ville et le mode de cours.
          </div>

          <div style={S.card}>
            <div style={S.cardTitle}>Recherche</div>
            <p style={S.cardDesc}>Saisissez vos critères pour consulter les annonces disponibles.</p>
            <div style={S.searchRow}>
              <input name="subject" value={filters.subject} onChange={handleChange} placeholder="Matière (ex : mathématiques)" style={S.input} />
              <input name="city" value={filters.city} onChange={handleChange} placeholder="Ville (ex : Paris)" style={S.input} />
              <select name="mode" value={filters.mode} onChange={handleChange} style={{ ...S.input, maxWidth: 200 }}>
                <option value="">Mode de cours</option>
                <option value="presentiel">Présentiel</option>
                <option value="visio">Visio</option>
                <option value="hybride">Hybride</option>
              </select>
              <button style={{ ...S.btn, ...S.btnPrimary }} onClick={handleSearch} disabled={loading}>
                {loading ? "Recherche…" : "Lancer la recherche"}
              </button>
            </div>
          </div>

          <div style={S.card}>
            <div style={S.cardTitle}>
              Résultats {searched && `(${results.length} annonce${results.length > 1 ? "s" : ""})`}
            </div>
            {!searched ? (
              <div style={S.empty}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>🔎</div>
                <p>Lancez une recherche pour voir les annonces disponibles.</p>
              </div>
            ) : results.length === 0 ? (
              <div style={S.empty}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>😕</div>
                <p>Aucune annonce pour ces critères. Essayez d'autres filtres.</p>
              </div>
            ) : (
              <div style={S.resultsGrid}>
                {results.map(t => (
                  <div key={t.id} style={S.teacherCard}>
                    <div style={S.topRow}>
                      <div style={S.avatar}>
                        {t.prenom ? t.prenom[0].toUpperCase() : "P"}
                      </div>
                      <div>
                        <div style={S.teacherName}>{t.prenom} {t.nom}</div>
                        <div style={S.teacherSub}>{t.title || t.subject}</div>
                      </div>
                    </div>

                    <div style={S.tagsRow}>
                      <span style={{ ...S.pill, background: "#F3F4F6", color: "#6B7280" }}>
                        📍 {t.city || "—"}
                      </span>
                      <span style={{ ...S.pill, background: "#EFF6FF", color: "#2563EB" }}>
                        {t.mode}
                      </span>
                      <span style={{ ...S.pill, background: "#F3F4F6", color: "#6B7280" }}>
                        {t.level}
                      </span>
                    </div>

                    <div style={S.bottomRow}>
                      <div>
                        <div style={S.price}>
                          {t.student_rate || t.studentrate || "—"} €
                          <span style={S.priceSub}>/h</span>
                        </div>
                        <div style={S.freeTrial}>🎁 1er cours d'essai</div>
                      </div>
                      <div style={{ display: "flex", gap: 8 }}>
                        <a href={`/announcement/${t.id}`}
                          style={{ ...S.btn, ...S.btnOutline, ...S.btnSm }}>
                          Voir
                        </a>
                        <a href={`/trial-request?announcement_id=${t.id}&teacher_id=${t.teacher_id}`}
                          style={{ ...S.btn, ...S.btnPrimary, ...S.btnSm }}>
                          Essai
                        </a>
                      </div>
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

export default SearchTeachers;
