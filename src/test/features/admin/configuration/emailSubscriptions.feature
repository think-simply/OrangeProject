@emailSub
Feature: Functions in Configuration menu: Email subscription
  Background:
    Given User navigates to page

  @low
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
