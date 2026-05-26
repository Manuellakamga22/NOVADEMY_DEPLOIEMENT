# 18_schema_deploiement_final.md

> Séance 3 — Bloc 6 : Schéma de déploiement final
> Projet : NOVADEMY_DEPLOIEMENT — Étudiante : KAMGA MAFFO Rosalie Manuella
> Date : 26/05/2026

---

## 1. Objectif

> *Représenter visuellement l'architecture complète de déploiement de NOVADEMY.*

Ce document présente le schéma final de l'architecture, les flux de données entre les composants, et la configuration réseau Docker.

---

## 2. Schéma d'architecture global

```
┌─────────────────────────────────────────────────────────────────┐
│                        MACHINE LOCALE                           │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                   DOCKER COMPOSE                         │    │
│  │                                                          │    │
│  │  ┌──────────────┐    ┌──────────────┐    ┌───────────┐  │    │
│  │  │   frontend   │    │   backend    │    │    db     │  │    │
│  │  │              │    │              │    │           │  │    │
│  │  │  Nginx 1.27  │    │  Node.js 20  │    │ MySQL 8.0 │  │    │
│  │  │  Alpine      │    │  Alpine      │    │           │  │    │
│  │  │              │    │  Express 5   │    │ 13 tables │  │    │
│  │  │  React build │    │  Port 5001   │    │ Port 3306 │  │    │
│  │  │  Port 80     │    │              │    │ (interne) │  │    │
│  │  └──────┬───────┘    └──────┬───────┘    └─────┬─────┘  │    │
│  │         │                   │                  │        │    │
│  │         │         réseau Docker interne        │        │    │
│  │         └───────────────────┴──────────────────┘        │    │
│  │                                                          │    │
│  │                    Volume db_data                        │    │
│  │                 (données MySQL persistantes)             │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                  │
│  MongoDB (hors Docker)                                          │
│  Port 27017 — notifications uniquement                          │
└─────────────────────────────────────────────────────────────────┘

        ↑                           ↑
 Port 80 exposé               Port 5001 exposé
 (navigateur → front-end)     (navigateur → API)
```

---

## 3. Flux de données détaillés

### 3.1. Flux d'authentification

```
Navigateur
    │
    │  POST /api/auth/login { email, password }
    ▼
Backend (Express)
    │
    │  SELECT * FROM users WHERE email = ?
    ▼
MySQL (table users)
    │
    │  retourne user { id, role, password_hash }
    ▼
Backend
    │  bcrypt.compare(password, hash) → OK
    │  jwt.sign({ id, role }, JWT_SECRET) → token
    │
    │  { token, user }
    ▼
Navigateur
    │
    │  stocke le token (localStorage ou cookie)
    │  redirige vers /student/dashboard ou /teacher/dashboard
    ▼
React Router (côté client)
```

### 3.2. Flux d'une requête authentifiée

```
Navigateur
    │
    │  GET /api/announcements
    │  Header: Authorization: Bearer <token>
    ▼
Backend
    │
    │  authMiddleware.js
    │  jwt.verify(token, JWT_SECRET) → { id, role }
    │
    │  announcementController → announcementService
    │  → announcementRepository
    │
    │  SELECT * FROM announcements WHERE ...
    ▼
MySQL
    │
    │  retourne les annonces
    ▼
Backend
    │
    │  [{ id, title, content, ... }, ...]
    ▼
Navigateur
    │
    │  React affiche les annonces dans le composant
```

### 3.3. Flux des notifications (MongoDB)

```
Backend
    │
    │  Connexion à MongoDB au démarrage (mongodb.js)
    │  URI: process.env.MONGO_URI
    ▼
MongoDB (local, hors Docker)
    │
    │  Collection "notifications"
    │
    ▼
GET /api/notifications (authentifié)
    │
    │  notificationRepository → mongoose.find(...)
    ▼
Frontend → Notifications.jsx
```

---

## 4. Configuration réseau Docker

### 4.1. Réseau interne

Docker Compose crée automatiquement un réseau bridge `novademy_deploiement_default`. Dans ce réseau :

| Service | Hostname interne | Port interne |
|---|---|---|
| `db` | `db` | `3306` |
| `backend` | `backend` | `5001` |
| `frontend` | `frontend` | `80` |

Le backend utilise `DB_HOST=db` pour se connecter à MySQL — Docker résout `db` vers l'adresse IP du conteneur MySQL automatiquement.

### 4.2. Ports exposés à l'hôte

| Service | Port hôte | Port conteneur | Accessible depuis |
|---|---|---|---|
| `frontend` | `80` | `80` | `http://localhost` |
| `backend` | `5001` | `5001` | `http://localhost:5001` |
| `db` | Non exposé | `3306` | Interne Docker uniquement |

> **Sécurité.** MySQL n'est pas accessible depuis l'extérieur du réseau Docker. Seul le service `backend` peut s'y connecter via le réseau interne. C'est une bonne pratique : la base de données ne doit jamais être exposée directement sur Internet.

---

## 5. Schéma de build des images Docker

```
backend/Dockerfile
    │
    ├── FROM node:20-alpine
    ├── COPY package*.json + npm ci --only=production
    ├── COPY source code
    ├── adduser app (non-root)
    └── CMD ["node", "server.js"]
         └── → Image ~120 Mo

frontend/Dockerfile (multi-stage)
    │
    ├── Stage 1 : builder
    │   ├── FROM node:20-alpine
    │   ├── npm ci + npm run build
    │   └── → dist/ (React compilé)
    │
    └── Stage 2 : final
        ├── FROM nginx:1.27-alpine
        ├── COPY dist/ → /usr/share/nginx/html
        ├── COPY nginx.conf
        └── CMD nginx
             └── → Image ~25 Mo
```

---

## 6. Persistance des données

```
Volume Docker : db_data
    │
    └── Monté dans le conteneur MySQL
        chemin interne : /var/lib/mysql
        
        → Survit aux docker compose down
        → Supprimé par docker compose down -v
        → Contient toutes les tables et données MySQL
```

> **Point d'attention.** Si on fait `docker compose down -v`, toutes les données MySQL sont perdues. Il faudrait réimporter le schéma et reseeder l'admin. Pour éviter ça en production, toujours faire `docker compose down` sans `-v`, et sauvegarder régulièrement les données avec `mysqldump`.

---

## 7. Synthèse de l'architecture

| Composant | Technologie | Port | Rôle |
|---|---|---|---|
| Front-end | React 19 + Nginx 1.27 | 80 | Sert l'application React compilée |
| Back-end | Node 20 + Express 5 | 5001 | API REST, logique métier, JWT |
| Base SQL | MySQL 8.0 | 3306 (interne) | Données structurées, 13 tables |
| Base NoSQL | MongoDB (local) | 27017 (interne) | Notifications |
| Orchestration | Docker Compose 2.x | — | Lance et coordonne les services |
| Réseau | Bridge Docker interne | — | Isolation et communication entre services |
| Persistance | Volume Docker `db_data` | — | Données MySQL entre redémarrages |

---

*Fin du fichier 18_schema_deploiement_final.md*
