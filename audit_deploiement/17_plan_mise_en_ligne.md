# 17_plan_mise_en_ligne.md

> Séance 3 — Bloc 5 : Plan de mise en ligne
> Projet : NOVADEMY_DEPLOIEMENT — Étudiante : KAMGA MAFFO Rosalie Manuella
> Date : 26/05/2026

---

## 1. Objectif

> *Définir un plan d'action clair, étape par étape, pour mettre en ligne le projet.*

Ce document est une **checklist ordonnée**. Chaque étape doit être validée avant de passer à la suivante. L'objectif est que NOVADEMY soit accessible via `http://localhost` (Docker local) avec les trois services (MySQL, backend, frontend) qui tournent ensemble.

---

## 2. Prérequis

Avant de commencer, vérifier que les outils suivants sont installés :

| Outil | Version minimale | Vérification |
|---|---|---|
| Node.js | 20 LTS | `node -v` |
| npm | 10 | `npm -v` |
| Docker Desktop | 4.x | `docker -v` |
| Docker Compose | 2.x (intégré à Docker Desktop) | `docker compose version` |
| MySQL (local, optionnel) | 8.0 | `mysql --version` |
| Git | 2.40 | `git --version` |

---

## 3. Plan étape par étape

### Étape 1 — Récupérer le code

```bash
git clone https://github.com/Manuellakamga22/NOVADEMY_DEPLOIEMENT.git
cd NOVADEMY_DEPLOIEMENT
git checkout main
```

Ou si le dépôt est déjà cloné, se mettre à jour :

```bash
git pull origin main
```

---

### Étape 2 — Préparer les variables d'environnement

```bash
# Copier le gabarit
cp .env.example backend/.env

# Ouvrir et remplir les valeurs
notepad backend\.env        # Windows
# ou
nano backend/.env           # Linux/Mac
```

Variables à remplir obligatoirement :
- `DB_PASSWORD` — mot de passe MySQL (au minimum changer `root`)
- `JWT_SECRET` — générer avec :
  ```bash
  node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
  ```

Créer aussi le fichier `.env` à la racine (utilisé par Docker Compose) :

```env
DB_ROOT_PASSWORD=root
DB_NAME=novademy_deploiement
JWT_SECRET=<même valeur que dans backend/.env>
```

---

### Étape 3 — Vérifier que le projet démarre en mode développement (optionnel mais recommandé)

Avant de passer à Docker, tester que le projet tourne en mode dev :

**Terminal 1 — Back-end :**
```bash
cd backend
npm install
npm run dev
# → "Serveur backend démarré sur http://localhost:5001"
# → "✅ Connecté à MySQL"
```

**Terminal 2 — Front-end :**
```bash
cd frontend
npm install
npm run dev
# → "VITE v7.x ready — Local: http://localhost:5174/"
```

Ouvrir `http://localhost:5174` dans le navigateur → page d'accueil NOVADEMY.

Si ça fonctionne, arrêter les deux terminaux (Ctrl+C) et passer à l'étape suivante.

---

### Étape 4 — Build Docker

```bash
# à la racine du projet
docker compose --env-file .env up --build -d
```

Cette commande :
1. Construit l'image back-end (Node 20 Alpine + installation des dépendances)
2. Construit l'image front-end (compilation Vite + Nginx)
3. Lance MySQL, attend qu'il soit prêt (healthcheck)
4. Lance le back-end (connecté à MySQL)
5. Lance le front-end (Nginx)

Le premier build prend 2 à 5 minutes selon la connexion Internet (téléchargement des images de base).

---

### Étape 5 — Vérifier l'état des conteneurs

```bash
docker compose ps
```

Résultat attendu (les trois services Up) :

```
NAME                           STATUS
novademy_deploiement-db-1      Up (healthy)
novademy_deploiement-backend-1 Up (healthy)
novademy_deploiement-frontend-1 Up
```

Si un service est en erreur :
```bash
docker compose logs backend   # voir les erreurs du back-end
docker compose logs db        # voir les erreurs MySQL
```

