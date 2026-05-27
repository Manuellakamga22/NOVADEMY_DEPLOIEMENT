# 04_checklist_audit.md

>  — Bloc 4 : Checklist d'audit pré-déploiement
> Projet : NOVADEMY — Étudiante : KAMGA MAFFO Rosalie Manuella
> Date : 26/05/2026
> Grille : **Oui / Non / Partiel / Commentaire**

---

## 1. Fonctionnement local

| Élément à vérifier | Oui | Non | Partiel | Commentaire |
|---|:---:|:---:|:---:|---|
| Le projet se lance en local | X | | | Back-end sur 5001, front-end sur 5174 (cf. `02_verification_locale.md`). |
| La base de données se connecte | X | | | `✅ Connecté à MySQL` au démarrage du back. |
| Les pages publiques s'affichent | X | | | `/`, `/login`, `/register`, `/nos-formules`, `/donner-cours`, `/aide` testées. |
| Le flux d'inscription fonctionne (3 rôles) | X | | | Élève, professeur, admin (via seed). |
| Le flux de connexion + JWT fonctionne | X | | | Token retourné, redirection vers le bon dashboard. |
| Aucune erreur 5xx en terminal | X | | | Uniquement warnings non bloquants. |

---

## 2. Structure du projet

| Élément à vérifier | Oui | Non | Partiel | Commentaire |
|---|:---:|:---:|:---:|---|
| La structure est compréhensible | X | | | Séparation `backend/` / `frontend/` propre, couches MVC côté back. |
| Architecture en couches côté back | X | | | `routes/ → controllers/ → services/ → repositories/`. |
| Convention de nommage des fichiers cohérente | | | X | `routes/StudentProfileRoutes.js` (PascalCase) vs `routes/announcementRoutes.js` (camelCase). À harmoniser. |
| Composants front-end factorisés (dossier `components/`) | | X | | Tout est dans `pages/`. Risque de duplication. À introduire en refactoring optionnel. |
| Pas de fichier mort / dossier orphelin | X | | | Rapide revue : tout ce qui est présent est utilisé. |

---

## 3. Dépendances

| Élément à vérifier | Oui | Non | Partiel | Commentaire |
|---|:---:|:---:|:---:|---|
| Les dépendances sont identifiées (`package.json`) | X | | | Versions figées avec `^` côté back et front. |
| `package-lock.json` présent | | | X | Présent côté `frontend/`, à vérifier côté `backend/`. |
| Aucune dépendance en double | | | X | `cors` et `multer` déclarés à la fois dans le `package.json` racine et dans `backend/package.json` → à nettoyer. |
| Pas d'audit critique `npm audit` non résolu | | | X | À relancer `npm audit` en  et arbitrer les vulnérabilités modérées. |
| Versions LTS / récentes utilisées | X | | | Node 20 LTS, React 19, Express 5, MySQL 8, Vite 7. |

---

## 4. Scripts de démarrage

| Élément à vérifier | Oui | Non | Partiel | Commentaire |
|---|:---:|:---:|:---:|---|
| Les scripts sont présents (`dev`, `start`, `build`) | X | | | Back : `dev`, `start`, `test`, `test:coverage`. Front : `dev`, `build`, `lint`, `preview`. |
| Un script `start:prod` explicite côté back | | X | | À ajouter en  (`NODE_ENV=production node server.js`). |
| Un script global racine pour démarrer back + front | | X | | Absent. Optionnel mais utile (ex. `concurrently`). |
| Le port n'est pas hard-codé | | | X | Back-end : `process.env.PORT || 5000` → OK mais fallback obsolète, doit devenir `5001`. Front-end : port à figer dans `vite.config.js`. |

---

## 5. Documentation

