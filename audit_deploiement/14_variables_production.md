# 14_variables_production.md

> Séance 3 — Bloc 2 : Variables d'environnement de production
> Projet : NOVADEMY_DEPLOIEMENT — Étudiante : KAMGA MAFFO Rosalie Manuella
> Date : 26/05/2026

---

## 1. Objectif

> *Préparer des variables d'environnement adaptées à la production, différentes du développement.*

En développement, on accepte des valeurs simples (`root`, `localhost`, etc.) parce que seule l'étudiante y a accès. En production, les mêmes variables doivent être beaucoup plus strictes : mots de passe forts, secrets aléatoires, et aucune valeur par défaut non sécurisée.

Ce document liste les variables à changer entre dev et prod, et explique pourquoi.

---

## 2. Rappel : variables actuelles en développement

Fichier `backend/.env` local (jamais versionné) :

```env
PORT=5001
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=root
DB_NAME=novademy_deploiement
JWT_SECRET=novademy_deploiement_secret_key_2026
EMAIL_USER=manuellakamga20@gmail.com
EMAIL_PASS=wqjm pnpa mfan sylg
FRONTEND_URL=http://localhost:5174
MONGO_URI=mongodb://localhost:27017/novademy_deploiement
```

Plusieurs de ces valeurs sont **inacceptables en production** :
- `DB_PASSWORD=root` → trivial, attaqué en quelques secondes
- `JWT_SECRET=novademy_deploiement_secret_key_2026` → prévisible, trop court
- `DB_USER=root` → l'utilisateur root a tous les droits sur toutes les bases
- `FRONTEND_URL=http://localhost:5174` → ne correspond pas à un vrai domaine de prod

---

## 3. Différences entre dev et production

| Variable | Valeur dev | Valeur prod attendue | Raison du changement |
|---|---|---|---|
| `PORT` | `5001` | `5001` | Identique (port interne Docker) |
| `NODE_ENV` | `development` | `production` | Active les optimisations Express, désactive les stack traces |
| `DB_HOST` | `localhost` | `db` | Dans Docker Compose, le service MySQL s'appelle `db` |
| `DB_USER` | `root` | `novademy_app` | Ne jamais utiliser root en prod |
| `DB_PASSWORD` | `root` | Mot de passe fort (24+ caractères) | Sécurité critique |
| `DB_NAME` | `novademy_deploiement` | `novademy_deploiement` | Identique |
| `JWT_SECRET` | Valeur courte et prévisible | 96 caractères hex aléatoires | Secret le plus critique du projet |
| `FRONTEND_URL` | `http://localhost:5174` | `http://localhost` (Docker) | Front servi par Nginx sur le port 80 |
| `MONGO_URI` | `mongodb://localhost:...` | `mongodb://localhost:...` | MongoDB hors Docker pour ce module |
| `EMAIL_PASS` | Mot de passe application Gmail | Idem ou service SMTP dédié | Peut rester le même pour ce module |

---

## 4. Variables à régénérer obligatoirement avant la mise en ligne

### 4.1. `JWT_SECRET` — priorité maximale

Le `JWT_SECRET` actuel est lisible dans le fichier `.env`. N'importe qui qui y aurait accès pourrait forger des tokens valides et se connecter en tant qu'admin.

Commande de génération (à lancer dans le terminal) :

```bash
node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
```

Exemple de résultat (ne jamais utiliser cette valeur exacte, c'est juste pour illustrer) :
```
a3f8c2d1e9b456f7a0c3d2e1f8a9b0c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1
```

→ Coller cette valeur dans `JWT_SECRET=` du fichier `.env` de production.

### 4.2. `DB_PASSWORD` — à renforcer

En développement, `root` est utilisé pour simplifier. En production, générer un mot de passe fort :

```bash
node -e "console.log(require('crypto').randomBytes(16).toString('base64url'))"
```

Exemple : `xK9mP2nQ4rT7vW0y`

### 4.3. `DB_USER` — créer un utilisateur dédié

Au lieu de `root`, créer un utilisateur MySQL `novademy_app` avec uniquement les droits nécessaires :

```sql
CREATE USER 'novademy_app'@'%' IDENTIFIED BY 'votre_mot_de_passe_fort';
GRANT SELECT, INSERT, UPDATE, DELETE ON novademy_deploiement.* TO 'novademy_app'@'%';
FLUSH PRIVILEGES;
```

> Pour ce module (Docker local), on garde `root` pour simplifier. Mais cette étape est documentée car elle serait obligatoire sur un vrai serveur.

---

## 5. Fichier `.env` de production (gabarit)

Ce fichier doit rester **sur le serveur uniquement**, jamais sur GitHub. Pour Docker Compose, on le passe avec `--env-file` :

```bash
docker compose --env-file .env.production up -d
```

Contenu type du `.env.production` (valeurs fictives pour la doc — à remplacer) :

```env
# SERVEUR
PORT=5001
NODE_ENV=production

# CORS
FRONTEND_URL=http://localhost

# BASE DE DONNÉES MYSQL
DB_HOST=db
DB_USER=root
DB_PASSWORD=__mot_de_passe_fort_ici__
DB_NAME=novademy_deploiement
DB_ROOT_PASSWORD=__mot_de_passe_root_ici__

# JWT
JWT_SECRET=__96_caracteres_hex_generes_aleatoirement__
JWT_EXPIRES_IN=7d

# MONGODB
MONGO_URI=mongodb://localhost:27017/novademy_deploiement

# EMAIL
EMAIL_USER=manuellakamga20@gmail.com
EMAIL_PASS=__mot_de_passe_application_gmail__
```

---

## 6. Variable `DB_ROOT_PASSWORD` dans docker-compose.yml

Le `docker-compose.yml` utilise `${DB_ROOT_PASSWORD}` pour initialiser MySQL. Cette variable doit donc être présente dans le fichier `.env` passé à Docker Compose.

```yaml
db:
  image: mysql:8.0
  environment:
    MYSQL_ROOT_PASSWORD: ${DB_ROOT_PASSWORD}
    MYSQL_DATABASE: ${DB_NAME}
```

En dev, on a mis `DB_ROOT_PASSWORD=root` dans le `.env` racine. En production, mettre une valeur forte.

---

## 7. Règles de gestion des variables en production

1. **Ne jamais committer** de fichier `.env` de production (`.gitignore` le confirme).
2. **Ne jamais partager** les valeurs de production par e-mail ou messagerie non chiffrée.
3. **Régénérer** les secrets (JWT, DB password) si on soupçonne qu'ils ont été exposés.
4. **Différencier** les valeurs entre dev, staging et prod — un secret commun à tous les environnements est un anti-pattern.
5. **Versionner** uniquement le gabarit `.env.example` (sans valeurs sensibles).

---

## 8. Synthèse

| Variable | Statut en prod |
|---|---|
| `JWT_SECRET` | ⚠️ **À régénérer** — valeur dev trop courte |
| `DB_PASSWORD` | ⚠️ **À renforcer** — `root` inacceptable en prod |
| `NODE_ENV` | ✅ Passer à `production` |
| `DB_HOST` | ✅ Passer à `db` (service Docker) |
| `FRONTEND_URL` | ✅ Passer à `http://localhost` (Nginx port 80) |
| `DB_USER` | À terme : créer `novademy_app`, pour ce module `root` accepté |
| `EMAIL_PASS` | Peut rester le mot de passe d'application Gmail |
| `MONGO_URI` | Identique pour ce module |

---

*Fin du fichier 14_variables_production.md*
