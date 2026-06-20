const mongoose = require("mongoose");

// un document par session collective — suit les invitations et l'historique
const collectiveInvitationSchema = new mongoose.Schema(
  {
    session_code:        { type: String, required: true, unique: true },
    group_class_id:      { type: Number, required: true },
    teacher_id:          { type: Number, required: true },
    created_by_student:  { type: Number, required: true },
    subject:             { type: String, default: "" },
    level:               { type: String, default: "" },
    min_students:        { type: Number, default: 2 },
    max_students:        { type: Number, default: 4 },

    // liste des élèves qui ont rejoint
    participants: [
      {
        student_id: { type: Number, required: true },
        rejoint_le: { type: Date, default: Date.now },
        statut:     { type: String, enum: ["inscrit", "confirme", "annule"], default: "inscrit" },
      },
    ],

    // réponse du professeur
    reponse_professeur: {
      type: String,
      enum: ["en_attente", "acceptee", "refusee"],
      default: "en_attente",
    },

    statut_session: {
      type: String,
      enum: ["ouverte", "complete", "validee", "annulee"],
      default: "ouverte",
    },
  },
  { timestamps: true }
);

// session_code a déjà un index via unique: true dans le schéma
collectiveInvitationSchema.index({ group_class_id: 1 });
collectiveInvitationSchema.index({ teacher_id: 1 });
collectiveInvitationSchema.index({ created_by_student: 1 });

const CollectiveInvitation = mongoose.model("CollectiveInvitation", collectiveInvitationSchema);

// crée le document d'invitation au moment de la création de la session
exports.creer = async (data) => {
  const doc = new CollectiveInvitation(data);
  return await doc.save();
};

// ajoute un participant à la liste
exports.ajouterParticipant = async (sessionCode, studentId) => {
  return await CollectiveInvitation.findOneAndUpdate(
    { session_code: sessionCode },
    { $push: { participants: { student_id: studentId } } },
    { new: true }
  );
};

// met à jour la réponse du professeur
exports.mettreAJourReponseProf = async (sessionCode, reponse) => {
  return await CollectiveInvitation.findOneAndUpdate(
    { session_code: sessionCode },
    { reponse_professeur: reponse },
    { new: true }
  );
};

// met à jour le statut général de la session
exports.mettreAJourStatut = async (sessionCode, statut) => {
  return await CollectiveInvitation.findOneAndUpdate(
    { session_code: sessionCode },
    { statut_session: statut },
    { new: true }
  );
};

// met à jour le statut de tous les participants
exports.mettreAJourParticipants = async (sessionCode, statut) => {
  return await CollectiveInvitation.findOneAndUpdate(
    { session_code: sessionCode },
    { $set: { "participants.$[].statut": statut } },
    { new: true }
  );
};

// récupère par code de session
exports.getParCode = async (sessionCode) => {
  return await CollectiveInvitation.findOne({ session_code: sessionCode });
};

// récupère par group_class_id MySQL
exports.getParGroupClassId = async (groupClassId) => {
  return await CollectiveInvitation.findOne({ group_class_id: groupClassId });
};

// invitations créées par un élève
exports.getParEtudiant = async (studentId) => {
  return await CollectiveInvitation.find({ created_by_student: studentId }).sort({ createdAt: -1 });
};

// invitations destinées à un prof
exports.getParProfesseur = async (teacherId) => {
  return await CollectiveInvitation.find({ teacher_id: teacherId }).sort({ createdAt: -1 });
};
