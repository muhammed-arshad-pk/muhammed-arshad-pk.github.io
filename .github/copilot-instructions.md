<!-- Copilot / AI agent instructions for muhammad-arshad-pk.github.io -->
# Copilot instructions — Vite + React + Tailwind portfolio

Purpose: give an AI coding agent the minimal, concrete knowledge to be productive in this repo.

- Tech stack: Vite + React (TSX) + TypeScript + Tailwind CSS. Entry: `src/main.tsx` -> `src/App.tsx`.
- UI pattern: components in `src/components/` and thin UI wrappers under `src/components/ui/` (shadcn-style wrappers of Radix + primitives). Example: `src/components/ui/button.tsx` and usage in `src/components/Navigation.tsx`.

Quick commands

```bash
npm run dev      # start local dev server (vite)
npm run build    # production build -> outputs to `dist/`
npm run build:dev# build with development mode
npm run preview  # preview local build
npm run deploy   # uses gh-pages to publish `dist/` (project also contains a committed `docs/` build)
```

Key files / where to look

- App bootstrap: `src/main.tsx`, `src/App.tsx` (React Router + QueryClient). See routing convention in `src/App.tsx` — add routes above the catch-all `*`.
- Page composition: `src/pages/Index.tsx` renders section components in `src/components/` (Hero, About, Experience, Skills, Projects, Contact).
- UI primitives: `src/components/ui/*` — these are the standard place to change button/input behavior, variants, and to integrate Radix primitives.
- Styling and tokens: `src/index.css` (CSS variables like `--hero-gradient-start`) and `tailwind.config.ts` (theme tokens, `hero-gradient`, `glass-card` utilities).
- Path alias: `@/*` maps to `src/*` (tsconfig.json). Use `@/components/...` in imports.

Project-specific conventions (do not assume defaults)

- Visual utilities: Several bespoke classnames (e.g. `glass-card`, `hero-gradient`, `gradient-text`, `container-width`) live in `src/index.css` and are referenced alongside Tailwind utilities.
- UI wrapper pattern: prefer editing wrappers under `src/components/ui/` when changing shared behavior (not each usage). Example: updating `Button` variants in `src/components/ui/button.tsx` propagates across `Navigation.tsx` and `ProjectsSection.tsx`.
- Animations & layout: Tailwind custom animations and background tokens are defined in `tailwind.config.ts` — change there when adding global utilities.
- Routing: App uses `BrowserRouter` and `Routes` (client-side). Some pages are single-page sections (scroll-to by id) rather than separate routes — check `Navigation.tsx` for scroll behavior.

Integration points and deploy notes

- GitHub Pages: `package.json` has `deploy` using `gh-pages -d dist`. The repo also includes an existing `docs/` folder that contains a built site — avoid accidentally overwriting/committing `docs/` unless intentionally updating the prebuilt site.
- External libraries: Radix UI, `@tanstack/react-query`, `sonner`, `lucide-react`, `react-router-dom`. UI primitives often wrap Radix components: prefer updating those wrappers.

Debugging / building notes

- If a local issue is styling-related, check `tailwind.config.ts` and `src/index.css` first — many theme tokens are set as CSS variables.
- Use `npm run build:dev` to reproduce production bundling without full production optimizations.

Examples (specific patterns)

- Scroll-to sections: `src/components/Navigation.tsx` uses `document.getElementById(...).scrollIntoView({ behavior: 'smooth' })` and closes mobile menu.
- Shared UI: `Button` is imported from `@/components/ui/button` across sections. Edit the wrapper to change global button behavior.

What I will not do automatically

- Do not change `docs/` or the committed production build artifacts unless asked.
- Do not change deployments (GitHub Pages settings) without explicit instruction.

If anything seems missing or you'd like the file to contain extra workflows (tests, CI, commit hooks), tell me which one and I will update this file.
