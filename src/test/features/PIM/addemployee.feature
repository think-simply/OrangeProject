@AddEmployee
Feature: Add Employee in PIM Menu

  Background:
    Given User accessed Add Employee page via PIM

  @low
  Scenario: AE_01: Check UI
    Then The page should be displayed as expected

  @high @222
  Scenario: AE_02: Add Employee with valid basic data
    When User inputs all valid data for Firstname "<Firstname>", Middlename "<Middlename>" Lastname "<Lastname>" and EmployeeID "<EmployeeID>"
    And User update Avatar image
    And User clicks Save button
    Then The employee should be added successfully

    Examples:
      | Firstname | Middlename | Lastname | EmployeeID  |
      | Au        | Middle     | Rora     | 00145426886 |

  @high
  Scenario: AE_03: Add Employee with login details
    When User clicks Create Login Details button
    And User inputs all valid data
    And User clicks Save button
    Then The employee with login details should be added successfully
