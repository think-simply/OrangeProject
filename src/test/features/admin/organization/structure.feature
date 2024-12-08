Feature: Organization_Structure in Admin Menu

  Background:
    Given User navigates to page Admin_Organization
    And User accessed Structure

  @medium
  Scenario: ST_01: Check UI of Structure page
    Then All elements should be displayed as expected

  @low
  Scenario: ST_02: Add a new Organization unit
    When User clicks Add button
    And User inputs valid data
    And User clicks Save button
    Then New organization unit has been created

  @high
  Scenario: ST_03: Edit Organization
    When User clicks Edit button
    And User updates data
    And User clicks Save button
    Then Organization has been updated

  @high
  Scenario: ST_04: Delete Organization
    When User clicks Edit icon
    Then Organization has been deleted

  @medium
  Scenario: ST_05: Add a sub Organization
    When User clicks + icon from an organization
    And User inputs valid data
    And User clicks save
    Then Sub-Organization has been created under the root organization
