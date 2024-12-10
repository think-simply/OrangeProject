Feature: Functions in Configuration menu, social media authen sub-menu for Admin role

  Background:
    Given User navigates to page

  @low 
  Scenario: SM_01: Check page UI
    When User access social media authen page
    Then Social media page has displayed as expected

  @high 
  Scenario: SM_02: Add a new provider
    When User creates a new provider
    Then A new provider has been created

  @high 
  Scenario: SM_03: Edit a provider
    When User updates a provider
    Then A provider has been updated

  @high
  Scenario: SM_04: Delete a provider
    When User removes a provider
    Then A provider has been deleted

  @high
  Scenario: SM_05: Delete multi provider
    When User removes multi provider
    Then All selected providers have been deleted
