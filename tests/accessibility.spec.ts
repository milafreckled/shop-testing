import { test, expect } from '@playwright/test'
import { AxeBuilder } from '@axe-core/playwright';

test('accessibility passes', async ({page}) => {
    await page.goto('http://127.0.0.1:4200', {waitUntil: 'domcontentloaded', timeout: 5000});
    const accessibilityScanResults = await new AxeBuilder({page}).analyze()
    expect(accessibilityScanResults.violations).toEqual([]);
})