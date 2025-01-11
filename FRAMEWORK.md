
# Playwright Testing Framework Guide with Page Object Model, Cucumber BDD, and GitHub Actions

## 1. Overview
This guide outlines the steps to set up a testing framework using Playwright, Cucumber BDD, Page Object Model (POM), and GitHub Actions for Continuous Integration (CI).

## 2. Prerequisites
Before proceeding, ensure you have the following:
- Node.js installed
- GitHub account
- GitHub repository
- Playwright installed
- Cucumber installed

## 3. Setting Up Project
### 3.1 Initialize Node.js Project
Run the following commands to initialize a Node.js project:
```bash
mkdir "your project name"
cd "your project name"
npm init -y
```

### 3.2 Install Dependencies
Install Playwright, Cucumber, and other necessary packages:
```bash
npm install playwright @cucumber/cucumber @playwright/test ts-node 
```

## 4. Folder Structure
Create the following folder structure:
```plaintext
your-project-name/
├── src/
│   ├── tests/
│   │   ├── features/
│   │   │   ├── login.feature
│   │   ├── steps/
│   │   │   ├── loginSteps.ts
│   │   ├── pages/
│   │   │   ├── loginPage.ts
│   ├── hooks/
│   │   ├── hooks.ts
│   │   ├── pageFixture.ts
│   ├── helper/
│   │   ├── init.ts
├── package.json
├── cucumber.js
```

### 4.1 `features/` Folder
This folder contains the Gherkin feature files where you define your tests using BDD syntax.

Example: `features/login.feature`
```gherkin
@emailSub
Feature: Functions in Configuration menu: Email subscription
  Background:
    Given User navigates to page

  @low
  Scenario: ES_01: Check page UI
    When User access Email subscription page
    Then Email subscription page has displayed as expected
```

### 4.2 `pages/` Folder
This folder contains your page objects, representing different screens in your application.

Example: `pages/emailConfigPage.ts`
```javascript
import { Page, expect } from "@playwright/test";

export default class EmailConfigPage {
    readonly page: Page;
    constructor(page: Page) {
        this.page = page;
    }
    elements = {
        adminMenu: () => this.page.locator('//span[text()="Admin"]'),
        addBtn: () => this.page.locator('//button[normalize-space()="Add"]'),
        configurationSubMenu: () => this.page.locator('//span[normalize-space()="Configuration"]'),
        emailNoti: () => this.page.locator('//a[normalize-space()="Email Subscriptions"]'),
        toggle: () => this.page.locator('//div[text()="Leave Applications"]//ancestor::div[@class="oxd-table-row oxd-table-row--with-border"]//descendant::span'),
        pageTitle: () => this.page.locator('//h6[text()="Email Subscriptions"]'),
        notiTypeColumn: () => this.page.locator('//div[text()="Notification Type"]'),
        subscribeColumn: () => this.page.locator('//div[text()="Subscribers"]'),
        actionColumn: () => this.page.locator('//div[text()="Actions"]'),
        leaveApplication: () => this.page.locator('//div[text()="Leave Applications"]'),
        leaveApproval: () => this.page.locator('//div[text()="Leave Approvals"]'),
        leaveAssignment: () => this.page.locator('//div[text()="Leave Assignments"]'),
        leaveCancel: () => this.page.locator('//div[text()="Leave Cancellations"]'),
        leaveReject: () => this.page.locator('//div[text()="Leave Rejections"]'),
    }
    async navigateToEmailSubscription() {
        await this.elements.adminMenu().click();
        await this.elements.configurationSubMenu().click();
        await this.elements.emailNoti().click();
    } 
}
```

### 4.3 `steps/` Folder
This folder contains the step definition files where you map the Gherkin steps to the Playwright actions.

Example: `steps/loginSteps.js`
```javascript
import { When, Then, BeforeStep } from "@cucumber/cucumber";
import EmailConfigPage from "../../../pages/admin/configuration/emailSubscriptions";
import { pageFixture } from "../../../../hooks/pageFixture";
let emailConfigPage: EmailConfigPage;
BeforeStep(async () => {
    emailConfigPage = new EmailConfigPage(pageFixture.adminPage);
});
When("User access Email subscription page", async () => {
    await emailConfigPage.navigateToEmailSubscription();
});
```

### 4.4 `hooks/` Folder
This folder contains hooks to manage test lifecycle events like before and after each test.

Example: `hooks/hooks.ts`
```javascript
import { setDefaultTimeout, BeforeAll, AfterAll, Before, After, Status, } from "@cucumber/cucumber";
import { Browser, BrowserContext, Page, chromium } from "@playwright/test";
import { pageFixture } from "./pageFixture";
import { authConfig } from '../../auth.config';


let browser: Browser;
interface TestContext {
  adminContext: BrowserContext;
  Page: Page;
  adminPage: Page;
}
setDefaultTimeout(60 * 1000);
BeforeAll(async function () {
  browser = await chromium.launch({ headless: true });
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

After(async function (this: TestContext, { pickle, result }) {
  // console.log("Closing context and page...");
  if (result?.status === Status.FAILED) {
    const sanitizedName = pickle.name.replace(/:/g, ''); // Remove all colons
    await this.Page.screenshot({
      path: `./test-results/screenshots/${sanitizedName}.png`,
      type: "png",
    });
  }
  await this.Page.close();

});
```

### 4.5 `cucumber.json` Configuration
Create a `cucumber.json` file to specify the paths to your feature and step files.

```javascript
{
  "default": {
    "formatOptions": {
      "snippetInterface": "async-await"
    },
    "paths": ["src/tests/features/", "src/tests/api/features/"],
    "dryRun": false,
    "require": ["src/tests/steps/**", "src/hooks/hooks.ts", "src/tests/api/steps/**"],
    "requireModule": ["ts-node/register"],
    "format": [
      "progress",
      "html:test-results/cucumber-report.html",
      "json:test-results/cucumber-report.json",
      "rerun:@rerun.txt"
    ],
    "parallel": 1
  }
}
```

## 5. Running Tests Locally
To run the tests locally, use the following command:
```bash
npx cucumber-js
```

This will execute your tests and output the results in the terminal.

## 6. Integrating with GitHub Actions

### 6.1 Create GitHub Action Workflow
Create a `.github/workflows/test.yml` file in your repository to automate test execution.

```yaml
name: Playwright Cucumber Tests
concurrency:
  group: ${{ github.workflow }}
on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]
jobs:
  e2e_on_pull_request:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: lts/*
      - name: Install dependencies
        run: npm ci
```

### 6.2 Push Code to GitHub
Once you've set up your GitHub Actions workflow, push your code to your GitHub repository:
```bash
git add .
git commit -m "Setup Playwright BDD Framework with GitHub Actions"
git push origin main
```

## 7. Conclusion
You've now set up a Playwright testing framework with Page Object Model, Cucumber BDD, and GitHub Actions for CI. The framework allows you to write tests in a behavior-driven format, implement reusable page objects, and automate test execution in the cloud using GitHub Actions.
