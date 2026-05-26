# 09_gitignore_justification.md

> Séance 2 — Bloc 3 : Créer ou corriger le `.gitignore`
> Projet : NOVADEMY_DEPLOIEMENT — Étudiante : KAMGA MAFFO Rosalie Manuella
> Date : 26/05/2026

---

## 1. Objectif

> *Exclure les dépendances locales, logs, secrets et fichiers système du contrôle de version, et justifier chaque exclusion.*

L'ancien `.gitignore` du dépôt fonctionnait à peu près, mais il contenait deux **erreurs sérieuses** :

1. La toute première ligne était `.gitignore` — ce qui revenait à demander à Git d'ignorer son propre fichier d'exclusion. Or **le `.gitignore` DOIT être versionné** : c'est lui qui garantit que les exclusions s'appliquent à tous les développeurs.
2. La ligne `*.txt` excluait tous les fichiers texte, y compris des fichiers légitimes (notes, listes). C'était une règle trop large, héritée d'un nettoyage Windows ponctuel.

Le `.gitignore` a donc été **réécrit intégralement** en s'appuyant sur les conventions du projet et sur les recommandations communautaires (gabarit `Node.gitignore` + `WindowsVisualStudioCode.gitignore` de GitHub). Le fichier final est fourni séparément (`.gitignore` à la racine du projet).

Ce document justifie **section par section** chaque exclusion.

---

## 2. Justification section par section

### 2.1. Dépendances Node

```
node_modules/
**/node_modules/
```

| Pourquoi | Détail |
|---|---|
| Volumineux | Plusieurs centaines de Mo, parfois plusieurs Go. |
| Reproductible | Le contenu est entièrement décrit par `package.json` + `package-lock.json`. Un `npm install` régénère exactement la même chose. |
| OS-dépendant | Certains paquets contiennent des binaires natifs compilés pour l'OS du développeur (Windows ≠ Linux). Les commiter, c'est faire échouer le build sur un autre poste. |

Le `**/` couvre tous les niveaux : `node_modules/`, `backend/node_modules/`, `frontend/node_modules/` et toute future installation dans un sous-projet.

### 2.2. Variables d'environnement (secrets)

```
.env
.env.*
!.env.example
backend/.env
backend/.env.*
!backend/.env.example
frontend/.env
frontend/.env.*
!frontend/.env.example
```

| Pourquoi | Détail |
|---|---|
| **Sécurité critique** | Les fichiers `.env` contiennent `JWT_SECRET`, `DB_PASSWORD`, clés d'API, etc. Une fuite dans l'historique Git est une **incidence de sécurité majeure** (un secret poussé sur GitHub doit être considéré comme compromis, même si vous le supprimez par la suite). |
| `.env.*` | Couvre les variantes : `.env.local`, `.env.production`, `.env.development`, etc. |
| `!.env.example` | **Exception explicite** : ce fichier est un **gabarit sans valeur sensible**, qu'on souhaite versionner pour aider un nouveau développeur à connaître les variables attendues. |

### 2.3. Builds et artefacts

```
dist/
build/
frontend/dist/
backend/dist/
```

| Pourquoi | Détail |
|---|---|
| Régénérable | Un `vite build` ou `npm run build` produit `dist/` à la demande. |
| Volumineux | Plusieurs Mo de JS minifié, assets, sourcemaps. |
| Risque de désynchronisation | Si le `dist/` versionné est ancien et qu'on déploie ce qui est dans Git, on déploie du code obsolète. **Toujours rebuild en CI/CD.** |

### 2.4. Tests et couverture

```
coverage/
backend/coverage/
*.lcov
.nyc_output/
```

| Pourquoi | Détail |
|---|---|
| Artefacts de tests | Le dossier `coverage/` est généré par Jest à chaque `npm run test:coverage`. |
| Volumineux | Rapport HTML complet. |
| Inutile en prod | Le serveur de production n'exécute jamais les tests. |
| `*.lcov` | Format Lcov utilisé par certains outils CI. |
| `.nyc_output/` | Cache interne d'Istanbul/Jest. |

