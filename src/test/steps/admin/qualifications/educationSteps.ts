import { When, BeforeStep,Then } from "@cucumber/cucumber";
import EducationPage from "../../../pages/admin/qualifications/educationPage";
import { pageFixture } from "../../../../hooks/pageFixture";
let educationPage: EducationPage;
BeforeStep(async()=>{
  educationPage = new EducationPage(pageFixture.page);
})
When("user navigate to education page", async () => {
  await educationPage.accessAdmin();
});
When("create new level of education {string}", async (eduLevel) => {
  await educationPage.createEduLevel(eduLevel);
});
Then("new Education level {string} is created successfully", async (text) => {
  await educationPage.AftercreateEduLevel(text);
});
When("user updates an existing level",async()=>{
  await educationPage.accessAdmin();
  await educationPage.updateLevel();
});
Then ("level is updated successfully", async()=>{
  await educationPage.AfterUpdateLevel();
});
When("user delete education level",async()=>{
  await educationPage.deleteEduLevel();
});
Then ("education level is deleted successfully", async()=>{
  await educationPage.AfterDeleteEduLevel();
});