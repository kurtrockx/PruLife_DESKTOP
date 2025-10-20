import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "./", // ✅ correct for Electron
  build: {
    outDir: "dist", // make sure this matches your electron load path
  },
});
