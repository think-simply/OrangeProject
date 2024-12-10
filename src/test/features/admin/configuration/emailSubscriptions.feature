Feature: Email subscription function in Configuration menu

  Background:
    Given User navigates to page

  @low @now
  Scenario: ES_01: Check page UI
    When User access Email subscription page
    Then Email subscription page has displayed as expected

  @medium
  Scenario: ES_02: Check if the toggle is turned on.
    When User turns on Toggle
    Then Toggle has displayed in on status as expected

  @medium
  Scenario: ES_03: Check if the toggle is turned off.
    When User turns off Toggle
    Then Toggle has displayed in off status as expected
