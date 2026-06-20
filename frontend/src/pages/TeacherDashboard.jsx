import React, { useEffect, useMemo, useState } from "react";

import S from "../styles/pages/TeacherDashboard.styles.js";
import { apiFetch } from "../config/api.js";
import Sidebar from "../components/layout/Sidebar.jsx";

function TeacherDashboard() {
  const savedUser = localStorage.getItem("user");
  const user = savedUser ? JSON.parse(savedUser) : null;
  const token = localStorage.getItem("token");

  const [teacherProfile, setTeacherProfile] = useState({});
  const [announcements, setAnnouncements] = useState([]);
  const [planning, setPlanning] = useState([]);
  const [trials, setTrials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.id) {
      setLoading(false);
      return;
    }

    const headers = { Authorization: `Bearer ${token}` };

    const loadDashboardData = async () => {
      try {
        const [planningRes, trialsRes, announcementsRes, profileRes] =
          await Promise.all([
            fetch(
              `${import.meta.env.VITE_API_URL}/api/teacher-planning/teacher/${user.id}`,
              { headers }
            ),
            fetch(
              `${import.meta.env.VITE_API_URL}/api/trials/teacher/${user.id}`,
              { headers }
            ),
            fetch(
              `${import.meta.env.VITE_API_URL}/api/announcements`,
              { headers }
            ),
            fetch(
              `${import.meta.env.VITE_API_URL}/api/teacher-profile/${user.id}`,
              { headers }
            ),
          ]);

        const planningData = planningRes.ok ? await planningRes.json() : [];
        setPlanning(Array.isArray(planningData) ? planningData : []);

        const trialsData = trialsRes.ok ? await trialsRes.json() : [];
        setTrials(Array.isArray(trialsData) ? trialsData : []);

        if (announcementsRes.ok) {
          const allAnnouncements = await announcementsRes.json();
          const filtered = Array.isArray(allAnnouncements)
            ? allAnnouncements.filter(
                (item) => Number(item.teacher_id) === Number(user.id)
              )
            : [];
          setAnnouncements(filtered);
        }

        const profileData = profileRes.ok ? await profileRes.json() : {};
        setTeacherProfile(profileData || {});
      } catch {
        // silencieux : les compteurs resteront à 0
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  const pendingTrialsCount = useMemo(
    () => trials.filter((t) => t.status === "pending").length,
    [trials]
  );

  const activeStudentsCount = useMemo(() => {
    const ids = trials
      .filter((t) => t.status === "accepted")
      .map((t) => t.student_id);
    return new Set(ids).size;
  }, [trials]);

  const profileCompletionCount = [
    teacherProfile?.city,
    teacherProfile?.preferred_mode,
    teacherProfile?.headline,
    teacherProfile?.presentation,
    teacherProfile?.diplomas,
    teacherProfile?.experience,
    teacherProfile?.methodology,
  ].filter(Boolean).length;

  const profileCompletionPercent = Math.round(
    (profileCompletionCount / 7) * 100
  );

  const profileLevel = useMemo(() => {
    if (profileCompletionPercent >= 90) return { label: "Expert",        commission: "3 %" };
    if (profileCompletionPercent >= 70) return { label: "Avancé",        commission: "7 %" };
    if (profileCompletionPercent >= 40) return { label: "Intermédiaire", commission: "12 %" };
    return                                     { label: "Débutant",      commission: "15 %" };
  }, [profileCompletionPercent]);

  return (
    <div style={S.wrap}>
      <div style={S.dash}>
        {/* ── SIDEBAR ── */}
        {/* ── SIDEBAR ── */}
        <Sidebar role="professeur" user={user} active="/teacher/dashboard" badge={pendingTrialsCount} />

        {/* ── MAIN ── */}
        <main style={S.main}>
          <div style={S.pageHead}>
            <div style={S.pageTitle}>
              👋 Bienvenue{user ? `, ${user.prenom}` : " dans votre espace professeur"}
            </div>
            <div style={S.pageSub}>
              Gérez votre profil, vos annonces, vos disponibilités et les
              demandes de cours d'essai depuis un seul espace.
            </div>
          </div>

          {/* ── STATS ── */}
          <div style={S.stats}>
            <div style={S.statAccent}>
              <div style={S.statLabelW}>Mes annonces</div>
              <div style={S.statValW}>{loading ? "…" : announcements.length}</div>
            </div>
            <div style={S.stat}>
              <div style={S.statLabel}>Demandes d'essai</div>
              <div style={S.statVal}>{loading ? "…" : trials.length}</div>
            </div>
            <div style={S.stat}>
              <div style={S.statLabel}>Messages</div>
              <div style={S.statVal}>
                <a href="/teacher/chat" style={{ color: "#111827", textDecoration: "none" }}>→</a>
              </div>
            </div>
            <div style={S.stat}>
              <div style={S.statLabel}>Élèves actifs</div>
              <div style={S.statVal}>{loading ? "…" : activeStudentsCount}</div>
            </div>
          </div>

          {/* ── PROFIL + ANNONCES ── */}
          <div style={S.g2}>
            <div style={S.card}>
              <div style={S.cardTitle}>
                👤 Mon profil
                <a href="/teacher/profile" style={S.cardAction}>Modifier →</a>
              </div>
              <p style={S.cardDesc}>
                Complétez votre profil avec vos diplômes, votre expérience et
                vos informations professionnelles.
              </p>

              <div style={S.profileGrid}>
                {[
                  ["Ville",           teacherProfile?.city               || "—"],
                  ["Niveau",          profileLevel.label],
                  ["Commission",      profileLevel.commission],
                  ["Profil complété", `${profileCompletionPercent} %`],
                ].map(([lbl, val]) => (
                  <div key={lbl} style={S.profileItem}>
                    <div style={S.profileLabel}>{lbl}</div>
                    <div style={S.profileValue}>{val}</div>
                  </div>
                ))}
              </div>

              <a
                href="/teacher/profile"
                style={{ ...S.btn, ...S.btnGhost, ...S.btnFull }}
              >
                Modifier mon profil
              </a>
            </div>

            <div style={S.card}>
              <div style={S.cardTitle}>
                📢 Mes annonces
                <a href="/teacher/announcements" style={S.cardAction}>
                  Créer / gérer →
                </a>
              </div>
              <p style={S.cardDesc}>
                Créez vos annonces par matière et rendez-les visibles aux élèves.
              </p>

              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 14 }}>
                <span style={{ ...S.pill, background: "#EFF6FF", color: "#2563EB" }}>Active</span>
                <span style={{ ...S.pill, background: "#F3F4F6", color: "#6B7280" }}>Brouillon</span>
                <span style={{ ...S.pill, background: "#ECFDF5", color: "#059669" }}>Visible</span>
              </div>

              {loading ? (
                <div style={S.empty}><p style={S.emptyText}>Chargement des annonces…</p></div>
              ) : announcements.length === 0 ? (
                <div style={S.empty}>
                  <div style={S.emptyIcon}>📢</div>
                  <p style={S.emptyText}>Aucune annonce créée pour le moment.</p>
                </div>
              ) : (
                <div style={S.empty}>
                  <div style={S.emptyIcon}>📢</div>
                  <p style={S.emptyText}>
                    {announcements.length} annonce(s) disponible(s).
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* ── BOUTON FORMULE ── */}
          <div style={{ marginBottom: 18 }}>
            <a href="/teacher/propose/formula" style={{ ...S.btn, ...S.btnPrimary }}>
              Proposer une formule
            </a>
          </div>

          {/* ── PLANNING + DEMANDES ── */}
          <div style={S.g2}>
            <div style={S.card}>
              <div style={S.cardTitle}>
                📅 Mes disponibilités
                <a href="/teacher/planning" style={S.cardAction}>Gérer →</a>
              </div>
              <p style={S.cardDesc}>
                Définissez vos créneaux pour permettre aux élèves de réserver un
                cours d'essai selon votre planning.
              </p>

              {loading ? (
                <div style={S.empty}><p style={S.emptyText}>Chargement des disponibilités…</p></div>
              ) : planning.length === 0 ? (
                <div style={S.empty}>
                  <div style={S.emptyIcon}>🗓️</div>
                  <p style={S.emptyText}>Aucune disponibilité ajoutée pour le moment.</p>
                </div>
              ) : (
                <div style={S.empty}>
                  <div style={S.emptyIcon}>🗓️</div>
                  <p style={S.emptyText}>{planning.length} créneau(x) disponible(s).</p>
                </div>
              )}
            </div>

            <div style={S.card}>
              <div style={S.cardTitle}>
                📬 Demandes de cours d'essai
                <a href="/teacher/requests" style={S.cardAction}>Voir →</a>
              </div>
              <p style={S.cardDesc}>
                Consultez les demandes reçues et répondez en acceptant, reportant
                ou refusant.
              </p>

              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 14 }}>
                {[
                  ["#FFF7ED", "#EA580C", "En attente"],
                  ["#ECFDF5", "#059669", "Acceptée"],
                  ["#EFF6FF", "#2563EB", "Reportée"],
                  ["#FEF2F2", "#DC2626", "Refusée"],
                ].map(([bg, col, lbl]) => (
                  <span key={lbl} style={{ ...S.pill, background: bg, color: col }}>{lbl}</span>
                ))}
              </div>

              {loading ? (
                <div style={S.empty}><p style={S.emptyText}>Chargement des demandes…</p></div>
              ) : trials.length === 0 ? (
                <div style={S.empty}>
                  <div style={S.emptyIcon}>📭</div>
                  <p style={S.emptyText}>Aucune demande reçue pour le moment.</p>
                </div>
              ) : (
                <div style={S.empty}>
                  <div style={S.emptyIcon}>📬</div>
                  <p style={S.emptyText}>
                    {trials.length} demande(s) reçue(s), dont {pendingTrialsCount} en attente.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* ── ÉLÈVES + MESSAGES ── */}
          <div style={S.g2}>
            <div style={S.card}>
              <div style={S.cardTitle}>
                🎓 Mes élèves
                <a href="/teacher/students" style={S.cardAction}>Voir →</a>
              </div>
              <p style={S.cardDesc}>
                Retrouvez ici les élèves qui suivent vos cours et vos formules actives.
              </p>

              {loading ? (
                <div style={S.empty}><p style={S.emptyText}>Chargement des élèves…</p></div>
              ) : activeStudentsCount === 0 ? (
                <div style={S.empty}>
                  <div style={S.emptyIcon}>🎓</div>
                  <p style={S.emptyText}>Aucun élève actif pour le moment.</p>
                </div>
              ) : (
                <div style={S.empty}>
                  <div style={S.emptyIcon}>🎓</div>
                  <p style={S.emptyText}>{activeStudentsCount} élève(s) actif(s).</p>
                </div>
              )}
            </div>

            <div style={S.card}>
              <div style={S.cardTitle}>
                💬 Messages
                <a href="/teacher/chat" style={S.cardAction}>Ouvrir le chat →</a>
              </div>
              <p style={S.cardDesc}>
                Échangez avec vos élèves dans la plateforme avant et après la
                validation de la formule selon les règles du site.
              </p>
              {trials.filter((t) => t.status === "accepted").length === 0 ? (
                <div style={S.empty}>
                  <div style={S.emptyIcon}>💬</div>
                  <p style={S.emptyText}>Aucune conversation active pour le moment.</p>
                </div>
              ) : (
                <div style={S.empty}>
                  <div style={S.emptyIcon}>💬</div>
                  <p style={S.emptyText}>
                    {trials.filter((t) => t.status === "accepted").length} conversation(s) active(s).
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* ── REVENUS ── */}
          <div style={S.card}>
            <div style={S.cardTitle}>
              💳 Revenus
              <a href="/teacher/revenue" style={S.cardAction}>Consulter →</a>
            </div>
            <p style={S.cardDesc}>
              Consultez vos revenus liés aux cours actifs et aux formules validées.
            </p>
            <div style={S.empty}>
              <div style={S.emptyIcon}>💳</div>
              <p style={S.emptyText}>Aucun revenu affiché pour le moment.</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default TeacherDashboard;