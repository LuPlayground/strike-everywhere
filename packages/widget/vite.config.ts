import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import { fileURLToPath } from "node:url";

export default defineConfig({
  plugins: [preact()],
  resolve: {
    alias: {
      "@strike-everywhere/core": fileURLToPath(new URL("../core/src/index.ts", import.meta.url)),
    },
  },
  build: {
    target: "es2020",
    lib: {
      entry: fileURLToPath(new URL("./src/index.tsx", import.meta.url)),
      name: "StrikeEverywhereWidget",
      formats: ["es", "iife"],
      fileName: (format) => (format === "es" ? "strike-everywhere.js" : "strike-everywhere.iife.js"),
    },
    sourcemap: true,
    minify: "esbuild",
  },
  server: { port: 5180 },
});
