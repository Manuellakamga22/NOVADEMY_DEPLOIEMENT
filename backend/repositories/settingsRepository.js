const db = require("../db");

// Récupérer tous les paramètres
exports.getAll = async () => {
  const [rows] = await db.query("SELECT `key`, `value` FROM settings");
  // Retourne un objet { key: value }
  return rows.reduce((acc, row) => {
    acc[row.key] = row.value;
    return acc;
  }, {});
};

// Mettre à jour un paramètre
exports.set = async (key, value) => {
  const [result] = await db.query(
    `INSERT INTO settings (\`key\`, \`value\`) VALUES (?, ?)
     ON DUPLICATE KEY UPDATE \`value\` = ?`,
    [key, value, value]
  );
  return result;
};

// Mettre à jour plusieurs paramètres en une fois
exports.setMany = async (params) => {
  // params = { key: value, ... }
  for (const [key, value] of Object.entries(params)) {
    await exports.set(key, value);
  }
};