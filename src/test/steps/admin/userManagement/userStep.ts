import { Given, When, Then, BeforeStep } from "@cucumber/cucumber";
import AdminMenuPage from "../../../pages/admin/userManagement/userPage";
import { pageFixture } from "../../../../hooks/pageFixture";
let adminMenuPage: AdminMenuPage;
BeforeStep(async () => {
    adminMenuPage = new AdminMenuPage(pageFixture.adminPage);
});
Given("User navigates to page", async () => {
    await adminMenuPage.visit();
});
When("User access User management page", async () => {
    await adminMenuPage.accessUserPage();
});
Then("User management page has been displayed", async () => {
    await adminMenuPage.verifyUserPageUI();
});
When("User creates a new user with role {string} and employee {string}, username {string}, password {string}, confirm password {string}", async (role, employee, username, pass, confirm) => {
    await adminMenuPage.createUser(role, employee, username, pass, confirm);
    await adminMenuPage.searchUserName(username);
});
Then("New {string} user has been created successfully", async (text) => {
    await adminMenuPage.verifyCreateUser(text);
});
When("User search by username : {string}", async (userName) => {
    await adminMenuPage.searchUserName(userName);
});
Then("Alert no result and {string} text has been displayed", async (text) => {
    await adminMenuPage.verifySearchUserName(false, text);
});
Then("Result {string} has been displayed follow username", async (text) => {
    await adminMenuPage.verifySearchUserName(true, text);
});
When("User search by role: {string}", async (role) => {
    await adminMenuPage.searchUserRole(role);
});
Then("Result has been displayed follow {string} role", async (role) => {
    await adminMenuPage.verifySearchUserRole(true, role);
});
When("User search by employee name: {string}", async (text) => {
    await adminMenuPage.searchEmployeeName(text);
});
Then("Result has been displayed follow employee name: {string}", async (result) => {
    await adminMenuPage.verifySearchEmployeeName(result);
});
When("User search by status: {string}", async (status) => {
    await adminMenuPage.searchStatus(status);
});
Then("Result has been displayed follow {string} status", async (status) => {
    await adminMenuPage.verifySearchStatus(status);
});
When("User enters values on search fields:username {string}, userrole {string},employeename {string},status {string}", async (username, role, text, status) => {
    await adminMenuPage.inputDataForFields(username, role, text, status);
});
When("User click reset button", async () => {
    await adminMenuPage.pressReset();
});
Then("Data on all search fields have been cleared", async () => {
    await adminMenuPage.verifyFieldsAfterReset();
});
When("User update account {string} to new username: {string}", async (textTrial, newname) => {
    await adminMenuPage.updateAccount(textTrial, newname);
});
Then("Account has been updated to new username: {string}", async (updatetext) => {
    await adminMenuPage.verifyUpdateAccount(updatetext);
});
When("User removes an account: {string}", async (text) => {
    await adminMenuPage.removeAccount(text);
});
Then("Account {string} has been deleted", async (updatetext) => {
    await adminMenuPage.verifyRemoveAccount(updatetext);
});
When("User removes all accounts contain text {string}", async (text) => {
    await adminMenuPage.removeMultiAccount(text);
});
Then("All selected account contain text {string} have been deleted", async (demotext) => {
    await adminMenuPage.verifyRemoveMultiAccount(demotext);
});
When("User enter on {string} value {string}", async (demotext, text) => {
    await adminMenuPage.enterValueOnFields(demotext, text);
});
Then("Message will displayed under {string} as {string}", async (validation, text) => {
    await adminMenuPage.verifyValidationMessage(validation, text);
});
When("User clicks save button with empty fields", async () => {
    await adminMenuPage.enterValueOnDropdownFields();
});
When("User enter on Password value {string} and Confirm Password value {string}", async (value1, value2) => {
    await adminMenuPage.enterValueOnConfirmPass(value1, value2);
});


