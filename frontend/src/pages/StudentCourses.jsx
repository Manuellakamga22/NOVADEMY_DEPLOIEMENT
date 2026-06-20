import React, { useEffect, useState } from "react";

import S from "../styles/pages/StudentCourses.styles.js";
import { apiFetch } from "../config/api.js";
import Sidebar from "../components/layout/Sidebar.jsx";

function StudentCourses() {
  const savedUser = localStorage.getItem("user");
  const user  = savedUser ? JSON.parse(savedUser) : null;
  const token = localStorage.getItem("token");

  const [activeTab, setActiveTab] = useState("actifs");
  const [courses,   setCourses]   = useState([]);
  const [loading,   setLoading]   = useState(true);

  // je charge les formules acceptées et payées de l'élève
  useEffect(() => {
    if (!user?.id) { setLoading(false); return; }

    const fetchCourses = async () => {
      try {
        const res  = await fetch(
          `${import.meta.env.VITE_API_URL}/api/packs/student/${user.id}/all`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (!res.ok) return;
        const data = await res.json();

        // je mappe les formules vers un format lisible
        const list = Array.isArray(data) ? data.map(p => ({
          id:          p.id,
          title:       p.type === "suivi_regulier" ? "Suivi régulier"
                     : p.type === "pack_heures"    ? "Pack d'heures"
                     : "Classe virtuelle",
          teacherName: `${p.teacher_prenom || ""} ${p.teacher_nom || ""}`.trim() || `Prof #${p.teacher_id}`,
          subject:     p.subject || "—",
          offerType:   p.type || "—",
          frequency:   p.hours_per_week ? `${p.hours_per_week}h/semaine` : "—",
          mode:        "À définir avec le prof",
          objective:   "Progresser et atteindre les objectifs fixés",
          status:      p.status === "payee"    ? "actif"
                     : p.status === "acceptee" ? "en_attente"
                     : "en_attente",
        })) : [];

        setCourses(list);
      } catch { /* silencieux */ }
      finally  { setLoading(false); }
    };

    fetchCourses();
  }, []);

  const activeCourses  = courses.filter((c) => c.status === "actif");
  const pendingCourses = courses.filter((c) => c.status === "en_attente");
  const finishedCourses = courses.filter((c) => c.status === "termine");

  const getDisplayedCourses = () => {
    if (activeTab === "actifs") return activeCourses;
    if (activeTab === "attente") return pendingCourses;
    return finishedCourses;
  };

  const displayedCourses = getDisplayedCourses();

  const getStatusBadge = (status) => {
    if (status === "actif") {
      return { background: "#ECFDF5", color: "#059669", label: "Actif" };
    }
    if (status === "en_attente") {
      return { background: "#FFF7ED", color: "#EA580C", label: "En attente" };
    }
    return { background: "#F3F4F6", color: "#6B7280", label: "Terminé" };
  };

  return (
    <div style={S.wrap}>
      <div style={S.dash}>
        {/* ── SIDEBAR ── */}
        <Sidebar role={"eleve"} user={user} active={"/student/courses"} />

        <main style={S.main}>
          <div style={S.topBar}>
            <div>
              <p style={S.smallTitle}>Mes cours</p>
              <div style={S.smallSub}>
                Retrouvez ici vos cours en cours, vos formules validées et les
                séances terminées après acceptation du cours d’essai.
              </div>
            </div>
          </div>

          <div style={S.stats}>
            <div style={S.statAccent}>
              <div style={S.statLabelW}>Cours actifs</div>
              <div style={S.statValW}>{activeCourses.length}</div>
            </div>

            <div style={S.stat}>
              <div style={S.statLabel}>En attente</div>
              <div style={S.statVal}>{pendingCourses.length}</div>
            </div>

            <div style={S.stat}>
              <div style={S.statLabel}>Terminés</div>
              <div style={S.statVal}>{finishedCourses.length}</div>
            </div>

            <div style={S.stat}>
              <div style={S.statLabel}>Total</div>
              <div style={S.statVal}>{courses.length}</div>
            </div>
          </div>

          <div style={S.card}>
            <div style={S.cardTitle}>Suivi des cours</div>
            {loading && <div style={{ textAlign: "center", padding: "20px", color: "#9CA3AF" }}>Chargement…</div>}
            <div style={S.cardDesc}>
              Après le cours d’essai et la validation d’une formule, les cours
              apparaissent ici avec le professeur, la matière, le rythme et le
              statut.
            </div>

            <div style={S.tabs}>
              <button
                type="button"
                onClick={() => setActiveTab("actifs")}
                style={activeTab === "actifs" ? S.tabActive : S.tab}
              >
                Actifs
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("attente")}
                style={activeTab === "attente" ? S.tabActive : S.tab}
              >
                En attente
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("termines")}
                style={activeTab === "termines" ? S.tabActive : S.tab}
              >
                Terminés
              </button>
            </div>

            {displayedCourses.length === 0 ? (
              <div style={S.empty}>
                <div style={S.emptyIcon}>📚</div>
                <div style={S.emptyText}>
                  Aucun cours affiché pour cette catégorie.
                </div>
              </div>
            ) : (
              <div style={S.courseList}>
                {displayedCourses.map((course) => {
                  const badge = getStatusBadge(course.status);

                  return (
                    <div key={course.id} style={S.courseItem}>
                      <div style={S.courseHead}>
                        <div>
                          <h4 style={S.courseTitle}>{course.title}</h4>
                          <p style={S.courseSub}>
                            {course.teacherName} • {course.subject}
                          </p>
                        </div>

                        <span
                          style={{
                            ...S.badge,
                            background: badge.background,
                            color: badge.color,
                          }}
                        >
                          {badge.label}
                        </span>
                      </div>

                      <div style={S.infoGrid}>
                        <div style={S.infoBox}>
                          <div style={S.infoLabel}>Formule</div>
                          <div style={S.infoValue}>{course.offerType}</div>
                        </div>

                        <div style={S.infoBox}>
                          <div style={S.infoLabel}>Rythme</div>
                          <div style={S.infoValue}>{course.frequency}</div>
                        </div>

                        <div style={S.infoBox}>
                          <div style={S.infoLabel}>Mode</div>
                          <div style={S.infoValue}>{course.mode}</div>
                        </div>
                      </div>

                      <div style={S.textBox}>
                        <div style={S.textTitle}>Objectif du suivi</div>
                        <p style={S.textValue}>{course.objective}</p>
                      </div>

                      <div style={S.actions}>
                        <a
                          href="/student/planning"
                          style={{ ...S.btn, ...S.btnPrimary }}
                        >
                          Voir le calendrier
                        </a>

                        <a
                          href="/student/chat"
                          style={{ ...S.btn, ...S.btnOutline }}
                        >
                          Ouvrir le chat
                        </a>

                        <a
                          href="/student/payments"
                          style={{ ...S.btn, ...S.btnGhost }}
                        >
                          Paiements
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default StudentCourses;