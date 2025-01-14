@DataImport @admin
Feature: Data Import in PIM Menu

  Background:
    Given User accessed Data Import page

  @low 
  Scenario: DI_01: Check UI
    Then The page displayed as expected

  @high @222
  Scenario: DI_02: Download sample file
    When User clicks on Download button
    Then The sample file should be downloaded successfully

  @high
  Scenario: DI_03: Upload a file
    When User uploads the modified file
    Then The file should be uploaded successfully
