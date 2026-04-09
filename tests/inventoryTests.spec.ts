import { test, expect } from "@playwright/test";

test.describe("SauceDemo Post-Login Functionality Tests", () => {
  // 1. Verify inventory page loads correctly
  test("Inventory page displays products", async ({ page }) => {
    await page.goto("https://www.saucedemo.com/");
    await page.getByRole('textbox', { name: 'Username' }).fill('standard_user');
    await page.getByRole('textbox', { name: 'Password' }).fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();
    
    await expect(page).toHaveURL(/inventory/);

    const items = page.locator(".inventory_item");
    const count = await items.count();
    expect(count).toBeGreaterThanOrEqual(1);
  });

  // 2. Add item to cart
  test("Add item to cart", async ({ page }) => {
    await page.goto("https://www.saucedemo.com/");
    await page.getByRole('textbox', { name: 'Username' }).fill('standard_user');
    await page.getByRole('textbox', { name: 'Password' }).fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).toHaveURL(/inventory/);

    await page.click('button[data-test="add-to-cart-sauce-labs-backpack"]');
    await expect(page.locator(".shopping_cart_badge")).toHaveText("1");
  });

  // 3. Remove item from cart
  test("Remove item from cart", async ({ page }) => {
    await page.goto("https://www.saucedemo.com/");
    await page.getByRole('textbox', { name: 'Username' }).fill('standard_user');
    await page.getByRole('textbox', { name: 'Password' }).fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).toHaveURL(/inventory/);

    const button = page.locator(
      'button[data-test="add-to-cart-sauce-labs-backpack"]',
    );
    await button.click();
    await page.click('button[data-test="remove-sauce-labs-backpack"]');

    await expect(page.locator(".shopping_cart_badge")).toHaveCount(0);
  });

  // 4. Navigate to cart page
  test("Navigate to cart page", async ({ page }) => {
    await page.goto("https://www.saucedemo.com/");
    await page.getByRole('textbox', { name: 'Username' }).fill('standard_user');
    await page.getByRole('textbox', { name: 'Password' }).fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).toHaveURL(/inventory/);

    await page.click(".shopping_cart_link");
    await expect(page).toHaveURL(/cart/);
  });

  // 5. Verify product sorting (A-Z)
  test("Sort products A to Z", async ({ page }) => {
    await page.goto("https://www.saucedemo.com/");
    await page.getByRole('textbox', { name: 'Username' }).fill('standard_user');
    await page.getByRole('textbox', { name: 'Password' }).fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).toHaveURL(/inventory/);

    await page.selectOption(".product_sort_container", "az");

    const firstItem = await page
      .locator(".inventory_item_name")
      .first()
      .textContent();
    expect(firstItem).toBeTruthy(); // basic validation
  });

  // 6. Verify product sorting (Price low to high)
  test("Sort products by price low to high", async ({ page }) => {
    await page.goto("https://www.saucedemo.com/");
    await page.getByRole('textbox', { name: 'Username' }).fill('standard_user');
    await page.getByRole('textbox', { name: 'Password' }).fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).toHaveURL(/inventory/);

    await page.selectOption(".product_sort_container", "lohi");

    const prices = await page
      .locator(".inventory_item_price")
      .allTextContents();
    const numericPrices = prices.map((p) => parseFloat(p.replace("$", "")));

    const sorted = [...numericPrices].sort((a, b) => a - b);
    expect(numericPrices).toEqual(sorted);
  });

  // 7. Logout functionality
  test("User can logout successfully", async ({ page }) => {
    await page.goto("https://www.saucedemo.com/");
    await page.getByRole('textbox', { name: 'Username' }).fill('standard_user');
    await page.getByRole('textbox', { name: 'Password' }).fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).toHaveURL(/inventory/);

    await page.click("#react-burger-menu-btn");
    await page.click("#logout_sidebar_link");

    await expect(page).toHaveURL("https://www.saucedemo.com/");
  });

  // 8. Complete checkout flow
  test("Complete checkout process", async ({ page }) => {
    await page.goto("https://www.saucedemo.com/");
    await page.getByRole('textbox', { name: 'Username' }).fill('standard_user');
    await page.getByRole('textbox', { name: 'Password' }).fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).toHaveURL(/inventory/);

    await page.click('button[data-test="add-to-cart-sauce-labs-backpack"]');
    await page.click(".shopping_cart_link");
    await page.click('[data-test="checkout"]');

    await page.fill('[data-test="firstName"]', "John");
    await page.fill('[data-test="lastName"]', "Doe");
    await page.fill('[data-test="postalCode"]', "12345");

    await page.click('[data-test="continue"]');
    await page.click('[data-test="finish"]');

    await expect(page.locator(".complete-header")).toHaveText(
      "Thank you for your order!",
    );
  });
});
