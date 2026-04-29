const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const teacherProfileController = require("../controllers/TeacherProfileController");
const { verifyToken } = require("../middleware/authMiddleware");

// Config multer — stockage dans backend/uploads/photos/
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads/photos"));
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `teacher_${req.params.userId}_${Date.now()}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 Mo max
  fileFilter: (req, file, cb) => {
    const allowed = ["image/jpeg", "image/png", "image/webp"];

    if (allowed.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Format non autorisé. Utilisez JPG, PNG ou WebP."));
    }
  },
});

// Lire le profil
router.get("/:userId", verifyToken, teacherProfileController.getTeacherProfile);

// Sauvegarder le profil
router.post("/", verifyToken, teacherProfileController.saveTeacherProfile);

// Upload photo
router.post(
  "/photo/:userId",
  verifyToken,
  upload.single("photo"),
  teacherProfileController.uploadPhoto
);

module.exports = router;