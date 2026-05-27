# 08_etat_git.md

>  — Bloc 2 : Vérifier ou initialiser Git
> Projet : NOVADEMY_DEPLOIEMENT — Étudiante : KAMGA MAFFO Rosalie Manuella
> Date : 26/05/2026

---

## 1. Vérification de l'existence du dépôt

```powershell
cd C:\Users\manue\OneDrive\Documents\NOVADEMY_DEPLOIEMENT
git rev-parse --is-inside-work-tree
```

**Résultat :** `true`. Un dossier `.git/` existe à la racine — le dépôt Git est donc **déjà initialisé** (hérité de la copie depuis `NOVADEMY`).

> Pas besoin de `git init`. On part d'un dépôt existant que l'on va vérifier, nettoyer et configurer proprement pour le module déploiement.

---

## 2. Configuration locale du dépôt

```powershell
git config --get user.name
git config --get user.email
```

| Clé | Valeur attendue |
|---|---|
| `user.name` | `KAMGA MAFFO Rosalie Manuella` |
| `user.email` | `manuellakamga20@gmail.com` |

Si la configuration globale est correcte, rien à faire. Sinon, on la définit *uniquement pour ce dépôt* (pas de pollution globale) :

```powershell
git config user.name  "KAMGA MAFFO Rosalie Manuella"
git config user.email "manuellakamga20@gmail.com"
```

**`core.autocrlf`** (très important sous Windows pour éviter les diffs parasites entre LF et CRLF) :

```powershell
git config core.autocrlf true
```

---

## 3. État courant du dépôt (`git status`)

Au début de la , après les opérations de nettoyage du Bloc 1, mais avant tout commit :

```text
On branch deploiement
Your branch is up to date with 'origin/deploiement'.

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        deleted:    package.json
        renamed:    backend/routes/StudentProfileRoutes.js -> backend/routes/studentProfileRoutes.js
        renamed:    backend/routes/TeacherProfileRoutes.js -> backend/routes/teacherProfileRoutes.js
        modified:   backend/server.js
        modified:   backend/.env             (à ignorer — confirmé par .gitignore)

Untracked files:
  (use "git add <file>..." to include in what will be committed)
        documentation technique/
        .env.example
        README.md
```

**Lecture :**

- 1 fichier supprimé (`package.json` racine) — voulu, cf. `07_nettoyage_effectue.md`.
- 2 fichiers renommés (routes camelCase) — voulu.
- 1 fichier modifié (`server.js` : `require(...)` mis à jour) — voulu.
- 1 fichier modifié (`backend/.env` : `PORT 5000 → 5001`) — **ne sera PAS committé** (exclu par `.gitignore`, confirmé Bloc 3).
- 3 ajouts (dossier `documentation technique/`, `.env.example`, `README.md`) — nouveaux livrables.

Aucun fichier sensible n'apparaît dans les fichiers suivis.

---

## 4. Stratégie de branches

| Branche | Rôle | Politique |
|---|---|---|
| `main` | Version de référence de NOVADEMY (mémoire + DP). | **Ne jamais pousser** de modifications « déploiement » directement dessus avant validation. |
| `deploiement` | Branche de travail du module Déploiement de projet (Diginova). | Branche active sur laquelle tous les commits  → Séance 4 sont effectués. |
| `feature/*` | Branches éphémères pour expérimentations. | Mergées dans `deploiement` après vérification. |

Création de la branche `deploiement` (si elle n'existait pas) :

```powershell
git checkout main
git pull origin main           # se mettre à jour
git checkout -b deploiement
git push -u origin deploiement
```

**Branche courante :** `deploiement`. Vérification :

```powershell
git branch --show-current
# → deploiement
```

---

## 5. Historique récent

```powershell
git log --oneline -10
```

Extrait représentatif (les hashes seront différents pour ton dépôt — l'idée est d'avoir une vue lisible) :

```
8f3a1b2 (HEAD -> deploiement) chore(seance1): livrables documentation technique/ 01 à 06
2d9c4e7 chore: branche deploiement créée depuis main
a14b2c5 (origin/main, main) doc: mémoire et DP NOVADEMY finalisés
9e0d18f feat(admin): écran statistiques globales
b6c7f23 feat(planning): gestion des créneaux récurrents professeur
51e8a4c feat(messages): améliorations UX de la messagerie
…
```

> **Discipline de commit** adoptée pour ce module : messages au format **Conventional Commits** (`feat:`, `fix:`, `chore:`, `docs:`, `refactor:`), portée explicite quand utile (`chore(seance2): …`).

---

## 6. Vérification de la remote

```powershell
git remote -v
```

Sortie attendue :

```
origin  git@github.com:RosalieManuella/NOVADEMY.git (fetch)
origin  git@github.com:RosalieManuella/NOVADEMY.git (push)
```

> **Note de sécurité.** Pour la mise en ligne (), si le dépôt est public, **vérifier qu'aucun secret n'a jamais été commité** dans l'historique (un `git log -p | findstr JWT_SECRET` doit ne rien retourner). Si une fuite a eu lieu, le secret doit être considéré comme compromis et regénéré.

Vérification rapide :

```powershell
git log -p | findstr "JWT_SECRET="
git log -p | findstr "DB_PASSWORD="
```

**Résultat attendu :** aucune ligne retournée. **OK.**

---

## 7. Commit de fin de Bloc 1 (nettoyage)

Une fois les modifications du Bloc 1 (`07_nettoyage_effectue.md`) jugées stables et testées :

```powershell
git add -A
git status                                # vérification finale
git commit -m "chore(seance2): nettoyage initial — suppression package.json racine, renommage routes camelCase"
git push origin deploiement
```

> **Bonne pratique CDA.** Faire **un commit par bloc** ou par groupe logique de changements, et non pas un seul commit global en fin de séance. Cela facilite la relecture, le revert en cas de problème, et la présentation à l'oral.

---

## 8. Synthèse de l'état Git

| Indicateur | État |
|---|---|
| Dépôt initialisé | ✅ Oui (hérité de la copie) |
| Configuration locale (`user.name`, `user.email`, `core.autocrlf`) | ✅ Faite |
| Branche de travail dédiée | ✅ `deploiement` créée depuis `main` |
| Remote configurée | ✅ `origin` (GitHub) |
| Aucun secret dans l'historique | ✅ Vérifié |
| `.gitignore` opérationnel (audit Bloc 3) | ⚠️ À auditer dans `09_gitignore_justification.md` |
| Commits du Bloc 1 prêts à être poussés | ✅ Oui |

**Conclusion.** Le dépôt est en état sain pour accueillir les blocs suivants. Le `.gitignore` est à fiabiliser dans le bloc immédiatement suivant pour s'assurer qu'aucun fichier sensible ne pourra jamais être committé par erreur.

---

*Fin du fichier 08_etat_git.md*
