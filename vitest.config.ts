import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'node',
    globals: true,
    setupFiles: ['./tests/setup.ts'],
    include: [
      'tests/unit/**/*.test.ts',
      'tests/integration/**/*.test.ts',
      'src/**/*.test.ts',
    ],
    exclude: ['tests/e2e/**', 'node_modules/**'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/**',
        'tests/**',
        '**/*.config.*',
        '**/*.d.ts',
      ],
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
})
