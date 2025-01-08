import { Given, When, Then, BeforeStep } from "@cucumber/cucumber";
import { pageFixture } from "../../../../hooks/pageFixture";
import WorkShiftsPage from "../../../pages/admin/job/workShift";

let workShiftsPage: WorkShiftsPage
BeforeStep(async() => {
    workShiftsPage = new WorkShiftsPage(pageFixture.adminPage);
})
When("User access work shift page", async() => {
    await workShiftsPage.accessWorkShift()
})
Then("Work shift page has been displayed as expected", async () => {
    await workShiftsPage.verifyUserPageUI();
});
When("User create a new work shift with name {string}", async(shift) => {
    await workShiftsPage.accessWorkShift();
    await workShiftsPage.clickAddBtn();
    await workShiftsPage.addDataWorkShift(shift);
    await workShiftsPage.clickSave();
})
Then("Work shift {string} has been created successfully", async (text) => {
    await workShiftsPage.verifySaveSuccess(text);
});
When("User edit a work shift name from {string} to {string}", async(text,shift) => {
    await workShiftsPage.clickEditIcon(text);
    await workShiftsPage.addDataWorkShift(shift);
    await workShiftsPage.clickSave();
})
Then("Work shift name has been updated to {string}", async (text) => {
    await workShiftsPage.verifySaveSuccess(text);
});
When("User delete a work shift name {string}", async(text) => {
    await workShiftsPage.accessWorkShift();
    await workShiftsPage.clickDelete(text);
})
Then("Work shift {string} has been deleted", async (text) => {
    await workShiftsPage.verifyDeleteSuccess(text);
});
When("User removes all work-shifts contain text {string}", async(text) => {
    await workShiftsPage.removeMultiShift(text);
})
Then("All work-shifts contain text {string} have been deleted", async (text) => {
    await workShiftsPage.verifyRemoveMultiShift(text);
});
When("User create a new work shift with name {string} successfully", async(shift) => {
    await workShiftsPage.accessWorkShift();
    await workShiftsPage.clickAddBtn();
    await workShiftsPage.addDataWorkShift(shift);
    await workShiftsPage.clickSave();
    await workShiftsPage.verifySaveSuccess(shift);
})