---

### Étape 6 — Initialiser la base de données

**Si MySQL est vide** (premier lancement), importer le schéma :

```bash
# Trouver le nom du conteneur db
docker compose ps

# Importer le schéma SQL dans le conteneur MySQL
docker exec -i novademy_deploiement-db-1 mysql -u root -proot novademy_deploiement < novademy_db.sql
```

> Le fichier `novademy_db.sql` est à la racine du projet. Il contient la structure des 13 tables.

**Créer le compte administrateur :**

```bash
docker exec -it novademy_deploiement-backend-1 node seedAdmin.js
```

Ce script crée le premier compte admin avec les identifiants définis dans `seedAdmin.js`.

---

### Étape 7 — Tests de validation

| Test | Action | Résultat attendu |
|---|---|---|
| Page d'accueil | Ouvrir `http://localhost` | Page NOVADEMY affichée |
| API en ligne | `curl http://localhost:5001/` | `{"message":"API NOVADEMY en ligne"}` |
| Connexion admin | Login avec les identifiants du seed | Accès au dashboard admin |
| Inscription élève | Créer un compte élève | Redirection vers `/student/dashboard` |
| API annonces | `GET http://localhost:5001/api/announcements` | Liste JSON |

---

### Étape 8 — Vérification des logs

Regarder les logs pendant 1-2 minutes pour s'assurer qu'il n'y a pas d'erreurs répétitives :

```bash
docker compose logs -f --tail=50
```

Signaux positifs :
- `✅ Connecté à MySQL`
- `MongoDB connecté` (ou avertissement si MongoDB absent — non bloquant)
- `Serveur backend démarré sur http://localhost:5001`

Signaux d'alerte :
- `ECONNREFUSED` (connexion refusée — DB pas encore prête, réessayer)
- `Error: Access denied for user` (problème de credentials MySQL)
- `Cannot find module` (dépendance manquante)

---

## 4. Commandes utiles pendant la mise en ligne

```bash
# Redémarrer un service sans rebuild
docker compose restart backend

# Rebuilder et relancer un seul service
docker compose up --build -d backend

# Inspecter un conteneur (shell interactif)
docker exec -it novademy_deploiement-backend-1 sh

# Vérifier les variables d'environnement injectées dans le conteneur
docker exec novademy_deploiement-backend-1 env | grep DB_

# Arrêt propre (données MySQL conservées)
docker compose down

# Arrêt + suppression complète (repart de zéro)
docker compose down -v
```

---

## 5. Retour arrière (rollback)

Si quelque chose ne va pas et qu'on veut revenir à l'état précédent :

```bash
# Arrêter les conteneurs
docker compose down

# Revenir au commit précédent
git log --oneline -5           # voir les commits récents
git checkout <hash-du-commit>  # revenir à ce commit

# Relancer
docker compose --env-file .env up --build -d
```

---

## 6. Checklist de fin de Séance 3

| # | Action | Fait ? |
|:-:|---|:-:|
| 1 | Code récupéré (clone ou pull) | ☐ |
| 2 | Fichier `backend/.env` créé et rempli | ☐ |
| 3 | Fichier `.env` racine créé pour Docker Compose | ☐ |
| 4 | Lancement `docker compose up --build -d` sans erreur | ☐ |
| 5 | Les 3 conteneurs sont `Up` (`docker compose ps`) | ☐ |
| 6 | Schéma MySQL importé | ☐ |
| 7 | Admin seedé (`node seedAdmin.js`) | ☐ |
| 8 | `http://localhost` → page d'accueil visible | ☐ |
| 9 | `http://localhost:5001/` → réponse JSON | ☐ |
| 10 | Connexion admin fonctionnelle | ☐ |
| 11 | Logs propres (pas d'erreurs en boucle) | ☐ |

---

## 7. Notes personnelles

> *À compléter pendant la mise en ligne avec les commandes réellement tapées, les erreurs rencontrées et comment elles ont été résolues.*

---

*Fin du fichier 17_plan_mise_en_ligne.md*
