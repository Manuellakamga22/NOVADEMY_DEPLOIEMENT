import React, { useEffect, useState } from "react";

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

  pageHead: {
    marginBottom: 32,
    paddingBottom: 24,
    borderBottom: "1px solid #F3F4F6",
  },

  stats: {
    display: "grid",
    gridTemplateColumns: "repeat(4,1fr)",
    gap: 16,
    marginBottom: 28,
  },

  statAccent: {
    background: "#059669",
    border: "1px solid #059669",
    borderRadius: 14,
    padding: "20px 22px",
  },

  stat: {
    background: "#fff",
    border: "1px solid #E5E7EB",
    borderRadius: 14,
    padding: "20px 22px",
  },

  statLabelW: {
    fontSize: 12,
    fontWeight: 600,
    color: "rgba(255,255,255,.7)",
    textTransform: "uppercase",
    letterSpacing: ".06em",
    marginBottom: 10,
  },

  statLabel: {
    fontSize: 12,
    fontWeight: 600,
    color: "#9CA3AF",
    textTransform: "uppercase",
    letterSpacing: ".06em",
    marginBottom: 10,
  },

  statValW: { fontSize: 30, fontWeight: 800, color: "#fff" },
  statVal: { fontSize: 30, fontWeight: 800, color: "#111827" },

  g2: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 18,
    marginBottom: 18,
  },

  g3: {
    display: "grid",
    gridTemplateColumns: "repeat(3,1fr)",
    gap: 14,
  },

  card: {
    background: "#fff",
    border: "1px solid #E5E7EB",
    borderRadius: 14,
    padding: "22px 24px",
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: 700,
    marginBottom: 16,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },

  cardAction: {
    fontSize: 13,
    fontWeight: 500,
    color: "#2563EB",
    textDecoration: "none",
  },

  cardDesc: {
    fontSize: 15,
    color: "#9CA3AF",
    lineHeight: 1.7,
    marginBottom: 16,
  },

  btn: {
    display: "inline-flex",
    alignItems: "center",
    fontFamily: "inherit",
    fontSize: 14,
    fontWeight: 600,
    padding: "10px 20px",
    borderRadius: 9,
    border: "none",
    cursor: "pointer",
    textDecoration: "none",
  },

  btnPrimary: { background: "#2563EB", color: "#fff" },
  btnGhost: { background: "#F3F4F6", color: "#4B5563" },
  btnOutline: {
    background: "transparent",
    color: "#2563EB",
    border: "1.5px solid #2563EB",
  },

  btnSm: { padding: "8px 16px", fontSize: 13 },
  btnFull: {
    width: "100%",
    justifyContent: "center",
    padding: "13px",
    marginTop: 14,
    fontSize: 15,
  },

  empty: {
    textAlign: "center",
    padding: "28px 20px",
    color: "#9CA3AF",
  },

  emptyIcon: { fontSize: 32, marginBottom: 12 },
  emptyText: { fontSize: 15 },

  pill: {
    fontSize: 12,
    fontWeight: 600,
    padding: "4px 12px",
    borderRadius: 20,
    display: "inline-block",
  },

  searchInput: {
    flex: 1,
    minWidth: 160,
    padding: "12px 16px",
    borderRadius: 9,
    border: "1.5px solid #E5E7EB",
    fontFamily: "inherit",
    fontSize: 15,
    outline: "none",
  },

  trialRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "12px 0",
    borderBottom: "1px solid #F3F4F6",
    fontSize: 14,
  },
};

// Correspondance statut → couleur pill
const TRIAL_STATUS = {
  pending:   { bg: "#FFF7ED", col: "#EA580C", label: "En attente" },
  accepted:  { bg: "#ECFDF5", col: "#059669", label: "Validée" },
  postponed: { bg: "#EFF6FF", col: "#2563EB", label: "Reportée" },
  refused:   { bg: "#FEF2F2", col: "#DC2626", label: "Refusée" },
  done:      { bg: "#F3F4F6", col: "#6B7280", label: "Effectuée" },
};

