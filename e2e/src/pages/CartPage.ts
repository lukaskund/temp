import { ROUTES } from '@/constants/routes';
import { TestStep } from '@/helpers/test-step';
import { BasePage } from '@/pages/BasePage';
import { clearLocalStorageKeys } from '@/utils/helpers';

export class CartPage extends BasePage {
  get addToCartButtons() {
    return this.page.getByTestId('add-to-cart');
  }

  get cartItems() {
    return this.page.getByTestId('cart-item');
  }

  get cartItemNames() {
    return this.page.getByTestId('cart-item-name');
  }

  get qtyIncreaseButtons() {
    return this.page.getByTestId('qty-increase');
  }

  get removeItemButtons() {
    return this.page.getByTestId('remove-item-btn');
  }

  get summarySubtotal() {
    return this.page.getByTestId('summary-subtotal');
  }

  get summaryShipping() {
    return this.page.getByTestId('summary-shipping');
  }

  get summaryTotal() {
    return this.page.getByTestId('summary-total');
  }

  get promoInput() {
    return this.page.getByTestId('promo-input');
  }

  get applyPromoButton() {
    return this.page.getByTestId('apply-promo-btn');
  }

  get promoMessage() {
    return this.page.getByTestId('promo-message');
  }

  get emptyCartState() {
    return this.page.getByTestId('cart-empty');
  }

  @TestStep
  async openShop() {
    await this.navigate(ROUTES.shop);
  }

  @TestStep
  async openCart() {
    await this.navigate(ROUTES.cart);
  }

  @TestStep
  async clearCartSession() {
    if (this.page.url() === 'about:blank') {
      await this.navigate(ROUTES.home);
    }
    await clearLocalStorageKeys(this.page, ['pawshop_cart']);
  }

  @TestStep
  async addFirstProductFromShop() {
    await this.addToCartButtons.first().click();
  }

  @TestStep
  async increaseFirstItemQuantity() {
    await this.qtyIncreaseButtons.first().click();
  }

  @TestStep
  async removeFirstCartItem() {
    await this.removeItemButtons.first().click();
  }

  @TestStep
  async applyPromoCode(code: string) {
    await this.fillField(this.promoInput, code);
    await this.applyPromoButton.click();
  }

  @TestStep
  async expectCartHasItems() {
    await this.assertVisible(this.cartItems.first(), 'Cart should contain at least one item.');
  }

  @TestStep
  async expectEmptyCartVisible() {
    await this.assertVisible(this.emptyCartState, 'Empty cart state should be visible.');
  }

  @TestStep
  async readSummaryTotalValue() {
    const value = await this.summaryTotal.innerText();
    return Number.parseFloat(value.replace('$', ''));
  }
}
