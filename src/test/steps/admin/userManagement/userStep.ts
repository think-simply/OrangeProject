import { Given, When, Then, BeforeStep } from "@cucumber/cucumber";
import UserPage from "#test/pages/admin/userManagement/userPage";
import { pageFixture } from "#hooks/pageFixture";
import { ApiContextManager } from "#test/api/services/ApiContextManager";
import UserService from "#test/api/services/UserService";
let userPage: UserPage;
let staffPage: UserPage;
let userService: UserService;

BeforeStep(async function () {
  userPage = new UserPage(pageFixture.page);
  //staffPage = new UserPage(pageFixture.staffPage);
});

Given("User navigates to page", async function () {
  await userPage.visit();
  //await staffPage.visit();
});
When("User access User management page", async function () {
  await userPage.accessUserPage();
});
Then("User management page has been displayed", async function () {
  await userPage.verifyUserPageUI();
});
When(
  "User creates a new user with role {string} and employee {string}, username {string}, password {string}, confirm password {string}",
  async function (role, employee, username, pass, confirm) {
    const apiContext = await ApiContextManager.initializeContext(
      `${process.env.USER_API_URL}`
    );
    userService = new UserService(apiContext);
    await userService.listAndDeleteUser(username);
    await userPage.createUser(role, employee, username, pass, confirm);
    await userPage.searchUserName(username);
  }
);

Then(
  "New {string} user has been created successfully",
  async function (userName) {
    await userPage.verifyCreatedUser(userName);
  }
);
When("User search by username: {string}", async function (userName) {
  await userPage.searchUserName(userName);
});
Then(
  "Alert no result and {string} text has been displayed",
  async function (text) {
    await userPage.verifySearchUserName(false, text);
  }
);
Then(
  "Result {string} has been displayed follow username",
  async function (text) {
    await userPage.verifySearchUserName(true, text);
  }
);
When("User search by role: {string}", async function (role) {
  await userPage.searchUserRole(role);
});
Then("Result has been displayed follow {string} role", async function (role) {
  await userPage.verifySearchUserRole(true, role);
});
When("User search by employee name: {string}", async function (text) {
  await userPage.searchEmployeeName(text);
});
Then(
  "Result has been displayed follow employee name: {string}",
  async function (result) {
    await userPage.verifySearchEmployeeName(result);
  }
);
When("User search by status: {string}", async function (status) {
  await userPage.searchStatus(status);
});
Then(
  "Result has been displayed follow {string} status",
  async function (status) {
    await userPage.verifySearchStatus(status);
  }
);
When(
  "User enters values on search fields:username {string}, userrole {string},employeename {string},status {string}",
  async function (username, role, text, status) {
    await userPage.inputDataForFields(username, role, text, status);
  }
);
When("User click reset button", async function () {
  await userPage.pressReset();
});
Then("Data on all search fields have been cleared", async function () {
  await userPage.verifyFieldsAfterReset();
});
When(
  "User update account {string} to new username: {string}",
  async function (textTrial, newname) {
    const apiContext = await ApiContextManager.initializeContext(
      `${process.env.USER_API_URL}`
    );
    userService = new UserService(apiContext);
    await userService.listAndDeleteUser(newname);

    await userPage.updateAccount(textTrial, newname);
  }
);
Then(
  "Account has been updated to new username: {string}",
  async function (newname) {
    await userPage.verifyUpdatedAccount(newname);
  }
);

When("User removes an account: {string}", async function (text) {
  await userPage.removeAccount(text);
});
Then("Account {string} has been deleted", async function (userName) {
  await userPage.verifyRemovedAccount(userName);
});
When(
  "User removes all accounts contain text {string}",
  async function (userName) {
    await userPage.removeMultiAccount(userName);
  }
);
Then(
  "All selected account contain text {string} have been deleted",
  async function (userName) {
    await userPage.verifyRemoveMultiAccount(userName);
  }
);
When("User enter on {string} value {string}", async function (demotext, text) {
  await userPage.enterValueOnFields(demotext, text);
});
Then(
  "Message will displayed under {string} as {string}",
  async function (validation, text) {
    await userPage.verifyValidationMessage(validation, text);
  }
);
When("User clicks save button with empty fields", async function () {
  await userPage.enterValueOnDropdownFields();
});
When(
  "User enter on Password value {string} and Confirm Password value {string}",
  async function (value1, value2) {
    await userPage.enterValueOnConfirmPass(value1, value2);
  }
);
