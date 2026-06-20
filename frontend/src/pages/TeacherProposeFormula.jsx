import React, { useEffect, useState } from "react";

import S from "../styles/pages/TeacherProposeFormula.styles.js";
import { apiFetch } from "../config/api.js";
import Sidebar from "../components/layout/Sidebar.jsx";

const typeLabel = {
  suivi_regulier: "Suivi régulier",
  pack_heures: "Pack d'heures",
  classe_virtuelle: "Classe virtuelle",
};

function TeacherProposeFormula() {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const token = localStorage.getItem("token");

  const [catalogue, setCatalogue] = useState([]);
  const [demandesAcceptees, setDemandesAcceptees] = useState([]);
  const [demandeChoisie, setDemandeChoisie] = useState(null);
  const [formuleChoisie, setFormuleChoisie] = useState(null);
  const [envoi, setEnvoi] = useState(false);

  useEffect(() => {
    if (!user?.id) return;
    chargerCatalogue();
    chargerDemandes();
  }, []);

  async function chargerCatalogue() {
    try {
      const res = await apiFetch("/api/packs/catalog", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) setCatalogue(data);
    } catch {
      console.error("impossible de charger le catalogue");
    }
  }

  async function chargerDemandes() {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/trials/teacher/${user.id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const data = await res.json();
      if (res.ok) {
        setDemandesAcceptees(data.filter(d => d.status === "accepted"));
      }
    } catch {
      console.error("impossible de charger les demandes");
    }
  }

  async function handleEnvoyer() {
    if (!demandeChoisie) { alert("Choisissez une demande d'essai."); return; }
    if (!formuleChoisie) { alert("Choisissez une formule."); return; }

    setEnvoi(true);
    try {
      const res = await apiFetch("/api/packs/propose", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          trial_request_id: demandeChoisie.id,
          teacher_id: user.id,
          student_id: demandeChoisie.student_id,
          formula_id: formuleChoisie.id,
        }),
      });
      const data = await res.json();
      if (!res.ok) { alert(data.message || "Erreur lors de l'envoi"); return; }
      alert("Formule envoyée à l'élève !");
      window.location.href = "/teacher/dashboard";
    } catch {
      alert("Erreur de connexion au serveur");
    } finally {
      setEnvoi(false);
    }
  }

  // retourne le nom lisible de l'élève
  function nomEleve(d) {
    const nom = [d.student_prenom, d.student_nom].filter(Boolean).join(" ");
    return nom || "Élève #" + d.student_id;
  }

  // retourne un résumé lisible de la formule
  function resumeFormule(f) {
    const parties = [];
    if (f.duration_months) parties.push(f.duration_months + " mois");
    else parties.push("Flexible");
    if (f.hours_per_week) parties.push(f.hours_per_week + "h/semaine");
    if (f.total_hours) parties.push(f.total_hours + "h au total");
    parties.push(f.price + " €");
    return parties.join(" · ");
  }

  return (
    <div style={S.wrap}>
      <div style={S.dash}>

        {/* ── SIDEBAR ── */}
        <Sidebar role={"professeur"} user={user} active={"/teacher/propose/formula"} />

        <main style={S.main}>
          <div style={S.pageTitle}>Proposer une formule</div>

          {/* étape 1 */}
          <div style={S.card}>
            <div style={S.cardTitle}>Étape 1 — Demande d'essai acceptée</div>
            <div style={S.noteBox}>
              La formule ne peut être proposée qu'après l'acceptation d'un cours d'essai. Seules vos demandes acceptées apparaissent ici.
            </div>

            {demandesAcceptees.length === 0 ? (
              <div style={S.empty}>
                Aucun cours d'essai accepté pour l'instant.<br />
                Acceptez d'abord une demande depuis la page Demandes.
              </div>
            ) : (
              demandesAcceptees.map(d => (
                <div key={d.id} style={demandeChoisie?.id === d.id ? S.itemActive : S.item}>
                  <div style={S.itemName}>{nomEleve(d)}</div>
                  <div style={S.itemSub}>
                    Créneau : {d.requested_day} {String(d.requested_start_time).slice(0, 5)} - {String(d.requested_end_time).slice(0, 5)}
                  </div>
                  <div style={S.pillRow}>
                    <span style={{ ...S.pill, background: "#ECFDF5", color: "#059669" }}>Cours d'essai accepté</span>
                    <span style={{ ...S.pill, background: "#EFF6FF", color: "#2563EB" }}>Demande #{d.id}</span>
                  </div>
                  <button
                    style={{ ...S.btn, ...(demandeChoisie?.id === d.id ? S.btnPrimary : S.btnGhost) }}
                    onClick={() => setDemandeChoisie(d)}>
                    {demandeChoisie?.id === d.id ? "✓ Sélectionnée" : "Choisir cette demande"}
                  </button>
                </div>
              ))
            )}
          </div>

          {/* étape 2 */}
          <div style={S.card}>
            <div style={S.cardTitle}>Étape 2 — Formule à proposer</div>
            <div style={S.noteBox}>
              Deux formules disponibles : suivi régulier (engagement mensuel) ou pack d'heures (utilisation flexible).
            </div>

            {catalogue.length === 0 ? (
              <div style={S.empty}>Catalogue indisponible pour le moment.</div>
            ) : (
              catalogue.map(f => (
                <div key={f.id} style={formuleChoisie?.id === f.id ? S.itemActive : S.item}>
                  <div style={S.itemName}>{f.label || typeLabel[f.type] || f.type}</div>
                  <div style={S.itemSub}>{resumeFormule(f)}</div>
                  <div style={S.pillRow}>
                    <span style={{ ...S.pill, background: "#EFF6FF", color: "#2563EB" }}>
                      {f.engagement_required ? "Engagement " + f.engagement_months + " mois" : "Sans engagement"}
                    </span>
                    <span style={{ ...S.pill, background: "#F3F4F6", color: "#4B5563" }}>
                      {typeLabel[f.type] || f.type}
                    </span>
                  </div>
                  <button
                    style={{ ...S.btn, ...(formuleChoisie?.id === f.id ? S.btnPrimary : S.btnGhost) }}
                    onClick={() => setFormuleChoisie(f)}>
                    {formuleChoisie?.id === f.id ? "✓ Sélectionnée" : "Choisir cette formule"}
                  </button>
                </div>
              ))
            )}
          </div>

          {/* récapitulatif */}
          {demandeChoisie && formuleChoisie && (
            <div style={S.card}>
              <div style={S.cardTitle}>Récapitulatif</div>
              <div style={S.recapBox}>
                <strong>Élève :</strong> {nomEleve(demandeChoisie)}<br />
                <strong>Formule :</strong> {formuleChoisie.label || typeLabel[formuleChoisie.type]}<br />
                <strong>Montant :</strong> {formuleChoisie.price} €<br />
                <strong>Créneau :</strong> {demandeChoisie.requested_day} {String(demandeChoisie.requested_start_time).slice(0, 5)} - {String(demandeChoisie.requested_end_time).slice(0, 5)}
              </div>
              <p style={{ fontSize: 13, color: "#9CA3AF" }}>
                L'élève recevra cette proposition et pourra l'accepter avant que le paiement soit déclenché.
              </p>
            </div>
          )}

          <div style={S.btnRow}>
            <button
              onClick={handleEnvoyer}
              disabled={envoi || !demandeChoisie || !formuleChoisie}
              style={{
                ...S.btn,
                ...S.btnPrimary,
                opacity: !demandeChoisie || !formuleChoisie ? 0.5 : 1,
                cursor: !demandeChoisie || !formuleChoisie ? "not-allowed" : "pointer",
              }}>
              {envoi ? "Envoi en cours..." : "Envoyer la formule à l'élève"}
            </button>
            <a href="/teacher/dashboard" style={{ ...S.btn, ...S.btnGhost }}>Retour</a>
          </div>

        </main>
      </div>
    </div>
  );
}

export default TeacherProposeFormula;