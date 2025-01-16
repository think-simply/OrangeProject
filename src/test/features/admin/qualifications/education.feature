@admin @education
Feature: qualifications feature in admin menu
  Background:
    Given User navigates to page
    When User navigate to education page
  @high
  Scenario: ED_01: Adding level of education
    And Create new level of education "Edu7"
    Then New Education level "Edu7" is created successfully

  @high
  Scenario: ED_02: Update existing level of education
    When Create new level of education "Edu1" successfully
    And User updates an level from "Edu1" to "Edu2"
    Then Level is updated successfully
  
  @high
  Scenario: ED_03: Delete education level
    And Create new level of education "Edu6" successfully
    When User delete education level "Edu6"
    Then Education level is deleted successfully