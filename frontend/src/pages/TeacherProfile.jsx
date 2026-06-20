import React, { useEffect, useMemo, useState } from "react";

import S from "../styles/pages/TeacherProfile.styles.js";
import { apiFetch } from "../config/api.js";
import Sidebar from "../components/layout/Sidebar.jsx";

const LEVEL_OPTIONS = [
  "Primaire",
  "Collège",
  "Lycée",
  "Supérieur",
  "Adultes",
];

const initialForm = {
  city: "",
  preferred_mode: "",
  teaching_levels: [],
  headline: "",
  presentation: "",
  diplomas: "",
  experience: "",
  methodology: "",
};

function TeacherProfile() {
  const savedUser = localStorage.getItem("user");
  const user = savedUser ? JSON.parse(savedUser) : null;

  const [form, setForm] = useState(initialForm);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLevelChange = (level) => {
    setForm((prev) => {
      const exists = prev.teaching_levels.includes(level);

      return {
        ...prev,
        teaching_levels: exists
          ? prev.teaching_levels.filter((item) => item !== level)
          : [...prev.teaching_levels, level],
      };
    });
  };

  const handlePhoto = async (e) => {
    const file = e.target.files?.[0];
    if (!file || !user?.id) return;

    const localPreview = URL.createObjectURL(file);
    setPreview(localPreview);

    try {
      const formData = new FormData();
      formData.append("photo", file);

      const response = await apiFetch(`/api/teacher-profile/photo/${user.id}`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Erreur upload photo");
        return;
      }

      if (data.photo_url) {
        setPreview(`${import.meta.env.VITE_API_URL}${data.photo_url}`);
      }

      alert("Photo enregistrée avec succès");
    } catch {
      alert("Erreur de connexion au serveur");
    }
  };

  const fetchProfile = async () => {
    if (!user?.id) {
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/teacher-profile/${user.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Erreur chargement profil professeur");
        return;
      }

      setForm({
        city: data.city || "",
        preferred_mode: data.preferred_mode || "",
        teaching_levels: Array.isArray(data.teaching_levels)
          ? data.teaching_levels
          : [],
        headline: data.headline || "",
        presentation: data.presentation || "",
        diplomas: data.diplomas || "",
        experience: data.experience || "",
        methodology: data.methodology || "",
      });

      if (data.photo_url) {
        setPreview(`${import.meta.env.VITE_API_URL}${data.photo_url}`);
      }
    } catch (error) {
      alert("Erreur de connexion au serveur");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [user?.id]);

  const completionCount = [
    form.city,
    form.preferred_mode,
    form.teaching_levels.length > 0 ? "ok" : "",
    form.headline,
    form.presentation,
    form.diplomas,
    form.experience,
    form.methodology,
    preview,
  ].filter(Boolean).length;

  const completionPercent = Math.round((completionCount / 9) * 100);

  const profileLevel = useMemo(() => {
    if (completionPercent >= 90) {
      return {
        label: "Expert",
        commission: "3 %",
        colorBg: "#FFF7ED",
        colorText: "#EA580C",
      };
    }
    if (completionPercent >= 70) {
      return {
        label: "Avancé",
        commission: "7 %",
        colorBg: "#ECFDF5",
        colorText: "#059669",
      };
    }
    if (completionPercent >= 40) {
      return {
        label: "Intermédiaire",
        commission: "12 %",
        colorBg: "#EFF6FF",
        colorText: "#2563EB",
      };
    }
    return {
      label: "Débutant",
      commission: "15 %",
      colorBg: "#F3F4F6",
      colorText: "#6B7280",
    };
  }, [completionPercent]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user?.id) {
      alert("Vous devez être connecté.");
      return;
    }

    if (
      !form.city ||
      !form.preferred_mode ||
      form.teaching_levels.length === 0 ||
      !form.headline ||
      !form.presentation ||
      !form.diplomas ||
      !form.experience ||
      !form.methodology
    ) {
      alert("Veuillez compléter tous les champs du profil professeur.");
      return;
    }

    try {
      setSaving(true);

      const token = localStorage.getItem("token");

      const response = await apiFetch("/api/teacher-profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          user_id: user.id,
          city: form.city,
          preferred_mode: form.preferred_mode,
          teaching_levels: form.teaching_levels,
          headline: form.headline,
          presentation: form.presentation,
          diplomas: form.diplomas,
          experience: form.experience,
          methodology: form.methodology,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Erreur enregistrement profil professeur");
        return;
      }

      alert(data.message || "Profil professeur enregistré");
      await fetchProfile();
      window.location.href = "/teacher/dashboard";
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
        <Sidebar role={"professeur"} user={user} active={"/teacher/profile"} />

        <main style={S.main}>
          <div style={S.topBar}>
            <div>
              <p style={S.smallTitle}>Mon profil professeur</p>
            </div>
          </div>

          {loading ? (
            <p>Chargement du profil...</p>
          ) : (
            <>
              <div style={S.stats}>
                <div style={S.statAccent}>
                  <div style={S.statLabelW}>Profil complété</div>
                  <div style={S.statValW}>{completionPercent}%</div>
                </div>

                <div style={S.stat}>
                  <div style={S.statLabel}>Niveau profil</div>
                  <div style={S.statVal}>{profileLevel.label}</div>
                </div>

                <div style={S.stat}>
                  <div style={S.statLabel}>Commission</div>
                  <div style={S.statVal}>{profileLevel.commission}</div>
                </div>

                <div style={S.stat}>
                  <div style={S.statLabel}>Annonces</div>
                  <div style={S.statVal}>0</div>
                </div>
              </div>

              <div style={S.grid2}>
                <div style={S.card}>
                  <div style={S.cardTitle}>Photo et niveau de profil</div>

                  <div style={S.photoRow}>
                    <div style={S.photoCircle}>
                      {preview ? (
                        <img src={preview} alt="photo profil" style={S.photoImg} />
                      ) : (
                        <span style={{ color: "#9CA3AF", fontSize: 16 }}>Photo</span>
                      )}
                    </div>

                    <div>
                      <input type="file" accept="image/*" onChange={handlePhoto} />
                      <p style={S.photoHint}>
                        Ajoutez une photo pour rendre votre profil plus professionnel et
                        plus rassurant pour les élèves.
                      </p>
                    </div>
                  </div>

                  <div style={S.progressWrap}>
                    <div style={S.progressBar}>
                      <div
                        style={{
                          ...S.progressFill,
                          width: `${completionPercent}%`,
                        }}
                      />
                    </div>
                    <div style={S.progressText}>
                      Votre profil est complété à <strong>{completionPercent}%</strong>.
                    </div>
                  </div>

                  <div style={S.pillsRow}>
                    <span
                      style={{
                        ...S.pill,
                        background: profileLevel.colorBg,
                        color: profileLevel.colorText,
                      }}
                    >
                      Niveau : {profileLevel.label}
                    </span>

                    <span
                      style={{
                        ...S.pill,
                        background: "#F3F4F6",
                        color: "#4B5563",
                      }}
                    >
                      Commission : {profileLevel.commission}
                    </span>
                  </div>
                </div>

                <div style={S.card}>
                  <div style={S.cardTitle}>Résumé du profil</div>

                  <div style={S.profileGrid}>
                    <div style={S.profileItem}>
                      <div style={S.profileLabel}>Ville</div>
                      <div style={S.profileValue}>{form.city || "—"}</div>
                    </div>

                    <div style={S.profileItem}>
                      <div style={S.profileLabel}>Mode préféré</div>
                      <div style={S.profileValue}>{form.preferred_mode || "—"}</div>
                    </div>

                    <div style={S.profileItem}>
                      <div style={S.profileLabel}>Niveaux enseignés</div>
                      <div style={S.profileValue}>
                        {form.teaching_levels.length > 0
                          ? form.teaching_levels.join(", ")
                          : "—"}
                      </div>
                    </div>

                    <div style={S.profileItem}>
                      <div style={S.profileLabel}>Présentation</div>
                      <div style={S.profileValue}>{form.headline || "—"}</div>
                    </div>

                    <div style={S.profileItem}>
                      <div style={S.profileLabel}>Méthodologie</div>
                      <div style={S.profileValue}>
                        {form.methodology ? "Renseignée" : "—"}
                      </div>
                    </div>
                  </div>

                  <p style={S.helperText}>
                    Plus votre profil est complet, plus votre niveau progresse et plus
                    votre commission devient avantageuse.
                  </p>
                </div>
              </div>

              <div style={S.card}>
                <div style={S.cardTitle}>Fiche professeur</div>

                <form onSubmit={handleSubmit}>
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
                      <label style={S.label}>Mode préféré</label>
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
                    <label style={S.label}>Niveaux enseignés</label>
                    <div style={S.checkboxWrap}>
                      {LEVEL_OPTIONS.map((level) => (
                        <label key={level} style={S.checkboxItem}>
                          <input
                            type="checkbox"
                            checked={form.teaching_levels.includes(level)}
                            onChange={() => handleLevelChange(level)}
                          />
                          <span>{level}</span>
                        </label>
                      ))}
                    </div>
                    <p style={S.helperText}>
                      Vous pouvez sélectionner plusieurs niveaux.
                    </p>
                  </div>

                  <div style={S.field}>
                    <label style={S.label}>Présentation courte</label>
                    <input
                      name="headline"
                      value={form.headline}
                      onChange={handleChange}
                      placeholder="Ex : Professeur d’informatique pour lycée et supérieur"
                      style={S.input}
                    />
                  </div>

                  <div style={S.field}>
                    <label style={S.label}>Présentation détaillée</label>
                    <textarea
                      name="presentation"
                      value={form.presentation}
                      onChange={handleChange}
                      placeholder="Présentez votre parcours, vos points forts et ce que l’élève peut attendre de vous."
                      style={S.textarea}
                    />
                  </div>

                  <div style={S.field}>
                    <label style={S.label}>Diplômes</label>
                    <textarea
                      name="diplomas"
                      value={form.diplomas}
                      onChange={handleChange}
                      placeholder="Décrivez vos diplômes, certifications ou formations."
                      style={S.textarea}
                    />
                  </div>

                  <div style={S.field}>
                    <label style={S.label}>Expériences</label>
                    <textarea
                      name="experience"
                      value={form.experience}
                      onChange={handleChange}
                      placeholder="Décrivez vos expériences d’enseignement, d’accompagnement ou professionnelles."
                      style={S.textarea}
                    />
                  </div>

                  <div style={S.field}>
                    <label style={S.label}>Méthodologie</label>
                    <textarea
                      name="methodology"
                      value={form.methodology}
                      onChange={handleChange}
                      placeholder="Expliquez votre manière de travailler avec les élèves : rythme, pédagogie, suivi et objectifs."
                      style={S.textarea}
                    />
                  </div>

                  <div style={S.btnRow}>
                    <button
                      type="submit"
                      disabled={saving}
                      style={{ ...S.btn, ...S.btnPrimary }}
                    >
                      {saving ? "Enregistrement..." : "Enregistrer mon profil"}
                    </button>

                    <a href="/teacher/dashboard" style={{ ...S.btn, ...S.btnGhost }}>
                      Retour au dashboard
                    </a>
                  </div>
                </form>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}

export default TeacherProfile;