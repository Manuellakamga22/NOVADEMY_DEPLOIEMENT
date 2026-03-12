function HomeTemp() {
  return (
    <div style={{ fontFamily: "Arial, sans-serif" }}>
      
      {/* HEADER */}
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px 40px",
          borderBottom: "1px solid #eee",
        }}
      >
        <h2>NOVADEMY</h2>

        <nav
          style={{
            display: "flex",
            gap: "25px",
            alignItems: "center",
          }}
        >
          <a href="#">Nos formules</a>
          <a href="#">Demander un devis</a>
          <a href="#">Donner des cours</a>
          <a href="#">Aide</a>
          <a href="/login">Connexion</a>
          <a href="/register">Inscription</a>
        </nav>
      </header>

      {/* HERO */}
      <main
        style={{
          textAlign: "center",
          padding: "80px 20px",
        }}
      >
        <h1 style={{ fontSize: "42px", marginBottom: "20px" }}>
          Avec NOVADEMY, trouvez le professeur qui vous correspond
        </h1>

        <p style={{ fontSize: "18px", marginBottom: "30px" }}>
          Un accompagnement sur mesure pour progresser efficacement avec des professeurs qualifiés.
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
      </main>

    </div>
  );
}

export default HomeTemp;