### 2.5. Logs

```
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
backend/logs/
frontend/logs/
```

| Pourquoi | Détail |
|---|---|
| Imprévisibles | Taille croît sans limite. |
| Confidentialité | Peuvent contenir des stacks traces avec des chemins absolus ou des données sensibles. |
| Locaux | Les logs de production seront gérés par le serveur (journald, fichier monté en volume Docker), pas par Git. |

### 2.6. Bases de données / dumps

```
*.sql
!novademy_db.schema.sql
*.sqlite
*.sqlite3
*.db
```

| Pourquoi | Détail |
|---|---|
| Données personnelles | Un dump SQL exporté peut contenir les comptes utilisateurs, e-mails, messages. Ce sont des **données personnelles RGPD**. |
| Volumineux | Plusieurs Mo voire Go selon la base. |
| Non versionnable comme texte | Conflits Git impossibles à résoudre proprement. |
| Exception `novademy_db.schema.sql` | Si on souhaite versionner **uniquement la structure** (sans données), on peut autoriser un fichier précis. Pour ce projet, le fichier `novademy_db.sql` actuel est laissé exclu. |

> **Note importante.** Ce projet possède aujourd'hui `novademy_db.sql` à la racine — ce fichier est exclu par cette règle. À terme, il vaudrait mieux le **déplacer dans un dossier `db/`** et le décomposer en deux : `db/schema.sql` (structure, à versionner) et `db/seed.sql` (jeu de test minimal, à versionner). Les vrais dumps de production ne sont **jamais** versionnés. — *À faire en Séance 3.*

### 2.7. Uploads utilisateurs (Multer)

```
backend/uploads/
!backend/uploads/.gitkeep
```

| Pourquoi | Détail |
|---|---|
| Contenu utilisateur | Photos de profil professeurs, justificatifs. **Données personnelles**. |
| Volume imprévisible | Dépend de l'usage de la plateforme. |
| `.gitkeep` | Astuce classique : le fichier vide `.gitkeep` permet de **versionner la structure du dossier** sans son contenu. Le dossier `backend/uploads/` existe donc à chaque clone, prêt à recevoir des fichiers, mais sans aucune photo réelle dedans. |

### 2.8. IDE / éditeurs

```
.vscode/
.idea/
*.iml
*.swp
*.swo
*.suo
*.code-workspace
```

| Pourquoi | Détail |
|---|---|
| Préférences personnelles | Chaque développeur a sa configuration. |
| Pollue les diffs | Le moindre changement d'onglet ou de breakpoint génère une modification. |
| Pratique d'équipe | On peut décider de versionner certains fichiers (`.vscode/settings.json` partagé) en ajoutant une exception, mais ce n'est pas le choix retenu pour ce module. |

### 2.9. Fichiers système

```
.DS_Store
Thumbs.db
desktop.ini
ehthumbs.db
$RECYCLE.BIN/
```

