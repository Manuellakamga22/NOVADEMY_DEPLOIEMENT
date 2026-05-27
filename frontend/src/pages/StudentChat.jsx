import React, { useEffect, useRef, useState } from "react";

const S = {
  wrap: {
    fontFamily: "'Segoe UI', sans-serif",
    minHeight: "100vh",
    background: "#F9FAFB",
  },

  logo: { fontSize: 24, fontWeight: 800, letterSpacing: "-0.02em" },
  logoEm: { color: "#2563EB" },

  dash: {
    display: "grid",
    gridTemplateColumns: "260px 320px 1fr",
    minHeight: "100vh",
  },

  sidebar: {
    background: "#fff",
    borderRight: "1px solid #E5E7EB",
    display: "flex",
    flexDirection: "column",
    position: "sticky",
    top: 0,
    height: "100vh",
    overflowY: "auto",
  },

  convPanel: {
    background: "#fff",
    borderRight: "1px solid #E5E7EB",
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    overflow: "hidden",
  },

  main: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
  },

  sbBrand: {
    padding: "24px 22px",
    borderBottom: "1px solid #E5E7EB",
  },

  sbRole: {
    display: "inline-block",
    marginTop: 8,
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: ".08em",
    textTransform: "uppercase",
    padding: "4px 12px",
    borderRadius: 20,
    background: "#EFF6FF",
    color: "#2563EB",
  },

  sbRoleGreen: {
    display: "inline-block",
    marginTop: 8,
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: ".08em",
    textTransform: "uppercase",
    padding: "4px 12px",
    borderRadius: 20,
    background: "#ECFDF5",
    color: "#059669",
  },

  sbNav: { padding: 14, flex: 1 },

  sbLabel: {
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: ".12em",
    textTransform: "uppercase",
    color: "#9CA3AF",
    padding: "0 10px",
    margin: "18px 0 6px",
    display: "block",
  },

  sbLink: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "12px 14px",
    borderRadius: 9,
    fontSize: 15,
    fontWeight: 500,
    color: "#4B5563",
    textDecoration: "none",
    marginBottom: 2,
  },

  sbLinkActive: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "12px 14px",
    borderRadius: 9,
    fontSize: 15,
    fontWeight: 600,
    color: "#2563EB",
    background: "#EFF6FF",
    textDecoration: "none",
    marginBottom: 2,
  },

  sbBadge: {
    marginLeft: "auto",
    background: "#2563EB",
    color: "#fff",
    fontSize: 11,
    fontWeight: 700,
    padding: "2px 8px",
    borderRadius: 10,
  },

  sbUser: {
    padding: "18px 22px",
    borderTop: "1px solid #E5E7EB",
    display: "flex",
    alignItems: "center",
    gap: 12,
  },

  av: {
    width: 38,
    height: 38,
    borderRadius: "50%",
    background: "linear-gradient(135deg,#2563EB,#1D4ED8)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    fontWeight: 700,
    fontSize: 15,
    flexShrink: 0,
  },

  avGreen: {
    width: 38,
    height: 38,
    borderRadius: "50%",
    background: "linear-gradient(135deg,#059669,#0891B2)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    fontWeight: 700,
    fontSize: 15,
    flexShrink: 0,
  },

  panelHead: {
    padding: "20px 18px",
    borderBottom: "1px solid #E5E7EB",
  },

  panelTitle: {
    fontSize: 18,
    fontWeight: 800,
    color: "#111827",
    marginBottom: 6,
  },

  panelSub: {
    fontSize: 13,
    color: "#9CA3AF",
    lineHeight: 1.5,
  },

  convList: {
    flex: 1,
    overflowY: "auto",
    padding: 12,
  },

  convCard: {
    background: "#fff",
    border: "1px solid #E5E7EB",
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    cursor: "pointer",
  },

  convCardActive: {
    background: "#EFF6FF",
    border: "1px solid #BFDBFE",
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    cursor: "pointer",
  },

  convTop: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
    marginBottom: 8,
  },

  convName: {
    fontSize: 15,
    fontWeight: 700,
    color: "#111827",
  },

  convTime: {
    fontSize: 12,
    color: "#9CA3AF",
  },

  convPreview: {
    fontSize: 13,
    color: "#6B7280",
    lineHeight: 1.5,
  },

  chatHead: {
    padding: "18px 22px",
    borderBottom: "1px solid #E5E7EB",
    background: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    flexWrap: "wrap",
  },

  chatHeadLeft: {
    display: "flex",
    alignItems: "center",
    gap: 12,
  },

  chatName: {
    fontSize: 17,
    fontWeight: 800,
    color: "#111827",
  },

  chatSub: {
    fontSize: 13,
    color: "#9CA3AF",
    marginTop: 2,
  },

  chatBody: {
    flex: 1,
    overflowY: "auto",
    padding: "22px",
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },

  bubbleMe: {
    alignSelf: "flex-end",
    maxWidth: "72%",
    background: "#2563EB",
    color: "#fff",
    borderRadius: "18px 18px 4px 18px",
    padding: "12px 16px",
    fontSize: 15,
    lineHeight: 1.6,
    boxShadow: "0 2px 8px rgba(37,99,235,0.15)",
  },

  bubbleOther: {
    alignSelf: "flex-start",
    maxWidth: "72%",
    background: "#F3F4F6",
    color: "#111827",
    borderRadius: "18px 18px 18px 4px",
    padding: "12px 16px",
    fontSize: 15,
    lineHeight: 1.6,
  },
  
  senderName: {
    fontSize: 12,
    fontWeight: 700,
    color: "#6B7280",
    marginBottom: 3,
  },

  bubbleTime: {
    fontSize: 11,
    color: "#9CA3AF",
    marginTop: 4,
    textAlign: "right",
  },

  formulaBox: {
    alignSelf: "flex-start",
    width: "100%",
    maxWidth: "560px",
    background: "#fff",
    border: "1px solid #BFDBFE",
    borderRadius: 16,
    padding: 18,
    boxShadow: "0 6px 16px rgba(37,99,235,0.06)",
  },

  formulaTitle: {
    fontSize: 17,
    fontWeight: 800,
    color: "#111827",
    marginBottom: 10,
  },

  formulaDesc: {
    fontSize: 14,
    color: "#6B7280",
    lineHeight: 1.6,
    marginBottom: 12,
  },

  formulaGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 10,
    marginBottom: 12,
  },

  formulaItem: {
    background: "#F9FAFB",
    border: "1px solid #E5E7EB",
    borderRadius: 10,
    padding: 12,
  },

  formulaLabel: {
    fontSize: 12,
    color: "#9CA3AF",
    marginBottom: 4,
  },

  formulaValue: {
    fontSize: 14,
    fontWeight: 700,
    color: "#111827",
  },

  inputArea: {
    background: "#fff",
    borderTop: "1px solid #E5E7EB",
    padding: "16px 22px",
  },

  textarea: {
    width: "100%",
    minHeight: 82,
    padding: "12px 14px",
    borderRadius: 10,
    border: "1.5px solid #E5E7EB",
    fontFamily: "inherit",
    fontSize: 15,
    outline: "none",
    boxSizing: "border-box",
    resize: "vertical",
    background: "#fff",
  },

  btnRow: {
    display: "flex",
    gap: 10,
    flexWrap: "wrap",
    marginTop: 12,
  },

  btn: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "inherit",
    fontSize: 14,
    fontWeight: 700,
    padding: "10px 16px",
    borderRadius: 10,
    border: "none",
    cursor: "pointer",
    textDecoration: "none",
  },

  btnPrimary: { background: "#2563EB", color: "#fff" },
  btnGhost:   { background: "#F3F4F6", color: "#4B5563" },
  btnSuccess: { background: "#059669", color: "#fff" },
  btnWarning: { background: "#EFF6FF", color: "#2563EB" },

  empty: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#9CA3AF",
    fontSize: 15,
    textAlign: "center",
    padding: 30,
  },

  emptyPanel: {
    textAlign: "center",
    padding: "40px 20px",
    color: "#9CA3AF",
    fontSize: 14,
    lineHeight: 1.7,
  },
};

