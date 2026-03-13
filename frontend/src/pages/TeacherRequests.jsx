function TeacherRequests() {
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
        <h2>NOVADEMY - Demandes de cours d’essai</h2>

        <nav style={{ display: "flex", gap: "20px" }}>
          <a href="/teacher/dashboard">Dashboard Prof</a>
          <a href="/teacher/profile">Profil</a>
          <a href="/">Accueil</a>
        </nav>
      </header>

      <main style={{ padding: "40px" }}>
        <h1 style={{ marginBottom: "10px" }}>Demandes reçues</h1>
        <p style={{ marginBottom: "30px", color: "#555" }}>
          Consultez et gérez les demandes de cours d’essai envoyées par les élèves.
        </p>

        <section style={boxStyle}>
          <h3 style={{ marginBottom: "15px" }}>Liste des demandes</h3>

          <div style={requestCardStyle}>
            <h4>Demande de cours d’essai</h4>
            <p style={{ marginTop: "8px", color: "#555" }}>
              Les informations de la demande apparaîtront ici : matière, niveau,
              objectifs, format souhaité et disponibilités.
            </p>

            <div style={{ marginTop: "18px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
              <button style={primaryButton}>Valider</button>
              <button style={secondaryButton}>Reporter</button>
              <button style={dangerButton}>Refuser</button>
              <button style={neutralButton}>Voir détail</button>
            </div>
          </div>

          <div style={requestCardStyle}>
            <h4>Autre demande</h4>
            <p style={{ marginTop: "8px", color: "#555" }}>
              Une autre demande d’essai pourra être affichée ici avec son état.
            </p>

            <div style={{ marginTop: "18px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
              <button style={primaryButton}>Valider</button>
              <button style={secondaryButton}>Reporter</button>
              <button style={dangerButton}>Refuser</button>
              <button style={neutralButton}>Voir détail</button>
            </div>
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
  padding: "25px",
};

const requestCardStyle = {
  border: "1px solid #e5e5e5",
  borderRadius: "10px",
  padding: "20px",
  marginBottom: "20px",
  backgroundColor: "#fafafa",
};

const primaryButton = {
  padding: "10px 14px",
  backgroundColor: "black",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};

const secondaryButton = {
  padding: "10px 14px",
  backgroundColor: "#dbeafe",
  color: "#1e3a8a",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};

const dangerButton = {
  padding: "10px 14px",
  backgroundColor: "#fee2e2",
  color: "#991b1b",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};

const neutralButton = {
  padding: "10px 14px",
  backgroundColor: "#e5e7eb",
  color: "#111827",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};

export default TeacherRequests;