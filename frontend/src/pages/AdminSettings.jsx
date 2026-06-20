import React, { useEffect, useState } from "react";

import S from "../styles/pages/AdminSettings.styles.js";
import { apiFetch } from "../config/api.js";
import Sidebar from "../components/layout/Sidebar.jsx";

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
        const res = await apiFetch("/api/settings", { headers });
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
      const res = await apiFetch("/api/settings", {
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
      const res = await apiFetch("/api/settings", {
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
        {/* ── SIDEBAR ── */}
        <Sidebar role={"admin"} user={user} active={"/admin/settings"} />

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