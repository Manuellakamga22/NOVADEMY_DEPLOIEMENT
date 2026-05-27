# 15_urls_et_connexions.md

>  — Bloc 3 : URLs et connexions
> Projet : NOVADEMY_DEPLOIEMENT — Étudiante : KAMGA MAFFO Rosalie Manuella
> Date : 26/05/2026

---

## 1. Objectif

> *Recenser toutes les URLs du projet, vérifier les connexions aux bases de données, et s'assurer que tout est cohérent entre les environnements.*

Ce document liste les endpoints importants du back-end, les URLs accessibles côté front-end, et vérifie les connexions MySQL et MongoDB.

---

## 2. URLs front-end

### 2.1. En développement local (hors Docker)

| Mode | URL | Quoi |
|---|---|---|
| Dev Vite | `http://localhost:5174` | Application React (rechargement à chaud) |
| Preview (build prod local) | `http://localhost:4173` | Build Vite servi localement |

### 2.2. En mode Docker Compose

| Mode | URL | Quoi |
|---|---|---|
| Via Nginx | `http://localhost` (port 80) | Fichiers React compilés servis par Nginx |

### 2.3. Routes React principales (React Router)

| Route | Page | Rôle |
|---|---|---|
| `/` | HomeTemp | Page d'accueil |
| `/login` | LoginTemp | Connexion |
| `/register/student` | StudentRegisterTemp | Inscription élève |
| `/register/teacher` | TeacherRegisterTemp | Inscription professeur |
| `/student/dashboard` | StudentDashboard | Tableau de bord élève |
| `/teacher/dashboard` | TeacherDashboard | Tableau de bord professeur |
| `/admin/dashboard` | AdminDashboard | Tableau de bord admin |
| `/student/planning` | StudentPlanning | Planning de l'élève |
| `/teacher/planning` | TeacherPlanning | Planning du professeur |
| `/student/chat` | StudentChat | Messagerie élève |

> Il y a 42 routes au total dans `App.jsx`. Ces routes sont gérées entièrement côté client par React Router. Nginx ne les connaît pas — c'est pourquoi `nginx.conf` redirige tout vers `index.html` (rule `try_files`).

---

## 3. URLs back-end (API Express)

### 3.1. En développement local

Base : `http://localhost:5001`

### 3.2. En mode Docker Compose

Base : `http://localhost:5001` (port 5001 exposé par Docker)

### 3.3. Endpoints principaux

| Route | Méthode | Rôle | Auth requise |
|---|---|---|---|
| `GET /` | GET | Vérification que l'API tourne | Non |
| `/api/auth/register` | POST | Inscription | Non |
| `/api/auth/login` | POST | Connexion → retourne JWT | Non |
| `/api/auth/forgot-password` | POST | Demande de réinitialisation | Non |
| `/api/announcements` | GET | Liste des annonces | Non (public) |
| `/api/announcements` | POST | Créer une annonce | Oui (teacher) |
| `/api/teachers` | GET | Liste des professeurs | Non |
| `/api/teacher-planning` | GET/POST | Planning professeur | Oui |
| `/api/student-planning` | GET/POST | Planning élève | Oui |
| `/api/trials` | POST | Demande de cours d'essai | Oui (student) |
| `/api/packs` | GET/POST | Formules/packs | Oui |
| `/api/payments` | GET/POST | Paiements | Oui |
| `/api/reviews` | GET/POST | Avis | Oui |
| `/api/messages` | GET/POST | Messagerie | Oui |
| `/api/group-classes` | GET/POST | Cours collectifs | Oui |
| `/api/notifications` | GET | Notifications (MongoDB) | Oui |
| `/api/settings` | GET/PUT | Paramètres admin | Oui (admin) |

> **Rate limiting.** Les routes `/api/auth/*` sont limitées à **100 requêtes par 15 minutes** par IP (authLimiter). Les autres routes sont limitées à **200 requêtes par 15 minutes** (globalLimiter). Ces valeurs sont codées en dur dans `server.js` pour l'instant.

### 3.4. Test de l'API

Vérification rapide que le back-end répond :

```bash
curl http://localhost:5001/
# Attendu : {"message":"API NOVADEMY en ligne"}
```

Vérification d'une route protégée sans token (doit retourner 401) :

```bash
curl http://localhost:5001/api/announcements
# Attendu : 200 OK si la route est publique, 401 si elle nécessite un JWT
```

