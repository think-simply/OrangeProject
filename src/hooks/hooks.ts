import { BeforeAll, AfterAll, Before, After, Status } from "@cucumber/cucumber";
import { Browser, BrowserContext, Page, chromium } from "@playwright/test";
import { pageFixture } from "./pageFixture";
import { authConfig } from '../../auth.config';


let browser: Browser;
let adminContext: BrowserContext;
let Page: Page;
let adminPage: Page;

BeforeAll(async () => {
  console.log("Launching browser...");
  browser = await chromium.launch({ headless: false });
});

AfterAll(async () => {
  console.log("Closing browser...");
  await browser.close();
});

Before(async function (this: any) {
  // Create context with stored credentials for admin
  adminContext = await browser.newContext({
    storageState: authConfig.admin.storageState
  });
  adminPage = await adminContext.newPage();
  pageFixture.adminPage = adminPage;

  console.log("Creating new contexts and pages with auth...");
  this.page = adminPage; // Default to admin page
});

After(async function (this: any, { pickle, result }) {
  console.log("Closing context and page...");
  if (result?.status === Status.FAILED) {
    console.log("Taking screenshot...");
    await this.page.screenshot({
      path: `./test-results/screenshots/${pickle.name}.png`,
      type: "png",
    });
  }
  await this.page.close();

});