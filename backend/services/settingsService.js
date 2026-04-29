const settingsRepository = require("../repositories/settingsRepository");

const ALLOWED_KEYS = [
  "commission_debutant",
  "commission_intermediaire",
  "commission_avance",
  "commission_expert",
  "seuil_classe_collective",
];

exports.getAll = async () => {
  return await settingsRepository.getAll();
};

exports.updateMany = async (params) => {
  // Filtrer uniquement les clés autorisées
  const filtered = {};
  for (const [key, value] of Object.entries(params)) {
    if (!ALLOWED_KEYS.includes(key)) {
      throw { status: 400, message: `Clé non autorisée : ${key}` };
    }
    const num = Number(value);
    if (isNaN(num) || num < 0) {
      throw { status: 400, message: `Valeur invalide pour ${key}` };
    }
    filtered[key] = String(num);
  }

  await settingsRepository.setMany(filtered);
  return { message: "Paramètres mis à jour avec succès" };
};