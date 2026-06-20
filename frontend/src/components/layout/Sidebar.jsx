import SB from "../../styles/components/Sidebar.styles.js";

const MENUS = {
  eleve: [
    { section: "Principal" },
    { label: "🏠 Tableau de bord", href: "/student/dashboard" },
    { label: "👤 Mon profil", href: "/student/profile" },
    { label: "🔍 Trouver un prof", href: "/search" },
    { label: "👩‍🏫 Mes professeurs", href: "/student/teachers" },
    { section: "Mes cours" },
    { label: "📬 Demandes d'essai", href: "/trial-request", badgeKey: "badge" },
    { label: "📚 Mes cours", href: "/student/courses" },
    { label: "📅 Mon calendrier", href: "/student/planning" },
    { label: "💬 Messages", href: "/student/chat" },
    { label: "🔔 Notifications", href: "/notifications" },
    { label: "👥 Classes collectives", href: "/student/collective/classes" },
    { section: "Compte" },
    { label: "💳 Paiements", href: "/payment" },
    { label: "⭐ Donner un avis", href: "/student/review" },
  ],
  professeur: [
    { section: "Principal" },
    { label: "🏠 Tableau de bord", href: "/teacher/dashboard" },
    { label: "👤 Mon profil", href: "/teacher/profile" },
    { label: "📢 Mes annonces", href: "/teacher/announcements" },
    { label: "🎓 Mes élèves", href: "/teacher/students" },
    { section: "Organisation" },
    { label: "📅 Planning", href: "/teacher/planning" },
    { label: "📬 Demandes d'essai", href: "/teacher/requests", badgeKey: "badge" },
    { label: "💬 Messages", href: "/teacher/chat" },
    { label: "🔔 Notifications", href: "/notifications" },
    { section: "Compte" },
    { label: "💳 Revenus", href: "/teacher/revenue" },
    { label: "📦 Nos formules", href: "/teacher/propose/formula" },
    { label: "👥 Classes collectives", href: "/teacher/collective/classes" },
    { label: "↩ Accueil", href: "/" },
  ],
  admin: [
    { section: "Vue globale" },
    { label: "📊 Tableau de bord", href: "/admin/dashboard" },
    { label: "👩‍🏫 Professeurs", href: "/admin/teachers" },
    { label: "🎓 Élèves", href: "/admin/students" },
    { label: "📢 Annonces", href: "/admin/announcements" },
    { section: "Suivi" },
    { label: "🧪 Cours d'essai", href: "/admin/trials" },
    { label: "💬 Modération avis", href: "/admin/reviews" },
    { label: "🛡️ Alertes IA", href: "/admin/alerts", badgeKey: "badge" },
    { label: "💳 Paiements", href: "/admin/payments" },
    { section: "Finance" },
    { label: "📈 Statistiques", href: "/admin/stats" },
    { label: "⚙️ Paramètres", href: "/admin/settings" },
  ],
};

const ROLE_LABELS = {
  eleve: "Élève",
  professeur: "Professeur",
  admin: "Admin",
};

function Sidebar({ role, user, active, badge = 0 }) {
  const menu = MENUS[role] || [];
  const initiale = user?.prenom?.[0]?.toUpperCase() || role?.[0]?.toUpperCase() || "U";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <aside style={SB.sidebar}>
      <div style={SB.brand}>
        <div style={SB.logo}>
          NOVA<span style={SB.logoEm}>DEMY</span>
        </div>
        <span style={SB.role}>{ROLE_LABELS[role] || role}</span>
      </div>

      <nav style={SB.nav}>
        {menu.map((item, i) => {
          if (item.section) {
            return <span key={i} style={SB.label}>{item.section}</span>;
          }
          const isActive = active === item.href;
          const count = item.badgeKey ? badge : 0;
          return (
            <a
              key={item.href}
              href={item.href}
              style={isActive ? SB.linkActive : SB.link}
            >
              {item.label}
              {count > 0 && <span style={SB.badge}>{count}</span>}
            </a>
          );
        })}
      </nav>

      <div style={SB.user}>
        <div style={SB.avatar}>{initiale}</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 19, fontWeight: 600 }}>
            {user ? `${user.prenom} ${user.nom}` : "Utilisateur"}
          </div>
          <div style={{ fontSize: 17, color: "#9CA3AF", marginTop: 2 }}>
            {ROLE_LABELS[role] || role}
          </div>
          <button style={SB.logoutBtn} onClick={handleLogout}>
            🚪 Se déconnecter
          </button>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
