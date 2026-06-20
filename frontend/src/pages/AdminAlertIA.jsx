import React, { useEffect, useState } from "react";

import S from "../styles/pages/AdminAlertIA.styles.js";
import { apiFetch } from "../config/api.js";
import Sidebar from "../components/layout/Sidebar.jsx";

function AdminAlertIA() {
  const savedUser = localStorage.getItem("user");
  const user = savedUser ? JSON.parse(savedUser) : null;
  const token = localStorage.getItem("token");

  const [messages, setMessages] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const charger = async () => {
      try {
        const res = await apiFetch("/api/messages/admin/bloques", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          setMessages(Array.isArray(data) ? data : []);
        }
      } catch {
        console.error("Impossible de charger les alertes");
      } finally {
        setLoading(false);
      }
    };
    charger();
  }, []);

  // filtrage par nom ou contenu
  const filtres = messages.filter(m => {
    if (!search) return true;
    const s = search.toLowerCase();
    const expediteur = `${m.sender_prenom || ""} ${m.sender_nom || ""}`.toLowerCase();
    const destinataire = `${m.receiver_prenom || ""} ${m.receiver_nom || ""}`.toLowerCase();
    return expediteur.includes(s) || destinataire.includes(s);
  });

  // stats
  const aujourd = new Date().toDateString();
  const aujourd_count = messages.filter(m =>
    new Date(m.created_at).toDateString() === aujourd
  ).length;

  return (
    <div style={S.wrap}>
      <div style={S.dash}>

        {/* ── SIDEBAR ── */}
        <Sidebar role={"admin"} user={user} active={"/admin/alerts"} />

        <main style={S.main}>
          <div style={S.pageTitle}>🤖 Alertes IA — Messages bloqués</div>
          <div style={S.pageSub}>
            Messages automatiquement bloqués car ils contenaient un email ou un numéro de téléphone.
          </div>

          <div style={S.alertBox}>
            ⚠️ Ces messages ont été remplacés par <strong>[Message bloqué : coordonnées interdites]</strong> avant d'être envoyés au destinataire. L'expéditeur a reçu un avertissement. Aucune donnée personnelle n'a été transmise.
          </div>

          <div style={S.stats}>
            <div style={S.statAccent}>
              <div style={S.statLabelW}>Total bloqués</div>
              <div style={S.statValW}>{loading ? "…" : messages.length}</div>
            </div>
            <div style={S.stat}>
              <div style={S.statLabel}>Aujourd'hui</div>
              <div style={S.statVal}>{loading ? "…" : aujourd_count}</div>
            </div>
            <div style={S.stat}>
              <div style={S.statLabel}>Utilisateurs concernés</div>
              <div style={S.statVal}>
                {loading ? "…" : new Set(messages.map(m => m.sender_id)).size}
              </div>
            </div>
          </div>

          <div style={S.card}>
            <div style={S.cardTitle}>Liste des messages bloqués</div>

            <div style={S.searchRow}>
              <input
                style={S.input}
                placeholder="Rechercher par nom d'utilisateur"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
              <button style={{ ...S.btn, ...S.btnGhost }} onClick={() => setSearch("")}>
                Réinitialiser
              </button>
            </div>

            {loading ? (
              <div style={S.empty}><p>Chargement…</p></div>
            ) : filtres.length === 0 ? (
              <div style={S.empty}>
                <div style={S.emptyIcon}>✅</div>
                <p>Aucune alerte détectée pour le moment.</p>
              </div>
            ) : (
              <div style={{ overflowX: "auto" }}>
                <table style={S.tbl}>
                  <thead>
                    <tr>
                      <th style={S.tblTh}>Expéditeur</th>
                      <th style={S.tblTh}>Destinataire</th>
                      <th style={S.tblTh}>Message bloqué</th>
                      <th style={S.tblTh}>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtres.map(m => (
                      <tr key={m.id}>
                        <td style={S.tblTd}>
                          <div style={{ fontWeight: 600 }}>
                            {m.sender_prenom} {m.sender_nom}
                          </div>
                          <span style={{ ...S.pill, background: "#EFF6FF", color: "#2563EB", marginTop: 4 }}>
                            {m.sender_role}
                          </span>
                        </td>
                        <td style={S.tblTd}>
                          {m.receiver_prenom} {m.receiver_nom}
                        </td>
                        <td style={S.tblTd}>
                          <div style={S.blocked}>
                            {m.content}
                          </div>
                        </td>
                        <td style={S.tblTd}>
                          {m.created_at
                            ? new Date(m.created_at).toLocaleDateString("fr-FR") + " " +
                              new Date(m.created_at).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })
                            : "—"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminAlertIA;
