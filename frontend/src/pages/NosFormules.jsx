import React, { useState } from "react";

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

const FORMULES = [
  {
    icon: "📅", iconStyle: S.cardIconBlue,
    title: "Suivi régulier", price: "Dès 15 €/h",
    priceSub: "par séance · engagement mensuel",
    desc: "Un accompagnement hebdomadaire structuré avec le même professeur. Idéal pour progresser sur la durée.",
    features: ["1 à 3 séances par semaine", "Suivi de progression personnalisé", "Correction de devoirs", "Planning fixe", "Bilan mensuel"],
    popular: true, btnStyle: S.btnDark,
  },
  {
    icon: "📦", iconStyle: S.cardIconGray,
    title: "Pack d'heures", price: "Dès 18 €/h",
    priceSub: "par séance · sans engagement",
    desc: "Des heures à utiliser librement. Parfait pour les révisions ponctuelles ou les périodes d'examens.",
    features: ["Pack 5, 10 ou 20 heures", "Aucun engagement", "Flexible sur les dates", "Valable 3 mois", "Idéal révisions"],
    popular: false, btnStyle: S.btnLight,
  },
  {
    icon: "🖥️", iconStyle: S.cardIconGreen,
    title: "Classe virtuelle", price: "Dès 8 €/h",
    priceSub: "par élève · groupe de 3 à 8",
    desc: "Apprenez en petit groupe avec un professeur qualifié. La formule la plus accessible de la plateforme.",
    features: ["Groupe de 3 à 8 élèves", "Session hebdomadaire visio", "Interactivité et entraide", "Support de cours fourni", "Budget accessible"],
    popular: false, btnStyle: S.btnLight,
  },
];

const FAQS = [
  { q: "Comment choisir entre suivi régulier et pack d'heures ?", a: "Le suivi régulier est idéal pour progresser sur le long terme. Le pack convient aux révisions ponctuelles ou si votre emploi du temps est variable." },
  { q: "Peut-on changer de formule en cours de route ?", a: "Oui. Après avoir terminé votre formule, vous pouvez en choisir une autre avec le même professeur ou en trouver un nouveau." },
  { q: "Comment se déroule le cours d'essai ?", a: "Avant toute formule, un cours d'essai est proposé. Il permet à l'élève et au professeur de se rencontrer et valider la compatibilité." },
  { q: "La plateforme prend-elle une commission ?", a: "NOVADEMY prend une commission sur les revenus des professeurs (3 % à 15 % selon leur niveau). Les élèves paient le tarif affiché." },
  { q: "Les tarifs affichés sont-ils les tarifs finaux ?", a: "Les tarifs sont indicatifs. Chaque professeur fixe son propre tarif, visible sur son profil et dans l'annonce." },
];

// Redirige vers login si pas connecté, sinon vers la page cible
function handleAction(e, target) {
  e.preventDefault();
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = `/register?redirect=${encodeURIComponent(target)}`;
  } else {
    window.location.href = target;
  }
}

