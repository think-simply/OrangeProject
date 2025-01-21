import { Given, When, Then, BeforeStep } from "@cucumber/cucumber";
import UserPage from "#test/pages/admin/userManagement/userPage";
import { pageFixture } from "#hooks/pageFixture";
import UserService from "#test/api/services/UserService";
let userPage: UserPage;
let staffPage: UserPage;
let userService: UserService;

BeforeStep(async function () {
  userPage = new UserPage(pageFixture.adminPage);
  staffPage = new UserPage(pageFixture.staffPage);
});

Given("2 users navigates to page", async function () {
  await userPage.visit();
  await staffPage.visit();
  await userPage.accessUserPage();
  await userPage.verifyUserPageUI();
  // await staffPage.accessUserPage();
  // await staffPage.verifyUserPageUI();
});
