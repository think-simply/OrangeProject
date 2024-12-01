Feature: Organization_General Information in Admin Menu

  Background:
    Given User navigates to page Admin_Organization

  @low
  Scenario: GI_01: Check UI of Organization General Information
    When User accesses General information in Organization
    Then User should observe that all elements are displayed as expected

  @high
  Scenario: GI_02: Edit Organization General Information
    When User accesses General information in Organization
    And User turns the Edit toggle on
    And User updates some data
    And User save the updated the data
    Then The information should be updated successfully
