import React, { useEffect, useState } from "react";

import S from "../styles/pages/AdminDashboard.styles.js";
import { apiFetch } from "../config/api.js";
import Sidebar from "../components/layout/Sidebar.jsx";

const Alert = ({ type, icon, title, children }) => {
  const colors = {
    red:    ["#FEF2F2", "#FECACA"],
    orange: ["#FFF7ED", "#FED7AA"],
    blue:   ["#EFF6FF", "#BFDBFE"],
  };
  const [bg, border] = colors[type];
  return (
    <div
      style={{
        background: bg,
        border: `1px solid ${border}`,
        borderRadius: 12,
        padding: "12px 16px",
        display: "flex",
        gap: 12,
        alignItems: "flex-start",
        marginBottom: 10,
      }}
    >
      <span style={{ fontSize: 19 }}>{icon}</span>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 19, fontWeight: 600 }}>{title}</div>
      </div>
      {children}
    </div>
  );
};

function AdminDashboard() {
  const savedUser = localStorage.getItem("user");
  const user  = savedUser ? JSON.parse(savedUser) : null;
  const token = localStorage.getItem("token");

  const [teachers,      setTeachers]      = useState([]);
  const [students,      setStudents]      = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [loading,       setLoading]       = useState(true);

  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [teachersRes, studentsRes, annRes] = await Promise.all([
          apiFetch("/api/teachers",      { headers }),
          apiFetch("/api/students",      { headers }),
          apiFetch("/api/announcements", { headers }),
        ]);

        if (teachersRes.ok) {
          const data = await teachersRes.json();
          setTeachers(Array.isArray(data) ? data : []);
        }
        if (studentsRes.ok) {
          const data = await studentsRes.json();
          setStudents(Array.isArray(data) ? data : []);
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

  const totalUsers      = teachers.length + students.length;
  const activeAnnouncements = announcements.filter((a) => a.status === "active");

  return (
    <div style={S.wrap}>
      <div style={S.dash}>
        {/* ── SIDEBAR ── */}
        {/* ── SIDEBAR ── */}
        <Sidebar role="admin" user={user} active="/admin/dashboard" />

        {/* ── MAIN ── */}
        <main style={S.main}>
          <div style={S.pageTitle}>Tableau de bord administrateur</div>
          <div style={S.pageSub}>Vue générale de la plateforme</div>

          {/* ── STATS ── */}
          <div style={S.stats}>
            <div style={S.statAccent}>
              <div style={S.statLabelW}>Utilisateurs</div>
              <div style={S.statValW}>{loading ? "…" : totalUsers}</div>
            </div>
            <div style={S.stat}>
              <div style={S.statLabel}>Professeurs</div>
              <div style={S.statVal}>{loading ? "…" : teachers.length}</div>
            </div>
            <div style={S.stat}>
              <div style={S.statLabel}>Élèves</div>
              <div style={S.statVal}>{loading ? "…" : students.length}</div>
            </div>
            <div style={S.stat}>
              <div style={S.statLabel}>Annonces actives</div>
              <div style={S.statVal}>{loading ? "…" : activeAnnouncements.length}</div>
            </div>
          </div>

          {/* ── UTILISATEURS + PROFESSEURS ── */}
          <div style={S.g2}>
            <div style={S.card}>
              <div style={S.cardTitle}>👥 Gestion des utilisateurs</div>
              {loading ? (
                <div style={S.empty}><p style={{ fontSize: 17 }}>Chargement…</p></div>
              ) : students.length === 0 ? (
                <div style={S.empty}>
                  <div style={S.emptyIcon}>👤</div>
                  <p style={{ fontSize: 17 }}>Aucun élève pour le moment.</p>
                </div>
              ) : (
                <table style={S.tbl}>
                  <thead>
                    <tr>
                      <th style={S.tblTh}>Nom</th>
                      <th style={S.tblTh}>Email</th>
                      <th style={S.tblTh}>Rôle</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.slice(0, 4).map((s) => (
                      <tr key={s.id}>
                        <td style={S.tblTd}>{s.prenom} {s.nom}</td>
                        <td style={S.tblTd}>{s.email}</td>
                        <td style={S.tblTd}>
                          <span style={{ ...S.pill, background: "#ECFDF5", color: "#059669" }}>
                            Élève
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
              <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
                <a href="/admin/students" style={{ ...S.btn, ...S.btnPrimary }}>
                  Voir les élèves
                </a>
                <a href="/admin/teachers" style={{ ...S.btn, ...S.btnGhost }}>
                  Voir les profs
                </a>
              </div>
            </div>

            <div style={S.card}>
              <div style={S.cardTitle}>👩‍🏫 Gestion des professeurs</div>
              {loading ? (
                <div style={S.empty}><p style={{ fontSize: 17 }}>Chargement…</p></div>
              ) : teachers.length === 0 ? (
                <div style={S.empty}>
                  <div style={S.emptyIcon}>👩‍🏫</div>
                  <p style={{ fontSize: 17 }}>Aucun professeur pour le moment.</p>
                </div>
              ) : (
                <div style={{ overflowX: "auto" }}>
                  <table style={S.tbl}>
                    <thead>
                      <tr>
                        <th style={S.tblTh}>Nom</th>
                        <th style={S.tblTh}>Email</th>
                        <th style={S.tblTh}>Statut</th>
                      </tr>
                    </thead>
                    <tbody>
                      {teachers.slice(0, 4).map((t) => (
                        <tr key={t.id}>
                          <td style={S.tblTd}>{t.prenom} {t.nom}</td>
                          <td style={S.tblTd}>{t.email}</td>
                          <td style={S.tblTd}>
                            <span
                              style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: 5,
                                fontSize: 15,
                                fontWeight: 600,
                              }}
                            >
                              <span
                                style={{
                                  width: 6,
                                  height: 6,
                                  borderRadius: "50%",
                                  background: "#059669",
                                  display: "inline-block",
                                }}
                              />
                              Actif
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
                <a href="/admin/teachers" style={{ ...S.btn, ...S.btnPrimary }}>
                  Voir les professeurs
                </a>
              </div>
            </div>
          </div>

          {/* ── ESSAIS + ALERTES ── */}
          <div style={S.g2}>
            <div style={S.card}>
              <div style={S.cardTitle}>🧪 Suivi des cours d'essai</div>
              <div style={S.empty}>
                <div style={S.emptyIcon}>🧪</div>
                <p style={{ fontSize: 17 }}>Consultez les demandes d'essai.</p>
              </div>
              <a href="/admin/trials" style={{ ...S.btn, ...S.btnGhost, ...S.btnFull }}>
                Voir les demandes
              </a>
            </div>

            <div style={S.card}>
              <div style={S.cardTitle}>🛡️ Alertes modération IA</div>
              <Alert type="blue" icon="ℹ️" title="Aucune alerte active pour le moment." />
              <Alert type="orange" icon="⚠️" title="Modération automatique activée.">
                <button style={{ ...S.btn, ...S.btnGhost }}>Voir</button>
              </Alert>
              <Alert type="red" icon="🚨" title="Messages bloqués : 0 détecté(s).">
                <button style={{ ...S.btn, ...S.btnGhost }}>Voir</button>
              </Alert>
            </div>
          </div>

          {/* ── ANNONCES + STATS ── */}
          <div style={S.g2}>
            <div style={S.card}>
              <div style={S.cardTitle}>📢 Gestion des annonces</div>
              {loading ? (
                <div style={S.empty}><p style={{ fontSize: 17 }}>Chargement…</p></div>
              ) : announcements.length === 0 ? (
                <div style={S.empty}>
                  <div style={S.emptyIcon}>📋</div>
                  <p style={{ fontSize: 17 }}>Aucune annonce pour le moment.</p>
                </div>
              ) : (
                <table style={S.tbl}>
                  <thead>
                    <tr>
                      <th style={S.tblTh}>Titre</th>
                      <th style={S.tblTh}>Matière</th>
                      <th style={S.tblTh}>Statut</th>
                    </tr>
                  </thead>
                  <tbody>
                    {announcements.slice(0, 4).map((a) => (
                      <tr key={a.id}>
                        <td style={S.tblTd}>{a.title}</td>
                        <td style={S.tblTd}>{a.subject}</td>
                        <td style={S.tblTd}>
                          <span
                            style={{
                              ...S.pill,
                              background: a.status === "active" ? "#ECFDF5" : "#F3F4F6",
                              color:      a.status === "active" ? "#059669" : "#6B7280",
                            }}
                          >
                            {a.status === "active" ? "Active" : a.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
              <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
                <a href="/admin/announcements" style={{ ...S.btn, ...S.btnPrimary }}>
                  Voir les annonces
                </a>
              </div>
            </div>

            <div style={S.card}>
              <div style={S.cardTitle}>📈 Statistiques plateforme</div>

              {[
                ["Professeurs inscrits", teachers.length, teachers.length],
                ["Élèves inscrits",      students.length, students.length],
                ["Annonces actives",     activeAnnouncements.length, announcements.length],
              ].map(([label, val, total]) => (
                <div key={label} style={{ marginBottom: 12 }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: 16,
                      fontWeight: 600,
                      marginBottom: 4,
                    }}
                  >
                    <span>{label}</span>
                    <span style={{ color: "#9CA3AF" }}>{loading ? "…" : val}</span>
                  </div>
                  <div style={S.prog}>
                    <div
                      style={{
                        ...S.progFill,
                        width: total > 0 ? `${Math.min((val / total) * 100, 100)}%` : "0%",
                      }}
                    />
                  </div>
                </div>
              ))}

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 14 }}>
                {[
                  ["Total profs", loading ? "…" : teachers.length],
                  ["Total élèves", loading ? "…" : students.length],
                ].map(([label, val]) => (
                  <div
                    key={label}
                    style={{
                      background: "#F9FAFB",
                      border: "1px solid #E5E7EB",
                      borderRadius: 8,
                      padding: 14,
                      textAlign: "center",
                    }}
                  >
                    <div style={{ fontSize: 15, color: "#9CA3AF" }}>{label}</div>
                    <div style={{ fontSize: 26, fontWeight: 800 }}>{val}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── COMMISSIONS + PAIEMENTS ── */}
          <div style={S.g2}>
            <div style={S.card}>
              <div style={S.cardTitle}>🎖️ Commissions plateforme</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10 }}>
                {[
                  { icon: "🌱", level: "Débutant",  hours: "0–20 h",    rate: "15", bg: "#F9FAFB", border: "#E5E7EB", col: "#6B7280" },
                  { icon: "📘", level: "Interm.",   hours: "20–100 h",  rate: "12", bg: "#EFF6FF", border: "#BFDBFE", col: "#2563EB" },
                  { icon: "🏆", level: "Avancé",    hours: "100–300 h", rate: "7",  bg: "#ECFDF5", border: "#A7F3D0", col: "#059669" },
                  { icon: "⭐", level: "Expert",    hours: "300+ h",    rate: "3",  bg: "#FFF7ED", border: "#FED7AA", col: "#EA580C" },
                ].map((t) => (
                  <div
                    key={t.level}
                    style={{
                      background: t.bg,
                      border: `1.5px solid ${t.border}`,
                      borderRadius: 10,
                      padding: 14,
                      textAlign: "center",
                    }}
                  >
                    <div style={{ fontSize: 24, marginBottom: 6 }}>{t.icon}</div>
                    <div style={{ fontSize: 15, fontWeight: 700 }}>{t.level}</div>
                    <div style={{ fontSize: 14, color: "#9CA3AF", marginBottom: 8 }}>{t.hours}</div>
                    <div style={{ fontSize: 30, fontWeight: 800, color: t.col, lineHeight: 1 }}>
                      {t.rate}<span style={{ fontSize: 18 }}>%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={S.card}>
              <div style={S.cardTitle}>💳 Paiements</div>
              <div style={S.empty}>
                <div style={S.emptyIcon}>💳</div>
                <p style={{ fontSize: 17 }}>Consultez tous les paiements enregistrés.</p>
              </div>
              <a href="/admin/payments" style={{ ...S.btn, ...S.btnGhost, ...S.btnFull }}>
                Voir les paiements
              </a>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminDashboard;