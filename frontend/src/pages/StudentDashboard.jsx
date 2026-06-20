import React, { useEffect, useState } from "react";

import S from "../styles/pages/StudentDashboard.styles.js";
import { apiFetch } from "../config/api.js";
import Sidebar from "../components/layout/Sidebar.jsx";

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
          `${import.meta.env.VITE_API_URL}/api/trials/student/${user.id}`,
          { headers }
        );
        if (trialsRes.ok) {
          const data = await trialsRes.json();
          setTrials(Array.isArray(data) ? data : []);
        }

        // 2. Paiements de l'élève (= cours actifs)
        const paymentsRes = await fetch(
          `${import.meta.env.VITE_API_URL}/api/payments/student/${user.id}`,
          { headers }
        );
        if (paymentsRes.ok) {
          const data = await paymentsRes.json();
          setPayments(Array.isArray(data) ? data : []);
        }

        // 3. Profil élève
        const profileRes = await fetch(
          `${import.meta.env.VITE_API_URL}/api/student-profile/${user.id}`,
          { headers }
        );
        if (profileRes.ok) {
          const data = await profileRes.json();
          setProfile(data || null);
        }

        // 4. Profs recommandés (3 premiers de l'annuaire)
        const teachersRes = await fetch(
          `${import.meta.env.VITE_API_URL}/api/announcements`,
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
        <Sidebar role="eleve" user={user} active="/student/dashboard" badge={countPending} />

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