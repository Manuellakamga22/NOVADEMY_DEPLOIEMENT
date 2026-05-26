import React, { useState } from "react";

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
  sbBadge: { marginLeft: "auto", background: "#2563EB", color: "#fff", fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 10 },
  sbUser: { padding: "18px 22px", borderTop: "1px solid #E5E7EB", display: "flex", alignItems: "center", gap: 12 },
  av: { width: 38, height: 38, borderRadius: "50%", background: "linear-gradient(135deg,#059669,#0891B2)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 15, flexShrink: 0 },
  main: { padding: "36px" },
  pageTitle: { fontSize: 28, fontWeight: 800, color: "#111827", marginBottom: 8 },
  pageSub: { fontSize: 15, color: "#9CA3AF", lineHeight: 1.6, marginBottom: 28 },
  card: { background: "#fff", border: "1px solid #E5E7EB", borderRadius: 14, padding: "22px 24px", marginBottom: 18 },
  cardTitle: { fontSize: 16, fontWeight: 700, marginBottom: 14 },
  cardDesc: { fontSize: 14, color: "#9CA3AF", lineHeight: 1.7, marginBottom: 16 },
  searchRow: { display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" },
  input: { flex: 1, minWidth: 160, padding: "12px 16px", borderRadius: 9, border: "1.5px solid #E5E7EB", fontFamily: "inherit", fontSize: 14, outline: "none", background: "#fff" },
  btn: { display: "inline-flex", alignItems: "center", justifyContent: "center", fontFamily: "inherit", fontSize: 14, fontWeight: 600, padding: "10px 20px", borderRadius: 9, border: "none", cursor: "pointer", textDecoration: "none" },
  btnPrimary: { background: "#2563EB", color: "#fff" },
  btnOutline: { background: "transparent", color: "#2563EB", border: "1.5px solid #2563EB" },
  btnSm: { padding: "8px 14px", fontSize: 13 },
  resultsGrid: { display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14 },
  teacherCard: { background: "#fff", border: "1.5px solid #E5E7EB", borderRadius: 12, padding: 18 },
  topRow: { display: "flex", gap: 12, marginBottom: 12 },
  avatar: { width: 42, height: 42, borderRadius: "50%", background: "#2563EB", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 14, flexShrink: 0 },
  teacherName: { fontSize: 15, fontWeight: 700, color: "#111827" },
  teacherSub: { fontSize: 13, color: "#9CA3AF", marginTop: 4 },
  tagsRow: { display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12 },
  pill: { fontSize: 12, fontWeight: 600, padding: "4px 12px", borderRadius: 20, display: "inline-block" },
  bottomRow: { display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 12, borderTop: "1px solid #F3F4F6" },
  price: { fontSize: 18, fontWeight: 800, color: "#111827" },
  priceSub: { fontSize: 11, color: "#9CA3AF", fontWeight: 400 },
  freeTrial: { fontSize: 11, color: "#059669", fontWeight: 600 },
  empty: { textAlign: "center", padding: "28px 20px", color: "#9CA3AF" },
};

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

      const res = await fetch(`http://localhost:5001/api/announcements?${query.toString()}`);
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
        <aside style={S.sidebar}>
          <div style={S.sbBrand}>
            <div style={S.logo}>NOVA<span style={S.logoEm}>DEMY</span></div>
            <span style={S.sbRole}>Élève</span>
          </div>
          <nav style={S.sbNav}>
            <span style={S.sbLabel}>Principal</span>
            <a style={S.sbLink} href="/student/dashboard">🏠 Tableau de bord</a>
            <a style={S.sbLink} href="/student/profile">👤 Mon profil</a>
            <a style={S.sbLinkActive} href="/search">🔍 Trouver un prof</a>
            <span style={S.sbLabel}>Mes cours</span>
            <a style={S.sbLink} href="/student/requests">📬 Mes demandes <span style={S.sbBadge}>0</span></a>
            <a style={S.sbLink} href="/student/courses">📚 Mes cours</a>
            <a style={S.sbLink} href="/student/planning">📅 Mon calendrier</a>
            <a style={S.sbLink} href="/student/chat">💬 Messages <span style={S.sbBadge}>0</span></a>
            <span style={S.sbLabel}>Compte</span>
            <a style={S.sbLink} href="/student/payments">💳 Paiements</a>
            <a style={S.sbLink} href="/student/review">⭐ Donner un avis</a>
          </nav>
          <div style={S.sbUser}>
            <div style={S.av}>{user?.prenom?.[0]?.toUpperCase() || "É"}</div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 600 }}>{user ? `${user.prenom} ${user.nom}` : "Élève"}</div>
              <div style={{ fontSize: 13, color: "#9CA3AF", marginTop: 2 }}>Élève</div>
            </div>
          </div>
        </aside>

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
