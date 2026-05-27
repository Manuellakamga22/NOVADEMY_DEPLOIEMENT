# 10_variables_environnement.md

>  — Bloc 4 : Variables d'environnement
> Projet : NOVADEMY_DEPLOIEMENT — Étudiante : KAMGA MAFFO Rosalie Manuella
> Date : 26/05/2026

---

## 1. Objectif

> *Repérer les variables et secrets du projet, créer un fichier `.env.example`, et documenter chaque variable.*

Le code de NOVADEMY consomme des paramètres de configuration via `process.env.*`. Ces paramètres sont chargés depuis un fichier `backend/.env` (via `require("dotenv").config()`), et **jamais** codés en dur dans les sources. Ce bloc inventorie ces variables, justifie leur usage, fournit un gabarit `.env.example` versionnable, et explique comment générer les valeurs sensibles.

---

## 2. Variables repérées dans le code

Recherche systématique :

```powershell
findstr /S /N /C:"process.env." backend\*.js
```

Inventaire consolidé :

| Variable | Fichier consommateur | Valeur initiale | Sensible |
|---|---|:---:|:---:|
| `PORT` | `backend/server.js`, `backend/db.js` | `5000` (changée pour `5001`) | Non |
| `DB_HOST` | `backend/db.js` | `localhost` | Non |
| `DB_PORT` | (non utilisée, à introduire) | (default 3306) | Non |
| `DB_USER` | `backend/db.js` | `root` | Non (mais utilisateur dédié recommandé) |
| `DB_PASSWORD` | `backend/db.js` | `root` (trivial !) | **OUI** |
| `DB_NAME` | `backend/db.js` | `novademy` | Non |
| `JWT_SECRET` | `backend/services/authService.js`, `middleware/authMiddleware.js` | `novademy_secret_key_2024` (trivial !) | **OUI — critique** |
| `JWT_EXPIRES_IN` | (à introduire) | `7d` | Non |
| `FRONT_ORIGIN` | `backend/server.js` (CORS) | `http://localhost:5173` (à mettre à `5174`) | Non |
| `NODE_ENV` | Implicite (Jest, Express, helmet) | `development` | Non |
| `UPLOAD_DIR` | `backend/middleware/multer*` | `./uploads` | Non |
| `UPLOAD_MAX_SIZE` | (à introduire) | `5242880` | Non |
| `RATE_LIMIT_WINDOW_MIN` | (à introduire — actuellement codé en dur dans `server.js`) | `15` | Non |
| `RATE_LIMIT_MAX_GENERAL` | (à introduire) | `200` | Non |
| `RATE_LIMIT_MAX_AUTH` | (à introduire) | `10` | Non |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASSWORD`, `SMTP_FROM` | À ajouter pour e-mails de reset password en prod | Vide en dev | OUI pour `SMTP_PASSWORD` |
| `LOG_LEVEL` | À introduire (Winston ou logger custom) | `info` | Non |

> **Audit important.** Plusieurs constantes sont actuellement codées en dur dans `server.js` (fenêtre du rate-limit, taille max upload). Les **externaliser en variables d'environnement** permet de changer leur valeur en production sans rebuild d'image Docker.

---

## 3. Justification de chaque variable

### 3.1. `PORT` — Port d'écoute du back-end

| Pourquoi | Détail |
|---|---|
| Configuration d'infra | Un serveur peut héberger plusieurs back-ends ; le port doit être paramétrable. |
| Module Déploiement | Choix : **5001** pour ce module (au lieu de 5000 pour éviter tout conflit avec d'autres projets locaux). |
| Production | Sera mappé par Nginx (front-end public sur 443) vers le port interne du conteneur. |

### 3.2. `FRONT_ORIGIN` — Origine CORS autorisée

| Pourquoi | Détail |
|---|---|
| Sécurité | Empêche un site tiers d'appeler l'API de NOVADEMY (cross-site request forgery). |
| Local | `http://localhost:5174`. |
| Production | `https://novademy.fr` (domaine final). |

### 3.3. `NODE_ENV` — Environnement Node

| Valeur | Effet |
|---|---|
| `development` | Logs détaillés, stack traces complètes, Vite en mode dev. |
| `test` | Activé par les scripts Jest (`cross-env NODE_ENV=test`). |
| `production` | Désactive les stack traces verbeuses, active certaines optimisations Express. |

### 3.4. `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME` — Connexion MySQL

| Variable | Pourquoi externalisée |
|---|---|
| `DB_HOST` | Change selon l'environnement : `localhost` (dev), `db` (Docker Compose), URL managée (prod). |
| `DB_PORT` | À introduire (3306 par défaut, peut être 33306 sur certains hébergeurs). |
| `DB_USER` | **À changer** : ne plus utiliser `root` en production. Créer un utilisateur `novademy_app` avec les droits minimaux (`GRANT SELECT, INSERT, UPDATE, DELETE, EXECUTE ON novademy.* TO 'novademy_app'@'%' IDENTIFIED BY '...'`). |
| `DB_PASSWORD` | Secret. Jamais committé. Mot de passe fort en production. |
| `DB_NAME` | Permet d'avoir une base `novademy_dev` et une base `novademy_prod` sans changer le code. |

### 3.5. `JWT_SECRET` — Secret de signature des tokens

> **C'est LE secret le plus critique de la plateforme.**

