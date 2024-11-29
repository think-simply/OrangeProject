Feature: Functions in Admin Menu

  Background:
    Given User navigates to page

  @low
  Scenario: US_01: Check page UI
    When User logs in as Admin
    And User access User management page
    Then User management page has been displayed

  @high
  Scenario: US_02: Admin add new Admin user
    When User logs in as Admin
    And User creates a new Admin user
    Then New Admin user has been created successfully

  @high
  Scenario: US_03: Admin add new ESS user
    When User logs in as Admin
    And User creates a new ESS user
    Then New ESS user has been created successfully

  @medium
  Scenario: US_04: Search user by role
    When User logs in as Admin
    And User search by role
    Then Result has been displayed follow role

  @medium
  Scenario: US_06: Search user by employee name
    When User logs in as Admin
    And User search by employee name
    Then Result has been displayed follow employee name

  @medium
  Scenario: US_07: Search user by status
    When User logs in as Admin
    And User search by status
    Then Result has been displayed follow status

  @low
  Scenario: US_07: Reset filter
    When User logs in as Admin
    And User enters values on search fields
    And User click reset button
    Then Data on all search fields have been cleared

  @high
  Scenario: US_08: User updates an account
    When User logs in as Admin
    And User update an account
    Then Account has been updated

  @high
  Scenario: US_09: User removes an account
    When User logs in as Admin
    And User removes an account
    Then Account has been deleted

  Scenario: US_04: Search user by user name
    When User logs in as Admin
    And User search by username
    Then Result has been displayed follow username

  @medium
  Scenario: US_05: Search user by user role
    When User logs in as Admin
    And User search by role
    Then Result has been displayed follow role

  @medium
  Scenario: US_06: Search user by employee name
    When User logs in as Admin
    And User search by employee name
    Then Result has been displayed follow employee name

  @medium
  Scenario: US_07: Search user by status
    When User logs in as Admin
    And User search by status
    Then Result has been displayed follow status

  @low
  Scenario: US_07: Reset filter
    When User logs in as Admin
    And User enters values on search fields
    And User click reset button
    Then Data on all search fields have been cleared

  @high
  Scenario: US_08: User updates an account
    When User logs in as Admin
    And User update an account
    Then Account has been updated

  @high
  Scenario: US_09: User removes an account
    When User logs in as Admin
    And User removes an account
    Then Account has been deleted

  @high
  Scenario: US_10: User removes multi account
    When User logs in as Admin
    And User removes multi account
    Then All selected account have been deleted
