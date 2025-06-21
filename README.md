# editorTiptap‑lazy‑loading

Une démo/recherche autour de **lazy-loading** des extensions Tiptap dans un éditeur basé sur React + Vite, optimisé pour un déploiement sur GitHub Pages.

---

## ⚙️ Fonctionnalités

- ⚡ Chargement paresseux des extensions Tiptap (sans erreur initiale liée à Highlight, Markdown, etc.)
- 💻 Mise en place d’un éditeur React moderne avec `@tiptap/react`
- 🚀 Build performant via Vite, avec `base` configuré pour GitHub Pages
- 🔧 Déploiement automatisé via GitHub Actions (`actions/deploy-pages@v4`)

---

## 🛠️ Installation & utilisation

1. Clone le dépôt :

   ```bash
   git clone https://github.com/elyseeMB/editorTiptap-lazy-loading-.git
   cd editorTiptap-lazy-loading-
   ```

2. Installe les dépendances :

   ```bash
   npm install
   ```

3. Lance l’environnement de développement :

   ```bash
   npm run dev
   ```

   L’éditeur se lancera normalement sur `http://localhost:3000`.

4. Pour builder :

   ```bash
   npm run build
   ```

   → Produit le dossier `dist/` prêt à être déployé.

---

## 🎯 Objectif du projet

Ce projet est un **proof of concept** pour :

- Charger dynamiquement les extensions Tiptap utilisées (par exemple _CodeBlock_, _Link_, _Image_…) afin d’alléger le bundle principal.
- Garantir un site statique compatible avec GitHub Pages, en particulier sur la branche `gh-pages`.
- Démontrer le workflow intégral : **dev → build → upload-artifact → deploy-pages**.

---

## 🧩 Structure principale

```text
src/
├─ extensions/       # Extensions Tiptap chargées à la demande
├─ components/
│   └─ Editor.jsx     # Composant d’éditeur principal
├─ vite.config.ts     # Configuration Vite, attention au `base`
├─ package.json
└─ ...
```

- Chaque extension est **importée dynamiquement** avec `React.lazy()` ou `() => import(...)`, au besoin.
- Le champ `base` dans `vite.config.ts` est obligatoire pour un déploiement correct sur GitHub Pages :

  ```ts
  base: '/editorTiptap-lazy-loading-/',
  ```

---

## 🚀 Déploiement via GitHub Actions

Le workflow `.github/workflows/deploy.yml` est conçu ainsi :

```yaml
jobs:
  build:
    steps: – checkout, setup-node, npm ci, npm run build
      – upload artifact (./dist)

  deploy:
    needs: build
    steps: – actions/deploy-pages@v4
```

Assure-toi d’avoir **activé GitHub Pages** (source = _GitHub Actions_, dossier `gh-pages`) dans les _Settings_ du dépôt.

---

## 🧪 Tests & validation

- Teste le chargement paresseux en ouvrant l’éditeur et en observant le network (pleins de `chunk.XXX.js`).
- Vide le cache et rebuild pour t’assurer que l’application tient bien sur Vite + Pages.

---

## 📝 Bonnes pratiques de commit

- `fix: add base path in vite config for GitHub Pages`
- `ci: setup deploy-pages action`
- `feat: implement lazy loading for Tiptap extensions`

---

## 💡 À venir

- Ajouter plus d’extensions Tiptap (ex. _Image_, _Table_)
- Ajouter la gestion des erreurs (`fallback` pour `React.Suspense`)
- Optimiser le bundle et documenter le lazy loading

---

## 📄 Licence

Ce projet est sous licence **MIT** — fais-en bon usage !
