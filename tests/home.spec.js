const { test, expect } = require("@playwright/test");

test("shows hello dialog when the button is clicked", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: "Hello World" })).toBeVisible();

  page.once("dialog", async (dialog) => {
    expect(dialog.message()).toBe("Hello!");
    await dialog.accept();
  });

  await page.getByRole("button", { name: "Click me" }).click();
});
