import { async } from '@angular/core/testing';
import { test, expect } from '@playwright/test';

test.describe('order dialog',() => {
    test.beforeEach(async ({page}) => {
        await page.goto('http://127.0.0.1:4200', {waitUntil: 'domcontentloaded', timeout: 5000});
    });
    test('open order dialog with form', async ({page}) => {
        const buyBtn = await page.$(".btn.buy");
        await buyBtn.click();
        const orderBtn = page.locator('[data-toggle=modal]');
        await orderBtn.click();
        const modal = page.getByRole('dialog');
        expect(modal).toBeAttached();
        // expect modal to have close button
        const closeBtn = modal.locator("button.close");
        expect(closeBtn).toBeAttached();
    })
});