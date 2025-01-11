
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
mkdir playwright-bdd-framework
cd playwright-bdd-framework
npm init -y
```

### 3.2 Install Dependencies
Install Playwright, Cucumber, and other necessary packages:
```bash
npm install playwright @cucumber/cucumber @playwright/test
```

## 4. Folder Structure
Create the following folder structure:
```plaintext
playwright-bdd-framework/
├── features/
│   ├── login.feature
├── steps/
│   ├── loginSteps.js
├── pageObjects/
│   ├── loginPage.js
├── support/
│   ├── hooks.js
├── package.json
├── cucumber.js
```

### 4.1 `features/` Folder
This folder contains the Gherkin feature files where you define your tests using BDD syntax.

Example: `features/login.feature`
```gherkin
Feature: User login

  Scenario: Successful login with valid credentials
    Given I open the login page
    When I enter valid credentials
    Then I should be logged in successfully
```

### 4.2 `pageObjects/` Folder
This folder contains your page objects, representing different screens in your application.

Example: `pageObjects/loginPage.js`
```javascript
class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = page.locator('#username');
    this.passwordInput = page.locator('#password');
    this.submitButton = page.locator('#submit');
  }

  async open() {
    await this.page.goto('https://example.com/login');
  }

  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }
}

module.exports = LoginPage;
```

### 4.3 `steps/` Folder
This folder contains the step definition files where you map the Gherkin steps to the Playwright actions.

Example: `steps/loginSteps.js`
```javascript
const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const LoginPage = require('../pageObjects/loginPage');

let loginPage;

Given('I open the login page', async function () {
  loginPage = new LoginPage(this.page);
  await loginPage.open();
});

When('I enter valid credentials', async function () {
  await loginPage.login('testuser', 'password123');
});

Then('I should be logged in successfully', async function () {
  const successMessage = await this.page.locator('.success-message');
  await expect(successMessage).toBeVisible();
});
```

### 4.4 `support/` Folder
This folder contains hooks to manage test lifecycle events like before and after each test.

Example: `support/hooks.js`
```javascript
const { Before, After } = require('@cucumber/cucumber');
const { chromium } = require('playwright');

let browser;
let page;

Before(async function () {
  browser = await chromium.launch();
  page = await browser.newPage();
  this.page = page;
});

After(async function () {
  await browser.close();
});
```

### 4.5 `cucumber.js` Configuration
Create a `cucumber.js` file to specify the paths to your feature and step files.

```javascript
module.exports = {
  default: {
    require: [
      'steps/**/*.js',
      'support/**/*.js'
    ],
    format: ['json:./results/cucumber_report.json'],
    publishQuiet: true
  }
};
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
name: Playwright BDD Tests

on:
  push:
    branches:
      - main

jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [16.x]

    steps:
    - name: Checkout code
      uses: actions/checkout@v2

    - name: Set up Node.js
      uses: actions/setup-node@v2
      with:
        node-version: ${{ matrix.node-version }}

    - name: Install dependencies
      run: npm install

    - name: Run Playwright BDD tests
      run: npx cucumber-js
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
