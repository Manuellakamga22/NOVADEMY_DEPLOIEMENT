# 13_architecture_deploiement.md

> Séance 3 — Bloc 1 : Architecture de déploiement
> Projet : NOVADEMY_DEPLOIEMENT — Étudiante : KAMGA MAFFO Rosalie Manuella
> Date : 26/05/2026

---

## 1. Objectif

> *Définir comment les différentes parties du projet vont tourner ensemble en production.*

NOVADEMY est composé de trois grandes parties : un front-end React, un back-end Node.js, et deux bases de données (MySQL + MongoDB). Pour le déploiement, on utilise **Docker** pour isoler chaque service dans un conteneur et **Docker Compose** pour les faire tourner ensemble.

Ce document décrit l'architecture choisie, les choix techniques et comment les services communiquent entre eux.

---

## 2. Vue d'ensemble de l'architecture

```
NAVIGATEUR (utilisateur)
       │
       ├── http://localhost (port 80)
       │         └── Conteneur FRONTEND (Nginx)
       │               → sert les fichiers statiques React (build Vite)
       │               → redirige toutes les routes vers index.html (SPA)
       │
       └── http://localhost:5001 (port 5001)
                 └── Conteneur BACKEND (Node.js / Express)
                       → répond aux requêtes API (/api/*)
                       │
                       ├── Conteneur DB (MySQL 8.0)
                       │     → stocke les données principales (13 tables)
                       │     → port 3306 interne, non exposé à l'extérieur
                       │
                       └── MongoDB (local ou cloud)
                             → stocke les notifications en temps réel
```

---

## 3. Les services Docker

### 3.1. Service `db` — MySQL 8.0

| Paramètre | Valeur |
|---|---|
| Image | `mysql:8.0` |
| Port interne | `3306` (non exposé au navigateur) |
| Volume | `db_data` (persistance des données entre redémarrages) |
| Réseau | Réseau interne Docker uniquement |
| Healthcheck | `mysqladmin ping` toutes les 10 secondes |

**Pourquoi MySQL ?** C'est la base principale du projet. Elle stocke les utilisateurs, les annonces, les packs, les paiements, les avis, etc. MySQL est stable, bien documenté et adapté aux données structurées de NOVADEMY.

**Pourquoi ne pas exposer le port ?** En production, la base de données ne doit jamais être accessible directement depuis Internet. Seul le back-end (dans le même réseau Docker) peut l'atteindre.

### 3.2. Service `backend` — Node.js 20 / Express 5

| Paramètre | Valeur |
|---|---|
| Image | Construite depuis `backend/Dockerfile` (Node 20 Alpine) |
| Port exposé | `5001:5001` |
| Variables env | Injectées via `docker-compose.yml` + fichier `.env` |
| Dépendance | Attend que `db` soit prêt (healthcheck) |

**Pourquoi Alpine ?** L'image Node Alpine est beaucoup plus légère que l'image standard (≈ 50 Mo vs ≈ 350 Mo). Pour un projet pédagogique, ça reste raisonnable.

**Utilisateur non-root.** Le `Dockerfile` crée un utilisateur `app` dédié et l'utilise pour lancer le serveur. C'est une bonne pratique de sécurité : si le processus est compromis, l'attaquant n'a pas les droits root sur le conteneur.

### 3.3. Service `frontend` — Nginx 1.27 Alpine

| Paramètre | Valeur |
|---|---|
| Image | Construite depuis `frontend/Dockerfile` (build Vite + Nginx) |
| Port exposé | `80:80` |
| Contenu servi | Fichiers statiques produits par `npm run build` |

**Build multi-stage.** Le `Dockerfile` frontend utilise deux étapes :
1. Une image Node pour compiler le React (`npm run build` → `dist/`)
2. Une image Nginx pour servir uniquement les fichiers compilés

Résultat : l'image finale ne contient ni Node.js ni les sources React — juste les fichiers HTML/CSS/JS minifiés. C'est plus léger et plus sécurisé.

**Configuration Nginx (nginx.conf).** La règle `try_files $uri $uri/ /index.html` est essentielle pour le routing React. Sans elle, un utilisateur qui rafraîchit la page sur `/student/dashboard` obtiendrait une erreur 404 du serveur Nginx (qui ne connaît pas cette route — c'est React Router qui la gère côté client).

---

## 4. Communication entre les services

```
docker-compose.yml définit un réseau bridge interne automatique.

backend → db       : DB_HOST=db (nom du service Docker, résolu automatiquement)
backend → MongoDB  : MONGO_URI=mongodb://localhost:27017/novademy_deploiement
                     (MongoDB tourne en local hors Docker pour ce module)
frontend → backend : le navigateur fait les appels API en direct vers :5001
                     (le front-end est du JS côté client, pas un proxy)
```

> **Point important.** Le front-end React est du code qui s'exécute dans le navigateur de l'utilisateur, pas sur le serveur. Donc quand React appelle l'API, c'est le navigateur qui fait la requête vers `http://localhost:5001/api/...`. C'est pour ça que le port 5001 doit être exposé.

---

## 5. Réseau interne Docker

Docker Compose crée automatiquement un réseau bridge nommé `novademy_deploiement_default`. Dans ce réseau :

- Les services se trouvent par leur nom (`db`, `backend`, `frontend`)
- La base de données n'est pas accessible de l'extérieur
- Le back-end peut appeler `db:3306` directement

C'est la configuration classique pour séparer base de données et API sans exposer la base.

---

## 6. Persistance des données

| Donnée | Stockage |
|---|---|
| Tables MySQL | Volume Docker `db_data` (survit aux redémarrages) |
| Photos de profil (Multer) | `backend/uploads/` (monté en volume en prod idéalement) |
| Notifications (MongoDB) | Local, non versionné |

> **Attention.** Pour ce module, les uploads ne sont pas montés en volume Docker. En production réelle, il faudrait ajouter un volume pour `backend/uploads/` dans le `docker-compose.yml`, sinon les photos sont perdues à chaque `docker compose down`.

---

## 7. Choix de déploiement pour ce module

Pour ce TP, l'environnement cible est **local avec Docker Compose**. C'est la manière la plus directe de tester une architecture de déploiement sans louer un serveur cloud.

En déploiement réel (hors module), les étapes suivantes seraient nécessaires :
- Louer un VPS (OVH, DigitalOcean, Scaleway…)
- Configurer un nom de domaine et HTTPS (Let's Encrypt + Nginx reverse proxy)
- Utiliser des secrets Docker ou un gestionnaire de secrets pour les variables sensibles

---

## 8. Synthèse

| Composant | Solution retenue | Justification |
|---|---|---|
| Base de données | MySQL 8.0 dans Docker | Données structurées, cohérence transactions |
| Back-end | Node 20 Alpine | Léger, compatible Express 5 |
| Front-end | Vite build → Nginx Alpine | Multi-stage, image finale légère |
| Orchestration | Docker Compose | Simple, adapté à un projet étudiant |
| Réseau | Bridge interne Docker | Isole la DB, expose uniquement les ports nécessaires |
| Persistance | Volume Docker `db_data` | Les données survivent aux redémarrages |

---

*Fin du fichier 13_architecture_deploiement.md*
