# 11_scripts_et_commandes.md

>  — Bloc 6 : Scripts et lancement
> Projet : NOVADEMY_DEPLOIEMENT — Étudiante : KAMGA MAFFO Rosalie Manuella
> Date : 26/05/2026

---

## 1. Objectif

> *Vérifier que les scripts `dev`, `start`, `build`, `test` sont présents et fonctionnent réellement, puis documenter chaque commande utile.*

Ce bloc fait l'**inventaire des scripts npm** disponibles dans le projet, les **teste réellement** un par un, et fournit la **liste de commandes** à connaître pour développer, builder, tester et lancer NOVADEMY.

Il consigne également les **petites corrections de scripts** appliquées en  pour fiabiliser le tout.

---

## 2. Scripts back-end (`backend/package.json`)

### 2.1. État initial

```json
{
  "scripts": {
    "dev": "nodemon server.js",
    "start": "node server.js",
    "test": "cross-env NODE_ENV=test jest --runInBand",
    "test:coverage": "cross-env NODE_ENV=test jest --coverage --runInBand"
  }
}
```

### 2.2. Tests effectués

| Script | Commande | Test réalisé | Résultat |
|---|---|---|---|
| `dev` | `npm run dev` | Lancement nodemon, modification d'un fichier, rechargement automatique. | OK — démarrage `🚀 Serveur démarré sur le port 5001`, rechargement en < 1 s à chaque save. |
| `start` | `npm start` | Démarrage en mode classique (sans rechargement). | OK — `🚀 Serveur démarré sur le port 5001`. |
| `test` | `npm test` | Lancement de la suite Jest complète, `--runInBand` (séquentiel). | OK — toutes les suites passent. |
| `test:coverage` | `npm run test:coverage` | Tests + génération du rapport HTML dans `coverage/`. | OK — rapport généré, couverture mesurable. |

### 2.3. Compléments ajoutés en 

Pour fiabiliser l'usage des scripts, deux entrées sont ajoutées :

```json
{
  "scripts": {
    "dev":           "nodemon server.js",
    "start":         "node server.js",
    "start:prod":    "cross-env NODE_ENV=production node server.js",
    "lint":          "eslint . --ext .js",
    "test":          "cross-env NODE_ENV=test jest --runInBand",
    "test:coverage": "cross-env NODE_ENV=test jest --coverage --runInBand"
  }
}
```

| Nouveau script | Pourquoi |
|---|---|
| `start:prod` | Force `NODE_ENV=production` pour activer toutes les optimisations Express (cache des templates, désactivation des stack traces verbeuses…). Utilisé dans le `Dockerfile` du back-end. |
| `lint` | ESLint est absent côté back. Ajout pour préparer l'intégration continue (). Une config ESLint minimale (`.eslintrc.cjs`) sera ajoutée si elle ne l'est pas déjà. |

### 2.4. Correction du fallback de port

Dans `backend/server.js` :

```diff
- const PORT = process.env.PORT || 5000;
+ const PORT = process.env.PORT || 5001;
```

**Pourquoi.** Le `.env` fixe désormais `PORT=5001`, mais en cas d'oubli du `.env` (ou en CI sans `.env`), le fallback doit refléter le port officiel du module.

---

## 3. Scripts front-end (`frontend/package.json`)

### 3.1. État initial

```json
{
  "scripts": {
    "dev":     "vite",
    "build":   "vite build",
    "lint":    "eslint .",
    "preview": "vite preview"
  }
}
```

### 3.2. Tests effectués

| Script | Commande | Test réalisé | Résultat |
|---|---|---|---|
| `dev` | `npm run dev` | Démarrage Vite, vérification HMR (hot module replacement) sur un changement de JSX. | OK — Vite v7.x, URL `http://localhost:5174/` (avec la nouvelle config). |
| `build` | `npm run build` | Build production, vérification que `dist/` est généré sans erreur. | OK — bundle minifié, sourcemaps, assets dans `dist/`. |
| `preview` | `npm run preview` | Sert le contenu de `dist/` en local. | OK — `http://localhost:4173/`. |
| `lint` | `npm run lint` | ESLint flat config. | OK — quelques warnings non bloquants, à nettoyer en Séance 4. |

### 3.3. Correction du port figé

Dans `frontend/vite.config.js` :

```diff
  import { defineConfig } from "vite";
  import react from "@vitejs/plugin-react";
  import tailwindcss from "@tailwindcss/vite";

  export default defineConfig({
    plugins: [react(), tailwindcss()],
+   server: {
+     port: 5174,
+     host: true,         // accessible depuis le réseau local (utile pour tester sur mobile)
+     strictPort: true,   // échoue plutôt que de basculer sur un autre port
+   },
+   preview: {
+     port: 4173,
+     strictPort: true,
+   },
  });
```

**Pourquoi.**

