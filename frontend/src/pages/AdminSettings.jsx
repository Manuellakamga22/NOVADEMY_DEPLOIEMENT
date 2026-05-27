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
  sub:{ fontSize:14, color:"#9CA3AF", marginBottom:4 },
  card:{ background:"#fff", padding:20, borderRadius:12, border:"1px solid #E5E7EB", marginTop:20 },
  cardTitle:{ fontSize:16, fontWeight:700, marginBottom:16, color:"#111827" },
  label:{ fontSize:14, fontWeight:600, marginBottom:6, color:"#374151", display:"block" },
  input:{ width:"100%", padding:10, border:"1px solid #E5E7EB", borderRadius:8, marginBottom:12, fontFamily:"inherit", fontSize:14, outline:"none", boxSizing:"border-box" },
  btn:{ background:"#2563EB", color:"#fff", padding:"10px 20px", border:"none", borderRadius:8, fontWeight:700, cursor:"pointer", fontFamily:"inherit", fontSize:14 },
  successMsg:{ background:"#ECFDF5", border:"1px solid #A7F3D0", color:"#059669", borderRadius:8, padding:"10px 14px", fontSize:13, marginTop:12 },
  errorMsg:{ background:"#FEF2F2", border:"1px solid #FECACA", color:"#DC2626", borderRadius:8, padding:"10px 14px", fontSize:13, marginTop:12 },
};

function AdminSettings() {
  const savedUser = localStorage.getItem("user");
  const user  = savedUser ? JSON.parse(savedUser) : null;
  const token = localStorage.getItem("token");
  const headers = { Authorization: `Bearer ${token}` };

  const [loading, setLoading] = useState(true);
  const [saving,  setSaving]  = useState(false);

  const [commissions, setCommissions] = useState({
    commission_debutant:      "15",
    commission_intermediaire: "12",
    commission_avance:        "7",
    commission_expert:        "3",
  });
  const [commMsg,  setCommMsg]  = useState(null);

  const [seuil,    setSeuil]    = useState("5");
  const [seuilMsg, setSeuilMsg] = useState(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch("${import.meta.env.VITE_API_URL}/api/settings", { headers });
        if (res.ok) {
          const data = await res.json();
          setCommissions({
            commission_debutant:      data.commission_debutant      || "15",
            commission_intermediaire: data.commission_intermediaire || "12",
            commission_avance:        data.commission_avance        || "7",
            commission_expert:        data.commission_expert        || "3",
          });
          setSeuil(data.seuil_classe_collective || "5");
        }
      } catch { /* silencieux */ }
      finally { setLoading(false); }
    };
    fetchSettings();
  }, []);

  const handleSaveCommissions = async () => {
    setSaving(true); setCommMsg(null);
    try {
      const res = await fetch("${import.meta.env.VITE_API_URL}/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json", ...headers },
        body: JSON.stringify(commissions),
      });
      const data = await res.json();
      if (!res.ok) { setCommMsg({ type:"error", text: data.message || "Erreur" }); }
      else {
        setCommMsg({ type:"success", text:"Commissions enregistrées avec succès." });
        setTimeout(() => setCommMsg(null), 3000);
      }
    } catch { setCommMsg({ type:"error", text:"Erreur de connexion." }); }
    finally { setSaving(false); }
  };

  const handleSaveSeuil = async () => {
    setSaving(true); setSeuilMsg(null);
    try {
      const res = await fetch("${import.meta.env.VITE_API_URL}/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json", ...headers },
        body: JSON.stringify({ seuil_classe_collective: seuil }),
      });
      const data = await res.json();
      if (!res.ok) { setSeuilMsg({ type:"error", text: data.message || "Erreur" }); }
      else {
        setSeuilMsg({ type:"success", text:"Seuil mis à jour avec succès." });
        setTimeout(() => setSeuilMsg(null), 3000);
      }
    } catch { setSeuilMsg({ type:"error", text:"Erreur de connexion." }); }
    finally { setSaving(false); }
  };

  return (
    <div style={S.wrap}>
      <div style={S.dash}>
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
            <a href="/admin/stats"         style={S.sbLink}>📈 Statistiques</a>
            <a href="/admin/settings"      style={S.sbLinkActive}>⚙️ Paramètres</a>
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

        <main style={S.main}>
          <div style={S.title}>Paramètres plateforme</div>
          <div style={S.sub}>
            {loading ? "Chargement…" : "Modifiez et enregistrez les paramètres globaux."}
          </div>

          <div style={S.card}>
            <div style={S.cardTitle}>🎖️ Commissions par niveau</div>

            <label style={S.label}>Commission débutant (%)</label>
            <input style={S.input} type="number" min="0" max="100"
              value={commissions.commission_debutant} disabled={loading}
              onChange={(e) => setCommissions({ ...commissions, commission_debutant: e.target.value })}
            />

            <label style={S.label}>Commission intermédiaire (%)</label>
            <input style={S.input} type="number" min="0" max="100"
              value={commissions.commission_intermediaire} disabled={loading}
              onChange={(e) => setCommissions({ ...commissions, commission_intermediaire: e.target.value })}
            />

            <label style={S.label}>Commission avancé (%)</label>
            <input style={S.input} type="number" min="0" max="100"
              value={commissions.commission_avance} disabled={loading}
              onChange={(e) => setCommissions({ ...commissions, commission_avance: e.target.value })}
            />

            <label style={S.label}>Commission expert (%)</label>
            <input style={S.input} type="number" min="0" max="100"
              value={commissions.commission_expert} disabled={loading}
              onChange={(e) => setCommissions({ ...commissions, commission_expert: e.target.value })}
            />

            <button style={{ ...S.btn, opacity: saving||loading ? 0.5 : 1, cursor: saving||loading ? "not-allowed":"pointer" }}
              onClick={handleSaveCommissions} disabled={saving||loading}>
              {saving ? "Enregistrement…" : "Enregistrer"}
            </button>

            {commMsg && (
              <div style={commMsg.type === "success" ? S.successMsg : S.errorMsg}>
                {commMsg.type === "success" ? "✓ " : "✗ "}{commMsg.text}
              </div>
            )}
          </div>

          <div style={S.card}>
            <div style={S.cardTitle}>👥 Seuil classe collective</div>

            <label style={S.label}>Nombre minimum d'élèves requis</label>
            <input style={S.input} type="number" min="2"
              value={seuil} disabled={loading}
              onChange={(e) => setSeuil(e.target.value)}
            />

            <button style={{ ...S.btn, opacity: saving||loading ? 0.5 : 1, cursor: saving||loading ? "not-allowed":"pointer" }}
              onClick={handleSaveSeuil} disabled={saving||loading}>
              {saving ? "Mise à jour…" : "Mettre à jour"}
            </button>

            {seuilMsg && (
              <div style={seuilMsg.type === "success" ? S.successMsg : S.errorMsg}>
                {seuilMsg.type === "success" ? "✓ " : "✗ "}{seuilMsg.text}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminSettings;