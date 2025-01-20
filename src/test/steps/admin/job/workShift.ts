import { When, Then, BeforeStep } from "@cucumber/cucumber";
import { pageFixture } from "#hooks/pageFixture";
import WorkShiftsPage from "#test/pages/admin/job/workShift";

let workShiftsPage: WorkShiftsPage;
BeforeStep(async function () {
  workShiftsPage = new WorkShiftsPage(pageFixture.page);
});
When("User access work shift page", async function () {
  await workShiftsPage.accessWorkShift();
});
Then("Work shift page has been displayed as expected", async function () {
  await workShiftsPage.verifyUserPageUI();
});
When("User create a new work shift with name {string}", async function (shift) {
  await workShiftsPage.accessWorkShift();
  await workShiftsPage.clickAddBtn();
  await workShiftsPage.addDataWorkShift(shift);
  await workShiftsPage.clickSave();
});
Then(
  "Work shift {string} has been created successfully",
  async function (text) {
    await workShiftsPage.verifySaveSuccess(text);
  }
);
When(
  "User edit a work shift name from {string} to {string}",
  async function (text, shift) {
    await workShiftsPage.clickEditIcon(text);
    await workShiftsPage.addDataWorkShift(shift);
    await workShiftsPage.clickSave();
  }
);
Then("Work shift name has been updated to {string}", async function (text) {
  await workShiftsPage.verifySaveSuccess(text);
});
When("User delete a work shift name {string}", async function (text) {
  await workShiftsPage.accessWorkShift();
  await workShiftsPage.clickDelete(text);
});
Then("Work shift {string} has been deleted", async function (text) {
  await workShiftsPage.verifyDeleteSuccess(text);
});
When(
  "User removes all work-shifts contain text {string}",
  async function (text) {
    await workShiftsPage.removeMultiShift(text);
  }
);
Then(
  "All work-shifts contain text {string} have been deleted",
  async function (text) {
    await workShiftsPage.verifyRemoveMultiShift(text);
  }
);
When(
  "User create a new work shift with name {string} successfully",
  async function (shift) {
    await workShiftsPage.accessWorkShift();
    await workShiftsPage.clickAddBtn();
    await workShiftsPage.addDataWorkShift(shift);
    await workShiftsPage.clickSave();
    await workShiftsPage.verifySaveSuccess(shift);
  }
);
