# 16_build_et_publication.md

> Séance 3 — Bloc 4 : Build et publication
> Projet : NOVADEMY_DEPLOIEMENT — Étudiante : KAMGA MAFFO Rosalie Manuella
> Date : 26/05/2026

---

## 1. Objectif

> *Comprendre comment compiler le projet pour la production et le publier via Docker.*

En développement, on utilise `npm run dev` pour le front-end (serveur Vite avec rechargement automatique) et `nodemon` pour le back-end. Ce mode n'est **pas utilisable en production** : Vite ne sert pas de build optimisé, et nodemon est un outil de développement.

Pour la production, il faut :
1. Compiler le React en fichiers statiques (`npm run build`)
2. Construire les images Docker (`docker compose build`)
3. Lancer les conteneurs (`docker compose up`)

---

## 2. Build du front-end

### 2.1. Commande

```bash
cd frontend
npm run build
```

Vite compile tout le code React en fichiers HTML, CSS et JavaScript minifiés dans le dossier `dist/`.

### 2.2. Ce que contient `dist/`

```
frontend/dist/
├── index.html          ← point d'entrée de l'application
├── assets/
│   ├── index-Abc123.js  ← tout le JS bundlé et minifié
│   └── index-Xyz789.css ← tout le CSS
└── vite.svg            ← favicon (si présent)
```

Le JavaScript est minifié (réduit en taille, variables renommées) et découpé si nécessaire (code splitting). L'application React entière tient souvent dans un seul fichier JS de quelques centaines de Ko.

### 2.3. Test du build avant Docker

Avant de passer par Docker, on peut vérifier que le build fonctionne en local :

```bash
cd frontend
npm run build
npm run preview
# → http://localhost:4173 — application compilée, sans rechargement automatique
```

Si la preview fonctionne, le build est bon.

### 2.4. Variables d'environnement Vite

Vite supporte les variables d'environnement via des fichiers `.env` avec le préfixe `VITE_`. Pour ce projet, aucune variable d'environnement front-end n'est utilisée : l'URL de l'API est appelée avec le port en dur dans le code (`localhost:5001`).

> Si on voulait que l'URL de l'API soit configurable, on ajouterait `VITE_API_URL=http://localhost:5001` dans `frontend/.env` et on l'utiliserait dans le code avec `import.meta.env.VITE_API_URL`.

---

## 3. Dockerfiles

### 3.1. Dockerfile back-end (`backend/Dockerfile`)

```dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --only=production

COPY . .

RUN addgroup -S app && adduser -S app -G app
USER app

EXPOSE 5001

HEALTHCHECK --interval=30s --timeout=5s --retries=3 \
  CMD wget -qO- http://localhost:5001/ || exit 1

CMD ["node", "server.js"]
```

**Points importants :**
- `npm ci --only=production` : installe uniquement les dépendances de production, pas les devDependencies (jest, nodemon…). L'image est plus légère.
- `adduser app` + `USER app` : le processus tourne en tant qu'utilisateur non-root.
- `HEALTHCHECK` : Docker vérifie que l'API répond toutes les 30 secondes. Si ça échoue 3 fois de suite, le conteneur est marqué comme `unhealthy`.

### 3.2. Dockerfile front-end (`frontend/Dockerfile`)

```dockerfile
FROM node:20-alpine AS builder

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:1.27-alpine

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

**Build multi-stage :**
- **Étape 1 (`builder`)** : image Node 20 Alpine, installe les dépendances et compile avec Vite. Cette image n'est pas gardée dans le résultat final.
- **Étape 2** : image Nginx Alpine ultra-légère. On copie uniquement les fichiers compilés (`dist/`) depuis l'étape précédente. Node.js et les `node_modules` ne sont **pas** dans l'image finale.

**Résultat :** l'image finale pèse environ 25-30 Mo au lieu de 300+ Mo si on avait gardé Node.

---

## 4. Build et lancement Docker Compose

### 4.1. Première fois (ou après modification du code)

```bash
# à la racine du projet
docker compose --env-file .env up --build -d
```

- `--env-file .env` : charge les variables depuis le fichier `.env` à la racine
- `--build` : rebuild les images à partir des Dockerfiles
- `-d` : mode détaché (les conteneurs tournent en arrière-plan)

### 4.2. Vérification après démarrage

```bash
docker compose ps
```

Sortie attendue :

```
NAME                    IMAGE                      STATUS
novademy-db-1           mysql:8.0                  Up (healthy)
novademy-backend-1      novademy_deploiement-backend   Up (healthy)
novademy-frontend-1     novademy_deploiement-frontend  Up
```

Les trois services doivent être `Up`. Le service `db` doit être `healthy` avant que `backend` démarre (c'est géré par `depends_on: condition: service_healthy`).

### 4.3. Voir les logs

```bash
docker compose logs -f           # tous les services
docker compose logs -f backend   # backend seulement
docker compose logs -f db        # MySQL seulement
```

### 4.4. Arrêt

```bash
docker compose down              # arrête les conteneurs, garde les volumes (données MySQL OK)
docker compose down -v           # arrête ET supprime les volumes (PERTE des données MySQL)
```

---

## 5. Ordre de démarrage des services

Docker Compose gère l'ordre via les `depends_on` :

```
1. db (MySQL) démarre en premier
   → Docker attend que le healthcheck "mysqladmin ping" réussisse

2. backend démarre quand db est healthy
   → se connecte à MySQL, lance Express sur le port 5001

3. frontend démarre quand backend est prêt
   → Nginx sert les fichiers statiques sur le port 80
```

> Le `depends_on` avec `condition: service_healthy` est important. Sans ça, le back-end peut démarrer avant que MySQL soit prêt à accepter des connexions et planter avec `ECONNREFUSED`.

---

## 6. .dockerignore

Le `.dockerignore` évite de copier des fichiers inutiles dans les images.

**`backend/.dockerignore`** (doit exister) :

```
node_modules
*.md
coverage
tests
.env
```

**`frontend/.dockerignore`** (doit exister) :

```
node_modules
*.md
dist
```

> Ces fichiers sont déjà présents dans le projet (`backend/.dockerignore` et `frontend/.dockerignore`). On les garde tels quels.

---

## 7. Vérification fonctionnelle complète après build

```bash
# 1. Build + démarrage
docker compose --env-file .env up --build -d

# 2. Attendre ~30 secondes que db soit healthy

# 3. Tester le back-end
curl http://localhost:5001/
# → {"message":"API NOVADEMY en ligne"}

# 4. Tester le front-end
curl -s http://localhost | grep "<title>"
# → <title>NOVADEMY</title>

# 5. Ouvrir dans le navigateur
# → http://localhost : page d'accueil NOVADEMY
# → http://localhost:5001/api/announcements : réponse JSON de l'API
```

---

## 8. Synthèse

| Étape | Commande | Résultat |
|---|---|---|
| Build front | `npm run build` | `dist/` généré |
| Test build | `npm run preview` | `http://localhost:4173` |
| Build images Docker | `docker compose build` | Images construites |
| Lancement | `docker compose --env-file .env up -d` | 3 conteneurs actifs |
| Vérification | `docker compose ps` | Tous `Up` |
| Logs | `docker compose logs -f` | Suivi en direct |
| Arrêt propre | `docker compose down` | Conteneurs stoppés, données conservées |

---

*Fin du fichier 16_build_et_publication.md*
