# 19_bilan_mise_en_ligne.md

> Séance 3 — Bloc 7 : Bilan de mise en ligne
> Projet : NOVADEMY_DEPLOIEMENT — Étudiante : KAMGA MAFFO Rosalie Manuella
> Date : 26/05/2026

---

## 1. Mission de la Séance 3

> *Préparer et documenter la mise en ligne de NOVADEMY avec Docker Compose.*

La Séance 3 fait suite à la Séance 2 (projet propre, structuré, versionné) pour passer à l'étape concrète du déploiement. L'objectif était de définir et documenter comment les trois services (MySQL, Node.js, React/Nginx) peuvent tourner ensemble en production via Docker.

---

## 2. Livrables produits

| # | Fichier | Contenu | Statut |
|:-:|---|---|:-:|
| 1 | `audit_deploiement/13_architecture_deploiement.md` | Architecture Docker, 3 services, réseau interne | ✅ |
| 2 | `audit_deploiement/14_variables_production.md` | Variables à changer pour la prod, procédure de génération JWT | ✅ |
| 3 | `audit_deploiement/15_urls_et_connexions.md` | URLs front + API, connexions MySQL/MongoDB, CORS | ✅ |
| 4 | `audit_deploiement/16_build_et_publication.md` | Build Vite, Dockerfiles, Docker Compose | ✅ |
| 5 | `audit_deploiement/17_plan_mise_en_ligne.md` | Checklist ordonnée de déploiement | ✅ |
| 6 | `audit_deploiement/18_schema_deploiement_final.md` | Schéma ASCII, flux de données, réseau Docker | ✅ |
| 7 | `audit_deploiement/19_bilan_mise_en_ligne.md` | Ce fichier — synthèse de la séance | ✅ |

**7 livrables produits sur 7 attendus.**

---

## 3. Actions techniques réalisées en Séance 3

En plus de la documentation, plusieurs corrections techniques ont été apportées au projet :

### 3.1. Nettoyage complémentaire

| Action | Fichier concerné | Raison |
|---|---|---|
| Suppression `package.json` racine | `/package.json` | Doublon (`cors` + `multer` déjà dans `backend/package.json`) |
| Suppression `package-lock.json` racine | `/package-lock.json` | Lié au package.json supprimé |
| Suppression SVG Vite par défaut | `frontend/src/assets/react.svg`, `frontend/public/vite.svg` | Assets Vite génériques non utilisés dans le projet |

### 3.2. Correction des routes dupliquées

Dans `backend/server.js`, les routes `/api/teacher-planning` et `/api/student-planning` étaient enregistrées **deux fois** (lignes 121/123 et 127/128). La duplication a été retirée.

### 3.3. Suppression de logs sensibles ou de debug

| Fichier | Log retiré | Raison |
|---|---|---|
| `backend/controllers/announcementController.js` | `console.log("ANNOUNCEMENT BACKEND RECU :", req.body)` | Log de debug oublié, expose le body des requêtes |
| `backend/mongodb.js` | `console.log("MongoDB connecté :", uri)` | Affichait l'URI MongoDB complet (avec mot de passe potentiel) |

### 3.4. Scripts npm complétés (backend)

Ajout dans `backend/package.json` :
- `"start:prod"` : lance Node avec `NODE_ENV=production` (utilisé dans le Dockerfile)
- `"lint"` : ESLint côté back-end (préparation CI/CD Séance 4)

### 3.5. vite.config.js mis à jour

Ajout de `strictPort: true`, `host: true` et configuration du port preview `4173` — conformément à ce qui était documenté dans `11_scripts_et_commandes.md`.

---

## 4. Avant / après Séance 3

| Élément | Avant Séance 3 | Après Séance 3 |
|---|---|---|
| Architecture de déploiement | Non documentée | ✅ Documentée (3 services Docker) |
| Variables de production | Identiques au dev (non sécurisées) | ✅ Documentées et différenciées |
| Build front-end | Jamais testé en prod | ✅ Procédure validée (Vite → Nginx) |
| Dockerfiles | Présents mais non documentés | ✅ Expliqués et justifiés |
| Plan de mise en ligne | Inexistant | ✅ Checklist en 11 étapes |
| Schéma d'architecture | Inexistant | ✅ Schéma ASCII + flux de données |
| Routes dupliquées server.js | Présentes | ✅ Corrigées |
| Logs de debug | Présents | ✅ Retirés |
| `package.json` racine doublon | Encore présent | ✅ Supprimé |

---

## 5. Points restants pour la Séance 4

| Niveau | Action | Séance |
|---|---|---|
| Important | Exécuter réellement le `docker compose up --build` et valider | Séance 4 — Tests post-déploiement |
| Important | Importer `novademy_db.sql` dans le conteneur MySQL | Séance 4 |
| Important | Tester toutes les routes API après déploiement Docker | Séance 4 |
| Important | Régénérer effectivement `JWT_SECRET` dans le `.env` local | À faire avant Séance 4 |
| Confort | Ajouter un pipeline CI/CD GitHub Actions (lint + test + build) | Séance 4 |
| Confort | Documenter l'API (Postman ou Swagger) | Séance 4 |
| Confort | Monter `backend/uploads/` en volume Docker | Séance 4 ou optionnel |
| Confort | Ajouter MongoDB comme service Docker | Optionnel |

---

## 6. Récapitulatif des 3 séances

| Séance | Mission | Statut |
|---|---|---|
| **Séance 1** — Audit | Analyser l'état du projet, identifier les points bloquants | ✅ Terminé |
| **Séance 2** — Préparation | Nettoyer, versionner, documenter, configurer | ✅ Terminé |
| **Séance 3** — Mise en ligne | Architecture Docker, variables prod, build, plan de déploiement | ✅ Terminé |
| **Séance 4** — Validation | Tests post-déploiement, CI/CD, documentation API | À venir |

---

## 7. Engagement de fin de Séance 3

J'ai bien :

- ☒ défini et documenté l'architecture de déploiement avec Docker Compose (livrable 13) ;
- ☒ préparé les variables d'environnement de production (livrable 14) ;
- ☒ recensé toutes les URLs et vérifié les connexions MySQL/MongoDB/CORS (livrable 15) ;
- ☒ documenté le build Vite et le fonctionnement des Dockerfiles (livrable 16) ;
- ☒ rédigé un plan de mise en ligne étape par étape avec checklist (livrable 17) ;
- ☒ produit un schéma ASCII complet de l'architecture et des flux de données (livrable 18) ;
- ☒ corrigé les dernières imperfections techniques du code (logs, doublons, scripts) ;
- ☒ produit ce bilan (livrable 19).

**La Séance 3 — Mise en ligne est terminée.**

Le projet NOVADEMY est maintenant documenté de l'audit initial jusqu'à l'architecture de déploiement. Il reste la Séance 4 pour valider concrètement le tout avec des tests post-déploiement.

---

*Fin du fichier 19_bilan_mise_en_ligne.md — Fin de la Séance 3.*
