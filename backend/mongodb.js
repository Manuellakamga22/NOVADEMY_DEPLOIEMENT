const mongoose = require("mongoose");

// connexion à MongoDB — séparée de MySQL
// on appelle cette fonction au démarrage du serveur
async function connectMongo() {
  const uri = process.env.MONGO_URI || "mongodb://localhost:27017/novademy";

  try {
    await mongoose.connect(uri);
    console.log("MongoDB connecté");
  } catch (err) {
    // MongoDB est optionnel — si pas dispo on continue sans les notifications
    console.error("MongoDB non disponible :", err.message);
  }
}

module.exports = connectMongo;