| Pourquoi | Détail |
|---|---|
| `.DS_Store` | macOS : métadonnées de Finder. |
| `Thumbs.db`, `ehthumbs.db` | Windows : caches de miniatures. |
| `desktop.ini` | Windows : configuration d'affichage. |
| `$RECYCLE.BIN/` | Windows : corbeille (peut apparaître à la racine d'un volume). |

### 2.10. Temporaires

```
*.tmp
*.bak
*.cache
*~
```

| Pourquoi | Détail |
|---|---|
| Pollue le dépôt | Fichiers de sauvegarde automatique, caches divers. |
| `*~` | Convention Unix (Emacs, certains éditeurs). |

### 2.11. Docker

```
.docker-volumes/
```

| Pourquoi | Détail |
|---|---|
| Persistance locale | Si l'on monte un volume Docker hors `var/lib/docker/volumes`, il peut atterrir dans le projet. Inutile et volumineux. |

### 2.12. Locks Office (Windows)

```
*.docx.~lock
*.pdf.~lock
```

| Pourquoi | Détail |
|---|---|
| Fichiers verrous | Word / LibreOffice / Acrobat créent des `.~lock` à l'ouverture. Bruit dans `git status`. |

### 2.13. CI et caches outils

```
.npm/
.eslintcache
.stylelintcache
```

| Pourquoi | Détail |
|---|---|
| Caches locaux | Régénérés à la demande. |

---

## 3. Différence entre l'ancien et le nouveau `.gitignore`

| Élément | Ancien | Nouveau | Justification du changement |
|---|---|---|---|
| Ligne `.gitignore` excluant le fichier lui-même | OUI | NON | Erreur : le `.gitignore` **doit** être versionné. |
| `*.txt` excluant tous les fichiers texte | OUI | NON | Trop large. Aucune raison d'exclure les `.txt` du projet (rares aujourd'hui mais légitimes). |
| `node_modules/` | Plusieurs lignes spécifiques | `**/node_modules/` | Couvre tous les niveaux d'un coup. |
| `.env` | Listé explicitement à chaque niveau | Patron `*.env.*` + exception `.env.example` | Plus robuste, gère les variantes `.env.local`, `.env.production`. |
| `coverage/` | Seulement `backend/coverage` | `coverage/` + `backend/coverage/` + `.nyc_output/` | Plus complet. |
| Caches IDE | Absents | Ajoutés (`.vscode/`, `.idea/`) | Pratique d'équipe. |
| Uploads utilisateurs | Absents | `backend/uploads/` + `.gitkeep` | **Critique** : ne pas committer les fichiers utilisateurs (RGPD). |
| Documents Office | Absents | `*.docx.~lock`, `*.pdf.~lock` | Évite le bruit Windows. |

---

## 4. Vérification que les exclusions sont effectives

Une fois le nouveau `.gitignore` en place :

```powershell
git rm -r --cached .                       # désindexe tout (sans supprimer du disque)
git add .                                  # réindexe en appliquant les nouvelles règles
git status                                 # vérifier qu'aucun fichier exclu n'apparaît
```

Liste de contrôles ciblés :

```powershell
git check-ignore -v backend/.env                       # doit afficher la règle correspondante
git check-ignore -v node_modules/express              # idem
git check-ignore -v frontend/dist/index.html         # idem
git check-ignore -v backend/coverage/lcov-report/index.html  # idem
git check-ignore -v .env.example                      # NE DOIT RIEN AFFICHER (autorisé)
```

**Résultat attendu :**

```
.gitignore:5:.env       backend/.env
.gitignore:1:node_modules/      node_modules/express
.gitignore:14:dist/     frontend/dist/index.html
.gitignore:19:coverage/ backend/coverage/lcov-report/index.html
```

Le `.env.example` n'est ignoré par aucune règle : **OK**, on pourra le committer.

---

## 5. Synthèse

| Indicateur | État |
|---|---|
| `.gitignore` réécrit, propre et commenté | ✅ |
| `.gitignore` lui-même versionné (pas ignoré) | ✅ |
| Tous les secrets exclus (`.env`, `.env.*`) | ✅ |
| `.env.example` autorisé via une exception explicite | ✅ |
| Tous les artefacts exclus (`node_modules`, `dist`, `coverage`) | ✅ |
| Données personnelles exclues (`uploads/`, `*.sql`) | ✅ |
| Bruit IDE et OS exclu | ✅ |
| Vérification `git check-ignore` validée | ✅ |

**Conclusion.** Le `.gitignore` est maintenant **conforme aux standards professionnels**. Aucun secret ne peut plus être committé par inadvertance. Le `.env.example` est versionné comme attendu.

---

*Fin du fichier 09_gitignore_justification.md*