function NosFormules() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div style={S.wrap}>
      <nav style={S.nav}>
        <a href="/" style={S.navLogo}>NOVA<span style={S.navLogoEm}>DEMY</span></a>
        <div style={S.navLinks}>
          <a style={S.navLink} href="/nos-formules">Nos formules</a>
          <a style={S.navLink} href="/aide">Aide</a>
          <a style={S.navBtnOutline} href="/login">Connexion</a>
          <a style={S.navBtn} href="/register">Inscription</a>
        </div>
      </nav>

      <div style={S.hero}>
        <div style={S.heroBadge}>✦ 3 formules disponibles</div>
        <div style={S.heroTitle}>
          Des formules pour<br /><span style={S.heroTitleEm}>chaque élève</span>
        </div>
        <div style={S.heroSub}>
          Suivi individuel, pack flexible ou classe virtuelle en groupe — commencez toujours par un cours d'essai gratuit.
        </div>
        <div style={S.heroBtns}>
          <a style={{ ...S.heroBtn, ...S.heroBtnPrimary }}
            href="/search" onClick={e => handleAction(e, "/search")}>
            Trouver un professeur
          </a>
          <a style={{ ...S.heroBtn, ...S.heroBtnGhost }} href="/aide">
            En savoir plus
          </a>
        </div>
      </div>

      <div style={S.divider} />

      <div style={S.main}>
        <div style={S.label}>Les formules</div>
        <div style={S.sectionTitle}>Choisissez ce qui vous convient</div>
        <div style={S.sectionSub}>Toutes les formules débutent par un cours d'essai pour valider la compatibilité avec votre professeur.</div>

        <div style={S.grid3}>
          {FORMULES.map((f) => (
            <div key={f.title} style={f.popular ? S.cardPop : S.card}>
              {f.popular && <div style={S.popTag}>Le plus choisi</div>}
              <div style={{ ...S.cardIcon, ...f.iconStyle }}>{f.icon}</div>
              <div style={S.cardTitle}>{f.title}</div>
              <div style={S.cardPrice}>{f.price}</div>
              <div style={S.cardPriceSub}>{f.priceSub}</div>
              <div style={S.cardDesc}>{f.desc}</div>
              <ul style={S.featureList}>
                {f.features.map(feat => (
                  <li key={feat} style={S.featureItem}>
                    <span style={S.check}>✓</span> {feat}
                  </li>
                ))}
              </ul>
              <a href="/search" style={{ ...S.btn, ...f.btnStyle }}
                onClick={e => handleAction(e, "/search")}>
                Commencer
              </a>
            </div>
          ))}
        </div>

        <div style={S.label}>Comparaison</div>
        <div style={S.sectionTitle}>Tout en un coup d'œil</div>
        <div style={S.sectionSub}>Comparez les formules pour choisir celle qui correspond à vos besoins.</div>

        <div style={S.tableWrap}>
          <table style={S.table}>
            <thead>
              <tr>
                <th style={S.th}>Critère</th>
                <th style={S.th}>Suivi régulier</th>
                <th style={S.th}>Pack d'heures</th>
                <th style={S.th}>Classe virtuelle</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Prix indicatif", "Dès 15 €/h", "Dès 18 €/h", "Dès 8 €/h"],
                ["Engagement", "Mensuel", "Aucun", "Par session"],
                ["Format", "Individuel", "Individuel", "Groupe 3-8"],
                ["Flexibilité", "Fixe", "Très flexible", "Hebdomadaire"],
                ["Suivi perso", "Oui", "Partiel", "Non"],
                ["Cours d'essai", "Oui", "Oui", "Non"],
                ["Idéal pour", "Progression longue durée", "Révisions ciblées", "Petit budget"],
              ].map(([crit, a, b, c]) => (
                <tr key={crit}>
                  <td style={S.tdBold}>{crit}</td>
                  <td style={S.td}>{a}</td>
                  <td style={S.td}>{b}</td>
                  <td style={S.td}>{c}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={S.label}>FAQ</div>
        <div style={S.sectionTitle}>Questions fréquentes</div>
        <div style={{ marginBottom: 60 }}>
          {FAQS.map((faq, i) => (
            <div key={i} style={S.faqItem}>
              <div style={S.faqQ} onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                {faq.q}
                <span style={S.faqChevron}>{openFaq === i ? "▲" : "▼"}</span>
              </div>
              {openFaq === i && <div style={S.faqA}>{faq.a}</div>}
            </div>
          ))}
        </div>

        <div style={S.cta}>
          <div style={S.ctaTitle}>Prêt à commencer ?</div>
          <div style={S.ctaSub}>Votre premier cours d'essai vous attend. Inscription gratuite, sans engagement.</div>
          <div style={S.ctaBtns}>
            <a href="/register" style={S.ctaBtn}>Créer un compte</a>
            <a href="/search" style={S.ctaBtnGhost}
              onClick={e => handleAction(e, "/search")}>
              Voir les professeurs
            </a>
          </div>
        </div>
      </div>

      <div style={S.footer}>© 2025 NOVADEMY · <a href="/aide" style={{ color: "#9CA3AF" }}>Aide</a> · <a href="/nos-formules" style={{ color: "#9CA3AF" }}>Nos formules</a></div>
    </div>
  );
}

export default NosFormules;