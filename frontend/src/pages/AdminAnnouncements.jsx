import React, { useEffect, useState } from "react";

import S from "../styles/pages/AdminAnnouncements.styles.js";
import { apiFetch } from "../config/api.js";
import Sidebar from "../components/layout/Sidebar.jsx";

const STATUS_COLORS = {
  active:   { bg: "#ECFDF5", col: "#059669", label: "Active" },
  inactive: { bg: "#F3F4F6", col: "#6B7280", label: "Inactive" },
  draft:    { bg: "#FFF7ED", col: "#EA580C", label: "Brouillon" },
};

const MODE_LABELS = {
  visio:       "Visio",
  presentiel:  "Présentiel",
  hybride:     "Hybride",
};

function AdminAnnouncements() {
  const savedUser = localStorage.getItem("user");
  const user  = savedUser ? JSON.parse(savedUser) : null;
  const token = localStorage.getItem("token");

  const [announcements, setAnnouncements] = useState([]);
  const [teachers,      setTeachers]      = useState([]);
  const [search,        setSearch]        = useState("");
  const [filterSubject, setFilterSubject] = useState("");
  const [filterStatus,  setFilterStatus]  = useState("");
  const [loading,       setLoading]       = useState(true);

  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [annRes, teachersRes] = await Promise.all([
          apiFetch("/api/announcements", { headers }),
          apiFetch("/api/teachers",      { headers }),
        ]);

        if (annRes.ok) {
          const data = await annRes.json();
          setAnnouncements(Array.isArray(data) ? data : []);
        }
        if (teachersRes.ok) {
          const data = await teachersRes.json();
          setTeachers(Array.isArray(data) ? data : []);
        }
      } catch {
        // silencieux
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  // Résoudre le nom du prof depuis teacher_id
  const getTeacherName = (teacherId) => {
    const t = teachers.find((t) => Number(t.id) === Number(teacherId));
    return t ? `${t.prenom} ${t.nom}` : `#${teacherId}`;
  };

  // Sujets uniques pour le filtre
  const allSubjects = [...new Set(announcements.map((a) => a.subject))];

  // Filtrage
  const filtered = announcements.filter((a) => {
    const matchSearch =
      search === "" ||
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.subject.toLowerCase().includes(search.toLowerCase());
    const matchSubject =
      filterSubject === "" || a.subject === filterSubject;
    const matchStatus =
      filterStatus === "" || a.status === filterStatus;
    return matchSearch && matchSubject && matchStatus;
  });

  // Stats
  const countActive   = announcements.filter((a) => a.status === "active").length;
  const countInactive = announcements.filter((a) => a.status === "inactive").length;
  const countDraft    = announcements.filter((a) => a.status === "draft").length;

  return (
    <div style={S.wrap}>
      <div style={S.dash}>
        {/* ── SIDEBAR ── */}
        {/* ── SIDEBAR ── */}
        <Sidebar role={"admin"} user={user} active={"/admin/announcements"} />

        {/* ── MAIN ── */}
        <main style={S.main}>
          <div style={S.pageTitle}>Gestion des annonces</div>
          <div style={S.pageSub}>Contrôle, validation et suspension des annonces</div>

          {/* ── STATS ── */}
          <div style={S.stats}>
            <div style={S.statAccent}>
              <div style={S.statLabelW}>Annonces</div>
              <div style={S.statValW}>{loading ? "…" : announcements.length}</div>
            </div>
            <div style={S.stat}>
              <div style={S.statLabel}>Actives</div>
              <div style={S.statVal}>{loading ? "…" : countActive}</div>
            </div>
            <div style={S.stat}>
              <div style={S.statLabel}>Brouillons</div>
              <div style={S.statVal}>{loading ? "…" : countDraft}</div>
            </div>
            <div style={S.stat}>
              <div style={S.statLabel}>Inactives</div>
              <div style={S.statVal}>{loading ? "…" : countInactive}</div>
            </div>
          </div>

          <div style={S.g2}>
            {/* ── LISTE ── */}
            <div style={S.card}>
              <div style={S.cardTitle}>Liste des annonces</div>

              <div style={S.searchRow}>
                <input
                  style={S.input}
                  placeholder="Rechercher une annonce"
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
                <select
                  style={S.input}
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="">Tous statuts</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="draft">Brouillon</option>
                </select>
                <button
                  style={{ ...S.btn, ...S.btnGhost }}
                  onClick={() => {
                    setSearch("");
                    setFilterSubject("");
                    setFilterStatus("");
                  }}
                >
                  Réinitialiser
                </button>
              </div>

              {loading ? (
                <div style={S.empty}>
                  <p style={{ fontSize: 13 }}>Chargement…</p>
                </div>
              ) : filtered.length === 0 ? (
                <div style={S.empty}>
                  <div style={S.emptyIcon}>📢</div>
                  <p style={{ fontSize: 13 }}>Aucune annonce trouvée.</p>
                </div>
              ) : (
                <div style={{ overflowX: "auto" }}>
                  <table style={S.tbl}>
                    <thead>
                      <tr>
                        <th style={S.tblTh}>Titre</th>
                        <th style={S.tblTh}>Matière</th>
                        <th style={S.tblTh}>Professeur</th>
                        <th style={S.tblTh}>Ville</th>
                        <th style={S.tblTh}>Mode</th>
                        <th style={S.tblTh}>Statut</th>
                        <th style={S.tblTh}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filtered.map((a) => {
                        const st = STATUS_COLORS[a.status] || STATUS_COLORS.inactive;
                        return (
                          <tr key={a.id}>
                            <td style={S.tblTd}>
                              <div style={{ fontWeight: 600 }}>{a.title}</div>
                            </td>
                            <td style={S.tblTd}>{a.subject}</td>
                            <td style={S.tblTd}>{getTeacherName(a.teacher_id)}</td>
                            <td style={S.tblTd}>{a.city}</td>
                            <td style={S.tblTd}>
                              <span style={{ ...S.pill, background: "#EFF6FF", color: "#2563EB" }}>
                                {MODE_LABELS[a.mode] || a.mode}
                              </span>
                            </td>
                            <td style={S.tblTd}>
                              <span style={{ ...S.pill, background: st.bg, color: st.col }}>
                                {st.label}
                              </span>
                            </td>
                            <td style={S.tblTd}>
                              <div style={S.actionRow}>
                                <a
                                  href={`/admin/announcements/${a.id}`}
                                  style={{ ...S.btn, ...S.btnGhost }}
                                >
                                  Voir
                                </a>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* ── ACTIONS RAPIDES ── */}
            <div style={S.card}>
              <div style={S.cardTitle}>Actions rapides</div>

              <div style={S.infoBox}>
                <div style={S.infoLabel}>Annonces actives</div>
                <div style={S.infoValue}>{loading ? "…" : countActive}</div>
              </div>

              <div style={S.infoBox}>
                <div style={S.infoLabel}>Brouillons</div>
                <div style={S.infoValue}>{loading ? "…" : countDraft}</div>
              </div>

              <div style={S.infoBox}>
                <div style={S.infoLabel}>Inactives</div>
                <div style={S.infoValue}>{loading ? "…" : countInactive}</div>
              </div>

              <a
                href="/admin/teachers"
                style={{ ...S.btn, ...S.btnPrimary, ...S.btnFull }}
              >
                Gérer les professeurs
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

export default AdminAnnouncements;