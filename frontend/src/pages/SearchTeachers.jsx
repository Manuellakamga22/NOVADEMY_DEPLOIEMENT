import React, { useState } from "react";

const S = {
  wrap: {
    fontFamily: "'Segoe UI', sans-serif",
    minHeight: "100vh",
    background: "#F9FAFB",
  },

  logo: { fontSize: 24, fontWeight: 800, letterSpacing: "-0.02em" },
  logoEm: { color: "#2563EB" },

  dash: {
    display: "grid",
    gridTemplateColumns: "260px 1fr",
    minHeight: "100vh",
  },

  sidebar: {
    background: "#fff",
    borderRight: "1px solid #E5E7EB",
    display: "flex",
    flexDirection: "column",
    position: "sticky",
    top: 0,
    height: "100vh",
    overflowY: "auto",
  },

  sbBrand: {
    padding: "24px 22px",
    borderBottom: "1px solid #E5E7EB",
  },

  sbRole: {
    display: "inline-block",
    marginTop: 8,
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: ".08em",
    textTransform: "uppercase",
    padding: "4px 12px",
    borderRadius: 20,
    background: "#ECFDF5",
    color: "#059669",
  },

  sbNav: { padding: 14, flex: 1 },

  sbLabel: {
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: ".12em",
    textTransform: "uppercase",
    color: "#9CA3AF",
    padding: "0 10px",
    margin: "18px 0 6px",
    display: "block",
  },

  sbLink: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "12px 14px",
    borderRadius: 9,
    fontSize: 15,
    fontWeight: 500,
    color: "#4B5563",
    textDecoration: "none",
    marginBottom: 2,
  },

  sbLinkActive: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "12px 14px",
    borderRadius: 9,
    fontSize: 15,
    fontWeight: 600,
    color: "#2563EB",
    background: "#EFF6FF",
    textDecoration: "none",
    marginBottom: 2,
  },

  sbBadge: {
    marginLeft: "auto",
    background: "#2563EB",
    color: "#fff",
    fontSize: 11,
    fontWeight: 700,
    padding: "2px 8px",
    borderRadius: 10,
  },

  sbUser: {
    padding: "18px 22px",
    borderTop: "1px solid #E5E7EB",
    display: "flex",
    alignItems: "center",
    gap: 12,
  },

  av: {
    width: 38,
    height: 38,
    borderRadius: "50%",
    background: "linear-gradient(135deg,#059669,#0891B2)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    fontWeight: 700,
    fontSize: 15,
    flexShrink: 0,
  },

  main: { padding: "36px 36px" },

  pageHead: {
    marginBottom: 32,
    paddingBottom: 24,
    borderBottom: "1px solid #F3F4F6",
  },

  pageTitle: {
    fontSize: 28,
    fontWeight: 800,
    letterSpacing: "-0.01em",
    marginBottom: 8,
  },

  pageSub: {
    fontSize: 16,
    color: "#9CA3AF",
    lineHeight: 1.6,
  },

  card: {
    background: "#fff",
    border: "1px solid #E5E7EB",
    borderRadius: 14,
    padding: "22px 24px",
    marginBottom: 18,
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: 700,
    marginBottom: 16,
  },

  cardDesc: {
    fontSize: 15,
    color: "#9CA3AF",
    lineHeight: 1.7,
    marginBottom: 16,
  },

  searchRow: {
    display: "flex",
    gap: 12,
    flexWrap: "wrap",
    alignItems: "center",
  },

  input: {
    flex: 1,
    minWidth: 180,
    padding: "12px 16px",
    borderRadius: 9,
    border: "1.5px solid #E5E7EB",
    fontFamily: "inherit",
    fontSize: 15,
    outline: "none",
    background: "#fff",
  },

  btn: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "inherit",
    fontSize: 14,
    fontWeight: 600,
    padding: "10px 20px",
    borderRadius: 9,
    border: "none",
    cursor: "pointer",
    textDecoration: "none",
  },

  btnPrimary: {
    background: "#2563EB",
    color: "#fff",
  },

  btnOutline: {
    background: "transparent",
    color: "#2563EB",
    border: "1.5px solid #2563EB",
  },

  btnSm: {
    padding: "8px 16px",
    fontSize: 13,
  },

  resultsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3,1fr)",
    gap: 14,
  },

  teacherCard: {
    background: "#fff",
    border: "1.5px solid #E5E7EB",
    borderRadius: 12,
    padding: 18,
  },

  topRow: {
    display: "flex",
    gap: 12,
    marginBottom: 12,
  },

  avatar: {
    width: 42,
    height: 42,
    borderRadius: "50%",
    background: "#2563EB",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    fontWeight: 700,
    fontSize: 14,
    flexShrink: 0,
  },

  teacherName: {
    fontSize: 15,
    fontWeight: 700,
    color: "#111827",
  },

  teacherSub: {
    fontSize: 13,
    color: "#9CA3AF",
    marginTop: 4,
  },

  tagsRow: {
    display: "flex",
    gap: 6,
    flexWrap: "wrap",
    marginBottom: 12,
  },

  pill: {
    fontSize: 12,
    fontWeight: 600,
    padding: "4px 12px",
    borderRadius: 20,
    display: "inline-block",
  },

  bottomRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 12,
    borderTop: "1px solid #F3F4F6",
  },

  price: {
    fontSize: 18,
    fontWeight: 800,
    color: "#111827",
  },

  priceSub: {
    fontSize: 11,
    color: "#9CA3AF",
    fontWeight: 400,
  },

  freeTrial: {
    fontSize: 11,
    color: "#059669",
    fontWeight: 600,
  },

  empty: {
    textAlign: "center",
    padding: "28px 20px",
    color: "#9CA3AF",
  },

  emptyIcon: {
    fontSize: 32,
    marginBottom: 12,
  },

  emptyText: {
    fontSize: 15,
  },
};

