import { Given, When, Then } from "@cucumber/cucumber";
import AdminMenuPage from "../../../pages/admin/userManagement/userPage";
import JobTitlesPage from "../../../pages/admin/job/jobTitles";
import { pageFixture } from "../../../../hooks/pageFixture";


Given("User navigates to page", { timeout: 30000 }, async () => {
    const adminMenuPage = new AdminMenuPage(pageFixture.page);
    await adminMenuPage.visit();
});
When("User logs in as Admin", { timeout: 30000 }, async () => {
    const adminMenuPage = new AdminMenuPage(pageFixture.page);
    await adminMenuPage.login();
});
When("User access job title page", { timeout: 30000 }, async () => {
    const jobTitlesPage = new JobTitlesPage(pageFixture.page)
    await jobTitlesPage.userGoToJobTitles(); 
});
Then("New title has been created successfully", { timeout: 30000 }, async () => {
    const jobTitlesPage = new JobTitlesPage(pageFixture.page)
    await jobTitlesPage.verifyJobTitlesPage();
});
When("User create new job title", { timeout: 30000 }, async () => {
    const jobTitlesPage = new JobTitlesPage(pageFixture.page)
    await jobTitlesPage.createJobTitle(); 
});
Then("New title has been created successfully", { timeout: 30000 }, async () => {
    const jobTitlesPage = new JobTitlesPage(pageFixture.page)
    await jobTitlesPage.verifyCreateJobTitleSuccessfully();
});




