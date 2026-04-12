# CommunitiesAbroad

Corporate website for communitiesabroad.com.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v4 (CSS-based config via `@theme inline` in `globals.css`)
- **Linting**: ESLint with `eslint-config-next`
- **Package Manager**: npm

## Project Structure

```
src/
├── app/              # App Router pages and layouts
│   ├── layout.tsx    # Root layout (Header + Footer)
│   ├── page.tsx      # Homepage
│   ├── about/        # About page
│   ├── services/     # Services page
│   └── contact/      # Contact page
├── components/       # Shared React components
│   ├── header.tsx    # Site header with navigation
│   └── footer.tsx    # Site footer
```

## Commands

```bash
npm run dev       # Start dev server (Turbopack)
npm run build     # Production build
npm run start     # Start production server
npm run lint      # Run ESLint
```

## Conventions

- Use the App Router (`src/app/`) for all pages — do not use the Pages Router.
- Components are server components by default. Add `"use client"` only when client interactivity is required.
- Use the `@/*` path alias to import from `src/`.
- Tailwind v4 theme tokens (colors, fonts) are defined in `src/app/globals.css` using `@theme inline`.
- Color palette: `primary-*` (blue) and `accent-*` (teal). Use Tailwind utility classes.
- All pages export `Metadata` for SEO.
- Keep components in `src/components/`. Use lowercase filenames with hyphens.
- The contact form is currently a static UI — form handling will be added later.