| Pourquoi | Détail |
|---|---|
| Forge de tokens | Avec ce secret, un attaquant peut signer un token valide pour n'importe quel utilisateur, **y compris l'administrateur**. |
| Algorithme | HS256 — symétrique, donc même secret pour signer et vérifier. |
| Génération recommandée | `node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"` (96 caractères hex, 384 bits d'entropie). |
| Rotation | À renouveler en cas de doute, sans hésiter. Les tokens existants seront invalidés (les utilisateurs devront se reconnecter — acceptable). |

> **Action concrète  :** générer un nouveau `JWT_SECRET` pour le `.env` local et **un autre, différent**, pour la production.

### 3.6. `JWT_EXPIRES_IN` — Durée de validité

| Valeur | Compromis |
|---|---|
| `1h` | Très sécurisé mais oblige à reconnecter souvent. |
| `7d` | Compromis confort / sécurité retenu pour NOVADEMY. |
| `30d` | Trop long pour une plateforme avec données personnelles de mineurs. |

### 3.7. `UPLOAD_DIR` et `UPLOAD_MAX_SIZE`

| Pourquoi | Détail |
|---|---|
| `UPLOAD_DIR` | Permet de pointer vers un volume Docker monté (`/var/lib/novademy/uploads`) en production sans rebuild. |
| `UPLOAD_MAX_SIZE` | 5 Mo par défaut, suffisant pour des photos de profil. Empêche un attaquant de saturer le disque. |

### 3.8. Rate limiting

| Variable | Pourquoi |
|---|---|
| `RATE_LIMIT_WINDOW_MIN` | Permet d'élargir/durcir la fenêtre en cas d'attaque. |
| `RATE_LIMIT_MAX_GENERAL` | 200 requêtes / 15 min par IP. Doit être assez large pour ne pas gêner un utilisateur réel. |
| `RATE_LIMIT_MAX_AUTH` | 10 tentatives d'authentification / 15 min. Limite les attaques par force brute. |

### 3.9. SMTP (e-mails reset password)

| Variable | Pourquoi |
|---|---|
| `SMTP_*` | Pour la fonctionnalité « mot de passe oublié » en production (Mailjet, Sendgrid, OVH…). |
| `SMTP_PASSWORD` | **Secret**. Jamais commité. |

En développement local, ces variables sont vides : l'e-mail est imprimé en console, ce qui suffit pour tester.

### 3.10. `LOG_LEVEL`

| Valeur | Quand l'utiliser |
|---|---|
| `error` | Production silencieuse. |
| `warn` | Production normale. |
| `info` | Préprod, suivi des actions importantes. |
| `debug` | Développement, ou diagnostic ponctuel en prod (à désactiver vite). |

---

## 4. Fichier `.env.example`

Un fichier `.env.example` complet est fourni à la racine du projet — il **complète** ce document.

> Voir : `NOVADEMY_DEPLOIEMENT/.env.example`

**Règles d'or :**

1. Aucune valeur sensible dedans : uniquement des placeholders (`__changez_moi__`) ou des valeurs non sensibles (`PORT=5001`, `DB_HOST=localhost`).
2. **Versionné** dans Git (exception explicite du `.gitignore`).
3. Mis à jour à chaque nouvelle variable ajoutée au code.
4. Sert de documentation : un nouveau développeur fait `cp .env.example backend/.env` et remplit les blancs.

---

## 5. Procédure d'utilisation

### En local

```powershell
cd C:\Users\manue\OneDrive\Documents\NOVADEMY_DEPLOIEMENT
Copy-Item .env.example backend\.env
notepad backend\.env
```

Renseigner :

```
PORT=5001
FRONT_ORIGIN=http://localhost:5174
NODE_ENV=development
DB_HOST=localhost
DB_PORT=3306
DB_USER=root                              # ou un utilisateur local dédié
DB_PASSWORD=<votre mot de passe MySQL local>
DB_NAME=novademy
JWT_SECRET=<généré aléatoirement, cf. ci-dessous>
JWT_EXPIRES_IN=7d
UPLOAD_DIR=./uploads
UPLOAD_MAX_SIZE=5242880
RATE_LIMIT_WINDOW_MIN=15
RATE_LIMIT_MAX_GENERAL=200
RATE_LIMIT_MAX_AUTH=10
LOG_LEVEL=info
```

Génération d'un `JWT_SECRET` aléatoire :

```powershell
node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
```

Coller la sortie (96 caractères hex) dans `JWT_SECRET=`.

### En production

Les variables sont injectées au démarrage du conteneur (par exemple via les *secrets* du registre Docker, GitHub Actions, ou un fichier `.env` lu par `docker compose` mais **stocké sur le serveur uniquement**, jamais sur GitHub).

Exemple `docker compose --env-file .env.production up -d`.

---

## 6. Contrôles de cohérence

| Contrôle | Méthode | Résultat attendu |
|---|---|---|
| Aucune valeur sensible dans `.env.example` | Lecture humaine + grep | Aucun secret réel. |
| `.env.example` est versionné | `git ls-files .env.example` | Le fichier apparaît. |
| `.env` n'est PAS versionné | `git ls-files backend/.env` | Aucune sortie. |
| Toutes les variables consommées par le code sont documentées | Diff entre `findstr process.env.` et le fichier `.env.example` | Couverture 100 %. |

---

## 7. Synthèse

| Indicateur | État |
|---|---|
| Variables d'environnement repérées dans le code | ✅ Inventaire complet |
| `.env.example` créé et versionné | ✅ |
| `JWT_SECRET` documenté et procédure de génération fournie | ✅ |
| `backend/.env` à régénérer localement avec valeurs fortes | À faire côté étudiante |
| Variables prod (différentes du dev) | À préparer en  |

**Conclusion.** Le point bloquant n°1 et n°2 de l'audit (`JWT_SECRET` trivial, absence de `.env.example`) sont **levés**. La rotation effective du `JWT_SECRET` reste à faire (étudiante) avant tout déploiement.

---

*Fin du fichier 10_variables_environnement.md*
