@Languages
Feature: Manage Languages - Qualifications

  Background:
    Given User accessed Languages page

  @low
  Scenario: LA_01: Check UI of Language page
    Then All elements are displayed as expected

  @high 
  Scenario: LA_02: Add a new Language
    When Click Add button Language
    And Input valid data for Language contains name "ZLanguageName"
    And Click Save button for Language
    Then New language has been created

  @high 
  Scenario: LA_03: Update a Language
    When User clicks Update icon for Language has name "LanguageToUpdate"
    And User updates data for Language
    And Click Save button for Language
    Then Language has been updated

  @high 
  Scenario: LA_04: Delete a Language
    When User clicks Delete icon for Language has name "LanguageToDelete"
    And User confirms delete for Language
    Then Language has been deleted

  @medium 
  Scenario: LA_05: Delete multiple Languages
    When User selects multiple languages contain name "Language1" and "Language2"
    And User clicks Delete button for multiple Languages
    And User confirms delete for Language
    Then Selected languages have been deleted