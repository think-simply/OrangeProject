import { setDefaultTimeout, BeforeAll, AfterAll, Before, After, Status, } from "@cucumber/cucumber";
import { Browser, BrowserContext, Page, chromium } from "@playwright/test";
import { pageFixture } from "./pageFixture";
import { authConfig } from '../../auth.config';

let browser: Browser;
interface TestContext {
  context: BrowserContext;
  adminContext: BrowserContext;
  Page: Page;
  nonLoggedContext: BrowserContext;
  nonLoggedPage: Page;
  
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
  
  // Tạo context cho user chưa login
  this.nonLoggedContext = await browser.newContext();
  this.nonLoggedPage = await this.nonLoggedContext.newPage();
  pageFixture.nonLoggedPage = this.nonLoggedPage;

  // Xác định user type cho context đã login
  let userType: 'admin' | 'staff';
  if (tags.includes('@admin') || tags.includes('@apiSection')) {
    userType = 'admin';
  } else if (tags.includes('@staff')) {
    userType = 'staff';
  } else {
    throw new Error('No user type tag (@admin or @staff) found in scenario');
  }

  // Tạo context cho user đã login
  this.context = await browser.newContext({
    storageState: authConfig[userType].storageState,
  });

  this.Page = await this.context.newPage();
  pageFixture.page = this.Page;
});

After(async function (this: TestContext, { pickle, result }) {
  if (result?.status === Status.FAILED) {
    const sanitizedName = pickle.name.replace(/:/g, ''); // Remove all colons
    await this.Page.screenshot({
      path: `./test-results/screenshots/${sanitizedName}.png`,
      type: "png",
    });
  }
  if (this.context) {
    await this.context.close();
  }
  if (this.nonLoggedContext) {
    await this.nonLoggedContext.close();
  }
});

