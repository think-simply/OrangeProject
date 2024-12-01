import { BeforeAll, AfterAll, Before, After, Status } from "@cucumber/cucumber";
import { Browser, BrowserContext, Page, chromium } from "@playwright/test";
import { pageFixture } from "./pageFixture";
import { authConfig } from "../../auth.Config";

let browser: Browser;
let adminContext: BrowserContext;
//let Context: BrowserContext;
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
  // Access 'this' for scenario context
  console.log("\n Creating new context and page...");
  adminContext = await browser.newContext({
    storageState: authConfig.admin.storageState, //Đây là trạng thái lưu trữ (cookie, localStorage) của trình duyệt, được lấy từ file cấu hình authConfig.admin.storageState.
  });
  adminPage = await adminContext.newPage();
  pageFixture.adminPage = adminPage; //dung khi file goi ra khong co class
  this.page = adminPage; //dung page. khi file goi ra co class
  console.log("Creating admin context and page...");
});

After(async function (this: any, { pickle, result }) {
  console.log("Closing context and page...");
  if (result?.status === Status.FAILED) {
    await this.page.screenshot({
      path: `./test-results/screenshots/${pickle.name}.png`,
      type: "png",
    });
  }
  // if (pickle.tags.some((tag) => tag.name === "@guest")) {
  //   await adminContext?.close();
  // } else {
  //   await adminContext?.close();
  // }
});