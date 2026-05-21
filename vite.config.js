import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Tell Vite’s dev server to fallback to index.html on 404
    cors: true,
  },
  build: {
    // For production, you’ll have to configure your FastAPI (or any static‐file server)
    // to do the same. See “Production step” below.
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("vanta")) {
            return "vanta";
          }
          if (id.includes("three")) {
            return "three";
          }
        },
      },
    },
  },
  esbuild: {
    jsx: "transform",
    jsxFactory: "React.createElement",
    jsxFragment: "React.Fragment",
    jsxInject: `import React from 'react'`,
  },
});