| Élément à vérifier | Oui | Non | Partiel | Commentaire |
|---|:---:|:---:|:---:|---|
| Le `README.md` racine existe | | X | | **Absent.** À créer (présentation, prérequis, démarrage local, démarrage Docker). |
| Le `README.md` back-end existe | | X | | **Absent.** À créer (variables d'env, commandes, endpoints). |
| Le `README.md` front-end existe | X | | | Présent mais générique (template Vite). À enrichir. |
| Documentation des endpoints API (collection Postman, OpenAPI…) | | X | | Aucune collection versionnée trouvée. À produire en  ou 4. |
| Schéma de la base versionné | X | | | `novademy_db.sql` présent (et exclu de Git, normal). |

---

## 6. Variables d'environnement

| Élément à vérifier | Oui | Non | Partiel | Commentaire |
|---|:---:|:---:|:---:|---|
| Les variables sont repérées | X | | | `PORT`, `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`, `JWT_SECRET`. |
| Un `.env` existe côté back | X | | | `backend/.env` présent. |
| Un `.env.example` existe (gabarit) | | X | | **Absent.** À créer en  (Bloc 10). |
| Un `.env` existe côté front si besoin | | X | | Pas indispensable aujourd'hui (URL API hard-codée à confirmer). À introduire pour `VITE_API_URL`. |
| Le `docker-compose.yml` consomme les variables d'env | | | X | Lit `${DB_ROOT_PASSWORD}`, `${DB_NAME}`, `${JWT_SECRET}` (bon) mais pas de `.env` racine fourni pour les alimenter. |

---

## 7. Sécurité

| Élément à vérifier | Oui | Non | Partiel | Commentaire |
|---|:---:|:---:|:---:|---|
| Les fichiers sensibles sont isolés (`.gitignore`) | X | | | `.env`, `*.sql`, `node_modules`, `coverage`, `dist`, `*.log` exclus. |
| Aucun secret en clair dans le code source versionné | X | | | Secrets uniquement dans `backend/.env` (non versionné). |
| `JWT_SECRET` fort | | X | | Actuellement `novademy_secret_key_2024` (trivial). À régénérer en valeur aléatoire 64+ caractères. |
| Hashage des mots de passe | X | | | bcrypt 10 rounds. |
| HTTPS prévu pour la production | | | X | Pas encore configuré. Prévu en  via Nginx + Let's Encrypt. |
| Middlewares de sécurité actifs | X | | | Helmet + express-rate-limit (global + auth) + CORS. |
| Requêtes SQL paramétrées (anti-injection) | X | | | mysql2 utilisé avec placeholders `?`. |
| Validation des entrées utilisateur | | | X | Validation côté contrôleurs présente mais non systématique. À auditer en Séance 4. |

---

## 8. Conteneurisation / déploiement

| Élément à vérifier | Oui | Non | Partiel | Commentaire |
|---|:---:|:---:|:---:|---|
| Un `Dockerfile` back-end existe | X | | | Image Node Alpine, à confirmer comme multi-stage en . |
| Un `Dockerfile` front-end existe | X | | | Build Vite + Nginx. |
| Un `docker-compose.yml` orchestre les services | X | | | 3 services : db, backend, frontend. |
| Les ports `docker-compose` correspondent aux nouveaux ports (5001/5174) | | X | | Ports encore à `5000` et `80`. À mettre à jour en . |
| Volumes nommés pour persister MySQL | X | | | `db_data:/var/lib/mysql`. |
| Healthcheck défini sur la BDD | X | | | `mysqladmin ping` configuré. |

---

## 9. Qualité / tests

| Élément à vérifier | Oui | Non | Partiel | Commentaire |
|---|:---:|:---:|:---:|---|
| Tests unitaires présents | X | | | Dossier `backend/tests/` + dépendance Jest. |
| Couverture mesurable | X | | | Script `test:coverage` disponible, dossier `coverage/` généré. |
| ESLint configuré | | | X | Présent côté front-end (`eslint.config.js`). Aucun côté back. À ajouter. |
| Pipeline CI/CD | | X | | Aucun fichier `.github/workflows/` détecté. À introduire en . |
| Hooks Git (pre-commit) | | X | | Aucun (par ex. Husky). Optionnel. |

---

## Synthèse de la grille

| Bloc | OUI | NON | PARTIEL | Total |
|---|:---:|:---:|:---:|:---:|
| 1. Fonctionnement local | 6 | 0 | 0 | 6 |
| 2. Structure | 3 | 1 | 1 | 5 |
| 3. Dépendances | 2 | 0 | 3 | 5 |
| 4. Scripts | 1 | 2 | 1 | 4 |
| 5. Documentation | 1 | 3 | 1 | 5 |
| 6. Variables d'env. | 2 | 2 | 1 | 5 |
| 7. Sécurité | 5 | 1 | 2 | 8 |
| 8. Conteneurisation | 5 | 1 | 0 | 6 |
| 9. Qualité / tests | 2 | 2 | 1 | 5 |
| **Total** | **27** | **12** | **10** | **49** |

**Lecture :**

- **27 OUI / 49 (55 %)** : socle solide, le projet est fonctionnel et bien organisé.
- **12 NON / 49 (24 %)** : points à corriger en priorité (README, .env.example, JWT fort, scripts manquants, CI/CD, doc API…).
- **10 PARTIEL / 49 (21 %)** : améliorations qualité à planifier (validation systématique, ESLint back, harmonisation des ports docker-compose, etc.).

**Aucun point bloquant n'empêche aujourd'hui de lancer le projet** — mais plusieurs points doivent être levés pour le considérer comme **prêt à déployer en production**. Les 5 plus critiques sont listés dans `05_points_bloquants.md`.

---

*Fin du fichier 04_checklist_audit.md*
