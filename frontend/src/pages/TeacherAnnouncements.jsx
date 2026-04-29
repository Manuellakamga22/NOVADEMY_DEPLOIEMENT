import React, { useMemo, useState } from "react";

const S = {
  wrap: {
    fontFamily: "'Segoe UI', sans-serif",
    minHeight: "100vh",
    background: "#F9FAFB",
  },

  logo: { fontSize: 24, fontWeight: 800, letterSpacing: "-0.02em" },
  logoEm: { color: "#2563EB" },

  dash: {
    display: "grid",
    gridTemplateColumns: "260px 1fr",
    minHeight: "100vh",
  },

  sidebar: {
    background: "#fff",
    borderRight: "1px solid #E5E7EB",
    display: "flex",
    flexDirection: "column",
    position: "sticky",
    top: 0,
    height: "100vh",
    overflowY: "auto",
  },

  sbBrand: {
    padding: "24px 22px",
    borderBottom: "1px solid #E5E7EB",
  },

  sbRole: {
    display: "inline-block",
    marginTop: 8,
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: ".08em",
    textTransform: "uppercase",
    padding: "4px 12px",
    borderRadius: 20,
    background: "#EFF6FF",
    color: "#2563EB",
  },

  sbNav: { padding: 14, flex: 1 },

  sbLabel: {
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: ".12em",
    textTransform: "uppercase",
    color: "#9CA3AF",
    padding: "0 10px",
    margin: "18px 0 6px",
    display: "block",
  },

  sbLink: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "12px 14px",
    borderRadius: 9,
    fontSize: 15,
    fontWeight: 500,
    color: "#4B5563",
    textDecoration: "none",
    marginBottom: 2,
  },

  sbLinkActive: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "12px 14px",
    borderRadius: 9,
    fontSize: 15,
    fontWeight: 600,
    color: "#2563EB",
    background: "#EFF6FF",
    textDecoration: "none",
    marginBottom: 2,
  },

  sbBadge: {
    marginLeft: "auto",
    background: "#2563EB",
    color: "#fff",
    fontSize: 11,
    fontWeight: 700,
    padding: "2px 8px",
    borderRadius: 10,
  },

  sbUser: {
    padding: "18px 22px",
    borderTop: "1px solid #E5E7EB",
    display: "flex",
    alignItems: "center",
    gap: 12,
  },

  av: {
    width: 38,
    height: 38,
    borderRadius: "50%",
    background: "linear-gradient(135deg,#2563EB,#1D4ED8)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    fontWeight: 700,
    fontSize: 15,
    flexShrink: 0,
  },

  main: { padding: "28px 28px" },

  topBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 16,
    marginBottom: 20,
    flexWrap: "wrap",
  },

  smallTitle: {
    fontSize: 20,
    fontWeight: 800,
    color: "#111827",
    margin: 0,
  },

  smallSub: {
    fontSize: 14,
    color: "#9CA3AF",
    marginTop: 6,
    lineHeight: 1.6,
  },

  card: {
    background: "#fff",
    border: "1px solid #E5E7EB",
    borderRadius: 14,
    padding: "20px 22px",
    marginBottom: 18,
  },

  cardTitle: {
    fontSize: 15,
    fontWeight: 700,
    marginBottom: 14,
    color: "#111827",
  },

  cardDesc: {
    fontSize: 14,
    color: "#6B7280",
    lineHeight: 1.7,
    marginBottom: 14,
  },

  fieldGrid2: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 12,
  },

  field: {
    marginBottom: 14,
  },

  label: {
    display: "block",
    fontSize: 14,
    fontWeight: 700,
    color: "#374151",
    marginBottom: 8,
  },

  input: {
    width: "100%",
    padding: "12px 14px",
    borderRadius: 9,
    border: "1.5px solid #E5E7EB",
    fontFamily: "inherit",
    fontSize: 15,
    outline: "none",
    background: "#fff",
    boxSizing: "border-box",
  },

  textarea: {
    width: "100%",
    minHeight: 110,
    padding: "12px 14px",
    borderRadius: 9,
    border: "1.5px solid #E5E7EB",
    fontFamily: "inherit",
    fontSize: 15,
    outline: "none",
    background: "#fff",
    boxSizing: "border-box",
    resize: "vertical",
  },

  noteBox: {
    background: "#EFF6FF",
    border: "1px solid #BFDBFE",
    color: "#1D4ED8",
    borderRadius: 12,
    padding: "14px 16px",
    fontSize: 14,
    lineHeight: 1.6,
    marginBottom: 14,
  },

  rateBox: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 12,
  },

  infoMini: {
    background: "#F9FAFB",
    border: "1px solid #E5E7EB",
    borderRadius: 10,
    padding: 14,
  },

  infoLabel: {
    fontSize: 12,
    color: "#9CA3AF",
    marginBottom: 6,
  },

  infoValue: {
    fontSize: 16,
    fontWeight: 700,
    color: "#111827",
  },

  btnRow: {
    display: "flex",
    gap: 10,
    flexWrap: "wrap",
    marginTop: 10,
  },

  btn: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "inherit",
    fontSize: 14,
    fontWeight: 600,
    padding: "10px 18px",
    borderRadius: 9,
    border: "none",
    cursor: "pointer",
    textDecoration: "none",
  },

  btnPrimary: {
    background: "#2563EB",
    color: "#fff",
  },

  btnGhost: {
    background: "#F3F4F6",
    color: "#4B5563",
  },

  list: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },

  announcementItem: {
    background: "#F9FAFB",
    border: "1px solid #E5E7EB",
    borderRadius: 12,
    padding: 16,
  },

  itemTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 12,
    flexWrap: "wrap",
    marginBottom: 10,
  },

  itemTitle: {
    margin: 0,
    fontSize: 16,
    fontWeight: 700,
    color: "#111827",
  },

  itemSub: {
    margin: "6px 0 0 0",
    fontSize: 13,
    color: "#6B7280",
  },

  pillRow: {
    display: "flex",
    gap: 6,
    flexWrap: "wrap",
    marginBottom: 10,
  },

  pill: {
    fontSize: 12,
    fontWeight: 600,
    padding: "4px 12px",
    borderRadius: 20,
    display: "inline-block",
  },

  empty: {
    textAlign: "center",
    padding: "28px 20px",
    color: "#9CA3AF",
  },
};

