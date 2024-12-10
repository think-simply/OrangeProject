import { Given, When, Then } from "@cucumber/cucumber";
import { pageFixture } from "../../../../hooks/pageFixture";
import StructureAdminPage from "../../../pages/admin/organization/structurePage";


Given("User accessed Structure", { timeout: 30000 }, async () => {
    const adminMenuPage = new StructureAdminPage(pageFixture.adminPage);
    await adminMenuPage.visit();
    await adminMenuPage.login();
    await adminMenuPage.accessOrganization();
    await adminMenuPage.accessStructure();
});
//ST_01: Check UI of Structure page
Then("All elements in Structure should be displayed as expected", { timeout: 30000 }, async () => {
    const adminMenuPage = new StructureAdminPage(pageFixture.adminPage);
    await adminMenuPage.checkStructureUI();
});
//ST_02: Add a new Organization unit
When("User clicks Add button", { timeout: 30000 }, async () => {
    const adminMenuPage = new StructureAdminPage(pageFixture.adminPage);
    await adminMenuPage.changeToAddMode();
});
When("User inputs valid data", { timeout: 30000 }, async () => {
    const adminMenuPage = new StructureAdminPage(pageFixture.adminPage);
    await adminMenuPage.inputData();
});
When("User clicks Save button", { timeout: 30000 }, async () => {
    const adminMenuPage = new StructureAdminPage(pageFixture.adminPage);
    await adminMenuPage.clickSaveButton();
});
Then("New organization unit has been created", { timeout: 30000 }, async () => {
    const adminMenuPage = new StructureAdminPage(pageFixture.adminPage);
    await adminMenuPage.verifyNewOrganizationCreated();
});

//ST_03: Edit Organization
When("User clicks Edit button", { timeout: 30000 }, async () => {
    const adminMenuPage = new StructureAdminPage(pageFixture.adminPage);
    //await adminMenuPage.clickEditButton();
});
When("User updates data", { timeout: 30000 }, async () => {
    const adminMenuPage = new StructureAdminPage(pageFixture.adminPage);
    //await adminMenuPage.updateData();
});
Then("Organization has been updated", { timeout: 30000 }, async () => {
    const adminMenuPage = new StructureAdminPage(pageFixture.adminPage);
    //await adminMenuPage.verifyOrganizationUpdated();
});

//ST_04: Delete Organization
When("User clicks Delete icon", { timeout: 30000 }, async () => {
    const adminMenuPage = new StructureAdminPage(pageFixture.adminPage);
    //await adminMenuPage.clickDeleteIcon();
});
Then("Organization has been deleted", { timeout: 30000 }, async () => {
    const adminMenuPage = new StructureAdminPage(pageFixture.adminPage);
    //await adminMenuPage.verifyOrganizationDeleted();
});

//ST_05: Add a sub Organization
When("User clicks + icon from an organization", { timeout: 30000 }, async () => {
    const adminMenuPage = new StructureAdminPage(pageFixture.adminPage);
    //await adminMenuPage.clickAddSubOrganizationIcon();
});
// When("User inputs valid data", { timeout: 30000 }, async () => {
//     const adminMenuPage = new StructureAdminPage(pageFixture.adminPage);
    //await adminMenuPage.inputValidData();
When("User clicks save", { timeout: 30000 }, async () => {
    const adminMenuPage = new StructureAdminPage(pageFixture.adminPage);
    //await adminMenuPage.clickSaveButton();
});
Then("Sub-Organization has been created under the root organization", { timeout: 30000 }, async () => {
    const adminMenuPage = new StructureAdminPage(pageFixture.adminPage);
    //await adminMenuPage.verifySubOrganizationCreated();
});

