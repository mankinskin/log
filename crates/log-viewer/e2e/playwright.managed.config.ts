import { defineConfig } from '@playwright/test';
import path from 'node:path';

const repoRoot = path.resolve(__dirname, '../../..');
const RELEASE_SERVER_URL = 'http://127.0.0.1:3000';

export default defineConfig({
  testDir: './tests-managed',
  timeout: 90_000,
  expect: { timeout: 15_000 },
  fullyParallel: false,
  workers: 1,
  forbidOnly: !!process.env['CI'],
  retries: process.env['CI'] ? 1 : 0,
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report-managed', open: 'never' }],
  ],
  outputDir: 'test-results-managed',
  use: {
    browserName: 'chromium',
    headless: true,
    launchOptions: { executablePath: process.env['PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH'] },
    viewport: { width: 1280, height: 800 },
    trace: 'on-first-retry',
  },
  webServer: {
    command: 'install-ctl prepare log-viewer && install-ctl start log-viewer --foreground',
    url: RELEASE_SERVER_URL,
    cwd: repoRoot,
    reuseExistingServer: !process.env['CI'],
    timeout: 300_000,
  },
});