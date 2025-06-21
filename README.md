# editorTiptap‑lazy‑loading

Une démo/recherche autour de **lazy-loading**

---

## ⚙️ Fonctionnalités

- ⚡ Chargement paresseux des extensions Tiptap
- 💻 Mise en place d’un éditeur React moderne avec `@tiptap/react`

---

## 🛠️ Installation & utilisation

1. Clone le dépôt :

   ```bash
   git clone https://github.com/elyseeMB/editorTiptap-lazy-loading-.git
   cd editorTiptap-lazy-loading-
   ```

2. Installe les dépendances :

   ```bash
   pnpm install
   ```

3. Lance l’environnement de développement :

   ```bash
   pnpm run dev
   ```

   L’éditeur se lancera normalement sur `http://localhost:5173`.

4. Pour builder :

   ```bash
   pnpm run build
   ```

   → Produit le dossier `dist/` prêt à être déployé.

---

## 🎯 Objectif du projet

Ce projet est un **proof of concept** pour :

- Charger dynamiquement les extensions Tiptap utilisées (par exemple _CodeBlock_, _Link_, _Image_…) afin d’alléger le bundle principal.

---

## 🧩 Structure principale

```text
src/
├─ extensions/       # Extensions Tiptap chargées à la demande
├─ components/
│   └─ Editor.jsx     # Composant d’éditeur principal
├─ vite.config.ts
├─ package.json
└─ ...
```

---

## 📄 Licence

Ce projet est sous licence **MIT** — fais-en bon usage !
