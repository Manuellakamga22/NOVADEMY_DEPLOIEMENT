import React, { useEffect, useState } from "react";

const S = {
  wrap: { fontFamily: "'Segoe UI', sans-serif", minHeight: "100vh", background: "#F9FAFB" },
  dash: { display: "grid", gridTemplateColumns: "280px 1fr", minHeight: "100vh" },
  sidebar: { background: "#fff", borderRight: "1px solid #E5E7EB", display: "flex", flexDirection: "column", position: "sticky", top: 0, height: "100vh", overflowY: "auto" },
  sbBrand: { padding: "26px 22px", borderBottom: "1px solid #E5E7EB" },
  logo: { fontSize: 21, fontWeight: 800, letterSpacing: "-0.02em" },
  logoEm: { color: "#2563EB" },
  sbRole: { display: "inline-block", marginTop: 10, fontSize: 13, fontWeight: 700, textTransform: "uppercase", padding: "5px 12px", borderRadius: 20, background: "#EFF6FF", color: "#2563EB" },
  sbNav: { padding: 14, flex: 1 },
  sbLabel: { fontSize: 12, fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", color: "#9CA3AF", padding: "0 10px", margin: "18px 0 8px", display: "block" },
  sbLink: { display: "flex", alignItems: "center", gap: 12, padding: "14px 15px", borderRadius: 10, fontSize: 16, fontWeight: 500, color: "#4B5563", textDecoration: "none", marginBottom: 4 },
  sbLinkActive: { display: "flex", alignItems: "center", gap: 12, padding: "14px 15px", borderRadius: 10, fontSize: 16, fontWeight: 700, color: "#2563EB", background: "#EFF6FF", textDecoration: "none", marginBottom: 4 },
  sbBadge: { marginLeft: "auto", background: "#2563EB", color: "#fff", fontSize: 12, fontWeight: 700, padding: "3px 9px", borderRadius: 10 },
  sbUser: { padding: "18px 22px", borderTop: "1px solid #E5E7EB", display: "flex", alignItems: "center", gap: 12 },
  av: { width: 42, height: 42, borderRadius: "50%", background: "linear-gradient(135deg,#2563EB,#1D4ED8)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 16, flexShrink: 0 },
  main: { padding: "30px" },
  pageTitle: { fontSize: 28, fontWeight: 800, color: "#111827", marginBottom: 20 },
  card: { background: "#fff", border: "1px solid #E5E7EB", borderRadius: 14, padding: "20px 22px", marginBottom: 18 },
  cardTitle: { fontSize: 17, fontWeight: 800, color: "#111827", marginBottom: 14 },
  noteBox: { background: "#EFF6FF", border: "1px solid #BFDBFE", color: "#1D4ED8", borderRadius: 10, padding: "13px 15px", fontSize: 14, lineHeight: 1.6, marginBottom: 14 },
  item: { background: "#F9FAFB", border: "1px solid #E5E7EB", borderRadius: 12, padding: 16, marginBottom: 12 },
  itemActive: { background: "#fff", border: "2px solid #2563EB", borderRadius: 12, padding: 16, marginBottom: 12 },
  itemName: { fontSize: 17, fontWeight: 700, color: "#111827", marginBottom: 4 },
  itemSub: { fontSize: 14, color: "#6B7280", marginBottom: 10 },
  pillRow: { display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 10 },
  pill: { fontSize: 12, fontWeight: 700, padding: "4px 10px", borderRadius: 20, display: "inline-block" },
  btnRow: { display: "flex", gap: 10, marginTop: 10, flexWrap: "wrap" },
  btn: { fontFamily: "inherit", fontSize: 14, fontWeight: 600, padding: "9px 16px", borderRadius: 9, border: "none", cursor: "pointer", textDecoration: "none", display: "inline-flex", alignItems: "center" },
  btnPrimary: { background: "#2563EB", color: "#fff" },
  btnGhost: { background: "#F3F4F6", color: "#4B5563" },
  empty: { textAlign: "center", padding: "28px", color: "#9CA3AF", fontSize: 14 },
  recapBox: { background: "#F9FAFB", border: "1px solid #E5E7EB", borderRadius: 10, padding: 14, marginBottom: 14, fontSize: 14, color: "#374151", lineHeight: 1.9 },
};

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
      const res = await fetch("http://localhost:5001/api/packs/catalog", {
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
        `http://localhost:5001/api/trials/teacher/${user.id}`,
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
      const res = await fetch("http://localhost:5001/api/packs/propose", {
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

        <aside style={S.sidebar}>
          <div style={S.sbBrand}>
            <div style={S.logo}>NOVA<span style={S.logoEm}>DEMY</span></div>
            <span style={S.sbRole}>Professeur</span>
          </div>
          <nav style={S.sbNav}>
            <span style={S.sbLabel}>Principal</span>
            <a style={S.sbLink} href="/teacher/dashboard">🏠 Tableau de bord</a>
            <a style={S.sbLink} href="/teacher/profile">👤 Mon profil</a>
            <a style={S.sbLink} href="/teacher/announcements">📢 Annonces</a>
            <span style={S.sbLabel}>Organisation</span>
            <a style={S.sbLink} href="/teacher/planning">📅 Planning</a>
            <a style={S.sbLink} href="/teacher/requests">📬 Demandes <span style={S.sbBadge}>0</span></a>
            <a style={S.sbLinkActive} href="/teacher/propose/formula">📦 Formules</a>
            <a style={S.sbLink} href="/chat">💬 Messages <span style={S.sbBadge}>0</span></a>
            <span style={S.sbLabel}>Compte</span>
            <a style={S.sbLink} href="/teacher/revenue">💳 Revenus</a>
          </nav>
          <div style={S.sbUser}>
            <div style={S.av}>{user?.prenom?.[0]?.toUpperCase() || "P"}</div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700 }}>
                {user ? user.prenom + " " + user.nom : "Prof"}
              </div>
              <div style={{ fontSize: 13, color: "#9CA3AF" }}>Professeur</div>
            </div>
          </div>
        </aside>

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