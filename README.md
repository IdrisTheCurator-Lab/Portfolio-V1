# Idris TheCurator Studio, portfolio

Next.js 15 (App Router) + TypeScript + Tailwind v4 + next-intl + Motion + Lenis.

## Run
```bash
npm install
npm run dev     # http://localhost:3000
```

## Deploy
Push to GitHub, import the repo in Vercel. No config needed.

## Languages
`messages/{en,yo,fr,es,zh}.json`. Add a language: create the JSON file and add the code to `src/i18n/routing.ts`.
No copy is hardcoded in components.

## Theme
Accent color and light/dark/system are CSS variables set in `ThemeProvider` and saved to localStorage.
