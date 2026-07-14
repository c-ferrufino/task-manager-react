import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    exclude: ['**/node_modules/**', 'backend/**', 'e2e/**'],
    projects: ['.', './backend'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      exclude: ['**/generated/**', 'e2e/**', '**/*.config.*'],
      thresholds: {
        lines: 60,
        functions: 60,
        branches: 50,
        statements: 60,
      },
    },
  },
})
