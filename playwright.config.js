import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',

  // Snapshot settings for visual regression
  snapshotDir: './tests/snapshots',
  snapshotPathTemplate: '{snapshotDir}/{testFileName}/{arg}{ext}',

  expect: {
    toHaveScreenshot: {
      maxDiffPixels: 50,
      threshold: 0.1,
    },
  },

  use: {
    // Base URL for tests - uses the Vite dev server
    baseURL: 'http://localhost:5179',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  // Run dev server before tests
  webServer: {
    command: 'npm run dev -- --port 5179',
    url: 'http://localhost:5179',
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
