import React, { useEffect, useState } from "react";

import S from "../styles/pages/AdminTrials.styles.js";
import { apiFetch } from "../config/api.js";
import Sidebar from "../components/layout/Sidebar.jsx";

const STATUS_COLORS = {
  pending:  { bg: "#FFF7ED", col: "#EA580C", label: "En attente" },
  accepted: { bg: "#ECFDF5", col: "#059669", label: "Validé" },
  reported: { bg: "#EFF6FF", col: "#2563EB", label: "Reporté" },
  refused:  { bg: "#FEF2F2", col: "#DC2626", label: "Refusé" },
};

function AdminTrials() {
  const savedUser = localStorage.getItem("user");
  const user  = savedUser ? JSON.parse(savedUser) : null;
  const token = localStorage.getItem("token");

  const [trials,       setTrials]       = useState([]);
  const [search,       setSearch]       = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [loading,      setLoading]      = useState(true);

  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    const fetchTrials = async () => {
      try {
        const res = await apiFetch("/api/trials", { headers });
        if (res.ok) {
          const data = await res.json();
          setTrials(Array.isArray(data) ? data : []);
        }
      } catch {
        // silencieux
      } finally {
        setLoading(false);
      }
    };
    fetchTrials();
  }, []);

  // Filtrage
  const filtered = trials.filter((t) => {
    const studentName = `${t.student_prenom || ""} ${t.student_nom || ""}`.toLowerCase();
    const teacherName = `${t.teacher_prenom || ""} ${t.teacher_nom || ""}`.toLowerCase();
    const matchSearch =
      search === "" ||
      studentName.includes(search.toLowerCase()) ||
      teacherName.includes(search.toLowerCase()) ||
      (t.subject || "").toLowerCase().includes(search.toLowerCase());
    const matchStatus =
      filterStatus === "" || t.status === filterStatus;
    return matchSearch && matchStatus;
  });

  // Stats
  const countPending  = trials.filter((t) => t.status === "pending").length;
  const countAccepted = trials.filter((t) => t.status === "accepted").length;
  const countRefused  = trials.filter((t) => t.status === "refused").length;
  const countReported = trials.filter((t) => t.status === "reported").length;

  return (
    <div style={S.wrap}>
      <div style={S.dash}>
        {/* ── SIDEBAR ── */}
        {/* ── SIDEBAR ── */}
        <Sidebar role={"admin"} user={user} active={"/admin/trials"} />

        {/* ── MAIN ── */}
        <main style={S.main}>
          <div style={S.pageTitle}>Suivi des cours d'essai</div>
          <div style={S.pageSub}>Demandes, validations, reports et refus</div>

          {/* ── STATS ── */}
          <div style={S.stats}>
            <div style={S.statAccent}>
              <div style={S.statLabelW}>Cours d'essai</div>
              <div style={S.statValW}>{loading ? "…" : trials.length}</div>
            </div>
            <div style={S.stat}>
              <div style={S.statLabel}>En attente</div>
              <div style={S.statVal}>{loading ? "…" : countPending}</div>
            </div>
            <div style={S.stat}>
              <div style={S.statLabel}>Validés</div>
              <div style={S.statVal}>{loading ? "…" : countAccepted}</div>
            </div>
            <div style={S.stat}>
              <div style={S.statLabel}>Refusés</div>
              <div style={S.statVal}>{loading ? "…" : countRefused}</div>
            </div>
          </div>

          <div style={S.g2}>
            {/* ── LISTE ── */}
            <div style={S.card}>
              <div style={S.cardTitle}>Liste des demandes</div>

              <div style={S.searchRow}>
                <input
                  style={S.input}
                  placeholder="Rechercher élève, prof ou matière"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <select
                  style={S.input}
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="">Tous statuts</option>
                  <option value="pending">En attente</option>
                  <option value="accepted">Validé</option>
                  <option value="reported">Reporté</option>
                  <option value="refused">Refusé</option>
                </select>
                <button
                  style={{ ...S.btn, ...S.btnGhost }}
                  onClick={() => { setSearch(""); setFilterStatus(""); }}
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
                  <div style={S.emptyIcon}>🧪</div>
                  <p style={{ fontSize: 13 }}>Aucun cours d'essai trouvé.</p>
                </div>
              ) : (
                <div style={{ overflowX: "auto" }}>
                  <table style={S.tbl}>
                    <thead>
                      <tr>
                        <th style={S.tblTh}>Élève</th>
                        <th style={S.tblTh}>Professeur</th>
                        <th style={S.tblTh}>Matière</th>
                        <th style={S.tblTh}>Créneau</th>
                        <th style={S.tblTh}>Statut</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filtered.map((t) => {
                        const st = STATUS_COLORS[t.status] || STATUS_COLORS.pending;
                        return (
                          <tr key={t.id}>
                            <td style={S.tblTd}>
                              {t.student_prenom} {t.student_nom}
                            </td>
                            <td style={S.tblTd}>
                              {t.teacher_prenom} {t.teacher_nom}
                            </td>
                            <td style={S.tblTd}>{t.subject || "—"}</td>
                            <td style={S.tblTd}>
                              {t.requested_day
                                ? `${t.requested_day} ${t.requested_start_time || ""}`
                                : "—"}
                            </td>
                            <td style={S.tblTd}>
                              <span style={{ ...S.pill, background: st.bg, color: st.col }}>
                                {st.label}
                              </span>
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
              <div style={S.cardTitle}>Résumé</div>

              <div style={S.infoBox}>
                <div style={S.infoLabel}>En attente</div>
                <div style={S.infoValue}>{loading ? "…" : countPending}</div>
              </div>

              <div style={S.infoBox}>
                <div style={S.infoLabel}>Validés</div>
                <div style={S.infoValue}>{loading ? "…" : countAccepted}</div>
              </div>

              <div style={S.infoBox}>
                <div style={S.infoLabel}>Reportés</div>
                <div style={S.infoValue}>{loading ? "…" : countReported}</div>
              </div>

              <div style={S.infoBox}>
                <div style={S.infoLabel}>Refusés</div>
                <div style={S.infoValue}>{loading ? "…" : countRefused}</div>
              </div>

              <a
                href="/admin/students"
                style={{ ...S.btn, ...S.btnPrimary, ...S.btnFull }}
              >
                Voir les élèves
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

export default AdminTrials;