import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
  base: "./",
  plugins: [react()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "@data": fileURLToPath(new URL("./data", import.meta.url)),
      "@assets": fileURLToPath(new URL("./assets", import.meta.url))
    }
  },
  server: {
    port: 5173,
    host: "127.0.0.1"
  }
});
