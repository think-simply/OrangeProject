import { Given, When, Then, BeforeStep } from "@cucumber/cucumber";
import { pageFixture } from "../../../hooks/pageFixture";
import addEmployeePage from "../../pages/PIM/addEmployeePage";
import { ApiContextManager } from "#test/api/services/ApiContextManager";
import EmployeeService from "#test/api/services/EmployeeService";
let AddEmployeePage: addEmployeePage;
let employeeService: EmployeeService;

BeforeStep(async () => {
    AddEmployeePage = new addEmployeePage(pageFixture.page);
})

// Pre-condition
Given("User accessed Add Employee page via PIM", async () => {
    await AddEmployeePage.navigate();
});

// AE_01: Check UI
Then("The page should be displayed as expected", async () => {
    await AddEmployeePage.checkUI();
});

// AE_02: Add Employee with valid basic data
When("User inputs all valid data for Firstname {string}, Middlename {string}, Lastname {string} and EmployeeID {string}", 
    async (firstName, middleName, lastName, employeeId) => {
        const apiContext = await ApiContextManager.initializeContext(
            `${process.env.ADDEMPLOYEE_API_URL}`
        );
        employeeService = new EmployeeService(apiContext);
        await employeeService.listAndDeleteEmployee(employeeId);
        await AddEmployeePage.inputValidData(firstName, middleName, lastName, employeeId);
    }
);
When("User update Avatar image", async() => {
    await AddEmployeePage.updateAvatar();
});
When("User clicks Save button for Employee", async () => {
    await AddEmployeePage.clickSaveButton();
});
Then("The employee should be added successfully", async () => {
    await AddEmployeePage.verifyEmployeeAdded();
});

// AE_03: Add Employee with login details
When("User clicks Create Login Details button", async () => {
    await AddEmployeePage.clickCreateLoginDetailsButton();
});
When("User inputs all valid data for Firstname {string}, Middlename {string}, Lastname {string}, EmployeeID {string}, username {string}, password {string} and initial status", 
    async (firstName, middleName, lastName, employeeId, username, password) => {
        const apiContext = await ApiContextManager.initializeContext(
            `${process.env.ADDEMPLOYEE_API_URL}`
        );
        employeeService = new EmployeeService(apiContext);
        await employeeService.listAndDeleteEmployee(employeeId);
        await AddEmployeePage.inputValidDataDetail(firstName, middleName, lastName, employeeId, username, password);
    }
);
Then("The employee with login details should be added successfully", async () => {
    await AddEmployeePage.verifyEmployeeAdded();
});
