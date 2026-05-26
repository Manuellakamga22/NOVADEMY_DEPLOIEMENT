const repo = require("../repositories/notificationRepository");

async function getParUtilisateur(userId) {
  const notifications = await repo.getParUtilisateur(userId);
  const non_lues = await repo.compterNonLues(userId);
  return { notifications, non_lues };
}

async function marquerLue(notifId, userId) {
  return await repo.marquerLue(notifId, userId);
}

async function marquerToutesLues(userId) {
  return await repo.marquerToutesLues(userId);
}

async function supprimer(notifId, userId) {
  return await repo.supprimer(notifId, userId);
}

// quand un élève envoie une demande de cours d'essai
async function nouvelleDemande({ teacher_id, student_nom, trial_id }) {
  return await repo.creer({
    user_id: teacher_id,
    type: "nouvelle_demande",
    titre: "Nouvelle demande de cours",
    message: `${student_nom} vous demande un cours d'essai.`,
    data: { trial_id },
    lien: "/teacher/requests",
  });
}

// quand le prof accepte la demande
async function demandeAcceptee({ student_id, teacher_nom, trial_id }) {
  return await repo.creer({
    user_id: student_id,
    type: "demande_acceptee",
    titre: "Demande acceptée !",
    message: `${teacher_nom} a accepté votre demande de cours d'essai.`,
    data: { trial_id },
    lien: "/student/requests",
  });
}

// quand le prof refuse la demande
async function demandeRefusee({ student_id, teacher_nom, trial_id }) {
  return await repo.creer({
    user_id: student_id,
    type: "demande_refusee",
    titre: "Demande refusée",
    message: `${teacher_nom} n'est pas disponible pour ce créneau.`,
    data: { trial_id },
    lien: "/student/requests",
  });
}

// nouveau message reçu
async function nouveauMessage({ user_id, expediteur_nom, conversation_id }) {
  return await repo.creer({
    user_id,
    type: "nouveau_message",
    titre: "Nouveau message",
    message: `${expediteur_nom} vous a envoyé un message.`,
    data: { conversation_id },
    lien: "/chat",
  });
}

// paiement reçu côté prof
async function paiementRecu({ teacher_id, student_nom, montant }) {
  return await repo.creer({
    user_id: teacher_id,
    type: "paiement_recu",
    titre: "Paiement reçu",
    message: `${student_nom} a payé ${montant} €.`,
    data: { montant },
    lien: "/teacher/revenue",
  });
}

// quand le prof propose une formule
async function formuleProposee({ student_id, teacher_nom, formula_label }) {
  return await repo.creer({
    user_id: student_id,
    type: "formule_proposee",
    titre: "Nouvelle formule proposée",
    message: `${teacher_nom} vous propose : ${formula_label}.`,
    data: { formula_label },
    lien: "/student/courses",
  });
}

module.exports = {
  getParUtilisateur,
  marquerLue,
  marquerToutesLues,
  supprimer,
  nouvelleDemande,
  demandeAcceptee,
  demandeRefusee,
  nouveauMessage,
  paiementRecu,
  formuleProposee,
};
