import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve as pathResolve } from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/",
  resolve: {
    alias: {
      // '@assets'를 src/assets 폴더로 매핑
      "@assets": pathResolve(__dirname, "src/assets"),
      // '@'를 src 폴더로 매핑 (필요시)
      "@": pathResolve(__dirname, "src"),
    },
  },
  build: {
    outDir: "dist",
  },
});
