@GenerateInformation
Feature: Organization_General Information in Admin Menu

  Background:
    Given User accesses General information in Organization

  @low  @information @demo
  Scenario: GI_01: Check UI of Organization General Information
    Then User should observe that all elements are displayed as expected

  @high  @information @demo
  Scenario: GI_02: Edit Organization General Information
    When User accesses General information in Organization
    And User turns the Edit toggle on
    And User updates some data
    And User save the updated the data
    Then The information should be updated successfully
