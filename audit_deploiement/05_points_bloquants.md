# 05_points_bloquants.md

>  — Bloc 5 : Points bloquants identifiés
> Projet : NOVADEMY — Étudiante : KAMGA MAFFO Rosalie Manuella
> Date : 26/05/2026

---

## Méthode

À l'issue de la grille d'audit (`04_checklist_audit.md`), j'ai retenu les **5 problèmes prioritaires** qui empêcheraient une mise en production sereine si on ne les corrigeait pas. Pour chacun, je précise :

1. la **description précise** du problème,
2. l'**impact** sur le projet et le déploiement,
3. l'**action prévue** (séance de traitement et type de livrable),
4. la **gravité** (Bloquant / Élevé / Moyen).

Les points sont classés du plus urgent au moins urgent.

---

## Problème 1 — `JWT_SECRET` trivial et secrets de développement en clair

**Description.** Le fichier `backend/.env` contient :

```
JWT_SECRET=novademy_secret_key_2024
DB_PASSWORD=root
```

Ces deux valeurs sont des **secrets de développement faciles à deviner**. Le `JWT_SECRET` sert à signer **tous** les tokens d'authentification de la plateforme : si un attaquant le retrouve (ou le devine), il peut forger un token valide pour n'importe quel utilisateur, **y compris un administrateur**.

**Impact.**

- **Sécurité critique** : compromission totale possible de l'authentification.
- **Conformité RGPD** : NOVADEMY manipule des données personnelles (mineurs, élèves, professeurs). Un secret faible est une faille majeure.
- **Mise en ligne impossible en l'état** : aucun déploiement de production ne doit partir avec ces valeurs.

**Action prévue.**

- ** — Bloc 10 `10_variables_environnement.md`** : générer un `JWT_SECRET` aléatoire de 64+ caractères (par exemple via `node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"`), créer un `.env.example` listant toutes les variables avec des valeurs placeholders (jamais de vraie valeur), documenter dans le `README` les commandes de génération.
- **** : injecter le vrai `JWT_SECRET` côté serveur de production via les variables d'environnement du conteneur (jamais commité), et utiliser un mot de passe MySQL fort distinct de celui de développement.

**Gravité : BLOQUANT pour la mise en ligne.**

---

## Problème 2 — Absence de `README.md` racine et de `.env.example`

**Description.** Le dépôt ne contient ni `README.md` à la racine, ni `README.md` côté `backend/`, ni `.env.example`. Le seul `README.md` présent est celui généré par Vite côté `frontend/`, qui est le template par défaut.

**Impact.**

- **Reprise du projet impossible par un tiers** sans tutoriel personnel. Un nouveau développeur (ou un correcteur) ne sait pas :
  - quels logiciels installer ;
  - quelles variables d'environnement renseigner ;
  - quelles commandes lancer (en local, en Docker, en production) ;
  - quelles URLs et quels endpoints sont exposés.
- **Module Déploiement** : le `.gitignore` exclut le `.env`, donc cloner le dépôt sans `.env.example` rend le projet **non démarrable**.
- **Critère explicite** de la grille d'audit (« Le README existe » → NON aujourd'hui).

**Action prévue.**

- ** — Bloc 10 `10_variables_environnement.md`** : créer `backend/.env.example` avec la liste complète des variables, leur description et un exemple non sensible.
- ** — Bloc 11 `11_scripts_et_commandes.md`** : créer un `README.md` racine couvrant : présentation du projet, stack, prérequis, démarrage local, démarrage Docker, variables d'environnement, scripts disponibles, FAQ.
- ** — Bloc 11** : créer un `backend/README.md` détaillant les endpoints API et un `frontend/README.md` enrichi (ne pas laisser le template Vite).

**Gravité : ÉLEVÉE.**

---

## Problème 3 — Ports d'écoute incohérents entre `.env`, `vite.config.js` et `docker-compose.yml`

**Description.** Pour ce module, j'ai décidé d'utiliser :

- back-end : **port 5001** (au lieu de 5000) ;
- front-end : **port 5174** (au lieu de 5173).

Or :

- le `backend/.env` a bien été passé à `PORT=5001`, **mais** `server.js` contient encore `const PORT = process.env.PORT || 5000;` — le fallback est obsolète ;
- le `frontend/vite.config.js` **n'a pas** de propriété `server.port`, le port est à passer en CLI à chaque démarrage (`--port 5174`) — risque d'oubli ;
- le `docker-compose.yml` mappe encore `"5000:5000"` pour le back-end et `"80:80"` pour le front-end : tant qu'on n'a pas mis à jour ces mappages, **le déploiement par Docker ne respectera pas les ports décidés**.

**Impact.**

- Confusion entre développeurs : le projet semble écouter sur le port 5000 alors qu'on le lance sur 5001.
- Comportement non déterministe selon l'environnement (local sans Docker vs Docker vs production derrière reverse proxy).
- **Mise en ligne non reproductible** : ce qui marche en local ne marchera pas dans le conteneur, et inversement.

**Action prévue.**

