import { APIRequestContext } from "@playwright/test";
import { expect } from "@playwright/test";

class EmployeeService {
  private apiContext: APIRequestContext;

  constructor(apiContext: APIRequestContext) {
    this.apiContext = apiContext;
  }

  // Method to list all employees
  async listAllEmployees() {
    const response = await this.apiContext.get(`${process.env.EMPLOYEE_API_URL}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    expect(response.status()).toBe(200); // Ensure API response status is 200
    const employees = await response.json();
    return employees.data; // Assuming `data` contains the list of users, data is json format
  }

  // Method to delete an Employee by ID
  async deleteEmployee(employeeId: string) {
    const response = await this.apiContext.delete(`${process.env.EMPLOYEE_API_URL}`,
      {
        data: { ids: [employeeId] },
      }
    );
    expect(response.status()).toBe(200); // Ensure API response status is 200
  }

  // Main flow to list employees and delete an Employee by id
  async listAndDeleteEmployee(employeeId: string) {
    const Employees = await this.listAllEmployees();
    if (!Employees || Employees.length === 0) {
      return;
    }
    const employeeToDelete = Employees.find(
      (employee: { employeeId: string }) => employee.employeeId === employeeId
      //find an employee has specific id, only 1 --> check in data:{} --> according empNumber is unique
    );
    if (!employeeToDelete) {
      return;
    }
    await this.deleteEmployee(employeeToDelete.empNumber);
  }
}
export default EmployeeService;
