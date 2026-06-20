import React, { useState } from "react";

import S from "../styles/pages/NosFormules.styles.js";

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
// redirige vers login si pas connecté, sinon vers la page cible
function handleAction(e, target) {
  e.preventDefault();
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = `/login?redirect=${encodeURIComponent(target)}`;
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
            href="/register/student" onClick={e => handleAction(e, "/register/student")}>
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
              <a href="/login" style={{ ...S.btn, ...f.btnStyle }}
                onClick={e => handleAction(e, "/login")}>
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
                ["Prix indicatif", "Dès 15 €/h", "Dès 18 €/h", "Dès 10 €/h"],
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
            <a href="/login" style={S.ctaBtnGhost}
              onClick={e => handleAction(e, "/login")}>
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