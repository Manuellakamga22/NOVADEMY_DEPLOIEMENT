function StudentProfile() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f7f7f7" }}>
      <header
        style={{
          backgroundColor: "white",
          padding: "20px 40px",
          borderBottom: "1px solid #ddd",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2>NOVADEMY - Profil élève</h2>

        <nav style={{ display: "flex", gap: "20px" }}>
          <a href="/">Accueil</a>
          <a href="/search">Recherche</a>
          <a href="/student/dashboard">Dashboard</a>
        </nav>
      </header>

      <main style={{ padding: "40px" }}>
        <section style={{ display: "flex", gap: "40px", flexWrap: "wrap" }}>
          
          {/* Carte profil */}
          <div style={profileCard}>
            <div style={avatar}></div>

            <h2 style={{ marginTop: "20px" }}>Nom de l’élève</h2>

            <p style={{ color: "#666", marginTop: "5px" }}>
              Niveau scolaire
            </p>

            <button style={primaryButton}>
              Modifier mon profil
            </button>
          </div>

          {/* Infos détaillées */}
          <div style={{ flex: 1, minWidth: "300px" }}>
            
            <div style={box}>
              <h3>Objectifs</h3>
              <p style={{ marginTop: "10px", color: "#555" }}>
                L’élève pourra décrire ici ses besoins pédagogiques.
              </p>
            </div>

            <div style={box}>
              <h3>Matières recherchées</h3>
              <p style={{ marginTop: "10px", color: "#555" }}>
                Liste des matières souhaitées.
              </p>
            </div>

            <div style={box}>
              <h3>Format souhaité</h3>
              <p style={{ marginTop: "10px", color: "#555" }}>
                Présentiel, visio ou les deux.
              </p>
            </div>

            <div style={box}>
              <h3>Disponibilités</h3>
              <p style={{ marginTop: "10px", color: "#555" }}>
                Créneaux disponibles pour les cours.
              </p>
            </div>

            <div style={box}>
              <h3>Historique des cours</h3>
              <p style={{ marginTop: "10px", color: "#555" }}>
                Les cours suivis apparaîtront ici.
              </p>
            </div>

          </div>

        </section>
      </main>
    </div>
  );
}

const profileCard = {
  width: "300px",
  backgroundColor: "white",
  border: "1px solid #ddd",
  borderRadius: "12px",
  padding: "30px",
  textAlign: "center",
};

const avatar = {
  width: "120px",
  height: "120px",
  borderRadius: "50%",
  backgroundColor: "#ddd",
  margin: "0 auto",
};

const box = {
  backgroundColor: "white",
  border: "1px solid #ddd",
  borderRadius: "12px",
  padding: "20px",
  marginBottom: "20px",
};

const primaryButton = {
  marginTop: "20px",
  padding: "12px",
  width: "100%",
  backgroundColor: "black",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
};

export default StudentProfile;