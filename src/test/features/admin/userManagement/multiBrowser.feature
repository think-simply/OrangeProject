 @all
Feature: Functions in Admin Menu 
  @smoke
  Scenario: US_01: Check authorization
    When Access site as staff role
    Then Staff cannot see the Admin menu
    When Staff access user management page by direct link
    Then Staff will see the warning message
    When Access site as admin role
    Then Admin can see the Admin menu

