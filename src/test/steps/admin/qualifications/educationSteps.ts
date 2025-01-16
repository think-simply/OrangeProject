import { When, BeforeStep, Then } from "@cucumber/cucumber";
import EducationPage from "#test/pages/admin/qualifications/educationPage";
import { pageFixture } from "#hooks/pageFixture";
import { ApiContextManager } from "#helper/ApiContextManager";
import EducationService from "#helper/educationService";

let educationPage: EducationPage;
let educationService: EducationService;
BeforeStep(async () => {
  educationPage = new EducationPage(pageFixture.page);
})
When("User navigate to education page", async () => {
  await educationPage.accessAdmin();
});

When("Create new level of education {string}", async (eduLevel) => {
  const apiContext = await ApiContextManager.initializeContext(
    `${process.env.EDU_API_URL}`
  );
  educationService = new EducationService(apiContext);
  await educationService.listAndDeleteEducation(eduLevel);
  await educationPage.createEduLevel(eduLevel);
});

When("Create new level of education {string} successfully",
  async (eduLevel) => {
    const apiContext = await ApiContextManager.initializeContext(
      `${process.env.EDU_API_URL}`
    );
    educationService = new EducationService(apiContext);
    await educationService.listAndDeleteEducation(eduLevel);
    await educationPage.createEduLevel(eduLevel);
    await educationPage.verifyCreateEduLevel(eduLevel);
  });

Then("New Education level {string} is created successfully", async (text) => {
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

Then("Level is updated successfully", async () => {
  await educationPage.verifyUpdateLevel();
});

When("User delete education level {string}", async (text) => {
  await educationPage.deleteEduLevel(text);
});

Then("Education level is deleted successfully", async () => {
  await educationPage.verifyDeleteEduLevel();
});

