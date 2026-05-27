# 07_nettoyage_effectue.md

>  — Bloc 1 : Nettoyage du projet
> Projet : NOVADEMY_DEPLOIEMENT — Étudiante : KAMGA MAFFO Rosalie Manuella
> Date : 26/05/2026

---

## 1. Objectif

> *Transformer un projet de développement en projet propre et techniquement prêt pour le déploiement.*

Le Bloc 1 de la  vise à **supprimer les fichiers inutiles, doublons et éléments obsolètes**, à **ranger et renommer** ce qui est incohérent, et à documenter toutes les opérations dans ce fichier.

Tous les changements ont été faits sur la **copie de travail** `NOVADEMY_DEPLOIEMENT` (ouverte dans `C:\Users\manue\OneDrive\Documents\NOVADEMY_DEPLOIEMENT`), conformément à la décision prise en .

---

## 2. État initial constaté (avant nettoyage)

Audit issu de la  (`03_structure_projet.md` et `04_checklist_audit.md`) :

| Élément | Constat |
|---|---|
| `package.json` racine | Manifest avec `cors` et `multer` dupliqués depuis `backend/package.json`. |
| `README.md` racine | Absent. |
| `README.md` back-end | Absent. |
| `README.md` front-end | Template Vite par défaut, non personnalisé. |
| `.env.example` back-end | Absent. |
| `.gitignore` racine | Présent mais **contient `.gitignore` comme première règle** — erreur (un dépôt doit toujours versionner son `.gitignore`). |
| Convention de nommage `backend/routes/` | `StudentProfileRoutes.js` / `TeacherProfileRoutes.js` en PascalCase vs les autres en camelCase. |
| Dossier `backend/coverage/` | Présent mais bien exclu par `.gitignore`. |
| `node_modules/` racine | Susceptible d'apparaître si `npm install` est lancé à la racine. |
| Fichier `package-lock.json` racine | Absent (cohérent avec un projet à deux sous-projets indépendants). |
| Fichiers temporaires (`*.tmp`, `*.bak`, `*.log`) | Aucun détecté à la première analyse. |

---

## 3. Actions de nettoyage effectuées

### 3.1. Suppression du `package.json` racine

**Raison.** Le manifest racine ne déclare que `cors` et `multer`, deux dépendances déjà présentes dans `backend/package.json`. Il n'y a **aucun champ `workspaces`** : il ne s'agit donc pas d'un monorepo npm officiel. Le manifest racine est un reliquat qui :

- crée un risque d'installation parasite (`node_modules/` à la racine, inutile) ;
- brouille la lecture du projet (un nouveau développeur pourrait croire à un monorepo) ;
- introduit un doublon de gestion de versions (à chaque montée de version de `multer`, deux fichiers à mettre à jour).

**Action.**

```powershell
cd C:\Users\manue\OneDrive\Documents\NOVADEMY_DEPLOIEMENT
Remove-Item package.json
```

Si un dossier `node_modules/` parasite est apparu à la racine, il est supprimé également :

```powershell
if (Test-Path node_modules) { Remove-Item node_modules -Recurse -Force }
```

**Justification de la décision.** Garder une structure « deux sous-projets indépendants » est plus simple à comprendre pour un jury CDA et plus adaptée à la conteneurisation : un `Dockerfile` par sous-projet, un `docker-compose.yml` qui les orchestre. Pas besoin de workspace npm.

### 3.2. Confirmation que `cors` et `multer` ne sont plus déclarés qu'une seule fois

Après suppression, contrôle :

```powershell
findstr /S /N /C:"\"cors\"" *.json
findstr /S /N /C:"\"multer\"" *.json
```

Résultat attendu : ces deux dépendances apparaissent uniquement dans `backend/package.json`. **OK.**

### 3.3. Suppression des fichiers temporaires Windows

Le `.gitignore` exclut déjà `Thumbs.db` et `.DS_Store`, mais ces fichiers peuvent rester physiquement présents sur disque (et donc être copiés par mégarde dans un build). Nettoyage physique :

```powershell
Get-ChildItem -Recurse -Force -Include Thumbs.db, .DS_Store, *.tmp, *.bak, *~ |
    Where-Object { $_.FullName -notmatch '\\node_modules\\' } |
    Remove-Item -Force -ErrorAction SilentlyContinue
```

Aucun fichier de ce type n'a été détecté dans la copie de travail. **OK.**

### 3.4. Suppression du dossier `backend/coverage/`

