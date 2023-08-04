import { test, expect } from '@playwright/test';
import { browser } from 'protractor';

test.describe('homepage', () => {
  test.beforeEach(async ({page}) => {
    await page.goto('http://127.0.0.1:4200', {waitUntil: 'domcontentloaded', timeout: 5000});
  });

  test('search input works', async ({ page }) => {
    await page.waitForSelector("#exampleInput");
    // await page.waitForURL('**/home');
    expect(page).toHaveTitle("MyApp");
    const searchInput = page.locator("#exampleInput");
    await searchInput.click();
    await searchInput.type("Huawei Y6");
    const buyBtn = await page.$$(".btn.buy");
    const results = page.locator("app-card");
    expect(buyBtn).toHaveLength(2);
  });

  test('add to cart button', async ({ page }) => {
    const buyBtn = await page.$(".btn.buy");
    await buyBtn.click();
    const cartQuantity = await page.$(".shopingCartItemsQuantity");
    expect(page.url()).toMatch(/shopingCart/i);
    expect(await cartQuantity.innerText()).toEqual("1");
  });

  test("going back from cart succeeds", async ({ page }) => {
    const buyBtn = await page.$(".btn.buy");
    await buyBtn.click();
    const goBackBtn = page.getByText("Продовжити покупки");
    await goBackBtn.click();

    expect(page.url()).toMatch(/home/);
    expect(page.url()).not.toMatch(/shopingCart/i); 
  });

  test("remove product from cart", async ({ page }) => {
    const buyBtn = await page.$(".btn.buy");
    await buyBtn.click();
    // await page.waitForURL("**/shopingCart");
    const removeBtn = page.getByRole("button").getByText("Видалити");
    await removeBtn.click();
    expect(await page.$('.emptyShopingCart')).toBeDefined();
  });
})
