import React, { useEffect, useState } from "react";

import S from "../styles/pages/AdminStats.styles.js";
import { apiFetch } from "../config/api.js";
import Sidebar from "../components/layout/Sidebar.jsx";

function AdminStats() {
  const savedUser = localStorage.getItem("user");
  const user  = savedUser ? JSON.parse(savedUser) : null;
  const token = localStorage.getItem("token");

  const [teachers,      setTeachers]      = useState([]);
  const [students,      setStudents]      = useState([]);
  const [trials,        setTrials]        = useState([]);
  const [payments,      setPayments]      = useState([]);
  const [groupClasses,  setGroupClasses]  = useState([]);
  const [loading,       setLoading]       = useState(true);

  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [teachersRes, studentsRes, trialsRes, paymentsRes, groupRes] =
          await Promise.all([
            apiFetch("/api/teachers",                   { headers }),
            apiFetch("/api/students",                   { headers }),
            apiFetch("/api/trials",                     { headers }),
            apiFetch("/api/payments",                   { headers }),
            apiFetch("/api/group-classes/open",         { headers }),
          ]);

        if (teachersRes.ok)     setTeachers(await teachersRes.json());
        if (studentsRes.ok)     setStudents(await studentsRes.json());
        if (trialsRes.ok)       setTrials(await trialsRes.json());
        if (paymentsRes.ok)     setPayments(await paymentsRes.json());
        if (groupRes.ok)        setGroupClasses(await groupRes.json());
      } catch {
        // silencieux
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  // Calculs
  const acceptedTrials  = Array.isArray(trials) ? trials.filter((t) => t.status === "accepted") : [];
  const totalTrials     = Array.isArray(trials) ? trials.length : 0;
  const validationRate  = totalTrials > 0
    ? Math.round((acceptedTrials.length / totalTrials) * 100)
    : 0;

  const totalRevenue    = Array.isArray(payments)
    ? payments.reduce((acc, p) => acc + Number(p.amount || 0), 0)
    : 0;

  const activeTeachers  = Array.isArray(teachers) ? teachers.length : 0;
  const activeStudents  = Array.isArray(students) ? students.length : 0;
  const totalGroupClasses = Array.isArray(groupClasses) ? groupClasses.length : 0;

  const V = (val) => loading ? "…" : val;

  return (
    <div style={S.wrap}>
      <div style={S.dash}>

        {/* ── SIDEBAR ── */}
        {/* ── SIDEBAR ── */}
        <Sidebar role={"admin"} user={user} active={"/admin/stats"} />

        {/* ── MAIN ── */}
        <main style={S.main}>
          <div style={S.title}>Statistiques plateforme</div>
          <div style={S.sub}>Vue d'ensemble des indicateurs clés</div>

          <div style={S.grid}>
            <div style={S.card}>
              <div style={S.label}>Cours d'essai réalisés</div>
              <div style={S.stat}>{V(acceptedTrials.length)}</div>
            </div>

            <div style={S.card}>
              <div style={S.label}>Taux de validation essais</div>
              <div style={S.stat}>{V(`${validationRate} %`)}</div>
            </div>

            <div style={S.card}>
              <div style={S.label}>Revenus plateforme</div>
              <div style={S.stat}>{V(`${totalRevenue.toFixed(0)} €`)}</div>
            </div>

            <div style={S.card}>
              <div style={S.label}>Paiements enregistrés</div>
              <div style={S.stat}>{V(Array.isArray(payments) ? payments.length : 0)}</div>
            </div>

            <div style={S.card}>
              <div style={S.label}>Demandes d'essai totales</div>
              <div style={S.stat}>{V(totalTrials)}</div>
            </div>

            <div style={S.card}>
              <div style={S.label}>Profs inscrits</div>
              <div style={S.stat}>{V(activeTeachers)}</div>
            </div>

            <div style={S.card}>
              <div style={S.label}>Élèves inscrits</div>
              <div style={S.stat}>{V(activeStudents)}</div>
            </div>

            <div style={S.card}>
              <div style={S.label}>Sessions collectives</div>
              <div style={S.stat}>{V(totalGroupClasses)}</div>
            </div>
          </div>
        </main>

      </div>
    </div>
  );
}

export default AdminStats;