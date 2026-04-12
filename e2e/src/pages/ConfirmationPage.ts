import { ROUTES } from '@/constants/routes';
import { expect } from '@/fixtures/index';
import { TestStep } from '@/helpers/test-step';
import { BasePage } from '@/pages/BasePage';

export class ConfirmationPage extends BasePage {
  get confirmationPageRoot() {
    return this.page.getByTestId('confirmation-page');
  }

  get orderNumber() {
    return this.page.getByTestId('order-number');
  }

  get confirmedTotal() {
    return this.page.getByTestId('confirmed-total');
  }

  @TestStep
  async open() {
    await this.navigate(ROUTES.confirmation);
  }

  @TestStep
  async openAndExpectVisible() {
    await this.open();
    await this.expectVisible();
  }

  @TestStep
  async expectVisible() {
    await this.assertURL(ROUTES.confirmation, 'User should be redirected to the confirmation page.');
    await this.assertVisible(this.confirmationPageRoot, 'Confirmation page should be visible after checkout.');
  }

  @TestStep
  async expectOrderNumberVisible() {
    await this.assertVisible(this.orderNumber, 'Confirmation page should display an order number.');
  }

  @TestStep
  async expectOrderNumberGenerated() {
    await this.expectOrderNumberVisible();
    await expect(this.orderNumber, 'Order number placeholder should be replaced with generated value.').not.toHaveText('—');
    await expect(this.orderNumber, 'Order number should follow the generated PW-xxxxxx format.').toHaveText(
      /PW-[A-Z0-9]{6}/
    );
  }

  @TestStep
  async expectConfirmedTotalVisible() {
    await this.assertVisible(this.confirmedTotal, 'Confirmation should display paid order total.');
    const totalText = await this.confirmedTotal.innerText();
    const totalValue = Number.parseFloat(totalText.replace('$', ''));
    expect(totalValue, 'Confirmed total should be a positive amount.').toBeGreaterThan(0);
  }
}
