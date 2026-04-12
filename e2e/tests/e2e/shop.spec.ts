import { test, expect } from '@/fixtures/index';

test.describe('PawShop shop', () => {
  test.beforeEach(async ({ pom }) => {
    await pom.shopPage.openAndExpectVisible();
  });

  test('The product grid should load with all products visible', async ({ pom }) => {
    await pom.shopPage.expectProductCount(16, 'Shop should show all products by default.');
    await expect(pom.shopPage.productCards).toHaveCount(16);
  });

  test('Filtering by a category should show only products from that category', async ({ pom }) => {
    await pom.shopPage.filterByFoodCategory();
    await pom.shopPage.expectOnlyCategoryVisible('food', 4);
    await expect(pom.shopPage.productCards).toHaveCount(4);
  });

  test('Sorting products by price ascending should reorder the product list correctly', async ({ pom }) => {
    await pom.shopPage.sortByPriceAscending();
    await pom.shopPage.expectPricesSortedAscending();
    const prices = await pom.shopPage.getVisiblePrices();
    expect(prices.length).toBeGreaterThan(0);
  });

  test('Resetting filters should restore all products', async ({ pom }) => {
    await pom.shopPage.filterByFoodCategory();
    await pom.shopPage.expectProductCount(4, 'Food filter should reduce visible products before reset.');
    await expect(pom.shopPage.productCards).toHaveCount(4);

    await pom.shopPage.resetFilters();
    await pom.shopPage.expectProductCount(16, 'Reset filters should restore the full product grid.');
    await expect(pom.shopPage.productCards).toHaveCount(16);
  });
});