function StudentDashboard() {
  const savedUser = localStorage.getItem("user");
  const user = savedUser ? JSON.parse(savedUser) : null;
  const token = localStorage.getItem("token");

  // Données chargées depuis l'API
  const [trials, setTrials] = useState([]);
  const [payments, setPayments] = useState([]);
  const [profile, setProfile] = useState(null);
  const [teachers, setTeachers] = useState([]); // profs depuis /api/announcements
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.id) { setLoading(false); return; }

    const headers = { Authorization: `Bearer ${token}` };

    const fetchAll = async () => {
      try {
        // 1. Demandes d'essai de l'élève
        const trialsRes = await fetch(
          `http://localhost:5001/api/trials/student/${user.id}`,
          { headers }
        );
        if (trialsRes.ok) {
          const data = await trialsRes.json();
          setTrials(Array.isArray(data) ? data : []);
        }

        // 2. Paiements de l'élève (= cours actifs)
        const paymentsRes = await fetch(
          `http://localhost:5001/api/payments/student/${user.id}`,
          { headers }
        );
        if (paymentsRes.ok) {
          const data = await paymentsRes.json();
          setPayments(Array.isArray(data) ? data : []);
        }

        // 3. Profil élève
        const profileRes = await fetch(
          `http://localhost:5001/api/student-profile/${user.id}`,
          { headers }
        );
        if (profileRes.ok) {
          const data = await profileRes.json();
          setProfile(data || null);
        }

        // 4. Profs recommandés (3 premiers de l'annuaire)
        const teachersRes = await fetch(
          `http://localhost:5001/api/announcements`,
          { headers }
        );
        if (teachersRes.ok) {
          const data = await teachersRes.json();
          setTeachers(Array.isArray(data) ? data.slice(0, 3) : []);
        }
      } catch {
        // silencieux : les compteurs resteront à 0
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  // Compteurs
  const countCours    = payments.length;
  const countTrials   = trials.length;
  const countPending  = trials.filter((t) => t.status === "pending").length;

  // Initiales avatar
  const initiale = user ? user.prenom?.[0]?.toUpperCase() : "É";

  // Couleurs avatar pour les profs recommandés
  const COLORS = ["#2563EB", "#059669", "#EA580C"];

  return (
    <div style={S.wrap}>
      <div style={S.dash}>
        {/* ── SIDEBAR ── */}
        <aside style={S.sidebar}>
          <div style={S.sbBrand}>
            <div style={{ ...S.logo, fontSize: 20 }}>
              NOVA<span style={S.logoEm}>DEMY</span>
            </div>
            <span style={S.sbRole}>Élève</span>
          </div>

          <nav style={S.sbNav}>
            <span style={S.sbLabel}>Principal</span>
            <a style={S.sbLinkActive} href="/student/dashboard">
              🏠 Tableau de bord
            </a>
            <a style={S.sbLink} href="/student/profile">
              👤 Mon profil
            </a>
            <a style={S.sbLink} href="/search">
              🔍 Trouver un prof
            </a>
            <a style={S.sbLink} href="/student/teachers">
              👩‍🏫 Mes professeurs
            </a>

            <span style={S.sbLabel}>Mes cours</span>
            <a style={S.sbLink} href="/trial-request">
              📬 Demandes d'essai{" "}
              {countPending > 0 && (
                <span style={S.sbBadge}>{countPending}</span>
              )}
            </a>
            <a style={S.sbLink} href="/student/courses">
              📚 Mes cours
            </a>
            <a style={S.sbLink} href="/student/planning">
              📅 Mon calendrier
            </a>
            <a style={S.sbLink} href="/student/chat">
              💬 Messages
            </a>
            <a style={S.sbLink} href="/notifications">
              🔔 Notifications
            </a>

            <span style={S.sbLabel}>Compte</span>
            <a style={S.sbLink} href="/payment">
              💳 Paiements
            </a>
            <a style={S.sbLink} href="/student/review">
              ⭐ Donner un avis
            </a>
          </nav>

          <div style={S.sbUser}>
            <div style={S.av}>{initiale}</div>
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

        {/* ── MAIN ── */}
        <main style={S.main}>
          <div style={S.pageHead}>
            <div style={S.pageTitle}>
              👋 Bienvenue{user ? `, ${user.prenom}` : " dans votre espace élève"}
            </div>
            <div style={S.pageSub}>
              Recherchez un professeur, demandez un cours d'essai, suivez vos
              cours et donnez votre avis.
            </div>
          </div>

          {/* ── STATS ── */}
          <div style={S.stats}>
            <div style={S.statAccent}>
              <div style={S.statLabelW}>Mes cours</div>
              <div style={S.statValW}>{loading ? "…" : countCours}</div>
            </div>
            <div style={S.stat}>
              <div style={S.statLabel}>Demandes d'essai</div>
              <div style={S.statVal}>{loading ? "…" : countTrials}</div>
            </div>
            <div style={S.stat}>
              <div style={S.statLabel}>Messages</div>
              <div style={S.statVal}>
                <a href="/student/chat" style={{ color: "#111827", textDecoration: "none" }}>
                  →
                </a>
              </div>
            </div>
            <div style={S.stat}>
              <div style={S.statLabel}>Avis à donner</div>
              <div style={S.statVal}>
                <a href="/student/review" style={{ color: "#111827", textDecoration: "none" }}>
                  →
                </a>
              </div>
            </div>
          </div>

          {/* ── BARRE DE RECHERCHE ── */}
          <div style={{ ...S.card, marginBottom: 18 }}>
            <div style={S.cardTitle}>🔍 Rechercher un professeur</div>
            <div
              style={{
                display: "flex",
                gap: 12,
                flexWrap: "wrap",
                alignItems: "center",
              }}
            >
              <input style={S.searchInput} placeholder="Matière" />
              <input style={S.searchInput} placeholder="Ville" />
              <select style={{ ...S.searchInput, maxWidth: 200 }}>
                <option>Mode de formation</option>
                <option>Présentiel</option>
                <option>Visio</option>
              </select>
              <a href="/search" style={{ ...S.btn, ...S.btnPrimary }}>
                Lancer la recherche
              </a>
            </div>
          </div>

          {/* ── PROFS RECOMMANDÉS ── */}
          <div style={{ ...S.card, marginBottom: 18 }}>
            <div style={S.cardTitle}>👩‍🏫 Professeurs recommandés</div>
            {loading ? (
              <div style={S.empty}>
                <p style={S.emptyText}>Chargement…</p>
              </div>
            ) : teachers.length === 0 ? (
              <div style={S.empty}>
                <div style={S.emptyIcon}>👩‍🏫</div>
                <p style={S.emptyText}>Aucun professeur disponible.</p>
              </div>
            ) : (
              <div style={S.g3}>
                {teachers.map((t, i) => (
                  <div
                    key={t.id || i}
                    style={{
                      background: "#fff",
                      border: "1.5px solid #E5E7EB",
                      borderRadius: 12,
                      padding: 18,
                    }}
                  >
                    <div style={{ display: "flex", gap: 12, marginBottom: 12 }}>
                      <div
                        style={{
                          width: 38,
                          height: 38,
                          borderRadius: "50%",
                          background: COLORS[i % COLORS.length],
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#fff",
                          fontWeight: 700,
                          fontSize: 14,
                          flexShrink: 0,
                        }}
                      >
                        {t.prenom?.[0]?.toUpperCase() || "P"}
                      </div>
                      <div>
                        <div style={{ fontSize: 15, fontWeight: 700 }}>
                          {t.prenom} {t.nom}
                        </div>
                        <div style={{ fontSize: 13, color: "#9CA3AF" }}>
                          {t.module || t.subject || "—"}
                        </div>
                      </div>
                    </div>

                    <div style={{ display: "flex", gap: 6, marginBottom: 12 }}>
                      <span style={{ ...S.pill, background: "#F3F4F6", color: "#6B7280" }}>
                        {t.city || t.ville || "—"}
                      </span>
                      <span style={{ ...S.pill, background: "#EFF6FF", color: "#2563EB" }}>
                        {t.format || "—"}
                      </span>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        paddingTop: 12,
                        borderTop: "1px solid #F3F4F6",
                      }}
                    >
                      <div>
                        <div style={{ fontSize: 18, fontWeight: 800 }}>
                          {t.hourly_rate ?? "—"} €
                          <span style={{ fontSize: 11, color: "#9CA3AF", fontWeight: 400 }}>/h</span>
                        </div>
                        <div style={{ fontSize: 11, color: "#059669", fontWeight: 600 }}>
                          🎁 1er cours gratuit
                        </div>
                      </div>
                      <a
                        href="/search"
                        style={{ ...S.btn, ...S.btnOutline, ...S.btnSm }}
                      >
                        Voir
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ── ESSAIS + COURS ── */}
          <div style={S.g2}>
            {/* Demandes d'essai */}
            <div style={S.card}>
              <div style={S.cardTitle}>
                📬 Demandes de cours d'essai
                <a href="/trial-request" style={S.cardAction}>
                  + Faire une demande
                </a>
              </div>
              <p style={S.cardDesc}>
                Envoyez une demande et échangez avec le professeur sur vos besoins.
              </p>

              {/* Légende statuts */}
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 14 }}>
                {Object.values(TRIAL_STATUS).map(({ bg, col, label }) => (
                  <span key={label} style={{ ...S.pill, background: bg, color: col }}>
                    {label}
                  </span>
                ))}
              </div>

              {loading ? (
                <div style={S.empty}><p style={S.emptyText}>Chargement…</p></div>
              ) : trials.length === 0 ? (
                <div style={S.empty}>
                  <div style={S.emptyIcon}>📭</div>
                  <p style={S.emptyText}>Aucune demande envoyée pour le moment.</p>
                </div>
              ) : (
                trials.slice(0, 4).map((t) => {
                  const s = TRIAL_STATUS[t.status] || TRIAL_STATUS.pending;
                  return (
                    <div key={t.id} style={S.trialRow}>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: 14 }}>
                          {t.module || "Cours d'essai"}
                        </div>
                        <div style={{ fontSize: 12, color: "#9CA3AF", marginTop: 2 }}>
                          {t.requested_date
                            ? new Date(t.requested_date).toLocaleDateString("fr-FR")
                            : "Date non précisée"}
                        </div>
                      </div>
                      <span style={{ ...S.pill, background: s.bg, color: s.col }}>
                        {s.label}
                      </span>
                    </div>
                  );
                })
              )}

              {trials.length > 4 && (
                <a
                  href="/student/requests"
                  style={{ ...S.cardAction, display: "block", marginTop: 12, textAlign: "right" }}
                >
                  Voir toutes les demandes →
                </a>
              )}
            </div>

            {/* Mes cours */}
            <div style={S.card}>
              <div style={S.cardTitle}>📚 Mes cours</div>
              <p style={S.cardDesc}>
                Consultez vos cours confirmés et vos packs en cours.
              </p>
              {loading ? (
                <div style={S.empty}><p style={S.emptyText}>Chargement…</p></div>
              ) : payments.length === 0 ? (
                <div style={S.empty}>
                  <div style={S.emptyIcon}>📚</div>
                  <p style={S.emptyText}>Aucun cours actif.</p>
                </div>
              ) : (
                payments.slice(0, 4).map((p) => (
                  <div key={p.id} style={S.trialRow}>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 14 }}>
                        Formule #{p.pack_id}
                      </div>
                      <div style={{ fontSize: 12, color: "#9CA3AF", marginTop: 2 }}>
                        {p.payment_date
                          ? new Date(p.payment_date).toLocaleDateString("fr-FR")
                          : "—"}
                      </div>
                    </div>
                    <span style={{ ...S.pill, background: "#ECFDF5", color: "#059669" }}>
                      {p.amount} €
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* ── PROFIL + AVIS ── */}
          <div style={S.g2}>
            <div style={S.card}>
              <div style={S.cardTitle}>
                👤 Mon profil
                <a href="/student/profile" style={S.cardAction}>
                  Modifier →
                </a>
              </div>
              <p style={S.cardDesc}>
                Complétez votre fiche pour recevoir des propositions adaptées.
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                {[
                  ["Niveau",   profile?.level       || "—"],
                  ["Ville",    profile?.city         || "—"],
                  ["Format",   profile?.format       || "—"],
                  ["Objectif", profile?.goal         || "—"],
                ].map(([lbl, val]) => (
                  <div
                    key={lbl}
                    style={{
                      background: "#F9FAFB",
                      border: "1px solid #E5E7EB",
                      borderRadius: 9,
                      padding: 14,
                    }}
                  >
                    <div style={{ fontSize: 12, color: "#9CA3AF", marginBottom: 4 }}>
                      {lbl}
                    </div>
                    <div style={{ fontSize: 15, fontWeight: 600 }}>{val}</div>
                  </div>
                ))}
              </div>
              <a
                href="/student/profile"
                style={{ ...S.btn, ...S.btnGhost, ...S.btnFull }}
              >
                Modifier mon profil
              </a>
            </div>

            <div style={S.card}>
              <div style={S.cardTitle}>⭐ Donner un avis</div>
              <p style={S.cardDesc}>
                Notez vos professeurs après chaque cours pour améliorer les
                recommandations.
              </p>
              <div style={S.empty}>
                <div style={S.emptyIcon}>⭐</div>
                <p style={S.emptyText}>Aucun avis à donner pour le moment.</p>
              </div>
            </div>
          </div>

          {/* ── MESSAGES ── */}
          <div style={S.card}>
            <div style={S.cardTitle}>
              💬 Messages
              <a href="/student/chat" style={S.cardAction}>
                Ouvrir le chat →
              </a>
            </div>
            <p style={S.cardDesc}>
              Échangez avec votre professeur après validation du cours d'essai.
            </p>
            {/* Le chat n'a pas d'endpoint global "conversations de l'élève",
                on affiche un raccourci direct vers le chat */}
            {trials.filter((t) => t.status === "accepted").length === 0 ? (
              <div style={S.empty}>
                <div style={S.emptyIcon}>💬</div>
                <p style={S.emptyText}>
                  Vous n'avez pas encore de conversation active.
                </p>
              </div>
            ) : (
              <div>
                {trials
                  .filter((t) => t.status === "accepted")
                  .slice(0, 3)
                  .map((t) => (
                    <div key={t.id} style={S.trialRow}>
                      <div style={{ fontWeight: 600, fontSize: 14 }}>
                        Chat avec le prof #{t.teacher_id}
                      </div>
                      <a
                        href="/student/chat"
                        style={{ ...S.btn, ...S.btnOutline, ...S.btnSm }}
                      >
                        Ouvrir
                      </a>
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

export default StudentDashboard;