const TYPE_LABELS = {
  suivi_regulier:  "Suivi régulier",
  pack_heures:     "Pack d'heures",
  classe_virtuelle: "Classe virtuelle",
};

function StudentChat() {
  const savedUser = localStorage.getItem("user");
  const user      = savedUser ? JSON.parse(savedUser) : null;
  const token     = localStorage.getItem("token");

  const isTeacher  = user?.role === "teacher";
  const roleLabel  = isTeacher ? "Professeur" : "Élève";

  // receiverId peut venir de l'URL (?receiverId=X)
  const params              = new URLSearchParams(window.location.search);
  const receiverIdFromUrl   = params.get("receiverId");

  // Liste des interlocuteurs construite depuis les trials acceptés
  const [contacts, setContacts]               = useState([]);
  const [selectedReceiverId, setSelectedReceiverId] = useState(
    receiverIdFromUrl ? Number(receiverIdFromUrl) : null
  );
  const [messages, setMessages]   = useState([]);
  const [formula, setFormula]     = useState(null);   // formule en attente (élève)
  const [content, setContent]     = useState("");
  const [sending, setSending]     = useState(false);
  const [loadingMsg, setLoadingMsg] = useState(false);

  const chatBodyRef = useRef(null);

  // ── 1. Charger les contacts (interlocuteurs ayant un essai accepté) ──────────
  useEffect(() => {
    if (!user?.id) return;

    const fetchContacts = async () => {
      try {
        const endpoint = isTeacher
          ? `${import.meta.env.VITE_API_URL}/api/trials/teacher/${user.id}`
          : `${import.meta.env.VITE_API_URL}/api/trials/student/${user.id}`;

        const res  = await fetch(endpoint, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) return;

        const data = await res.json();
        const accepted = Array.isArray(data)
          ? data.filter((t) => t.status === "accepted")
          : [];

        // Construire la liste d'interlocuteurs uniques
        const seen = new Set();
        const list = [];
        for (const t of accepted) {
          const contactId = isTeacher ? t.student_id : t.teacher_id;
          if (!seen.has(contactId)) {
            seen.add(contactId);
            list.push({
              id:       contactId,
              name:     isTeacher
                ? `${t.student_prenom || ""} ${t.student_nom || ""}`.trim() || `Élève #${contactId}`
                : `${t.teacher_prenom || ""} ${t.teacher_nom || ""}`.trim() || `Professeur #${contactId}`,
              subtitle: isTeacher ? "Élève" : "Professeur",
              preview:  t.module || "Cours d'essai accepté",
              module:   t.module || "—",
            });
          }
        }
        setContacts(list);

        // Sélectionner le premier si aucun receiverId en URL
        if (!selectedReceiverId && list.length > 0) {
          setSelectedReceiverId(list[0].id);
        }
      } catch {
        // silencieux
      }
    };

    fetchContacts();
  }, []);

  // ── 2. Charger les messages + formule quand l'interlocuteur change ───────────
  useEffect(() => {
    if (!user?.id || !selectedReceiverId) return;
    fetchMessages();
    if (!isTeacher) fetchFormula();
  }, [selectedReceiverId]);

  // ── Scroll automatique vers le bas ──────────────────────────────────────────
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages, formula]);

  const fetchMessages = async () => {
    setLoadingMsg(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/messages/${user.id}/${selectedReceiverId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (!res.ok) return;
      const data = await res.json();
      setMessages(Array.isArray(data) ? data : []);
    } catch {
      // silencieux
    } finally {
      setLoadingMsg(false);
    }
  };

  const fetchFormula = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/packs/student/${user.id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (!res.ok) return;
      const data = await res.json();
      // On cherche la formule proposée par CET interlocuteur (teacher_id)
      const match = Array.isArray(data)
        ? data.find(
            (p) =>
              Number(p.teacher_id) === Number(selectedReceiverId) &&
              p.status !== "accepted"
          )
        : null;
      setFormula(match || null);
    } catch {
      // silencieux
    }
  };

  // ── Envoyer un message ───────────────────────────────────────────────────────
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!content.trim() || !selectedReceiverId) return;

    setSending(true);
    try {
      const res = await fetch("${import.meta.env.VITE_API_URL}/api/messages", {
        method:  "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:  `Bearer ${token}`,
        },
        body: JSON.stringify({
          sender_id:   user.id,
          receiver_id: selectedReceiverId,
          content:     content.trim(),
        }),
      });

      if (!res.ok) {
        const d = await res.json();
        alert(d.message || "Erreur envoi message");
        return;
      }

      setContent("");
      // Rechargement des messages pour afficher le nouveau
      await fetchMessages();
    } catch {
      alert("Erreur de connexion au serveur");
    } finally {
      setSending(false);
    }
  };

  // ── Accepter la formule (élève uniquement) ───────────────────────────────────
  const handleAcceptFormula = async () => {
    if (!formula?.id) return;

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/packs/accept/${formula.id}`,
        {
          method:  "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization:  `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Erreur lors de l'acceptation");
        return;
      }

      alert("Formule acceptée ! Redirection vers le paiement.");
      window.location.href = `/payment?formula_id=${formula.id}`;
    } catch {
      alert("Erreur de connexion au serveur");
    }
  };

  // ── Contact sélectionné ──────────────────────────────────────────────────────
  const currentContact = contacts.find((c) => c.id === selectedReceiverId) || null;

  const initiale = user?.prenom?.[0]?.toUpperCase() || (isTeacher ? "P" : "É");

  if (!user) {
    return <div style={{ padding: 40 }}>Vous devez être connecté.</div>;
  }

  return (
    <div style={S.wrap}>
      <div style={S.dash}>

        {/* ── SIDEBAR ── */}
        <aside style={S.sidebar}>
          <div style={S.sbBrand}>
            <div style={{ ...S.logo, fontSize: 20 }}>
              NOVA<span style={S.logoEm}>DEMY</span>
            </div>
            <span style={isTeacher ? S.sbRole : S.sbRoleGreen}>{roleLabel}</span>
          </div>

          <nav style={S.sbNav}>
            <span style={S.sbLabel}>Principal</span>

            {isTeacher ? (
              <>
                <a style={S.sbLink} href="/teacher/dashboard">🏠 Tableau de bord</a>
                <a style={S.sbLink} href="/teacher/profile">👤 Mon profil</a>
                <a style={S.sbLink} href="/teacher/announcements">📢 Annonces</a>

                <span style={S.sbLabel}>Organisation</span>
                <a style={S.sbLink} href="/teacher/planning">📅 Planning</a>
                <a style={S.sbLink} href="/teacher/requests">📬 Demandes d'essai</a>
                <a style={S.sbLink} href="/teacher/propose/formula">📦 Nos formules</a>
                <a style={S.sbLinkActive} href="/student/chat">💬 Messages</a>

                <span style={S.sbLabel}>Compte</span>
                <a style={S.sbLink} href="/teacher/revenue">💳 Revenus</a>
              </>
            ) : (
              <>
                <a style={S.sbLink} href="/student/dashboard">🏠 Tableau de bord</a>
                <a style={S.sbLink} href="/student/profile">👤 Mon profil</a>
                <a style={S.sbLink} href="/search">🔍 Trouver un prof</a>

                <span style={S.sbLabel}>Mes cours</span>
                <a style={S.sbLink} href="/trial-request">📬 Demandes d'essai</a>
                <a style={S.sbLink} href="/student/packs">📦 Formules</a>
                <a style={S.sbLink} href="/student/courses">📚 Mes cours</a>
                <a style={S.sbLink} href="/student/planning">📅 Mon calendrier</a>
                <a style={S.sbLinkActive} href="/student/chat">💬 Messages</a>

                <span style={S.sbLabel}>Compte</span>
                <a style={S.sbLink} href="/payment">💳 Paiements</a>
              </>
            )}
          </nav>

          <div style={S.sbUser}>
            <div style={isTeacher ? S.av : S.avGreen}>{initiale}</div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 600 }}>
                {user ? `${user.prenom} ${user.nom}` : "Prénom Nom"}
              </div>
              <div style={{ fontSize: 13, color: "#9CA3AF", marginTop: 2 }}>
                {roleLabel}
              </div>
            </div>
          </div>
        </aside>

        {/* ── PANEL CONVERSATIONS ── */}
        <section style={S.convPanel}>
          <div style={S.panelHead}>
            <div style={S.panelTitle}>
              {isTeacher ? "Mes élèves" : "Mes professeurs"}
            </div>
            <div style={S.panelSub}>
              Conversations ouvertes après un cours d'essai accepté.
            </div>
          </div>

          <div style={S.convList}>
            {contacts.length === 0 ? (
              <div style={S.emptyPanel}>
                Aucune conversation active.<br />
                Le chat s'ouvre après l'acceptation d'un cours d'essai.
              </div>
            ) : (
              contacts.map((c) => (
                <div
                  key={c.id}
                  onClick={() => setSelectedReceiverId(c.id)}
                  style={
                    selectedReceiverId === c.id ? S.convCardActive : S.convCard
                  }
                >
                  <div style={S.convTop}>
                    <div style={S.convName}>{c.name}</div>
                  </div>
                  <div style={{ fontSize: 12, color: "#9CA3AF", marginBottom: 6 }}>
                    {c.subtitle}
                  </div>
                  <div style={S.convPreview}>{c.preview}</div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* ── ZONE CHAT ── */}
        <section style={S.main}>
          {!selectedReceiverId || !currentContact ? (
            <div style={S.empty}>
              Sélectionnez une conversation pour afficher le chat.
            </div>
          ) : (
            <>
              {/* Header */}
              <div style={S.chatHead}>
                <div style={S.chatHeadLeft}>
                  <div style={S.av}>
                    {currentContact.name?.charAt(0)?.toUpperCase() || "C"}
                  </div>
                  <div>
                    <div style={S.chatName}>{currentContact.name}</div>
                    <div style={S.chatSub}>
                      {currentContact.subtitle} • {currentContact.module}
                    </div>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div style={S.chatBody} ref={chatBodyRef}>
                {loadingMsg ? (
                  <div style={{ color: "#9CA3AF", fontSize: 14, textAlign: "center" }}>
                    Chargement des messages…
                  </div>
                ) : messages.length === 0 ? (
                  <div style={{ color: "#9CA3AF", fontSize: 14, textAlign: "center" }}>
                    Aucun message pour le moment. Commencez la conversation !
                  </div>
                ) : (
                  messages.map((m) => {
                    const isMe = Number(m.sender_id) === Number(user.id);
                    return (
                      <div key={m.id} style={{ display: "flex", flexDirection: "column", alignItems: isMe ? "flex-end" : "flex-start" }}>
                        {!isMe && m.sender_name && (
                          <div style={S.senderName}>{m.sender_name}</div>
                        )}
                        <div style={isMe ? S.bubbleMe : S.bubbleOther}>
                          {m.content}
                        </div>
                        {m.created_at && (
                          <div
                            style={{
                              ...S.bubbleTime,
                              textAlign: isMe ? "right" : "left",
                            }}
                          >
                            {new Date(m.created_at).toLocaleTimeString("fr-FR", {
                              hour:   "2-digit",
                              minute: "2-digit",
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })
                )}

                {/* Formule proposée (visible par l'élève uniquement) */}
                {!isTeacher && formula && (
                  <div style={S.formulaBox}>
                    <div style={S.formulaTitle}>📦 Formule proposée</div>
                    <div style={S.formulaDesc}>
                      Votre professeur vous a envoyé une proposition de formule.
                      Acceptez-la pour procéder au paiement.
                    </div>

                    <div style={S.formulaGrid}>
                      <div style={S.formulaItem}>
                        <div style={S.formulaLabel}>Type</div>
                        <div style={S.formulaValue}>
                          {TYPE_LABELS[formula.type] || formula.type}
                        </div>
                      </div>

                      <div style={S.formulaItem}>
                        <div style={S.formulaLabel}>Durée</div>
                        <div style={S.formulaValue}>
                          {formula.duration_months
                            ? `${formula.duration_months} mois`
                            : "—"}
                        </div>
                      </div>

                      <div style={S.formulaItem}>
                        <div style={S.formulaLabel}>Volume</div>
                        <div style={S.formulaValue}>
                          {formula.total_hours ? `${formula.total_hours} h` : "—"}
                        </div>
                      </div>

                      <div style={S.formulaItem}>
                        <div style={S.formulaLabel}>Prix</div>
                        <div style={S.formulaValue}>{formula.final_price} €</div>
                      </div>
                    </div>

                    <div style={S.btnRow}>
                      <button
                        type="button"
                        onClick={handleAcceptFormula}
                        style={{ ...S.btn, ...S.btnSuccess }}
                      >
                        Accepter et payer
                      </button>
                      <span
                        style={{
                          ...S.btn,
                          ...S.btnWarning,
                          cursor: "default",
                        }}
                      >
                        En attente de réponse
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Zone de saisie */}
              <div style={S.inputArea}>
                <form onSubmit={handleSendMessage}>
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage(e);
                      }
                    }}
                    placeholder="Écrivez votre message… (Entrée pour envoyer)"
                    style={S.textarea}
                  />
                  <div style={S.btnRow}>
                    <button
                      type="submit"
                      disabled={sending || !content.trim()}
                      style={{
                        ...S.btn,
                        ...S.btnPrimary,
                        opacity: sending || !content.trim() ? 0.5 : 1,
                        cursor: sending || !content.trim() ? "not-allowed" : "pointer",
                      }}
                    >
                      {sending ? "Envoi…" : "Envoyer"}
                    </button>
                    <a href={isTeacher ? "/teacher/dashboard" : "/student/dashboard"}
                      style={{ ...S.btn, ...S.btnGhost }}
                    >
                      Retour
                    </a>
                  </div>
                </form>
              </div>
            </>
          )}
        </section>
      </div>
    </div>
  );
}

export default StudentChat;