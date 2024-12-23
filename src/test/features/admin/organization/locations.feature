Feature: Organization_Locations in Admin Menu

  Background:
    Given User accessed Locations

  @low @locations @demo
  Scenario: LO_01: Verify UI of Locations page
    Then All elements should be displayed as expected

  @medium @locations @demo
  Scenario: LO_02: Search location by name
    When User enters a keyword in the Name field
    And User clicks search button
    Then The corresponding No results should be returned

  @medium @locations @demo
  Scenario: LO_03: Search location by city
    When User enters a keyword in the City field
    And User clicks search button
    Then The corresponding City results should be returned

  @medium @locations @demo
  Scenario: LO_04: Search location by country
    When User selects a value in the Country field
    And User clicks search button
    Then The corresponding Country results should be returned

  @high @locations @demo
  Scenario: LO_05: Create a new location
    When User clicks the Add button
    And User inputs valid data contains name "<name>"
    And User clicks the Save button
    Then A new location should be created

    Examples:
      | name       |
      | NametoTest |

  @high @locations @demo
  Scenario: LO_06: Update an existing name
    When User clicks the Edit button for a name
    And User updates the data with updateText "<updateText>"
    And User clicks the Save button
    Then The location should be updated

    Examples:
      | updateText |
      | Textest    |

  @high @locations @demo
  Scenario: LO_07: Delete a single location
    When User clicks the Delete icon
    And User confirms the deletion
    Then The location should be deleted

  @high @locations @demo
  Scenario: LO_08: Delete multiple locations
    When User selects multiple locations
    And User clicks the Delete button
    And User confirms the deletion
    Then all selected locations should be deleted