function SearchTeachers() {
  const savedUser = localStorage.getItem("user");
  const user = savedUser ? JSON.parse(savedUser) : null;

  const [filters, setFilters] = useState({
    subject: "",
    city: "",
    mode: "",
  });

  const [results, setResults] = useState([]);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSearch = async () => {
    try {
      const query = new URLSearchParams();

      if (filters.subject) query.append("subject", filters.subject);
      if (filters.city) query.append("city", filters.city);
      if (filters.mode) query.append("mode", filters.mode);

      const response = await fetch(
        `http://localhost:5000/api/announcements?${query.toString()}`
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Erreur lors de la recherche");
        return;
      }

      setResults(data);
    } catch (error) {
      alert("Erreur de connexion au serveur");
    }
  };

  return (
    <div style={S.wrap}>
      <div style={S.dash}>
        <aside style={S.sidebar}>
          <div style={S.sbBrand}>
            <div style={{ ...S.logo, fontSize: 20 }}>
              NOVA<span style={S.logoEm}>DEMY</span>
            </div>
            <span style={S.sbRole}>Élève</span>
          </div>

          <nav style={S.sbNav}>
            <span style={S.sbLabel}>Principal</span>
            <a style={S.sbLink} href="/student/dashboard">
              🏠 Tableau de bord
            </a>
            <a style={S.sbLink} href="/student/profile">
              👤 Mon profil
            </a>
            <a style={S.sbLinkActive} href="/search">
              🔍 Trouver un prof
            </a>

            <span style={S.sbLabel}>Mes cours</span>
            <a style={S.sbLink} href="/student/requests">
              📬 Mes demandes <span style={S.sbBadge}>0</span>
            </a>
            <a style={S.sbLink} href="/student/courses">
              📚 Mes cours
            </a>
            <a style={S.sbLink} href="/student/planning">
              📅 Mon calendrier
            </a>
            <a style={S.sbLink} href="student/chat">
              💬 Messages <span style={S.sbBadge}>0</span>
            </a>

            <span style={S.sbLabel}>Compte</span>
            <a style={S.sbLink} href="/student/payments">
              💳 Paiements
            </a>
            <a style={S.sbLink} href="#">
              ⭐ Donner un avis
            </a>
          </nav>

          <div style={S.sbUser}>
            <div style={S.av}>É</div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 600 }}>
                {user ? `${user.prenom} ${user.nom}` : "Prénom Nom"}
              </div>
              <div style={{ fontSize: 13, color: "#9CA3AF", marginTop: 2 }}>
                Élève
              </div>
            </div>
          </div>
        </aside>

        <main style={S.main}>
          <div style={S.pageHead}>
            <div style={S.pageTitle}>🔍 Trouver un professeur</div>
            <div style={S.pageSub}>
              Recherchez parmi les annonces déjà publiées par les professeurs selon
              la matière, la ville et le mode de cours.
            </div>
          </div>

          <div style={S.card}>
            <div style={S.cardTitle}>Recherche</div>
            <p style={S.cardDesc}>
              Saisissez vos critères pour consulter les annonces disponibles.
            </p>

            <div style={S.searchRow}>
              <input
                name="subject"
                value={filters.subject}
                onChange={handleChange}
                placeholder="Matière"
                style={S.input}
              />

              <input
                name="city"
                value={filters.city}
                onChange={handleChange}
                placeholder="Ville"
                style={S.input}
              />

              <select
                name="mode"
                value={filters.mode}
                onChange={handleChange}
                style={{ ...S.input, maxWidth: 220 }}
              >
                <option value="">Mode de formation</option>
                <option value="presentiel">Présentiel</option>
                <option value="visio">Visio</option>
                <option value="hybride">Hybride</option>
              </select>

              <button
                style={{ ...S.btn, ...S.btnPrimary }}
                onClick={handleSearch}
              >
                Lancer la recherche
              </button>
            </div>
          </div>

          <div style={S.card}>
            <div style={S.cardTitle}>Résultats des annonces</div>
            

            {results.length === 0 ? (
              <div style={S.empty}>
                <div style={S.emptyIcon}>🔎</div>
                <p style={S.emptyText}>
                  Aucune annonce affichée pour le moment.
                </p>
              </div>
            ) : (
              <div style={S.resultsGrid}>
                {results.map((teacher) => (
                  <div key={teacher.id} style={S.teacherCard}>
                    <div style={S.topRow}>
                      <div style={S.avatar}>P</div>
                      <div>
                        <div style={S.teacherName}>
                          {teacher.prenom} {teacher.nom}
                        </div>
                        <div style={S.teacherSub}>{teacher.title}</div>
                      </div>
                    </div>

                    <div style={S.tagsRow}>
                      <span style={{ ...S.pill, background: "#F3F4F6", color: "#6B7280" }}>
                        {teacher.city || "Ville"}
                      </span>
                      <span style={{ ...S.pill, background: "#EFF6FF", color: "#2563EB" }}>
                        {teacher.mode}
                      </span>
                    </div>

                    <div style={S.bottomRow}>
                      <div>
                        <div style={S.price}>
                          {teacher.studentrate} €<span style={S.priceSub}>/h</span>
                        </div>
                        <div style={S.freeTrial}>🎁 1er cours gratuit</div>
                      </div>

                      <div style={{ display: "flex", gap: 8 }}>
                                      <a
                        href={`/announcement/${teacher.id}`}
                        style={{ ...S.btn, ...S.btnOutline, ...S.btnSm }}
                           >
                          Voir
                          </a>

                        <a
                          href={`/trial-request?announcement_id=${teacher.id}&teacher_id=${teacher.teacher_id}`}
                          style={{ ...S.btn, ...S.btnPrimary, ...S.btnSm }}
                        >
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