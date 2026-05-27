# 03_structure_projet.md

>  — Bloc 3 : Analyse de la structure
> Projet : NOVADEMY — Étudiante : KAMGA MAFFO Rosalie Manuella
> Date : 26/05/2026

---

## Mini-arborescence commentée

Arborescence du projet `NOVADEMY_DEPLOIEMENT` (copie de travail) — version résumée et commentée. Les sous-dossiers `node_modules/` et `coverage/` sont volontairement omis (ils ne sont pas versionnés).

```
NOVADEMY_DEPLOIEMENT/                  Racine du projet, contiendra documentation technique/
│
├── documentation technique/                 *** Dossier livrables du module (en cours) ***
│   ├── 01_fiche_projet.md
│   ├── 02_verification_locale.md
│   ├── 03_structure_projet.md         (ce fichier)
│   ├── 04_checklist_audit.md
│   ├── 05_points_bloquants.md
│   └── 06_conclusion_audit.md
│
├── docker-compose.yml                 Orchestration 3 services : db / backend / frontend
├── novademy_db.sql                    Dump SQL initial (schéma 13 tables) — sensible : à isoler
├── package.json                       Manifest racine (cors + multer en double, à nettoyer S2)
├── .gitignore                         Bien rempli : .env, node_modules, coverage, dist, *.sql
│                                      *** Pas de README.md racine — à créer en  ***
│
├── backend/                           Back-end Node.js + Express 5 (port 5001)
│   ├── .env                           *** Secrets de dev en clair — à ne JAMAIS commiter ***
│   │                                  *** Pas de .env.example — à créer en  ***
│   ├── Dockerfile                     Image Node Alpine multi-stage
│   ├── package.json                   Dépendances : express, mysql2, bcrypt, jsonwebtoken,
│   │                                  helmet, express-rate-limit, dotenv, multer, sqlite3
│   ├── server.js                      Point d'entrée : middlewares, montage des routes
│   ├── db.js                          Pool MySQL (mysql2/promise) configuré par .env
│   ├── seedAdmin.js                   Crée le compte admin initial
│   │
│   ├── routes/                        15 fichiers : auth, teacher, student, announcement,
│   │                                  trial, pack, payment, review, message,
│   │                                  teacherPlanning, studentPlanning, groupClass,
│   │                                  StudentProfile, TeacherProfile, settings
│   │                                  *** Convention de nommage incohérente (camelCase
│   │                                      vs PascalCase) — point d'amélioration ***
│   │
│   ├── controllers/                   12 fichiers : un par domaine métier
│   ├── services/                      12 fichiers : logique métier isolée
│   ├── repositories/                  Accès aux données mysql2 (requêtes paramétrées)
│   ├── middleware/                    authMiddleware.js (vérification JWT + rôle)
│   │
│   ├── tests/                         Tests unitaires Jest (avec mocks)
│   └── coverage/                      Rapport de couverture Jest (non versionné)
│
└── frontend/                          Front-end React 19 + Vite 7 (port 5174)
    ├── Dockerfile                     Image Vite build → Nginx (prod)
    ├── nginx.conf                     Config Nginx pour servir le bundle
    ├── README.md                      Présent (template Vite par défaut, à enrichir)
    ├── index.html                     Point d'entrée HTML
    ├── vite.config.js                 React + Tailwind v4 — *** port à figer à 5174 ***
    ├── eslint.config.js               Configuration ESLint flat config
    ├── package.json                   Dépendances : react 19, react-router 7,
    │                                  tailwindcss 4, @tailwindcss/vite
    │
    └── src/
        ├── main.jsx                   Bootstrap React + import index.css
        ├── App.jsx                    42 routes <Route> dans <BrowserRouter>
        ├── App.css                    Styles globaux
        ├── index.css                  Import Tailwind
        ├── assets/                    Images, illustrations, logo NOVADEMY
        ├── styles/                    Styles utilitaires
        └── pages/                     44 composants page (.jsx)
                                       — public : Home, Login, Register, Aide,
                                         NosFormules, DonnerDesCours, Forgot/Reset
                                       — élève : 12 pages /student/*
                                       — professeur : 9 pages /teacher/*
                                       — admin : 9 pages /admin/*
                                       *** Pas de dossier components/ partagés —
                                           duplication probable de bouts d'UI ***
```

---

## Fichiers et dossiers importants (focus)

### Fichiers à la racine

