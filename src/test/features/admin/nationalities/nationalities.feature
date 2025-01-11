@Nationalities
Feature: Nationalities in Admin Menu

  Background:
    Given User accessed Nationalities page

  @low
  Scenario: NA_01: Check UI of Nationalities page
    Then All elements are displayed as expected in Nationalities

  @high @now
  Scenario: NA_02: Add a new nationality
    When User clicks Add button for Nationality
    And User inputs valid data for Nationality contains name "<name>"
    And User clicks Save button for Nationality
    Then New nationality has been created

    Examples:
      | name       |
      | NationTest |

  @high 
  Scenario: NA_03: Update a nationality
    When User clicks Update icon for Nationality with name "<name>"
    And User updates data for Nationality
    And User clicks Save button for Nationality updated
    Then Nationality has been updated

    Examples:
      | name    |
      | Update1 |

  @high 
  Scenario: NA_04: Delete a nationality
    When User clicks Delete icon for Nationality name is "<name>"
    And User confirms delete Nationality
    Then Nationality has been deleted

    Examples:
      | name    |
      | Delete1 |

  @medium
  Scenario: NA_05: Delete multi nationality
    When User selects multi nationality names are "<name1>" and "<name2>"
    And User clicks Delete button for Nationality
    And User confirms delete Nationality
    Then All selected nationalities have been deleted

    Examples:
      | name1   | name2   |
      | Delete1 | Delete2 |
