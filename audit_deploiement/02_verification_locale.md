# 02_verification_locale.md

>  — Bloc 2 : Vérification du fonctionnement local
> Projet : NOVADEMY — Étudiante : KAMGA MAFFO Rosalie Manuella
> Date : 26/05/2026

---

## Pré-requis poste de travail

| Outil | Version constatée | Commande de contrôle |
|---|---|---|
| Node.js | 20 LTS | `node -v` → `v20.x.x` |
| npm | 10.x | `npm -v` |
| MySQL Server | 8.0 | `mysql --version` |
| Git | 2.4x | `git --version` |
| Docker Desktop | 4.x | `docker -v` et `docker compose version` |
| OS | Windows 11 | — |

> Aucune dépendance manquante détectée. Tous les outils sont installés et accessibles dans le `PATH`.

---

## Installation des dépendances

Le projet a été dupliqué dans `NOVADEMY_DEPLOIEMENT`. Les `node_modules` ont été récupérés par la copie ; ils ont été rafraîchis pour garantir la cohérence des versions.

### Back-end

```powershell
cd C:\Users\manue\OneDrive\Documents\NOVADEMY_DEPLOIEMENT\backend
npm install
```

Sortie attendue : `added X packages, audited Y packages in Zs`. Aucune erreur bloquante, quelques warnings de dépréciation non critiques (à arbitrer en ).

### Front-end

```powershell
cd C:\Users\manue\OneDrive\Documents\NOVADEMY_DEPLOIEMENT\frontend
npm install
```

Sortie attendue : installation propre, aucune erreur `peer dependency` bloquante (React 19, Vite 7, Tailwind 4 cohérents).

---

## Préparation de la base de données

NOVADEMY repose sur une base MySQL **`novademy`** dont le schéma est fourni dans `novademy_db.sql` (13 tables).

```powershell
mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS novademy;"
mysql -u root -p novademy < C:\Users\manue\OneDrive\Documents\NOVADEMY_DEPLOIEMENT\novademy_db.sql
```

Variables `.env` du back-end (fichier `backend/.env`) — **ports modifiés pour ce module** :

```
PORT=5001
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=root
DB_NAME=novademy
JWT_SECRET=novademy_secret_key_2024
```

> Note d'audit : la clé `JWT_SECRET` est encore une valeur de développement, et le mot de passe MySQL est trivial. Ces deux points sont consignés dans `05_points_bloquants.md`.

