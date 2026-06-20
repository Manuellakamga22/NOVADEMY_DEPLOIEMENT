const express = require("express");
const db      = require("../db");
const router  = express.Router();

// liste des profs
router.get("/", async (req, res) => {
  try {
    const [results] = await db.query(
      "SELECT id, nom, prenom, email, role FROM users WHERE role = 'teacher'"
    );
    res.json(results);
  } catch (err) {
    return res.status(500).json({ message: "Erreur serveur." });
  }
});

module.exports = router;