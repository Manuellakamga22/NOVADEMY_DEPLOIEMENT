const db = require("../db");

exports.findTeacherAnnouncementBySubject = async (teacherId, subject) => {
  const [rows] = await db.query(
    `
      SELECT id
      FROM announcements
      WHERE teacher_id = ? AND subject = ?
      LIMIT 1
    `,
    [teacherId, subject]
  );

  return rows[0] || null;
};

exports.createAnnouncement = async ({
  teacher_id,
  subject,
  level,
  city,
  mode,
  title,
  description,
  methodology,
  student_rate,
  teacher_rate,
}) => {
  const [result] = await db.query(
    `
      INSERT INTO announcements
      (
        teacher_id,
        subject,
        level,
        city,
        mode,
        title,
        description,
        methodology,
        student_rate,
        teacher_rate,
        status
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'active')
    `,
    [
      teacher_id,
      subject,
      level,
      city,
      mode,
      title,
      description,
      methodology,
      student_rate,
      teacher_rate,
    ]
  );

  return result;
};

exports.getActiveAnnouncements = async ({ subject, city, mode }) => {
  let sql = `
    SELECT
      a.*,
      u.nom,
      u.prenom
    FROM announcements a
    INNER JOIN users u ON a.teacher_id = u.id
    WHERE a.status = 'active'
  `;

  const params = [];

  if (subject) {
    sql += " AND a.subject = ?";
    params.push(subject);
  }

  if (city) {
    sql += " AND a.city = ?";
    params.push(city);
  }

  if (mode) {
    sql += " AND a.mode = ?";
    params.push(mode);
  }

  sql += " ORDER BY a.created_at DESC";

  const [rows] = await db.query(sql, params);
  return rows;
};

exports.getAnnouncementById = async (id) => {
  const [rows] = await db.query(
    `
      SELECT a.*, u.nom, u.prenom, u.email
      FROM announcements a
      INNER JOIN users u ON a.teacher_id = u.id
      WHERE a.id = ?
      LIMIT 1
    `,
    [id]
  );

  return rows[0] || null;
};

exports.getTeacherAnnouncements = async (teacherId) => {
  const [rows] = await db.query(
    `
      SELECT *
      FROM announcements
      WHERE teacher_id = ?
      ORDER BY created_at DESC
    `,
    [teacherId]
  );

  return rows;
};