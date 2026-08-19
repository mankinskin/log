import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 15_000,
  expect: { timeout: 5_000 },
  use: {
    baseURL: 'http://localhost:8081',
    browserName: 'chromium',
    headless: true,
    viewport: { width: 1280, height: 800 },
  },
  // No webServer block — assumes log-viewer-leptos task is already running.
  reporter: [['list'], ['html', { outputFolder: 'playwright-report', open: 'never' }]],
});
