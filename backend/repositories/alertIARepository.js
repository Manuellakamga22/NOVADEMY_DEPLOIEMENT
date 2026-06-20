const mongoose = require("mongoose");

const alertIASchema = new mongoose.Schema(
  {
    sender_id:      { type: Number, required: true },
    sender_prenom:  { type: String, default: "" },
    sender_nom:     { type: String, default: "" },
    sender_role:    { type: String, default: "" },
    receiver_id:    { type: Number, required: true },
    receiver_prenom: { type: String, default: "" },
    receiver_nom:   { type: String, default: "" },
    contenu_original: { type: String, required: true },
    type_detection: { type: String, enum: ["email", "telephone", "mixte"], default: "mixte" },
  },
  { timestamps: true }
);

alertIASchema.index({ createdAt: -1 });
alertIASchema.index({ sender_id: 1 });

const AlertIA = mongoose.model("AlertIA", alertIASchema);

exports.creer = async (data) => {
  const alert = new AlertIA(data);
  return await alert.save();
};

exports.getToutes = async () => {
  return await AlertIA.find().sort({ createdAt: -1 }).limit(200);
};

exports.compter = async () => {
  return await AlertIA.countDocuments();
};
