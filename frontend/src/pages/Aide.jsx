import React, { useState } from "react";

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

const CATEGORIES = [
  { icon: "🎓", title: "Je suis élève", desc: "Trouver un prof, faire une demande d'essai, gérer mes cours." },
  { icon: "👩‍🏫", title: "Je suis professeur", desc: "Créer mon profil, publier une annonce, gérer mes revenus." },
  { icon: "💳", title: "Paiements & tarifs", desc: "Comprendre les formules et le système de paiement." },
  { icon: "💬", title: "Chat & messages", desc: "Comment fonctionne la messagerie de la plateforme." },
  { icon: "⚙️", title: "Mon compte", desc: "Modifier mon profil, mot de passe, paramètres." },
  { icon: "🛡️", title: "Sécurité", desc: "Signaler un comportement, règles de la plateforme." },
];

const FAQS_ELEVE = [
  { q: "Comment trouver un professeur ?", a: "Allez dans Recherche, filtrez par matière, niveau et ville, puis cliquez sur une annonce pour voir le profil complet." },
  { q: "Comment demander un cours d'essai ?", a: "Sur la page d'une annonce, cliquez sur 'Demander un cours d'essai', choisissez un créneau et envoyez votre demande." },
  { q: "Comment accepter une formule ?", a: "Après le cours d'essai, le professeur vous propose une formule. Retrouvez-la dans 'Formules' pour l'accepter." },
  { q: "Comment payer ?", a: "Après avoir accepté une formule, allez dans 'Paiement' pour valider. Le cours débute après confirmation." },
];

const FAQS_PROF = [
  { q: "Comment créer mon profil professeur ?", a: "Dans votre tableau de bord, allez dans 'Mon profil' et remplissez vos informations. Plus votre profil est complet, moins vous payez de commission." },
  { q: "Comment publier une annonce ?", a: "Depuis votre tableau de bord, allez dans 'Annonces' puis 'Nouvelle annonce'. Renseignez matière, niveau, tarif et description." },
  { q: "Comment fonctionne la commission ?", a: "NOVADEMY prend une commission de 3% (expert) à 15% (débutant). Plus votre profil est complet, plus la commission est avantageuse." },
  { q: "Comment proposer une formule à un élève ?", a: "Après le cours d'essai, allez dans 'Formules' pour proposer un suivi, un pack ou une classe virtuelle à l'élève." },
];

function Aide() {
  const [openE, setOpenE] = useState(null);
  const [openP, setOpenP] = useState(null);

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
        <div style={S.heroBadge}>✦ Centre d'aide</div>
        <div style={S.heroTitle}>Comment pouvons-nous vous aider ?</div>
        <div style={S.heroSub}>Trouvez rapidement des réponses à vos questions sur la plateforme NOVADEMY.</div>
      </div>

      <div style={S.divider} />

      <div style={S.main}>

        <div style={S.label}>Catégories</div>
        <div style={S.sectionTitle}>Parcourir par thème</div>
        <div style={{ ...S.sectionSub, marginBottom: 24 }}>Sélectionnez votre profil pour trouver les réponses adaptées.</div>
        <div style={S.catGrid}>
          {CATEGORIES.map(c => (
            <div key={c.title} style={S.catCard}>
              <div style={S.catIcon}>{c.icon}</div>
              <div style={S.catTitle}>{c.title}</div>
              <div style={S.catDesc}>{c.desc}</div>
            </div>
          ))}
        </div>

        <div style={S.label}>Guides</div>
        <div style={S.sectionTitle}>Démarrer pas à pas</div>
        <div style={S.sectionSub}>Les étapes essentielles pour bien commencer sur NOVADEMY.</div>
        <div style={S.stepsGrid}>
          <div style={S.stepCard}>
            <div style={S.stepCardTitle}>🎓 Démarrer en tant qu'élève</div>
            {["Créer un compte sur /register", "Compléter votre profil élève", "Rechercher un professeur via /search", "Envoyer une demande de cours d'essai", "Accepter la formule et payer"].map((t, i) => (
              <div key={i} style={S.step}>
                <div style={S.stepNum}>{i + 1}</div>
                <div style={S.stepText}>{t}</div>
              </div>
            ))}
          </div>
          <div style={S.stepCard}>
            <div style={S.stepCardTitle}>👩‍🏫 Démarrer en tant que professeur</div>
            {["Créer un compte sur /register", "Compléter votre profil professeur", "Publier une annonce dans le tableau de bord", "Ajouter des créneaux dans votre planning", "Accepter les demandes et proposer des formules"].map((t, i) => (
              <div key={i} style={S.step}>
                <div style={S.stepNum}>{i + 1}</div>
                <div style={S.stepText}>{t}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={S.label}>FAQ Élèves</div>
        <div style={S.sectionTitle}>Questions fréquentes — Élèves</div>
        <div style={S.faqSection}>
          {FAQS_ELEVE.map((faq, i) => (
            <div key={i} style={S.faqItem}>
              <div style={S.faqQ} onClick={() => setOpenE(openE === i ? null : i)}>
                {faq.q} <span style={S.faqChevron}>{openE === i ? "▲" : "▼"}</span>
              </div>
              {openE === i && <div style={S.faqA}>{faq.a}</div>}
            </div>
          ))}
        </div>

        <div style={S.label}>FAQ Professeurs</div>
        <div style={S.sectionTitle}>Questions fréquentes — Professeurs</div>
        <div style={S.faqSection}>
          {FAQS_PROF.map((faq, i) => (
            <div key={i} style={S.faqItem}>
              <div style={S.faqQ} onClick={() => setOpenP(openP === i ? null : i)}>
                {faq.q} <span style={S.faqChevron}>{openP === i ? "▲" : "▼"}</span>
              </div>
              {openP === i && <div style={S.faqA}>{faq.a}</div>}
            </div>
          ))}
        </div>

        <div style={S.label}>Contact</div>
        <div style={S.sectionTitle}>Nous contacter</div>
        <div style={S.sectionSub}>Vous n'avez pas trouvé votre réponse ?</div>
        <div style={S.contactGrid}>
          {[
            { icon: "📧", title: "Email", text: "support@novademy.fr\nRéponse sous 24h ouvrées" },
            { icon: "💬", title: "Chat en ligne", text: "Disponible depuis votre tableau de bord\nLun–Ven · 9h–18h" },
            { icon: "📖", title: "Documentation", text: "Guides complets disponibles\ndans ce centre d'aide" },
            { icon: "🛡️", title: "Signalement", text: "signalement@novademy.fr\nTraitement prioritaire" },
          ].map(c => (
            <div key={c.title} style={S.contactCard}>
              <div style={S.contactIcon}>{c.icon}</div>
              <div>
                <div style={S.contactTitle}>{c.title}</div>
                <div style={S.contactText}>{c.text}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={S.cta}>
          <div style={S.ctaTitle}>Pas encore inscrit ?</div>
          <div style={S.ctaSub}>Rejoignez NOVADEMY et commencez avec un cours d'essai.</div>
          <div style={S.ctaBtns}>
            <a href="/register" style={S.ctaBtn}>Créer un compte</a>
            <a href="/nos-formules" style={S.ctaBtnGhost}>Voir les formules</a>
          </div>
        </div>
      </div>

      <div style={S.footer}>© 2025 NOVADEMY · <a href="/aide" style={{ color: "#9CA3AF" }}>Aide</a> · <a href="/nos-formules" style={{ color: "#9CA3AF" }}>Nos formules</a></div>
    </div>
  );
}

export default Aide;