require("dotenv").config();
const mysql = require("mysql2/promise");

// Création d'un pool de connexions (meilleure pratique)
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,

  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Test de connexion (optionnel mais utile)
(async () => {
  try {
    const connection = await db.getConnection();
    console.log("✅ Connecté à MySQL");
    connection.release();
  } catch (err) {
    console.error("❌ Erreur MySQL :", err.message);
  }
})();

module.exports = db;