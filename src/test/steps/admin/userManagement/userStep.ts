import { Given, When, Then } from "@cucumber/cucumber";
import AdminMenuPage from "../../../pages/admin/userManagement/userPage";
import { pageFixture } from "../../../../hooks/pageFixture";


Given("User navigates to page", async () => {
    const adminMenuPage = new AdminMenuPage(pageFixture.adminPage);
    await adminMenuPage.visit();
});
When("User access User management page", async () => {
    const adminMenuPage = new AdminMenuPage(pageFixture.adminPage);
    await adminMenuPage.accessUserPage();
});
Then("User management page has been displayed", async () => {
    const adminMenuPage = new AdminMenuPage(pageFixture.adminPage);
    await adminMenuPage.verifyUserPageUI();
});
When("User creates a new user with role {string} and employee {string}, username {string}, password {string}, confirm password {string}", async (role, employee, username, pass, confirm) => {
    const adminMenuPage = new AdminMenuPage(pageFixture.adminPage);
    await adminMenuPage.createUser(role, employee, username, pass, confirm);
    await adminMenuPage.searchUserName(username);
});
Then("New {string} user has been created successfully", async (text) => {
    const adminMenuPage = new AdminMenuPage(pageFixture.adminPage);
    await adminMenuPage.verifyCreateUser(text);
});
When("User search by username : {string}", async (userName) => {
    const adminMenuPage = new AdminMenuPage(pageFixture.adminPage);
    await adminMenuPage.searchUserName(userName);
});
Then("Alert no result and {string} text has been displayed", async (text) => {
    const adminMenuPage = new AdminMenuPage(pageFixture.adminPage);
    await adminMenuPage.verifySearchUserName(false, text);
});
Then("Result {string} has been displayed follow username", async (text) => {
    const adminMenuPage = new AdminMenuPage(pageFixture.adminPage);
    await adminMenuPage.verifySearchUserName(true, text);
});
When("User search by role: {string}", async (role) => {
    const adminMenuPage = new AdminMenuPage(pageFixture.adminPage);
    await adminMenuPage.searchUserRole(role);
});
Then("Result has been displayed follow {string} role", async (role) => {
    const adminMenuPage = new AdminMenuPage(pageFixture.adminPage);
    await adminMenuPage.verifySearchUserRole(true, role);
});
When("User search by employee name: {string}", async (text) => {
    const adminMenuPage = new AdminMenuPage(pageFixture.adminPage);
    await adminMenuPage.searchEmployeeName(text);
});
Then("Result has been displayed follow employee name: {string}", async (result) => {
    const adminMenuPage = new AdminMenuPage(pageFixture.adminPage);
    await adminMenuPage.verifySearchEmployeeName(result);
});
When("User search by status: {string}", async (status) => {
    const adminMenuPage = new AdminMenuPage(pageFixture.adminPage);
    await adminMenuPage.searchStatus(status);
});
Then("Result has been displayed follow {string} status", async (status) => {
    const adminMenuPage = new AdminMenuPage(pageFixture.adminPage);
    await adminMenuPage.verifySearchStatus(status);
});
When("User enters values on search fields:username {string}, userrole {string},employeename {string},status {string}", async (username, role, text, status) => {
    const adminMenuPage = new AdminMenuPage(pageFixture.adminPage);
    await adminMenuPage.inputDataForFields(username, role, text, status);
});
When("User click reset button", async () => {
    const adminMenuPage = new AdminMenuPage(pageFixture.adminPage);
    await adminMenuPage.pressReset();
});
Then("Data on all search fields have been cleared", async () => {
    const adminMenuPage = new AdminMenuPage(pageFixture.adminPage);
    await adminMenuPage.verifyFieldsAfterReset();
});
When("User update account {string} to new username: {string}", async (textTrial, newname) => {
    const adminMenuPage = new AdminMenuPage(pageFixture.adminPage);
    await adminMenuPage.updateAccount(textTrial, newname);
});
Then("Account has been updated to new username: {string}", async (updatetext) => {
    const adminMenuPage = new AdminMenuPage(pageFixture.adminPage);
    await adminMenuPage.verifyUpdateAccount(updatetext);
});
When("User removes an account: {string}", async (text) => {
    const adminMenuPage = new AdminMenuPage(pageFixture.adminPage);
    await adminMenuPage.removeAccount(text);
});
Then("Account {string} has been deleted", async (updatetext) => {
    const adminMenuPage = new AdminMenuPage(pageFixture.adminPage);
    await adminMenuPage.verifyRemoveAccount(updatetext);
});
When("User removes all accounts contain text {string}", async (text) => {
    const adminMenuPage = new AdminMenuPage(pageFixture.adminPage);
    await adminMenuPage.removeMultiAccount(text);
});
Then("All selected account contain text {string} have been deleted",async (demotext) => {
    const adminMenuPage = new AdminMenuPage(pageFixture.adminPage);
    await adminMenuPage.verifyRemoveMultiAccount(demotext);
});
When("User enter on {string} value {string}", async (demotext,text) => {
    const adminMenuPage = new AdminMenuPage(pageFixture.adminPage);
    await adminMenuPage.enterValueOnFields(demotext,text);
});
Then("Message will displayed under {string} as {string}",async (validation,text) => {
    const adminMenuPage = new AdminMenuPage(pageFixture.adminPage);
    await adminMenuPage.verifyValidationMessage(validation,text);
});
When("User clicks save button with empty fields", async () => {
    const adminMenuPage = new AdminMenuPage(pageFixture.adminPage);
    await adminMenuPage.enterValueOnDropdownFields();
});

