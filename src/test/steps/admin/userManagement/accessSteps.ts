import { Given, When, Then, BeforeStep } from '@cucumber/cucumber';
import UserPage from "#test/pages/admin/userManagement/userPage";
import { pageFixture } from "#hooks/pageFixture";
let userPage: UserPage;


Given('Staff access to sites', async function() {
    userPage = new UserPage(pageFixture.staffPage);
    await userPage.visit();
});

When('Staff tries to access the admin menu', async function() {
    userPage = new UserPage(pageFixture.staffPage);
    await userPage.staffAccessAdminMenu();
});

Then('Staff should see access denied message', async function() {
    userPage = new UserPage(pageFixture.staffPage);
    await userPage.verifyStaffAccessAdminMenu();
});