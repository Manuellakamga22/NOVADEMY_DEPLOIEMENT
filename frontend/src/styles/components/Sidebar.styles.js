const SB = {
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

  brand: {
    padding: "24px 22px",
    borderBottom: "1px solid #E5E7EB",
  },

  logo: { fontSize: 27, fontWeight: 800, letterSpacing: "-0.02em" },
  logoEm: { color: "#2563EB" },

  role: {
    display: "inline-block",
    marginTop: 8,
    fontSize: 16,
    fontWeight: 700,
    letterSpacing: ".08em",
    textTransform: "uppercase",
    padding: "4px 12px",
    borderRadius: 20,
    background: "#ECFDF5",
    color: "#059669",
  },

  nav: { padding: 14, flex: 1 },

  label: {
    fontSize: 15,
    fontWeight: 700,
    letterSpacing: ".12em",
    textTransform: "uppercase",
    color: "#9CA3AF",
    padding: "0 10px",
    margin: "18px 0 6px",
    display: "block",
  },

  link: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "12px 14px",
    borderRadius: 9,
    fontSize: 20,
    fontWeight: 500,
    color: "#4B5563",
    textDecoration: "none",
    marginBottom: 2,
  },

  linkActive: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "12px 14px",
    borderRadius: 9,
    fontSize: 20,
    fontWeight: 600,
    color: "#2563EB",
    background: "#EFF6FF",
    textDecoration: "none",
    marginBottom: 2,
  },

  badge: {
    marginLeft: "auto",
    background: "#2563EB",
    color: "#fff",
    fontSize: 14,
    fontWeight: 700,
    padding: "2px 8px",
    borderRadius: 10,
  },

  user: {
    padding: "18px 22px",
    borderTop: "1px solid #E5E7EB",
    display: "flex",
    alignItems: "center",
    gap: 12,
  },

  avatar: {
    width: 44,
    height: 44,
    borderRadius: "50%",
    background: "linear-gradient(135deg,#059669,#0891B2)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    fontWeight: 700,
    fontSize: 18,
    flexShrink: 0,
  },

  logoutBtn: {
    marginTop: 8,
    width: "100%",
    padding: "8px 0",
    border: "1px solid #E5E7EB",
    borderRadius: 8,
    background: "#fff",
    color: "#EF4444",
    fontSize: 17,
    fontWeight: 600,
    cursor: "pointer",
  },
};

export default SB;
