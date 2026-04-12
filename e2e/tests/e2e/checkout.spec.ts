import { test, expect } from '@/fixtures/index';
import { buildCheckoutDetails } from '../test-data/checkout-data';

test.describe('PawShop checkout', () => {
  const checkoutDetails = buildCheckoutDetails();

  test.beforeEach(async ({ authenticatedPom }) => {
    await authenticatedPom.checkoutPage.prepareCheckoutForAuthenticatedUser();
  });

  test('A logged in user who completes the full checkout form should be redirected to the confirmation page', async ({ authenticatedPom }) => {
    await authenticatedPom.checkoutPage.placeOrderWithRequiredDetails(checkoutDetails);
    await authenticatedPom.confirmationPage.expectVisible();
    await authenticatedPom.confirmationPage.expectConfirmedTotalVisible();
    await expect(authenticatedPom.confirmationPage.confirmationPageRoot).toBeVisible();
    await authenticatedPom.cartPage.openCart();
    await authenticatedPom.cartPage.expectEmptyCartVisible();
  });

  test('Submitting an empty checkout form should show validation errors', async ({ authenticatedPom }) => {
    await authenticatedPom.checkoutPage.placeOrder();

    await authenticatedPom.checkoutPage.expectEmptyFormValidationErrors();
    await authenticatedPom.checkoutPage.expectStillOnCheckoutPage();
    await expect(authenticatedPom.checkoutPage.firstNameValidationError).toHaveText('This field is required');
  });

  test('The order confirmation page should show an order number', async ({ authenticatedPom }) => {
    await authenticatedPom.checkoutPage.placeOrderWithRequiredDetails(checkoutDetails);
    await authenticatedPom.confirmationPage.expectVisible();
    await authenticatedPom.confirmationPage.expectOrderNumberGenerated();
    await expect(authenticatedPom.confirmationPage.orderNumber).toBeVisible();
  });
});
