function HomeTemp() {
  return (
    <div style={{ fontFamily: "'Segoe UI', sans-serif", backgroundColor: "#F5F7FF", minHeight: "100vh", color: "#111827" }}>

      {/* TOPBAR */}
      <header style={{ background: "#fff", borderBottom: "1px solid #E5E7EB", padding: "0 48px", height: 68, display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 100, boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
        <span style={{ fontSize: 24, fontWeight: 800, letterSpacing: "-0.02em" }}>NOVA<span style={{ color: "#2563EB" }}>DEMY</span></span>
        <nav style={{ display: "flex", alignItems: "center", gap: 24 }}>
          {[["Nos formules", "/nos-formules"], ["Aide", "/aide"]].map(([l, h]) => (
            <a key={l} href={h} style={{ fontSize: 20, fontWeight: 500, color: "#4B5563", textDecoration: "none" }}>{l}</a>
          ))}
          <a href="/login" style={{ fontSize: 20, fontWeight: 500, color: "#4B5563", textDecoration: "none" }}>Connexion</a>
          <a href="/register" style={{ fontSize: 20, fontWeight: 600, background: "#2563EB", color: "#fff", padding: "11px 20px", borderRadius: 8, textDecoration: "none" }}>Inscription</a>
        </nav>
      </header>

      {/* HERO */}
      <div style={{ background: "linear-gradient(135deg, #EFF6FF 0%, #F5F7FF 60%)", padding: "80px 64px", borderBottom: "1px solid #E5E7EB" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#EFF6FF", border: "1px solid #BFDBFE", color: "#2563EB", fontSize: 24, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", padding: "6px 16px", borderRadius: 30, marginBottom: 22 }}>
              🎓 Plateforme de cours particuliers
            </div>
            <h1 style={{ fontSize: 56, fontWeight: 800, lineHeight: 1.1, marginBottom: 18, color: "#111827" }}>
              Avec <span style={{ color: "#2563EB" }}>NOVADEMY</span>,<br />trouvez le professeur<br />qui vous correspond
            </h1>
            <p style={{ fontSize: 20, color: "#6B7280", lineHeight: 1.7, marginBottom: 32, maxWidth: 520 }}>
              Un accompagnement sur mesure pour progresser efficacement avec des professeurs qualifiés.
            </p>
            <div style={{ display: "flex", gap: 12 }}>
              <a href="/register" style={{ fontSize: 17, fontWeight: 600, background: "#2563EB", color: "#fff", padding: "15px 30px", borderRadius: 8, textDecoration: "none" }}>Trouver un professeur</a>
              <a href="/register/teacher" style={{ fontSize: 17, fontWeight: 600, background: "#F3F4F6", color: "#374151", padding: "15px 30px", borderRadius: 8, textDecoration: "none" }}>Donner des cours →</a>
            </div>
          </div>

          {/* Carte recherche */}
          <div style={{ background: "#fff", borderRadius: 16, padding: 30, boxShadow: "0 4px 24px rgba(0,0,0,0.08)", border: "1px solid #E5E7EB" }}>
            <div style={{ fontSize: 19, fontWeight: 700, marginBottom: 20 }}>Rechercher un professeur</div>
            {[["Matière","Ex : Mathématiques","text"],["Ville","Ex : Paris","text"]].map(([label, ph, type]) => (
              <div key={label} style={{ marginBottom: 16 }}>
                <label style={{ display: "block", fontSize: 13, fontWeight: 700, letterSpacing: ".06em", textTransform: "uppercase", color: "#6B7280", marginBottom: 6 }}>{label}</label>
                <input type={type} placeholder={ph} style={{ width: "100%", padding: "13px 14px", borderRadius: 8, border: "1.5px solid #E5E7EB", fontFamily: "inherit", fontSize: 16, outline: "none", boxSizing: "border-box" }} />
              </div>
            ))}
            <div style={{ marginBottom: 18 }}>
              <label style={{ display: "block", fontSize: 13, fontWeight: 700, letterSpacing: ".06em", textTransform: "uppercase", color: "#6B7280", marginBottom: 6 }}>Mode de formation</label>
              <select style={{ width: "100%", padding: "13px 14px", borderRadius: 8, border: "1.5px solid #E5E7EB", fontFamily: "inherit", fontSize: 16, outline: "none" }}>
                <option>Choisir un format</option><option>Présentiel</option><option>Visio</option>
              </select>
            </div>
            <a href="/login" style={{ display: "block", textAlign: "center", background: "#2563EB", color: "#fff", padding: 15, borderRadius: 8, fontWeight: 600, fontSize: 17, textDecoration: "none" }}>Rechercher</a>
          </div>
        </div>
      </div>

      {/* COMMENT ÇA MARCHE */}
      <div style={{ background: "#fff", padding: "64px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 44 }}>
            <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", color: "#2563EB", marginBottom: 10 }}>Comment ça marche</div>
            <h2 style={{ fontSize: 40, fontWeight: 800 }}>Pourquoi nous choisir ?</h2>
            <p style={{ fontSize: 18, color: "#9CA3AF", marginTop: 8 }}>Une mise en relation simple entre élèves et professeurs.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }}>
            {[["1","Recherchez","Trouvez un professeur selon la matière, la ville et le format du cours."],
              ["2","Échangez","Discutez de vos besoins, de votre niveau et des objectifs à atteindre."],
              ["3","Planifiez","Choisissez un créneau disponible pour organiser un cours d'essai gratuit."],
              ["4","Progressez","Bénéficiez d'un accompagnement sur mesure avec un professeur qualifié."]].map(([n,title,desc]) => (
              <div key={n} style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 12, padding: 24 }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: "#EFF6FF", color: "#2563EB", fontWeight: 800, fontSize: 17, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>{n}</div>
                <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>{title}</h3>
                <p style={{ fontSize: 15, color: "#9CA3AF", lineHeight: 1.7 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* PROFESSEURS */}
      <div style={{ padding: "64px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h2 style={{ fontSize: 34, fontWeight: 800, marginBottom: 8 }}>Professeurs populaires</h2>
          <p style={{ color: "#9CA3AF", fontSize: 18, marginBottom: 28 }}>Découvrez quelques profils disponibles sur NOVADEMY.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
            {[{col:"#2563EB"},{col:"#059669"},{col:"#EA580C"}].map((p,i) => (
              <div key={i} style={{ background: "#fff", border: "1.5px solid #E5E7EB", borderRadius: 12, overflow: "hidden" }}>
                <div style={{ padding: 18 }}>
                  <div style={{ display: "flex", gap: 12, marginBottom: 10 }}>
                    <div style={{ width: 48, height: 48, borderRadius: "50%", background: p.col, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 17, flexShrink: 0 }}>P</div>
                    <div>
                      <div style={{ fontSize: 17, fontWeight: 700 }}>Professeur</div>
                      <div style={{ fontSize: 14, color: "#9CA3AF", marginTop: 2 }}>Matière · Niveau</div>
                      <div style={{ fontSize: 14, color: "#F59E0B", marginTop: 4 }}>★★★★★</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 5, marginBottom: 12 }}>
                    <span style={{ fontSize: 13, fontWeight: 600, padding: "4px 10px", borderRadius: 20, background: "#F3F4F6", color: "#6B7280" }}>Ville</span>
                    <span style={{ fontSize: 13, fontWeight: 600, padding: "4px 10px", borderRadius: 20, background: "#F3F4F6", color: "#6B7280" }}>Format</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 12, borderTop: "1px solid #F3F4F6" }}>
                    <div>
                      <div style={{ fontSize: 22, fontWeight: 800 }}>— €<span style={{ fontSize: 13, fontWeight: 400, color: "#9CA3AF" }}>/h</span></div>
                      <div style={{ fontSize: 13, color: "#059669", fontWeight: 600, marginTop: 2 }}>🎁 1er cours gratuit</div>
                    </div>
                    <a href="/teacher/profile" style={{ fontSize: 14, fontWeight: 600, color: "#2563EB", border: "1.5px solid #2563EB", padding: "8px 15px", borderRadius: 8, textDecoration: "none" }}>Voir le profil</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* COMMISSIONS */}
      <div style={{ background: "#fff", padding: "64px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h2 style={{ fontSize: 34, fontWeight: 800, marginBottom: 8 }}>Commissions progressives</h2>
          <p style={{ color: "#9CA3AF", fontSize: 18, marginBottom: 28 }}>Plus vous enseignez, moins vous payez de commission.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14 }}>
            {[{icon:"🌱",level:"Débutant",hours:"0 – 20 h",rate:"15",cls:"#F9FAFB",border:"#E5E7EB",rateCol:"#6B7280"},
              {icon:"📘",level:"Intermédiaire",hours:"20 – 100 h",rate:"12",cls:"#EFF6FF",border:"#BFDBFE",rateCol:"#2563EB"},
              {icon:"🏆",level:"Avancé",hours:"100 – 300 h",rate:"7",cls:"#ECFDF5",border:"#A7F3D0",rateCol:"#059669"},
              {icon:"⭐",level:"Expert",hours:"300+ h",rate:"3",cls:"#FFF7ED",border:"#FED7AA",rateCol:"#EA580C"}].map(t => (
              <div key={t.level} style={{ background: t.cls, border: `1.5px solid ${t.border}`, borderRadius: 12, padding: 22, textAlign: "center" }}>
                <div style={{ fontSize: 30, marginBottom: 8 }}>{t.icon}</div>
                <div style={{ fontSize: 15, fontWeight: 700 }}>{t.level}</div>
                <div style={{ fontSize: 13, color: "#9CA3AF", marginBottom: 12 }}>{t.hours}</div>
                <div style={{ fontSize: 44, fontWeight: 800, color: t.rateCol, lineHeight: 1 }}>{t.rate}<span style={{ fontSize: 22 }}>%</span></div>
                <div style={{ fontSize: 13, color: "#9CA3AF", marginTop: 4 }}>commission</div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
export default HomeTemp;