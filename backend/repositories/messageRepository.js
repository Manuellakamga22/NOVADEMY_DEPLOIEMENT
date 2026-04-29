const db = require("../db");

// je récupère tous les messages entre deux users
exports.getMessagesBetweenUsers = async (senderId, receiverId) => {
  const [rows] = await db.query(
    `SELECT *
     FROM messages
     WHERE (sender_id = ? AND receiver_id = ?)
        OR (sender_id = ? AND receiver_id = ?)
     ORDER BY created_at ASC`,
    [senderId, receiverId, receiverId, senderId]
  );
  return rows;
};

// je crée un message en gérant automatiquement la conversation
exports.createMessage = async ({
  sender_id,
  receiver_id,
  content,
  blocked_content_detected
}) => {
  // je cherche si une conversation existe déjà entre ces deux users
  const [convRows] = await db.query(
    `SELECT id FROM conversations
     WHERE (teacher_id = ? AND student_id = ?)
        OR (teacher_id = ? AND student_id = ?)
     LIMIT 1`,
    [sender_id, receiver_id, receiver_id, sender_id]
  );

  let conversation_id;

  if (convRows.length > 0) {
    // j'utilise la conversation existante
    conversation_id = convRows[0].id;
  } else {
    // je cherche l'announcement_id depuis un trial accepté entre ces deux users
    const [trialRows] = await db.query(
      `SELECT announcement_id FROM trial_requests
       WHERE ((student_id = ? AND teacher_id = ?) OR (student_id = ? AND teacher_id = ?))
       AND status = 'accepted'
       LIMIT 1`,
      [sender_id, receiver_id, receiver_id, sender_id]
    );

    const announcement_id = trialRows.length > 0 ? trialRows[0].announcement_id : 1;

    // je détermine qui est prof et qui est élève
    const [userRows] = await db.query(
      `SELECT id, role FROM users WHERE id IN (?, ?)`,
      [sender_id, receiver_id]
    );

    const teacher = userRows.find(u => u.role === "teacher");
    const student = userRows.find(u => u.role === "student");
    const teacher_id = teacher ? teacher.id : sender_id;
    const student_id = student ? student.id : receiver_id;

    // je crée la conversation
    const [newConv] = await db.query(
      `INSERT INTO conversations (teacher_id, student_id, announcement_id)
       VALUES (?, ?, ?)`,
      [teacher_id, student_id, announcement_id]
    );
    conversation_id = newConv.insertId;
  }

  // j'insère le message avec le bon conversation_id
  const [result] = await db.query(
    `INSERT INTO messages
     (conversation_id, sender_id, receiver_id, content, blocked_content_detected)
     VALUES (?, ?, ?, ?, ?)`,
    [conversation_id, sender_id, receiver_id, content, blocked_content_detected]
  );

  return result;
};