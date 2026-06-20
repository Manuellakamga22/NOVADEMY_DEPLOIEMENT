import React, { useEffect, useState } from "react";

import S from "../styles/pages/AdminTeachers.styles.js";
import { apiFetch } from "../config/api.js";
import Sidebar from "../components/layout/Sidebar.jsx";

function AdminTeachers() {
  const savedUser = localStorage.getItem("user");
  const user  = savedUser ? JSON.parse(savedUser) : null;
  const token = localStorage.getItem("token");

  const [teachers,      setTeachers]      = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [search,        setSearch]        = useState("");
  const [filterSubject, setFilterSubject] = useState("");
  const [loading,       setLoading]       = useState(true);

  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [teachersRes, annRes] = await Promise.all([
          apiFetch("/api/teachers",      { headers }),
          apiFetch("/api/announcements", { headers }),
        ]);

        if (teachersRes.ok) {
          const data = await teachersRes.json();
          setTeachers(Array.isArray(data) ? data : []);
        }
        if (annRes.ok) {
          const data = await annRes.json();
          setAnnouncements(Array.isArray(data) ? data : []);
        }
      } catch {
        // silencieux
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  // Enrichir chaque prof avec ses annonces (matière, tarif)
  const enrichedTeachers = teachers.map((t) => {
    const teacherAnns = announcements.filter(
      (a) => Number(a.teacher_id) === Number(t.id)
    );
    const subjects = [...new Set(teacherAnns.map((a) => a.subject))].join(", ");
    return {
      ...t,
      subjects:    subjects || "—",
      annCount:    teacherAnns.length,
      teacherRate: teacherAnns[0]?.teacher_rate ?? "—",
    };
  });

  // Filtrage
  const filtered = enrichedTeachers.filter((t) => {
    const matchSearch =
      search === "" ||
      `${t.prenom} ${t.nom}`.toLowerCase().includes(search.toLowerCase()) ||
      t.email.toLowerCase().includes(search.toLowerCase());
    const matchSubject =
      filterSubject === "" ||
      t.subjects.toLowerCase().includes(filterSubject.toLowerCase());
    return matchSearch && matchSubject;
  });

  // Sujets uniques pour le filtre
  const allSubjects = [...new Set(announcements.map((a) => a.subject))];

  // Stats
  const withAnnouncements = enrichedTeachers.filter((t) => t.annCount > 0).length;
  const withoutAnnouncements = enrichedTeachers.filter((t) => t.annCount === 0).length;

  return (
    <div style={S.wrap}>
      <div style={S.dash}>
        {/* ── SIDEBAR ── */}
        {/* ── SIDEBAR ── */}
        <Sidebar role={"admin"} user={user} active={"/admin/teachers"} />

        {/* ── MAIN ── */}
        <main style={S.main}>
          <div style={S.pageTitle}>Gestion des professeurs</div>
          <div style={S.pageSub}>Validation, suivi et contrôle des profils enseignants</div>

          {/* ── STATS ── */}
          <div style={S.stats}>
            <div style={S.statAccent}>
              <div style={S.statLabelW}>Professeurs</div>
              <div style={S.statValW}>{loading ? "…" : teachers.length}</div>
            </div>
            <div style={S.stat}>
              <div style={S.statLabel}>Avec annonces</div>
              <div style={S.statVal}>{loading ? "…" : withAnnouncements}</div>
            </div>
            <div style={S.stat}>
              <div style={S.statLabel}>Sans annonce</div>
              <div style={S.statVal}>{loading ? "…" : withoutAnnouncements}</div>
            </div>
            <div style={S.stat}>
              <div style={S.statLabel}>Annonces totales</div>
              <div style={S.statVal}>{loading ? "…" : announcements.length}</div>
            </div>
          </div>

          <div style={S.g2}>
            {/* ── LISTE ── */}
            <div style={S.card}>
              <div style={S.cardTitle}>Liste des professeurs</div>

              <div style={S.searchRow}>
                <input
                  style={S.input}
                  placeholder="Rechercher un professeur"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <select
                  style={S.input}
                  value={filterSubject}
                  onChange={(e) => setFilterSubject(e.target.value)}
                >
                  <option value="">Toutes matières</option>
                  {allSubjects.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
                <button
                  style={{ ...S.btn, ...S.btnGhost }}
                  onClick={() => { setSearch(""); setFilterSubject(""); }}
                >
                  Réinitialiser
                </button>
              </div>

              {loading ? (
                <div style={S.empty}><p style={{ fontSize: 13 }}>Chargement…</p></div>
              ) : filtered.length === 0 ? (
                <div style={S.empty}>
                  <div style={S.emptyIcon}>👩‍🏫</div>
                  <p style={{ fontSize: 13 }}>Aucun professeur trouvé.</p>
                </div>
              ) : (
                <div style={{ overflowX: "auto" }}>
                  <table style={S.tbl}>
                    <thead>
                      <tr>
                        <th style={S.tblTh}>Nom</th>
                        <th style={S.tblTh}>Email</th>
                        <th style={S.tblTh}>Matière(s)</th>
                        <th style={S.tblTh}>Annonces</th>
                        <th style={S.tblTh}>Tarif/h</th>
                        <th style={S.tblTh}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filtered.map((t) => (
                        <tr key={t.id}>
                          <td style={S.tblTd}>
                            <div style={{ fontWeight: 600 }}>{t.prenom} {t.nom}</div>
                          </td>
                          <td style={S.tblTd}>{t.email}</td>
                          <td style={S.tblTd}>
                            {t.subjects !== "—" ? (
                              <span style={{ ...S.pill, background: "#EFF6FF", color: "#2563EB" }}>
                                {t.subjects}
                              </span>
                            ) : (
                              <span style={{ color: "#9CA3AF" }}>—</span>
                            )}
                          </td>
                          <td style={S.tblTd}>
                            <span style={{ ...S.pill, background: t.annCount > 0 ? "#ECFDF5" : "#F3F4F6", color: t.annCount > 0 ? "#059669" : "#6B7280" }}>
                              {t.annCount} annonce{t.annCount !== 1 ? "s" : ""}
                            </span>
                          </td>
                          <td style={S.tblTd}>
                            {t.teacherRate !== "—" ? `${t.teacherRate} €` : "—"}
                          </td>
                          <td style={S.tblTd}>
                            <div style={S.actionRow}>
                              <a
                                href={`/admin/teachers/${t.id}`}
                                style={{ ...S.btn, ...S.btnGhost }}
                              >
                                Voir
                              </a>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* ── ACTIONS RAPIDES ── */}
            <div style={S.card}>
              <div style={S.cardTitle}>Actions rapides</div>

              <div style={S.infoBox}>
                <div style={S.infoLabel}>Total professeurs</div>
                <div style={S.infoValue}>{loading ? "…" : teachers.length}</div>
              </div>

              <div style={S.infoBox}>
                <div style={S.infoLabel}>Avec au moins une annonce</div>
                <div style={S.infoValue}>{loading ? "…" : withAnnouncements}</div>
              </div>

              <div style={S.infoBox}>
                <div style={S.infoLabel}>Sans aucune annonce</div>
                <div style={S.infoValue}>{loading ? "…" : withoutAnnouncements}</div>
              </div>

              <a
                href="/admin/announcements"
                style={{ ...S.btn, ...S.btnPrimary, ...S.btnFull }}
              >
                Gérer les annonces
              </a>

              <a
                href="/admin/dashboard"
                style={{ ...S.btn, ...S.btnGhost, ...S.btnFull }}
              >
                Retour au tableau de bord
              </a>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminTeachers;