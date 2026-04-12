import { test, expect } from '@/fixtures/index';

test.describe('PawShop cart', () => {
  test.beforeEach(async ({ pom }) => {
    await pom.cartPage.clearCartSession();
  });

  test.describe('With products in cart', () => {
    test.beforeEach(async ({ pom }) => {
      await pom.cartPage.openShop();
      await pom.cartPage.addFirstProductFromShop();
      await pom.cartPage.openCart();
      await pom.cartPage.expectCartHasItems();
    });

    test('A product added from the shop should appear in the cart', async ({ pom }) => {
      await expect(pom.cartPage.cartItemNames.first(), 'Added product should appear in cart item list.').toBeVisible();
    });

    test('Increasing the quantity of a cart item should update the total price', async ({ pom }) => {
      const totalBefore = await pom.cartPage.readSummaryTotalValue();
      await pom.cartPage.increaseFirstItemQuantity();
      const totalAfter = await pom.cartPage.readSummaryTotalValue();

      expect(totalAfter, 'Cart total should increase after quantity is increased.').toBeGreaterThan(totalBefore);
    });

    test('Removing the only product from the cart should show an empty cart state', async ({ pom }) => {
      await pom.cartPage.removeFirstCartItem();
      await pom.cartPage.expectEmptyCartVisible();
      await expect(pom.cartPage.cartItems, 'Cart items should be removed after deleting the only product.').toHaveCount(0);
    });

    test('Applying the promo code PAWFREE should make shipping free', async ({ pom }) => {
      await pom.cartPage.applyPromoCode('PAWFREE');
      await expect(pom.cartPage.promoMessage, 'Promo code should confirm free shipping was applied.').toHaveText(
        '✓ Free shipping applied!'
      );
      await expect(pom.cartPage.summaryShipping, 'Shipping summary should display free shipping.').toHaveText('FREE');
    });
  });

  test('Navigating to the cart without any products should show an empty cart message', async ({ pom }) => {
    await pom.cartPage.openCart();
    await pom.cartPage.expectEmptyCartVisible();
    await expect(pom.cartPage.emptyCartState, 'Empty cart should explain that no products are present.').toContainText(
      'Your cart is empty'
    );
  });
});
