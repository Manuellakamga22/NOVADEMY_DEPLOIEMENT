# 20_tests_post_deploiement.md

> Séance 4 — Bloc 1 : Tests post-déploiement
> Projet : NOVADEMY_DEPLOIEMENT — Étudiante : KAMGA MAFFO Rosalie Manuella
> Date : 27/05/2026

---

## 1. Objectif

> *Vérifier que l'application fonctionne correctement après déploiement Docker Compose.*

Avant de valider le déploiement, il faut tester chaque partie de l'application : infrastructure Docker, API, base de données, et fonctionnalités principales côté front-end.

---

## 2. Tests d'infrastructure Docker

| # | Test | Commande | Résultat attendu | Statut |
|:-:|---|---|---|:-:|
| 1 | Les 3 conteneurs démarrent | `docker compose up --build -d` | Pas d'erreur à la construction | ✅ |
| 2 | État des conteneurs | `docker compose ps` | db: healthy, backend: Up, frontend: Up | ✅ |
| 3 | Logs backend sans erreur | `docker compose logs backend` | `✅ Connecté à MySQL` visible | ✅ |
| 4 | Logs base de données | `docker compose logs db` | MySQL prêt à accepter des connexions | ✅ |
| 5 | Volume MySQL persistant | `docker compose down && docker compose up -d` | Les données MySQL sont conservées | ✅ |

---

## 3. Tests de l'API back-end

### 3.1. Vérifications de base

| # | Test | Requête | Résultat attendu | Statut |
|:-:|---|---|---|:-:|
| 6 | API en ligne | `GET http://localhost:5001/` | `{"message":"API NOVADEMY en ligne"}` | ✅ |
| 7 | Route inexistante | `GET http://localhost:5001/api/xyz` | 404 | ✅ |
| 8 | Route protégée sans token | `GET http://localhost:5001/api/teacher-planning` | 401 Unauthorized | ✅ |

### 3.2. Authentification

| # | Test | Requête | Résultat attendu | Statut |
|:-:|---|---|---|:-:|
| 9 | Inscription élève | `POST /api/auth/register` | 201 + message succès | ✅ |
| 10 | Connexion valide | `POST /api/auth/login` | 200 + token JWT | ✅ |
| 11 | Connexion mauvais MDP | `POST /api/auth/login` | 401 | ✅ |
| 12 | Token invalide sur route protégée | — | 401 | ✅ |

### 3.3. Fonctionnalités métier

| # | Test | Requête | Résultat attendu | Statut |
|:-:|---|---|---|:-:|
| 13 | Liste des annonces | `GET /api/announcements` | 200 + tableau JSON | ✅ |
| 14 | Liste des profs | `GET /api/teachers` | 200 + tableau JSON | ✅ |
| 15 | Créer une annonce (prof connecté) | `POST /api/announcements` + JWT | 201 | ✅ |
| 16 | Planning élève | `GET /api/student-planning` + JWT | 200 | ✅ |
| 17 | Paiement : création session Stripe | `POST /api/payments/create-checkout-session` + JWT | 200 + `url` Stripe | ⚠️ |
| 18 | Paiement : confirmation Stripe | `POST /api/payments/confirm/:sessionId` + JWT | 200 | ⚠️ |
| 19 | Notifications MongoDB | `GET /api/notifications` + JWT | 200 (ou message si MongoDB absent) | ⚠️ |

> **⚠️ Tests Stripe** : nécessitent `STRIPE_SECRET_KEY` valide dans `.env`. En mode test, utiliser la clé Stripe `sk_test_...` et la carte `4242 4242 4242 4242`.
> **⚠️ Notifications** : MongoDB non conteneurisé. Le back-end continue de tourner sans lui, mais les notifications ne fonctionnent pas en Docker sans `MONGO_URI` pointant vers une instance accessible.

---

## 4. Tests du front-end

| # | Test | Action | Résultat attendu | Statut |
|:-:|---|---|---|:-:|
| 20 | Page d'accueil accessible | Ouvrir `http://localhost` | Page d'accueil NOVADEMY | ✅ |
| 21 | Navigation (React Router) | Cliquer sur les liens | Changement de page sans rechargement | ✅ |
| 22 | Refresh direct sur `/login` | Accéder directement à l'URL | Page correcte (Nginx → index.html) | ✅ |
| 23 | Formulaire de connexion | Se connecter avec un compte | Redirection vers tableau de bord | ✅ |
| 24 | Page de paiement | Accéder à `/payment` connecté | Formulaire de paiement affiché | ✅ |
| 25 | Appel API depuis le front | Se connecter, voir le dashboard | Données chargées depuis le back | ✅ |

---

## 5. Tests du build front-end (hors Docker)

| # | Test | Commande | Résultat attendu | Statut |
|:-:|---|---|---|:-:|
| 26 | Build Vite | `cd frontend && npm run build` | Dossier `dist/` généré sans erreur | ✅ |
| 27 | Preview du build | `npm run preview` | Accessible sur `http://localhost:4173` | ✅ |

---

## 6. Tests de sécurité de base

| # | Test | Action | Résultat attendu | Statut |
|:-:|---|---|---|:-:|
| 28 | En-têtes HTTP sécurisés | Inspecter les headers de réponse | `X-Content-Type-Options`, `X-Frame-Options` présents (Helmet) | ✅ |
| 29 | Rate limiting auth | Envoyer 101 requêtes sur `/api/auth/login` | 429 Too Many Requests | ✅ |
| 30 | Accès fichier `.env` | `GET http://localhost:5001/.env` | 404 (fichier non exposé) | ✅ |

---

## 7. Résumé des tests

| Catégorie | Tests | OK | Avertissement | À corriger |
|---|:-:|:-:|:-:|:-:|
| Infrastructure Docker | 5 | 5 | 0 | 0 |
| API back-end | 14 | 11 | 3 | 0 |
| Front-end | 6 | 6 | 0 | 0 |
| Build Vite | 2 | 2 | 0 | 0 |
| Sécurité | 3 | 3 | 0 | 0 |
| **Total** | **30** | **27** | **3** | **0** |

Les 3 avertissements concernent les routes Stripe et MongoDB qui nécessitent des clés/services externes. Ils ne bloquent pas le déploiement de base.

---

*Fin du fichier 20_tests_post_deploiement.md*
