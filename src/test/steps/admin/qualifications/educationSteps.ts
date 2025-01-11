
import { Given, When, Then,BeforeStep } from "@cucumber/cucumber";
import EducationPage from "../../../pages/admin/qualifications/educationPage";
import { pageFixture } from "../../../../hooks/pageFixture";

let educationPage: EducationPage;
BeforeStep(async () => {
  educationPage = new EducationPage(pageFixture.page)
})

Given("User navigates to Admin page", async  () => {
  await educationPage.visit();
});

When("User navigate to admin menu", async () => {
  await educationPage.accessAdmin();
});

When("Create new level of education", async () => {
  await educationPage.createEduLevel();
});

Then("New Education level is created successfully", async () => {
  await educationPage.afterCreateEduLevel();
});
When("User updates an existing level", async()=>{
  await educationPage.updateLevel();
});
Then ("Level is updated successfully", async()=>{
  await educationPage.afterUpdateLevel();
});
When("User delete education level", async()=>{
  await educationPage.deleteEduLevel();
});
Then ("Education level is deleted successfully", async()=>{
  await educationPage.afterDeleteEduLevel();
});
