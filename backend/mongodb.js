const mongoose = require("mongoose");

// connexion à MongoDB — séparée de MySQL
// appelle cette fonction au démarrage du serveur
async function connectMongo() {
  const uri = process.env.MONGO_URI ||
  "mongodb://mongodb:27017/novademy_deploiement";
  mongoose.connection.on("error", (err) => {
    console.error("Erreur MongoDB :", err.message);
  });

  mongoose.connection.on("disconnected", () => {
    console.warn("MongoDB déconnecté — les notifications seront désactivées.");
  });

  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 3000,
      connectTimeoutMS: 3000,
    });
    console.log("MongoDB connecté :", uri);
  } catch (err) {
    console.warn("MongoDB non disponible — les notifications seront désactivées.");
  }
}

module.exports = connectMongo;
