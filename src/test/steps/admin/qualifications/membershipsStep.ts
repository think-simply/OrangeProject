import { Given, When, Then } from "@cucumber/cucumber";
import MembershipsAdminPage from "../../../pages/admin/qualifications/membershipsPage";
import { pageFixture } from "../../../../hooks/pageFixture";


// Pre-condition
Given("User accessed Memberships page", async () => {
    const adminMenuPage = new MembershipsAdminPage(pageFixture.adminPage);
    await adminMenuPage.accessMemberships();
});

// ME_01: Check UI of Memberships page
Then("All elements are displayed as expected in Memberships", async () => {
    const adminMenuPage = new MembershipsAdminPage(pageFixture.adminPage);
    await adminMenuPage.checkMembershipsUI();
});

// ME_02: Add a new Membership
When("User clicks Add button for Membership", async () => {
    const adminMenuPage = new MembershipsAdminPage(pageFixture.adminPage);
    await adminMenuPage.clickAddButton();
});
When("User inputs valid data for Membership contains name {string}", async (name) => {
    const adminMenuPage = new MembershipsAdminPage(pageFixture.adminPage);
    await adminMenuPage.inputMembershipData(name);
});
When("User clicks Save button for Membership", async () => {
    const adminMenuPage = new MembershipsAdminPage(pageFixture.adminPage);
    await adminMenuPage.clickSaveButton();
});
Then("New membership has been created", async () => {
    const adminMenuPage = new MembershipsAdminPage(pageFixture.adminPage);
    await adminMenuPage.verifyNewMembershipCreated();
});

// ME_03: Update a Membership
When("User clicks Update icon for Membership has name {string}", async (nameToUpdate) => {
    const adminMenuPage = new MembershipsAdminPage(pageFixture.adminPage);
    await adminMenuPage.clickUpdateIcon(nameToUpdate);
});
When("User updates data for Membership", async () => {
    const adminMenuPage = new MembershipsAdminPage(pageFixture.adminPage);
    await adminMenuPage.updateMembershipData();
});
Then("Membership has been updated", async () => {
    const adminMenuPage = new MembershipsAdminPage(pageFixture.adminPage);
    await adminMenuPage.verifyMembershipUpdated();
});

// ME_04: Delete a Membership
When("User clicks Delete icon for Membership has name {string}", async (nameToDelete) => {
    const adminMenuPage = new MembershipsAdminPage(pageFixture.adminPage);
    await adminMenuPage.clickDeleteIcon(nameToDelete);
});
When("User confirms delete for Membership", async () => {
    const adminMenuPage = new MembershipsAdminPage(pageFixture.adminPage);
    await adminMenuPage.confirmDelete();
});
Then("Membership has been deleted", async () => {
    const adminMenuPage = new MembershipsAdminPage(pageFixture.adminPage);
    await adminMenuPage.verifyMembershipDeleted();
});

// ME_05: Delete multiple Memberships
When("User selects multiple memberships contain name {string} and {string}", async (name1, name2) => {
    const adminMenuPage = new MembershipsAdminPage(pageFixture.adminPage);
    await adminMenuPage.selectMultipleMemberships(name1, name2);
});
When("User clicks Delete button for multiple Memberships", async () => {
    const adminMenuPage = new MembershipsAdminPage(pageFixture.adminPage);
    await adminMenuPage.clickDeleteButton();
});
Then("All selected memberships have been deleted", async () => {
    const adminMenuPage = new MembershipsAdminPage(pageFixture.adminPage);
    await adminMenuPage.verifyMultipleMembershipsDeleted();
});
