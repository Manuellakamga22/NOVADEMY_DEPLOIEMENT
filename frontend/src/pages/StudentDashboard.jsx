function StudentDashboard() {
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
          flexWrap: "wrap",
          gap: "16px",
        }}
      >
        <h2>NOVADEMY - Espace Élève</h2>

        <nav style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
          <a href="#">Profil</a>
          <a href="#">Rechercher un prof</a>
          <a href="#">Mes demandes</a>
          <a href="#">Mes cours</a>
          <a href="#">Messages</a>
          <a href="#">Avis</a>
        </nav>
      </header>

      <main style={{ padding: "30px 40px" }}>
        <h1 style={{ marginBottom: "10px" }}>
          Bienvenue dans votre espace élève
        </h1>

        <p style={{ marginBottom: "30px", color: "#555" }}>
          Recherchez un professeur, demandez un cours d’essai, suivez vos cours
          et donnez votre avis.
        </p>

        {/* Profil */}
        <section style={{ marginBottom: "30px" }}>
          <h3 style={{ marginBottom: "15px" }}>Profil</h3>

          <div style={boxStyle}>
            <p>
              Consultez et modifiez vos informations personnelles et vos besoins
              pédagogiques.
            </p>

            <button style={btn}>Modifier mon profil</button>
          </div>
        </section>

        {/* Recherche */}
        <section style={{ marginBottom: "30px" }}>
          <h3 style={{ marginBottom: "15px" }}>Rechercher un professeur</h3>

          <div style={boxStyle}>
            <p>
              Trouvez un professeur selon la matière, la ville ou le format
              (présentiel / visio).
            </p>

            <div style={{ marginTop: "15px" }}>
              <input style={input} placeholder="Matière" />
              <input style={input} placeholder="Ville" />
              <select style={input}>
                <option>Format</option>
                <option>Présentiel</option>
                <option>Visio</option>
              </select>
            </div>

            <button style={btn}>Lancer la recherche</button>
          </div>
        </section>

        {/* Demandes */}
        <section style={{ marginBottom: "30px" }}>
          <h3 style={{ marginBottom: "15px" }}>Demandes de cours d’essai</h3>

          <div style={boxStyle}>
            <p>
              Envoyez une demande et échangez avec le professeur sur vos besoins.
            </p>

            <button style={btn}>Faire une demande</button>

            <p style={{ marginTop: "15px", color: "#555" }}>
              Aucune demande pour le moment.
            </p>
          </div>
        </section>

        {/* Cours */}
        <section style={{ marginBottom: "30px" }}>
          <h3 style={{ marginBottom: "15px" }}>Mes cours</h3>

          <div style={boxStyle}>
            <p>
              Consultez vos cours confirmés et vos packs en cours.
            </p>

            <p style={{ marginTop: "15px", color: "#555" }}>
              Aucun cours actif.
            </p>
          </div>
        </section>

        {/* Messages */}
        <section style={{ marginBottom: "30px" }}>
          <h3 style={{ marginBottom: "15px" }}>Messages</h3>

          <div style={boxStyle}>
            <p>
              Échangez avec votre professeur après validation du cours d’essai.
            </p>

            <button style={btn}>Ouvrir le chat</button>
          </div>
        </section>

        {/* Avis */}
        <section style={{ marginBottom: "30px" }}>
          <h3 style={{ marginBottom: "15px" }}>Donner un avis</h3>

          <div style={boxStyle}>
            <p>
              Après vos cours, vous pouvez évaluer le professeur afin d’aider
              les autres élèves.
            </p>

            <button style={btn}>Donner un avis</button>
          </div>
        </section>
      </main>
    </div>
  );
}

const boxStyle = {
  backgroundColor: "white",
  border: "1px solid #ddd",
  borderRadius: "12px",
  padding: "20px",
};

const btn = {
  marginTop: "15px",
  padding: "10px 14px",
  backgroundColor: "black",
  color: "white",
  border: "none",
  borderRadius: "6px",
};

const input = {
  display: "block",
  marginTop: "10px",
  padding: "10px",
  width: "100%",
  borderRadius: "6px",
  border: "1px solid #ccc",
};

export default StudentDashboard;