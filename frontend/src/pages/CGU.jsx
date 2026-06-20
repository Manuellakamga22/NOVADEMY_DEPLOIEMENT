function CGU() {
  return (
    <div style={page}>
      <header style={topbar}>
        <a href="/" style={logo}>NOVA<span style={{ color: "#2563EB" }}>DEMY</span></a>
        <a href="/" style={retour}>← Retour à l'accueil</a>
      </header>

      <div style={content}>
        <h1 style={titre}>Conditions Générales d'Utilisation</h1>
        <p style={intro}>
          En créant un compte sur NOVADEMY, vous acceptez les présentes conditions d'utilisation.
          Veuillez les lire attentivement avant de vous inscrire.
        </p>

        <Section titre="1. Présentation de la plateforme">
          <p>
            NOVADEMY est une plateforme web de mise en relation entre élèves et professeurs particuliers.
            Elle permet aux élèves de rechercher un professeur, de réserver un cours d'essai, d'échanger
            via la messagerie intégrée et de souscrire à des formules de cours.
          </p>
        </Section>

        <Section titre="2. Création de compte">
          <p>
            L'inscription est ouverte à toute personne souhaitant donner ou recevoir des cours particuliers.
            Chaque utilisateur s'engage à fournir des informations exactes et à jour lors de son inscription.
            Un compte ne peut être utilisé que par une seule personne et ne peut pas être partagé.
          </p>
          <p>
            En cas d'informations fausses ou d'utilisation frauduleuse, NOVADEMY se réserve le droit
            de suspendre ou supprimer le compte concerné sans préavis.
          </p>
        </Section>

        <Section titre="3. Comportement attendu">
          <p>
            Les utilisateurs s'engagent à se respecter mutuellement, à communiquer de façon professionnelle
            et à utiliser la plateforme dans un cadre pédagogique. Tout comportement offensant, discriminatoire
            ou contraire aux bonnes mœurs peut entraîner la suppression immédiate du compte.
          </p>
        </Section>

        <Section titre="4. Messagerie et contenus interdits">
          <p>
            La messagerie intégrée à NOVADEMY est réservée aux échanges pédagogiques entre élèves et professeurs.
            Il est interdit d'y partager des coordonnées personnelles (email, numéro de téléphone, adresse)
            dans le but de contourner la plateforme. Un système de détection automatique bloque ces contenus
            et en informe l'administrateur.
          </p>
          <p>
            Il est également interdit de diffuser des contenus à caractère publicitaire, illégal ou portant
            atteinte aux droits d'un tiers.
          </p>
        </Section>

        <Section titre="5. Responsabilités">
          <p>
            NOVADEMY agit en tant qu'intermédiaire de mise en relation. La qualité pédagogique des cours
            dispensés relève de la responsabilité du professeur. NOVADEMY ne peut être tenu responsable
            des litiges entre un élève et un professeur concernant le contenu ou le déroulement des cours.
          </p>
        </Section>

        <Section titre="6. Modification et résiliation">
          <p>
            NOVADEMY se réserve le droit de modifier les présentes CGU à tout moment. Les utilisateurs
            seront informés des changements importants. La poursuite de l'utilisation de la plateforme
            après modification vaut acceptation des nouvelles conditions.
          </p>
          <p>
            Chaque utilisateur peut supprimer son compte à tout moment en contactant l'administrateur
            de la plateforme.
          </p>
        </Section>

        <Section titre="7. Droit applicable">
          <p>
            Les présentes CGU sont régies par le droit français. En cas de litige, les tribunaux français
            seront compétents.
          </p>
        </Section>

        <p style={maj}>Dernière mise à jour : juin 2025</p>
      </div>

      <footer style={pied}>
        <a href="/cgu" style={piedLien}>CGU</a>
        <span style={{ color: "#9CA3AF" }}>·</span>
        <a href="/politique-confidentialite" style={piedLien}>Politique de confidentialité</a>
        <span style={{ color: "#9CA3AF" }}>·</span>
        <span style={{ color: "#9CA3AF", fontSize: 14 }}>© 2025 NOVADEMY</span>
      </footer>
    </div>
  );
}

function Section({ titre, children }) {
  return (
    <div style={section}>
      <h2 style={sousTitre}>{titre}</h2>
      {children}
    </div>
  );
}

const page = {
  fontFamily: "'Segoe UI', sans-serif",
  background: "#F9FAFB",
  minHeight: "100vh",
  color: "#111827",
};

const topbar = {
  background: "#fff",
  borderBottom: "1px solid #E5E7EB",
  padding: "0 48px",
  height: 64,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};

const logo = {
  fontSize: 22,
  fontWeight: 800,
  textDecoration: "none",
  color: "#111827",
};

const retour = {
  fontSize: 18,
  color: "#2563EB",
  fontWeight: 600,
  textDecoration: "none",
};

const content = {
  maxWidth: 820,
  margin: "0 auto",
  padding: "48px 24px",
  fontSize: 19,
  lineHeight: 1.8,
  color: "#374151",
};

const titre = {
  fontSize: 42,
  fontWeight: 800,
  marginBottom: 16,
  color: "#111827",
};

const intro = {
  fontSize: 20,
  color: "#6B7280",
  lineHeight: 1.8,
  marginBottom: 36,
  borderLeft: "4px solid #2563EB",
  paddingLeft: 16,
};

const section = {
  marginBottom: 36,
};

const sousTitre = {
  fontSize: 24,
  fontWeight: 700,
  color: "#1F2937",
  marginBottom: 12,
};

const maj = {
  marginTop: 48,
  fontSize: 16,
  color: "#9CA3AF",
};

const pied = {
  borderTop: "1px solid #E5E7EB",
  padding: "20px 48px",
  display: "flex",
  gap: 16,
  alignItems: "center",
  background: "#fff",
  fontSize: 16,
};

const piedLien = {
  color: "#2563EB",
  textDecoration: "none",
  fontWeight: 500,
  fontSize: 16,
};

export default CGU;
