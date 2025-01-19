@AddEmployee @admin
Feature: Add Employee in PIM Menu

  Background:
    Given User accessed Add Employee page via PIM

  @low
  Scenario: AE_01: Check UI
    Then The page should be displayed as expected

  @high
  Scenario: AE_02: Add Employee with valid basic data
    When User inputs all valid data for Firstname "<Firstname>", Middlename "<Middlename>", Lastname "<Lastname>" and EmployeeID "<EmployeeID>"
    And User update Avatar image
    And User clicks Save button for Employee
    Then The employee should be added successfully

    Examples:
      | Firstname | Middlename | Lastname | EmployeeID |
      | Au        | Middle     | Rora     |     008686 |

  @high 
  Scenario: AE_03: Add Employee with login details
    When User clicks Create Login Details button
    And User inputs all valid data for Firstname "<Firstname>", Middlename "<Middlename>", Lastname "<Lastname>", EmployeeID "<EmployeeID>", username "<Username>", password "<Password>" and initial status
    And User clicks Save button for Employee
    Then The employee with login details should be added successfully

    Examples:
      | Firstname | Middlename | Lastname | EmployeeID | Username  | Password   |
      | Au        | Middle     | Rora     |    0088889 | Username1 | Admin@1234 |
