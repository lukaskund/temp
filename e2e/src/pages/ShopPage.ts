import { ROUTES } from '@/constants/routes';
import { expect } from '@/fixtures/index';
import { TestStep } from '@/helpers/test-step';
import { BasePage } from '@/pages/BasePage';

export class ShopPage extends BasePage {
  get shopPageHeader() {
    return this.page.getByTestId('shop-page-header');
  }

  get productCards() {
    return this.page.getByTestId('product-card');
  }

  get filterFood() {
    return this.page.getByTestId('filter-food');
  }

  get resetFiltersButton() {
    return this.page.getByTestId('reset-filters');
  }

  get sortSelect() {
    return this.page.getByTestId('sort-select');
  }

  @TestStep
  async open() {
    await this.navigate(ROUTES.shop);
  }

  @TestStep
  async openAndExpectVisible() {
    await this.open();
    await this.expectShopPageVisible();
  }

  @TestStep
  async expectShopPageVisible() {
    await this.assertVisible(this.shopPageHeader, 'Shop page header should be visible.');
    await this.assertVisible(this.productCards.first(), 'Product grid should render product cards.');
  }

  @TestStep
  async filterByFoodCategory() {
    await this.filterFood.locator('input').check();
  }

  @TestStep
  async sortByPriceAscending() {
    await this.sortSelect.selectOption('price-asc');
  }

  @TestStep
  async resetFilters() {
    await this.resetFiltersButton.click();
  }

  @TestStep
  async getVisibleProductCount() {
    return this.productCards.count();
  }

  @TestStep
  async getVisibleCategories() {
    return this.productCards.evaluateAll((cards) =>
      cards.map((card) => card.getAttribute('data-category') ?? '')
    );
  }

  @TestStep
  async getVisiblePrices() {
    return this.productCards.evaluateAll((cards) =>
      cards.map((card) => Number.parseFloat(card.getAttribute('data-price') ?? '0'))
    );
  }

  @TestStep
  async expectProductCount(expectedCount: number, message?: string) {
    await expect(
      this.productCards,
      message ?? `Shop should display ${expectedCount} products.`
    ).toHaveCount(expectedCount);
  }

  @TestStep
  async expectOnlyCategoryVisible(expectedCategory: string, expectedCount: number) {
    await this.expectProductCount(
      expectedCount,
      `${expectedCategory} category filter should show ${expectedCount} products.`
    );

    const categories = await this.getVisibleCategories();
    expect
      .soft(
        categories.every((category) => category === expectedCategory),
        `Every visible product should belong to ${expectedCategory} category.`
      )
      .toBe(true);
  }

  @TestStep
  async expectPricesSortedAscending() {
    const prices = await this.getVisiblePrices();
    const sortedPrices = [...prices].sort((a, b) => a - b);
    expect(prices, 'Product prices should be displayed in ascending order.').toEqual(sortedPrices);
  }
}
