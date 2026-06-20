import React, { useState } from "react";

import S from "../styles/pages/Aide.styles.js";

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