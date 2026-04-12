import { test as base, Page } from '@playwright/test';
import { env } from '@/config/env';
import { PageObjectManager } from '@/page-objects';

type TestUser = {
  email: string;
  password: string;
};

type AppFixtures = {
  /** Page Object Manager wrapper for shared Playwright page instance. */
  pom: PageObjectManager;
  authenticatedPage: Page;
  /** POM for the tab opened by `authenticatedPage`. */
  authenticatedPom: PageObjectManager;
  testUser: TestUser;
};

/** Extended test object with POM (`pom`) helpers. */
export const test = base.extend<AppFixtures>({
  testUser: async ({}, use) => {
    await use({
      email: env.TEST_USER_EMAIL,
      password: env.TEST_USER_PASSWORD,
    });
  },

  pom: async ({ page }, use) => {
    await use(new PageObjectManager(page));
  },

  authenticatedPage: async ({ browser, testUser }, use) => {
    void testUser;
    const context = await browser.newContext();
    const page = await context.newPage();

    await use(page);
    await context.close();
  },

  authenticatedPom: async ({ authenticatedPage }, use) => {
    await use(new PageObjectManager(authenticatedPage));
  },
});

export { expect } from '@playwright/test';
export { testStep, TestStep } from '@/helpers/test-step';
export { PageObjectManager } from '@/page-objects';
