function Payment() {
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
        <h2>NOVADEMY - Paiement</h2>

        <nav style={{ display: "flex", gap: "20px" }}>
          <a href="/student/dashboard">Dashboard Élève</a>
          <a href="/pack-proposal">Pack</a>
          <a href="/">Accueil</a>
        </nav>
      </header>

      <main style={{ padding: "40px", display: "flex", justifyContent: "center" }}>
        <div style={formBox}>
          <h1>Finaliser le paiement</h1>

          <p style={{ marginTop: "10px", color: "#555" }}>
            Cette étape permet à l’élève de confirmer et payer la formule proposée.
          </p>

          <div style={summaryBox}>
            <h3>Résumé de la formule</h3>
            <p style={summaryText}>Le détail du pack sélectionné apparaîtra ici.</p>
          </div>

          <div style={{ marginTop: "20px" }}>
            <label>Montant</label>
            <input style={inputStyle} placeholder="Montant total" />
          </div>

          <div style={{ marginTop: "20px" }}>
            <label>Moyen de paiement</label>
            <select style={inputStyle}>
              <option>Choisir un moyen de paiement</option>
              <option>Carte bancaire</option>
              <option>Virement</option>
              <option>Portefeuille électronique</option>
            </select>
          </div>

          <div style={{ marginTop: "20px" }}>
            <label>Commission plateforme</label>
            <input style={inputStyle} placeholder="Commission appliquée" />
          </div>

          <div style={{ marginTop: "20px" }}>
            <label>Date de paiement</label>
            <input type="date" style={inputStyle} />
          </div>

          <button style={primaryButton}>
            Confirmer le paiement
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

const summaryBox = {
  marginTop: "20px",
  backgroundColor: "#fafafa",
  border: "1px solid #e5e5e5",
  borderRadius: "10px",
  padding: "16px",
};

const summaryText = {
  marginTop: "8px",
  color: "#555",
};

const inputStyle = {
  width: "100%",
  marginTop: "8px",
  padding: "12px",
  borderRadius: "8px",
  border: "1px solid #ccc",
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

export default Payment;