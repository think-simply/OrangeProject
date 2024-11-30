Feature: Functions in Configuration menu, social media authen sub-menu

  Background:
    Given User navigates to page

  @low
  Scenario: SM_01: Check page UI
    When User logs in as Admin
    And User access social media authen page
    Then Social media page has displayed as expected

  @high
  Scenario: SM_02: Add a new provider
    When User logs in as Admin
    And User creates a new provider
    Then A new provider has been created

  @high
  Scenario: SM_03: Edit a new provider
    When User logs in as Admin
    And User updates a new provider
    Then A new provider has been updated

  @high
  Scenario: SM_04: Delete a new provider
    When User logs in as Admin
    And User removes a provider
    Then A provider has been deleted

  @high @now
  Scenario: SM_05: Delete multi new provider
    When User logs in as Admin
    And User removes multi provider
    Then A new provider have been deleted
