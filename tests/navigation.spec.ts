import { test, expect } from '@playwright/test'

test.describe("navigation", () => {
    test.beforeEach(async ({page}) => {
        await page.goto('http://127.0.0.1:4200', {waitUntil: 'domcontentloaded', timeout: 5000});
    });

    test("contacts link works", async ({ page }) => {
        const contactsLink = page.getByText("Контакти");
        await contactsLink.click();
        expect(page.url()).toMatch(/contacts/);
        expect(await page.$('iframe')).toBeDefined();
      });
    
    test("delivery link works", async ({ page }) => {
        const deliveryLink = page.getByText("Доставка");
        await deliveryLink.click();
        expect(page.url()).toMatch(/delivery/);
        await expect(page.getByRole('heading', {name: 'ДОСТАВКА'})).toBeAttached();
    });
    
    test("payment link works", async ({ page }) => {
        const paymentLink = page.getByText("Оплата");
        await paymentLink.click();
        expect(page.url()).toMatch(/payment/);
        await expect(page.getByRole('heading', {name: 'ОПЛАТА'})).toBeAttached();
    });

    test("click on cart icon", async ({page}) => {
        const cartIcon = await page.$('.nav-link.shopingCart');
        await cartIcon.click();
        expect(page.url()).toMatch(/shopingCart/i);
    });
})