- ** — Bloc 11 `11_scripts_et_commandes.md`** :
  - changer le fallback de `server.js` à `5001` ;
  - ajouter `server: { port: 5174, host: true }` dans `vite.config.js` ;
  - documenter ces ports dans le `README` racine.
- ** — Bloc 13 `13_architecture_deploiement.md` + Bloc 14 `14_variables_production.md`** : mettre à jour le `docker-compose.yml` (mapping `"5001:5001"` côté back, `"5174:80"` ou `"80:80"` côté front selon le reverse proxy choisi) et fournir un `.env` de production cohérent.

**Gravité : ÉLEVÉE** (pas bloquante pour le local mais elle l'est pour le déploiement reproductible).

---

## Problème 4 — Doublon de dépendances dans le `package.json` racine

**Description.** Le `package.json` à la racine du projet contient :

```json
{
  "dependencies": {
    "cors": "^2.8.6",
    "multer": "^2.1.1"
  }
}
```

Or `cors` et `multer` sont **déjà** déclarés et utilisés dans `backend/package.json`. Le `package.json` racine est probablement un reliquat d'une étape antérieure ; il est inutile et trompeur.

**Impact.**

- **Bruit dans le dépôt** : un outil d'audit (`npm audit`, `npm outdated`) trouvera deux fois les mêmes dépendances.
- **Risque d'installation parasite** : un `npm install` à la racine installe `cors` et `multer` dans un `node_modules/` racine qui n'est utilisé par personne.
- **Lecture du projet brouillée** : un nouveau venu peut croire qu'il existe un workspace npm (monorepo), alors qu'aucun champ `workspaces` n'est défini.

**Action prévue.**

- ** — Bloc 7 `07_nettoyage_effectue.md`** : soit supprimer purement le `package.json` racine, soit le transformer en un vrai manifest de workspace si on souhaite à terme un monorepo (`workspaces: ["backend", "frontend"]`). Décision la plus simple pour le module : **suppression** et documentation de la décision dans le bilan de nettoyage.

**Gravité : MOYENNE.**

---

## Problème 5 — Pas de pipeline CI/CD ni de procédure de mise en production formalisée

**Description.** Aucun fichier `.github/workflows/*.yml`, aucun `Jenkinsfile`, aucun script de déploiement (`deploy.sh`, Ansible…). La conteneurisation est en place via Docker Compose, mais **rien n'automatise** la chaîne complète « lint → test → build → push image → déploiement ». Aujourd'hui, déployer reviendrait à se connecter en SSH sur le serveur et lancer manuellement `docker compose up -d` — c'est faisable, mais cela n'est ni traçable, ni reproductible.

**Impact.**

- **Erreur humaine** : à chaque mise en ligne, risque d'oublier une étape (build, migration BDD, restart Nginx).
- **Aucun garde-fou qualité** : un commit qui casse les tests peut être déployé sans alerte.
- **Critère DevOps** du référentiel CDA : un projet professionnel attend a minima un workflow d'intégration continue.
- **Suivi des versions** : pas de mécanisme pour étiqueter une version (`v1.0.0`) et revenir en arrière en cas de problème.

**Action prévue.**

- ** — Bloc 13 `13_architecture_deploiement.md`** : décrire l'architecture cible (registre Docker, serveur de prod, Nginx + Let's Encrypt, sauvegardes MySQL).
- ** — Bloc 16 `16_build_et_publication.md`** : ajouter un workflow GitHub Actions minimum couvrant `lint → test → build images Docker → publication` et documenter le déclencheur (push sur `main`, ou release tag).
- ** — Bloc 17 `17_plan_mise_en_ligne.md`** : formaliser la procédure pas-à-pas de mise en ligne.

**Gravité : MOYENNE → ÉLEVÉE pour un projet « professionnel ».**

---

## Tableau récapitulatif

| # | Problème | Gravité | Séance de traitement | Livrable principal |
|:-:|---|:-:|:-:|---|
| 1 | `JWT_SECRET` trivial + secrets de dev en clair | **Bloquant** |  +  | `10_variables_environnement.md`, `14_variables_production.md` |
| 2 | Absence de `README.md` racine et de `.env.example` | Élevée |  | `10_variables_environnement.md`, `11_scripts_et_commandes.md` |
| 3 | Ports d'écoute incohérents (5001 / 5174) | Élevée |  +  | `11_scripts_et_commandes.md`, `13_architecture_deploiement.md` |
| 4 | Doublon de dépendances dans `package.json` racine | Moyenne |  | `07_nettoyage_effectue.md` |
| 5 | Pas de pipeline CI/CD ni de procédure formelle | Moyenne / Élevée |  | `13_architecture_deploiement.md`, `16_build_et_publication.md`, `17_plan_mise_en_ligne.md` |

---

## En résumé

Aucun de ces 5 points n'empêche aujourd'hui le projet de **tourner en local** (le smoke test de la  a réussi). En revanche, **tous les 5 doivent être levés avant de mettre NOVADEMY en ligne**, et 3 d'entre eux (problèmes 1, 2, 3) seront traités dès la  — Préparation.

---

*Fin du fichier 05_points_bloquants.md*
