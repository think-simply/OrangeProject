import { Given, When, Then } from "@cucumber/cucumber";
import AdminMenuPage from "../../../pages/admin/userManagement/userPage";
import { pageFixture } from "../../../../hooks/pageFixture";


Given("User navigates to page", { timeout: 30000 }, async () => {
    const adminMenuPage = new AdminMenuPage(pageFixture.adminPage);
    await adminMenuPage.visit();
});
When("User logs in as Admin", { timeout: 30000 }, async () => {
    const adminMenuPage = new AdminMenuPage(pageFixture.adminPage);
    await adminMenuPage.login();
});
When("User access User management page", { timeout: 30000 }, async () => {
    const adminMenuPage = new AdminMenuPage(pageFixture.adminPage);
    await adminMenuPage.accessUserPage();
});
Then("User management page has been displayed", { timeout: 30000 }, async () => {
    const adminMenuPage = new AdminMenuPage(pageFixture.adminPage);
    await adminMenuPage.verifyUserPageUI();
});
When("User creates a new user with role {string} and employee {string}, username {string}, password {string}, confirm password {string}", { timeout: 30000 }, async (role, employee, username, pass, confirm) => {
    const adminMenuPage = new AdminMenuPage(pageFixture.adminPage);
    await adminMenuPage.createUser(role, employee, username, pass, confirm);
    await adminMenuPage.searchUserName(username);
});
Then("New {string} user has been created successfully", { timeout: 30000 }, async (text) => {
    const adminMenuPage = new AdminMenuPage(pageFixture.adminPage);
    await adminMenuPage.verifyCreateUser(text);
});
When("User search by username : {string}", { timeout: 30000 }, async (userName) => {
    const adminMenuPage = new AdminMenuPage(pageFixture.adminPage);
    await adminMenuPage.searchUserName(userName);
});
Then("Alert no result has been displayed", { timeout: 30000 }, async (text) => {
    const adminMenuPage = new AdminMenuPage(pageFixture.adminPage);
    await adminMenuPage.verifySearchUserName(false,text);
});
Then("Result {string} has been displayed follow username", { timeout: 30000 }, async (text) => {
    const adminMenuPage = new AdminMenuPage(pageFixture.adminPage);
    await adminMenuPage.verifySearchUserName(true,text);
});
When("User search by role: {string}", { timeout: 30000 }, async (role) => {
    const adminMenuPage = new AdminMenuPage(pageFixture.adminPage);
    await adminMenuPage.searchUserRole(role);
});
Then("Result has been displayed follow {string} role", { timeout: 30000 }, async (role) => {
    const adminMenuPage = new AdminMenuPage(pageFixture.adminPage);
    await adminMenuPage.verifySearchUserRole(true, role);
});
When("User search by employee name: {string}", { timeout: 30000 }, async (text) => {
    const adminMenuPage = new AdminMenuPage(pageFixture.adminPage);
    await adminMenuPage.searchEmployeeName(text);
});
Then("Result has been displayed follow employee name: {string}", { timeout: 30000 }, async (result) => {
    const adminMenuPage = new AdminMenuPage(pageFixture.adminPage);
    await adminMenuPage.verifySearchEmployeeName(result);
});
When("User search by status: {string}", { timeout: 30000 }, async (status) => {
    const adminMenuPage = new AdminMenuPage(pageFixture.adminPage);
    await adminMenuPage.searchStatus(status);
});
Then("Result has been displayed follow {string} status", { timeout: 30000 }, async (status) => {
    const adminMenuPage = new AdminMenuPage(pageFixture.adminPage);
    await adminMenuPage.verifySearchStatus(status);
});
When("User enters values on search fields:username {string}, userrole {string},employeename {string},status {string}", { timeout: 30000 }, async (username, role, text, status) => {
    const adminMenuPage = new AdminMenuPage(pageFixture.adminPage);
    await adminMenuPage.inputDataForFields(username, role, text, status);
});
When("User click reset button", { timeout: 30000 }, async () => {
    const adminMenuPage = new AdminMenuPage(pageFixture.adminPage);
    await adminMenuPage.pressReset();
});
Then("Data on all search fields have been cleared", { timeout: 30000 }, async () => {
    const adminMenuPage = new AdminMenuPage(pageFixture.adminPage);
    await adminMenuPage.verifyFieldsAfterReset();
});
When("User update account {string} to new username: {string}", { timeout: 30000 }, async (textTrial,newname) => {
    const adminMenuPage = new AdminMenuPage(pageFixture.adminPage);
    await adminMenuPage.updateAccount(textTrial,newname);
});
Then("Account has been updated", { timeout: 30000 }, async () => {
    const adminMenuPage = new AdminMenuPage(pageFixture.adminPage);
    await adminMenuPage.verifyUpdateAccount();
});
When("User removes an account", { timeout: 30000 }, async () => {
    const adminMenuPage = new AdminMenuPage(pageFixture.adminPage);
    await adminMenuPage.removeAccount();
});
Then("Account has been deleted", { timeout: 30000 }, async () => {
    const adminMenuPage = new AdminMenuPage(pageFixture.adminPage);
    await adminMenuPage.verifyRemoveAccount();
});
// When("User removes multi account", { timeout: 30000 }, async () => {
//     const adminMenuPage = new AdminMenuPage(pageFixture.adminPage);
//     await adminMenuPage.removeMultiAccount();
// });
// Then("All selected account have been deleted", { timeout: 30000 }, async () => {
//     const adminMenuPage = new AdminMenuPage(pageFixture.adminPage);
//     await adminMenuPage.verifyRemoveMultiAccount();
// });

