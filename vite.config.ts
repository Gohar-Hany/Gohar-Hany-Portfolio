import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    minify: "esbuild",
    cssCodeSplit: true,
    target: "es2020",
    sourcemap: false,
    rollupOptions: {
      output: {
        // Libraries change rarely — separate chunks stay cached across deploys.
        manualChunks: {
          react: ["react", "react-dom", "react-router-dom"],
          gsap: ["gsap"],
        },
      },
    },
  },
}));