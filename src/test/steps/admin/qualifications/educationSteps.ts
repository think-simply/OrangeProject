import { When, BeforeStep, Then } from "@cucumber/cucumber";
import EducationPage from "#test/pages/admin/qualifications/educationPage";
import { pageFixture } from "#hooks/pageFixture";
import { ApiContextManager } from "#test/api/services/ApiContextManager";
import EducationService from "#test/api/services/educationService";

let educationPage: EducationPage;
let educationService: EducationService;
BeforeStep(async function () {
  educationPage = new EducationPage(pageFixture.page);
})
When("User navigate to education page", async function () {
  await educationPage.accessAdmin();
});

When("Create new level of education {string}", async function (eduLevel) {
  const apiContext = await ApiContextManager.initializeContext(
    `${process.env.EDU_API_URL}`
  );
  educationService = new EducationService(apiContext);
  await educationService.listAndDeleteEducation(eduLevel);
  await educationPage.createEduLevel(eduLevel);
});

When("Create new level of education {string} successfully",
  async function (eduLevel) {
    const apiContext = await ApiContextManager.initializeContext(
      `${process.env.EDU_API_URL}`
    );
    educationService = new EducationService(apiContext);
    await educationService.listAndDeleteEducation(eduLevel);
    await educationPage.createEduLevel(eduLevel);
    await educationPage.verifyCreateEduLevel(eduLevel);
  });

Then("New Education level {string} is created successfully", async function (text) {
  await educationPage.verifyCreateEduLevel(text);
});

When("User updates an level from {string} to {string}", async (text, newEducation) => {
  const apiContext = await ApiContextManager.initializeContext(
    `${process.env.EDU_API_URL}`
  );
  educationService = new EducationService(apiContext);
  await educationService.listAndDeleteEducation(newEducation);
  await educationPage.accessAdmin();
  await educationPage.updateLevel(text, newEducation);
});

Then("Level is updated successfully", async function () {
  await educationPage.verifyUpdateLevel();
});

When("User delete education level {string}", async function (text) {
  await educationPage.deleteEduLevel(text);
});

Then("Education level is deleted successfully", async function () {
  await educationPage.verifyDeleteEduLevel();
});

