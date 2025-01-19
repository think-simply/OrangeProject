import { setDefaultTimeout, BeforeAll, AfterAll, Before, After, Status, } from "@cucumber/cucumber";
import { Browser, BrowserContext, Page, chromium } from "@playwright/test";
import { pageFixture } from "./pageFixture";
import { authConfig } from "../../auth.config";

let browser: Browser;
interface TestContext {
  adminContext: BrowserContext;
  Page: Page;
}
setDefaultTimeout(60 * 1000);

BeforeAll(async function () {
  browser = await chromium.launch({ headless: true });
});

AfterAll(async function () {
  await browser.close();
});

Before(async function (this: any, scenario) {
  const tags = scenario.pickle.tags.map(tag => tag.name);
  // Determine user type based on tags
  let userType: 'admin' | 'staff';
  if (tags.includes('@admin') || tags.includes('@apiSection')) {
    userType = 'admin';
  } else if (tags.includes('@staff')) {
    userType = 'staff';
  } else {
    throw new Error('No user type tag (@admin or @staff) found in scenario');
  }
  // Create context with stored credentials
  this.context = await browser.newContext({
    storageState: authConfig[userType].storageState,
  });

  const page = await this.context.newPage();
  pageFixture["page"] = page; // Store page in fixture
  this.Page = page; // Default to the page for the current user type
});

After(async function (this: TestContext, { pickle, result }) {
  if (result?.status === Status.FAILED) {
    const sanitizedName = pickle.name.replace(/:/g, ''); // Remove all colons
    await this.Page.screenshot({
      path: `./test-results/screenshots/${sanitizedName}.png`,
      type: "png",
    });
  }
  await this.Page.close();
});

