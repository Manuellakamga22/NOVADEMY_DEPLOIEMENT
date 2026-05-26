# 01_fiche_projet.md

> Séance 1 — Bloc 1 : Choix et ouverture du projet
> Module : Déploiement de projet informatique — Formatrice Hanane SADEG (Diginova)
> Étudiante : KAMGA MAFFO Rosalie Manuella — ENSITECH, Bachelor CDA, promotion 2026/2027
> Date d'audit : 26/05/2026

---

## Nom du projet

**NOVADEMY** — Plateforme web de mise en relation entre professeurs particuliers et élèves.

Copie de travail dédiée au module déploiement :
`C:\Users\manue\OneDrive\Documents\NOVADEMY_DEPLOIEMENT`

> Une copie complète a été réalisée à partir du projet d'origine (`NOVADEMY`) afin de pouvoir manipuler la configuration, les ports et le code de déploiement sans risquer de casser la version de référence utilisée pour le mémoire et le DP.

---

## Objectif

NOVADEMY est une plateforme web qui permet :

- aux **élèves** (du primaire à la terminale, et étudiants) de trouver un professeur particulier, demander un cours d'essai gratuit, payer un pack de cours, gérer leur planning, échanger via messagerie et laisser un avis ;
- aux **professeurs** de créer un profil pédagogique, publier des annonces, recevoir et gérer les demandes d'essai, proposer des formules personnalisées, animer des cours collectifs et suivre leurs revenus ;
- à l'**administrateur** de superviser l'ensemble : utilisateurs, annonces, paiements, demandes d'essai, statistiques, avis et paramètres généraux.

L'objectif de **ce module** est de prendre cette application développée et testée en local, et de la transformer en un projet **propre, structuré, configurable, déployable, testé et validé**, conforme aux exigences industrielles attendues d'un Concepteur Développeur d'Applications.

---

## Technologies

| Couche | Technologie | Version |
|---|---|---|
| Runtime back-end | Node.js | 20 LTS |
| Framework back-end | Express | 5.2.1 |
| Base de données | MySQL | 8.0 |
| Driver SQL | mysql2 | 3.20.0 |
| Authentification | jsonwebtoken (JWT HS256, 7 j) + bcrypt (10 rounds) | 9.0.3 / 6.0.0 |
| Sécurité HTTP | Helmet + express-rate-limit + CORS | 8.1.0 / 8.3.2 |
| Upload fichiers | Multer | 2.1.1 |
| Tests back-end | Jest + cross-env + nodemon (dev) | 30.3.0 |
| Front-end | React | 19.2.0 |
| Build front-end | Vite | 7.3.1 |
| Routing | React Router DOM | 7.13.1 |
| Style | Tailwind CSS | 4.2.1 |
| Lint | ESLint | 9.39.1 |
| Conteneurisation | Docker + docker-compose | — |
| Reverse proxy front-end | Nginx (image build prod) | — |

---

## État d'avancement

NOVADEMY est un projet **full-stack abouti côté fonctionnel** mais qui nécessite une remise à plat pour être déployé proprement.

État qualitatif :

- Fonctionnel en local : front et back démarrent, BDD se connecte, parcours élève / professeur / admin opérationnels.
- 42 routes React déclarées dans `App.jsx`, 15 fichiers de routes Express, 12 services métier, 12 contrôleurs, repositories par entité.
- 13 tables MySQL conçues via MERISE (users, teacher_profiles, student_profiles, announcements, teacher_planning, trial_requests, formula_proposals, group_classes, group_class_enrollments, conversations, messages, payments, reviews).
- Sécurité de base en place : JWT, bcrypt, Helmet, rate-limit global + spécifique auth, CORS.
- Tests unitaires Jest présents (`backend/tests/`) avec dossier `coverage/`.
- Dockerfiles backend et frontend présents, `docker-compose.yml` à la racine (db + backend + frontend).
- Pas encore de fichier `.env.example`, pas encore de `README.md` à la racine, certaines variables hard-codées, ports d'écoute à harmoniser pour la mise en ligne.

**Verdict global :** application prête à 70 % pour le déploiement — manque la couche « propreté de déploiement » que ce module va précisément construire.

---

## Présence du front-end / back-end / BDD

| Composant | Présent | Emplacement | Port local (après modifs) | Démarrage |
|---|---|---|---|---|
| Front-end | OUI | `NOVADEMY_DEPLOIEMENT/frontend/` | **5174** | `npm run dev` (Vite) |
| Back-end | OUI | `NOVADEMY_DEPLOIEMENT/backend/` | **5001** | `npm run dev` (nodemon) ou `npm start` |
| Base de données | OUI | MySQL 8 local (ou conteneur `db` via docker-compose) | 3306 | Service MySQL Windows ou `docker compose up db` |

> **Modification de ports pour ce module :**
> - back-end : `5000 → 5001` (variable `PORT` du `.env` et mapping `docker-compose.yml`)
> - front-end : `5173 → 5174` (option `--port` Vite ou propriété `server.port` dans `vite.config.js`)
>
> Ces changements seront formalisés dans le `.env.example` et le `README` en Séance 2.

Type de projet : **full-stack (front-end React + back-end Express + base MySQL).**

---

## Équipe / responsabilités

| Rôle | Personne |
|---|---|
| Conception, développement, déploiement | KAMGA MAFFO Rosalie Manuella |
| Encadrement pédagogique mémoire / DP | M. HADJ MOKHNECHE Ryadh (ENSITECH) |
| Encadrement module Déploiement | Hanane SADEG (Diginova) |

---

## Référentiel

Projet présenté dans le cadre du titre professionnel **Concepteur Développeur d'Applications** (niveau 6, RNCP 37873, Ministère du Travail), activité-type 3 « Préparer le déploiement d'une application sécurisée ».

---

*Fin du fichier 01_fiche_projet.md*
