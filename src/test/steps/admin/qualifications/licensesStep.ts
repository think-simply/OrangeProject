import { Given, Then, When, Before } from "@cucumber/cucumber";
import { QualificationsLicensesPage } from "../../../pages/admin/qualifications/licensesPage";
import { pageFixture } from "../../../../hooks/pageFixture";
let licensesPage: QualificationsLicensesPage

// Pre-condition
Before(async () => {
    licensesPage = new QualificationsLicensesPage(pageFixture.page)
})
Given("User go to Qualifications > Licenses page", async() => {
    await licensesPage.accessLicenses()
})

// QL_01: Verify UI of Licenses page
Then("UI of Licenses page is displayed as expected", async() => {
    await licensesPage.verifyLicensesPage()
})

// QL_02: Add new license record -> Cancel
When("User clicks Add button for Licenses", async() => {
    await licensesPage.clickAddBtn()
})
When("User input valid data for Licenses", async() => {
    await licensesPage.addLicense()
})
When("User clicks Cancel button after data input for Licenses", async() => {
    await licensesPage.clickCancelBtn()
})
Then("User is taken back to Licenses page", async() => {
    await licensesPage.verifyLicensesPage()
})

// QL_03: Add new license record -> Empty input
When("User clicks Add button for Licenses", async() => {
    await licensesPage.clickAddBtn()
})
When("User clicks Save button after data input for Licenses", async() => {
    await licensesPage.clickSaveBtn()
})
Then("Error message appears for required field for Licenses", async() => {
    await licensesPage.verifyErrorRequired()
})

// QL_04: Add new license record -> Save
When("User input valid data for Licenses", async() => {
    await licensesPage.addLicense()
})
When("User clicks Save button after data input for Licenses", async() => {
    await licensesPage.clickSaveBtn()
})
Then("New license record is created", async() => {
    await licensesPage.verifyRecordAdded()
})

// QL_05: Update new license record
When("User clicks Edit button for Licenses", async() => {
    await licensesPage.clickEditBtn()
})
When("User input valid data for Licenses", async() => {
    await licensesPage.updateLicense()
})
When("User clicks Save button after data input for Licenses", async() => {
    await licensesPage.clickSaveBtn()
})
Then("License record is updated for Licenses", async() => {
    await licensesPage.verifyRecordUpdated()
})

// QL_06: Verify Delete dialog
When("User clicks Delete button for Licenses", async() => {
    await licensesPage.clickDeleteBtn()
})
Then("Delete confirmation dialog appears as expected for Licenses", async() => {
    await licensesPage.verifyDialog()
})

// QL_07: Delete dialog -> Dismiss
When("User clicks Close button for Licenses", async() => {
    await licensesPage.dimissDialog()
})
Then("Delete confirmation dialog disappears for Licenses", async() => {
    await licensesPage.verifyDialogDismissed()
})

// QL_08: Delete dialog -> Cancel
When("User clicks Cancel button for Licenses", async() => {
    await licensesPage.clickDialogCancelBtn()
})
Then("Delete confirmation dialog disappears for Licenses", async() => {
    await licensesPage.verifyDialogDismissed()
})

// QL_09: Delete dialog -> Delete
When("User clicks Delete button for Licenses", async() => {
    await licensesPage.clickDeleteBtn()
})
When("User clicks Yes in delete dialog for Licenses", async() => {
    await licensesPage.clickDialogDeleteBtn()
})
Then("Delete confirmation dialog disappears & record is deleted for Licenses", async() => {
    await licensesPage.verifyDialogDismissed()
    await licensesPage.verifyRecordDeleted()
})