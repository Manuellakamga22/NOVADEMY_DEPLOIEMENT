function DonnerDesCours() {
  return (
    <div style={pageStyle}>
      <header style={headerStyle}>
        <h2 style={logoStyle}>NOVADEMY</h2>
        <nav style={navStyle}>
          <a href="/" style={navLinkStyle}>Accueil</a>
          <a href="/formules" style={navLinkStyle}>Nos formules</a>
          <a href="/devis" style={navLinkStyle}>Demander un devis</a>
          <a href="/donner-cours" style={navLinkStyle}>Donner des cours</a>
          <a href="/aide" style={navLinkStyle}>Aide</a>
        </nav>
      </header>

      <main style={mainStyle}>
        <section style={heroStyle}>
          <h1 style={heroTitleStyle}>Donner des cours sur NOVADEMY</h1>
          <p style={heroTextStyle}>
            Rejoignez la plateforme, créez vos annonces et développez votre activité.
          </p>
        </section>

        <section style={cardsGridStyle}>
          <div style={cardStyle}>
            <h3 style={cardTitleStyle}>Créez votre profil</h3>
            <p style={cardTextStyle}>Présentez votre parcours, vos diplômes et vos compétences.</p>
          </div>

          <div style={cardStyle}>
            <h3 style={cardTitleStyle}>Publiez vos annonces</h3>
            <p style={cardTextStyle}>Définissez votre matière, votre tarif et votre mode de cours.</p>
          </div>

          <div style={cardStyle}>
            <h3 style={cardTitleStyle}>Recevez des demandes</h3>
            <p style={cardTextStyle}>Échangez avec les élèves et organisez les cours d’essai.</p>
          </div>
        </section>

        <div style={{ marginTop: "24px" }}>
          <a href="/register/teacher" style={buttonStyle}>Je veux enseigner</a>
        </div>
      </main>
    </div>
  );
}

const pageStyle = {
  minHeight: "100vh",
  background: "linear-gradient(180deg, #eef2ff 0%, #f8fafc 40%, #f7f7f7 100%)",
  fontFamily: "Arial, sans-serif",
};

const headerStyle = {
  background: "rgba(255,255,255,0.95)",
  padding: "20px 40px",
  borderBottom: "1px solid #e5e7eb",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexWrap: "wrap",
  gap: "16px",
};

const logoStyle = { margin: 0, color: "#312e81", fontSize: "30px" };
const navStyle = { display: "flex", gap: "14px", flexWrap: "wrap" };
const navLinkStyle = {
  textDecoration: "none",
  color: "#334155",
  fontWeight: "bold",
  fontSize: "17px",
  backgroundColor: "#fff",
  padding: "10px 14px",
  borderRadius: "10px",
  border: "1px solid #e2e8f0",
};

const mainStyle = { padding: "32px 40px", maxWidth: "1200px", margin: "0 auto" };

const heroStyle = {
  background: "linear-gradient(135deg, #4338ca 0%, #6366f1 100%)",
  color: "white",
  borderRadius: "22px",
  padding: "32px",
  marginBottom: "28px",
};

const heroTitleStyle = { margin: 0, fontSize: "42px" };
const heroTextStyle = { marginTop: "12px", fontSize: "21px", lineHeight: "1.6" };

const cardsGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
  gap: "18px",
};

const cardStyle = {
  background: "white",
  border: "1px solid #e5e7eb",
  borderRadius: "18px",
  padding: "24px",
  boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
};

const cardTitleStyle = { marginTop: 0, fontSize: "24px", color: "#1e293b" };
const cardTextStyle = { fontSize: "18px", color: "#64748b", lineHeight: "1.6" };

const buttonStyle = {
  display: "inline-block",
  padding: "14px 20px",
  borderRadius: "12px",
  background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
  color: "white",
  textDecoration: "none",
  fontSize: "18px",
  fontWeight: "bold",
};

export default DonnerDesCours;