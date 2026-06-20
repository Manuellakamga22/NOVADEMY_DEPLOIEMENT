import React, { useEffect, useState } from "react";

import S from "../styles/pages/StudentTeachers.styles.js";
import { apiFetch } from "../config/api.js";
import Sidebar from "../components/layout/Sidebar.jsx";

function StudentTeachers() {
  const savedUser = localStorage.getItem("user");
  const user  = savedUser ? JSON.parse(savedUser) : null;
  const token = localStorage.getItem("token");

  const [teachers, setTeachers] = useState([]);
  const [loading,  setLoading]  = useState(true);

  // je charge les profs depuis les formules acceptées/payées
  useEffect(() => {
    if (!user?.id) { setLoading(false); return; }

    const fetchTeachers = async () => {
      try {
        const res  = await fetch(
          `${import.meta.env.VITE_API_URL}/api/trials/student/${user.id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (!res.ok) return;
        const trials = await res.json();

        // je récupère aussi les formules acceptées/payées
        const resP = await fetch(
          `${import.meta.env.VITE_API_URL}/api/packs/student/${user.id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const proposals = resP.ok ? await resP.json() : [];

        // je déduplique les profs qui ont une formule acceptée ou payée
        const seen = new Set();
        const list = [];

        for (const t of trials) {
          if (t.status !== "accepted") continue;
          if (seen.has(t.teacher_id)) continue;

          // je cherche si ce prof a une formule acceptée/payée
          const formula = proposals.find(
            p => Number(p.teacher_id) === Number(t.teacher_id) &&
                 ["acceptee", "payee"].includes(p.status)
          );

          seen.add(t.teacher_id);
          list.push({
            id:        t.teacher_id,
            name:      `${t.teacher_prenom || ""} ${t.teacher_nom || ""}`.trim() || `Prof #${t.teacher_id}`,
            subject:   t.subject || "—",
            formula:   formula ? formula.type : "Essai accepté",
            status:    formula ? (formula.status === "payee" ? "actif" : "en attente") : "essai",
          });
        }

        setTeachers(list);
      } catch { /* silencieux */ }
      finally  { setLoading(false); }
    };

    fetchTeachers();
  }, []);

  return (
    <div style={S.wrap}>
      <div style={S.dash}>
        {/* ── SIDEBAR ── */}
        <Sidebar role={"eleve"} user={user} active={"/student/teachers"} />

        <main style={S.main}>
          <div style={S.topBar}>
            <p style={S.smallTitle}>Mes professeurs</p>
            <div style={S.smallSub}>
              Retrouvez ici les professeurs avec qui vous avez un suivi après validation de la formule.
            </div>
          </div>

          <div style={S.stats}>
            <div style={S.statAccent}>
              <div style={S.statLabelW}>Professeurs suivis</div>
              <div style={S.statValW}>{loading ? "…" : teachers.length}</div>
            </div>
            <div style={S.stat}>
              <div style={S.statLabel}>Formules actives</div>
              <div style={S.statVal}>{loading ? "…" : teachers.filter(t => t.status === "actif").length}</div>
            </div>
            <div style={S.stat}>
              <div style={S.statLabel}>En attente</div>
              <div style={S.statVal}>{loading ? "…" : teachers.filter(t => t.status !== "actif").length}</div>
            </div>
            <div style={S.stat}>
              <div style={S.statLabel}>Avis possibles</div>
              <div style={S.statVal}>{loading ? "…" : teachers.length}</div>
            </div>
          </div>

          <div style={S.card}>
            <div style={S.cardTitle}>Liste de mes professeurs</div>
            {loading ? (
              <div style={S.empty}>Chargement…</div>
            ) : teachers.length === 0 ? (
              <div style={S.empty}>Aucun professeur suivi pour le moment.</div>
            ) : (
              <div style={S.teacherList}>
                {teachers.map((teacher) => (
                  <div key={teacher.id} style={S.teacherCard}>
                    <div style={S.itemTop}>
                      <div>
                        <h4 style={S.itemTitle}>{teacher.name}</h4>
                        <p style={S.itemSub}>Matière : {teacher.subject}</p>
                      </div>
                      <span style={{ ...S.pill, background: teacher.status === "actif" ? "#ECFDF5" : "#FEF9C3", color: teacher.status === "actif" ? "#059669" : "#92400E" }}>
                        {teacher.status}
                      </span>
                    </div>
                    <div style={S.pillRow}>
                      <span style={{ ...S.pill, background: "#EFF6FF", color: "#2563EB" }}>
                        {teacher.formula}
                      </span>
                    </div>
                    <div style={S.btnRow}>
                      <a href="/student/chat" style={{ ...S.btn, ...S.btnPrimary }}>Ouvrir le chat</a>
                      <a href="/student/review" style={{ ...S.btn, ...S.btnGhost }}>Donner un avis</a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default StudentTeachers;