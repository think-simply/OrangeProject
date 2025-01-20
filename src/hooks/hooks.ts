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

  this.adminContext = await browser.newContext({
    storageState: authConfig["admin"].storageState,
  });

  this.staffContext = await browser.newContext({
    storageState: authConfig["staff"].storageState,
  });

  // Create page instances for admin and staff
  const adminPage = await this.adminContext.newPage();
  const staffPage = await this.staffContext.newPage();
  pageFixture["adminPage"] = adminPage;
  pageFixture["staffPage"] = staffPage;

  let userType: "admin" | "staff";
  if (tags.includes("@admin")) {
    userType = "admin";
    pageFixture["page"] = adminPage;
  } else if (tags.includes("@staff")) {
    userType = "staff";
    pageFixture["page"] = staffPage;
  }

});

After(async function (this: TestContext, { pickle, result }) {
  if (result?.status === Status.FAILED) {
    const sanitizedName = pickle.name.replace(/:/g, ""); // Remove all colons
    await this.adminPage.takeScreenshot(
      `./test-results/screenshots/admin-${sanitizedName}.png`
    );
    await this.staffPage.takeScreenshot(
      `./test-results/screenshots/staff-${sanitizedName}.png`
    );
  }

  await this.adminContext.close();
  await this.staffContext.close();
});
