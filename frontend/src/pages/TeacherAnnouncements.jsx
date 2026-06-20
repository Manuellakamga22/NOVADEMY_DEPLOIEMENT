import React, { useMemo, useState } from "react";

import S from "../styles/pages/TeacherAnnouncements.styles.js";
import { apiFetch } from "../config/api.js";
import Sidebar from "../components/layout/Sidebar.jsx";

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

      const response = await apiFetch("/api/announcements", {
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
        `${import.meta.env.VITE_API_URL}/api/announcements/teacher/${user.id}`
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
        {/* ── SIDEBAR ── */}
        <Sidebar role={"professeur"} user={user} active={"/teacher/announcements"} />

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