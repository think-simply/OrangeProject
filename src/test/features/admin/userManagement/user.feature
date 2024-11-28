Feature: Functions in Admin Menu

  Background:
    Given User navigates to page

  # @low
  # Scenario: US_01: Check page UI
  #   When User logs in as Admin
  #   And User access User management page
  #   Then User management page has been displayed

  # @high
  # Scenario: US_02: Admin add new Admin user
  #   When User logs in as Admin
  #   And User creates a new Admin user
  #   Then New Admin user has been created successfully

  # @high
  # Scenario: US_03: Admin add new ESS user
  #   When User logs in as Admin
  #   And User creates a new ESS user
  #   Then New ESS user has been created successfully

  @high
  Scenario: US_04: Search user by user name
    When User logs in as Admin
    And User search by username 
    Then Result has been displayed follow the search key 
