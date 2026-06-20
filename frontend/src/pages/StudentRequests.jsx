import React, { useEffect, useState } from "react";

import S from "../styles/pages/StudentRequests.styles.js";
import { apiFetch } from "../config/api.js";
import Sidebar from "../components/layout/Sidebar.jsx";

function StudentRequests() {
  const savedUser = localStorage.getItem("user");
  const user = savedUser ? JSON.parse(savedUser) : null;

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    if (!user?.id) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/trials/student/${user.id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Erreur chargement des demandes");
        return;
      }

      setRequests(Array.isArray(data) ? data : []);
    } catch (error) {
      alert("Erreur de connexion au serveur");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [user?.id]);

  const getStatusLabel = (status) => {
    if (status === "accepted") return "Acceptée";
    if (status === "reported") return "Reportée";
    if (status === "refused") return "Refusée";
    if (status === "pending") return "En attente";
    return "En attente";
  };

  const getStatusStyle = (status) => {
    if (status === "accepted") {
      return { background: "#ECFDF5", color: "#059669" };
    }
    if (status === "reported") {
      return { background: "#EFF6FF", color: "#2563EB" };
    }
    if (status === "refused") {
      return { background: "#FEF2F2", color: "#DC2626" };
    }
    return { background: "#FFF7ED", color: "#EA580C" };
  };

  const formatSlot = (request) => {
    const day = request.requested_day || "Jour non précisé";
    const start = request.requested_start_time
      ? String(request.requested_start_time).slice(0, 5)
      : "--:--";
    const end = request.requested_end_time
      ? String(request.requested_end_time).slice(0, 5)
      : "--:--";

    return `${day} • ${start}-${end}`;
  };

  return (
    <div style={S.wrap}>
      <div style={S.dash}>
        {/* ── SIDEBAR ── */}
        <Sidebar role={"eleve"} user={user} active={"/trial-request"} />

        <main style={S.main}>
          <div style={S.pageHead}>
            <div style={S.pageTitle}>📬 Mes demandes de cours d’essai</div>
            <div style={S.pageSub}>
              Suivez les demandes envoyées aux professeurs après votre recherche
              d’annonce. Vous retrouvez ici le créneau demandé, le professeur
              choisi et le statut de la demande.
            </div>
          </div>

          <div style={S.stats}>
            <div style={S.statAccent}>
              <div style={S.statLabelW}>Demandes envoyées</div>
              <div style={S.statValW}>{requests.length}</div>
            </div>

            <div style={S.stat}>
              <div style={S.statLabel}>En attente</div>
              <div style={S.statVal}>
                {requests.filter((r) => r.status === "pending").length}
              </div>
            </div>

            <div style={S.stat}>
              <div style={S.statLabel}>Acceptées</div>
              <div style={S.statVal}>
                {requests.filter((r) => r.status === "accepted").length}
              </div>
            </div>

            <div style={S.stat}>
              <div style={S.statLabel}>Reportées</div>
              <div style={S.statVal}>
                {requests.filter((r) => r.status === "reported").length}
              </div>
            </div>
          </div>

          <div style={S.card}>
            <div style={S.cardTitle}>Liste de mes demandes</div>
            <p style={S.cardDesc}>
              Une demande correspond à un professeur choisi, une annonce
              précise, un créneau proposé et un besoin pédagogique transmis
              avant le cours d’essai.
            </p>

            {loading ? (
              <div style={S.empty}>
                <div style={S.emptyText}>Chargement des demandes...</div>
              </div>
            ) : requests.length === 0 ? (
              <div style={S.empty}>
                <div style={S.emptyIcon}>📭</div>
                <p style={S.emptyText}>
                  Aucune demande envoyée pour le moment.
                </p>
              </div>
            ) : (
              <div style={S.requestsList}>
                {requests.map((request) => (
                  <div key={request.id} style={S.requestCard}>
                    <div style={S.requestHeader}>
                      <div>
                        <h4 style={S.requestTitle}>
                          {request.teacher_prenom || ""} {request.teacher_nom || ""}
                        </h4>
                        <p style={S.requestSub}>
                          Annonce #{request.announcement_id}
                        </p>
                      </div>

                      <span
                        style={{
                          ...S.badge,
                          ...getStatusStyle(request.status),
                        }}
                      >
                        {getStatusLabel(request.status)}
                      </span>
                    </div>

                    <div style={S.infoGrid}>
                      <div style={S.infoBox}>
                        <div style={S.infoLabel}>Professeur</div>
                        <div style={S.infoValue}>{request.teacher_prenom || ""} {request.teacher_nom || ""}</div>
                      </div>

                      <div style={S.infoBox}>
                        <div style={S.infoLabel}>Créneau demandé</div>
                        <div style={S.infoValue}>{formatSlot(request)}</div>
                      </div>
                    </div>

                    <div style={S.messageBox}>
                      <div style={S.infoLabel}>Statut actuel</div>
                      <p style={S.messageText}>{getStatusLabel(request.status)}</p>
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

export default StudentRequests;