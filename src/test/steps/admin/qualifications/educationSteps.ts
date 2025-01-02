
import { Given, When, Then } from "@cucumber/cucumber";
import EducationPage from "../../../pages/admin/qualifications/educationPage";
import { pageFixture } from "../../../../hooks/pageFixture";

Given("User navigates to Admin page", { timeout: 20000 }, async () => {
  const adminMenuPage = new EducationPage(pageFixture.adminPage);
  await adminMenuPage.visit();
});

// When("login to admin page", { timeout: 20000 }, async () => {
//   const adminMenuPage = new EducationPage(pageFixture.adminPage);
//   await adminMenuPage.login();
// });

When("user navigate to admin menu", { timeout: 20000 }, async () => {
  const adminMenuPage = new EducationPage(pageFixture.adminPage);
  await adminMenuPage.accessAdmin();
});

When("create new level of education", { timeout: 20000 }, async () => {
  const educationPage = new EducationPage(pageFixture.adminPage);
  await educationPage.createEduLevel();
});

Then("new Education level is created successfully", { timeout: 20000 }, async () => {
  const educationPage = new EducationPage(pageFixture.adminPage);
  await educationPage.AftercreateEduLevel();
});
When("user updates an existing level",{timeout:20000},async()=>{
  const educationPage= new EducationPage(pageFixture.adminPage);
  await educationPage.updateLevel();
});
Then ("level is updated successfully",{timeout:2000}, async()=>{
  const educationPage= new EducationPage(pageFixture.adminPage);
  await educationPage.AfterUpdateLevel();
});
When("user delete education level",{timeout:20000},async()=>{
  const educationPage= new EducationPage(pageFixture.adminPage);
  await educationPage.deleteEduLevel();
});
Then ("education level is deleted successfully", {timeout:20000}, async()=>{
  const educationPage = new EducationPage(pageFixture.adminPage);
  await educationPage.AfterDeleteEduLevel();
});
