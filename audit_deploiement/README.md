# NOVADEMY

Plateforme web de mise en relation entre **professeurs particuliers** et **élèves**, du primaire à la terminale.
Projet personnel de fin de cycle Bachelor Concepteur Développeur d'Applications (ENSITECH, promotion 2026/2027).

> Cette branche `deploiement` correspond au module **« Déploiement de projet informatique »** (formatrice : Hanane SADEG, Diginova). Tous les livrables se trouvent dans le dossier [`documentation technique/`](./documentation technique/).

---

## Objectif

NOVADEMY permet :

- aux **élèves** de chercher un professeur, demander un cours d'essai gratuit, payer un pack, gérer leur planning, échanger via messagerie et laisser un avis ;
- aux **professeurs** de créer un profil, publier des annonces, gérer leurs demandes d'essai, proposer des formules personnalisées, animer des cours collectifs et suivre leurs revenus ;
- à l'**administrateur** de superviser les utilisateurs, annonces, paiements, demandes, statistiques, avis et paramètres généraux.

---

## Technologies

| Couche | Stack |
|---|---|
| Back-end | Node.js 20 LTS, Express 5, JWT, bcrypt, Helmet, express-rate-limit, Multer |
| Base de données | MySQL 8.0 (driver `mysql2`) |
| Front-end | React 19, Vite 7, React Router DOM 7, Tailwind CSS 4 |
| Tests | Jest 30 (back-end) |
| Lint | ESLint 9 (front-end) |
| Conteneurs | Docker + docker-compose (3 services : `db`, `backend`, `frontend`) |
| Reverse proxy prod | Nginx (image de build du front-end) |

Schéma de la base : 13 tables (`users`, `teacher_profiles`, `student_profiles`, `announcements`, `teacher_planning`, `trial_requests`, `formula_proposals`, `group_classes`, `group_class_enrollments`, `conversations`, `messages`, `payments`, `reviews`).

---

## Installation

### Prérequis

| Outil | Version minimale |
|---|---|
| Node.js | 20 LTS |
| npm | 10 |
| MySQL Server | 8.0 |
| Git | 2.40 |
| Docker Desktop (optionnel mais recommandé) | 4.x |

### Récupération du code

```bash
git clone https://github.com/RosalieManuella/NOVADEMY.git NOVADEMY_DEPLOIEMENT
cd NOVADEMY_DEPLOIEMENT
git checkout deploiement
```

### Variables d'environnement

```bash
cp .env.example backend/.env
```

Puis ouvrir `backend/.env` et **remplir les valeurs** (`DB_PASSWORD`, `JWT_SECRET`, etc.). La documentation détaillée de chaque variable se trouve dans [`documentation technique/10_variables_environnement.md`](./documentation technique/10_variables_environnement.md).

Génération d'un `JWT_SECRET` aléatoire :

```bash
node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
```

### Base de données

```bash
mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS novademy;"
mysql -u root -p novademy < novademy_db.sql
```

Création du compte administrateur initial :

```bash
cd backend
node seedAdmin.js
cd ..
```

### Dépendances

```bash
cd backend  && npm install && cd ..
cd frontend && npm install && cd ..
```

---

## Lancement

### Option A — Mode développement (local, hors Docker)

Terminal 1 (back-end) :

```bash
cd backend
npm run dev
# → 🚀 Serveur démarré sur le port 5001
# → ✅ Connecté à MySQL
```

Terminal 2 (front-end) :

```bash
cd frontend
npm run dev
# → VITE v7.x ready in Yms — Local: http://localhost:5174/
```

Accès :

- Front-end : http://localhost:5174
- API back-end : http://localhost:5001/api

### Option B — Mode conteneurs (Docker Compose)

```bash
docker compose --env-file .env up --build -d
```

Accès :

- Front-end : http://localhost (port 80 mappé vers Nginx du conteneur)
- API back-end : http://localhost:5001/api

Arrêt :

```bash
docker compose down
```

### Option C — Mode production (à partir de la )

La procédure complète de mise en ligne est documentée dans [`documentation technique/17_plan_mise_en_ligne.md`](./documentation technique/17_plan_mise_en_ligne.md) ().

---

## Variables d'environnement

Liste complète documentée dans [`documentation technique/10_variables_environnement.md`](./documentation technique/10_variables_environnement.md).
Gabarit prêt à dupliquer : [`.env.example`](./.env.example).

| Variable | Rôle |
|---|---|
| `PORT` | Port d'écoute du back-end (`5001`) |
| `FRONT_ORIGIN` | Origine CORS autorisée (`http://localhost:5174` en dev) |
| `NODE_ENV` | `development` / `test` / `production` |
| `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME` | Connexion MySQL |
| `JWT_SECRET` | Secret de signature des tokens (**critique**, à régénérer aléatoirement) |
| `JWT_EXPIRES_IN` | Durée de validité d'un token (`7d`) |
| `UPLOAD_DIR`, `UPLOAD_MAX_SIZE` | Stockage Multer |
| `RATE_LIMIT_*` | Bornes du rate-limiting (général + authentification) |
| `SMTP_*` | Configuration e-mail (reset password, en production) |
| `LOG_LEVEL` | `error` / `warn` / `info` / `debug` |

