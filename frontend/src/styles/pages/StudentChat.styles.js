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

export default S;
