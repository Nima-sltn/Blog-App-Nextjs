import { defineConfig } from "vitest/config";
import path from "node:path";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    environment: "node",
    include: ["src/**/*.test.ts"],
    // Keep Next-only modules (next/cache, next/headers) out of unit tests.
    exclude: ["node_modules/**", ".next/**"],
  },
});
