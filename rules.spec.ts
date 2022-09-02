import { test as base, expect, chromium, BrowserContext } from "@playwright/test";
import path from "path";

// Override the base `test` command to override the browser context
// so we can load the Requestly extension from the /extension
// directory.
//
// Note that we have to run the test while the browser is in 'headed'
// mode for the browser extension to work correctly. The extension
// won't load when running headless.
export const test = base.extend<{
  context: BrowserContext;
}>({
  context: async ({}, use) => {
    const pathToExtension = path.join(__dirname, "extension");
    const context = await chromium.launchPersistentContext("", {
      headless: false,
      args: [`--disable-extensions-except=${pathToExtension}`, `--load-extension=${pathToExtension}`],
    });
    await use(context);
    await context.close();
  },
});

test("Redirect Request Rule", async ({ page }) => {
  // When the Requestly extension gets loaded in Chrome, it will
  // automatically open the Requestly roles page. While Playwright
  // has ways to manage multiple tabs/pages in the browser context,
  // for simplicity's sake we'll just open the page directly.
  await page.goto("https://app.requestly.io/rules/my-rules");

  await page.locator("#dashboardMainContent >> button:has-text('Create My First Rule')").click();
  await page.locator(".ant-card", { hasText: "Redirect Request" }).locator("button:has-text('Create')").click();

  await page.locator("input[name=name]").fill("Redirect Google to Requestly");
  await page.locator("input[placeholder='e.g. facebook']").fill("google.com");
  await page.locator("input[placeholder='e.g. http://www.new-example.com']").fill("https://requestly.io/");
  await page.locator("#dashboardMainContent >> button:has-text('Create Rule')").click();

  await page.goto("https://google.com/");
  await expect(page).toHaveURL("https://requestly.io/");
});
