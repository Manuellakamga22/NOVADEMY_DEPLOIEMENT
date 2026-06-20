import React, { useEffect, useState } from "react";

import S from "../styles/pages/StudentPayments.styles.js";
import { apiFetch } from "../config/api.js";
import Sidebar from "../components/layout/Sidebar.jsx";

const TYPE_LABELS = {
  suivi_regulier:   "Suivi régulier",
  pack_heures:      "Pack d'heures",
  classe_virtuelle: "Classe virtuelle",
};

function StudentPayments() {
  const savedUser = localStorage.getItem("user");
  const user = savedUser ? JSON.parse(savedUser) : null;

  const [payments, setPayments] = useState([]);
  const [loading,  setLoading]  = useState(true);

  // je charge l'historique des paiements de l'élève
  useEffect(() => {
    if (!user?.id) { setLoading(false); return; }

    const fetchPayments = async () => {
      try {
        const res  = await apiFetch(`/api/payments/student/${user.id}`);
        if (!res.ok) return;
        const data = await res.json();
        setPayments(Array.isArray(data) ? data : []);
      } catch { /* silencieux */ }
      finally  { setLoading(false); }
    };

    fetchPayments();
  }, []);

  const totalPaid = payments.reduce((acc, p) => acc + Number(p.amount || 0), 0);

  return (
    <div style={S.wrap}>
      <div style={S.dash}>
        {/* ── SIDEBAR ── */}
        <Sidebar role={"eleve"} user={user} active={"/payment"} />

        <main style={S.main}>
          <div style={S.pageTitle}>Mes paiements</div>
          <div style={S.pageSub}>Historique de tous vos paiements effectués sur NOVADEMY.</div>

          <div style={S.stats}>
            <div style={S.statAccent}>
              <div style={S.statLabelW}>Total payé</div>
              <div style={S.statValW}>{loading ? "…" : `${totalPaid.toFixed(2)} €`}</div>
            </div>
            <div style={S.stat}>
              <div style={S.statLabel}>Paiements</div>
              <div style={S.statVal}>{loading ? "…" : payments.length}</div>
            </div>
            <div style={S.stat}>
              <div style={S.statLabel}>Profs payés</div>
              <div style={S.statVal}>{loading ? "…" : new Set(payments.map(p => p.teacher_id)).size}</div>
            </div>
          </div>

          <div style={S.card}>
            <div style={S.cardTitle}>Historique des paiements</div>

            {loading ? (
              <div style={S.empty}><p>Chargement…</p></div>
            ) : payments.length === 0 ? (
              <div style={S.empty}>
                <div style={S.emptyIcon}>💳</div>
                <p>Aucun paiement effectué pour le moment.</p>
                <a href="/student/packs" style={{ ...S.btn, ...S.btnPrimary, marginTop: 12, display: "inline-flex" }}>
                  Voir mes formules
                </a>
              </div>
            ) : (
              <table style={S.tbl}>
                <thead>
                  <tr>
                    <th style={S.tblTh}>Professeur</th>
                    <th style={S.tblTh}>Formule</th>
                    <th style={S.tblTh}>Montant</th>
                    <th style={S.tblTh}>Moyen de paiement</th>
                    <th style={S.tblTh}>Date</th>
                    <th style={S.tblTh}>Statut</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((p) => (
                    <tr key={p.id}>
                      <td style={S.tblTd}>
                        <div style={{ fontWeight: 600 }}>
                          {p.teacher_prenom || ""} {p.teacher_nom || ""}
                        </div>
                      </td>
                      <td style={S.tblTd}>
                        {TYPE_LABELS[p.formula_type] || p.formula_type || "—"}
                      </td>
                      <td style={S.tblTd}>
                        <strong>{Number(p.amount).toFixed(2)} €</strong>
                      </td>
                      <td style={S.tblTd}>{p.payment_method || "—"}</td>
                      <td style={S.tblTd}>
                        {p.payment_date
                          ? new Date(p.payment_date).toLocaleDateString("fr-FR")
                          : p.created_at
                          ? new Date(p.created_at).toLocaleDateString("fr-FR")
                          : "—"}
                      </td>
                      <td style={S.tblTd}>
                        <span style={{ ...S.pill, background: "#ECFDF5", color: "#059669" }}>
                          Validé
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default StudentPayments;