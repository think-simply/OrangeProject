import { Given, When, Then, BeforeStep } from "@cucumber/cucumber";
import { pageFixture } from "#hooks/pageFixture";
import StructurePage from "#test/pages/admin/organization/structurePage";
let structurePage: StructurePage;

BeforeStep(async function () {
    structurePage = new StructurePage(pageFixture.page);
})
//Pre-condition
Given("User accessed Structure", async function () {
    await structurePage.accessStructure();
});

//ST_01: Check UI of Structure page
Then("All elements in Structure should be displayed as expected", async function () {
    await structurePage.checkStructureUI();
});

//ST_02: Add a new Organization unit
When("User clicks Add button", async function () {
    await structurePage.changeToAddMode();
});
When("User inputs valid data", async function () {
    await structurePage.inputData();
});
When("User clicks Save button", async function () {
    await structurePage.clickSaveButton();
});
Then("New organization unit has been created", async function () {
    await structurePage.verifyNewOrganizationCreated();
});

//ST_03: Edit Organization - This testcase is Failed
When("User clicks Edit button", async function () {
    await structurePage.clickEditButton();
});
When("User updates data", async function () {
    await structurePage.inputData();
});
Then("Organization has been updated", async function () {
    await structurePage.verifyOrganizationUpdated();
});

//ST_04: Delete Organization 
When("User clicks Delete icon", async function () {
    await structurePage.clickDeleteIcon();
});
Then("Organization has been deleted", async function () {
    await structurePage.verifyOrganizationDeleted();
});

//ST_05: Add a sub Organization
When("User clicks + icon from an organization", async function () {
    await structurePage.clickAddSubOrganizationIcon();
});
Then("User inputs valid subdata", async function () {
    await structurePage.inputSubData();
});
Then("Sub-Organization has been created under the root organization", async function () {
    await structurePage.verifySubOrganizationCreated();
});

