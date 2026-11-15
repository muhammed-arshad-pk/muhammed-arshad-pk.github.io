# Agent notes: muhammed-arshad-pk.github.io

Vite + React + TypeScript + Tailwind single-page portfolio. Animations via framer-motion; icons via lucide-react.

- **Content:** all text, links, projects, experience and skills live in `src/data.ts`. Edit there, not in components.
- **Sections:** `src/components/` (Nav, Hero, About + Marquee, Projects, Experience, Research, Skills, Contact + footer), composed in `src/App.tsx`. Shared `Reveal` / `Section` / `SectionHead` are in `src/components/ui.tsx`.
- **Project visuals:** `src/visuals/*.tsx` are code-drawn canvas animations, driven by `useCanvasLoop` in `src/lib/canvas.ts` (DPR sizing, pauses off-screen, reduced-motion still frame, theme palette).
- **Theme:** colour tokens are CSS variables (RGB triples) in `src/index.css`; light theme is `html[data-theme="light"]`, toggled in Nav and persisted to localStorage. Tailwind colour names: `bg surface fg muted line ice marigold leaf`.
- **Commands:** `npm run dev` (localhost:8080), `npm run build` (type-check + build into `docs/`).
- **Deploy:** GitHub Pages serves `docs/` on `main`. Run `npm run build`, then commit and push `docs/` along with the source. Never edit `docs/` by hand.
- `new reference/` (raw photos, design mockups) is git-ignored and must stay private.
