@admin @education
Feature: qualifications feature in admin menu
  Background:
    Given User navigates to page
  @high
  Scenario: ED_01: Adding level of education
    When user navigate to education page
    And create new level of education "Phuong"
    Then new Education level "Phuong" is created successfully
 @high
  Scenario: ED_02: Update existing level of education
    When user updates an existing level 
    Then level is updated successfully
  @high
  Scenario: ED_03: Delete education level
    When user delete education level
    Then education level is deleted successfully