import { Given, When, Then } from "@cucumber/cucumber";
import EducationPage from "../../../pages/admin/qualification/educationPage";
import { pageFixture } from "../../../../hooks/pageFixture";

Given("User navigates to Admin page", { timeout: 5000 }, async () => {
  const adminMenuPage = new EducationPage(pageFixture.page);
  await adminMenuPage.visit();
});

When("user login to admin page", { timeout: 10000 }, async () => {
  const adminMenuPage = new EducationPage(pageFixture.page);
  await adminMenuPage.login();
});

When("User navigate to admin menu", { timeout: 30000 }, async () => {
  const adminMenuPage = new EducationPage(pageFixture.page);
  await adminMenuPage.accessAdmin();
});

When("create new level of education", { timeout: 10000 }, async () => {
  const educationPage = new EducationPage(pageFixture.page);
  await educationPage.creatEduLevel();
});

Then("new Education level is created successfully", { timeout: 3000 }, async () => {
  const educationPage = new EducationPage(pageFixture.page);
  await educationPage.AftercreateEduLevel();
});
