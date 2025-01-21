import {
  setDefaultTimeout,
  BeforeAll,
  AfterAll,
  Before,
  After,
  Status,
} from "@cucumber/cucumber";
import { Browser, BrowserContext, chromium } from "@playwright/test";
import { pageFixture } from "./pageFixture";
import { authConfig } from "../../auth.config";
import { BasePage } from "#test/pages/BasePage";
import { AdminPage } from "#test/pages/admin/AdminPage";

let browser: Browser;

interface TestContext {
  adminContext: BrowserContext;
  staffContext: BrowserContext;
  Page: BasePage;
  adminPage: BasePage;
  staffPage: BasePage;
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

  let userType: "admin" | "staff";
  if (tags.includes("@admin") || tags.includes("@all")) {
    this.adminContext = await browser.newContext({
      storageState: authConfig["admin"].storageState,
    });
    const adminPage = await this.adminContext.newPage();
    pageFixture["adminPage"] = adminPage;
    pageFixture["page"] = adminPage;
  } 

  if (tags.includes("@staff") || tags.includes("@all")) {
    this.staffContext = await browser.newContext({
      storageState: authConfig["staff"].storageState,
    });
    const staffPage = await this.staffContext.newPage();
    pageFixture["staffPage"] = staffPage;
    pageFixture["page"] = staffPage;
  }
});

After(async function (this: TestContext, { pickle, result }) {
  if (result?.status === Status.FAILED) {
    const sanitizedName = pickle.name.replace(/:/g, ""); // Remove all colons
    
    if (this.adminPage) {
      await this.adminPage.takeScreenshot(
        `./test-results/screenshots/admin-${sanitizedName}.png`
      );
    }
    if (this.staffPage) {
      await this.staffPage.takeScreenshot(
        `./test-results/screenshots/staff-${sanitizedName}.png`
      );
    }
    
  }

  if (this.adminContext) {
    await this.adminContext.close();
  }

  if (this.staffContext) {
    await this.staffContext.close();
  }
});