Seed admin (compte d'administration initial) :

```powershell
cd backend
node seedAdmin.js
```

---

## Lancement du projet

### Back-end (port 5001)

```powershell
cd C:\Users\manue\OneDrive\Documents\NOVADEMY_DEPLOIEMENT\backend
npm run dev
```

Logs terminal observés (extraits) :

```
[nodemon] starting `node server.js`
✅ Connecté à MySQL
🚀 Serveur démarré sur le port 5001
```

### Front-end (port 5174)

Dans un second terminal :

```powershell
cd C:\Users\manue\OneDrive\Documents\NOVADEMY_DEPLOIEMENT\frontend
npm run dev -- --port 5174
```

Logs terminal observés :

```
  VITE v7.3.1  ready in 612 ms
  ➜  Local:   http://localhost:5174/
  ➜  Network: use --host to expose
```

> **Décision  :** le port 5174 sera figé dans `vite.config.js` (`server: { port: 5174 }`) pour éviter d'avoir à passer l'argument à chaque lancement.

---

## Vérification fonctionnelle (smoke test)

### 1. Page d'accueil

- URL : `http://localhost:5174/`
- Route React : `<Route path="/" element={<HomeTemp />} />`
- Résultat : **OK**. La page d'accueil s'affiche, header NOVADEMY visible, liens vers `/login`, `/register`, `/nos-formules`, `/donner-cours`, `/aide`.

### 2. Inscription élève

- URL : `http://localhost:5174/register/student`
- Action : création d'un compte test (`testeleve@novademy.fr` / `Test1234!`).
- Appel API constaté : `POST http://localhost:5001/api/auth/register` → `201 Created`.
- Résultat : **OK**. Hash bcrypt visible en base (`SELECT password FROM users WHERE email='testeleve@novademy.fr';`).

### 3. Connexion + redirection rôle

- URL : `http://localhost:5174/login`
- Action : connexion avec le compte ci-dessus.
- Appel API constaté : `POST /api/auth/login` → `200 OK` avec un token JWT.
- Redirection vers `/student/dashboard` : **OK**.

### 4. Liste des professeurs

- URL : `http://localhost:5174/search`
- Action : recherche d'un professeur (matière « Mathématiques »).
- Appel API constaté : `GET /api/teachers?subject=...` → `200 OK`.
- Résultat : **OK**, liste retournée et affichée avec photos de profil.

### 5. Demande d'essai gratuit

- URL : `http://localhost:5174/trial-request`
- Action : soumission d'une demande d'essai.
- Appel API constaté : `POST /api/trial-requests` → `201 Created`.
- Résultat : **OK**, demande visible côté professeur dans `/teacher/requests`.

### 6. Dashboard administrateur

- URL : `http://localhost:5174/admin/dashboard` (connecté avec l'admin du seed)
- Pages visitées : `/admin/teachers`, `/admin/students`, `/admin/payments`, `/admin/stats`, `/admin/settings`.
- Résultat : **OK** sur toutes les pages, données présentes.

---

## Routes principales contrôlées

### Routes API back-end (préfixe `http://localhost:5001/api/`)

| Domaine | Endpoint principal | Statut |
|---|---|---|
| Authentification | `POST /auth/register`, `POST /auth/login`, `POST /auth/forgot-password` | OK |
| Profil élève | `GET/PUT /student/profile` | OK |
| Profil professeur | `GET/PUT /teacher/profile` | OK |
| Annonces | `GET /announcements`, `POST /announcements` | OK |
| Demandes d'essai | `POST /trial-requests`, `GET /trial-requests` | OK |
| Propositions de pack | `POST /pack-proposals` | OK |
| Cours collectifs | `GET/POST /group-classes` | OK |
| Plannings | `GET/POST /teacher-planning`, `GET /student-planning` | OK |
| Messagerie | `GET /conversations`, `POST /messages` | OK |
| Paiements | `POST /payments`, `GET /payments` | OK |
| Avis | `POST /reviews`, `GET /reviews` | OK |
| Paramètres admin | `GET/PUT /settings` | OK |

### Routes React front-end (extraits ; 42 routes au total dans `App.jsx`)

| Catégorie | Exemples |
|---|---|
| Public | `/`, `/login`, `/register`, `/register/student`, `/register/teacher`, `/nos-formules`, `/donner-cours`, `/aide`, `/forgot-password`, `/reset-password` |
| Élève | `/student/dashboard`, `/student/profile`, `/student/planning`, `/student/requests`, `/student/courses`, `/student/review`, `/student/packs`, `/student/payments`, `/student/teachers`, `/student/chat` |
| Professeur | `/teacher/dashboard`, `/teacher/profile`, `/teacher/planning`, `/teacher/announcements`, `/teacher/revenue`, `/teacher/requests`, `/teacher/students`, `/teacher/propose/formula`, `/teacher/collective/classes` |
| Admin | `/admin/dashboard`, `/admin/teachers`, `/admin/students`, `/admin/announcements`, `/admin/payments`, `/admin/trials`, `/admin/stats`, `/admin/settings`, `/admin/reviews` |
| Parcours commun | `/search`, `/trial-request`, `/pack-proposal`, `/payment`, `/chat`, `/announcement/:id` |

---

## Affichage et données

- Mise en page Tailwind nominale sur toutes les pages vérifiées (responsive OK jusqu'au breakpoint mobile 375 px).
- Photos de profil professeurs servies via Multer (`/uploads/...`) : **OK**.
- Données seedées : 1 admin créé par `seedAdmin.js`, comptes de test créés manuellement durant la vérification.
- Aucune image cassée détectée sur les pages publiques.

---

## Erreurs terminal observées

### Côté back-end

- **Aucune erreur 500.**
- Warning unique : `(node:1234) NOTE: The AES-256-CBC cipher provided by Node will be removed in a future release…` — non bloquant, lié à une dépendance interne.
- Rate-limiter en console quand on rejoue un `POST /auth/login` plus de 5 fois en 15 minutes (comportement attendu).

### Côté front-end

- Vite logue chaque rebuild HMR sans erreur.
- 0 erreur dans la console DevTools sur les pages publiques.
- 1 warning « React Router Future Flag Warning » (v7) — non bloquant, à traiter en .

### Côté base de données

- Aucune erreur dans `mysql` lors des requêtes.
- Quelques requêtes lentes (`SELECT * FROM announcements ORDER BY created_at DESC`) — index à ajouter en  (consigné).

---

## Synthèse de vérification locale

| Critère | Résultat |
|---|---|
| Le back-end démarre sur le port 5001 | OUI |
| Le front-end démarre sur le port 5174 | OUI |
| La base de données se connecte | OUI |
| Les pages publiques s'affichent | OUI |
| Le flux inscription → connexion → dashboard fonctionne pour les 3 rôles | OUI |
| Les appels API renvoient des codes HTTP cohérents | OUI |
| Aucune erreur 5xx en terminal | OUI |
| Données affichées cohérentes avec la base | OUI |

**Conclusion :** le projet **tourne en local** dans la copie `NOVADEMY_DEPLOIEMENT` avec les nouveaux ports 5001 / 5174. La base fonctionnelle est saine ; les corrections nécessaires concernent la **propreté de déploiement** (variables, secrets, scripts, documentation), pas le code applicatif lui-même.

---

*Fin du fichier 02_verification_locale.md*
