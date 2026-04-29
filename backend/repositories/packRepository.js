const db = require("../db");

// je récupère le catalogue des formules
exports.getCatalog = async () => {
  const [rows] = await db.query("SELECT * FROM formulas_catalog");
  return rows;
};

// je propose une formule à un élève
exports.proposeFormula = async ({
  trial_request_id, teacher_id, student_id, announcement_id, teacher_rate, formula_id
}) => {
  const [result] = await db.query(
    `INSERT INTO formula_proposals
     (trial_request_id, teacher_id, student_id, announcement_id, type,
      duration_months, hours_per_week, total_hours, teacher_rate, final_price,
      engagement_required, engagement_months, status)
     SELECT ?, ?, ?, ?, type, duration_months, hours_per_week, total_hours,
            ?, price, engagement_required, engagement_months, 'proposee'
     FROM formulas_catalog WHERE id = ?`,
    [trial_request_id, teacher_id, student_id, announcement_id, teacher_rate, formula_id]
  );
  return result;
};

// je récupère les propositions EN ATTENTE pour un élève (status proposee)
exports.getStudentProposals = async (studentId) => {
  const [rows] = await db.query(
    `SELECT fp.*,
            u.prenom AS teacher_prenom, u.nom AS teacher_nom
     FROM formula_proposals fp
     LEFT JOIN users u ON u.id = fp.teacher_id
     WHERE fp.student_id = ? AND fp.status = 'proposee'`,
    [studentId]
  );
  return rows;
};

// je récupère TOUTES les formules d'un élève (pour StudentCourses)
exports.getAllStudentFormulas = async (studentId) => {
  const [rows] = await db.query(
    `SELECT fp.*,
            u.prenom AS teacher_prenom, u.nom AS teacher_nom,
            a.subject
     FROM formula_proposals fp
     LEFT JOIN users u ON u.id = fp.teacher_id
     LEFT JOIN announcements a ON a.id = fp.announcement_id
     WHERE fp.student_id = ?
     ORDER BY fp.created_at DESC`,
    [studentId]
  );
  return rows;
};

// j'accepte une formule
exports.acceptFormula = async (id) => {
  const [result] = await db.query(
    "UPDATE formula_proposals SET status = 'acceptee' WHERE id = ?",
    [id]
  );
  return result;
};

// je récupère la formule acceptée d'un élève
exports.getAcceptedFormula = async (studentId) => {
  const [rows] = await db.query(
    "SELECT * FROM formula_proposals WHERE student_id = ? AND status = 'acceptee' LIMIT 1",
    [studentId]
  );
  return rows[0] || null;
};