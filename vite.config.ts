import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
// No longer need to import React here for the config file

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react()], // The tagger has been removed from this array
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});