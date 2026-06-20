function PolitiqueConfidentialite() {
  return (
    <div style={page}>
      <header style={topbar}>
        <a href="/" style={logo}>NOVA<span style={{ color: "#2563EB" }}>DEMY</span></a>
        <a href="/" style={retour}>← Retour à l'accueil</a>
      </header>

      <div style={content}>
        <h1 style={titre}>Politique de confidentialité</h1>
        <p style={intro}>
          Cette politique décrit comment NOVADEMY collecte, utilise et protège vos données personnelles,
          conformément au Règlement Général sur la Protection des Données (RGPD).
        </p>

        <Section titre="1. Responsable du traitement">
          <p>
            Le responsable du traitement des données est Manuella Kamga, développeuse et responsable du projet NOVADEMY.
            Pour toute question relative à vos données, vous pouvez nous contacter à l'adresse suivante :
            <strong> manuellakamga20@gmail.com</strong>
          </p>
        </Section>

        <Section titre="2. Données collectées">
          <p>
            Lors de votre inscription, nous collectons les informations suivantes : nom, prénom et adresse email.
            Un mot de passe est créé par vos soins et stocké de façon sécurisée (chiffré avec bcrypt).
            Nous ne collectons pas d'informations inutiles au fonctionnement du service.
          </p>
          <p>
            Dans le cadre des paiements, les données bancaires sont gérées directement par Stripe et ne transitent
            jamais par nos serveurs. NOVADEMY reçoit uniquement la confirmation du paiement.
          </p>
        </Section>

        <Section titre="3. Utilisation des données">
          <p>
            Vos données sont utilisées uniquement pour faire fonctionner la plateforme : créer et gérer votre compte,
            permettre la mise en relation avec des professeurs ou des élèves, traiter vos réservations et paiements,
            et vous envoyer des notifications liées à votre activité sur NOVADEMY.
          </p>
          <p>
            Vos données ne sont jamais vendues ni transmises à des tiers à des fins commerciales.
          </p>
        </Section>

        <Section titre="4. Durée de conservation">
          <p>
            Vos données sont conservées tant que votre compte est actif sur la plateforme. Si vous supprimez votre compte,
            vos données personnelles sont effacées ou anonymisées dans un délai raisonnable.
            Les données de facturation peuvent être conservées plus longtemps pour respecter nos obligations légales.
          </p>
        </Section>

        <Section titre="5. Vos droits">
          <p>
            Conformément au RGPD, vous disposez des droits suivants sur vos données : droit d'accès, de rectification,
            de suppression, de portabilité et d'opposition au traitement. Pour exercer ces droits, contactez-nous
            à <strong>manuellakamga20@gmail.com</strong>.
          </p>
          <p>
            En cas de litige non résolu, vous pouvez saisir la CNIL sur <strong>cnil.fr</strong>.
          </p>
        </Section>

        <Section titre="6. Sécurité des données">
          <p>
            NOVADEMY met en place plusieurs mesures de sécurité : chiffrement des mots de passe, authentification
            par token JWT, communication HTTPS, accès aux données limité selon le rôle de l'utilisateur.
            Ces mesures visent à protéger vos informations contre tout accès non autorisé.
          </p>
        </Section>

        <Section titre="7. Cookies">
          <p>
            NOVADEMY utilise uniquement des cookies fonctionnels nécessaires au bon fonctionnement du site
            (maintien de session, authentification). Aucun cookie publicitaire ou de suivi n'est utilisé.
            Vous pouvez accepter ou refuser les cookies via le bandeau affiché lors de votre première visite.
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

export default PolitiqueConfidentialite;
