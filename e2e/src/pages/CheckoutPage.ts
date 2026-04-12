import { ROUTES } from '@/constants/routes';
import { expect } from '@/fixtures/index';
import { TestStep } from '@/helpers/test-step';
import { BasePage } from '@/pages/BasePage';
import { CartPage } from '@/pages/CartPage';
import { LoginPage } from '@/pages/LoginPage';
import { NavigationPage } from '@/pages/NavigationPage';

type CheckoutDetails = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postal: string;
  country: string;
  cardNumber: string;
  cardExpiry: string;
  cardCvv: string;
  cardName: string;
};

export class CheckoutPage extends BasePage {
  get checkoutForm() {
    return this.page.getByTestId('checkout-form');
  }

  get placeOrderButton() {
    return this.page.getByTestId('place-order-btn');
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

  get phoneInput() {
    return this.page.getByTestId('input-phone');
  }

  get addressInput() {
    return this.page.getByTestId('input-address');
  }

  get cityInput() {
    return this.page.getByTestId('input-city');
  }

  get postalInput() {
    return this.page.getByTestId('input-postal');
  }

  get countrySelect() {
    return this.page.getByTestId('select-country');
  }

  get cardInput() {
    return this.page.getByTestId('input-card');
  }

  get expiryInput() {
    return this.page.getByTestId('input-expiry');
  }

  get cvvInput() {
    return this.page.getByTestId('input-cvv');
  }

  get cardNameInput() {
    return this.page.getByTestId('input-cardname');
  }

  get firstNameValidationError() {
    return this.page.locator('.field-error').first();
  }

  get countryValidationError() {
    return this.page.locator('.field-error').nth(6);
  }

  get cardValidationError() {
    return this.page.locator('.field-error').nth(7);
  }

  @TestStep
  async open() {
    await this.navigate(ROUTES.checkout);
  }

  @TestStep
  async openAndExpectVisible() {
    await this.open();
    await this.assertVisible(this.checkoutForm, 'Checkout form should be visible when cart has products.');
  }

  @TestStep
  async prepareCheckoutForAuthenticatedUser() {
    const loginPage = new LoginPage(this.page);
    const navigation = new NavigationPage(this.page);
    const cartPage = new CartPage(this.page);

    await loginPage.clearUserSession();
    await cartPage.clearCartSession();
    await loginPage.openAndExpectVisible();
    await loginPage.loginAsDemoUser();
    await navigation.expectLoggedInState();
    await cartPage.openShop();
    await cartPage.addFirstProductFromShop();
    await this.openAndExpectVisible();
  }

  @TestStep
  async fillRequiredCheckoutForm(details: CheckoutDetails) {
    await this.fillField(this.firstNameInput, details.firstName);
    await this.fillField(this.lastNameInput, details.lastName);
    await this.fillField(this.emailInput, details.email);
    await this.fillField(this.phoneInput, details.phone);
    await this.fillField(this.addressInput, details.address);
    await this.fillField(this.cityInput, details.city);
    await this.fillField(this.postalInput, details.postal);
    await this.countrySelect.selectOption(details.country);
    await this.fillField(this.cardInput, details.cardNumber);
    await this.fillField(this.expiryInput, details.cardExpiry);
    await this.fillField(this.cvvInput, details.cardCvv);
    await this.fillField(this.cardNameInput, details.cardName);
  }

  @TestStep
  async placeOrder() {
    await this.placeOrderButton.click();
  }

  @TestStep
  async placeOrderWithRequiredDetails(details: CheckoutDetails) {
    await this.fillRequiredCheckoutForm(details);
    await this.placeOrder();
  }

  @TestStep
  async expectEmptyFormValidationErrors() {
    const allRequiredFieldsHaveError = await this.page
      .locator('input[required], select[required]')
      .evaluateAll((fields) =>
        fields.every((field) => {
          const formGroup = field.closest('.form-group');
          const errorEl = formGroup?.querySelector('.field-error');
          return errorEl?.classList.contains('show') && errorEl.textContent?.trim() === 'This field is required';
        })
      );

    expect(
      allRequiredFieldsHaveError,
      'All required checkout fields should show "This field is required" after empty submit.'
    ).toBe(true);
    await this.assertText(this.firstNameValidationError, 'This field is required');
    await this.assertText(this.countryValidationError, 'This field is required');
    await this.assertText(this.cardValidationError, 'This field is required');
  }

  @TestStep
  async expectStillOnCheckoutPage() {
    await this.assertURL(ROUTES.checkout, 'User should remain on checkout page when form validation fails.');
    await this.assertVisible(this.checkoutForm, 'Checkout form should remain visible after validation failure.');
  }
}
