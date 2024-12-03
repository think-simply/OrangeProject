Feature: Functions in Configuration menu, social media authen sub-menu

  Background:
    Given User navigates to page

  @low 
  Scenario: SM_01: Check page UI
    When User logs in as Admin
    And User access email noti page
    Then togle has displayed as expected

  