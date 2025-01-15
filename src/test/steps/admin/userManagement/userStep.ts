import { Given, When, Then, BeforeStep } from "@cucumber/cucumber";
import UserPage from "../../../pages/admin/userManagement/userPage";
import { pageFixture } from "../../../../hooks/pageFixture";
let userPage: UserPage;
BeforeStep( async() => {
    userPage = new UserPage(pageFixture.page);
})

Given("User navigates to page", async () => {
    await userPage.visit();
});
When("User access User management page", async () => {
    await userPage.accessUserPage();
});
Then("User management page has been displayed", async () => {
    await userPage.verifyUserPageUI();
});
When("User creates a new user with role {string} and employee {string}, username {string}, password {string}, confirm password {string}", async (role, employee, username, pass, confirm) => {
    await userPage.createUser(role, employee, username, pass, confirm);
    await userPage.searchUserName(username);
});
When("User creates a new user with role {string} and employee {string}, username {string}, password {string}, confirm password {string} successfully", async (role, employee, username, pass, confirm) => {
    await adminMenuPage.createUser(role, employee, username, pass, confirm);
});
Then("New {string} user has been created successfully", async (text) => {
    await userPage.verifyCreateUser(text);
});
When("User search by username : {string}", async (userName) => {
    await userPage.searchUserName(userName);
});
Then("Alert no result and {string} text has been displayed", async (text) => {
    await userPage.verifySearchUserName(false, text);
});
Then("Result {string} has been displayed follow username", async (text) => {
    await userPage.verifySearchUserName(true, text);
});
When("User search by role: {string}", async (role) => {
    await userPage.searchUserRole(role);
});
Then("Result has been displayed follow {string} role", async (role) => {
    await userPage.verifySearchUserRole(true, role);
});
When("User search by employee name: {string}", async (text) => {
    await userPage.searchEmployeeName(text);
});
Then("Result has been displayed follow employee name: {string}", async (result) => {
    await userPage.verifySearchEmployeeName(result);
});
When("User search by status: {string}", async (status) => {
    await userPage.searchStatus(status);
});
Then("Result has been displayed follow {string} status", async (status) => {
    await userPage.verifySearchStatus(status);
});
When("User enters values on search fields:username {string}, userrole {string},employeename {string},status {string}", async (username, role, text, status) => {
    await userPage.inputDataForFields(username, role, text, status);
});
When("User click reset button", async () => {
    await userPage.pressReset();
});
Then("Data on all search fields have been cleared", async () => {
    await userPage.verifyFieldsAfterReset();
});
When("User update account {string} to new username: {string}", async (textTrial, newname) => {
    await userPage.updateAccount(textTrial, newname);
});
Then("Account has been updated to new username: {string}", async (updatetext) => {
    await userPage.verifyUpdateAccount(updatetext);
});
When("User removes an account: {string}", async (text) => {
    await userPage.removeAccount(text);
});
Then("Account {string} has been deleted", async (updatetext) => {
    await userPage.verifyRemoveAccount(updatetext);
});
When("User removes all accounts contain text {string}", async (text) => {
    await userPage.removeMultiAccount(text);
});
Then("All selected account contain text {string} have been deleted", async (demotext) => {
    await userPage.verifyRemoveMultiAccount(demotext);
});
When("User enter on {string} value {string}", async (demotext, text) => {
    await userPage.enterValueOnFields(demotext, text);
});
Then("Message will displayed under {string} as {string}", async (validation, text) => {
    await userPage.verifyValidationMessage(validation, text);
});
When("User clicks save button with empty fields", async () => {
    await userPage.enterValueOnDropdownFields();
});
When("User enter on Password value {string} and Confirm Password value {string}", async (value1, value2) => {
    await userPage.enterValueOnConfirmPass(value1, value2);
});


