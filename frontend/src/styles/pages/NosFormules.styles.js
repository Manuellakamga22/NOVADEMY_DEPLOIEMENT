const S = {
  wrap: { fontFamily: "'Segoe UI', sans-serif", minHeight: "100vh", background: "#fff", color: "#111827" },

  // navbar sobre
  nav: { background: "#fff", borderBottom: "1px solid #F3F4F6", padding: "0 48px", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 100 },
  navLogo: { fontSize: 23, fontWeight: 800, textDecoration: "none", color: "#111827" },
  navLogoEm: { color: "#2563EB" },
  navLinks: { display: "flex", alignItems: "center", gap: 32 },
  navLink: { fontSize: 17, fontWeight: 500, color: "#6B7280", textDecoration: "none" },
  navBtnOutline: { fontSize: 17, fontWeight: 600, color: "#374151", padding: "8px 16px", border: "1.5px solid #E5E7EB", borderRadius: 8, textDecoration: "none" },
  navBtn: { fontSize: 17, fontWeight: 700, background: "#111827", color: "#fff", padding: "8px 18px", borderRadius: 8, textDecoration: "none" },

  // hero minimaliste
  hero: { padding: "90px 48px 70px", maxWidth: 700, margin: "0 auto", textAlign: "center" },
  heroBadge: { display: "inline-flex", alignItems: "center", gap: 6, background: "#F0FDF4", color: "#16A34A", fontSize: 15, fontWeight: 700, padding: "5px 14px", borderRadius: 20, marginBottom: 24, border: "1px solid #BBF7D0" },
  heroTitle: { fontSize: 50, fontWeight: 800, color: "#111827", marginBottom: 18, lineHeight: 1.15, letterSpacing: "-0.03em" },
  heroTitleEm: { color: "#2563EB" },
  heroSub: { fontSize: 20, color: "#6B7280", lineHeight: 1.75, marginBottom: 36 },
  heroBtns: { display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" },
  heroBtn: { fontSize: 17, fontWeight: 700, padding: "12px 24px", borderRadius: 10, textDecoration: "none", border: "none", cursor: "pointer" },
  heroBtnPrimary: { background: "#111827", color: "#fff" },
  heroBtnGhost: { background: "#F9FAFB", color: "#374151", border: "1.5px solid #E5E7EB" },

  // séparateur
  divider: { height: 1, background: "#F3F4F6", maxWidth: 900, margin: "0 auto 60px" },

  main: { maxWidth: 960, margin: "0 auto", padding: "0 24px 80px" },

  label: { fontSize: 15, fontWeight: 700, color: "#2563EB", textTransform: "uppercase", letterSpacing: ".1em", marginBottom: 10 },
  sectionTitle: { fontSize: 32, fontWeight: 800, color: "#111827", marginBottom: 8, letterSpacing: "-0.02em" },
  sectionSub: { fontSize: 18, color: "#9CA3AF", marginBottom: 36, lineHeight: 1.6 },

  // cartes formules
  grid3: { display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20, marginBottom: 70 },

  card: { border: "1.5px solid #F3F4F6", borderRadius: 16, padding: "28px 24px", background: "#FAFAFA", position: "relative" },
  cardPop: { border: "1.5px solid #111827", borderRadius: 16, padding: "28px 24px", background: "#fff", position: "relative", boxShadow: "0 4px 24px rgba(0,0,0,.07)" },
  popTag: { position: "absolute", top: -11, left: 20, background: "#111827", color: "#fff", fontSize: 14, fontWeight: 700, padding: "3px 12px", borderRadius: 20 },

  cardIcon: { width: 44, height: 44, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 23, marginBottom: 16 },
  cardIconBlue: { background: "#EFF6FF" },
  cardIconGray: { background: "#F3F4F6" },
  cardIconGreen: { background: "#F0FDF4" },

  cardTitle: { fontSize: 21, fontWeight: 700, marginBottom: 4, color: "#111827" },
  cardPrice: { fontSize: 29, fontWeight: 800, color: "#111827", marginBottom: 2 },
  cardPriceSub: { fontSize: 15, color: "#9CA3AF", marginBottom: 16 },
  cardDesc: { fontSize: 17, color: "#6B7280", lineHeight: 1.7, marginBottom: 20, minHeight: 60 },

  featureList: { listStyle: "none", padding: 0, margin: "0 0 24px" },
  featureItem: { fontSize: 16, color: "#374151", padding: "7px 0", borderBottom: "1px solid #F3F4F6", display: "flex", alignItems: "center", gap: 8 },
  check: { color: "#16A34A", fontWeight: 700, fontSize: 15 },

  btn: { display: "block", textAlign: "center", fontFamily: "inherit", fontSize: 17, fontWeight: 600, padding: "11px 20px", borderRadius: 10, border: "none", cursor: "pointer", textDecoration: "none" },
  btnDark: { background: "#111827", color: "#fff" },
  btnLight: { background: "#F3F4F6", color: "#374151" },

  // tableau
  tableWrap: { border: "1.5px solid #F3F4F6", borderRadius: 14, overflow: "hidden", marginBottom: 70 },
  table: { width: "100%", borderCollapse: "collapse" },
  th: { textAlign: "left", padding: "14px 18px", fontSize: 15, fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: ".06em", background: "#FAFAFA", borderBottom: "1px solid #F3F4F6" },
  td: { padding: "13px 18px", fontSize: 17, color: "#374151", borderBottom: "1px solid #F9FAFB" },
  tdBold: { padding: "13px 18px", fontSize: 17, fontWeight: 600, color: "#111827", borderBottom: "1px solid #F9FAFB" },

  // FAQ
  faqItem: { borderBottom: "1px solid #F3F4F6" },
  faqQ: { padding: "18px 0", fontWeight: 600, fontSize: 18, cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", color: "#111827" },
  faqA: { paddingBottom: 16, fontSize: 17, color: "#6B7280", lineHeight: 1.75 },
  faqChevron: { color: "#9CA3AF", fontSize: 15 },

  // CTA sobre
  cta: { background: "#F9FAFB", border: "1.5px solid #F3F4F6", borderRadius: 20, padding: "52px 40px", textAlign: "center" },
  ctaTitle: { fontSize: 32, fontWeight: 800, color: "#111827", marginBottom: 10, letterSpacing: "-0.02em" },
  ctaSub: { fontSize: 18, color: "#6B7280", marginBottom: 28 },
  ctaBtns: { display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" },
  ctaBtn: { display: "inline-block", background: "#111827", color: "#fff", fontWeight: 700, fontSize: 17, padding: "13px 26px", borderRadius: 10, textDecoration: "none" },
  ctaBtnGhost: { display: "inline-block", background: "#fff", color: "#374151", fontWeight: 600, fontSize: 17, padding: "13px 26px", borderRadius: 10, textDecoration: "none", border: "1.5px solid #E5E7EB" },

  footer: { borderTop: "1px solid #F3F4F6", padding: "28px 48px", textAlign: "center", fontSize: 16, color: "#9CA3AF" },
};

export default S;
