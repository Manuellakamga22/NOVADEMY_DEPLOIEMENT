function TeacherDashboard() {
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
        <h2>NOVADEMY - Espace Professeur</h2>

        <nav style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
          <a href="#">Profil</a>
          <a href="#">Planning</a>
          <a href="#">Annonces</a>
          <a href="#">Demandes d’essai</a>
          <a href="#">Messages</a>
          <a href="#">Revenus</a>
        </nav>
      </header>

      <main style={{ padding: "30px 40px" }}>
        <h1 style={{ marginBottom: "10px" }}>
          Bienvenue dans votre espace professeur
        </h1>

        <p style={{ marginBottom: "30px", color: "#555" }}>
          Gérez votre profil, vos disponibilités, vos annonces, vos demandes de
          cours d’essai, vos packs, vos messages et vos revenus.
        </p>

        {/* Vue d’ensemble */}
        <section style={{ marginBottom: "30px" }}>
          <h3 style={{ marginBottom: "15px" }}>Vue d’ensemble</h3>

          <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
            <div style={statCardStyle}>
              <h4>Mes cours</h4>
              <p style={statValueStyle}>0</p>
            </div>

            <div style={statCardStyle}>
              <h4>Demandes d’essai</h4>
              <p style={statValueStyle}>0</p>
            </div>

            <div style={statCardStyle}>
              <h4>Heures enseignées</h4>
              <p style={statValueStyle}>0 h</p>
            </div>

            <div style={statCardStyle}>
              <h4>Mes revenus</h4>
              <p style={statValueStyle}>0 €</p>
            </div>
          </div>
        </section>

        {/* Statut professeur / commission */}
        <section style={{ marginBottom: "30px" }}>
          <h3 style={{ marginBottom: "15px" }}>Statut professeur</h3>

          <div style={boxStyle}>
            <p>
              <strong>Niveau actuel :</strong> Débutant
            </p>
            <p style={{ marginTop: "8px" }}>
              <strong>Commission appliquée :</strong> 15%
            </p>
            <p style={{ marginTop: "8px", color: "#555" }}>
              La commission évolue selon le nombre d’heures enseignées :
            </p>

            <ul style={{ marginTop: "10px", paddingLeft: "20px", color: "#555" }}>
              <li>0 à 20 h : 15%</li>
              <li>20 à 100 h : 12%</li>
              <li>100 à 300 h : 7%</li>
              <li>Plus de 300 h : 3%</li>
            </ul>
          </div>
        </section>

        {/* Profil */}
        <section style={{ marginBottom: "30px" }}>
          <h3 style={{ marginBottom: "15px" }}>Profil</h3>

          <div style={boxStyle}>
            <p>
              Complétez vos informations personnelles, vos matières enseignées,
              vos diplômes et vos coordonnées.
            </p>

            <div style={{ marginTop: "16px", display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <button style={smallButtonStyle}>Informations</button>
              <button style={smallButtonStyle}>Diplômes</button>
              <button style={smallButtonStyle}>Coordonnées</button>
            </div>
          </div>
        </section>

        {/* Planning */}
        <section style={{ marginBottom: "30px" }}>
          <h3 style={{ marginBottom: "15px" }}>Planning</h3>

          <div style={boxStyle}>
            <p>
              Définissez vos disponibilités, consultez vos cours d’essai, vos
              cours confirmés et vos classes en groupe.
            </p>

            <div style={{ marginTop: "15px" }}>
              <button style={smallButtonStyle}>Ajouter une disponibilité</button>
            </div>

            <div style={{ marginTop: "20px" }}>
              <p>
                <strong>Créneaux disponibles :</strong>
              </p>
              <ul style={{ marginTop: "8px", paddingLeft: "20px", color: "#555" }}>
                <li>Créneaux à définir</li>
              </ul>
            </div>

            <div style={{ marginTop: "20px" }}>
              <p>
                <strong>Cours d’essai :</strong>
              </p>
              <ul style={{ marginTop: "8px", paddingLeft: "20px", color: "#555" }}>
                <li>Aucun cours d’essai planifié pour le moment</li>
              </ul>
            </div>

            <div style={{ marginTop: "20px" }}>
              <p>
                <strong>Cours confirmés :</strong>
              </p>
              <ul style={{ marginTop: "8px", paddingLeft: "20px", color: "#555" }}>
                <li>Aucun cours confirmé pour le moment</li>
              </ul>
            </div>

            <div style={{ marginTop: "20px" }}>
              <p>
                <strong>Classes en groupe :</strong>
              </p>
              <ul style={{ marginTop: "8px", paddingLeft: "20px", color: "#555" }}>
                <li>Aucune classe groupe créée pour le moment</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Annonces */}
        <section style={{ marginBottom: "30px" }}>
          <h3 style={{ marginBottom: "15px" }}>Mes annonces</h3>

          <div style={boxStyle}>
            <p>
              Créez une ou plusieurs annonces selon la matière et fixez votre
              tarif de base.
            </p>

            <div style={{ marginTop: "16px" }}>
              <button style={smallButtonStyle}>Créer une annonce</button>
            </div>

            <div style={{ marginTop: "20px" }}>
              <p style={{ color: "#555" }}>
                Aucune annonce publiée pour le moment.
              </p>
            </div>
          </div>
        </section>

        {/* Demandes d’essai */}
        <section style={{ marginBottom: "30px" }}>
          <h3 style={{ marginBottom: "15px" }}>Demandes de cours d’essai</h3>

          <div style={boxStyle}>
            <p>
              Consultez les demandes envoyées par les élèves et choisissez de
              valider ou reporter le cours d’essai.
            </p>

            <div style={{ marginTop: "20px" }}>
              <div style={requestCardStyle}>
                <h4>Demande de cours d’essai</h4>
                <p style={{ marginTop: "8px", color: "#555" }}>
                  Les informations de la demande apparaîtront ici : matière,
                  niveau, besoins, format souhaité et disponibilités.
                </p>

                <div
                  style={{
                    marginTop: "18px",
                    display: "flex",
                    gap: "10px",
                    flexWrap: "wrap",
                  }}
                >
                  <button style={smallButtonStyle}>Valider</button>
                  <button style={secondaryButtonStyle}>Reporter</button>
                  <button style={dangerButtonStyle}>Refuser</button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Packs / formule */}
        <section style={{ marginBottom: "30px" }}>
          <h3 style={{ marginBottom: "15px" }}>Formules et packs</h3>

          <div style={boxStyle}>
            <p>
              Après le cours d’essai, vous pouvez proposer une formule adaptée
              à l’élève :
            </p>

            <ul style={{ marginTop: "10px", paddingLeft: "20px", color: "#555" }}>
              <li>suivi régulier de 3 mois</li>
              <li>pack d’heures sur 1 mois</li>
            </ul>

            <div style={{ marginTop: "16px" }}>
              <button style={smallButtonStyle}>Proposer une formule</button>
            </div>
          </div>
        </section>

        {/* Classes en groupe */}
        <section style={{ marginBottom: "30px" }}>
          <h3 style={{ marginBottom: "15px" }}>Classes en groupe</h3>

          <div style={boxStyle}>
            <p>
              Vous pouvez proposer des cours en groupe si plusieurs élèves ont
              les mêmes objectifs et des horaires compatibles.
            </p>

            <p style={{ marginTop: "10px", color: "#555" }}>
              Exemple : 10 €/h pour une classe de 4 élèves.
            </p>

            <div style={{ marginTop: "16px" }}>
              <button style={smallButtonStyle}>Créer une classe groupe</button>
            </div>
          </div>
        </section>

        {/* Chat */}
        <section style={{ marginBottom: "30px" }}>
          <h3 style={{ marginBottom: "15px" }}>Chat</h3>

          <div style={boxStyle}>
            <p>
              Échangez avec les élèves après validation du cours d’essai et
              préparez la séance.
            </p>

            <p style={{ marginTop: "10px", color: "#9a3412" }}>
              ⚠️ Les coordonnées personnelles ne doivent pas être échangées dans
              le chat.
            </p>

            <div style={{ marginTop: "16px", display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <button style={smallButtonStyle}>Ouvrir la messagerie</button>
              <button style={videoButtonStyle}>Rejoindre la classe virtuelle</button>
            </div>
          </div>
        </section>

        {/* Revenus */}
        <section style={{ marginBottom: "30px" }}>
          <h3 style={{ marginBottom: "15px" }}>Mes revenus</h3>

          <div style={boxStyle}>
            <p>
              Suivez ici vos gains, vos heures réalisées et l’évolution de votre
              commission.
            </p>

            <div style={{ marginTop: "16px", display: "flex", gap: "20px", flexWrap: "wrap" }}>
              <div style={miniInfoCardStyle}>
                <p style={miniInfoTitleStyle}>Tarif professeur</p>
                <p style={miniInfoValueStyle}>À définir</p>
              </div>

              <div style={miniInfoCardStyle}>
                <p style={miniInfoTitleStyle}>Prix affiché élève</p>
                <p style={miniInfoValueStyle}>Calculé avec commission</p>
              </div>

              <div style={miniInfoCardStyle}>
                <p style={miniInfoTitleStyle}>Total perçu</p>
                <p style={miniInfoValueStyle}>0 €</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

const statCardStyle = {
  backgroundColor: "white",
  border: "1px solid #ddd",
  borderRadius: "12px",
  padding: "20px",
  width: "220px",
};

const statValueStyle = {
  marginTop: "10px",
  fontSize: "24px",
  fontWeight: "bold",
};

const boxStyle = {
  backgroundColor: "white",
  border: "1px solid #ddd",
  borderRadius: "12px",
  padding: "20px",
};

const requestCardStyle = {
  border: "1px solid #e5e5e5",
  borderRadius: "10px",
  padding: "20px",
  backgroundColor: "#fafafa",
};

const miniInfoCardStyle = {
  backgroundColor: "#fafafa",
  border: "1px solid #e5e5e5",
  borderRadius: "10px",
  padding: "16px",
  minWidth: "180px",
};

const miniInfoTitleStyle = {
  color: "#555",
  fontSize: "14px",
};

const miniInfoValueStyle = {
  marginTop: "8px",
  fontWeight: "bold",
};

const smallButtonStyle = {
  padding: "10px 14px",
  backgroundColor: "black",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};

const secondaryButtonStyle = {
  padding: "10px 14px",
  backgroundColor: "#e5e7eb",
  color: "#111827",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};

const dangerButtonStyle = {
  padding: "10px 14px",
  backgroundColor: "#fee2e2",
  color: "#991b1b",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};

const videoButtonStyle = {
  padding: "10px 14px",
  backgroundColor: "#dbeafe",
  color: "#1e3a8a",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};

export default TeacherDashboard;