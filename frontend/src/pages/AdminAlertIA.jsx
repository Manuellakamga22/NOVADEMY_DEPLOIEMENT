import React, { useEffect, useState } from "react";

const S = {
  wrap: { fontFamily: "'Segoe UI', sans-serif", minHeight: "100vh", background: "#F9FAFB" },
  logo: { fontSize: 20, fontWeight: 800 },
  logoEm: { color: "#2563EB" },
  dash: { display: "grid", gridTemplateColumns: "240px 1fr", minHeight: "100vh" },
  sidebar: { background: "#fff", borderRight: "1px solid #E5E7EB", display: "flex", flexDirection: "column", position: "sticky", top: 0, height: "100vh", overflowY: "auto" },
  sbBrand: { padding: 20, borderBottom: "1px solid #E5E7EB" },
  sbRole: { display: "inline-block", marginTop: 6, fontSize: 10, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", padding: "2px 10px", borderRadius: 20, background: "#FEF2F2", color: "#DC2626" },
  sbNav: { padding: 12, flex: 1 },
  sbLabel: { fontSize: 10, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "#9CA3AF", padding: "0 10px", margin: "14px 0 4px", display: "block" },
  sbLink: { display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 8, fontSize: 13, fontWeight: 500, color: "#4B5563", textDecoration: "none", marginBottom: 1 },
  sbLinkActive: { display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 8, fontSize: 13, fontWeight: 600, color: "#2563EB", background: "#EFF6FF", textDecoration: "none", marginBottom: 1 },
  sbBadge: { marginLeft: "auto", background: "#EA580C", color: "#fff", fontSize: 10, fontWeight: 700, padding: "1px 6px", borderRadius: 10 },
  sbUser: { padding: "14px 20px", borderTop: "1px solid #E5E7EB", display: "flex", alignItems: "center", gap: 10 },
  av: { width: 34, height: 34, borderRadius: "50%", background: "linear-gradient(135deg,#6B7280,#374151)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 12, flexShrink: 0 },
  main: { padding: "28px 32px" },
  pageTitle: { fontSize: 24, fontWeight: 800, marginBottom: 6 },
  pageSub: { fontSize: 14, color: "#9CA3AF", marginBottom: 20 },
  alertBox: { background: "#FFF7ED", border: "1px solid #FED7AA", borderRadius: 10, padding: "12px 16px", fontSize: 13, color: "#92400E", marginBottom: 20, lineHeight: 1.6 },
  stats: { display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14, marginBottom: 22 },
  statAccent: { background: "#DC2626", border: "1px solid #DC2626", borderRadius: 12, padding: 18 },
  stat: { background: "#fff", border: "1px solid #E5E7EB", borderRadius: 12, padding: 18 },
  statLabelW: { fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,.7)", textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 8 },
  statLabel: { fontSize: 11, fontWeight: 600, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 8 },
  statValW: { fontSize: 28, fontWeight: 800, color: "#fff" },
  statVal: { fontSize: 28, fontWeight: 800, color: "#111827" },
  card: { background: "#fff", border: "1px solid #E5E7EB", borderRadius: 12, padding: 20, marginBottom: 16 },
  cardTitle: { fontSize: 15, fontWeight: 700, marginBottom: 14 },
  searchRow: { display: "flex", gap: 10, marginBottom: 14, flexWrap: "wrap" },
  input: { flex: 1, minWidth: 200, padding: "11px 14px", borderRadius: 8, border: "1.5px solid #E5E7EB", fontFamily: "inherit", fontSize: 13, outline: "none", background: "#fff" },
  btn: { display: "inline-flex", alignItems: "center", justifyContent: "center", fontFamily: "inherit", fontSize: 12, fontWeight: 600, padding: "8px 14px", borderRadius: 8, border: "none", cursor: "pointer" },
  btnGhost: { background: "#F3F4F6", color: "#4B5563" },
  tbl: { width: "100%", borderCollapse: "collapse" },
  tblTh: { textAlign: "left", padding: "9px 12px", fontSize: 11, fontWeight: 700, letterSpacing: ".06em", textTransform: "uppercase", color: "#9CA3AF", borderBottom: "1.5px solid #E5E7EB" },
  tblTd: { padding: "12px", borderBottom: "1px solid #F3F4F6", fontSize: 13, verticalAlign: "top" },
  blocked: { background: "#FEF2F2", border: "1px solid #FCA5A5", borderRadius: 6, padding: "6px 10px", fontSize: 12, color: "#DC2626", fontStyle: "italic", display: "inline-block" },
  pill: { fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 20, display: "inline-block" },
  empty: { textAlign: "center", padding: "28px 20px", color: "#9CA3AF" },
  emptyIcon: { fontSize: 28, marginBottom: 10 },
};

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
        const res = await fetch("http://localhost:5001/api/messages/admin/bloques", {
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

        <aside style={S.sidebar}>
          <div style={S.sbBrand}>
            <div style={S.logo}>NOVA<span style={S.logoEm}>DEMY</span></div>
            <span style={S.sbRole}>Admin</span>
          </div>
          <nav style={S.sbNav}>
            <span style={S.sbLabel}>Vue globale</span>
            <a style={S.sbLink} href="/admin/dashboard">📊 Tableau de bord</a>
            <a style={S.sbLink} href="/admin/teachers">👩‍🏫 Professeurs</a>
            <a style={S.sbLink} href="/admin/students">🎓 Élèves</a>
            <a style={S.sbLink} href="/admin/announcements">📢 Annonces</a>
            <span style={S.sbLabel}>Suivi</span>
            <a style={S.sbLink} href="/admin/trials">🧪 Cours d'essai</a>
            <a style={S.sbLink} href="/admin/reviews">💬 Modération avis</a>
            <a style={S.sbLinkActive} href="/admin/alertia">🤖 Alertes IA</a>
            <a style={S.sbLink} href="/admin/payments">💳 Paiements</a>
            <span style={S.sbLabel}>Finance</span>
            <a style={S.sbLink} href="/admin/stats">📈 Statistiques</a>
            <a style={S.sbLink} href="/admin/settings">⚙️ Paramètres</a>
          </nav>
          <div style={S.sbUser}>
            <div style={S.av}>{user?.prenom?.[0]?.toUpperCase() || "A"}</div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600 }}>
                {user ? user.prenom + " " + user.nom : "Administrateur"}
              </div>
              <div style={{ fontSize: 11, color: "#9CA3AF" }}>Super Admin</div>
            </div>
          </div>
        </aside>

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
