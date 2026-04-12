# CommunitiesAbroad

Corporate website voor communitiesabroad.com.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Taal**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v4 (CSS-based config via `@theme inline` in `globals.css`)
- **Linting**: ESLint met `eslint-config-next`
- **Package Manager**: npm

## Huisstijl

- **Primaire kleur**: `#800000` (maroon) — gebruik Tailwind's opacity modifier: `bg-primary`, `bg-primary/10`, `text-primary/80`, etc.
- **Lettertypen**: Poppins (h1, h2, h3) en Mulish (body tekst) via `next/font/google`
- **Regelafstand**: 1.8em voor body tekst, 1.3em voor headings
- **Taal**: Nederlands (`lang="nl"`)

## Project Structuur

```
src/
├── app/              # App Router pagina's en layouts
│   ├── layout.tsx    # Root layout (Header + Footer + fonts)
│   ├── page.tsx      # Homepage
│   ├── over-ons/     # Over Ons pagina
│   ├── diensten/     # Diensten pagina
│   └── contact/      # Contact pagina
├── components/       # Gedeelde React componenten
│   ├── header.tsx    # Site header met navigatie
│   └── footer.tsx    # Site footer
```

## Commando's

```bash
npm run dev       # Start dev server (Turbopack)
npm run build     # Productie build
npm run start     # Start productie server
npm run lint      # ESLint draaien
```

## Conventies

- Gebruik de App Router (`src/app/`) voor alle pagina's — gebruik niet de Pages Router.
- Componenten zijn standaard server components. Voeg `"use client"` alleen toe bij client interactiviteit.
- Gebruik de `@/*` path alias om te importeren vanuit `src/`.
- Tailwind v4 theme tokens zijn gedefinieerd in `src/app/globals.css` via `@theme inline`.
- Kleurvariaties via Tailwind opacity modifiers: `bg-primary/5`, `bg-primary/10`, `text-primary/80`, etc.
- Alle pagina's exporteren `Metadata` voor SEO.
- Componenten in `src/components/`. Gebruik lowercase bestandsnamen met koppeltekens.
- URL-paden zijn Nederlandstalig: `/over-ons`, `/diensten`, `/contact`.
- Het contactformulier is momenteel statische UI — formulierverwerking wordt later toegevoegd.
