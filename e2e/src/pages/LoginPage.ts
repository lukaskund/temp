import { ROUTE_PATTERNS, ROUTES } from '@/constants/routes';
import { TestStep } from '@/helpers/test-step';
import { BasePage } from '@/pages/BasePage';
import { clearLocalStorageKeys } from '@/utils/helpers';

export class LoginPage extends BasePage {
  get emailInput() {
    return this.page.getByTestId('input-email');
  }

  get passwordInput() {
    return this.page.getByTestId('input-password');
  }

  get submitButton() {
    return this.page.getByTestId('login-btn-submit');
  }

  get loginPageRoot() {
    return this.page.getByTestId('login-page-root');
  }

  get loginErrorAlert() {
    return this.page.getByRole('alert');
  }

  get emailValidationError() {
    return this.page.locator('.form-group .field-error').first();
  }

  get passwordValidationError() {
    return this.page.locator('.form-group .field-error').nth(1);
  }

  @TestStep
  async open() {
    await this.navigate(ROUTES.login);
  }

  @TestStep
  async openAndExpectVisible() {
    await this.open();
    await this.expectLoginPageVisible();
  }

  @TestStep
  async loginWithCredentials(email: string, password: string) {
    await this.fillField(this.emailInput, email);
    await this.fillField(this.passwordInput, password);
    await this.submitButton.click();
  }

  @TestStep
  async loginAndWaitForHome(email: string, password: string) {
    await this.loginWithCredentials(email, password);
    await this.waitForHomeAfterLogin();
  }

  @TestStep
  async submitEmptyForm() {
    await this.submitButton.click();
  }

  @TestStep
  async expectValidationErrorsForRequiredFields() {
    await this.assertVisible(
      this.emailValidationError,
      'Email required validation error should be visible after empty submit.'
    );
    await this.assertVisible(
      this.passwordValidationError,
      'Password required validation error should be visible after empty submit.'
    );
    await this.assertText(
      this.emailValidationError,
      'This field is required',
      'Email validation should explain the field is required.'
    );
    await this.assertText(
      this.passwordValidationError,
      'This field is required',
      'Password validation should explain the field is required.'
    );
  }

  @TestStep
  async expectInvalidCredentialsError() {
    await this.assertVisible(
      this.loginErrorAlert,
      'Login error message should be visible for invalid credentials.'
    );
    await this.assertText(
      this.loginErrorAlert,
      'Invalid email or password.',
      'Error message should explain that login credentials are invalid.'
    );
  }

  @TestStep
  async expectLoginPageVisible() {
    await this.assertVisible(this.loginPageRoot, 'Login page content should be visible.');
  }

  @TestStep
  async loginAsDemoUser() {
    await this.loginAndWaitForHome('test@pawshop.com', 'password123');
  }

  @TestStep
  async clearUserSession() {
    // Local storage is origin-scoped; ensure we're on the app origin before reading it.
    if (this.page.url() === 'about:blank') {
      await this.navigate(ROUTES.home);
    }
    await clearLocalStorageKeys(this.page, ['pawshop_user']);
  }

  @TestStep
  async waitForHomeAfterLogin() {
    await this.assertURL(ROUTE_PATTERNS.home, 'Successful login should redirect to the home page.');
  }
}
