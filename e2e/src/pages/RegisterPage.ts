import { ROUTE_PATTERNS, ROUTES } from '@/constants/routes';
import { TestStep } from '@/helpers/test-step';
import { BasePage } from '@/pages/BasePage';
import { clearLocalStorageKeys } from '@/utils/helpers';

type RegisterUserData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export class RegisterPage extends BasePage {
  get registerPageRoot() {
    return this.page.getByTestId('register-page');
  }

  get firstNameInput() {
    return this.page.getByTestId('input-firstname');
  }

  get lastNameInput() {
    return this.page.getByTestId('input-lastname');
  }

  get emailInput() {
    return this.page.getByTestId('input-email');
  }

  get passwordInput() {
    return this.page.getByTestId('input-password');
  }

  get confirmPasswordInput() {
    return this.page.getByTestId('input-confirm-password');
  }

  get registerButton() {
    return this.page.getByTestId('register-btn');
  }

  get registerErrorAlert() {
    return this.page.getByRole('alert');
  }

  get firstNameValidationError() {
    return this.page.locator('.form-group .field-error').first();
  }

  get lastNameValidationError() {
    return this.page.locator('.form-group .field-error').nth(1);
  }

  get emailValidationError() {
    return this.page.locator('.form-group .field-error').nth(2);
  }

  get passwordValidationError() {
    return this.page.locator('.form-group .field-error').nth(3);
  }

  get confirmPasswordValidationError() {
    return this.page.locator('.form-group .field-error').nth(4);
  }

  @TestStep
  async open() {
    await this.navigate(ROUTES.register);
  }

  @TestStep
  async openAndExpectVisible() {
    await this.open();
    await this.expectRegisterPageVisible();
  }

  @TestStep
  async expectRegisterPageVisible() {
    await this.assertVisible(this.registerPageRoot, 'Register page should be visible.');
  }

  @TestStep
  async clearRegistrationState() {
    if (this.page.url() === 'about:blank') {
      await this.navigate(ROUTES.home);
    }
    await clearLocalStorageKeys(this.page, ['pawshop_user', 'pawshop_users']);
  }

  @TestStep
  async fillRegistrationForm(firstName: string, lastName: string, email: string, password: string, confirmPassword: string) {
    await this.fillField(this.firstNameInput, firstName);
    await this.fillField(this.lastNameInput, lastName);
    await this.fillField(this.emailInput, email);
    await this.fillField(this.passwordInput, password);
    await this.fillField(this.confirmPasswordInput, confirmPassword);
  }

  @TestStep
  async submit() {
    await this.registerButton.click();
  }

  @TestStep
  async registerWithDetails(firstName: string, lastName: string, email: string, password: string, confirmPassword: string) {
    await this.fillRegistrationForm(firstName, lastName, email, password, confirmPassword);
    await this.submit();
  }

  @TestStep
  async registerWithUser(user: RegisterUserData) {
    await this.registerWithDetails(user.firstName, user.lastName, user.email, user.password, user.confirmPassword);
  }

  @TestStep
  async registerAndReturnToRegister(user: RegisterUserData) {
    await this.registerWithUser(user);
    await this.waitForHomeAfterRegister();
    await this.openAndExpectVisible();
  }

  @TestStep
  async waitForHomeAfterRegister() {
    await this.assertURL(ROUTE_PATTERNS.home, 'Successful registration should redirect user to home page.');
  }

  @TestStep
  async expectExistingEmailError() {
    await this.assertVisible(this.registerErrorAlert, 'Existing email registration should show an error alert.');
    await this.assertText(
      this.registerErrorAlert,
      'An account with this email already exists.',
      'Error message should explain the email already exists.'
    );
  }

  @TestStep
  async expectMismatchedPasswordError() {
    await this.assertVisible(
      this.confirmPasswordValidationError,
      'Confirm password field should show validation for mismatched passwords.'
    );
    await this.assertText(
      this.confirmPasswordValidationError,
      'Passwords do not match',
      'Mismatch validation should explain passwords must match.'
    );
  }

  @TestStep
  async expectEmptyFormValidationErrors() {
    await this.assertText(this.firstNameValidationError, 'This field is required');
    await this.assertText(this.lastNameValidationError, 'This field is required');
    await this.assertText(this.emailValidationError, 'This field is required');
    await this.assertText(this.passwordValidationError, 'This field is required');
    await this.assertText(this.confirmPasswordValidationError, 'This field is required');
  }
}
