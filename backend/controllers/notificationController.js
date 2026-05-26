const notifService = require("../services/notificationService");

// récupère les notifications de l'utilisateur connecté
async function getMesNotifications(req, res) {
  try {
    const userId = req.user.id;
    const notifs = await notifService.getParUtilisateur(userId);
    const nonLues = await notifService.compterNonLues(userId);
    res.json({ notifications: notifs, non_lues: nonLues });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// marque une notification comme lue
async function marquerLue(req, res) {
  try {
    const notif = await notifService.marquerLue(req.params.id, req.user.id);
    if (!notif) return res.status(404).json({ message: "Notification introuvable" });
    res.json({ message: "Notification marquée comme lue", notification: notif });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// marque toutes les notifications comme lues
async function marquerToutesLues(req, res) {
  try {
    await notifService.marquerToutesLues(req.user.id);
    res.json({ message: "Toutes les notifications sont marquées comme lues" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// supprime une notification
async function supprimer(req, res) {
  try {
    const notif = await notifService.supprimer(req.params.id, req.user.id);
    if (!notif) return res.status(404).json({ message: "Notification introuvable" });
    res.json({ message: "Notification supprimée" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = { getMesNotifications, marquerLue, marquerToutesLues, supprimer };
