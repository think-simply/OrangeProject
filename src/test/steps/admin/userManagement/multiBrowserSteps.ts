import { Given, When, Then, BeforeStep } from "@cucumber/cucumber";
import UserPage from "#test/pages/admin/userManagement/userPage";
import { pageFixture } from "#hooks/pageFixture";
import UserService from "#test/api/services/UserService";
let adminPage: UserPage;
let staffPage: UserPage;

BeforeStep(async function () {
  adminPage = new UserPage(pageFixture.adminPage);
  staffPage = new UserPage(pageFixture.staffPage);
});

When("Access site as staff role", async function () {
    await staffPage.visit();
});   
Then("Staff cannot see the Admin menu", async function () {
    await staffPage.verifyAdminMenuHidden();
}); 
When("Access site as admin role", async function () {
    await adminPage.visit();
});   
Then("Admin can see the Admin menu", async function () {
    await adminPage.accessUserPage();
    await adminPage.verifyUserPageUI();
}); 
When("Staff access user management page by direct link", async function () {
    await staffPage.staffAccessUserLink();
});   
Then("Staff will see the warning message", async function () {
    await staffPage.verifyStaffAccessUserLink();
}); 

