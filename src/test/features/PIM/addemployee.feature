@AddEmployee
Feature: Add Employee in PIM Menu

  Background:
    Given User accessed Add Employee page via PIM
  @low
  Scenario: AE_01: Check UI
    Then The page should be displayed as expected

  @high
  Scenario: AE_02: Add Employee with valid basic data
    When User inputs all valid data
    And User clicks Save button
    Then The employee should be added successfully

  @high
  Scenario: AE_03: Add Employee with login details
    When User clicks Create Login Details button
    And User inputs all valid data
    And User clicks Save button
    Then The employee with login details should be added successfully