---

## Scripts disponibles

### Back-end (`backend/package.json`)

| Script | Commande | Effet |
|---|---|---|
| `dev` | `npm run dev` | `nodemon server.js` (rechargement à chaud) |
| `start` | `npm start` | `node server.js` (mode production) |
| `test` | `npm test` | `cross-env NODE_ENV=test jest --runInBand` |
| `test:coverage` | `npm run test:coverage` | Tests + rapport de couverture (`coverage/`) |

### Front-end (`frontend/package.json`)

| Script | Commande | Effet |
|---|---|---|
| `dev` | `npm run dev` | Vite en mode dev sur le port **5174** |
| `build` | `npm run build` | Bundle de production dans `dist/` |
| `preview` | `npm run preview` | Servir le bundle prod en local |
| `lint` | `npm run lint` | ESLint sur tout le code source |

Documentation détaillée : [`documentation technique/11_scripts_et_commandes.md`](./documentation technique/11_scripts_et_commandes.md).

---

## Structure du projet

```
NOVADEMY_DEPLOIEMENT/
├── documentation technique/         Livrables du module Déploiement (26 fichiers à terme)
├── backend/                   API Express 5 (port 5001)
│   ├── routes/                Définition des routes (15 fichiers, camelCase)
│   ├── controllers/           Couche contrôleurs (12 fichiers)
│   ├── services/              Logique métier (12 fichiers)
│   ├── repositories/          Accès aux données (mysql2 paramétré)
│   ├── middleware/            Auth JWT + rôles
│   ├── tests/                 Tests unitaires Jest
│   ├── server.js              Point d'entrée
│   ├── db.js                  Pool MySQL
│   ├── seedAdmin.js           Création du compte admin initial
│   └── Dockerfile             Image Node Alpine multi-stage
├── frontend/                  Front React 19 + Vite 7 (port 5174)
│   ├── src/
│   │   ├── pages/             44 composants page
│   │   └── App.jsx            42 routes React Router
│   ├── vite.config.js         Port 5174 figé
│   ├── nginx.conf             Config Nginx pour build prod
│   └── Dockerfile             Build Vite + Nginx
├── docker-compose.yml         Orchestration db / backend / frontend
├── novademy_db.sql            Schéma MySQL (exclu de Git, à conserver hors dépôt public)
├── .env.example               Gabarit des variables (à dupliquer en backend/.env)
├── .gitignore
└── README.md                  (ce fichier)
```

---

## Sécurité

- Mots de passe utilisateurs : **bcrypt 10 rounds**.
- Authentification : **JWT HS256, expiration 7 jours**, vérification systématique dans `authMiddleware.js`.
- Protection HTTP : **Helmet** (en-têtes sécurisés), **CORS** restreint à `FRONT_ORIGIN`.
- Limitation : **rate-limit** global (200 req / 15 min / IP) + spécifique auth (10 tentatives / 15 min).
- Injection SQL : impossible via `mysql2` avec requêtes paramétrées (`?`).
- Variables sensibles : **jamais** dans le code, **jamais** committées (cf. `.gitignore`).
- HTTPS : à activer en production via Nginx + Let's Encrypt ().

---

## Tests

```bash
cd backend
npm test                          # unitaires
npm run test:coverage             # avec couverture (rapport HTML dans coverage/)
```

Objectif : **couverture ≥ 70 %** sur les services métier critiques (`authService`, `announcementService`, `trialService`, `packService`, `paymentService`).

---

## Livrables du module Déploiement

| Séance | Fichiers attendus |
|---|---|
| 1 — Audit | `01_fiche_projet.md` → `06_conclusion_audit.md` |
| 2 — Préparation | `07_nettoyage_effectue.md` → `12_bilan_preparation.md` + `README.md` + `.env.example` + `.gitignore` |
| 3 — Mise en ligne | `13_architecture_deploiement.md` → `19_bilan_mise_en_ligne.md` |
| 4 — Validation | `20_tests_post_deploiement.md` → `26_validation_finale.md` |

Tous dans le dossier [`documentation technique/`](./documentation technique/).

---

## Auteur et encadrement

- **Étudiante** : KAMGA MAFFO Rosalie Manuella — `manuellakamga20@gmail.com`
- **École** : ENSITECH (Massy, Île-de-France), promotion 2026/2027
- **Titre visé** : Concepteur Développeur d'Applications (RNCP 37873, niveau 6)
- **Encadrement pédagogique** : M. HADJ MOKHNECHE Ryadh (ENSITECH)
- **Encadrement module Déploiement** : Mme Hanane SADEG (Diginova)

---

## Licence

Projet pédagogique, usage académique. Toute réutilisation commerciale nécessite l'autorisation de l'autrice.
