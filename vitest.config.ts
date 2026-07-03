import { defineConfig } from "vitest/config";

// Stryker sets this env var in every vitest worker it spawns — disable
// Vitest's own coverage so multiple parallel workers don't race on .tmp.
const isStrykerWorker = Boolean(process.env.STRYKER_MUTATOR_WORKER);

export default defineConfig({
  cacheDir: ".caches/vitest",
  test: {
    onConsoleLog: () => false,
    reporters: ["minimal"],
    // Run tests in parallel to improve performance https://vitest.dev/guide/improving-performance
    isolate: false,
    // pool: 'threads' instead of 'forks' can also improve performance
    pool: "threads",
    maxWorkers: 2,
    environment: "node",
    include: ["src/**/*.test.ts"],
    coverage: {
      provider: "v8",
      include: ["src/**/*.ts"],
      enabled: !isStrykerWorker,
      reportsDirectory: ".caches/coverage",
      cleanOnRerun: false,
      thresholds: {
        branches: 100,
        functions: 100,
        lines: 100,
        statements: 100,
      },
    },
    testTimeout: 5000,
  },
});
