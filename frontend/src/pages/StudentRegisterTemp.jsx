function StudentRegisterTemp() {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f7f7f7",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Arial, sans-serif",
        padding: "30px 20px",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "40px",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          width: "100%",
          maxWidth: "500px",
        }}
      >
        <h1 style={{ textAlign: "center", marginBottom: "10px", color: "#1f2f46" }}>
          Inscription Élève
        </h1>

        <p style={{ textAlign: "center", marginBottom: "30px", color: "#666" }}>
          Créez votre compte élève pour trouver un professeur.
        </p>

        <form>
          <div style={{ marginBottom: "16px" }}>
            <label>Nom</label>
            <input
              type="text"
              placeholder="Votre nom"
              style={inputStyle}
            />
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label>Prénom</label>
            <input
              type="text"
              placeholder="Votre prénom"
              style={inputStyle}
            />
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label>Email</label>
            <input
              type="email"
              placeholder="Votre email"
              style={inputStyle}
            />
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label>Mot de passe</label>
            <input
              type="password"
              placeholder="Votre mot de passe"
              style={inputStyle}
            />
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label>Niveau scolaire</label>
            <select style={inputStyle}>
              <option>Choisir un niveau</option>
              <option>Primaire</option>
              <option>Collège</option>
              <option>Lycée</option>
              <option>Supérieur</option>
            </select>
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label>Ville</label>
            <input
              type="text"
              placeholder="Votre ville"
              style={inputStyle}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label>Format souhaité</label>
            <select style={inputStyle}>
              <option>Choisir un format</option>
              <option>Présentiel</option>
              <option>Visio</option>
              <option>Les deux</option>
            </select>
          </div>

          <button type="submit" style={buttonStyle}>
            Créer mon compte élève
          </button>
        </form>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginTop: "8px",
  border: "1px solid #ccc",
  borderRadius: "8px",
};

const buttonStyle = {
  width: "100%",
  padding: "12px",
  backgroundColor: "black",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "16px",
};

export default StudentRegisterTemp;