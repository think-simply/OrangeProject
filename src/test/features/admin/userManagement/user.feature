@UserManagement
Feature: Functions in Admin Menu - Admin role

  Background:
    Given User navigates to page

  @low @user @demo
  Scenario: US_01: Check page UI
    When User access User management page
    Then User management page has been displayed

  @high
  Scenario Outline: US_02: Add new user : <role>
    When User creates a new user with role "<role>" and employee "<employee>", username "<username>", password "<password>", confirm password "<confirm password>"
    Then New "<username>" user has been created successfully

    Examples:
      | role  | employee | username            | password   | confirm password |
      | Admin | tina thi | usernamenttheuAdmin | Admin@1234 | Admin@1234       |
      | ESS   | tina thi | usernamenttheu      | Admin@1234 | Admin@1234       |

  @medium 
  Scenario: US_03: Search user by user name - return exactly result
    When User search by username : "usernamenttheu"
    Then Result "usernamenttheu" has been displayed follow username

  @medium
  Scenario: US_04: Search user by user name - <return no result>
    When User search by username : "usernamenoreturn"
    Then Alert no result and "No Records Found" text has been displayed

  @medium
  Scenario Outline: US_05: Search user by role
    When User search by role: "<role>"
    Then Result has been displayed follow "<role>" role

    Examples:
      | role  |
      | Admin |
      | ESS   |

  @medium
  Scenario: US_06: Search user by employee name- return result
    When User search by employee name: "t"
    Then Result has been displayed follow employee name: "tina Nguyen"

  @medium
  Scenario Outline: US_07: Search user by status
    When User search by status: "<status>"
    Then Result has been displayed follow "<status>" status

    Examples:
      | status   |
      | Enabled  |
      | Disabled |

  @low
  Scenario: US_08: Reset filter
    When User enters values on search fields:username "nttheu", userrole "Admin",employeename "t",status "Disabled"
    And User click reset button
    Then Data on all search fields have been cleared

  @high  @user @demo @now
  Scenario: US_09: Updates an account
    When User update account "usernamenttheu" to new username: "usernamenttheuEdit"
    Then Account has been updated to new username: "usernamenttheuEdit"

  @high
  Scenario Outline: US_010: Removes an account - <Description>
    When User removes an account: "<account>"
    Then Account "<account>" has been deleted

    Examples:
      | Description   | account             |
      | Account ESS   | usernamenttheuEdit  |
      | Account Admin | usernamenttheuAdmin |

  @high
  Scenario: US_11: Removes multi account
    When User creates a new user with role "Admin" and employee "t", username "usernamenttheuAdmin", password "Admin@1234", confirm password "Admin@1234"
    When User creates a new user with role "ESS" and employee "t", username "usernamenttheu", password "Admin@1234", confirm password "Admin@1234"
    When User removes all accounts contain text "usernamenttheu"
    Then All selected account contain text "usernamenttheu" have been deleted
