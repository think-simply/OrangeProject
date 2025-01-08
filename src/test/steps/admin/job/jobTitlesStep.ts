import { Given, When, Then } from "@cucumber/cucumber";
import AdminMenuPage from "../../../pages/admin/userManagement/userPage";
import JobTitlesPage from "../../../pages/admin/job/jobTitles";
import { pageFixture } from "../../../../hooks/pageFixture";


// Given("User navigates to page", { timeout: 30000 }, async () => {
//     const adminMenuPage = new AdminMenuPage(pageFixture.page);
//     await adminMenuPage.visit();
// });
// When("User logs in as Admin", { timeout: 30000 }, async () => {
//     const adminMenuPage = new AdminMenuPage(pageFixture.page);
//     await adminMenuPage.login();
// });
// Please remove comment after check login completed
When("User access job title page", async () => {
    const jobTitlesPage = new JobTitlesPage(pageFixture.adminPage)
    await jobTitlesPage.userGoToJobTitles(); 
});
Then("Job title page has been displayed", async () => {
    const jobTitlesPage = new JobTitlesPage(pageFixture.adminPage)
    await jobTitlesPage.verifyJobTitlesPage();
});
When("User create new job title", async () => {
    const jobTitlesPage = new JobTitlesPage(pageFixture.adminPage)
    await jobTitlesPage.createJobTitle(); 
});
Then("New title has been created successfully", async () => {
    const jobTitlesPage = new JobTitlesPage(pageFixture.adminPage)
    await jobTitlesPage.verifyCreateJobTitleSuccessfully();
});
When("User update an job title", async()=>{
    const jobTitlesPage = new JobTitlesPage(pageFixture.adminPage)
    await jobTitlesPage.updateJobTitles();
})
Then("Job title has been updated successfully", async () => {
    const jobTitlesPage = new JobTitlesPage(pageFixture.adminPage)
    await jobTitlesPage.verifyUpdateJobTitleSuccessfully();
})
When("User delete an job title", async()=>{
    const jobTitlesPage = new JobTitlesPage(pageFixture.adminPage)
    await jobTitlesPage.deleteJobTitles();
})
Then("Job title has been deleted successfully", async () => {
    const jobTitlesPage = new JobTitlesPage(pageFixture.adminPage)
    await jobTitlesPage.verifyDeleteJobTitleSuccessfully();
})
When("User delete multi job title", async()=>{
    const jobTitlesPage = new JobTitlesPage(pageFixture.adminPage)
    await jobTitlesPage.deleteMultiJobTitles();
})
Then("Job titles has been deleted successfully", async () => {
    const jobTitlesPage = new JobTitlesPage(pageFixture.adminPage)
    await jobTitlesPage.verifyDeleteMultiJobTitleSuccessfully();
})


