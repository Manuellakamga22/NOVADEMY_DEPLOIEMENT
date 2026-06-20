import React, { useEffect, useState } from "react";

import S from "../styles/pages/TeacherRequests.styles.js";
import { apiFetch } from "../config/api.js";
import Sidebar from "../components/layout/Sidebar.jsx";

function TeacherRequests() {
  const savedUser = localStorage.getItem("user");
  const user = savedUser ? JSON.parse(savedUser) : null;

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    if (!user || !user.id) {
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/trials/teacher/${user.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Erreur chargement des demandes");
        setLoading(false);
        return;
      }

      setRequests(data);
    } catch (error) {
      alert("Erreur de connexion au serveur");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const updateStatus = async (id, newStatus) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/trials/status/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Erreur mise à jour statut");
        return;
      }

      if (newStatus === "accepted" && data.visioLink) {
        alert(
          `Demande acceptée !\nLien de la classe virtuelle :\n${data.visioLink}\n\nCe lien a été enregistré et sera visible sur la demande.`
        );
      } else if (newStatus === "accepted") {
        alert("Demande acceptée. Le chat pourra maintenant être ouvert.");
      }

      fetchRequests();
    } catch (error) {
      alert("Erreur de connexion au serveur");
    }
  };

  const getStatusLabel = (status) => {
    if (status === "accepted") return "Acceptée";
    if (status === "reported") return "Reportée";
    if (status === "refused") return "Refusée";
    if (status === "acceptee") return "Acceptée";
    if (status === "reportee") return "Reportée";
    if (status === "refusee") return "Refusée";
    if (status === "en_attente") return "En attente";
    return "En attente";
  };

  const getStatusStyle = (status) => {
    if (status === "accepted" || status === "acceptee") {
      return { background: "#ECFDF5", color: "#059669" };
    }
    if (status === "reported" || status === "reportee") {
      return { background: "#EFF6FF", color: "#2563EB" };
    }
    if (status === "refused" || status === "refusee") {
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
        <Sidebar role={"professeur"} user={user} active={"/teacher/requests"} />

        <main style={S.main}>
          <div style={S.pageHead}>
            <div style={S.pageTitle}>📬 Demandes de cours d'essai</div>
            <div style={S.pageSub}>
              Consultez les demandes envoyées par les élèves après la recherche
              d'annonce. Vous pouvez accepter, reporter ou refuser un créneau.
            </div>
          </div>

          <div style={S.stats}>
            <div style={S.statAccent}>
              <div style={S.statLabelW}>Demandes reçues</div>
              <div style={S.statValW}>{requests.length}</div>
            </div>

            <div style={S.stat}>
              <div style={S.statLabel}>En attente</div>
              <div style={S.statVal}>
                {
                  requests.filter(
                    (r) => r.status === "pending" || r.status === "en_attente"
                  ).length
                }
              </div>
            </div>

            <div style={S.stat}>
              <div style={S.statLabel}>Acceptées</div>
              <div style={S.statVal}>
                {
                  requests.filter(
                    (r) => r.status === "accepted" || r.status === "acceptee"
                  ).length
                }
              </div>
            </div>

            <div style={S.stat}>
              <div style={S.statLabel}>Reportées</div>
              <div style={S.statVal}>
                {
                  requests.filter(
                    (r) => r.status === "reported" || r.status === "reportee"
                  ).length
                }
              </div>
            </div>
          </div>

          <div style={S.card}>
            <div style={S.cardTitle}>Liste des demandes</div>
            <p style={S.cardDesc}>
              Ici, le professeur consulte le créneau demandé et peut répondre à
              l'élève.
            </p>

            {loading ? (
              <div style={S.empty}>
                <div style={S.emptyText}>Chargement des demandes...</div>
              </div>
            ) : requests.length === 0 ? (
              <div style={S.empty}>
                <div style={S.emptyIcon}>📭</div>
                <p style={S.emptyText}>Aucune demande reçue pour le moment.</p>
              </div>
            ) : (
              <div style={S.requestsList}>
                {requests.map((request) => (
                  <div key={request.id} style={S.requestCard}>
                    <div style={S.requestHeader}>
                      <div>
                        <h4 style={S.requestTitle}>
                          {request.student_prenom || ""} {request.student_nom || ""}
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
                      <p style={S.messageText}>
                        {getStatusLabel(request.status)}
                      </p>
                    </div>

                    {request.visio_link && (
                      <div style={S.visioBox}>
                        <div style={S.infoLabel}>🎥 Lien de la classe virtuelle</div>
                        <a
                          href={request.visio_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={S.visioLink}
                        >
                          {request.visio_link}
                        </a>
                      </div>
                    )}

                    <div style={S.actionsRow}>
                      <button
                        style={{ ...S.btn, ...S.btnAccept }}
                        onClick={() => updateStatus(request.id, "accepted")}
                      >
                        Accepter
                      </button>

                      <button
                        style={{ ...S.btn, ...S.btnPostpone }}
                        onClick={() => updateStatus(request.id, "reported")}
                      >
                        Reporter
                      </button>

                      <button
                        style={{ ...S.btn, ...S.btnRefuse }}
                        onClick={() => updateStatus(request.id, "refused")}
                      >
                        Refuser
                      </button>
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

export default TeacherRequests;