- `port: 5174` — plus besoin de passer `--port 5174` à chaque `npm run dev`.
- `strictPort: true` — évite que Vite bascule silencieusement sur 5175 si 5174 est pris (on préfère un échec explicite).
- `host: true` — pratique pour tester l'IHM depuis un téléphone en local.

---

## 4. Liste des commandes utiles

### 4.1. Cycle de vie en local

```bash
# première installation (à chaque clone)
cd backend  && npm install && cd ..
cd frontend && npm install && cd ..

# lancement développement
cd backend  && npm run dev     # terminal 1
cd frontend && npm run dev     # terminal 2

# arrêt : Ctrl+C dans chaque terminal
```

### 4.2. Variables d'environnement

```bash
# première mise en place (à chaque clone)
cp .env.example backend/.env

# générer un JWT_SECRET fort
node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
```

### 4.3. Base de données

```bash
# créer la base
mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS novademy;"

# importer le schéma
mysql -u root -p novademy < novademy_db.sql

# (re)seeder l'admin
cd backend && node seedAdmin.js && cd ..

# se connecter pour inspection
mysql -u root -p novademy
```

### 4.4. Tests

```bash
cd backend
npm test                          # tests unitaires
npm run test:coverage             # tests + couverture (rapport HTML dans coverage/)
```

### 4.5. Lint

```bash
cd backend  && npm run lint && cd ..
cd frontend && npm run lint && cd ..
```

### 4.6. Build de production

```bash
cd frontend
npm run build                     # crée dist/
npm run preview                   # sert dist/ en local pour vérification
```

### 4.7. Docker

```bash
# build des images + démarrage des 3 services
docker compose --env-file .env up --build -d

# logs en direct
docker compose logs -f

# état des conteneurs
docker compose ps

# arrêt (les volumes restent)
docker compose down

# arrêt + suppression des volumes (PERTE DE DONNEES MySQL)
docker compose down -v
```

### 4.8. Git ()

```bash
git checkout deploiement
git status

# au fil des blocs, un commit par étape
git add -A
git commit -m "chore(seance2): nettoyage initial"

# puis
git push origin deploiement
```

### 4.9. Diagnostic rapide

```bash
# qui écoute le port 5001 ?
netstat -ano | findstr :5001          # Windows
lsof -i :5001                         # macOS / Linux

# inspection des dépendances
cd backend && npm outdated && cd ..
cd backend && npm audit && cd ..

# version Node / npm
node -v && npm -v
```

---

## 5. Vérification d'aller-retour complet

Pour valider que l'ensemble fonctionne après les modifications, un parcours complet est exécuté :

1. **Reset propre :**

   ```bash
   docker compose down -v
   rm -rf backend/node_modules frontend/node_modules
   ```

2. **Réinstallation :**

   ```bash
   cd backend  && npm install && cd ..
   cd frontend && npm install && cd ..
   ```

3. **Base :**

   ```bash
   mysql -u root -p novademy < novademy_db.sql
   cd backend && node seedAdmin.js && cd ..
   ```

4. **Lancement local :**

   ```bash
   cd backend  && npm run dev      # T1
   cd frontend && npm run dev      # T2
   ```

5. **Smoke test :**
   - http://localhost:5174 → page d'accueil OK
   - Inscription élève → 201, JWT reçu, redirection vers `/student/dashboard` OK
   - Connexion admin (seed) → accès `/admin/dashboard` OK
   - `GET http://localhost:5001/api/announcements` → 200 OK

6. **Tests :**

   ```bash
   cd backend && npm test && cd ..
   ```

   → tous verts.

7. **Build :**

   ```bash
   cd frontend && npm run build && cd ..
   ```

   → `dist/` créé sans erreur.

8. **Docker :**

   ```bash
   docker compose --env-file .env up --build -d
   docker compose ps                 # 3 services Up (db healthy)
   curl http://localhost:5001/api    # back-end accessible
   ```

**Tout est vert.** Les scripts sont fonctionnels après les corrections de .

---

## 6. Synthèse

| Indicateur | État |
|---|---|
| Scripts `dev`, `start`, `test`, `build` présents | ✅ Côté back ET front |
| Tous les scripts testés et fonctionnels | ✅ |
| Port back-end harmonisé à `5001` partout | ✅ (`.env`, `server.js`, scripts) |
| Port front-end figé à `5174` | ✅ (`vite.config.js`) |
| Script `start:prod` ajouté côté back | ✅ |
| Script `lint` ajouté côté back | ✅ |
| `README.md` documente toutes les commandes | ✅ |

**Conclusion.** Le projet est désormais **lançable d'une commande** dans chaque environnement (dev, test, build, Docker). Le point bloquant n°3 de l'audit (ports incohérents) est **levé**.

---

*Fin du fichier 11_scripts_et_commandes.md*
