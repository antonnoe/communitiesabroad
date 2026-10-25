# CommunitiesAbroad

Corporate website for [communitiesabroad.com](https://communitiesabroad.com).

## Tech Stack

- [Next.js 16](https://nextjs.org/) (App Router, Turbopack)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS v4](https://tailwindcss.com/)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Scripts

| Command         | Description              |
| --------------- | ------------------------ |
| `npm run dev`   | Start dev server         |
| `npm run build` | Create production build  |
| `npm run start` | Start production server  |
| `npm run lint`  | Run ESLint               |

## Peil-export (zoekpagina en toolkaarten)

Draai na elke nieuwe Peil-versie: `node scripts/peil-export.mjs ../peil-nl-fr/data/register.json`, dan `npm run test:peil`, en commit de bijgewerkte bestanden.
Dat maakt `public/manifest/peil-zoek.json` (alleen status "vastgesteld", alleen openbare velden) en per tool met een `openbaar`-veld in `tools.json` een toolkaart-dataset in `public/manifest/tools/<peil_slug>.json` plus `index.json`.
De pagina's `/manifest/tools` en `/manifest/tool/<slug>` worden bij de build uit die JSON gemaakt; `peil-zoek.html` en `kennispiramide.html` worden vanuit Infofrankrijk in een iframe getoond.
