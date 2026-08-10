import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// Gunakan PORT dari environment jika ada, jika tidak ada (seperti di Vercel), gunakan default 5000
const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: PORT,
    host: "0.0.0.0",
  },
  preview: {
    port: PORT,
    host: "0.0.0.0",
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
});
