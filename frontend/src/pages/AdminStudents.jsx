import React, { useEffect, useState } from "react";

import S from "../styles/pages/AdminStudents.styles.js";
import { apiFetch } from "../config/api.js";
import Sidebar from "../components/layout/Sidebar.jsx";

function AdminStudents() {
  const savedUser = localStorage.getItem("user");
  const user  = savedUser ? JSON.parse(savedUser) : null;
  const token = localStorage.getItem("token");

  const [students, setStudents] = useState([]);
  const [trials,   setTrials]   = useState([]);
  const [search,   setSearch]   = useState("");
  const [loading,  setLoading]  = useState(true);

  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [studentsRes, trialsRes] = await Promise.all([
          apiFetch("/api/students", { headers }),
          apiFetch("/api/trials",   { headers }),
        ]);

        if (studentsRes.ok) {
          const data = await studentsRes.json();
          setStudents(Array.isArray(data) ? data : []);
        }

        // Les trials n'ont pas de route GET globale — on ignore silencieusement
        if (trialsRes.ok) {
          const data = await trialsRes.json();
          setTrials(Array.isArray(data) ? data : []);
        }
      } catch {
        // silencieux
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  // Enrichir chaque élève avec son nombre de demandes d'essai
  const enriched = students.map((s) => ({
    ...s,
    trialCount: trials.filter((t) => Number(t.student_id) === Number(s.id)).length,
  }));

  // Filtrage par recherche
  const filtered = enriched.filter((s) => {
    if (search === "") return true;
    return (
      `${s.prenom} ${s.nom}`.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase())
    );
  });

  // Stats
  const activeCount  = students.filter((s) => s.is_active !== 0).length;
  const pendingTrials = trials.filter((t) => t.status === "pending").length;

  return (
    <div style={S.wrap}>
      <div style={S.dash}>
        {/* ── SIDEBAR ── */}
        {/* ── SIDEBAR ── */}
        <Sidebar role={"admin"} user={user} active={"/admin/students"} />

        {/* ── MAIN ── */}
        <main style={S.main}>
          <div style={S.pageTitle}>Gestion des élèves</div>
          <div style={S.pageSub}>Suivi des comptes élèves, demandes et activité générale</div>

          {/* ── STATS ── */}
          <div style={S.stats}>
            <div style={S.statAccent}>
              <div style={S.statLabelW}>Élèves</div>
              <div style={S.statValW}>{loading ? "…" : students.length}</div>
            </div>
            <div style={S.stat}>
              <div style={S.statLabel}>Comptes actifs</div>
              <div style={S.statVal}>{loading ? "…" : activeCount}</div>
            </div>
            <div style={S.stat}>
              <div style={S.statLabel}>Demandes d'essai</div>
              <div style={S.statVal}>{loading ? "…" : trials.length}</div>
            </div>
            <div style={S.stat}>
              <div style={S.statLabel}>En attente</div>
              <div style={S.statVal}>{loading ? "…" : pendingTrials}</div>
            </div>
          </div>

          <div style={S.g2}>
            {/* ── LISTE ── */}
            <div style={S.card}>
              <div style={S.cardTitle}>Liste des élèves</div>

              <div style={S.searchRow}>
                <input
                  style={S.input}
                  placeholder="Rechercher un élève (nom ou email)"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button
                  style={{ ...S.btn, ...S.btnGhost }}
                  onClick={() => setSearch("")}
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
                  <div style={S.emptyIcon}>🎓</div>
                  <p style={{ fontSize: 13 }}>Aucun élève trouvé.</p>
                </div>
              ) : (
                <div style={{ overflowX: "auto" }}>
                  <table style={S.tbl}>
                    <thead>
                      <tr>
                        <th style={S.tblTh}>Nom</th>
                        <th style={S.tblTh}>Email</th>
                        <th style={S.tblTh}>Demandes</th>
                        <th style={S.tblTh}>Statut</th>
                        <th style={S.tblTh}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filtered.map((s) => (
                        <tr key={s.id}>
                          <td style={S.tblTd}>
                            <div style={{ fontWeight: 600 }}>{s.prenom} {s.nom}</div>
                          </td>
                          <td style={S.tblTd}>{s.email}</td>
                          <td style={S.tblTd}>
                            <span style={{
                              ...S.pill,
                              background: s.trialCount > 0 ? "#EFF6FF" : "#F3F4F6",
                              color:      s.trialCount > 0 ? "#2563EB" : "#6B7280",
                            }}>
                              {s.trialCount} demande{s.trialCount !== 1 ? "s" : ""}
                            </span>
                          </td>
                          <td style={S.tblTd}>
                            <span style={{
                              ...S.pill,
                              background: s.is_active !== 0 ? "#ECFDF5" : "#FEF2F2",
                              color:      s.is_active !== 0 ? "#059669" : "#DC2626",
                            }}>
                              {s.is_active !== 0 ? "Actif" : "Inactif"}
                            </span>
                          </td>
                          <td style={S.tblTd}>
                            <div style={S.actionRow}>
                              <a
                                href={`/admin/students/${s.id}`}
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
                <div style={S.infoLabel}>Total élèves</div>
                <div style={S.infoValue}>{loading ? "…" : students.length}</div>
              </div>

              <div style={S.infoBox}>
                <div style={S.infoLabel}>Comptes actifs</div>
                <div style={S.infoValue}>{loading ? "…" : activeCount}</div>
              </div>

              <div style={S.infoBox}>
                <div style={S.infoLabel}>Demandes en attente</div>
                <div style={S.infoValue}>{loading ? "…" : pendingTrials}</div>
              </div>

              <a
                href="/admin/trials"
                style={{ ...S.btn, ...S.btnPrimary, ...S.btnFull }}
              >
                Voir les demandes d'essai
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

export default AdminStudents;