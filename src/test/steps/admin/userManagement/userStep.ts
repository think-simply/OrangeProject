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
When("User creates a new Admin user with employee {string}, username {string}, password {string}, confirm password {string}", { timeout: 30000 }, async (employee, username, pass, confirm) => {
    const adminMenuPage = new AdminMenuPage(pageFixture.adminPage);
    await adminMenuPage.createAdminUser(employee, username, pass, confirm);
    await adminMenuPage.searchUserName(username);
});
Then("New Admin user has been created successfully", { timeout: 30000 }, async () => {
    const adminMenuPage = new AdminMenuPage(pageFixture.adminPage);
    await adminMenuPage.verifyCreateAdminUser();
});
When("User creates a new ESS user with employee {string}, username {string}, password {string}, confirm password {string}", { timeout: 30000 }, async (employee, username, pass, confirm) => {
    const adminMenuPage = new AdminMenuPage(pageFixture.adminPage);
    await adminMenuPage.createEssUser(employee, username, pass, confirm);
    await adminMenuPage.searchUserName(username);
});
Then("New ESS user has been created successfully", { timeout: 30000 }, async () => {
    const adminMenuPage = new AdminMenuPage(pageFixture.adminPage);
    await adminMenuPage.verifyCreateEssUser();
});
When("User search by username : {string}", { timeout: 30000 }, async (userName) => {
    const adminMenuPage = new AdminMenuPage(pageFixture.adminPage);
    await adminMenuPage.searchUserName(userName);
});
Then("Alert no result has been displayed", { timeout: 30000 }, async () => {
    const adminMenuPage = new AdminMenuPage(pageFixture.adminPage);
    await adminMenuPage.verifySearchUserName();
});
Then("Result has been displayed follow username", { timeout: 30000 }, async () => {
    const adminMenuPage = new AdminMenuPage(pageFixture.adminPage);
    await adminMenuPage.verifySearchUserName(true);
});
When("User search by role: {string}", { timeout: 30000 }, async (role) => {
    const adminMenuPage = new AdminMenuPage(pageFixture.adminPage);
    await adminMenuPage.searchUserRole(role);
});
Then("Result has been displayed follow {string} role", { timeout: 30000 }, async (role) => {
    const adminMenuPage = new AdminMenuPage(pageFixture.adminPage);
    await adminMenuPage.verifySearchUserRole(true,role);
});
When("User search by employee name", { timeout: 30000 }, async () => {
    const adminMenuPage = new AdminMenuPage(pageFixture.adminPage);
    await adminMenuPage.searchEmployeeName();
});
Then("Result has been displayed follow employee name", { timeout: 30000 }, async () => {
    const adminMenuPage = new AdminMenuPage(pageFixture.adminPage);
    await adminMenuPage.verifySearchEmployeeName();
});
When("User search by status", { timeout: 30000 }, async () => {
    const adminMenuPage = new AdminMenuPage(pageFixture.adminPage);
    await adminMenuPage.searchStatus();
});
Then("Result has been displayed follow status", { timeout: 30000 }, async () => {
    const adminMenuPage = new AdminMenuPage(pageFixture.adminPage);
    await adminMenuPage.verifySearchStatus();
});
When("User enters values on search fields", { timeout: 30000 }, async () => {
    const adminMenuPage = new AdminMenuPage(pageFixture.adminPage);
    await adminMenuPage.inputDataForFields();
});
When("User click reset button", { timeout: 30000 }, async () => {
    const adminMenuPage = new AdminMenuPage(pageFixture.adminPage);
    await adminMenuPage.pressReset();
});
Then("Data on all search fields have been cleared", { timeout: 30000 }, async () => {
    const adminMenuPage = new AdminMenuPage(pageFixture.adminPage);
    await adminMenuPage.verifyFieldsAfterReset();
});
When("User update an account", { timeout: 30000 }, async () => {
    const adminMenuPage = new AdminMenuPage(pageFixture.adminPage);
    await adminMenuPage.updateAccount();
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
When("User removes multi account", { timeout: 30000 }, async (employee, username, pass, confirm) => {
    const adminMenuPage = new AdminMenuPage(pageFixture.adminPage);
    await adminMenuPage.createEssUser(employee, username, pass, confirm);
    await adminMenuPage.verifyCreateEssUser();
    await adminMenuPage.removeMultiAccount();
});
Then("All selected account have been deleted", { timeout: 30000 }, async () => {
    const adminMenuPage = new AdminMenuPage(pageFixture.adminPage);
    await adminMenuPage.verifyRemoveMultiAccount();
});

