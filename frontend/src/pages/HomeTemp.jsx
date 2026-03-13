function HomeTemp() {
  return (
    <div
  style={{
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f7f7f7",
    minHeight: "100vh",
    color: "#1f2f46",
  }}
>
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px 50px",
          borderBottom: "1px solid #e5e5e5",
          backgroundColor: "#ffffff",
        }}
      >
        <div style={{ fontSize: "24px", fontWeight: "bold" }}>NOVADEMY</div>

        <nav
          style={{
            display: "flex",
            alignItems: "center",
            gap: "28px",
          }}
        >
          <a href="#" style={{ textDecoration: "none", color: "#222" }}>
            Nos formules
          </a>
          <a href="#" style={{ textDecoration: "none", color: "#222" }}>
            Demander un devis
          </a>
          <a href="#" style={{ textDecoration: "none", color: "#222" }}>
            Donner des cours
          </a>
          <a href="#" style={{ textDecoration: "none", color: "#222" }}>
            Aide
          </a>
          <a href="/login" style={{ textDecoration: "none", color: "#222" }}>
            Connexion
          </a>
          <a
            href="/register"
            style={{
              textDecoration: "none",
              color: "white",
              backgroundColor: "black",
              padding: "10px 18px",
              borderRadius: "6px",
            }}
          >
            Inscription
          </a>
        </nav>
      </header>

      <main
       style={{
  textAlign: "center",
  padding: "80px 20px",
  maxWidth: "1200px",
  margin: "0 auto",
}}
      >
        <h1 style={{ fontSize: "42px", marginBottom: "20px" }}>
          Avec NOVADEMY, trouvez le professeur qui vous correspond
        </h1>

        <p style={{ fontSize: "18px", marginBottom: "30px" }}>
          Un accompagnement sur mesure pour progresser efficacement avec des
          professeurs qualifiés.
        </p>

        <button
          style={{
            padding: "14px 28px",
            fontSize: "16px",
            backgroundColor: "black",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Trouver un professeur
        </button>
        <div style={{
  marginTop: "50px",
  display: "flex",
  justifyContent: "center",
  gap: "10px"
}}>
  <input placeholder="Matière" style={{ padding: "12px", width: "180px" }} />
  <input placeholder="Ville" style={{ padding: "12px", width: "180px" }} />
  
  <select style={{ padding: "12px", width: "180px" }}>
    <option>Mode de formation</option>
    <option>Présentiel</option>
    <option>Visio</option>
  </select>

  <button style={{
    padding: "12px 20px",
    background: "black",
    color: "white",
    border: "none"
  }}>
    Rechercher
  </button>
</div>
<section
  style={{
    padding: "60px 20px",
    textAlign: "center",
  }}
>
  <h2 style={{ fontSize: "32px", marginBottom: "15px" }}>
    Pourquoi nous choisir?
  </h2>

  <p style={{ fontSize: "18px", marginBottom: "40px", color: "#444" }}>
    Une mise en relation simple entre élèves et professeurs.
  </p>

  <div
    style={{
      display: "flex",
      justifyContent: "center",
      gap: "30px",
      flexWrap: "wrap",
    }}
  >
    <div
      style={{
        width: "220px",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "10px",
      }}
    >
      <h3>1. Recherchez</h3>
      <p>Trouvez un professeur selon la matière, la ville et le format du cours.</p>
    </div>

    <div
      style={{
        width: "220px",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "10px",
      }}
    >
      <h3>2. Échangez</h3>
      <p>Discutez de vos besoins, de votre niveau et des objectifs à atteindre.</p>
    </div>

    <div
      style={{
        width: "220px",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "10px",
      }}
    >
      <h3>3. Planifiez</h3>
      <p>Choisissez un créneau disponible pour organiser un cours d’essai.</p>
    </div>

    <div
      style={{
        width: "220px",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "10px",
      }}
    >
      <h3>4. Progressez</h3>
      <p>Bénéficiez d’un accompagnement sur mesure avec un professeur qualifié.</p>
    </div>
  </div>
</section>
<section
  style={{
    padding: "60px 20px",
    textAlign: "center",
  }}
>
  <h2 style={{ fontSize: "32px", marginBottom: "15px" }}>
    Professeurs populaires
  </h2>

  <p style={{ fontSize: "18px", marginBottom: "40px", color: "#444" }}>
    Découvrez quelques profils disponibles sur NOVADEMY.
  </p>

  <div
    style={{
      display: "flex",
      justifyContent: "center",
      gap: "25px",
      flexWrap: "wrap",
    }}
  >
    <div
      style={{
        width: "260px",
        padding: "20px",
       border: "1px solid #e5e5e5",
       borderRadius: "12px",
       backgroundColor: "white",
       boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
        textAlign: "left",
      }}
    >
      <h3>Sarah M.</h3>
      <p>Mathématiques • Lycée</p>
      <p>Paris • Visio / Présentiel</p>
      <p>À partir de 22€/h</p>
      <button style={{ padding: "10px 16px", marginTop: "10px" }}>
        Voir le profil
      </button>
    </div>

    <div
      style={{
        width: "260px",
        padding: "20px",
       border: "1px solid #e5e5e5",
       borderRadius: "12px",
       backgroundColor: "white",
       boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
        textAlign: "left",
      }}
    >
      <h3>David K.</h3>
      <p>Anglais • Collège / Lycée</p>
      <p>Lyon • Visio</p>
      <p>À partir de 20€/h</p>
      <button style={{ padding: "10px 16px", marginTop: "10px" }}>
        Voir le profil
      </button>
    </div>

    <div
      style={{
        width: "260px",
        padding: "20px",
        border: "1px solid #e5e5e5",
        borderRadius: "12px",
        backgroundColor: "white",
        boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
        textAlign: "left",
      }}
    >
      <h3>Nadia T.</h3>
      <p>Physique-Chimie • Lycée</p>
      <p>Marseille • Présentiel</p>
      <p>À partir de 24€/h</p>
      <button style={{ padding: "10px 16px", marginTop: "10px" }}>
        Voir le profil
      </button>
    </div>
  </div>
</section>
      </main>
    </div>
  );
}

export default HomeTemp;