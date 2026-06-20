import { useState } from "react";
import { apiFetch } from "../config/api.js";

function PackProposal() {
  const [formData, setFormData] = useState({
    student_id: "",
    formula_type: "suivi_regulier",
    hours_per_week: "",
    total_hours: "",
    duration: "",
    price: "",
    commitment: "",
    note: "",
  });

  const savedUser = localStorage.getItem("user");
  const user = savedUser ? JSON.parse(savedUser) : null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("Vous devez être connecté.");
      return;
    }

    try {
      const response = await apiFetch("/api/packs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          teacher_id: user.id,
          student_id: formData.student_id,
          formula_type: formData.formula_type,
          hours_per_week: formData.hours_per_week,
          total_hours: formData.total_hours,
          duration: formData.duration,
          price: formData.price,
          commitment: formData.commitment,
          note: formData.note,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Erreur lors de la proposition de formule");
        return;
      }

      alert(data.message || "Formule proposée avec succès");
      setFormData({
        student_id: "",
        formula_type: "suivi_regulier",
        hours_per_week: "",
        total_hours: "",
        duration: "",
        price: "",
        commitment: "",
        note: "",
      });
    } catch (error) {
      alert("Erreur de connexion au serveur");
    }
  };

  return (
    <div style={pageStyle}>
      <aside style={sidebarStyle}>
        <div>
          <h2 style={logoStyle}>NOVADEMY</h2>
          <p style={sidebarSubStyle}>Espace professeur</p>
        </div>

        <nav style={sidebarNavStyle}>
          <a href="/teacher/dashboard" style={sidebarLinkStyle}>
            Dashboard
          </a>
          <a href="/teacher/profile" style={sidebarLinkStyle}>
            Profil
          </a>
          <a href="/teacher/announcements" style={sidebarLinkStyle}>
            Annonces
          </a>
          <a href="/teacher/planning" style={sidebarLinkStyle}>
            Planning
          </a>
          <a href="/teacher/requests" style={sidebarLinkStyle}>
            Demandes
          </a>
          <a href="/teacher/pack-proposal" style={activeSidebarLinkStyle}>
            Formule
          </a>
        </nav>
      </aside>

      <main style={contentStyle}>
        <div style={contentWrapperStyle}>
          <section style={heroStyle}>
            <div style={{ flex: 1 }}>
              <p style={eyebrowStyle}>Après le cours d’essai</p>
              <h1 style={heroTitleStyle}>Proposer une formule</h1>
              <p style={heroTextStyle}>
                Orientez l’élève vers une formule standard du site selon ses
                besoins : suivi régulier, pack d’heures ou classe virtuelle.
              </p>
            </div>
          </section>

          <section style={formCardStyle}>
            <h3 style={sectionTitleStyle}>Configuration de la formule</h3>

            <form onSubmit={handleSubmit}>
              <div style={fieldStyle}>
                <label style={labelStyle}>ID de l’élève</label>
                <input
                  name="student_id"
                  value={formData.student_id}
                  onChange={handleChange}
                  placeholder="Ex : 1"
                  style={inputStyle}
                />
              </div>

              <div style={fieldStyle}>
                <label style={labelStyle}>Type de formule</label>
                <select
                  name="formula_type"
                  value={formData.formula_type}
                  onChange={handleChange}
                  style={inputStyle}
                >
                  <option value="suivi_regulier">Suivi régulier</option>
                  <option value="pack_heures">Pack d’heures</option>
                  <option value="classe_virtuelle">Classe virtuelle</option>
                </select>
              </div>

              <div style={gridStyle}>
                <div style={fieldStyle}>
                  <label style={labelStyle}>Heures par semaine</label>
                  <input
                    name="hours_per_week"
                    value={formData.hours_per_week}
                    onChange={handleChange}
                    placeholder="Ex : 2"
                    style={inputStyle}
                  />
                </div>

                <div style={fieldStyle}>
                  <label style={labelStyle}>Total d’heures</label>
                  <input
                    name="total_hours"
                    value={formData.total_hours}
                    onChange={handleChange}
                    placeholder="Ex : 10"
                    style={inputStyle}
                  />
                </div>
              </div>

              <div style={gridStyle}>
                <div style={fieldStyle}>
                  <label style={labelStyle}>Durée</label>
                  <input
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    placeholder="Ex : 3 mois"
                    style={inputStyle}
                  />
                </div>

                <div style={fieldStyle}>
                  <label style={labelStyle}>Prix</label>
                  <input
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="Ex : 120"
                    style={inputStyle}
                  />
                </div>
              </div>

              <div style={fieldStyle}>
                <label style={labelStyle}>Engagement</label>
                <input
                  name="commitment"
                  value={formData.commitment}
                  onChange={handleChange}
                  placeholder="Ex : engagement 3 mois"
                  style={inputStyle}
                />
              </div>

              <div style={fieldStyle}>
                <label style={labelStyle}>Note pour l’élève</label>
                <textarea
                  name="note"
                  value={formData.note}
                  onChange={handleChange}
                  placeholder="Expliquez la formule retenue, le rythme proposé et les objectifs."
                  style={textareaStyle}
                />
              </div>

              <div style={tipsBoxStyle}>
                <h4 style={tipsTitleStyle}>Logique métier</h4>
                <ul style={tipsListStyle}>
                  <li>la formule est proposée après le cours d’essai</li>
                  <li>le suivi régulier peut inclure un engagement</li>
                  <li>la classe virtuelle dépend du nombre minimum d’élèves</li>
                </ul>
              </div>

              <button type="submit" style={buttonStyle}>
                Proposer la formule
              </button>
            </form>
          </section>
        </div>
      </main>
    </div>
  );
}

