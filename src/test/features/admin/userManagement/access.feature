Feature: Access Control Testing
 @multiUserTest
  Scenario: Staff should not have access to admin menu
    Given Staff access to sites
    When Staff tries to access the admin menu
    Then Staff should see access denied message