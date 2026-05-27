import React, { useEffect, useState } from "react";

const S = {
  wrap: { fontFamily: "'Segoe UI', sans-serif", minHeight: "100vh", background: "#F9FAFB" },
  dash: { display: "grid", gridTemplateColumns: "280px 1fr", minHeight: "100vh" },
  sidebar: { background: "#fff", borderRight: "1px solid #E5E7EB", display: "flex", flexDirection: "column", position: "sticky", top: 0, height: "100vh", overflowY: "auto" },
  sbBrand: { padding: "26px 22px", borderBottom: "1px solid #E5E7EB" },
  logo: { fontSize: 21, fontWeight: 800, letterSpacing: "-0.02em" },
  logoEm: { color: "#2563EB" },
  sbRole: { display: "inline-block", marginTop: 10, fontSize: 13, fontWeight: 700, textTransform: "uppercase", padding: "5px 12px", borderRadius: 20, background: "#EFF6FF", color: "#2563EB" },
  sbNav: { padding: 14, flex: 1 },
  sbLabel: { fontSize: 12, fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", color: "#9CA3AF", padding: "0 10px", margin: "18px 0 8px", display: "block" },
  sbLink: { display: "flex", alignItems: "center", gap: 12, padding: "14px 15px", borderRadius: 10, fontSize: 16, fontWeight: 500, color: "#4B5563", textDecoration: "none", marginBottom: 4 },
  sbLinkActive: { display: "flex", alignItems: "center", gap: 12, padding: "14px 15px", borderRadius: 10, fontSize: 16, fontWeight: 700, color: "#2563EB", background: "#EFF6FF", textDecoration: "none", marginBottom: 4 },
  sbBadge: { marginLeft: "auto", background: "#2563EB", color: "#fff", fontSize: 12, fontWeight: 700, padding: "3px 9px", borderRadius: 10 },
  sbUser: { padding: "18px 22px", borderTop: "1px solid #E5E7EB", display: "flex", alignItems: "center", gap: 12 },
  av: { width: 42, height: 42, borderRadius: "50%", background: "linear-gradient(135deg,#2563EB,#1D4ED8)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 16, flexShrink: 0 },
  main: { padding: "30px" },
  topRow: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, flexWrap: "wrap", gap: 12 },
  pageTitle: { fontSize: 28, fontWeight: 800, color: "#111827" },
  badge: { background: "#2563EB", color: "#fff", fontSize: 13, fontWeight: 700, padding: "4px 12px", borderRadius: 20 },
  btnToutLire: { background: "#F3F4F6", color: "#4B5563", border: "none", borderRadius: 9, padding: "9px 16px", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" },
  card: { background: "#fff", border: "1px solid #E5E7EB", borderRadius: 14, marginBottom: 18 },
  // une notification
  notifItem: { display: "flex", gap: 14, padding: "16px 20px", borderBottom: "1px solid #F3F4F6", cursor: "pointer", transition: "background .1s" },
  notifItemNonLue: { display: "flex", gap: 14, padding: "16px 20px", borderBottom: "1px solid #F3F4F6", background: "#F0F7FF", cursor: "pointer" },
  notifIconWrap: { width: 40, height: 40, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 },
  notifCorps: { flex: 1 },
  notifTitre: { fontSize: 15, fontWeight: 700, color: "#111827", marginBottom: 3 },
  notifMsg: { fontSize: 14, color: "#6B7280", lineHeight: 1.5, marginBottom: 4 },
  notifDate: { fontSize: 12, color: "#9CA3AF" },
  dotNonLu: { width: 8, height: 8, borderRadius: "50%", background: "#2563EB", flexShrink: 0, marginTop: 6 },
  btnSuppr: { background: "none", border: "none", cursor: "pointer", color: "#9CA3AF", fontSize: 16, padding: "4px 6px", flexShrink: 0 },
  empty: { textAlign: "center", padding: "48px 20px", color: "#9CA3AF" },
  emptyIcon: { fontSize: 36, marginBottom: 12 },
};

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
      const res = await fetch("${import.meta.env.VITE_API_URL}/api/notifications", {
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
      await fetch(`${import.meta.env.VITE_API_URL}/api/notifications/${id}/lue`, {
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
      await fetch("${import.meta.env.VITE_API_URL}/api/notifications/toutes/lues", {
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
      await fetch(`${import.meta.env.VITE_API_URL}/api/notifications/${id}`, {
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

        <aside style={S.sidebar}>
          <div style={S.sbBrand}>
            <div style={S.logo}>NOVA<span style={S.logoEm}>DEMY</span></div>
            <span style={{ ...S.sbRole, background: role === "teacher" ? "#EFF6FF" : "#ECFDF5", color: role === "teacher" ? "#2563EB" : "#059669" }}>
              {role === "teacher" ? "Professeur" : "Élève"}
            </span>
          </div>
          <nav style={S.sbNav}>
            <span style={S.sbLabel}>Principal</span>
            {role === "teacher" ? (
              <>
                <a style={S.sbLink} href="/teacher/dashboard">🏠 Tableau de bord</a>
                <a style={S.sbLink} href="/teacher/profile">👤 Mon profil</a>
                <a style={S.sbLink} href="/teacher/announcements">📢 Annonces</a>
                <span style={S.sbLabel}>Organisation</span>
                <a style={S.sbLink} href="/teacher/planning">📅 Planning</a>
                <a style={S.sbLink} href="/teacher/requests">📬 Demandes</a>
                <a style={S.sbLinkActive} href="/notifications">
                  🔔 Notifications
                  {nonLues > 0 && <span style={S.sbBadge}>{nonLues}</span>}
                </a>
                <span style={S.sbLabel}>Compte</span>
                <a style={S.sbLink} href="/teacher/revenue">💳 Revenus</a>
              </>
            ) : (
              <>
                <a style={S.sbLink} href="/student/dashboard">🏠 Tableau de bord</a>
                <a style={S.sbLink} href="/student/profile">👤 Mon profil</a>
                <a style={S.sbLink} href="/search">🔍 Trouver un prof</a>
                <span style={S.sbLabel}>Mes cours</span>
                <a style={S.sbLink} href="/student/requests">📬 Mes demandes</a>
                <a style={S.sbLink} href="/student/planning">📅 Mon calendrier</a>
                <a style={S.sbLinkActive} href="/notifications">
                  🔔 Notifications
                  {nonLues > 0 && <span style={S.sbBadge}>{nonLues}</span>}
                </a>
                <span style={S.sbLabel}>Compte</span>
                <a style={S.sbLink} href="/student/payments">💳 Paiements</a>
              </>
            )}
          </nav>
          <div style={S.sbUser}>
            <div style={S.av}>{user?.prenom?.[0]?.toUpperCase() || "U"}</div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700 }}>
                {user ? user.prenom + " " + user.nom : "Utilisateur"}
              </div>
              <div style={{ fontSize: 13, color: "#9CA3AF" }}>
                {role === "teacher" ? "Professeur" : "Élève"}
              </div>
            </div>
          </div>
        </aside>

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
