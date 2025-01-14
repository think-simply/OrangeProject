@admin @education
Feature: qualifications feature in admin menu
  Background:
    Given User navigates to page
    When User navigate to education page
  @high
  Scenario: ED_01: Adding level of education
    And Create new level of education "Edu1"
    Then New Education level "Edu1" is created successfully
    When User delete education level "Edu1"
  @high
  Scenario: ED_02: Update existing level of education
    When Create new level of education "Edu1"
    And User updates an level from "Edu1" to "Edu2"
    Then Level is updated successfully
    When User delete education level "Edu2"
  @high
  Scenario: ED_03: Delete education level
    And Create new level of education "Edu1"
    When User delete education level "Edu2"
    Then Education level is deleted successfully