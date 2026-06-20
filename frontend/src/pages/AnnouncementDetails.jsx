import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import S from "../styles/pages/AnnouncementDetails.styles.js";
import { apiFetch } from "../config/api.js";

function AnnouncementDetails() {
  const [announcement, setAnnouncement] = useState(null);
  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    const fetchAnnouncement = async () => {
      try {
        const response = await apiFetch(`/api/announcements/${id}`);
        const data = await response.json();

        if (!response.ok) {
          alert(data.message || "Erreur chargement annonce");
          return;
        }

        setAnnouncement(data);
      } catch (error) {
        alert("Erreur de connexion au serveur");
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncement();
  }, [id]);

  if (loading) {
    return (
      <div style={S.wrap}>
        <div style={S.card}>
          <div style={S.empty}>Chargement de l’annonce...</div>
        </div>
      </div>
    );
  }

  if (!announcement) {
    return (
      <div style={S.wrap}>
        <div style={S.card}>
          <div style={S.empty}>Annonce introuvable.</div>
        </div>
      </div>
    );
  }

  return (
    <div style={S.wrap}>
      <div style={S.card}>
        <a href="/search" style={S.topLink}>
          ← Retour à la recherche
        </a>

        <div style={S.title}>{announcement.title || "Annonce"}</div>
        <div style={S.sub}>
          Découvrez les informations du professeur et les détails de cette annonce
          avant de demander un cours d’essai.
        </div>

        <div style={S.grid}>
          <div style={S.box}>
            <div style={S.label}>Professeur</div>
            <div style={S.value}>
              {announcement.prenom} {announcement.nom}
            </div>
          </div>

          <div style={S.box}>
            <div style={S.label}>Matière</div>
            <div style={S.value}>{announcement.subject || "—"}</div>
          </div>

          <div style={S.box}>
            <div style={S.label}>Ville</div>
            <div style={S.value}>{announcement.city || "—"}</div>
          </div>

          <div style={S.box}>
            <div style={S.label}>Mode</div>
            <div style={S.value}>{announcement.mode || "—"}</div>
          </div>

          <div style={S.box}>
            <div style={S.label}>Niveau</div>
            <div style={S.value}>{announcement.level || "—"}</div>
          </div>

          <div style={S.box}>
            <div style={S.label}>Tarif élève</div>
            <div style={S.value}>
              {announcement.student_rate ? `${announcement.student_rate} €/h` : "—"}
            </div>
          </div>
        </div>

        <div style={S.sectionTitle}>Description</div>
        <div style={S.text}>
          {announcement.description || "Aucune description disponible."}
        </div>

        <div style={S.sectionTitle}>Méthodologie</div>
        <div style={S.text}>
          {announcement.methodology || "Aucune méthodologie précisée."}
        </div>

        <div style={S.btnRow}>
          <a
            href={`/trial-request?announcement_id=${announcement.id}&teacher_id=${announcement.teacher_id}&teacher_name=${encodeURIComponent(
              `${announcement.prenom || ""} ${announcement.nom || ""}`.trim()
            )}&subject=${encodeURIComponent(
              announcement.subject || ""
            )}&title=${encodeURIComponent(
              announcement.title || ""
            )}&mode=${encodeURIComponent(announcement.mode || "")}`}
            style={{ ...S.btn, ...S.btnPrimary }}
          >
            Demander un cours d’essai
          </a>

          <a href="/search" style={{ ...S.btn, ...S.btnGhost }}>
            Retour
          </a>
        </div>
      </div>
    </div>
  );
}

export default AnnouncementDetails;