import React, { useEffect, useState } from "react";

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
    background: "#ECFDF5",
    color: "#059669",
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
    background: "linear-gradient(135deg,#059669,#0891B2)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    fontWeight: 700,
    fontSize: 15,
    flexShrink: 0,
  },
  main: { padding: "36px 36px" },
  pageHead: {
    marginBottom: 32,
    paddingBottom: 24,
    borderBottom: "1px solid #F3F4F6",
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: 800,
    letterSpacing: "-0.01em",
    marginBottom: 8,
  },
  pageSub: {
    fontSize: 16,
    color: "#9CA3AF",
    lineHeight: 1.6,
  },
  grid2: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 18,
    marginBottom: 18,
  },
  card: {
    background: "#fff",
    border: "1px solid #E5E7EB",
    borderRadius: 14,
    padding: "22px 24px",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 700,
    marginBottom: 16,
  },
  cardDesc: {
    fontSize: 15,
    color: "#9CA3AF",
    lineHeight: 1.7,
    marginBottom: 16,
  },
  fieldGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 14,
  },
  field: { marginBottom: 16 },
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
    boxSizing: "border-box",
    background: "#fff",
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
    boxSizing: "border-box",
    resize: "vertical",
    background: "#fff",
  },
  btn: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "inherit",
    fontSize: 14,
    fontWeight: 600,
    padding: "10px 20px",
    borderRadius: 9,
    border: "none",
    cursor: "pointer",
    textDecoration: "none",
  },
  btnPrimary: { background: "#2563EB", color: "#fff" },
  btnFull: {
    width: "100%",
    justifyContent: "center",
    padding: "13px",
    marginTop: 14,
    fontSize: 15,
  },
  noteBox: {
    background: "#EFF6FF",
    border: "1px solid #BFDBFE",
    color: "#1D4ED8",
    borderRadius: 12,
    padding: "14px 16px",
    fontSize: 14,
    lineHeight: 1.6,
    marginBottom: 16,
  },
  photoRow: {
    display: "flex",
    alignItems: "center",
    gap: 20,
    flexWrap: "wrap",
  },
  photoCircle: {
    width: 120,
    height: 120,
    borderRadius: "50%",
    background: "#F3F4F6",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    border: "2px solid #E5E7EB",
    flexShrink: 0,
  },
  photoImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  photoHint: {
    fontSize: 13,
    color: "#9CA3AF",
    marginTop: 8,
    lineHeight: 1.5,
  },
  profileGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 10,
  },
  profileItem: {
    background: "#F9FAFB",
    border: "1px solid #E5E7EB",
    borderRadius: 9,
    padding: 14,
  },
  profileLabel: {
    fontSize: 12,
    color: "#9CA3AF",
    marginBottom: 4,
  },
  profileValue: {
    fontSize: 15,
    fontWeight: 600,
    color: "#111827",
  },
};

const initialForm = {
  subject_needed: "",
  level_needed: "",
  city: "",
  preferred_mode: "",
  difficulties: "",
  objectives: "",
  frequency: "",
  availability_notes: "",
};

