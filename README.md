# Interactive Portfolio

> A modern and immersive web experience — [jagoba.dev](https://jagoba.dev)

Personal portfolio website built from scratch with modern technologies, designed to deliver a smooth user experience, elegant animations, and full multilingual support (English & Spanish).

---

## 🚀 Tech Stack

| Technology | Role |
|---|---|
| **Astro** | Main framework for hybrid rendering: static pre-rendering and server-side rendering depending on each route's needs |
| **TypeScript** | Static typing for more robust and maintainable code |
| **Tailwind CSS** | Utility-first CSS framework for fast and consistent styling |
| **anime.js** | Lightweight and powerful JavaScript animation library |
| **Zod** | Schema validation for the content system |
| **Bootstrap Icons** | Icon library |
| **Devicon** | Developer-focused icon set for tech logos |

---

## 🏗️ Architecture

The portfolio follows a clean content-driven architecture:

```
Astro Pages (.astro)  +  Content Collections (JSON + Zod)  +  Tailwind Styles
                                      ↓
                    Hybrid Rendering (Static pre-rendering + SSR)
                     per-route: prerender=true ↔ server-rendered
                                      ↓
                      Cloudflare Deployment → jagoba.dev
```

- **Astro Pages** — UI components and routing.
- **Content Collections** — Typed JSON content managed with Zod schemas, enabling internationalization and easy maintenance.
- **Hybrid Rendering** — Static pre-rendering for content-heavy pages (`export const prerender = true`) combined with server-side rendering where dynamic behavior is needed, giving the best of both worlds.
- **Cloudflare** — Hosting and CDN.

---

## 🎨 Design Philosophy

The design is built on two fundamental pillars:

- **Simplicity** — No unnecessary elements that distract the user.
- **Immediate Access** — Relevant information is always visible; users find what they're looking for without friction.

---

## ⚙️ Stack Philosophy

The tech stack is strategically chosen for being the fastest in two ways: **development speed** and **production performance**.

- **Performance** — Astro combines static pre-rendering and SSR to deliver optimised output for every route.
- **DX** — TypeScript accelerates development with autocompletion and error detection.
- **Styles** — Tailwind allows styling without leaving the code.

---

## 🌐 Internationalization

The site supports multiple locales out of the box via Astro's i18n routing:

- `es` — Spanish (default)
- `en` — English

Content is stored as separate JSON files per locale inside `src/content/`.

---

## 🛠️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS recommended)

### Install dependencies

```bash
npm install
```

### Development server

```bash
npm run dev
```

### Production build

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

---

## 📁 Project Structure

```
src/
├── components/       # Reusable UI components
│   ├── cards/        # Card components (project, experience, etc.)
│   ├── sections/     # Modal sections (About, Projects, Experience…)
│   └── ui/           # Base UI elements (Button, Modal, Tabs…)
├── content/          # Content collections (JSON + Zod schemas)
│   ├── about/
│   ├── experience/
│   ├── project-details/
│   ├── projects/
│   ├── technologies/
│   └── ui/
├── layouts/          # Base page layouts
├── pages/            # Astro routes and project detail pages
├── scripts/          # Client-side TypeScript (animations, modals…)
└── styles/           # Global CSS
```

---

## 📄 License

See [LICENSE.txt](./LICENSE.txt) for details.

---

## 📬 Contact

[contact@jagoba.dev](mailto:contact@jagoba.dev)