---

## 4. Connexion MySQL

### 4.1. Configuration (db.js)

```javascript
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});
```

Le pool maintient jusqu'à **10 connexions simultanées**. C'est suffisant pour un projet de cette taille.

### 4.2. Résolution du host par environnement

| Environnement | `DB_HOST` | Explication |
|---|---|---|
| Local (hors Docker) | `localhost` | MySQL installé sur le poste |
| Docker Compose | `db` | Nom du service Docker, résolu par le réseau interne |
| Production cloud | URL du serveur MySQL managé | Dépend de l'hébergeur |

### 4.3. Vérification de la connexion

Au démarrage, `db.js` tente une connexion et affiche :
- `✅ Connecté à MySQL` si tout va bien
- `❌ Erreur MySQL : ...` si la connexion échoue

En cas d'erreur MySQL au démarrage du backend, vérifier :
1. Que MySQL est bien lancé (`docker compose ps` → service `db` en état `Up`)
2. Que `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME` sont corrects dans `.env`
3. Que la base `novademy_deploiement` existe (`mysql -u root -p -e "SHOW DATABASES;"`)

### 4.4. Structure de la base

13 tables principales :

| Table | Rôle |
|---|---|
| `users` | Comptes utilisateurs (élèves, profs, admin) |
| `teacher_profiles` | Profils détaillés des professeurs |
| `student_profiles` | Profils des élèves |
| `announcements` | Annonces des professeurs |
| `teacher_planning` | Créneaux de disponibilité |
| `trial_requests` | Demandes de cours d'essai |
| `formula_proposals` | Propositions de formules (packs) |
| `group_classes` | Cours collectifs |
| `group_class_enrollments` | Inscriptions aux cours collectifs |
| `conversations` | Conversations de messagerie |
| `messages` | Messages individuels |
| `payments` | Paiements |
| `reviews` | Avis des élèves |

---

## 5. Connexion MongoDB

### 5.1. Configuration (mongodb.js)

```javascript
const uri = process.env.MONGO_URI || "mongodb://localhost:27017/novademy";
await mongoose.connect(uri);
```

MongoDB est utilisé **uniquement pour les notifications**. C'est optionnel : si MongoDB n'est pas disponible, le serveur continue de tourner (les autres fonctionnalités ne sont pas impactées).

### 5.2. Par environnement

| Environnement | `MONGO_URI` | Note |
|---|---|---|
| Local | `mongodb://localhost:27017/novademy_deploiement` | MongoDB installé localement |
| Docker Compose | Idem (MongoDB hors Docker pour ce module) | Possible d'ajouter un service Docker si besoin |
| Production | URI MongoDB Atlas ou serveur dédié | Hors scope de ce module |

### 5.3. Vérification

Au démarrage : `MongoDB connecté` dans les logs (ou `MongoDB non disponible :...` si pas installé, ce qui n'est pas bloquant).

---

## 6. CORS — Origines autorisées

Le back-end autorise les appels depuis ces origines (configurées dans `server.js`) :

```javascript
const allowedOrigins = [
  "http://localhost",
  "http://localhost:80",
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:5175",
  "http://localhost:3000",
  process.env.FRONTEND_URL,
].filter(Boolean);
```

`process.env.FRONTEND_URL` permet d'ajouter dynamiquement l'URL de production sans modifier le code.

> En production réelle, la liste des origines fixes (`localhost:5173`, `localhost:3000`...) devrait être nettoyée pour ne garder que l'URL de production. Pour ce module, on laisse les origines de dev pour faciliter les tests.

---

## 7. Synthèse des points à vérifier avant le lancement

| Contrôle | Commande / Vérification | Statut attendu |
|---|---|---|
| Front-end accessible | `curl http://localhost` (Docker) ou ouvrir `http://localhost:5174` | Page d'accueil HTML |
| Back-end répond | `curl http://localhost:5001/` | `{"message":"API NOVADEMY en ligne"}` |
| MySQL connecté | Logs backend : `✅ Connecté à MySQL` | OK |
| MongoDB disponible | Logs backend : `MongoDB connecté` | OK (non bloquant si absent) |
| Route auth | `POST http://localhost:5001/api/auth/login` | 200 + JWT |
| Route annonces | `GET http://localhost:5001/api/announcements` | 200 + liste |

---

*Fin du fichier 15_urls_et_connexions.md*
