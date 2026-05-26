import React, { useEffect, useState } from "react";

const S = {
  wrap:{ fontFamily:"Segoe UI", minHeight:"100vh", background:"#F9FAFB" },
  logo:{ fontSize:20, fontWeight:800 },
  logoEm:{ color:"#2563EB" },
  dash:{ display:"grid", gridTemplateColumns:"240px 1fr", minHeight:"100vh" },
  sidebar:{ background:"#fff", borderRight:"1px solid #E5E7EB", display:"flex", flexDirection:"column", height:"100vh" },
  sbBrand:{ padding:20, borderBottom:"1px solid #E5E7EB" },
  sbRole:{ fontSize:10, fontWeight:700, background:"#FEF2F2", color:"#DC2626", padding:"2px 10px", borderRadius:20, display:"inline-block" },
  sbNav:{ padding:12, flex:1 },
  sbLink:{ padding:"10px 12px", display:"block", textDecoration:"none", color:"#4B5563" },
  sbLinkActive:{ padding:"10px 12px", display:"block", background:"#EFF6FF", color:"#2563EB", fontWeight:600, textDecoration:"none" },
  sbUser:{ padding:"14px 20px", borderTop:"1px solid #E5E7EB", display:"flex", alignItems:"center", gap:10 },
  av:{ width:34, height:34, borderRadius:"50%", background:"linear-gradient(135deg,#6B7280,#374151)", display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontWeight:700, fontSize:12, flexShrink:0 },
  main:{ padding:30 },
  title:{ fontSize:26, fontWeight:800 },
  sub:{ fontSize:14, color:"#9CA3AF", marginBottom:24 },
  grid:{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:16, marginTop:25 },
  card:{ background:"#fff", padding:20, borderRadius:12, border:"1px solid #E5E7EB" },
  stat:{ fontSize:30, fontWeight:800 },
  label:{ fontSize:12, color:"#9CA3AF", marginBottom:8 },
};

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
            fetch("http://localhost:5001/api/teachers",                   { headers }),
            fetch("http://localhost:5001/api/students",                   { headers }),
            fetch("http://localhost:5001/api/trials",                     { headers }),
            fetch("http://localhost:5001/api/payments",                   { headers }),
            fetch("http://localhost:5001/api/group-classes/open",         { headers }),
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
        <aside style={S.sidebar}>
          <div style={S.sbBrand}>
            <div style={S.logo}>NOVA<span style={S.logoEm}>DEMY</span></div>
            <div style={S.sbRole}>Admin</div>
          </div>

          <nav style={S.sbNav}>
            <a href="/admin/dashboard"     style={S.sbLink}>📊 Dashboard</a>
            <a href="/admin/teachers"      style={S.sbLink}>👩‍🏫 Professeurs</a>
            <a href="/admin/students"      style={S.sbLink}>🎓 Élèves</a>
            <a href="/admin/announcements" style={S.sbLink}>📢 Annonces</a>
            <a href="/admin/trials"        style={S.sbLink}>🧪 Essais</a>
            <a href="/admin/payments"      style={S.sbLink}>💳 Paiements</a>
            <a href="/admin/stats"         style={S.sbLinkActive}>📈 Statistiques</a>
            <a href="/admin/settings"      style={S.sbLink}>⚙️ Paramètres</a>
          </nav>

          <div style={S.sbUser}>
            <div style={S.av}>{user?.prenom?.[0]?.toUpperCase() || "A"}</div>
            <div>
              <div style={{ fontSize:13, fontWeight:600 }}>
                {user ? `${user.prenom} ${user.nom}` : "Administrateur"}
              </div>
              <div style={{ fontSize:11, color:"#9CA3AF" }}>Super Admin</div>
            </div>
          </div>
        </aside>

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