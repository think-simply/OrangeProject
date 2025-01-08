import { Given, When, Then, BeforeStep } from "@cucumber/cucumber";
import MembershipsAdminPage from "../../../pages/admin/qualifications/membershipsPage";
import { pageFixture } from "../../../../hooks/pageFixture";
let adminMenuPage: MembershipsAdminPage;

BeforeStep( async() => {
    adminMenuPage = new MembershipsAdminPage(pageFixture.adminPage);
})

// Pre-condition
Given("User accessed Memberships page", async () => {
    await adminMenuPage.accessMemberships();
});

// ME_01: Check UI of Memberships page
Then("All elements are displayed as expected in Memberships", async () => {
    await adminMenuPage.checkMembershipsUI();
});

// ME_02: Add a new Membership
When("User clicks Add button for Membership", async () => {
    await adminMenuPage.clickAddButton();
});
When("User inputs valid data for Membership contains name {string}", async (name) => {
    await adminMenuPage.inputMembershipData(name);
});
When("User clicks Save button for Membership", async () => {
    await adminMenuPage.clickSaveButton();
});
Then("New membership has been created", async () => {
    await adminMenuPage.verifyNewMembershipCreated();
});

// ME_03: Update a Membership
When("User clicks Update icon for Membership has name {string}", async (nameToUpdate) => {
    await adminMenuPage.clickUpdateIcon(nameToUpdate);
});
When("User updates data for Membership", async () => {
    await adminMenuPage.updateMembershipData();
});
Then("Membership has been updated", async () => {
    await adminMenuPage.verifyMembershipUpdated();
});

// ME_04: Delete a Membership
When("User clicks Delete icon for Membership has name {string}", async (nameToDelete) => {
    await adminMenuPage.clickDeleteIcon(nameToDelete);
});
When("User confirms delete for Membership", async () => {
    await adminMenuPage.confirmDelete();
});
Then("Membership has been deleted", async () => {
    await adminMenuPage.verifyMembershipDeleted();
});

// ME_05: Delete multiple Memberships
When("User selects multiple memberships contain name {string} and {string}", async (name1, name2) => {
    await adminMenuPage.selectMultipleMemberships(name1, name2);
});
When("User clicks Delete button for multiple Memberships", async () => {
    await adminMenuPage.clickDeleteButton();
});
Then("All selected memberships have been deleted", async () => {
    await adminMenuPage.verifyMultipleMembershipsDeleted();
});
