function RegisterTemp() {
  return (
    <div style={{ minHeight: "100vh", background: "#F9FAFB", fontFamily: "'Segoe UI', sans-serif" }}>
      <header style={{ background: "#fff", borderBottom: "1px solid #E5E7EB", padding: "0 48px", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontSize: 20, fontWeight: 800 }}>NOVA<span style={{ color: "#2563EB" }}>DEMY</span></span>
        <span style={{ fontSize: 14, fontWeight: 600, color: "#9CA3AF" }}>Bienvenue</span>
      </header>

      <div style={{ minHeight: "calc(100vh - 60px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "60px 24px" }}>
        <div style={{ maxWidth: 780, width: "100%", textAlign: "center" }}>
          <h1 style={{ fontSize: 38, fontWeight: 800, marginBottom: 12 }}>Bienvenue sur NOVADEMY</h1>
          <p style={{ fontSize: 16, color: "#9CA3AF" }}>Pour créer votre compte, choisissez le profil qui vous correspond.</p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 22, marginTop: 32 }}>
            {[{href:"/register/student",icon:"🎓",title:"J'ai besoin de cours",desc:"Recherchez un professeur adapté à votre niveau, vos objectifs et vos disponibilités.",btnTxt:"Créer un compte élève",btnCol:"#059669"},
              {href:"/register/teacher",icon:"👩‍🏫",title:"Je veux devenir professeur",desc:"Créez votre profil, renseignez vos matières, vos disponibilités et commencez à donner des cours.",btnTxt:"Créer un compte professeur",btnCol:"#2563EB"}].map(c => (
              <a key={c.href} href={c.href} style={{ background: "#fff", border: "2px solid #E5E7EB", borderRadius: 16, padding: "32px 24px", textAlign: "center", cursor: "pointer", textDecoration: "none", color: "inherit", display: "block" }}>
                <div style={{ fontSize: 42, marginBottom: 14 }}>{c.icon}</div>
                <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>{c.title}</div>
                <div style={{ fontSize: 13, color: "#9CA3AF", lineHeight: 1.6, marginBottom: 18 }}>{c.desc}</div>
                <div style={{ background: c.btnCol, color: "#fff", padding: "11px", borderRadius: 8, fontWeight: 600, fontSize: 13 }}>{c.btnTxt}</div>
              </a>
            ))}
          </div>
          <p style={{ marginTop: 28, fontSize: 13, color: "#9CA3AF" }}>Déjà un compte ? <a href="/login" style={{ color: "#2563EB", fontWeight: 600, textDecoration: "none" }}>Se connecter</a></p>
        </div>
      </div>
    </div>
  );
}
export default RegisterTemp;