| Fichier | Rôle | Observation |
|---|---|---|
| `docker-compose.yml` | Orchestration db + backend + frontend pour le déploiement | Les ports backend `5000:5000` et frontend `80:80` devront être harmonisés avec les nouveaux ports (5001/5174) en . |
| `novademy_db.sql` | Dump du schéma MySQL (13 tables + contraintes) | **Sensible** : exclu du Git par `.gitignore` (`*.sql`). Conserver hors dépôt public ou dans un dossier `db/` privé. |
| `package.json` (racine) | Double déclaration de `cors` et `multer` | Doublon avec celui du back-end — à supprimer en  pour éviter la confusion. |
| `.gitignore` | Exclut `.env`, `node_modules`, `coverage`, `dist`, `*.sql`, `*.log`, `*.txt` (sauf README) | **Bon point** : couvre bien les fichiers sensibles et le bruit. |

### Fichiers sensibles repérés

| Fichier | Pourquoi sensible | État |
|---|---|---|
| `backend/.env` | Contient `DB_PASSWORD`, `JWT_SECRET`, port et utilisateur BDD | **Présent en local, exclu de Git** (`.gitignore` OK). Doit avoir un jumeau `.env.example` sans valeurs. |
| `novademy_db.sql` | Structure de la base + potentiellement des données réelles si re-dumpé après usage | Exclu de Git (`*.sql`). À garder hors dépôt public. |
| `backend/seedAdmin.js` | Crée un admin avec mot de passe — vérifier qu'il ne contient pas le mot de passe en dur | À auditer en . |
| `JWT_SECRET` (dans .env) | Valeur `novademy_secret_key_2024` triviale | À régénérer en valeur aléatoire forte pour la prod. |

### Documentation présente

| Fichier | État |
|---|---|
| `frontend/README.md` | Présent mais générique (template Vite). À enrichir en . |
| `backend/README.md` | **Absent.** À créer. |
| `README.md` racine | **Absent.** À créer (vue d'ensemble + démarrage rapide). |

### Scripts disponibles

| Emplacement | Script | Effet |
|---|---|---|
| `backend/package.json` | `dev` | `nodemon server.js` (rechargement à chaud) |
| `backend/package.json` | `start` | `node server.js` (mode prod) |
| `backend/package.json` | `test` | `cross-env NODE_ENV=test jest --runInBand` |
| `backend/package.json` | `test:coverage` | Tests + rapport de couverture |
| `frontend/package.json` | `dev` | `vite` (serveur dev port à figer à 5174) |
| `frontend/package.json` | `build` | `vite build` (bundle prod dans `dist/`) |
| `frontend/package.json` | `preview` | Servir le bundle prod en local |
| `frontend/package.json` | `lint` | `eslint .` |

Manquent : un script `start:prod` côté backend qui force `NODE_ENV=production`, et un script « tout-en-un » à la racine pour démarrer back + front en parallèle (à voir en ).

---

## Conclusion sur la clarté de la structure

**La structure est globalement claire et conforme à un projet full-stack professionnel.** Elle respecte la séparation des responsabilités attendue d'un développeur CDA :

- une séparation nette **front-end / back-end** au niveau racine ;
- une **architecture en couches** côté back-end (`routes/ → controllers/ → services/ → repositories/`) qui isole l'accès aux données et la logique métier ;
- une **conteneurisation déjà amorcée** (deux Dockerfiles + un docker-compose) ;
- un **.gitignore solide** qui protège les fichiers sensibles.

Les **points à corriger** pour rendre la structure « prête à déployer » sont identifiés et tous traitables en  :

- absence de `README.md` racine et back-end ;
- absence de `.env.example` (le `.env` existe mais aucun gabarit n'est fourni à un nouveau développeur) ;
- doublon de dépendances dans le `package.json` racine ;
- conventions de nommage hétérogènes dans `backend/routes/` ;
- aucun dossier `components/` partagé côté front-end (à introduire si refactoring) ;
- ports d'écoute encore codés à `5000` / `5173` dans le `docker-compose.yml` et la configuration Vite, à harmoniser avec les nouveaux ports **5001 / 5174**.

**La clarté de l'organisation existante facilitera grandement le travail de mise en ligne** des séances suivantes : la séparation des couches permet d'écrire des variables d'environnement propres, et la présence des Dockerfiles indique que l'auteure a déjà anticipé le déploiement en conteneurs.

---

*Fin du fichier 03_structure_projet.md*
