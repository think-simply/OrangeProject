import { Given, When, Then, BeforeStep } from "@cucumber/cucumber";
import AdminMenuPage from "../../../pages/admin/userManagement/userPage";
import JobTitlesPage from "../../../pages/admin/job/jobTitles";
import { pageFixture } from "../../../../hooks/pageFixture";

let jobTitlesPage: JobTitlesPage
BeforeStep(async() => {
    jobTitlesPage = new JobTitlesPage(pageFixture.adminPage)
})
When("User access job title page", async () => {
    await jobTitlesPage.userGoToJobTitles(); 
});
Then("Job title page has been displayed", async () => {
    await jobTitlesPage.verifyJobTitlesPage();
});
When("User create new job title with {string}", async (jobTitleName: string) => {
    await jobTitlesPage.createJobTitle(jobTitleName); 
});
Then("New title has been created successfully with {string}", async (jobTitleName: string) => {
    await jobTitlesPage.verifyCreateJobTitleSuccessfully(jobTitleName);
});
When("User update an job title from {string} to {string}", async(jobTitleName: string, newName: string)=>{
    await jobTitlesPage.updateJobTitles(jobTitleName,newName);
})
Then("Job title has been updated successfully with {string}", async (newName: string) => {
    await jobTitlesPage.verifyUpdateJobTitleSuccessfully(newName);
})
When("User delete an job title: {string}", async(jobTitleName: string)=>{
    await jobTitlesPage.deleteJobTitles(jobTitleName);
})
Then("Job title has been deleted successfully: {string}", async (jobTitleName: string) => {
    await jobTitlesPage.verifyDeleteJobTitleSuccessfully(jobTitleName);
})
When("User delete multi job title", async()=>{
    await jobTitlesPage.deleteMultiJobTitles();
})
Then("Job titles has been deleted successfully: {string}", async (jobTitleName: string) => {
    await jobTitlesPage.verifyDeleteMultiJobTitleSuccessfully(jobTitleName);
})


