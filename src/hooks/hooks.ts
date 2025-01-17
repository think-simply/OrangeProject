import { setDefaultTimeout, BeforeAll, AfterAll, Before, After, Status } from "@cucumber/cucumber";
import { Browser, BrowserContext, Page, chromium } from "@playwright/test";
import { pageFixture } from "./pageFixture";
import { authConfig } from '../../auth.config';

let browser: Browser;

interface TestContext {
  context?: BrowserContext;
  adminContext?: BrowserContext;
  staffContext?: BrowserContext;
  Page?: Page;
  adminPage?: Page;
  staffPage?: Page;
}

setDefaultTimeout(60 * 1000);

BeforeAll(async function () {
  browser = await chromium.launch({ headless: true });
});

AfterAll(async function () {
  await browser.close();
});

Before(async function (this: TestContext, scenario) {
  const tags = scenario.pickle.tags.map(tag => tag.name);

  if (tags.includes('@multiUserTest')) {
    // Create contexts for both admin and staff
    this.adminContext = await browser.newContext({
      storageState: authConfig.admin.storageState
    });
    
    this.staffContext = await browser.newContext({
      storageState: authConfig.staff.storageState
    });

    // Create pages for both contexts
    this.adminPage = await this.adminContext.newPage();
    this.staffPage = await this.staffContext.newPage();
    
    // Set the default Page to adminPage for screenshot purposes
    this.Page = this.adminPage;
    pageFixture.page = this.adminPage;
  } else {
    // Handle single user tests
    let userType: 'admin' | 'staff';
    
    if (tags.includes('@admin') || tags.includes('@apiSection')) {
      userType = 'admin';
    } else if (tags.includes('@staff')) {
      userType = 'staff';
    } else {
      throw new Error('No valid user type tag (@admin, @staff, or @multiUserTest) found in scenario');
    }

    // Create context for single user
    this.context = await browser.newContext({
      storageState: authConfig[userType].storageState,
    });

    this.Page = await this.context.newPage();
    pageFixture.page = this.Page;
  }
});

After(async function (this: TestContext, { pickle, result }) {
  // Take screenshot if test fails
  if (result?.status === Status.FAILED) {
    const sanitizedName = pickle.name.replace(/[:/\\]/g, '_');
    if (this.Page) {
      await this.Page.screenshot({
        path: `./test-results/screenshots/${sanitizedName}.png`,
        type: "png",
      });
    }
  }

  // Clean up all contexts and pages
  if (this.context) {
    await this.context.close();
  }
  if (this.adminContext) {
    await this.adminContext.close();
  }
  if (this.staffContext) {
    await this.staffContext.close();
  }
});