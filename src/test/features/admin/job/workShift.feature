@workShift
Feature: Functions in Admin Menu

  Background:
    Given User navigates to page

  @low
  Scenario: WS_01: Check page UI
    When User access work shift page
    Then Work shift page has been displayed as expected
  @high
  Scenario: WS_02: User create a new work shift
    When User create a new work shift with name "night-shift"
    Then Work shift "night-shift" has been created successfully
    When  User delete a work shift name "night-shift"
    Then Work shift "night-shift" has been deleted
  @high
  Scenario: WS_03: User edit a work shift
    When User create a new work shift with name "edit-shift" successfully
    And  User edit a work shift name from "edit-shift" to "day shift"
    Then Work shift name has been updated to "day shift"
    When  User delete a work shift name "day shift"
    Then Work shift "day shift" has been deleted
  @high
  Scenario: WS_04: User delete a work shift
    When User create a new work shift with name "delete-shift" successfully
    And  User delete a work shift name "delete-shift"
    Then Work shift "day-shift" has been deleted
  @medium
  Scenario: WS_05: User delete multi work-shifts
    When User create a new work shift with name "shift-day" successfully
    And User create a new work shift with name "shift-night" successfully
    And User removes all work-shifts contain text "shift-"
    Then All work-shifts contain text "shift-" have been deleted




