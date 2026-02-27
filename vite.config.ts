import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  base: "./",
  plugins: [react(), tailwindcss()],
  build: { target: "es2022" },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "@AppStage": fileURLToPath(new URL("./src/components/features/AppStage", import.meta.url)),
      "@GameStage": fileURLToPath(
        new URL("./src/components/features/AppStage/GameStage", import.meta.url),
      ),
      "@UiTestStage": fileURLToPath(
        new URL("./src/components/features/AppStage/UiTestStage", import.meta.url),
      ),
      "@assets": fileURLToPath(new URL("./src/assets", import.meta.url)),
      "@components": fileURLToPath(new URL("./src/components", import.meta.url)),
      "@engine": fileURLToPath(new URL("./src/engine", import.meta.url)),
      "@features": fileURLToPath(new URL("./src/components/features", import.meta.url)),
      "@hooks": fileURLToPath(new URL("./src/hooks", import.meta.url)),
      "@store": fileURLToPath(new URL("./src/store", import.meta.url)),
      "@svg": fileURLToPath(new URL("./src/assets/svg", import.meta.url)),
      "@ui": fileURLToPath(new URL("./src/components/ui", import.meta.url)),
      "@util": fileURLToPath(new URL("./src/util", import.meta.url)),
    },
  },
  server: {
    host: true, // listen on 0.0.0.0
    // port: 5173,
    // strictPort: true, // error if port is in use
  },
});
