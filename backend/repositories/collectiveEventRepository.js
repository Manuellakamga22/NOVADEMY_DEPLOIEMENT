const mongoose = require("mongoose");

// journal d'événements temps réel pour les sessions collectives
const collectiveEventSchema = new mongoose.Schema(
  {
    group_class_id: { type: Number, required: true },
    session_code:   { type: String, required: true },
    type: {
      type: String,
      enum: [
        "session_creee",
        "eleve_rejoint",
        "session_complete",
        "prof_accepte",
        "prof_refuse",
        "session_validee",
        "session_annulee",
      ],
      required: true,
    },
    // données libres selon le type d'événement
    data: { type: mongoose.Schema.Types.Mixed, default: {} },
  },
  { timestamps: true }
);

collectiveEventSchema.index({ group_class_id: 1, createdAt: -1 });
collectiveEventSchema.index({ session_code: 1 });

const CollectiveEvent = mongoose.model("CollectiveEvent", collectiveEventSchema);

// enregistre un événement
exports.loggerEvenement = async ({ group_class_id, session_code, type, data = {} }) => {
  const event = new CollectiveEvent({ group_class_id, session_code, type, data });
  return await event.save();
};

// récupère l'historique d'une session (chronologique)
exports.getHistoriqueSession = async (groupClassId) => {
  return await CollectiveEvent.find({ group_class_id: groupClassId }).sort({ createdAt: 1 });
};

// récupère les derniers événements d'une session (pour l'affichage temps réel)
exports.getDerniersEvenements = async (sessionCode, limit = 20) => {
  return await CollectiveEvent.find({ session_code: sessionCode })
    .sort({ createdAt: -1 })
    .limit(limit);
};
