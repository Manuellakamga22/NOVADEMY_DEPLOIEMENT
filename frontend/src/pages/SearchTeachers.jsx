function SearchTeachers() {
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
        <h2>NOVADEMY - Recherche de professeurs</h2>

        <nav style={{ display: "flex", gap: "20px" }}>
          <a href="/">Accueil</a>
          <a href="/student/dashboard">Dashboard Élève</a>
          <a href="/login">Connexion</a>
        </nav>
      </header>

      <main style={{ padding: "30px 40px" }}>
        <h1 style={{ marginBottom: "10px" }}>Trouver un professeur</h1>

        <p style={{ marginBottom: "30px", color: "#555" }}>
          Recherchez un enseignant selon la matière, la ville et le format de cours.
        </p>

        {/* Zone de recherche */}
        <section style={{ marginBottom: "30px" }}>
          <div style={searchBoxStyle}>
            <input type="text" placeholder="Matière" style={inputStyle} />
            <input type="text" placeholder="Ville" style={inputStyle} />

            <select style={inputStyle}>
              <option>Mode de formation</option>
              <option>Présentiel</option>
              <option>Visio</option>
            </select>

            <button style={buttonStyle}>Rechercher</button>
          </div>
        </section>

        {/* Résultats */}
        <section>
          <h3 style={{ marginBottom: "20px" }}>Résultats</h3>

          <div style={emptyBoxStyle}>
            <p>
              Aucun professeur affiché pour le moment.
            </p>
            <p style={{ marginTop: "8px", color: "#777" }}>
              Lancez une recherche pour voir les enseignants disponibles.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}

const searchBoxStyle = {
  backgroundColor: "white",
  border: "1px solid #ddd",
  borderRadius: "12px",
  padding: "20px",
  display: "flex",
  gap: "10px",
  flexWrap: "wrap",
};

const inputStyle = {
  padding: "12px",
  border: "1px solid #ccc",
  borderRadius: "8px",
  minWidth: "180px",
};

const buttonStyle = {
  padding: "12px 18px",
  backgroundColor: "black",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
};

const emptyBoxStyle = {
  backgroundColor: "white",
  border: "1px solid #ddd",
  borderRadius: "12px",
  padding: "40px",
  textAlign: "center",
};

export default SearchTeachers;