const pageStyle = {
  display: "flex",
  minHeight: "100vh",
  fontFamily: "Arial, sans-serif",
  background: "#f3f4f6",
};

const sidebarStyle = {
  width: "300px",
  background: "rgb(37,99,235)",
  color: "white",
  padding: "24px 16px",
  boxSizing: "border-box",
};

const logoStyle = {
  margin: 0,
  fontSize: "38px",
  fontWeight: "bold",
};

const sidebarSubStyle = {
  marginTop: "8px",
  color: "rgba(255,255,255,0.85)",
  fontSize: "18px",
};

const sidebarNavStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "12px",
  marginTop: "24px",
};

const sidebarLinkStyle = {
  color: "white",
  textDecoration: "none",
  padding: "16px 18px",
  borderRadius: "10px",
  background: "rgba(255,255,255,0.08)",
  fontWeight: "bold",
  fontSize: "19px",
};

const activeSidebarLinkStyle = {
  ...sidebarLinkStyle,
  background: "white",
  color: "rgb(37,99,235)",
};

const contentStyle = {
  flex: 1,
  padding: "40px 32px",
  boxSizing: "border-box",
};

const contentWrapperStyle = {
  width: "100%",
  maxWidth: "980px",
};

const heroStyle = {
  background: "linear-gradient(135deg, rgb(37,99,235) 0%, rgb(59,130,246) 100%)",
  color: "white",
  borderRadius: "24px",
  padding: "32px",
  display: "flex",
  justifyContent: "space-between",
  gap: "20px",
  flexWrap: "wrap",
  boxShadow: "0 22px 45px rgba(37,99,235,0.22)",
};

const eyebrowStyle = {
  margin: 0,
  fontSize: "14px",
  textTransform: "uppercase",
  letterSpacing: "1px",
  opacity: 0.9,
};

const heroTitleStyle = {
  marginTop: "10px",
  marginBottom: "12px",
  fontSize: "40px",
  lineHeight: "1.2",
};

const heroTextStyle = {
  margin: 0,
  fontSize: "19px",
  lineHeight: "1.7",
  color: "rgba(255,255,255,0.92)",
  maxWidth: "760px",
};

const formCardStyle = {
  marginTop: "24px",
  background: "white",
  borderRadius: "22px",
  border: "1px solid #e5e7eb",
  padding: "26px",
  boxShadow: "0 12px 28px rgba(0,0,0,0.05)",
};

const sectionTitleStyle = {
  marginTop: 0,
  marginBottom: "18px",
  fontSize: "28px",
  color: "#111827",
};

const fieldStyle = {
  marginBottom: "18px",
};

const labelStyle = {
  display: "block",
  marginBottom: "8px",
  fontWeight: "bold",
  fontSize: "17px",
  color: "#111827",
};

const inputStyle = {
  width: "100%",
  padding: "15px 16px",
  fontSize: "17px",
  borderRadius: "12px",
  border: "1px solid #cbd5e1",
  backgroundColor: "#f8fafc",
  boxSizing: "border-box",
  outline: "none",
};

const textareaStyle = {
  width: "100%",
  minHeight: "150px",
  padding: "16px",
  fontSize: "17px",
  borderRadius: "12px",
  border: "1px solid #cbd5e1",
  backgroundColor: "#f8fafc",
  boxSizing: "border-box",
  resize: "vertical",
  outline: "none",
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "16px",
};

const tipsBoxStyle = {
  marginTop: "8px",
  marginBottom: "20px",
  background: "linear-gradient(135deg, #dbeafe 0%, #eff6ff 100%)",
  border: "1px solid #bfdbfe",
  borderRadius: "16px",
  padding: "18px",
};

const tipsTitleStyle = {
  marginTop: 0,
  marginBottom: "10px",
  fontSize: "21px",
  color: "rgb(37,99,235)",
};

const tipsListStyle = {
  margin: 0,
  paddingLeft: "22px",
  color: "#475569",
  fontSize: "17px",
  lineHeight: "1.8",
};

const buttonStyle = {
  marginTop: "8px",
  padding: "16px 24px",
  fontSize: "18px",
  fontWeight: "bold",
  color: "white",
  border: "none",
  borderRadius: "12px",
  cursor: "pointer",
  background: "linear-gradient(135deg, rgb(37,99,235) 0%, rgb(59,130,246) 100%)",
  boxShadow: "0 14px 28px rgba(37,99,235,0.20)",
};

export default PackProposal;