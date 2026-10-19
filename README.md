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

## Peil-export voor de zoekpagina

`public/manifest/peil-zoek.json` is een openbare export van het privé-register van Peil (alleen status "vastgesteld", alleen openbare velden). Opnieuw maken:

```bash
node scripts/peil-export.mjs /pad/naar/peil-nl-fr/data/register.json
```

Commit daarna het bijgewerkte JSON-bestand. `peil-zoek.html` en `kennispiramide.html` in dezelfde map worden vanuit Infofrankrijk in een iframe getoond.