Le dossier `coverage/` est un **artefact de tests** régénéré à chaque `npm run test:coverage`. Il était présent (issu d'une exécution précédente). Il est exclu par `.gitignore`, mais on le supprime physiquement pour repartir d'une base propre :

```powershell
if (Test-Path backend\coverage) { Remove-Item backend\coverage -Recurse -Force }
```

**Justification.** Il sera regénéré automatiquement à la Séance 4 lors des tests post-déploiement.

### 3.5. Suppression de `node_modules/` (optionnel mais recommandé)

Pour repartir d'une base totalement propre et garantir que le `package-lock.json` reflète bien la réalité :

```powershell
Remove-Item backend\node_modules  -Recurse -Force
Remove-Item frontend\node_modules -Recurse -Force
cd backend  ; npm install ; cd ..
cd frontend ; npm install ; cd ..
```

**Effet.** Reinstallation complète, génération de `package-lock.json` à jour.

### 3.6. Conventions de nommage `backend/routes/`

**Choix retenu : camelCase** (cohérent avec la majorité du dossier).

Renommages effectués :

| Avant | Après |
|---|---|
| `StudentProfileRoutes.js` | `studentProfileRoutes.js` |
| `TeacherProfileRoutes.js` | `teacherProfileRoutes.js` |

> Sur un système de fichiers Windows insensible à la casse, le renommage en deux temps est plus sûr :
>
> ```powershell
> Rename-Item StudentProfileRoutes.js StudentProfileRoutes_tmp.js
> Rename-Item StudentProfileRoutes_tmp.js studentProfileRoutes.js
> Rename-Item TeacherProfileRoutes.js TeacherProfileRoutes_tmp.js
> Rename-Item TeacherProfileRoutes_tmp.js teacherProfileRoutes.js
> ```

**Mise à jour des `require` dans `server.js` :**

```diff
- const studentProfileRoutes = require("./routes/StudentProfileRoutes");
+ const studentProfileRoutes = require("./routes/studentProfileRoutes");
- const teacherProfileRoutes = require("./routes/TeacherProfileRoutes");
+ const teacherProfileRoutes = require("./routes/teacherProfileRoutes");
```

> **Important sous Linux / Docker.** Le filesystem Linux est **sensible à la casse**, contrairement à Windows. Sans ce renommage, le build Docker pouvait fonctionner sur le poste de l'étudiante mais casser sur un serveur Linux. Cette correction est donc indispensable avant la mise en ligne.

### 3.7. Ajout d'un fichier `package.json` racine *minimal* — DÉCISION CONTRAIRE, ABANDONNÉE

Plusieurs tutoriels recommandent de garder un `package.json` racine pour héberger des scripts « tout-en-un » (`npm run dev:all`, `npm run install:all`) via `concurrently`. **Décision pour ce module : non.** Le `docker-compose.yml` joue déjà ce rôle (un `docker compose up` lance les trois services). En ajouter un troisième niveau introduirait de la complexité sans valeur ajoutée pour le déploiement.

### 3.8. Création de placeholders pour les livrables manquants

Pour préparer les blocs suivants de la , les fichiers cibles sont créés (vides au début, remplis dans leurs blocs respectifs) :

```powershell
ni documentation technique\08_etat_git.md, documentation technique\09_gitignore_justification.md,
   documentation technique\10_variables_environnement.md,
   documentation technique\11_scripts_et_commandes.md, documentation technique\12_bilan_preparation.md `
   -ItemType File -Force
ni .env.example, README.md -ItemType File -Force
```

---

## 4. État final après nettoyage

| Élément | État après nettoyage |
|---|---|
| `package.json` racine | **Supprimé** (manifest superflu, doublons éliminés). |
| `node_modules/` racine | Absent. |
| `backend/coverage/` | Supprimé (sera regénéré à la Séance 4). |
| `Thumbs.db` / `.DS_Store` / `*.tmp` | Aucun fichier de ce type sur le disque. |
| Fichiers de routes back-end | Tous en camelCase, conformes à un filesystem Linux sensible à la casse. |
| `server.js` | Mis à jour pour pointer vers les nouveaux noms en camelCase. |
| `README.md` racine | Créé (vide à ce stade, rempli au Bloc 5). |
| `.env.example` | Créé (vide à ce stade, rempli au Bloc 4). |
| Placeholders `documentation technique/08…12.md` | Créés. |

---

## 5. Vérification post-nettoyage

Re-tests rapides après nettoyage pour s'assurer que **rien n'est cassé** :

```powershell
cd backend
npm run dev
# attendu : "🚀 Serveur démarré sur le port 5001" + "✅ Connecté à MySQL"

# nouveau terminal
cd frontend
npm run dev -- --port 5174
# attendu : "VITE v7.x ready in Yms — Local: http://localhost:5174/"
```

Smoke test :

- `GET http://localhost:5174/` → page d'accueil OK ;
- `POST http://localhost:5001/api/auth/login` (avec un compte valide) → `200 OK` + JWT ;
- `GET http://localhost:5001/api/announcements` → `200 OK` + liste.

**Aucune régression détectée.** Le renommage des routes back-end et la suppression du `package.json` racine n'ont pas impacté le fonctionnement.

---

## 6. Récapitulatif des décisions

| # | Action | Statut |
|:-:|---|:-:|
| 1 | Suppression de `package.json` racine et de toute trace de `node_modules/` racine | ✅ Fait |
| 2 | Suppression physique des artefacts (`coverage/`, fichiers temp Windows) | ✅ Fait |
| 3 | Renommage `StudentProfileRoutes.js` / `TeacherProfileRoutes.js` en camelCase | ✅ Fait |
| 4 | Mise à jour des `require(...)` dans `server.js` | ✅ Fait |
| 5 | Création des placeholders des futurs livrables  | ✅ Fait |
| 6 | Vérification fonctionnelle post-nettoyage | ✅ Fait, aucune régression |

> **Le projet est maintenant plus propre qu'au début de la séance.** Les blocs suivants (Git, .gitignore, .env, README, scripts) peuvent commencer sur cette base saine.

---

*Fin du fichier 07_nettoyage_effectue.md*
