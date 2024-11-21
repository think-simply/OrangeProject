import { BeforeAll, AfterAll, Before, After, Status } from "@cucumber/cucumber";
import { Browser, BrowserContext, Page, chromium } from "@playwright/test";
import { pageFixture } from "./pageFixture";


let browser: Browser;
let adminContext: BrowserContext;
let Context: BrowserContext;
let Page: Page;

BeforeAll(async () => {
  console.log("Launching browser...");
  browser = await chromium.launch({ headless: false });
});

AfterAll(async () => {
  console.log("Closing browser...");
  await browser.close();
});

Before(async function (this: any) { // Access 'this' for scenario context
  console.log('Creating new context and page...');
  Context = await browser.newContext();
  const page = await Context.newPage();
  pageFixture.page = page; 

  // Store the page in the Cucumber World for access in steps
  this.page = page; 
});

After(async function (this: any, { pickle, result }) {
  console.log("Closing context and page...");
  if (result?.status === Status.FAILED) {
    await this.page.screenshot({
      path: `./test-results/screenshots/${pickle.name}.png`,
      type: "png",
    });
  }
  
  if (pickle.tags.some(tag => tag.name === '@guest')) {
    await Context?.close();
  } else {
    await adminContext?.close();
  }
});