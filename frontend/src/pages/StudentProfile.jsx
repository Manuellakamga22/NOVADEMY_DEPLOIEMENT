import React, { useEffect, useState } from "react";

import S from "../styles/pages/StudentProfile.styles.js";
import { apiFetch } from "../config/api.js";
import Sidebar from "../components/layout/Sidebar.jsx";

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

  const handlePhoto = async (e) => {
    const file = e.target.files?.[0];
    if (!file || !user?.id) return;

    setPreview(URL.createObjectURL(file));

    try {
      const formData = new FormData();
      formData.append("photo", file);

      const res = await apiFetch(`/api/student-profile/photo/${user.id}`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Erreur lors de l'upload");
        return;
      }

      if (data.photo_url) {
        setPreview(`${import.meta.env.VITE_API_URL}${data.photo_url}`);
      }

      alert("Photo enregistrée !");
    } catch {
      alert("Erreur de connexion au serveur");
    }
  };

  const fetchProfile = async () => {
    if (!user || !user.id) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/student-profile/${user.id}`
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

      if (data.photo_url) {
        setPreview(`${import.meta.env.VITE_API_URL}${data.photo_url}`);
      }
    } catch {
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

      const response = await apiFetch("/api/student-profile", {
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
        {/* ── SIDEBAR ── */}
        <Sidebar role={"eleve"} user={user} active={"/student/profile"} />

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