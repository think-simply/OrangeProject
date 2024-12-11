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
    await adminMenuPage.afterAccessUserPage();
});

When("User creates a new Admin user", { timeout: 30000 }, async () => {
    const adminMenuPage = new AdminMenuPage(pageFixture.adminPage);
    await adminMenuPage.createAdminUser();
});
Then("New Admin user has been created successfully", { timeout: 30000 }, async () => {
    const adminMenuPage = new AdminMenuPage(pageFixture.adminPage);
    await adminMenuPage.afterCreateAdminUser();
});
When("User creates a new ESS user", { timeout: 30000 }, async () => {
    const adminMenuPage = new AdminMenuPage(pageFixture.adminPage);
    await adminMenuPage.createEssUser();
});
Then("New ESS user has been created successfully", { timeout: 30000 }, async () => {
    const adminMenuPage = new AdminMenuPage(pageFixture.adminPage);
    await adminMenuPage.afterCreateEssUser();
});

When("User search by username : {string}", { timeout: 30000 }, async (userName) => {
    const adminMenuPage = new AdminMenuPage(pageFixture.adminPage);
    await adminMenuPage.searchUserName(userName);
});

Then("Alert no result has been displayed", { timeout: 30000 }, async () => {
    const adminMenuPage = new AdminMenuPage(pageFixture.adminPage);
    await adminMenuPage.afterSearchUserName();
});

Then("Result has been displayed follow username", { timeout: 30000 }, async () => {
    const adminMenuPage = new AdminMenuPage(pageFixture.adminPage);
    await adminMenuPage.afterSearchUserName(true);
});

When("User search by role", { timeout: 30000 }, async () => {
    const adminMenuPage = new AdminMenuPage(pageFixture.adminPage);
    await adminMenuPage.searchUserRole();
});
Then("Result has been displayed follow role", { timeout: 30000 }, async () => {
    const adminMenuPage = new AdminMenuPage(pageFixture.adminPage);
    await adminMenuPage.afterSearchUserRole();
});
When("User search by employee name", { timeout: 30000 }, async () => {
    const adminMenuPage = new AdminMenuPage(pageFixture.adminPage);
    await adminMenuPage.searchEmployeeName();
});
Then("Result has been displayed follow employee name", { timeout: 30000 }, async () => {
    const adminMenuPage = new AdminMenuPage(pageFixture.adminPage);
    await adminMenuPage.afterSearchEmployeeName();
});

When("User search by status", { timeout: 30000 }, async () => {
    const adminMenuPage = new AdminMenuPage(pageFixture.adminPage);
    await adminMenuPage.searchStatus();
});
Then("Result has been displayed follow status", { timeout: 30000 }, async () => {
    const adminMenuPage = new AdminMenuPage(pageFixture.adminPage);
    await adminMenuPage.afterSearchStatus();
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
    await adminMenuPage.afterReset();
});

When("User update an account", { timeout: 30000 }, async () => {
    const adminMenuPage = new AdminMenuPage(pageFixture.adminPage);
    await adminMenuPage.updateAccount();
});
Then("Account has been updated", { timeout: 30000 }, async () => {
    const adminMenuPage = new AdminMenuPage(pageFixture.adminPage);
    await adminMenuPage.afterUpdateAccount();
});
When("User removes an account", { timeout: 30000 }, async () => {
    const adminMenuPage = new AdminMenuPage(pageFixture.adminPage);
    await adminMenuPage.removeAccount();
});
Then("Account has been deleted", { timeout: 30000 }, async () => {
    const adminMenuPage = new AdminMenuPage(pageFixture.adminPage);
    await adminMenuPage.afterRemoveAccount();
});

When("User removes multi account", { timeout: 30000 }, async () => {
    const adminMenuPage = new AdminMenuPage(pageFixture.adminPage);
    await adminMenuPage.createEssUser();
    await adminMenuPage.afterCreateEssUser();
    await adminMenuPage.removeMultiAccount();
});
Then("All selected account have been deleted", { timeout: 30000 }, async () => {
    const adminMenuPage = new AdminMenuPage(pageFixture.adminPage);
    await adminMenuPage.afterRemoveMultiAccount();
});

