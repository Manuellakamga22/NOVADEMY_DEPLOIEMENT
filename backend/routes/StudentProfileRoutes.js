const express = require("express");
const db      = require("../db");
const multer  = require("multer");
const path    = require("path");
const { verifyToken } = require("../middleware/authMiddleware");

const router = express.Router();

// stockage des photos élèves dans le même dossier que les profs
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads/photos"));
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `student_${req.params.userId}_${Date.now()}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = ["image/jpeg", "image/png", "image/webp"];
    if (allowed.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Format non autorisé. Utilisez JPG, PNG ou WebP."));
    }
  },
});

// GET profil élève par user_id
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const [rows] = await db.query(
      "SELECT * FROM student_profiles WHERE user_id = ? LIMIT 1",
      [userId]
    );

    if (rows.length === 0) {
      return res.json({});
    }

    return res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({
      message: "Erreur chargement profil élève",
    });
  }
});

// CREATE ou UPDATE profil élève
router.post("/", async (req, res) => {
  try {
    const {
      user_id,
      subject_needed,
      level_needed,
      city,
      preferred_mode,
      difficulties,
      objectives,
      frequency,
      availability_notes,
    } = req.body;

    if (!user_id || !subject_needed || !level_needed || !preferred_mode) {
      return res.status(400).json({
        message: "Champs obligatoires manquants",
      });
    }

    const [existingRows] = await db.query(
      "SELECT id FROM student_profiles WHERE user_id = ? LIMIT 1",
      [user_id]
    );

    if (existingRows.length > 0) {
      await db.query(
        `
        UPDATE student_profiles
        SET
          subject_needed = ?,
          level_needed = ?,
          city = ?,
          preferred_mode = ?,
          difficulties = ?,
          objectives = ?,
          frequency = ?,
          availability_notes = ?
        WHERE user_id = ?
        `,
        [
          subject_needed,
          level_needed,
          city || null,
          preferred_mode,
          difficulties || null,
          objectives || null,
          frequency || null,
          availability_notes || null,
          user_id,
        ]
      );

      return res.json({
        message: "Profil élève mis à jour avec succès",
      });
    }

    const [result] = await db.query(
      `
      INSERT INTO student_profiles
      (
        user_id,
        subject_needed,
        level_needed,
        city,
        preferred_mode,
        difficulties,
        objectives,
        frequency,
        availability_notes
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        user_id,
        subject_needed,
        level_needed,
        city || null,
        preferred_mode,
        difficulties || null,
        objectives || null,
        frequency || null,
        availability_notes || null,
      ]
    );

    return res.status(201).json({
      message: "Profil élève enregistré avec succès",
      id: result.insertId,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Erreur enregistrement profil élève",
    });
  }
});

// upload photo profil élève
router.post("/photo/:userId", verifyToken, upload.single("photo"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Aucun fichier reçu" });
    }

    const requestedUserId = Number(req.params.userId);
    const connectedUserId = Number(req.user.id);

    if (requestedUserId !== connectedUserId) {
      return res.status(403).json({ message: "Action non autorisée" });
    }

    const photoUrl = `/uploads/photos/${req.file.filename}`;

    await db.query(
      "UPDATE student_profiles SET photo_url = ? WHERE user_id = ?",
      [photoUrl, requestedUserId]
    );

    return res.json({ message: "Photo enregistrée", photo_url: photoUrl });
  } catch (error) {
    return res.status(500).json({ message: "Erreur lors de l'upload" });
  }
});

module.exports = router;