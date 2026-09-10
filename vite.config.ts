import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  // Project Pages serves under /japanese.io/, so built asset URLs need the prefix.
  base: "/japanese.io/",
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: "@designcodeio/threeui/style.css",
        replacement: path.resolve(root, "src/shaders/threeui.css"),
      },
      {
        find: "@designcodeio/threeui",
        replacement: path.resolve(root, "src/shaders/landing-pages/LandingPages.tsx"),
      },
    ],
  },
  server: {
    port: 5173,
  },
});
