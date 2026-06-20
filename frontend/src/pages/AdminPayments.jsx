import React, { useEffect, useState } from "react";

import S from "../styles/pages/AdminPayments.styles.js";
import { apiFetch } from "../config/api.js";
import Sidebar from "../components/layout/Sidebar.jsx";

const TYPE_LABELS = {
  suivi_regulier:   "Suivi régulier",
  pack_heures:      "Pack d'heures",
  classe_virtuelle: "Classe virtuelle",
};

function AdminPayments() {
  const savedUser = localStorage.getItem("user");
  const user  = savedUser ? JSON.parse(savedUser) : null;
  const token = localStorage.getItem("token");

  const [payments, setPayments] = useState([]);
  const [search,   setSearch]   = useState("");
  const [loading,  setLoading]  = useState(true);

  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const res = await apiFetch(`/api/payments`, { headers });
        if (res.ok) {
          const data = await res.json();
          setPayments(Array.isArray(data) ? data : []);
        }
      } catch {
        // silencieux
      } finally {
        setLoading(false);
      }
    };
    fetchPayments();
  }, []);

  // Filtrage
  const filtered = payments.filter((p) => {
    if (search === "") return true;
    const name = `${p.student_prenom || ""} ${p.student_nom || ""}`.toLowerCase();
    return name.includes(search.toLowerCase());
  });

  // Stats
  const totalAmount      = payments.reduce((acc, p) => acc + Number(p.amount || 0), 0);
  const totalTeacher     = payments.reduce((acc, p) => {
    const earn = Number(p.teacher_rate || 0) * Number(p.total_hours || 0);
    return acc + (earn > 0 ? earn : Number(p.amount || 0));
  }, 0);
  const totalCommission  = totalAmount - totalTeacher;
  const countPayments    = payments.length;

  return (
    <div style={S.wrap}>
      <div style={S.dash}>
        {/* ── SIDEBAR ── */}
        <Sidebar role={"admin"} user={user} active={"/admin/payments"} />

        {/* ── MAIN ── */}
        <main style={S.main}>
          <div style={S.pageTitle}>Paiements plateforme</div>
          <div style={S.pageSub}>Suivi des paiements après acceptation formule</div>

          {/* ── STATS ── */}
          <div style={S.stats}>
            <div style={S.statAccent}>
              <div style={S.statLabelW}>Encaissé (élèves)</div>
              <div style={S.statValW}>{loading ? "…" : `${totalAmount.toFixed(2)} €`}</div>
            </div>
            <div style={S.stat}>
              <div style={S.statLabel}>Commission plateforme</div>
              <div style={{ ...S.statVal, color: "#2563EB", fontWeight: 800 }}>
                {loading ? "…" : `${totalCommission.toFixed(2)} €`}
              </div>
            </div>
            <div style={S.stat}>
              <div style={S.statLabel}>Reversé aux profs</div>
              <div style={S.statVal}>{loading ? "…" : `${totalTeacher.toFixed(2)} €`}</div>
            </div>
            <div style={S.stat}>
              <div style={S.statLabel}>Paiements validés</div>
              <div style={S.statVal}>{loading ? "…" : countPayments}</div>
            </div>
          </div>

          {/* ── RECHERCHE ── */}
          <div style={S.searchRow}>
            <input
              style={S.input}
              placeholder="Rechercher un élève"
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

          {/* ── TABLEAU ── */}
          <table style={S.tbl}>
            <thead>
              <tr>
                <th style={S.tblTh}>Élève</th>
                <th style={S.tblTh}>Professeur</th>
                <th style={S.tblTh}>Formule</th>
                <th style={S.tblTh}>Montant élève</th>
                <th style={S.tblTh}>Part prof</th>
                <th style={S.tblTh}>Commission</th>
                <th style={S.tblTh}>Date</th>
                <th style={S.tblTh}>Statut</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="8" style={{ padding: 20, textAlign: "center", color: "#9CA3AF" }}>
                    Chargement…
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan="8" style={{ padding: 20, textAlign: "center", color: "#9CA3AF" }}>
                    Aucun paiement pour le moment.
                  </td>
                </tr>
              ) : (
                filtered.map((p) => {
                  const studentAmt  = Number(p.amount || 0);
                  const teacherEarn = Number(p.teacher_rate || 0) * Number(p.total_hours || 0);
                  const commission  = teacherEarn > 0 ? studentAmt - teacherEarn : 0;
                  return (
                    <tr key={p.id}>
                      <td style={S.tblTd}>
                        <div style={{ fontWeight: 600 }}>
                          {p.student_prenom} {p.student_nom}
                        </div>
                      </td>
                      <td style={S.tblTd}>
                        {p.teacher_name || `Prof #${p.teacher_id || "—"}`}
                      </td>
                      <td style={S.tblTd}>
                        {TYPE_LABELS[p.formula_type] || p.formula_type || `#${p.pack_id}`}
                      </td>
                      <td style={S.tblTd}>
                        <strong>{studentAmt.toFixed(2)} €</strong>
                      </td>
                      <td style={S.tblTd}>
                        {teacherEarn > 0 ? `${teacherEarn.toFixed(2)} €` : "—"}
                      </td>
                      <td style={S.tblTd}>
                        <strong style={{ color: "#2563EB" }}>
                          {commission > 0 ? `${commission.toFixed(2)} €` : "—"}
                        </strong>
                      </td>
                      <td style={S.tblTd}>
                        {p.payment_date
                          ? new Date(p.payment_date).toLocaleDateString("fr-FR")
                          : "—"}
                      </td>
                      <td style={S.tblTd}>
                        <span style={{
                          ...S.pill,
                          background: "#ECFDF5",
                          color: "#059669",
                        }}>
                          Validé
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </main>
      </div>
    </div>
  );
}

export default AdminPayments;