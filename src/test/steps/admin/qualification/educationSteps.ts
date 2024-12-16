import { Given, When, Then } from "@cucumber/cucumber";
import EducationPage from "../../../pages/admin/qualification/educationPage";
import { pageFixture } from "../../../../hooks/pageFixture";

Given("User navigates to Admin page", { timeout: 20000 }, async () => {
  const adminMenuPage = new EducationPage(pageFixture.page);
  await adminMenuPage.visit();
});

When("login to admin page", { timeout: 20000 }, async () => {
  const adminMenuPage = new EducationPage(pageFixture.page);
  await adminMenuPage.login();
});

When("user navigate to admin menu", { timeout: 20000 }, async () => {
  const adminMenuPage = new EducationPage(pageFixture.page);
  await adminMenuPage.accessAdmin();
});

When("create new level of education", { timeout: 20000 }, async () => {
  const educationPage = new EducationPage(pageFixture.page);
  await educationPage.createEduLevel();
});

Then("new Education level is created successfully", { timeout: 20000 }, async () => {
  const educationPage = new EducationPage(pageFixture.page);
  await educationPage.AftercreateEduLevel();
});
When("user updates an exisiting level",{timeout:20000},async()=>{
  const educationPage= new EducationPage(pageFixture.page);
  await educationPage.updateLevel();
});
Then ("level is updated successfully",{timeout:2000}, async()=>{
  const educationPage= new EducationPage(pageFixture.page);
  await educationPage.AfterUpdateLevel();
});
When("user delete education level",{timeout:20000},async()=>{
  const educationPage= new EducationPage(pageFixture.page);
  await educationPage.deleteEduLevel();
});
Then ("education level is deleted successfully", {timeout:20000}, async()=>{
  const educationPage = new EducationPage(pageFixture.page);
  await educationPage.AfterDeleteEduLevel();
});

