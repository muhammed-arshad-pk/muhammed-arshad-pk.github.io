import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger"; // Optional dev plugin

// Replace with your GitHub repo name
const repoName = "portfolio";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  // Base URL for GitHub Pages
  base: `/${repoName}/`,

  // Dev server configuration (optional)
  server: {
    host: "::",
    port: 8080,
  },

  // Plugins
  plugins: [
    react(),
    // Only include componentTagger in development mode
    mode === "development" && componentTagger(),
  ].filter(Boolean),

  // Path aliases
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // Now you can use "@/..." to reference src folder
    },
  },

  // Optional build options for optimization
  build: {
    outDir: "dist",
    sourcemap: false,
  },
}));
