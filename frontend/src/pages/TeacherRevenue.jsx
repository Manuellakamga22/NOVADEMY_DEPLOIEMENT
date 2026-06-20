import React, { useEffect, useState } from "react";

import S from "../styles/pages/TeacherRevenue.styles.js";
import { apiFetch } from "../config/api.js";
import Sidebar from "../components/layout/Sidebar.jsx";

function TeacherRevenue() {
  const savedUser = localStorage.getItem("user");
  const user  = savedUser ? JSON.parse(savedUser) : null;
  const token = localStorage.getItem("token");

  const [activeTab, setActiveTab] = useState("valides");
  const [revenues,  setRevenues]  = useState([]);
  const [loading,   setLoading]   = useState(true);

  // je charge les revenus du prof depuis ses paiements reçus
  useEffect(() => {
    if (!user?.id) { setLoading(false); return; }

    const fetchRevenues = async () => {
      try {
        const res  = await fetch(
          `${import.meta.env.VITE_API_URL}/api/payments/teacher/${user.id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (!res.ok) return;
        const data = await res.json();

        // je mappe les paiements vers le format revenus
        const list = Array.isArray(data) ? data.map(p => {
          const studentAmount  = Number(p.amount || p.final_price || 0);
          const teacherAmount  = Number(p.teacher_rate || 0) * Number(p.total_hours || 0);
          const commission     = studentAmount - teacherAmount;
          const typeLabel      = p.formula_type === "suivi_regulier" ? "Suivi régulier"
                               : p.formula_type === "pack_heures"    ? "Pack d'heures"
                               : p.formula_type === "classe_virtuelle" ? "Classe virtuelle"
                               : "Formule";
          return {
            id:            p.id,
            title:         typeLabel,
            offerType:     typeLabel,
            studentName:   `${p.student_prenom || ""} ${p.student_nom || ""}`.trim() || `Élève #${p.student_id}`,
            studentAmount: studentAmount.toFixed(2),
            teacherAmount: teacherAmount > 0 ? teacherAmount.toFixed(2) : studentAmount.toFixed(2),
            commission:    commission > 0 ? commission.toFixed(2) : "0.00",
            amount:        studentAmount,
            paymentDate:   p.payment_date
              ? new Date(p.payment_date).toLocaleDateString("fr-FR")
              : "—",
            details:       p.total_hours
              ? `${p.total_hours}h à ${p.teacher_rate}€/h`
              : "—",
            status:        "paye",
          };
        }) : [];

        setRevenues(list);
      } catch { /* silencieux */ }
      finally  { setLoading(false); }
    };

    fetchRevenues();
  }, []);

  const paidRevenues    = revenues.filter((r) => r.status === "paye");
  const pendingRevenues = revenues.filter((r) => r.status === "en_attente");
  const archivedRevenues = revenues.filter((r) => r.status === "archive");

  const getDisplayedRevenues = () => {
    if (activeTab === "valides") return paidRevenues;
    if (activeTab === "attente") return pendingRevenues;
    return archivedRevenues;
  };

  const displayedRevenues = getDisplayedRevenues();

  const getStatusBadge = (status) => {
    if (status === "paye") {
      return { background: "#ECFDF5", color: "#059669", label: "Payé" };
    }
    if (status === "en_attente") {
      return { background: "#FFF7ED", color: "#EA580C", label: "En attente" };
    }
    return { background: "#F3F4F6", color: "#6B7280", label: "Archivé" };
  };

  return (
    <div style={S.wrap}>
      <div style={S.dash}>
        {/* ── SIDEBAR ── */}
        <Sidebar role={"professeur"} user={user} active={"/teacher/revenue"} />

        <main style={S.main}>
          <div style={S.topBar}>
            <div>
              <p style={S.smallTitle}>Mes revenus</p>
              <div style={S.smallSub}>
                Suivez les montants liés aux formules validées, aux paiements
                reçus et aux cours actifs.
              </div>
            </div>
          </div>

          <div style={S.stats}>
            <div style={S.statAccent}>
              <div style={S.statLabelW}>Montant encaissé</div>
              <div style={S.statValW}>
                {paidRevenues.reduce((sum, r) => sum + Number(r.teacherAmount || 0), 0).toFixed(2)} €
              </div>
            </div>

            <div style={S.stat}>
              <div style={S.statLabel}>Paiements validés</div>
              <div style={S.statVal}>{paidRevenues.length}</div>
            </div>

            <div style={S.stat}>
              <div style={S.statLabel}>En attente</div>
              <div style={S.statVal}>{pendingRevenues.length}</div>
            </div>

            <div style={S.stat}>
              <div style={S.statLabel}>Historique</div>
              <div style={S.statVal}>{revenues.length}</div>
            </div>
          </div>

          <div style={S.card}>
            <div style={S.cardTitle}>Suivi financier</div>
            <div style={S.cardDesc}>
              Les revenus apparaissent après validation de la formule et paiement
              effectué par l’élève sur la plateforme.
            </div>

            <div style={S.tabs}>
              <button
                type="button"
                onClick={() => setActiveTab("valides")}
                style={activeTab === "valides" ? S.tabActive : S.tab}
              >
                Validés
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
                onClick={() => setActiveTab("archives")}
                style={activeTab === "archives" ? S.tabActive : S.tab}
              >
                Archivés
              </button>
            </div>

            {displayedRevenues.length === 0 ? (
              <div style={S.empty}>
                <div style={S.emptyIcon}>💳</div>
                <div style={S.emptyText}>
                  Aucun revenu affiché pour cette catégorie.
                </div>
              </div>
            ) : (
              <div style={S.revenueList}>
                {displayedRevenues.map((item) => {
                  const badge = getStatusBadge(item.status);

                  return (
                    <div key={item.id} style={S.revenueItem}>
                      <div style={S.revenueHead}>
                        <div>
                          <h4 style={S.revenueTitle}>{item.title}</h4>
                          <p style={S.revenueSub}>
                            {item.studentName}
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
                          <div style={S.infoValue}>{item.offerType}</div>
                        </div>

                        <div style={S.infoBox}>
                          <div style={S.infoLabel}>Montant prof</div>
                          <div style={S.infoValue}>{item.teacherAmount} €</div>
                        </div>

                        <div style={S.infoBox}>
                          <div style={S.infoLabel}>Montant élève</div>
                          <div style={S.infoValue}>{item.studentAmount} €</div>
                        </div>

                        <div style={S.infoBox}>
                          <div style={S.infoLabel}>Date</div>
                          <div style={S.infoValue}>{item.paymentDate}</div>
                        </div>
                      </div>

                      <div style={S.textBox}>
                        <div style={S.textTitle}>Détail</div>
                        <p style={S.textValue}>
                          {item.details} — Commission plateforme : {item.commission} €
                        </p>
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

export default TeacherRevenue;