const mongoose = require("mongoose");

// schéma Mongoose directement dans le repository
// comme ça on garde la même logique que les autres repositories du projet
const notificationSchema = new mongoose.Schema(
  {
    user_id: { type: Number, required: true },
    type: {
      type: String,
      enum: [
        "nouvelle_demande",
        "demande_acceptee",
        "demande_refusee",
        "nouveau_message",
        "paiement_recu",
        "formule_proposee",
        "cours_annule",
      ],
      required: true,
    },
    titre:   { type: String, required: true },
    message: { type: String, required: true },
    // données variables selon le type — c'est l'avantage de MongoDB ici
    data:    { type: mongoose.Schema.Types.Mixed, default: {} },
    lien:    { type: String, default: null },
    lue:     { type: Boolean, default: false },
  },
  { timestamps: true }
);

notificationSchema.index({ user_id: 1, createdAt: -1 });
notificationSchema.index({ user_id: 1, lue: 1 });

const Notification = mongoose.model("Notification", notificationSchema);

// crée une nouvelle notification
exports.creer = async (data) => {
  const notif = new Notification(data);
  return await notif.save();
};

// récupère les 30 dernières notifications d'un utilisateur
exports.getParUtilisateur = async (userId) => {
  return await Notification.find({ user_id: Number(userId) })
    .sort({ createdAt: -1 })
    .limit(30);
};

// compte les non lues
exports.compterNonLues = async (userId) => {
  return await Notification.countDocuments({
    user_id: Number(userId),
    lue: false,
  });
};

// marque une notification comme lue
exports.marquerLue = async (notifId, userId) => {
  return await Notification.findOneAndUpdate(
    { _id: notifId, user_id: Number(userId) },
    { lue: true },
    { new: true }
  );
};

// marque toutes les notifications d'un user comme lues
exports.marquerToutesLues = async (userId) => {
  return await Notification.updateMany(
    { user_id: Number(userId), lue: false },
    { lue: true }
  );
};

// supprime une notification
exports.supprimer = async (notifId, userId) => {
  return await Notification.findOneAndDelete({
    _id: notifId,
    user_id: Number(userId),
  });
};
