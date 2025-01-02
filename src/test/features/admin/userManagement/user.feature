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
    When User removes an account: "<username>"
    Then Account "<username>" has been deleted

    Examples: 
      | role  | employee | username            | password   | confirm password |
      | Admin | tina thi | usernamenttheuAdmin | Admin@1234 | Admin@1234       |
      | ESS   | tina thi | usernamenttheu      | Admin@1234 | Admin@1234       |

  @medium
  Scenario: US_03: Search user by user name - return exactly result
    When User creates a new user with role "Admin" and employee "tina thi", username "searchname", password "Admin@1234", confirm password "Admin@1234"
    And User search by username : "searchname"
    Then Result "searchname" has been displayed follow username
    When User removes an account: "searchname"
    Then Account "searchname" has been deleted

  @medium
  Scenario: US_04: Search user by user name - <return no result>
    When User search by username : "usernamenoreturn"
    Then Alert no result and "No Records Found" text has been displayed

  @medium 
  Scenario Outline: US_05: Search user by role
    When User creates a new user with role "<role>" and employee "tina thi", username "<searchRole>", password "Admin@1234", confirm password "Admin@1234"
    And User search by role: "<role>"
    Then Result has been displayed follow "<role>" role
    When User removes an account: "<searchRole>"
    Then Account "<searchRole>" has been deleted

    Examples: 
      | role  | searchRole |
      | Admin | roleAdmin  |
      | ESS   | roleESS    |

  @medium
  Scenario: US_06: Search user by employee name- return result
    When User creates a new user with role "Admin" and employee "tina thi", username "searchEname", password "Admin@1234", confirm password "Admin@1234"
    And User search by employee name: "tina thi"
    Then Result has been displayed follow employee name: "tina Nguyen"
    When User removes an account: "searchEname"
    Then Account "searchEname" has been deleted

  @medium
  Scenario Outline: US_07: Search user by status
    When User creates a new user with role "Admin" and employee "tina thi", username "<searchStatus>", password "Admin@1234", confirm password "Admin@1234"
    And User search by status: "<status>"
    Then Result has been displayed follow "<status>" status
    When User removes an account: "<searchStatus>"
    Then Account "<searchStatus>" has been deleted

    Examples: 
      | status   | searchStatus  |
      | Enabled  | statusEnable  |
      | Disabled | statusDisable |

  @low
  Scenario: US_08: Reset filter
    When User enters values on search fields:username "nttheu", userrole "Admin",employeename "t",status "Disabled"
    And User click reset button
    Then Data on all search fields have been cleared

  @high
  Scenario: US_09: Updates an account
    When User creates a new user with role "Admin" and employee "tina thi", username "initialAccount", password "Admin@1234", confirm password "Admin@1234"
    And User update account "initialAccount" to new username: "editAccount"
    Then Account has been updated to new username: "editAccount"
    When User removes an account: "editAccount"
    Then Account "editAccount" has been deleted

  @high
  Scenario Outline: US_10: Removes an account - <role>
    When User creates a new user with role "<role>" and employee "tina thi", username "<usernameDelete>", password "Admin@1234", confirm password "Admin@1234"
    And User removes an account: "<usernameDelete>"
    Then Account "<usernameDelete>" has been deleted

    Examples: 
      | role  | usernameDelete |
      | ESS   | deleteESS      |
      | Admin | deleteAdmin    |

  @high
  Scenario: US_11: Removes multi account
    When User creates a new user with role "Admin" and employee "tina thi", username "usernamenttheuRemove1", password "Admin@1234", confirm password "Admin@1234"
    And User creates a new user with role "ESS" and employee "tina thi", username "usernamenttheuRemove2", password "Admin@1234", confirm password "Admin@1234"
    And User removes all accounts contain text "usernamenttheu"
    Then All selected account contain text "usernamenttheu" have been deleted

  @high
  Scenario Outline: US_12: Check Validation message for input fields
    When User enter on "<field>" value "<value>"
    Then Message will displayed under "<field>" as "<message>"

    Examples: 
      | field         | value                                                                | message                                                |
      | Employee Name |                                                                      | Required                                               |
      | Employee Name |                                                               232342 | Invalid                                                |
      | Username      |                                                                      | Required                                               |
      | Username      | Anna                                                                 | Should be at least 5 characters                        |
      | Username      | Lorem Ipsum has been the industry's standard dummy                   | Should not exceed 40 characters                        |
      | Password      |                                                                 1234 | Should have at least 8 characters                      |
      | Password      |                                                             12345678 | Your password must contain minimum 1 lower-case letter |
      | Password      | loremipsum                                                           | Your password must contain minimum 1 upper-case letter |
      | Password      | Lorem Ipsum                                                          | Your password must contain minimum 1 number            |
      | Password      | Lorem Ipsum has been the industry's standard dummy dummy dummy dummy | Should not exceed 64 characters                        |

  @high
  Scenario Outline: US_13: Check validation message for dropdown fields
    When User clicks save button with empty fields
    Then Message will displayed under "<field>" as "<message>"

    Examples: 
      | field     | value | message  |
      | User Role |       | Required |
      | Status    |       | Required |

  @high
  Scenario Outline: US_14: Check validation message when user input invalid confirm password
    When User enter on Password value "Admin@1234" and Confirm Password value "Admin@123"
    Then Message will displayed under "Confirm Password" as "Passwords do not match"
