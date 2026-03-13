function PackProposal() {
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
        <h2>NOVADEMY - Proposition de pack</h2>

        <nav style={{ display: "flex", gap: "20px" }}>
          <a href="/teacher/dashboard">Dashboard Prof</a>
          <a href="/teacher/requests">Demandes</a>
          <a href="/">Accueil</a>
        </nav>
      </header>

      <main style={{ padding: "40px", display: "flex", justifyContent: "center" }}>
        <div style={formBox}>
          <h1>Proposer une formule</h1>

          <p style={{ marginTop: "10px", color: "#555" }}>
            Après le cours d’essai, le professeur peut proposer un pack adapté
            aux besoins de l’élève.
          </p>

          <div style={{ marginTop: "20px" }}>
            <label>Type de pack</label>
            <select style={inputStyle}>
              <option>Choisir une formule</option>
              <option>Suivi régulier de 3 mois</option>
              <option>Pack d&apos;heures sur 1 mois</option>
            </select>
          </div>

          <div style={{ marginTop: "20px" }}>
            <label>Nombre d’heures</label>
            <input style={inputStyle} placeholder="Ex : 8" />
          </div>

          <div style={{ marginTop: "20px" }}>
            <label>Prix total</label>
            <input style={inputStyle} placeholder="Ex : 240 €" />
          </div>

          <div style={{ marginTop: "20px" }}>
            <label>Validité du pack</label>
            <input style={inputStyle} placeholder="Ex : 1 mois / 3 mois" />
          </div>

          <div style={{ marginTop: "20px" }}>
            <label>Message d’accompagnement</label>
            <textarea
              style={textareaStyle}
              placeholder="Expliquez la formule proposée à l’élève"
            />
          </div>

          <button style={primaryButton}>
            Envoyer la proposition
          </button>
        </div>
      </main>
    </div>
  );
}

const formBox = {
  width: "560px",
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
  resize: "vertical",
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

export default PackProposal;