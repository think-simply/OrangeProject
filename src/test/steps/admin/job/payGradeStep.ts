import { Given, When, Then } from "@cucumber/cucumber";
import { pageFixture } from "../../../../hooks/pageFixture";
import PayGradePage from "../../../pages/admin/job/payGrades";

When("User go to Pay Grade page", async() => {
    const payGradePage = new PayGradePage(pageFixture.adminPage);
    await payGradePage.goToPayGradePage()
})
When("User create Pay Grade with Pay Grade Name: {string}", async (payGradeName) => {
    const payGradePage = new PayGradePage(pageFixture.adminPage);
    await payGradePage.userCreateNewPayGradePage(payGradeName);
});
Then("New Pay Grade has been created successfully with name: {string}", async (payGradeName) => {
    const payGradePage = new PayGradePage(pageFixture.adminPage);
    await payGradePage.verifyCreatePayGradeSuccessfully(payGradeName);
});
When("User update Pay Grade from Pay Grade Name: {string} to {string}", async (payGradeName, newPayGrade) => {
    const payGradePage = new PayGradePage(pageFixture.adminPage);
    await payGradePage.editPayGrade(payGradeName,newPayGrade);
});
Then("Pay Grade has been updated successfully to {string}", async (newName) => {
    const payGradePage = new PayGradePage(pageFixture.adminPage);
    await payGradePage.verifyUpdatePayGradeSuccessfully(newName);
});
When("User delete Pay Grade from Pay Grade Name: {string}", async (payGradeName) => {
    const payGradePage = new PayGradePage(pageFixture.adminPage);
    await payGradePage.deletePayGrade(payGradeName);
});
Then("Pay Grade has been deleted successfully with Pay Grade Name: {string}", async (payGradeName) => {
    const payGradePage = new PayGradePage(pageFixture.adminPage);
    await payGradePage.verifyDeletePayGradeSuccessfully(payGradeName);
});