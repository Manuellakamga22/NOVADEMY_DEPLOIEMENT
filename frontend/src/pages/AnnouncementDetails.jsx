import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const S = {
  wrap: {
    fontFamily: "'Segoe UI', sans-serif",
    minHeight: "100vh",
    background: "#F9FAFB",
    padding: "32px",
  },
  card: {
    maxWidth: "900px",
    margin: "0 auto",
    background: "#fff",
    border: "1px solid #E5E7EB",
    borderRadius: 16,
    padding: "28px 30px",
  },
  topLink: {
    display: "inline-block",
    marginBottom: 20,
    color: "#2563EB",
    textDecoration: "none",
    fontWeight: 700,
  },
  title: {
    fontSize: 30,
    fontWeight: 800,
    color: "#111827",
    marginBottom: 8,
  },
  sub: {
    fontSize: 16,
    color: "#6B7280",
    marginBottom: 22,
    lineHeight: 1.6,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 14,
    marginBottom: 20,
  },
  box: {
    background: "#F9FAFB",
    border: "1px solid #E5E7EB",
    borderRadius: 12,
    padding: 14,
  },
  label: {
    fontSize: 12,
    color: "#9CA3AF",
    marginBottom: 6,
  },
  value: {
    fontSize: 16,
    fontWeight: 700,
    color: "#111827",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 800,
    color: "#111827",
    margin: "20px 0 10px",
  },
  text: {
    fontSize: 15,
    color: "#374151",
    lineHeight: 1.8,
    whiteSpace: "pre-wrap",
  },
  btnRow: {
    display: "flex",
    gap: 10,
    flexWrap: "wrap",
    marginTop: 24,
  },
  btn: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "inherit",
    fontSize: 15,
    fontWeight: 700,
    padding: "10px 18px",
    borderRadius: 10,
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
  empty: {
    textAlign: "center",
    color: "#9CA3AF",
    padding: "30px 20px",
  },
};

function AnnouncementDetails() {
  const [announcement, setAnnouncement] = useState(null);
  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    const fetchAnnouncement = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/announcements/${id}`);
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