require("dotenv").config();
const bcrypt = require("bcrypt");
const db = require("./db");

async function seedAdmin() {
  try {
    const nom = "Admin";
    const prenom = "NOVADEMY";
    const email = "admin@novademy.com";
    const plainPassword = "Admin123";

    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    const sql = `
      INSERT INTO users (nom, prenom, email, password, role)
      VALUES (?, ?, ?, ?, ?)
    `;

    db.query(
      sql,
      [nom, prenom, email, hashedPassword, "admin"],
      (err, result) => {
        if (err) {
          console.error("Erreur insertion admin :", err.message);
        } else {
          console.log("Admin créé avec succès. ID :", result.insertId);
          console.log("Email :", email);
          console.log("Mot de passe :", plainPassword);
        }
        db.end();
      }
    );
  } catch (error) {
    console.error("Erreur :", error.message);
    db.end();
  }
}

seedAdmin();

