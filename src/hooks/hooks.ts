import { setDefaultTimeout, BeforeAll, AfterAll, Before, After, Status, } from "@cucumber/cucumber";
import { Browser, BrowserContext, Page, chromium } from "@playwright/test";
import { pageFixture } from "./pageFixture";
import { authConfig } from '#config/auth.config';

let browser: Browser;
interface TestContext {
  browser: Browser;
  adminContext: BrowserContext;
  staffContext: BrowserContext;
  Context: BrowserContext;
  Page: Page;
  adminPage: Page;
  staffPage: Page;
}
setDefaultTimeout(60 * 1000);

BeforeAll(async function () {
  browser = await chromium.launch({ headless: true });
});

AfterAll(async function () {
  await browser.close();
});

Before(async function (this: TestContext, scenario) {
  const tags = scenario.pickle.tags.map((tag) => tag.name);

  // let userType: "admin" | "staff";
  if (tags.includes("@admin") || tags.includes("@all") || tags.includes('@apiSection')) {
    this.adminContext = await browser.newContext({
      storageState: authConfig.admin.storageState,
    });
    const adminPage = await this.adminContext.newPage();
    pageFixture.adminPage = adminPage;
    pageFixture.page = adminPage;
  }

  if (tags.includes("@staff") || tags.includes("@all")) {
    this.staffContext = await browser.newContext({
      storageState: authConfig.staff.storageState,
    });
    const staffPage = await this.staffContext.newPage();
    pageFixture.staffPage = staffPage;
    pageFixture.page = staffPage;
  }
  if (tags.includes("@guest")) {
    this.Context = await browser.newContext();
    const Page = await this.Context.newPage();
    pageFixture.page = Page;

  }
});

After(async function (this: TestContext, { pickle, result }) {
  if (result?.status === Status.FAILED) {
    const sanitizedName = pickle.name.replace(/:/g, ""); // Remove all colons

    if (this.adminPage) {
      await this.adminPage.screenshot({
        path: `./test-results/screenshots/admin-${sanitizedName}.png`,
        type: "png",
      });
    }
    if (this.staffPage) {
      await this.staffPage.screenshot({
        path: `./test-results/screenshots/staff-${sanitizedName}.png`,
        type: "png",
      });
    }

  }

  if (this.adminContext) {
    await this.adminContext.close();
  }
  if (this.staffContext) {
    await this.staffContext.close();
  }
  if (this.Context) {
    await this.Context.close();
  }
});