import { setDefaultTimeout, BeforeAll, AfterAll, Before, After, Status, } from "@cucumber/cucumber";
import { Browser, BrowserContext, Page, chromium } from "@playwright/test";
import { pageFixture } from "./pageFixture";
import { authConfig } from '../../auth.config';


let browser: Browser;
interface TestContext {
  adminContext: BrowserContext;
  Page: Page;
  adminPage: Page;
  browser: Browser;
  memberContext: BrowserContext;
  Context: BrowserContext;
  memberPage: Page;
 
}
setDefaultTimeout(60 * 1000);
BeforeAll(async function () {
  browser = await chromium.launch({ headless: false });
});

AfterAll(async function () {
  await browser.close();
});

Before(async function (this: TestContext) {
  // Create context with stored credentials for admin
  this.adminContext = await browser.newContext({
    storageState: authConfig.admin.storageState
  });
  const adminPage = await this.adminContext.newPage();
  pageFixture.adminPage = adminPage;
  this.Page = adminPage; // Default to admin page
});

// Before(async function (this: any, { pickle }) {  // Sử dụng pickle thay vì tags
//   if (pickle.tags.some(tag => tag.name === '@guest')) {  // Kiểm tra tag @guest
//     // Create context for guest (non-logged in users)
//     this.Context = await browser.newContext();
//     this.Page = await this.Context.newPage();
//     pageFixture.page = this.Page;
//     this.page = this.Page;
//     
//   } else if (pickle.tags.some(tag => tag.name === '@member')) {
//     // Create context for member
//     this.memberContext = await browser.newContext({
//       storageState: authConfig.staff.storageState
//     });
//     this.memberPage = await this.memberContext.newPage();
//     // (Optional) Configure member context if needed (e.g., storageState)
//     this.page = this.memberPage;
//    
//   } else {  // Mặc định sẽ tạo admin context
//     // Create context with stored credentials for admin
//     this.adminContext = await browser.newContext({
//       storageState: authConfig.admin.storageState
//     });
//     this.adminPage = await this.adminContext.newPage();
//     pageFixture.adminPage = this.adminPage;
//     this.page = this.adminPage;
//     c
//   }
// });

After(async function (this: TestContext, { pickle, result }) {
 
  if (result?.status === Status.FAILED) {
    const sanitizedName = pickle.name.replace(/:/g, ''); // Remove all colons
    await this.Page.screenshot({
      path: `./test-results/screenshots/${sanitizedName}.png`,
      type: "png",
    });
  }
  // await this.Page.close();
  if (pickle.tags.some(tag => tag.name === '@guest')) {
    await this.Context?.close();
  } else {
    await this.adminContext?.close();
  }

});
//   if (pickle.tags.some((tag) => tag.name === "@guest")) {
//     await adminContext?.close();
//   } else {
//     await adminContext?.close();
//   }
// });