function StudentProfile() {
  const savedUser = localStorage.getItem("user");
  const user = savedUser ? JSON.parse(savedUser) : null;

  const [form, setForm] = useState(initialForm);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePhoto = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreview(url);
  };

  const fetchProfile = async () => {
    if (!user || !user.id) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5001/api/student-profile/${user.id}`
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Erreur chargement profil");
        return;
      }

      setForm({
        subject_needed: data.subject_needed || "",
        level_needed: data.level_needed || "",
        city: data.city || "",
        preferred_mode: data.preferred_mode || "",
        difficulties: data.difficulties || "",
        objectives: data.objectives || "",
        frequency: data.frequency || "",
        availability_notes: data.availability_notes || "",
      });
    } catch (error) {
      console.error("Erreur chargement profil élève :", error);
      alert("Erreur de connexion au serveur");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [user?.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user || !user.id) {
      alert("Vous devez être connecté.");
      return;
    }

    try {
      setSaving(true);

      const response = await fetch("http://localhost:5001/api/student-profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: user.id,
          subject_needed: form.subject_needed,
          level_needed: form.level_needed,
          city: form.city,
          preferred_mode: form.preferred_mode,
          difficulties: form.difficulties,
          objectives: form.objectives,
          frequency: form.frequency,
          availability_notes: form.availability_notes,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Erreur enregistrement profil");
        return;
      }

      alert(data.message || "Profil enregistré");

      await fetchProfile();
      window.location.href = "/student/dashboard";
    } catch (error) {
      alert("Erreur de connexion au serveur");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={S.wrap}>
      <div style={S.dash}>
        <aside style={S.sidebar}>
          <div style={S.sbBrand}>
            <div style={{ ...S.logo, fontSize: 20 }}>
              NOVA<span style={S.logoEm}>DEMY</span>
            </div>
            <span style={S.sbRole}>Élève</span>
          </div>

          <nav style={S.sbNav}>
            <span style={S.sbLabel}>Principal</span>
            <a style={S.sbLink} href="/student/dashboard">🏠 Tableau de bord</a>
            <a style={S.sbLinkActive} href="/student/profile">👤 Mon profil</a>
            <a style={S.sbLink} href="/search">🔍 Trouver un prof</a>

            <span style={S.sbLabel}>Mes cours</span>
            <a style={S.sbLink} href="/trial-request">
              📬 Demandes d'essai <span style={S.sbBadge}>0</span>
            </a>
            <a style={S.sbLink} href="/student/courses">📚 Mes cours</a>
            <a style={S.sbLink} href="/student/planning">📅 Mon calendrier</a>
            <a style={S.sbLink} href="/chat">
              💬 Messages <span style={S.sbBadge}>0</span>
            </a>
          </nav>

          <div style={S.sbUser}>
            <div style={S.av}>É</div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 600 }}>
                {user ? `${user.prenom} ${user.nom}` : "Prénom Nom"}
              </div>
              <div style={{ fontSize: 13, color: "#9CA3AF", marginTop: 2 }}>
                Élève
              </div>
            </div>
          </div>
        </aside>

        <main style={S.main}>
          <div style={S.pageHead}>
            <div style={S.pageTitle}>👤 Mon profil élève</div>
            <div style={S.pageSub}>
              Complétez votre fiche de renseignement pour recevoir des cours adaptés à vos besoins.
            </div>
          </div>

          {loading ? (
            <p>Chargement du profil...</p>
          ) : (
            <>
              <div style={S.grid2}>
                <div style={S.card}>
                  <div style={S.cardTitle}>📸 Photo de profil</div>
                  <div style={S.photoRow}>
                    <div style={S.photoCircle}>
                      {preview ? (
                        <img src={preview} alt="photo profil" style={S.photoImg} />
                      ) : (
                        <span style={{ color: "#9CA3AF" }}>Photo</span>
                      )}
                    </div>

                    <div>
                      <input type="file" onChange={handlePhoto} />
                      <p style={S.photoHint}>
                        Ajoutez une photo pour rassurer le professeur.
                      </p>
                    </div>
                  </div>
                </div>

                <div style={S.card}>
                  <div style={S.cardTitle}>📌 Résumé du profil</div>
                  <p style={S.cardDesc}>
                    Vérifiez rapidement les informations principales de votre fiche.
                  </p>

                  <div style={S.profileGrid}>
                    <div style={S.profileItem}>
                      <div style={S.profileLabel}>Matière</div>
                      <div style={S.profileValue}>{form.subject_needed || "—"}</div>
                    </div>
                    <div style={S.profileItem}>
                      <div style={S.profileLabel}>Niveau</div>
                      <div style={S.profileValue}>{form.level_needed || "—"}</div>
                    </div>
                    <div style={S.profileItem}>
                      <div style={S.profileLabel}>Ville</div>
                      <div style={S.profileValue}>{form.city || "—"}</div>
                    </div>
                    <div style={S.profileItem}>
                      <div style={S.profileLabel}>Mode</div>
                      <div style={S.profileValue}>{form.preferred_mode || "—"}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div style={S.card}>
                <div style={S.cardTitle}>📝 Fiche de renseignement</div>
                <p style={S.cardDesc}>
                  Cette fiche aide la plateforme et le professeur à comprendre vos besoins.
                </p>

                <div style={S.noteBox}>
                  Cette fiche est obligatoire avant la recherche et la demande de cours d’essai.
                </div>

                <form onSubmit={handleSubmit}>
                  <div style={S.fieldGrid}>
                    <div style={S.field}>
                      <label style={S.label}>Matière recherchée</label>
                      <select
                        name="subject_needed"
                        value={form.subject_needed}
                        onChange={handleChange}
                        style={S.input}
                      >
                        <option value="">Choisir une matière</option>
                        <option value="informatique">Informatique</option>
                        <option value="mathematiques">Mathématiques</option>
                        <option value="francais">Français</option>
                        <option value="anglais">Anglais</option>
                        <option value="anglais">Physique</option>
                        <option value="anglais">Chimie</option>
                        <option value="anglais">Science de la vie et de la terre</option>
                        <option value="anglais">Histoire</option>
                        <option value="anglais">Géographie</option>
                        <option value="anglais">Aide aux devoirs</option>
                      </select>
                    </div>

                    <div style={S.field}>
                      <label style={S.label}>Niveau</label>
                      <select
                        name="level_needed"
                        value={form.level_needed}
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

                  <div style={S.fieldGrid}>
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
                      <label style={S.label}>Mode souhaité</label>
                      <select
                        name="preferred_mode"
                        value={form.preferred_mode}
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
                    <label style={S.label}>Difficultés rencontrées</label>
                    <textarea
                      name="difficulties"
                      value={form.difficulties}
                      onChange={handleChange}
                      placeholder="Décrivez vos difficultés actuelles."
                      style={S.textarea}
                    />
                  </div>

                  <div style={S.field}>
                    <label style={S.label}>Objectifs</label>
                    <textarea
                      name="objectives"
                      value={form.objectives}
                      onChange={handleChange}
                      placeholder="Décrivez vos objectifs."
                      style={S.textarea}
                    />
                  </div>

                  <div style={S.fieldGrid}>
                    <div style={S.field}>
                      <label style={S.label}>Fréquence souhaitée</label>
                      <input
                        name="frequency"
                        value={form.frequency}
                        onChange={handleChange}
                        placeholder="Ex : 2 fois par semaine"
                        style={S.input}
                      />
                    </div>

                    <div style={S.field}>
                      <label style={S.label}>Disponibilités générales</label>
                      <input
                        name="availability_notes"
                        value={form.availability_notes}
                        onChange={handleChange}
                        placeholder="Ex : mercredi après-midi, samedi matin"
                        style={S.input}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={saving}
                    style={{ ...S.btn, ...S.btnPrimary, ...S.btnFull }}
                  >
                    {saving ? "Enregistrement..." : "Enregistrer mon profil"}
                  </button>
                </form>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}

export default StudentProfile;