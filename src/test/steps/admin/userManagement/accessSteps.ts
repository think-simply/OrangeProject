import { Given, When, Then, BeforeStep } from '@cucumber/cucumber';
import UserPage from "#test/pages/admin/userManagement/userPage";
import { pageFixture } from "#hooks/pageFixture";
let userPage: UserPage;

Given('Admin can access to admin menu', async function () {
    userPage = new UserPage(pageFixture.adminPage);
    await userPage.visit();
    await userPage.verifyUserPageUI();
});
When('Staff access to sites', async function () {
    userPage = new UserPage(pageFixture.staffPage);
    await userPage.staffAccessAdminMenu();
});

When('Staff tries to access the admin menu', async function () {
    userPage = new UserPage(pageFixture.staffPage);
    await userPage.staffAccessAdminMenu();
});

Then('Staff should see access denied message', async function () {
    userPage = new UserPage(pageFixture.staffPage);
    await userPage.verifyStaffAccessAdminMenu();
});