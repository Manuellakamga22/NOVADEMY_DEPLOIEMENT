const packService = require("../services/packService");

exports.getCatalog = async (req, res) => {
  try {
    return res.json(await packService.getCatalog());
  } catch (e) { return res.status(e.status||500).json({ message: e.message||"Erreur serveur" }); }
};

exports.proposeFormula = async (req, res) => {
  try {
    return res.json(await packService.proposeFormula(req.body));
  } catch (e) { return res.status(e.status||500).json({ message: e.message||"Erreur serveur" }); }
};

exports.getStudentProposals = async (req, res) => {
  try {
    return res.json(await packService.getStudentProposals(req.params.studentId));
  } catch (e) { return res.status(e.status||500).json({ message: e.message||"Erreur serveur" }); }
};

// toutes les formules d'un élève (pour StudentCourses)
exports.getAllStudentFormulas = async (req, res) => {
  try {
    return res.json(await packService.getAllStudentFormulas(req.params.studentId));
  } catch (e) { return res.status(e.status||500).json({ message: e.message||"Erreur serveur" }); }
};

exports.acceptFormula = async (req, res) => {
  try {
    return res.json(await packService.acceptFormula(req.params.id));
  } catch (e) { return res.status(e.status||500).json({ message: e.message||"Erreur serveur" }); }
};

exports.getAcceptedFormula = async (req, res) => {
  try {
    return res.json(await packService.getAcceptedFormula(req.params.studentId));
  } catch (e) { return res.status(e.status||500).json({ message: e.message||"Erreur serveur" }); }
};