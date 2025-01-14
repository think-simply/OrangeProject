import { Given, When, Then, BeforeStep } from "@cucumber/cucumber";
import { pageFixture } from "../../../hooks/pageFixture";
import addEmployeePage from "../../pages/PIM/addEmployeePage";
let AddEmployeePage: addEmployeePage;

BeforeStep(async () => {
    AddEmployeePage = new addEmployeePage(pageFixture.page);
})

// Pre-condition
Given("User accessed Add Employee page via PIM", async () => {
    await AddEmployeePage.navigate();
});

// AE_01: Check UI
Then("The page should be displayed as expected", async () => {
    //await AddEmployeePage.checkUI();
});

// AE_02: Add Employee with valid basic data
When("User inputs all valid data", async () => {
    //await AddEmployeePage.inputValidData();
});
When("User clicks Save button", async () => {
    //await AddEmployeePage.clickSaveButton();
});
Then("The employee should be added successfully", async () => {
    //await AddEmployeePage.verifyEmployeeAdded();
});

// AE_03: Add Employee with login details
When("User clicks Create Login Details button", async () => {
    //await AddEmployeePage.clickCreateLoginDetailsButton();
});
When("User inputs all valid data", async () => {
    //await AddEmployeePage.inputValidData();
});
When("User clicks Save button", async () => {
    //await AddEmployeePage.clickSaveButton();
});
Then("The employee with login details should be added successfully", async () => {
    //await AddEmployeePage.verifyEmployeeWithLoginDetailsAdded();
});
