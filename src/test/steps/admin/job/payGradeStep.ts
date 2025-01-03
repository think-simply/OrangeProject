import { Given, When, Then, BeforeStep } from "@cucumber/cucumber";
import { pageFixture } from "../../../../hooks/pageFixture";
import PayGradePage from "../../../pages/admin/job/payGrades";

let payGradePage: PayGradePage
BeforeStep(async() => {
    payGradePage = new PayGradePage(pageFixture.adminPage);
})
When("User go to Pay Grade page", async() => {
    await payGradePage.goToPayGradePage()
})
When("User create Pay Grade with Pay Grade Name: {string}", async (payGradeName) => {
    await payGradePage.userCreateNewPayGradePage(payGradeName);
});
Then("New Pay Grade has been created successfully with name: {string}", async (payGradeName) => {
    await payGradePage.verifyCreatePayGradeSuccessfully(payGradeName);
});
When("User update Pay Grade from Pay Grade Name: {string} to {string}", async (payGradeName, newPayGrade) => {
    await payGradePage.editPayGrade(payGradeName,newPayGrade);
});
Then("Pay Grade has been updated successfully to {string}", async (newName) => {
    await payGradePage.verifyUpdatePayGradeSuccessfully(newName);
});
When("User delete Pay Grade from Pay Grade Name: {string}", async (payGradeName) => {
    await payGradePage.deletePayGrade(payGradeName);
});
Then("Pay Grade has been deleted successfully with Pay Grade Name: {string}", async (payGradeName) => {
    await payGradePage.verifyDeletePayGradeSuccessfully(payGradeName);
});