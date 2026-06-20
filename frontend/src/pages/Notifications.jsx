import React, { useEffect, useState } from "react";

import S from "../styles/pages/Notifications.styles.js";
import { apiFetch } from "../config/api.js";
import Sidebar from "../components/layout/Sidebar.jsx";

// icône et couleur selon le type de notification
const typeConfig = {
  nouvelle_demande:  { icone: "📬", bg: "#EFF6FF" },
  demande_acceptee:  { icone: "✅", bg: "#ECFDF5" },
  demande_refusee:   { icone: "❌", bg: "#FEF2F2" },
  nouveau_message:   { icone: "💬", bg: "#F3E8FF" },
  paiement_recu:     { icone: "💰", bg: "#FFF7ED" },
  formule_proposee:  { icone: "📦", bg: "#EFF6FF" },
  cours_annule:      { icone: "🚫", bg: "#FEF2F2" },
};

function Notifications() {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const token = localStorage.getItem("token");

  const [notifications, setNotifications] = useState([]);
  const [nonLues, setNonLues] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    charger();
  }, []);

  async function charger() {
    setLoading(true);
    try {
      const res = await apiFetch("/api/notifications", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        setNotifications(data.notifications || []);
        setNonLues(data.non_lues || 0);
      }
    } catch {
      console.error("Impossible de charger les notifications");
    } finally {
      setLoading(false);
    }
  }

  async function marquerLue(id) {
    try {
      await apiFetch(`/api/notifications/${id}/lue`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotifications(prev =>
        prev.map(n => n._id === id ? { ...n, lue: true } : n)
      );
      setNonLues(prev => Math.max(prev - 1, 0));
    } catch {
      console.error("Erreur");
    }
  }

  async function toutMarquerLues() {
    try {
      await apiFetch("/api/notifications/toutes/lues", {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotifications(prev => prev.map(n => ({ ...n, lue: true })));
      setNonLues(0);
    } catch {
      console.error("Erreur");
    }
  }

  async function supprimer(id, e) {
    e.stopPropagation();
    try {
      await apiFetch(`/api/notifications/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotifications(prev => prev.filter(n => n._id !== id));
    } catch {
      console.error("Erreur");
    }
  }

  function handleClic(notif) {
    if (!notif.lue) marquerLue(notif._id);
    if (notif.lien) window.location.href = notif.lien;
  }

  function formatDate(dateStr) {
    const d = new Date(dateStr);
    const now = new Date();
    const diffMin = Math.floor((now - d) / 60000);
    if (diffMin < 1) return "À l'instant";
    if (diffMin < 60) return `Il y a ${diffMin} min`;
    const diffH = Math.floor(diffMin / 60);
    if (diffH < 24) return `Il y a ${diffH}h`;
    return d.toLocaleDateString("fr-FR");
  }

  const role = user?.role || "student";

  return (
    <div style={S.wrap}>
      <div style={S.dash}>

        {/* ── SIDEBAR ── */}
        <Sidebar role={(user?.role === "teacher" ? "professeur" : "eleve")} user={user} active={"/notifications"} />

        <main style={S.main}>
          <div style={S.topRow}>
            <div>
              <div style={S.pageTitle}>
                🔔 Notifications
                {nonLues > 0 && (
                  <span style={{ ...S.badge, marginLeft: 12, fontSize: 14 }}>
                    {nonLues} nouvelle{nonLues > 1 ? "s" : ""}
                  </span>
                )}
              </div>
            </div>
            {nonLues > 0 && (
              <button style={S.btnToutLire} onClick={toutMarquerLues}>
                Tout marquer comme lu
              </button>
            )}
          </div>

          <div style={S.card}>
            {loading ? (
              <div style={S.empty}>
                <div style={S.emptyIcon}>⏳</div>
                <p>Chargement...</p>
              </div>
            ) : notifications.length === 0 ? (
              <div style={S.empty}>
                <div style={S.emptyIcon}>🔔</div>
                <p>Aucune notification pour le moment.</p>
              </div>
            ) : (
              notifications.map((n, i) => {
                const config = typeConfig[n.type] || { icone: "🔔", bg: "#F3F4F6" };
                const isLast = i === notifications.length - 1;
                return (
                  <div
                    key={n._id}
                    style={{
                      ...(n.lue ? S.notifItem : S.notifItemNonLue),
                      borderBottom: isLast ? "none" : "1px solid #F3F4F6",
                    }}
                    onClick={() => handleClic(n)}
                  >
                    {/* icône */}
                    <div style={{ ...S.notifIconWrap, background: config.bg }}>
                      {config.icone}
                    </div>

                    {/* contenu */}
                    <div style={S.notifCorps}>
                      <div style={S.notifTitre}>{n.titre}</div>
                      <div style={S.notifMsg}>{n.message}</div>
                      <div style={S.notifDate}>{formatDate(n.createdAt)}</div>
                    </div>

                    {/* point bleu si non lue */}
                    {!n.lue && <div style={S.dotNonLu} />}

                    {/* bouton supprimer */}
                    <button
                      style={S.btnSuppr}
                      onClick={e => supprimer(n._id, e)}
                      title="Supprimer">
                      ×
                    </button>
                  </div>
                );
              })
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Notifications;
