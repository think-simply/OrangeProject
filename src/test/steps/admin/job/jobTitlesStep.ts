import { When, Then, BeforeStep } from "@cucumber/cucumber";
import JobTitlesPage from "#test/pages/admin/job/jobTitles";
import { pageFixture } from "#hooks/pageFixture";
import { ApiContextManager } from "#test/api/services/ApiContextManager";
import JobTitleService from "#test/api/services/jobTitleService";

let jobTitlesPage: JobTitlesPage;
let jobTitleService: JobTitleService;
BeforeStep(async function () {
  jobTitlesPage = new JobTitlesPage(pageFixture.page);
});
When("User access job title page", async function () {
  await jobTitlesPage.userGoToJobTitles();
});
Then("Job title page has been displayed", async function () {
  await jobTitlesPage.verifyJobTitlesPage();
});
When(
  "User create new job title with {string}",
  async function (jobTitleName: string) {
    const apiContext = await ApiContextManager.initializeContext(
      `${process.env.USER_API_URL}`
    );
    jobTitleService = new JobTitleService(apiContext);
    await jobTitleService.listAndDeleteJobTitle(jobTitleName);
    await jobTitlesPage.createJobTitle(jobTitleName);
  }
);
Then(
  "New title has been created successfully with {string}",
  async function (jobTitleName: string) {
    await jobTitlesPage.verifyCreateJobTitleSuccessfully(jobTitleName);
  }
);
When(
  "User update a job title from {string} to {string}",
  async function (jobTitleName: string, newName: string) {
    const apiContext = await ApiContextManager.initializeContext(
      `${process.env.USER_API_URL}`
    );
    jobTitleService = new JobTitleService(apiContext);
    await jobTitleService.listAndDeleteJobTitle(newName);
    await jobTitlesPage.updateJobTitles(jobTitleName, newName);
  }
);
Then(
  "Job title has been updated successfully with {string}",
  async function (newName: string) {
    await jobTitlesPage.verifyUpdateJobTitleSuccessfully(newName);
  }
);
When(
  "User delete an job title: {string}",
  async function (jobTitleName: string) {
    await jobTitlesPage.deleteJobTitles(jobTitleName);
  }
);
Then(
  "Job title has been deleted successfully: {string}",
  async function (jobTitleName: string) {
    await jobTitlesPage.verifyDeleteJobTitleSuccessfully(jobTitleName);
  }
);
When(
  "User delete multi job title contains {string}",
  async function (text: string) {
    await jobTitlesPage.deleteMultiJobTitles(text);
  }
);
Then(
  "Job titles has been deleted successfully: {string}",
  async function (jobTitleName: string) {
    await jobTitlesPage.verifyDeleteMultiJobTitleSuccessfully(jobTitleName);
  }
);
