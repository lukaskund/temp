import { Page } from '@playwright/test';
import { CartPage, CheckoutPage, ConfirmationPage, LoginPage, NavigationPage, RegisterPage, ShopPage } from '@/pages';

/**
 * Minimal manager wrapper around Playwright {@link Page}.
 * Concrete page getters are intentionally omitted in framework-only mode.
 */
export class PageObjectManager {
  constructor(readonly page: Page) {}

  get loginPage() {
    return new LoginPage(this.page);
  }

  get registerPage() {
    return new RegisterPage(this.page);
  }

  get navigation() {
    return new NavigationPage(this.page);
  }

  get cartPage() {
    return new CartPage(this.page);
  }

  get shopPage() {
    return new ShopPage(this.page);
  }

  get checkoutPage() {
    return new CheckoutPage(this.page);
  }

  get confirmationPage() {
    return new ConfirmationPage(this.page);
  }
}
