@UserManagement
Feature: Functions in Admin Menu - Admin role

  Background:
    Given User navigates to page

  @low
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

  @high
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
    When User creates a new user with role "ESS" and employee "t", username "usernamernttheu", password "Admin@1234", confirm password "Admin@1234"
    When User removes all accounts contain text "usernamenttheu"
    Then All selected account contain text "usernamenttheu" have been deleted

  @high @now
  Scenario Outline: US_12: Check Validation message
    When User enter on "<field>" value "<value>"
    Then Message will displayed under "<field>" as "<message>"

    Examples:
      | field            | value                                                                | message                                                |
      # | User Role        |                                                                      | Required                                               |
      # | User Role        | Admin                                                                |                                                        |
      # | Employee Name    | t                                                                    |                                                        |
      # | Employee Name    |                                                                      | Required                                               |
      # | Employee Name    | Admin                                                                |                                                        |
      | Username         |                                                                      | Required                                               |
      | Username         | Anna                                                                 | Should be at least 5 characters                        |
      | Username         | Lorem Ipsum has been the industry's standard dummy                   | Should not exceed 40 characters                        |
      # | Username         | Lorem                                                                |                                                        |
      | Password         | 1234                                                                 | Should have at least 8 characters                      |
      | Password         | 12345678                                                             | Your password must contain minimum 1 lower-case letter |
      | Password         | loremipsum                                                           | Your password must contain minimum 1 upper-case letter |
      | Password         | Lorem Ipsum                                                          | Your password must contain minimum 1 number            |
      | Password         | Lorem Ipsum has been the industry's standard dummy dummy dummy dummy | Should not exceed 64 characters                        |
      # | Password         | Admin@1234                                                           |                                                        |
      | Confirm Password | Admin@12345                                                          | Passwords do not match                                 |
      # | Confirm Password | Admin@1234                                                           |                                                        |


