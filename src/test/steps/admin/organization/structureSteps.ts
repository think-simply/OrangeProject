import { Given, When, Then, BeforeStep } from "@cucumber/cucumber";
import { pageFixture } from "#hooks/pageFixture";
import StructurePage from "#test/pages/admin/organization/structurePage";
let structurePage: StructurePage;

BeforeStep(async () => {
    structurePage = new StructurePage(pageFixture.page);
})
//Pre-condition
Given("User accessed Structure", async () => {
    await structurePage.accessStructure();
});

//ST_01: Check UI of Structure page
Then("All elements in Structure should be displayed as expected", async () => {
    await structurePage.checkStructureUI();
});

//ST_02: Add a new Organization unit
When("User clicks Add button", async () => {
    await structurePage.changeToAddMode();
});
When("User inputs valid data", async () => {
    await structurePage.inputData();
});
When("User clicks Save button", async () => {
    await structurePage.clickSaveButton();
});
Then("New organization unit has been created", async () => {
    await structurePage.verifyNewOrganizationCreated();
});

//ST_03: Edit Organization - This testcase is Failed
When("User clicks Edit button", async () => {
    await structurePage.clickEditButton();
});
When("User updates data", async () => {
    await structurePage.inputData();
});
Then("Organization has been updated", async () => {
    await structurePage.verifyOrganizationUpdated();
});

//ST_04: Delete Organization 
When("User clicks Delete icon", async () => {
    await structurePage.clickDeleteIcon();
});
Then("Organization has been deleted", async () => {
    await structurePage.verifyOrganizationDeleted();
});

//ST_05: Add a sub Organization
When("User clicks + icon from an organization", async () => {
    await structurePage.clickAddSubOrganizationIcon();
});
Then("User inputs valid subdata", async () => {
    await structurePage.inputSubData();
});
Then("Sub-Organization has been created under the root organization", async () => {
    await structurePage.verifySubOrganizationCreated();
});

