import { test, expect, chromium } from '@playwright/test'
const v8toIstanbul = require('v8-to-istanbul');

test('coverage', async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.coverage.startJSCoverage({reportAnonymousScripts: true});
    await page.goto('http://127.0.0.1:4200', {waitUntil: 'domcontentloaded', timeout: 5000});
    const coverage = await page.coverage.stopJSCoverage()
    for (const entry of coverage) {
        const converter = v8toIstanbul('', 0, { source: entry.source });
        await converter.load();
        converter.applyCoverage(entry.functions);
        console.log(JSON.stringify(converter.toIstanbul()));
    }
    await browser.close();  
})