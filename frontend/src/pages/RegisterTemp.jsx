function RegisterTemp() {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f7f7f7",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px 40px",
          backgroundColor: "white",
          borderBottom: "2px solid #2e8b57",
        }}
      >
        <h2 style={{ margin: 0, color: "#1f2f46" }}>NOVADEMY</h2>
        <p style={{ margin: 0, fontWeight: "bold", color: "#1f2f46" }}>
          Bienvenue
        </p>
      </header>

      <main
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          padding: "60px 20px",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: "42px", marginBottom: "16px", color: "#1f2f46" }}>
          Bienvenue sur NOVADEMY
        </h1>

        <p style={{ fontSize: "18px", color: "#555", marginBottom: "50px" }}>
          Pour créer votre compte, choisissez le profil qui vous correspond.
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "30px",
            flexWrap: "wrap",
          }}
        >
          <a
            href="/register/student"
            style={{
              width: "320px",
              padding: "35px 25px",
              border: "1px solid #ddd",
              borderRadius: "16px",
              backgroundColor: "white",
              textDecoration: "none",
              color: "#1f2f46",
              boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
            }}
          >
            <div style={{ fontSize: "42px", marginBottom: "16px" }}>🎓</div>
            <h3 style={{ marginBottom: "12px" }}>J&apos;ai besoin de cours</h3>
            <p style={{ color: "#666", lineHeight: "1.5" }}>
              Recherchez un professeur adapté à votre niveau, vos objectifs et
              vos disponibilités.
            </p>
          </a>

          <a
            href="/register/teacher"
            style={{
              width: "320px",
              padding: "35px 25px",
              border: "1px solid #ddd",
              borderRadius: "16px",
              backgroundColor: "white",
              textDecoration: "none",
              color: "#1f2f46",
              boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
            }}
          >
            <div style={{ fontSize: "42px", marginBottom: "16px" }}>👩‍🏫</div>
            <h3 style={{ marginBottom: "12px" }}>Je veux devenir professeur</h3>
            <p style={{ color: "#666", lineHeight: "1.5" }}>
              Créez votre profil, renseignez vos matières, vos disponibilités
              et commencez à donner des cours.
            </p>
          </a>
        </div>
      </main>
    </div>
  );
}

export default RegisterTemp;