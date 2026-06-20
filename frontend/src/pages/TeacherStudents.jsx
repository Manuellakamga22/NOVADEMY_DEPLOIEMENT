import React, { useEffect, useState } from "react";

import S from "../styles/pages/TeacherStudents.styles.js";
import { apiFetch } from "../config/api.js";
import Sidebar from "../components/layout/Sidebar.jsx";

function TeacherStudents() {
  const savedUser = localStorage.getItem("user");
  const user = savedUser ? JSON.parse(savedUser) : null;
  const token = localStorage.getItem("token");

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [successMsg, setSuccessMsg] = useState("");

  // charge les élèves ayant un paiement validé avec ce prof
  useEffect(() => {
    if (!user?.id) { setLoading(false); return; }
    const charger = async () => {
      try {
        // on charge les paiements du prof pour récupérer les élèves
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/payments/teacher/${user.id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (!res.ok) throw new Error();
        const data = await res.json();
        // on déduplique par student_id
        const vus = new Set();
        const uniques = data.filter(p => {
          if (vus.has(p.student_id)) return false;
          vus.add(p.student_id);
          return true;
        });
        setStudents(uniques);
      } catch {
        // pas d'erreur bloquante, on affiche vide
      } finally {
        setLoading(false);
      }
    };
    charger();
  }, []);

  return (
    <div style={S.wrap}>
      <div style={S.dash}>
        {/* ── SIDEBAR ── */}
        <Sidebar role={"professeur"} user={user} active={"/teacher/students"} />

        <main style={S.main}>
          <div style={S.pageTitle}>🎓 Mes élèves</div>
          <div style={S.pageSub}>
            Les élèves apparaissent ici après qu'un paiement a été validé. Vous pouvez les contacter directement depuis cette page.
          </div>

          {successMsg && <div style={S.successMsg}>{successMsg}</div>}

          <div style={S.stats}>
            <div style={S.statAccent}>
              <div style={S.statLabelW}>Élèves suivis</div>
              <div style={S.statValW}>{students.length}</div>
            </div>
            <div style={S.stat}>
              <div style={S.statLabel}>Formules actives</div>
              <div style={S.statVal}>{students.length}</div>
            </div>
            <div style={S.stat}>
              <div style={S.statLabel}>Cours prévus</div>
              <div style={S.statVal}>—</div>
            </div>
            <div style={S.stat}>
              <div style={S.statLabel}>Total paiements</div>
              <div style={S.statVal}>{students.length}</div>
            </div>
          </div>

          <div style={S.card}>
            <div style={S.cardTitle}>Liste de mes élèves</div>
            {loading ? (
              <div style={S.empty}>Chargement…</div>
            ) : students.length === 0 ? (
              <div style={S.empty}>
                Aucun élève pour le moment.<br />
                <span style={{ fontSize: 13 }}>Les élèves apparaîtront ici après paiement validé.</span>
              </div>
            ) : (
              students.map((s, i) => (
                <div key={i} style={S.studentCard}>
                  <div style={S.itemTop}>
                    <div>
                      <h4 style={S.itemTitle}>
                        {s.student_prenom || s.prenom || "Élève"} {s.student_nom || s.nom || ""}
                      </h4>
                      <p style={S.itemSub}>
                        {s.student_email || s.email || "—"}
                      </p>
                    </div>
                    <span style={{ ...S.pill, background: "#ECFDF5", color: "#059669" }}>
                      actif
                    </span>
                  </div>

                  <div style={S.pillRow}>
                    <span style={{ ...S.pill, background: "#EFF6FF", color: "#2563EB" }}>
                      {s.amount ? `${s.amount} €` : "Paiement validé"}
                    </span>
                    <span style={{ ...S.pill, background: "#F3F4F6", color: "#4B5563" }}>
                      {s.payment_date ? new Date(s.payment_date).toLocaleDateString("fr-FR") : "—"}
                    </span>
                  </div>

                  <div style={S.btnRow}>
                    <a href="/teacher/chat" style={{ ...S.btn, ...S.btnPrimary }}>💬 Ouvrir le chat</a>
                    <a href="/teacher/planning" style={{ ...S.btn, ...S.btnGhost }}>📅 Voir le planning</a>
                  </div>
                </div>
              ))
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default TeacherStudents;
