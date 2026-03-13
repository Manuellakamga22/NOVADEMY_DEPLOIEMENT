function Chat() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f7f7f7" }}>
      <header
        style={{
          backgroundColor: "white",
          padding: "20px 40px",
          borderBottom: "1px solid #ddd",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2>NOVADEMY - Messagerie</h2>

        <nav style={{ display: "flex", gap: "20px" }}>
          <a href="/student/dashboard">Dashboard Élève</a>
          <a href="/teacher/dashboard">Dashboard Prof</a>
          <a href="/">Accueil</a>
        </nav>
      </header>

      <main
        style={{
          padding: "40px",
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
        }}
      >
        <aside style={sidebarStyle}>
          <h3 style={{ marginBottom: "20px" }}>Conversations</h3>

          <div style={emptyConversationStyle}>
            <p>Aucune conversation active pour le moment.</p>
          </div>
        </aside>

        <section style={chatBoxStyle}>
          <div style={chatHeaderStyle}>
            <div>
              <h3>Conversation</h3>
              <p style={{ color: "#666", marginTop: "4px" }}>
                Les échanges élève / professeur apparaîtront ici.
              </p>
            </div>

            <button style={videoButtonStyle}>Rejoindre la classe virtuelle</button>
          </div>

          <div style={warningBoxStyle}>
            ⚠️ Les coordonnées personnelles (email, téléphone, réseaux sociaux)
            ne doivent pas être échangées dans le chat.
          </div>

          <div style={messagesAreaStyle}>
            <div style={emptyMessagesStyle}>
              <p>Aucun message pour le moment.</p>
              <p style={{ marginTop: "8px", color: "#777" }}>
                Commencez un échange après validation de la demande de cours d’essai.
              </p>
            </div>
          </div>

          <div style={inputAreaStyle}>
            <textarea
              placeholder="Écrivez votre message..."
              style={textareaStyle}
            />

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: "10px",
              }}
            >
              <button style={secondaryButtonStyle}>Vérifier le message</button>
              <button style={primaryButtonStyle}>Envoyer</button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

const sidebarStyle = {
  width: "280px",
  backgroundColor: "white",
  border: "1px solid #ddd",
  borderRadius: "12px",
  padding: "20px",
};

const emptyConversationStyle = {
  border: "1px solid #e5e5e5",
  borderRadius: "10px",
  padding: "20px",
  backgroundColor: "#fafafa",
  color: "#666",
};

const chatBoxStyle = {
  flex: 1,
  minWidth: "320px",
  backgroundColor: "white",
  border: "1px solid #ddd",
  borderRadius: "12px",
  padding: "20px",
  display: "flex",
  flexDirection: "column",
  gap: "16px",
};

const chatHeaderStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "12px",
  flexWrap: "wrap",
};

const warningBoxStyle = {
  backgroundColor: "#fff7ed",
  border: "1px solid #fdba74",
  color: "#9a3412",
  borderRadius: "10px",
  padding: "12px",
};

const messagesAreaStyle = {
  minHeight: "300px",
  backgroundColor: "#f9fafb",
  border: "1px solid #e5e7eb",
  borderRadius: "12px",
  padding: "20px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const emptyMessagesStyle = {
  textAlign: "center",
  color: "#555",
};

const inputAreaStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "12px",
};

const textareaStyle = {
  width: "100%",
  minHeight: "100px",
  border: "1px solid #ccc",
  borderRadius: "10px",
  padding: "12px",
  resize: "vertical",
};

const primaryButtonStyle = {
  padding: "12px 18px",
  backgroundColor: "black",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
};

const secondaryButtonStyle = {
  padding: "12px 18px",
  backgroundColor: "#e5e7eb",
  color: "#111827",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
};

const videoButtonStyle = {
  padding: "10px 14px",
  backgroundColor: "#dbeafe",
  color: "#1e3a8a",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
};

export default Chat;