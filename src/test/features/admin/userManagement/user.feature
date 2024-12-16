Feature: Functions in Admin Menu - Admin role

  Background:
    Given User navigates to page

  @low
  Scenario: US_01: Check page UI
    When User access User management page
    Then User management page has been displayed

  @high @now
  Scenario Outline: US_02: Add new user : <role>
    When User creates a new user with role "<role>" and employee "<employee>", username "<username>", password "<password>", confirm password "<confirm password>"
    Then New "<username>" user has been created successfully

    Examples:
      | role  | employee | username            | password | confirm password |
      | Admin | t        | usernamenttheuAdmin | admin123 | admin123         |
      | ESS   | t        | usernamenttheu      | admin123 | admin123         |

  @medium
  Scenario: US_03: Search user by user name - return exactly result
    When User search by username : "usernamenttheu"
    Then Result has been displayed follow username

  @medium
  Scenario: US_04: Search user by user name - <return no result>
    When User search by username : "usernamenoreturn"
    Then Alert no result has been displayed

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
    Then Result has been displayed follow employee name: "Timothy Amiano"

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
    When User update an account with new username: "usernamenttheuEdit"
    Then Account has been updated

  @high
  Scenario: US_010: Removes an account
    When User removes an account
    Then Account has been deleted

  # @high @now
  # Scenario: US_11: Removes multi account
  #   When User removes multi account
  #   Then All selected account have been deleted
