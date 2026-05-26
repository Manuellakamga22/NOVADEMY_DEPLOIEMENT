const mongoose = require("mongoose");
const connectMongo = require("./mongodb");
const notificationRoutes = require("./routes/notificationRoutes");
const announcementRoutes = require("./routes/announcementRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const packRoutes = require("./routes/packRoutes");
const messageRoutes = require("./routes/messageRoutes");
const studentProfileRoutes = require("./routes/StudentProfileRoutes");
const authRoutes = require("./routes/authRoutes");
const teacherRoutes = require("./routes/teacherRoutes");
const studentRoutes = require("./routes/studentRoutes");
const trialRoutes = require("./routes/trialRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const teacherPlanningRoutes = require("./routes/teacherPlanningRoutes");
const teacherProfileRoutes = require("./routes/TeacherProfileRoutes");
const studentPlanningRoutes = require("./routes/studentPlanningRoutes");
const groupClassRoutes = require("./routes/groupClassRoutes");
const settingsRoutes = require("./routes/settingsRoutes");


const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5001;

/*
|--------------------------------------------------------------------------
| Middlewares de sécurité
|--------------------------------------------------------------------------
*/

// Headers HTTP sécurisés
app.use(helmet());

// Limitation globale des requêtes
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 200,
  message: { message: "Trop de requêtes, réessayez plus tard." },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(globalLimiter);

// Limitation spécifique routes sensibles auth
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 100,
  message: { message: "Trop de tentatives, réessayez plus tard." },
  standardHeaders: true,
  legacyHeaders: false,
});

// CORS contrôlé
const allowedOrigins = [
  "http://localhost",
  "http://localhost:80",
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:5175",
  "http://localhost:3000",
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      // autorise Postman / navigateur direct / requêtes sans origin
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Origine non autorisée par CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Servir les fichiers uploadés (photos de profil)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Limite taille JSON
app.use(express.json({ limit: "10kb" }));

/*
|--------------------------------------------------------------------------
| Route test
|--------------------------------------------------------------------------
*/

app.get("/", (req, res) => {
  res.json({ message: "API NOVADEMY en ligne" });
});

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
*/

app.use("/api/auth", authLimiter, authRoutes);
app.use("/api/announcements", announcementRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/packs", packRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/teachers", teacherRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/trials", trialRoutes);
app.use("/api/student-profile", studentProfileRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/teacher-planning", teacherPlanningRoutes);
app.use("/api/teacher-profile", teacherProfileRoutes);
app.use("/api/student-planning", studentPlanningRoutes);
app.use("/api/group-classes", groupClassRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api/notifications", notificationRoutes);

/*
|--------------------------------------------------------------------------
| Gestion 404
|--------------------------------------------------------------------------
*/

app.use((req, res) => {
  res.status(404).json({ message: "Route introuvable" });
});

/*
|--------------------------------------------------------------------------
| Gestion centralisée des erreurs
|--------------------------------------------------------------------------
*/

app.use((err, req, res, next) => {
  console.error("Erreur serveur :", err.message);

  if (err.message === "Origine non autorisée par CORS") {
    return res.status(403).json({ message: err.message });
  }

  res.status(err.status || 500).json({
    message: err.message || "Erreur interne du serveur",
  });
});

/*
|--------------------------------------------------------------------------
| Lancement serveur
|--------------------------------------------------------------------------
*/

app.listen(PORT, () => {
  console.log(`Serveur backend démarré sur http://localhost:${PORT}`);
});

// connexion MongoDB pour les notifications
connectMongo();