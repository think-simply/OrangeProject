import { Given, When, Then, BeforeStep } from "@cucumber/cucumber";
import { pageFixture } from "../../../../hooks/pageFixture";
import StructureAdminPage from "../../../pages/admin/organization/structurePage";
let adminMenuPage: StructureAdminPage;

BeforeStep(async () => {
    adminMenuPage = new StructureAdminPage(pageFixture.adminPage);
})
//Pre-condition
Given("User accessed Structure", async () => {
    await adminMenuPage.accessStructure();
});

//ST_01: Check UI of Structure page
Then("All elements in Structure should be displayed as expected", async () => {
    await adminMenuPage.checkStructureUI();
});

//ST_02: Add a new Organization unit
When("User clicks Add button", async () => {
    await adminMenuPage.changeToAddMode();
});
When("User inputs valid data", async () => {
    await adminMenuPage.inputData();
});
When("User clicks Save button", async () => {
    await adminMenuPage.clickSaveButton();
});
Then("New organization unit has been created", async () => {
    await adminMenuPage.verifyNewOrganizationCreated();
});

//ST_03: Edit Organization - This testcase is Failed
When("User clicks Edit button", async () => {
    await adminMenuPage.clickEditButton();
});
When("User updates data", async () => {
    await adminMenuPage.inputData();
});
Then("Organization has been updated", async () => {
    await adminMenuPage.clickSaveButton();
    await adminMenuPage.verifyOrganizationUpdated();
});

//ST_04: Delete Organization 
When("User clicks Delete icon", async () => {
    await adminMenuPage.clickDeleteIcon();
});
Then("Organization has been deleted", async () => {
    await adminMenuPage.verifyOrganizationDeleted();
});

//ST_05: Add a sub Organization
When("User clicks + icon from an organization", async () => {
    await adminMenuPage.clickAddSubOrganizationIcon();
});
Then("User inputs valid subdata", async () => {
    await adminMenuPage.inputSubData();
});
Then("Sub-Organization has been created under the root organization", async () => {
    await adminMenuPage.verifySubOrganizationCreated();
});

