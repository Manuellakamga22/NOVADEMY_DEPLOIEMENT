function AdminDashboard() {
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
        <h2>NOVADEMY - Espace Admin</h2>

        <nav style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
          <a href="#">Utilisateurs</a>
          <a href="#">Professeurs</a>
          <a href="#">Élèves</a>
          <a href="#">Annonces</a>
          <a href="#">Paiements</a>
          <a href="#">Statistiques</a>
        </nav>
      </header>

      <main style={{ padding: "30px 40px" }}>
        <h1 style={{ marginBottom: "10px" }}>
          Tableau de bord administrateur
        </h1>

        <p style={{ marginBottom: "30px", color: "#555" }}>
          Gérez la plateforme, suivez les commissions, les annonces, les
          utilisateurs et les performances globales de NOVADEMY.
        </p>

        {/* Vue d’ensemble */}
        <section style={{ marginBottom: "30px" }}>
          <h3 style={{ marginBottom: "15px" }}>Vue d’ensemble</h3>

          <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
            <div style={statCardStyle}>
              <h4>Utilisateurs</h4>
              <p style={statValueStyle}>0</p>
            </div>

            <div style={statCardStyle}>
              <h4>Professeurs</h4>
              <p style={statValueStyle}>0</p>
            </div>

            <div style={statCardStyle}>
              <h4>Élèves</h4>
              <p style={statValueStyle}>0</p>
            </div>

            <div style={statCardStyle}>
              <h4>Annonces actives</h4>
              <p style={statValueStyle}>0</p>
            </div>
          </div>
        </section>

        {/* Gestion utilisateurs */}
        <section style={{ marginBottom: "30px" }}>
          <h3 style={{ marginBottom: "15px" }}>Gestion des utilisateurs</h3>

          <div style={boxStyle}>
            <p>
              Consultez l’ensemble des comptes de la plateforme et gérez leur
              statut.
            </p>

            <div style={{ marginTop: "16px", display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <button style={btn}>Voir les utilisateurs</button>
              <button style={secondaryBtn}>Activer / Désactiver</button>
            </div>
          </div>
        </section>

        {/* Gestion professeurs */}
        <section style={{ marginBottom: "30px" }}>
          <h3 style={{ marginBottom: "15px" }}>Gestion des professeurs</h3>

          <div style={boxStyle}>
            <p>
              Vérifiez les profils enseignants, leurs annonces, leurs niveaux et
              leurs heures enseignées.
            </p>

            <div style={{ marginTop: "16px", display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <button style={btn}>Voir les professeurs</button>
              <button style={secondaryBtn}>Valider un profil</button>
            </div>
          </div>
        </section>

        {/* Gestion élèves */}
        <section style={{ marginBottom: "30px" }}>
          <h3 style={{ marginBottom: "15px" }}>Gestion des élèves</h3>

          <div style={boxStyle}>
            <p>
              Consultez les fiches élèves et suivez leurs demandes de mise en
              relation.
            </p>

            <button style={btn}>Voir les élèves</button>
          </div>
        </section>

        {/* Gestion annonces */}
        <section style={{ marginBottom: "30px" }}>
          <h3 style={{ marginBottom: "15px" }}>Gestion des annonces</h3>

          <div style={boxStyle}>
            <p>
              Contrôlez les annonces publiées par les professeurs et leur
              conformité.
            </p>

            <div style={{ marginTop: "16px", display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <button style={btn}>Voir les annonces</button>
              <button style={dangerBtn}>Suspendre une annonce</button>
            </div>
          </div>
        </section>

        {/* Cours d’essai */}
        <section style={{ marginBottom: "30px" }}>
          <h3 style={{ marginBottom: "15px" }}>Suivi des cours d’essai</h3>

          <div style={boxStyle}>
            <p>
              Suivez les demandes, les validations, les reports et les refus des
              cours d’essai.
            </p>

            <button style={btn}>Voir les demandes</button>
          </div>
        </section>

        {/* Avis */}
        <section style={{ marginBottom: "30px" }}>
          <h3 style={{ marginBottom: "15px" }}>Modération des avis</h3>

          <div style={boxStyle}>
            <p>
              Contrôlez les avis publiés par les élèves afin de garantir la
              qualité des retours et la fiabilité des notes.
            </p>

            <div style={{ marginTop: "16px", display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <button style={btn}>Voir les avis</button>
              <button style={dangerBtn}>Masquer un avis</button>
            </div>
          </div>
        </section>

        {/* Paiements */}
        <section style={{ marginBottom: "30px" }}>
          <h3 style={{ marginBottom: "15px" }}>Paiements</h3>

          <div style={boxStyle}>
            <p>
              Suivez les paiements effectués par les élèves après proposition de
              pack.
            </p>

            <button style={btn}>Voir les paiements</button>
          </div>
        </section>

        {/* Commissions */}
        <section style={{ marginBottom: "30px" }}>
          <h3 style={{ marginBottom: "15px" }}>Commissions plateforme</h3>

          <div style={boxStyle}>
            <p>
              La plateforme applique une commission variable selon le nombre
              d’heures enseignées par le professeur.
            </p>

            <ul style={{ marginTop: "12px", paddingLeft: "20px", color: "#555" }}>
              <li>0 à 20 h : 15%</li>
              <li>20 à 100 h : 12%</li>
              <li>100 à 300 h : 7%</li>
              <li>Plus de 300 h : 3%</li>
            </ul>

            <p style={{ marginTop: "12px", color: "#555" }}>
              L’élève voit uniquement le prix final. La commission est une
              donnée interne suivie par la plateforme.
            </p>
          </div>
        </section>

        {/* Statistiques */}
        <section style={{ marginBottom: "30px" }}>
          <h3 style={{ marginBottom: "15px" }}>Statistiques plateforme</h3>

          <div style={boxStyle}>
            <p>Cette section affichera plus tard :</p>

            <ul style={{ marginTop: "12px", paddingLeft: "20px", color: "#555" }}>
              <li>nombre total de cours réalisés</li>
              <li>heures enseignées</li>
              <li>revenus générés</li>
              <li>commissions générées</li>
              <li>taux de validation des cours d’essai</li>
              <li>notes moyennes des professeurs</li>
              <li>nombre de classes groupe créées</li>
            </ul>
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

const btn = {
  padding: "10px 14px",
  backgroundColor: "black",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};

const secondaryBtn = {
  padding: "10px 14px",
  backgroundColor: "#e5e7eb",
  color: "#111827",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};

const dangerBtn = {
  padding: "10px 14px",
  backgroundColor: "#fee2e2",
  color: "#991b1b",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};

export default AdminDashboard;