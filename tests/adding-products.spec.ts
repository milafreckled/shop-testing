import { async } from '@angular/core/testing';
import { test, expect } from '@playwright/test';

test.describe('add product',() => {
    test.beforeEach(async ({page}) => {
        await page.goto('http://127.0.0.1:4200', {waitUntil: 'domcontentloaded', timeout: 5000});
    });
    test('add product', async ({page}) => {
        const buyBtn = page.locator(".btn.buy").first();
        await buyBtn.click();
        const sum = page.locator('table td:nth-of-type(5)');
        const sumValue = Number(await sum.innerText());
        const numberInput = page.locator('input[type=number]');
        await numberInput.click().then(() => numberInput.fill('2'));
        expect(Number(await sum.innerText())).toEqual(2 * sumValue);
    })
})