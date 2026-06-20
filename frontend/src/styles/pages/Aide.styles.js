const S = {
  wrap: { fontFamily: "'Segoe UI', sans-serif", minHeight: "100vh", background: "#fff", color: "#111827" },

  nav: { background: "#fff", borderBottom: "1px solid #F3F4F6", padding: "0 48px", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 100 },
  navLogo: { fontSize: 23, fontWeight: 800, textDecoration: "none", color: "#111827" },
  navLogoEm: { color: "#2563EB" },
  navLinks: { display: "flex", alignItems: "center", gap: 32 },
  navLink: { fontSize: 17, fontWeight: 500, color: "#6B7280", textDecoration: "none" },
  navBtnOutline: { fontSize: 17, fontWeight: 600, color: "#374151", padding: "8px 16px", border: "1.5px solid #E5E7EB", borderRadius: 8, textDecoration: "none" },
  navBtn: { fontSize: 17, fontWeight: 700, background: "#111827", color: "#fff", padding: "8px 18px", borderRadius: 8, textDecoration: "none" },

  hero: { padding: "72px 48px 56px", maxWidth: 640, margin: "0 auto", textAlign: "center" },
  heroBadge: { display: "inline-flex", alignItems: "center", gap: 6, background: "#F0F9FF", color: "#0284C7", fontSize: 15, fontWeight: 700, padding: "5px 14px", borderRadius: 20, marginBottom: 22, border: "1px solid #BAE6FD" },
  heroTitle: { fontSize: 44, fontWeight: 800, color: "#111827", marginBottom: 16, lineHeight: 1.15, letterSpacing: "-0.03em" },
  heroSub: { fontSize: 19, color: "#6B7280", lineHeight: 1.75 },

  divider: { height: 1, background: "#F3F4F6", maxWidth: 900, margin: "0 auto 56px" },

  main: { maxWidth: 960, margin: "0 auto", padding: "0 24px 80px" },

  label: { fontSize: 15, fontWeight: 700, color: "#2563EB", textTransform: "uppercase", letterSpacing: ".1em", marginBottom: 10 },
  sectionTitle: { fontSize: 27, fontWeight: 800, color: "#111827", marginBottom: 6, letterSpacing: "-0.02em" },
  sectionSub: { fontSize: 17, color: "#9CA3AF", marginBottom: 28, lineHeight: 1.6 },

  // catégories
  catGrid: { display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14, marginBottom: 60 },
  catCard: { border: "1.5px solid #F3F4F6", borderRadius: 14, padding: "20px 18px", cursor: "pointer", background: "#FAFAFA" },
  catIcon: { fontSize: 25, marginBottom: 10 },
  catTitle: { fontSize: 17, fontWeight: 700, marginBottom: 4, color: "#111827" },
  catDesc: { fontSize: 16, color: "#6B7280", lineHeight: 1.55 },

  // guides
  stepsGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, marginBottom: 60 },
  stepCard: { border: "1.5px solid #F3F4F6", borderRadius: 14, padding: "22px 20px", background: "#FAFAFA" },
  stepCardTitle: { fontSize: 18, fontWeight: 700, marginBottom: 16, color: "#111827" },
  step: { display: "flex", gap: 12, marginBottom: 10, alignItems: "flex-start" },
  stepNum: { width: 24, height: 24, borderRadius: "50%", background: "#111827", color: "#fff", fontWeight: 700, fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 },
  stepText: { fontSize: 16, color: "#374151", lineHeight: 1.6 },

  // FAQ
  faqSection: { marginBottom: 56 },
  faqItem: { borderBottom: "1px solid #F3F4F6" },
  faqQ: { padding: "16px 0", fontWeight: 600, fontSize: 17, cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", color: "#111827" },
  faqA: { paddingBottom: 14, fontSize: 16, color: "#6B7280", lineHeight: 1.75 },
  faqChevron: { color: "#9CA3AF", fontSize: 14, flexShrink: 0 },

  // contact
  contactGrid: { display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 14, marginBottom: 60 },
  contactCard: { border: "1.5px solid #F3F4F6", borderRadius: 14, padding: "20px 18px", background: "#FAFAFA", display: "flex", gap: 14 },
  contactIcon: { fontSize: 23, flexShrink: 0 },
  contactTitle: { fontSize: 17, fontWeight: 700, marginBottom: 4, color: "#111827" },
  contactText: { fontSize: 16, color: "#6B7280", lineHeight: 1.6 },

  // CTA
  cta: { background: "#F9FAFB", border: "1.5px solid #F3F4F6", borderRadius: 18, padding: "44px 36px", textAlign: "center" },
  ctaTitle: { fontSize: 27, fontWeight: 800, color: "#111827", marginBottom: 8, letterSpacing: "-0.02em" },
  ctaSub: { fontSize: 17, color: "#6B7280", marginBottom: 24 },
  ctaBtns: { display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" },
  ctaBtn: { display: "inline-block", background: "#111827", color: "#fff", fontWeight: 700, fontSize: 17, padding: "12px 22px", borderRadius: 10, textDecoration: "none" },
  ctaBtnGhost: { display: "inline-block", background: "#fff", color: "#374151", fontWeight: 600, fontSize: 17, padding: "12px 22px", borderRadius: 10, textDecoration: "none", border: "1.5px solid #E5E7EB" },

  footer: { borderTop: "1px solid #F3F4F6", padding: "24px 48px", textAlign: "center", fontSize: 16, color: "#9CA3AF" },
};

export default S;
