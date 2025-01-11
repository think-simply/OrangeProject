 @admin
Feature: qualifications feature in admin menu

  Background:
    Given User navigates to Admin page

  @high @now @staff
  Scenario: ED_01: Adding level of education
    When User navigate to admin menu
    And Create new level of education
    Then New Education level is created successfully

  @high
  Scenario: ED_02: Update existing level of education
    When User updates an existing level
    Then Level is updated successfully

  @high
  Scenario: ED_03: Delete education level
    When User delete education level
    Then Education level is deleted successfully
