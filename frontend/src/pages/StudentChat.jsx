import React, { useEffect, useRef, useState } from "react";

import S from "../styles/pages/StudentChat.styles.js";
import { apiFetch } from "../config/api.js";
import Sidebar from "../components/layout/Sidebar.jsx";

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
              p.status === "proposee"
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
      const res = await apiFetch("/api/messages", {
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
      // refresh
      await fetchMessages();
    } catch {
      alert("Erreur de connexion au serveur");
    } finally {
      setSending(false);
    }
  };

  // ── Refuser la formule (élève uniquement) ────────────────────────────────────
  const handleRejectFormula = async () => {
    if (!formula?.id) return;

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/packs/reject/${formula.id}`,
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
        alert(data.message || "Erreur lors du refus");
        return;
      }

      setFormula(null);

      // Envoyer un message automatique pour informer le prof
      await fetch(`${import.meta.env.VITE_API_URL}/api/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          sender_id:   user.id,
          receiver_id: selectedReceiverId,
          content:     "J'ai refusé la formule proposée. N'hésitez pas à m'en proposer une autre.",
        }),
      });

      await fetchMessages();
    } catch {
      alert("Erreur de connexion au serveur");
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

        
        
        <Sidebar role={isTeacher ? "professeur" : "eleve"} user={user} active={isTeacher ? "/teacher/chat" : "/student/chat"} />

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
                      <button
                        type="button"
                        onClick={handleRejectFormula}
                        style={{ ...S.btn, background: "#FEF2F2", color: "#DC2626" }}
                      >
                        Refuser
                      </button>
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