function TeacherAnnouncements() {
  const savedUser = localStorage.getItem("user");
  const user = savedUser ? JSON.parse(savedUser) : null;

  const [form, setForm] = useState({
    subject: "",
    level: "",
    city: "",
    mode: "",
    title: "",
    description: "",
    methodology: "",
    teacher_rate: "",
  });

  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(false);

  const commissionRate = useMemo(() => 0.15, []);
  const studentRate = useMemo(() => {
    const teacherRate = Number(form.teacher_rate || 0);
    if (!teacherRate) return "";
    return (teacherRate / (1 - commissionRate)).toFixed(2);
  }, [form.teacher_rate, commissionRate]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const resetForm = () => {
    setForm({
      subject: "",
      level: "",
      city: "",
      mode: "",
      title: "",
      description: "",
      methodology: "",
      teacher_rate: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user || !user.id) {
      alert("Vous devez être connecté.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("http://localhost:5000/api/announcements", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          teacher_id: user.id,
          subject: form.subject,
          level: form.level,
          city: form.city,
          mode: form.mode,
          title: form.title,
          description: form.description,
          methodology: form.methodology,
          student_rate: studentRate,
          teacher_rate: form.teacher_rate,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Erreur création annonce");
        return;
      }

      alert(data.message || "Annonce créée avec succès");
      resetForm();
      loadTeacherAnnouncements();
    } catch (error) {
      alert("Erreur de connexion au serveur");
    } finally {
      setLoading(false);
    }
  };

  const loadTeacherAnnouncements = async () => {
    if (!user || !user.id) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/announcements/teacher/${user.id}`
      );
      const data = await response.json();

      if (!response.ok) {
        return;
      }

      setAnnouncements(data);
    } catch (error) {}
  };

  React.useEffect(() => {
    loadTeacherAnnouncements();
  }, []);

  return (
    <div style={S.wrap}>
      <div style={S.dash}>
        <aside style={S.sidebar}>
          <div style={S.sbBrand}>
            <div style={{ ...S.logo, fontSize: 20 }}>
              NOVA<span style={S.logoEm}>DEMY</span>
            </div>
            <span style={S.sbRole}>Professeur</span>
          </div>

          <nav style={S.sbNav}>
            <span style={S.sbLabel}>Principal</span>
            <a style={S.sbLink} href="/teacher/dashboard">
              🏠 Tableau de bord
            </a>
            <a style={S.sbLink} href="/teacher/profile">
              👤 Mon profil
            </a>
            <a style={S.sbLinkActive} href="/teacher/announcements">
              📢 Annonces
            </a>

            <span style={S.sbLabel}>Organisation</span>
            <a style={S.sbLink} href="/teacher/planning">
              📅 Planning
            </a>
            <a style={S.sbLink} href="/teacher/requests">
              📬 Demandes <span style={S.sbBadge}>0</span>
            </a>
            <a style={S.sbLink} href="student/chat">
              💬 Messages <span style={S.sbBadge}>0</span>
            </a>

            <span style={S.sbLabel}>Compte</span>
            <a style={S.sbLink} href="/teacher/revenue">
              💳 Revenus
            </a>
          </nav>

          <div style={S.sbUser}>
            <div style={S.av}>P</div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 600 }}>
                {user ? `${user.prenom} ${user.nom}` : "Prénom Nom"}
              </div>
              <div style={{ fontSize: 13, color: "#9CA3AF", marginTop: 2 }}>
                Professeur
              </div>
            </div>
          </div>
        </aside>

        <main style={S.main}>
          <div style={S.topBar}>
            <div>
              <p style={S.smallTitle}>Créer et Gérer mes annonces</p>
              
            </div>
          </div>

          <div style={S.card}>
            <div style={S.cardTitle}>Nouvelle annonce</div>
            <div style={S.noteBox}>
              Ordre demandé : matière, niveau, ville, mode, intitulé, description, méthodologie, tarif.
            </div>

            <form onSubmit={handleSubmit}>
              <div style={S.fieldGrid2}>
                <div style={S.field}>
                  <label style={S.label}>Matière</label>
                  <select
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    style={S.input}
                  >
                    <option value="">Choisir une matière</option>
                    <option value="informatique">Informatique</option>
                    <option value="mathematiques">Mathématiques</option>
                    <option value="francais">Français</option>
                    <option value="anglais">Anglais</option>
                    <option value="physique">Physique</option>
                    <option value="geographie">Geographie</option>
                    <option value="Histoire">Histoire</option>
                    <option value="Chimie">Chimie</option>
                    <option value="science de la vie et de la terre">Sciences de la vie et de la terre</option>
                  </select>
                </div>

                <div style={S.field}>
                  <label style={S.label}>Niveau</label>
                  <select
                    name="level"
                    value={form.level}
                    onChange={handleChange}
                    style={S.input}
                  >
                    <option value="">Choisir un niveau</option>
                    <option value="college">Collège</option>
                    <option value="lycee">Lycée</option>
                    <option value="superieur">Supérieur</option>
                    <option value="prepa">Prépa</option>
                  </select>
                </div>
              </div>

              <div style={S.fieldGrid2}>
                <div style={S.field}>
                  <label style={S.label}>Ville</label>
                  <input
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    placeholder="Ex : Paris"
                    style={S.input}
                  />
                </div>

                <div style={S.field}>
                  <label style={S.label}>Mode</label>
                  <select
                    name="mode"
                    value={form.mode}
                    onChange={handleChange}
                    style={S.input}
                  >
                    <option value="">Choisir un mode</option>
                    <option value="presentiel">Présentiel</option>
                    <option value="visio">Visio</option>
                    <option value="hybride">Hybride</option>
                  </select>
                </div>
              </div>

              <div style={S.field}>
                <label style={S.label}>Intitulé</label>
                <input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="Ex : Cours d’informatique pour lycée"
                  style={S.input}
                />
              </div>

              <div style={S.field}>
                <label style={S.label}>Description</label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Décrivez votre annonce."
                  style={S.textarea}
                />
              </div>

              <div style={S.field}>
                <label style={S.label}>Méthodologie</label>
                <textarea
                  name="methodology"
                  value={form.methodology}
                  onChange={handleChange}
                  placeholder="Expliquez votre méthode de travail."
                  style={S.textarea}
                />
              </div>

              <div style={S.field}>
                <label style={S.label}>Tarif professeur (€ / h)</label>
                <input
                  name="teacher_rate"
                  value={form.teacher_rate}
                  onChange={handleChange}
                  placeholder="Ex : 20"
                  style={S.input}
                />
              </div>

              <div style={S.rateBox}>
                <div style={S.infoMini}>
                  <div style={S.infoLabel}>Commission plateforme</div>
                  <div style={S.infoValue}>15 %</div>
                </div>

                <div style={S.infoMini}>
                  <div style={S.infoLabel}>Tarif affiché à l’élève</div>
                  <div style={S.infoValue}>
                    {studentRate ? `${studentRate} € / h` : "—"}
                  </div>
                </div>
              </div>

              <div style={S.btnRow}>
                <button
                  type="submit"
                  disabled={loading}
                  style={{ ...S.btn, ...S.btnPrimary }}
                >
                  {loading ? "Publication..." : "Publier l’annonce"}
                </button>

                <button
                  type="button"
                  onClick={resetForm}
                  style={{ ...S.btn, ...S.btnGhost }}
                >
                  Réinitialiser
                </button>
              </div>
            </form>
          </div>

          <div style={S.card}>
            <div style={S.cardTitle}>Mes annonces</div>

            {announcements.length === 0 ? (
              <div style={S.empty}>Aucune annonce créée pour le moment.</div>
            ) : (
              <div style={S.list}>
                {announcements.map((item) => (
                  <div key={item.id} style={S.announcementItem}>
                    <div style={S.itemTop}>
                      <div>
                        <h4 style={S.itemTitle}>{item.title}</h4>
                        <p style={S.itemSub}>
                          {item.subject} • {item.level} • {item.city} • {item.mode}
                        </p>
                      </div>

                      <span
                        style={{
                          ...S.pill,
                          background: item.status === "active" ? "#ECFDF5" : "#F3F4F6",
                          color: item.status === "active" ? "#059669" : "#6B7280",
                        }}
                      >
                        {item.status}
                      </span>
                    </div>

                    <div style={S.pillRow}>
                      <span style={{ ...S.pill, background: "#EFF6FF", color: "#2563EB" }}>
                        Élève : {item.student_rate} € / h
                      </span>
                      <span style={{ ...S.pill, background: "#F3F4F6", color: "#4B5563" }}>
                        Prof : {item.teacher_rate} € / h
                      </span>
                    </div>

                    <div style={{ fontSize: 14, color: "#4B5563", lineHeight: 1.7 }}>
                      {item.description || "Aucune description renseignée."}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default TeacherAnnouncements;