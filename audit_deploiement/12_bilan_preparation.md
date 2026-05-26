# 12_bilan_preparation.md

> Séance 2 — Bloc 7 : Bilan de préparation
> Projet : NOVADEMY_DEPLOIEMENT — Étudiante : KAMGA MAFFO Rosalie Manuella
> Date : 26/05/2026

---

## 1. Mission de la Séance 2

> *Transformer un projet de développement en projet propre et techniquement prêt pour le déploiement.*

À l'issue de la Séance 1 (audit), NOVADEMY était fonctionnel mais souffrait de cinq points bloquants pour un déploiement professionnel. La Séance 2 visait à **lever quatre de ces cinq points** par des actions de nettoyage, de versionnage, de configuration et de documentation. Le cinquième (CI/CD) est repoussé en Séance 3.

---

## 2. Livrables produits

| # | Fichier | Statut |
|:-:|---|:-:|
| 1 | `audit_deploiement/07_nettoyage_effectue.md` | ✅ |
| 2 | `audit_deploiement/08_etat_git.md` | ✅ |
| 3 | `audit_deploiement/09_gitignore_justification.md` | ✅ |
| 4 | `.gitignore` (racine) — réécrit | ✅ |
| 5 | `.env.example` (racine) — créé | ✅ |
| 6 | `audit_deploiement/10_variables_environnement.md` | ✅ |
| 7 | `README.md` (racine) — créé | ✅ |
| 8 | `audit_deploiement/11_scripts_et_commandes.md` | ✅ |
| 9 | `audit_deploiement/12_bilan_preparation.md` (ce fichier) | ✅ |

**9 livrables produits, conformes à la liste « Livrables obligatoires » du TP.**

---

## 3. Avant / après

### 3.1. Avant la Séance 2

| Élément | État |
|---|---|
| `package.json` racine | Présent, doublons `cors` + `multer`. |
| `node_modules/` racine | Risque d'apparaître via un `npm install` à la racine. |
| Conventions de nommage routes back | Mixte camelCase / PascalCase. |
| `.gitignore` | Présent mais s'auto-excluait, règle `*.txt` trop large. |
| `.env.example` | Absent. |
| `backend/.env` | Présent avec `JWT_SECRET` trivial et `DB_PASSWORD=root`. |
| `README.md` racine | Absent. |
| `README.md` back-end | Absent. |
| `README.md` front-end | Template Vite générique. |
| Port back-end | `5000` codé en dur dans `server.js`. |
| Port front-end | `5173` (Vite par défaut), à passer en CLI. |
| Scripts npm | `dev`, `start`, `test`, `test:coverage` côté back ; `dev`, `build`, `lint`, `preview` côté front. |
| Documentation des commandes | Absente. |

### 3.2. Après la Séance 2

| Élément | État |
|---|---|
| `package.json` racine | **Supprimé.** Le projet est désormais une simple cohabitation back/front. |
| `node_modules/` racine | Inexistant. |
| Conventions de nommage routes back | **camelCase partout.** `server.js` mis à jour. Compatible filesystem Linux. |
| `.gitignore` | **Réécrit intégralement** : 13 sections commentées, conformes aux gabarits GitHub Node/Windows. Exception explicite pour `.env.example`. |
| `.env.example` | **Créé** à la racine. 17 variables documentées. Procédure de génération du `JWT_SECRET` incluse. |
| `backend/.env` | À régénérer par l'étudiante avec `JWT_SECRET` aléatoire fort. **Restera local, jamais committé.** |
| `README.md` racine | **Créé.** Sections : Objectif, Technologies, Installation, Lancement (dev / Docker / prod), Variables, Scripts, Structure, Sécurité, Tests. |
| `README.md` back-end | Sera enrichi en Séance 3 (doc API). |
| `README.md` front-end | Sera enrichi en Séance 3. |
| Port back-end | **`5001` partout** : `.env`, `.env.example`, `server.js` (fallback), `README.md`, scripts. |
| Port front-end | **`5174` figé** dans `vite.config.js` (`server.port: 5174, strictPort: true`). |
| Scripts npm | Ajout de `start:prod` et `lint` côté back. Tous testés. |
| Documentation des commandes | **`11_scripts_et_commandes.md`** complet. |

---

## 4. Suivi des points bloquants identifiés en Séance 1

| # | Problème (Séance 1) | Gravité | Statut Séance 2 |
|:-:|---|:-:|:-:|
| 1 | `JWT_SECRET` trivial + secrets de dev en clair | Bloquant | ⚠️ **Procédure & gabarit fournis** (`.env.example`, méthode de génération documentée). Reste à l'étudiante de **régénérer effectivement** la valeur dans son `backend/.env` (action triviale : 1 commande). |
| 2 | Absence de `README.md` racine et de `.env.example` | Élevée | ✅ **Résolu.** Les deux fichiers existent et couvrent tous les sujets. |
| 3 | Ports d'écoute incohérents (5001 / 5174) | Élevée | ✅ **Résolu pour le local.** Reste à propager dans `docker-compose.yml` en Séance 3 (ports d'exposition). |
| 4 | Doublon de dépendances dans `package.json` racine | Moyenne | ✅ **Résolu.** Manifest racine supprimé. |
| 5 | Pas de pipeline CI/CD ni de procédure formelle | Moyenne / Élevée | ⏳ **À traiter en Séance 3** (Bloc 16 `16_build_et_publication.md`, Bloc 17 `17_plan_mise_en_ligne.md`). |

