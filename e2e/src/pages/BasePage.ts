import { expect, Locator, Page } from '@playwright/test';
import { TestStep } from '@/helpers/test-step';

/**
 * Base class for screen page objects. Holds the Playwright {@link Page}; subclasses add locators and flows.
 */
export abstract class BasePage {
  constructor(readonly page: Page) {}

  @TestStep
  async navigate(path: string) {
    await this.page.goto(path);
    await this.page.waitForLoadState('domcontentloaded');
  }

  @TestStep
  async waitForPageLoad() {
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForLoadState('networkidle');
  }

  @TestStep
  async fillField(locator: Locator, value: string) {
    await locator.clear();
    await locator.fill(value);
  }

  @TestStep
  async assertVisible(locator: Locator, message?: string) {
    await expect(locator, message).toBeVisible();
  }

  @TestStep
  async assertText(locator: Locator, text: string, message?: string) {
    await expect(locator, message).toHaveText(text);
  }

  @TestStep
  async assertURL(urlPattern: string | RegExp, message?: string) {
    await expect(this.page, message).toHaveURL(urlPattern);
  }

  @TestStep
  async clickAndWait(locator: Locator) {
    await locator.click();
    await this.waitForPageLoad();
  }

  @TestStep
  async waitForElement(locator: Locator, timeout?: number) {
    await locator.waitFor({ state: 'visible', timeout });
  }

  @TestStep
  async takeScreenshot(name: string) {
    await this.page.screenshot({ path: `screenshots/${name}.png` });
  }
}
