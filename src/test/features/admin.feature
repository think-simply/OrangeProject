Feature: Functions in Admin Menu

  Background:
    Given User navigates to page

  @high
  Scenario: AD_01: Admin add new ESS user
    When User logs in as Admin
    And User creates a new ESS user
    Then New ESS user has been created successfully
