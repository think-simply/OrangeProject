import { Given, When, Then } from "@cucumber/cucumber";
import { pageFixture } from "../../../../hooks/pageFixture";
import StructureAdminPage from "../../../pages/admin/organization/structurePage";

//Pre-condition
Given("User accessed Structure", async () => {
    const adminMenuPage = new StructureAdminPage(pageFixture.adminPage);
    await adminMenuPage.accessStructure();
});

//ST_01: Check UI of Structure page
Then("All elements in Structure should be displayed as expected", async () => {
    const adminMenuPage = new StructureAdminPage(pageFixture.adminPage);
    await adminMenuPage.checkStructureUI();
});

//ST_02: Add a new Organization unit
When("User clicks Add button", async () => {
    const adminMenuPage = new StructureAdminPage(pageFixture.adminPage);
    await adminMenuPage.changeToAddMode();
});
When("User inputs valid data", async () => {
    const adminMenuPage = new StructureAdminPage(pageFixture.adminPage);
    await adminMenuPage.inputData();
});
When("User clicks Save button", async () => {
    const adminMenuPage = new StructureAdminPage(pageFixture.adminPage);
    await adminMenuPage.clickSaveButton();
});
Then("New organization unit has been created", async () => {
    const adminMenuPage = new StructureAdminPage(pageFixture.adminPage);
    await adminMenuPage.verifyNewOrganizationCreated();
});

//ST_03: Edit Organization - This testcase is Failed
When("User clicks Edit button", async () => {
    const adminMenuPage = new StructureAdminPage(pageFixture.adminPage);
    await adminMenuPage.clickEditButton();
});
When("User updates data", async () => {
    const adminMenuPage = new StructureAdminPage(pageFixture.adminPage);
    await adminMenuPage.inputData();
});
Then("Organization has been updated", async () => {
    const adminMenuPage = new StructureAdminPage(pageFixture.adminPage);
    await adminMenuPage.clickSaveButton();
    await adminMenuPage.verifyOrganizationUpdated();
});

//ST_04: Delete Organization 
When("User clicks Delete icon", async () => {
    const adminMenuPage = new StructureAdminPage(pageFixture.adminPage);
    await adminMenuPage.clickDeleteIcon();
});
Then("Organization has been deleted", async () => {
    const adminMenuPage = new StructureAdminPage(pageFixture.adminPage);
    await adminMenuPage.verifyOrganizationDeleted();
});

//ST_05: Add a sub Organization
When("User clicks + icon from an organization", async () => {
    const adminMenuPage = new StructureAdminPage(pageFixture.adminPage);
    await adminMenuPage.clickAddSubOrganizationIcon();
});
Then("User inputs valid subdata", async () => {
    const adminMenuPage = new StructureAdminPage(pageFixture.adminPage);
    await adminMenuPage.inputSubData();
});
Then("Sub-Organization has been created under the root organization", async () => {
    const adminMenuPage = new StructureAdminPage(pageFixture.adminPage);
    await adminMenuPage.verifySubOrganizationCreated();
});

