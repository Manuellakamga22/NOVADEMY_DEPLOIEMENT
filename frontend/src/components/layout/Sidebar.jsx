import LogoutButton from "../common/LogoutButton";

function Sidebar({ role, user, active }) {
  const initiale = user?.prenom?.[0]?.toUpperCase() || role?.[0]?.toUpperCase() || "U";

  const links = {
    eleve: [
      ["Tableau de bord", "/student/dashboard"],
      ["Mon profil", "/student/profile"],
      ["Trouver un prof", "/search"],
      ["Demandes d'essai", "/trial-request"],
      ["Mes cours", "/student/courses"],
      ["Mon calendrier", "/student/planning"],
      ["Messages", "/student/chat"],
      ["Paiements", "/payment"],
      ["Donner un avis", "/student/review"],
    ],
    professeur: [
      ["Tableau de bord", "/teacher/dashboard"],
      ["Mon profil", "/teacher/profile"],
      ["Mes annonces", "/teacher/announcements"],
      ["Planning", "/teacher/planning"],
      ["Demandes", "/teacher/requests"],
      ["Messages", "/student/chat"],
      ["Revenus", "/teacher/revenue"],
      ["Classes collectives", "/teacher/collective/classes"],
    ],
    admin: [
      ["Tableau de bord", "/admin/dashboard"],
      ["Professeurs", "/admin/teachers"],
      ["Élèves", "/admin/students"],
      ["Annonces", "/admin/announcements"],
      ["Paiements", "/admin/payments"],
      ["Avis", "/admin/reviews"],
      ["Statistiques", "/admin/stats"],
      ["Paramètres", "/admin/settings"],
    ],
  };

  const menu = links[role] || [];

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="sidebar-logo">
          NOVA<span>DEMY</span>
        </div>
        <div className="sidebar-role">{role}</div>
      </div>

      <nav className="sidebar-nav">
        {menu.map(([label, href]) => (
          <a
            key={href}
            href={href}
            className={active === href ? "sidebar-link active" : "sidebar-link"}
          >
            {label}
          </a>
        ))}
      </nav>

      <div className="sidebar-user">
        <div className="sidebar-avatar">{initiale}</div>
        <div className="sidebar-user-info">
          <strong>{user ? `${user.prenom} ${user.nom}` : "Utilisateur"}</strong>
          <span>{role}</span>
          <LogoutButton />
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;