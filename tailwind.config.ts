import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  // `hover:` utilities only apply on devices that can really hover (no sticky hover after a tap)
  future: { hoverOnlyWhenSupported: true },
  theme: {
    extend: {
      colors: {
        bg: "rgb(var(--bg) / <alpha-value>)",
        surface: "rgb(var(--surface) / <alpha-value>)",
        fg: "rgb(var(--fg) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",
        line: "rgb(var(--line) / <alpha-value>)",
        ice: "rgb(var(--ice) / <alpha-value>)",
        marigold: "rgb(var(--marigold) / <alpha-value>)",
        leaf: "rgb(var(--leaf) / <alpha-value>)",
      },
      fontFamily: {
        sans: ['"Manrope"', "system-ui", "sans-serif"],
        display: ['"Sora"', '"Manrope"', "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "monospace"],
      },
      maxWidth: { page: "1240px" },
    },
  },
  plugins: [],
} satisfies Config;
