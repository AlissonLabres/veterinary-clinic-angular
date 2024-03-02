import { BeforeAll, AfterAll, Before, After, Status } from '@cucumber/cucumber';
import { Browser, BrowserContext, chromium } from '@playwright/test';
import { fixture } from './fixture';

let browser: Browser;
let context: BrowserContext;

BeforeAll(async () => {
  browser = await chromium.launch({ headless: false, timeout: 10000 });
});

AfterAll(async () => {
  await browser.close();
});

Before(async () => {
  context = await browser.newContext();
  fixture.page = await context.newPage();
});

After(async ({ pickle, result }) => {
  if (result?.status == Status.FAILED) {
    await fixture.page.screenshot({
      path: `tests/reports/screenshots/${pickle.name}.png`,
      type: 'png',
    });
  }

  await fixture.page.close();
  await context.close();
});
