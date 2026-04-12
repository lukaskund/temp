import { defineConfig, devices } from '@playwright/test';
import { env } from '@/config/env';

const useLocalServer = /^http:\/\/127\.0\.0\.1:4173\/?$/.test(env.BASE_URL);

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,
  maxFailures: process.env.CI ? 10 : undefined,
  reporter: [
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['list'],
    ...(process.env.CI ? [['github'] as const] : []),
  ],
  use: {
    baseURL: env.BASE_URL,
    testIdAttribute: 'data-testid',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'on-first-retry',
  },
  webServer: useLocalServer
    ? {
        command:
          "bash -lc 'rm -rf ../dist && mkdir -p ../dist && cp -R ../web/. ../dist/ && touch ../dist/.nojekyll && python3 -m http.server 4173 --directory ../dist'",
        port: 4173,
        reuseExistingServer: !process.env.CI,
      }
    : undefined,
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
