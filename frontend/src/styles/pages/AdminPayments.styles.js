const S = {
  wrap: { fontFamily: "'Segoe UI', sans-serif", minHeight: "100vh", background: "#F9FAFB" },
  logo: { fontSize: 20, fontWeight: 800 },
  logoEm: { color: "#2563EB" },

  dash: { display: "grid", gridTemplateColumns: "240px 1fr", minHeight: "100vh" },

  sidebar: {
    background: "#fff",
    borderRight: "1px solid #E5E7EB",
    display: "flex",
    flexDirection: "column",
    position: "sticky",
    top: 0,
    height: "100vh",
  },

  sbBrand: { padding: 20, borderBottom: "1px solid #E5E7EB" },

  sbRole: {
    marginTop: 6,
    fontSize: 10,
    fontWeight: 700,
    textTransform: "uppercase",
    padding: "2px 10px",
    borderRadius: 20,
    background: "#FEF2F2",
    color: "#DC2626",
    display: "inline-block",
  },

  sbNav: { padding: 12, flex: 1 },

  sbLink: {
    display: "flex",
    padding: "10px 12px",
    borderRadius: 8,
    fontSize: 13,
    color: "#4B5563",
    textDecoration: "none",
    marginBottom: 2,
  },

  sbLinkActive: {
    display: "flex",
    padding: "10px 12px",
    borderRadius: 8,
    fontSize: 13,
    color: "#2563EB",
    background: "#EFF6FF",
    textDecoration: "none",
    marginBottom: 2,
  },

  sbUser: {
    padding: "14px 20px",
    borderTop: "1px solid #E5E7EB",
    display: "flex",
    alignItems: "center",
    gap: 10,
  },

  av: {
    width: 34,
    height: 34,
    borderRadius: "50%",
    background: "linear-gradient(135deg,#6B7280,#374151)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    fontWeight: 700,
    fontSize: 12,
    flexShrink: 0,
  },

  main: { padding: 30 },

  pageTitle: { fontSize: 24, fontWeight: 800 },
  pageSub:   { fontSize: 14, color: "#9CA3AF", marginBottom: 20 },

  stats: {
    display: "grid",
    gridTemplateColumns: "repeat(4,1fr)",
    gap: 14,
    marginBottom: 20,
  },

  stat: {
    background: "#fff",
    border: "1px solid #E5E7EB",
    borderRadius: 12,
    padding: 18,
  },

  statAccent: {
    background: "#2563EB",
    borderRadius: 12,
    padding: 18,
    color: "white",
  },

  statLabel: {
    fontSize: 11,
    fontWeight: 600,
    color: "#9CA3AF",
    textTransform: "uppercase",
    letterSpacing: ".06em",
    marginBottom: 8,
  },

  statLabelW: {
    fontSize: 11,
    fontWeight: 600,
    color: "rgba(255,255,255,.7)",
    textTransform: "uppercase",
    letterSpacing: ".06em",
    marginBottom: 8,
  },

  statVal:  { fontSize: 28, fontWeight: 800, color: "#111827" },
  statValW: { fontSize: 28, fontWeight: 800, color: "#fff" },

  searchRow: {
    display: "grid",
    gridTemplateColumns: "1fr 140px",
    gap: 10,
    marginBottom: 14,
  },

  input: {
    width: "100%",
    padding: "10px 14px",
    borderRadius: 8,
    border: "1.5px solid #E5E7EB",
    fontFamily: "inherit",
    fontSize: 13,
    outline: "none",
    boxSizing: "border-box",
    background: "#fff",
  },

  tbl: { width: "100%", borderCollapse: "collapse" },

  tblTh: {
    textAlign: "left",
    padding: 10,
    fontSize: 11,
    color: "#9CA3AF",
    borderBottom: "1px solid #E5E7EB",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: ".06em",
  },

  tblTd: {
    padding: 12,
    borderBottom: "1px solid #F3F4F6",
    fontSize: 13,
  },

  pill: {
    fontSize: 11,
    fontWeight: 600,
    padding: "3px 10px",
    borderRadius: 20,
    display: "inline-block",
  },

  btn: {
    padding: "8px 14px",
    borderRadius: 8,
    fontSize: 12,
    fontWeight: 600,
    border: "none",
    cursor: "pointer",
    fontFamily: "inherit",
  },

  btnPrimary: { background: "#2563EB", color: "white" },
  btnGhost:   { background: "#F3F4F6", color: "#4B5563" },
};

export default S;
