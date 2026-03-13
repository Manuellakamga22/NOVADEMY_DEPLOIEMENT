function TrialRequest() {
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
        <h2>NOVADEMY - Demande de cours d’essai</h2>

        <nav style={{ display: "flex", gap: "20px" }}>
          <a href="/">Accueil</a>
          <a href="/search">Recherche</a>
          <a href="/student/dashboard">Dashboard Élève</a>
        </nav>
      </header>

      <main style={{ padding: "40px", display: "flex", justifyContent: "center" }}>
        <div style={formBox}>
          <h1>Demander un cours d’essai</h1>

          <p style={{ marginTop: "10px", color: "#555" }}>
            Décrivez votre besoin afin que le professeur puisse préparer le premier échange.
          </p>

          <div style={{ marginTop: "20px" }}>
            <label>Matière</label>
            <input style={inputStyle} placeholder="Ex : Mathématiques" />
          </div>

          <div style={{ marginTop: "20px" }}>
            <label>Niveau</label>
            <select style={inputStyle}>
              <option>Choisir un niveau</option>
              <option>Primaire</option>
              <option>Collège</option>
              <option>Lycée</option>
              <option>Supérieur</option>
            </select>
          </div>

          <div style={{ marginTop: "20px" }}>
            <label>Objectif</label>
            <textarea
              style={textareaStyle}
              placeholder="Expliquez votre besoin (examens, soutien, préparation…)"
            />
          </div>

          <div style={{ marginTop: "20px" }}>
            <label>Format souhaité</label>
            <select style={inputStyle}>
              <option>Présentiel</option>
              <option>Visio</option>
              <option>Les deux</option>
            </select>
          </div>

          <div style={{ marginTop: "20px" }}>
            <label>Disponibilités</label>
            <input style={inputStyle} placeholder="Ex : mercredi après-midi" />
          </div>

          <button style={primaryButton}>
            Envoyer la demande
          </button>
        </div>
      </main>
    </div>
  );
}

const formBox = {
  width: "500px",
  backgroundColor: "white",
  padding: "30px",
  borderRadius: "12px",
  border: "1px solid #ddd",
};

const inputStyle = {
  width: "100%",
  marginTop: "8px",
  padding: "12px",
  borderRadius: "8px",
  border: "1px solid #ccc",
};

const textareaStyle = {
  width: "100%",
  marginTop: "8px",
  padding: "12px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  minHeight: "120px",
};

const primaryButton = {
  marginTop: "30px",
  width: "100%",
  padding: "14px",
  backgroundColor: "black",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
};

export default TrialRequest;