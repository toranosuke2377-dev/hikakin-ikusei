import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  base: "./",
  plugins: [react()],
  build: {
    // The scenario ships as one offline-capable text bundle. Japanese prose
    // compresses to roughly 30% of this limit, so the default 500 kB warning
    // is not representative of network transfer size for this app.
    chunkSizeWarningLimit: 850
  },
  test: {
    environment: "jsdom",
    environmentOptions: {
      jsdom: {
        // A non-opaque origin is required for jsdom's Storage implementation.
        // Without it, Node's partial global Storage shadows localStorage and
        // the persistence tests (and the app's save path) cannot run.
        url: "http://localhost/"
      }
    },
    setupFiles: "./src/test/setup.ts",
    coverage: {
      reporter: ["text", "json-summary"]
    }
  }
});