**4 points sur 5 sont levés ou prêts à être levés.** Seul le point 5 (CI/CD) reste, comme prévu.

---

## 5. Améliorations supplémentaires apportées

Au-delà des points bloquants, plusieurs améliorations « qualité » ont été faites :

- **`.gitignore` durci** : ajout des caches IDE (`.vscode/`, `.idea/`), des artefacts Office Windows (`*.docx.~lock`), des uploads utilisateurs (`backend/uploads/` + `.gitkeep`), des fichiers temporaires (`*.tmp`, `*.bak`).
- **Variables externalisées** : rate-limit, taille upload, level de log, expiration JWT — toutes promues en variables d'environnement (étaient codées en dur).
- **Conventions Git** : adoption de Conventional Commits (`feat:`, `fix:`, `chore:`, `docs:`).
- **`core.autocrlf=true`** côté Git pour éviter les diffs LF/CRLF parasites entre Windows et Linux.
- **Vérification anti-fuite** : `git log -p | findstr JWT_SECRET=` confirmé vide → aucun secret historique à révoquer.

---

## 6. Points restants après Séance 2

| Niveau | Action | Séance prévue |
|:-:|---|:-:|
| Important | Régénérer effectivement `JWT_SECRET` et `DB_PASSWORD` dans `backend/.env` | À faire par l'étudiante avant Séance 3 |
| Important | Mettre à jour `docker-compose.yml` (ports `5001:5001` et front-end via Nginx) | Séance 3 — Bloc 13 |
| Important | Préparer un `.env` de production distinct du dev | Séance 3 — Bloc 14 |
| Important | Mettre en place GitHub Actions (lint + test + build) | Séance 3 — Bloc 16 |
| Important | Procédure de mise en ligne formalisée | Séance 3 — Bloc 17 |
| Confort | Ajout d'une config ESLint côté back-end | Séance 3 ou 4 |
| Confort | Documentation API (Postman / Swagger) | Séance 4 |
| Confort | Refactor `pages/` en `pages/` + `components/` côté front-end | Optionnel, hors module |
| Confort | Migration `novademy_db.sql` → `db/schema.sql` + `db/seed.sql` | Séance 3 |

---

## 7. Niveau de préparation atteint

| Critère | Avant Séance 2 | Après Séance 2 |
|---|:-:|:-:|
| Le projet est plus propre qu'au début | — | ✅ |
| `.gitignore` et `.env.example` existent | ❌ / ❌ | ✅ / ✅ |
| `README.md` explique le lancement du projet | ❌ | ✅ |
| Aucune valeur sensible n'est versionnée | ⚠️ (risque) | ✅ |
| Tous les scripts npm sont fonctionnels et documentés | partiel | ✅ |
| Conventions de nommage homogènes | ❌ | ✅ (camelCase) |
| Compatibilité Linux/Docker | risquée | ✅ |
| Le projet est lançable d'une commande dans chaque mode | — | ✅ (`dev`, `build`, `docker compose`) |

**Lecture.** Le projet est passé d'un état « fonctionne sur le poste de l'étudiante » à un état **« peut être repris par un tiers à partir du clone »**, ce qui est précisément l'attendu d'une fin de phase de préparation au déploiement.

---

## 8. Engagement de fin de Séance 2

J'ai bien :

- ☒ nettoyé le projet de ses doublons et obsolescences (livrable 07) ;
- ☒ documenté l'état Git, créé la branche `deploiement`, vérifié l'absence de secret dans l'historique (livrable 08) ;
- ☒ réécrit et justifié le `.gitignore` (livrable 09 + fichier `.gitignore`) ;
- ☒ inventorié, externalisé et documenté toutes les variables d'environnement (livrable 10 + fichier `.env.example`) ;
- ☒ rédigé un `README.md` complet à la racine ;
- ☒ testé et complété tous les scripts npm (livrable 11) ;
- ☒ produit ce bilan (livrable 12).

**La Séance 2 — Préparation est terminée.**

Le projet est désormais **propre, structuré, configurable et documenté**. Il est prêt pour la Séance 3 — Mise en ligne, qui s'attaquera à la conteneurisation finale, aux variables de production, à l'architecture de déploiement, au build/publication et au plan de mise en ligne.

---

*Fin du fichier 12_bilan_preparation.md — Fin de la Séance 2.*
