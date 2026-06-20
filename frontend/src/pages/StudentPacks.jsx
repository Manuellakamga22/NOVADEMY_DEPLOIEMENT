import React, { useEffect, useState } from "react";

import S from "../styles/pages/StudentPacks.styles.js";
import { apiFetch } from "../config/api.js";
import Sidebar from "../components/layout/Sidebar.jsx";

const TYPE_LABELS = {
  suivi_regulier: "Suivi régulier",
  pack_heures: "Pack d'heures",
  classe_virtuelle: "Classe virtuelle",
};

function StudentPacks() {
  const savedUser = localStorage.getItem("user");
  const user = savedUser ? JSON.parse(savedUser) : null;

  const [proposals, setProposals] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [accepting, setAccepting] = useState(false);

  // Charger les propositions de formules envoyées par les profs
  const fetchProposals = async () => {
    if (!user?.id) {
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/packs/student/${user.id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const data = await res.json();

      if (res.ok) {
        setProposals(Array.isArray(data) ? data : []);
        if (data.length > 0) setSelectedId(data[0].id);
      } else {
        alert(data.message || "Erreur chargement des formules");
      }
    } catch {
      alert("Erreur de connexion au serveur");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProposals();
  }, []);

  // Accepter une formule proposée
  const handleAccept = async (proposalId) => {
    setAccepting(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/packs/accept/${proposalId}`,
        {
          method: "PUT",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Erreur acceptation de la formule");
        return;
      }

      alert("Formule acceptée ! Vous pouvez maintenant procéder au paiement.");
      window.location.href = "/payment";
    } catch {
      alert("Erreur de connexion au serveur");
    } finally {
      setAccepting(false);
    }
  };

  const selected = proposals.find((p) => p.id === selectedId);

  return (
    <div style={S.wrap}>
      <div style={S.dash}>
        {/* ── SIDEBAR ── */}
        <Sidebar role={"eleve"} user={user} active={"/student/packs"} />

        <main style={S.main}>
          <div style={S.topBar}>
            <div>
              <p style={S.smallTitle}>Formules proposées</p>
              <p style={S.smallSub}>
                Votre professeur vous a proposé une formule après le cours
                d'essai. Choisissez et acceptez pour continuer.
              </p>
            </div>
          </div>

          {loading ? (
            <div style={S.empty}>
              <div style={S.emptyText}>Chargement des formules...</div>
            </div>
          ) : proposals.length === 0 ? (
            <div style={S.empty}>
              <div style={S.emptyIcon}>📦</div>
              <p style={S.emptyText}>
                Aucune formule proposée pour le moment.
                <br />
                Votre professeur vous enverra une proposition après le cours
                d'essai.
              </p>
            </div>
          ) : (
            <>
              <div style={S.formulaGrid}>
                {proposals.map((proposal) => (
                  <div
                    key={proposal.id}
                    style={
                      selectedId === proposal.id
                        ? S.formulaCardActive
                        : S.formulaCard
                    }
                  >
                    <div style={S.formulaTop}>
                      <h3 style={S.formulaTitle}>
                        {TYPE_LABELS[proposal.type] || proposal.type}
                      </h3>
                      <span style={S.formulaTag}>
                        {proposal.duration_months
                          ? `${proposal.duration_months} mois`
                          : "Flexible"}
                      </span>
                    </div>

                    <div style={S.formulaText}>
                      Professeur #{proposal.teacher_id}
                    </div>

                    <div style={S.formulaPrice}>{proposal.final_price} €</div>
                    <div style={S.formulaPriceSub}>prix total</div>

                    <ul style={S.list}>
                      {proposal.total_hours && (
                        <li>{proposal.total_hours}h au total</li>
                      )}
                      {proposal.hours_per_week && (
                        <li>{proposal.hours_per_week}h par semaine</li>
                      )}
                      {proposal.engagement_required === 1 && (
                        <li>Engagement {proposal.engagement_months} mois</li>
                      )}
                    </ul>

                    <div style={S.btnRow}>
                      <button
                        type="button"
                        onClick={() => setSelectedId(proposal.id)}
                        style={{ ...S.btn, ...S.btnPrimary }}
                      >
                        Choisir
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div style={S.summaryCard}>
                <div style={S.summaryTitle}>Récapitulatif</div>

                <div style={S.summaryGrid}>
                  <div style={S.summaryBox}>
                    <div style={S.summaryLabel}>Formule sélectionnée</div>
                    <div style={S.summaryValue}>
                      {selected
                        ? TYPE_LABELS[selected.type] || selected.type
                        : "—"}
                    </div>
                  </div>

                  <div style={S.summaryBox}>
                    <div style={S.summaryLabel}>Tarif</div>
                    <div style={S.summaryValue}>
                      {selected ? `${selected.final_price} €` : "—"}
                    </div>
                  </div>
                </div>

                <div style={S.btnRow}>
                  <button
                    type="button"
                    disabled={!selectedId || accepting}
                    onClick={() => handleAccept(selectedId)}
                    style={{
                      ...S.btn,
                      ...S.btnPrimary,
                      opacity: !selectedId || accepting ? 0.5 : 1,
                      cursor: !selectedId || accepting ? "not-allowed" : "pointer",
                    }}
                  >
                    {accepting ? "En cours..." : "Accepter et continuer vers le paiement"}
                  </button>

                  <a href="/trial-request" style={{ ...S.btn, ...S.btnGhost }}>
                    Retour
                  </a>
                </div>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}

export default StudentPacks;