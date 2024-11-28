import { Given, When, Then } from "@cucumber/cucumber";
import AdminMenuPage from "../../../pages/admin/userManagement/userPage";
import { pageFixture } from "../../../../hooks/pageFixture";


Given("User navigates to page", { timeout: 30000 }, async () => {
    const adminMenuPage = new AdminMenuPage(pageFixture.page);
    await adminMenuPage.visit();
});
When("User logs in as Admin", { timeout: 30000 }, async () => {
    const adminMenuPage = new AdminMenuPage(pageFixture.page);
    await adminMenuPage.login();
});
When("User access User management page", { timeout: 30000 }, async () => {
    const adminMenuPage = new AdminMenuPage(pageFixture.page);
    await adminMenuPage.accessUserPage();
});
Then("User management page has been displayed", { timeout: 30000 }, async () => {
    const adminMenuPage = new AdminMenuPage(pageFixture.page);
    await adminMenuPage.afterAccessUserPage();
});

When("User creates a new Admin user", { timeout: 30000 }, async () => {
    const adminMenuPage = new AdminMenuPage(pageFixture.page);
    await adminMenuPage.createAdminUser();
});
Then("New Admin user has been created successfully", { timeout: 30000 }, async () => {
    const adminMenuPage = new AdminMenuPage(pageFixture.page);
    await adminMenuPage.afterCreateAdminUser();
});
When("User creates a new ESS user", { timeout: 30000 }, async () => {
    const adminMenuPage = new AdminMenuPage(pageFixture.page);
    await adminMenuPage.createEssUser();
});
Then("New ESS user has been created successfully", { timeout: 30000 }, async () => {
    const adminMenuPage = new AdminMenuPage(pageFixture.page);
    await adminMenuPage.afterCreateEssUser();
});

When("User search by username", { timeout: 30000 }, async () => {
    const adminMenuPage = new AdminMenuPage(pageFixture.page);
    await adminMenuPage.searchUserName();
});
Then("Result has been displayed follow the search key", { timeout: 30000 }, async () => {
    const adminMenuPage = new AdminMenuPage(pageFixture.page);
    await adminMenuPage.afterSearchUserName();
});

  