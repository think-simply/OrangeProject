@admin @jobTitle
Feature: Functions in Admin Menu

  Background:
    Given User navigates to page

  @low @jobTitle @demo @addJobTitle
  Scenario: JT_01: Admin add new job title
    And User access job title page
    Then Job title page has been displayed

  @high @jobTitle @demo @addJobTitle
  Scenario: JT_02: User create new job title
    And User access job title page
    And User create new job title with "<jobTitleName>"
    Then New title has been created successfully with "<jobTitleName>"

    Examples:
      | jobTitleName              |
      | Hoa Test Create Job Title |

  @high @now1
  Scenario: JT_03: User update an job title
    When User access job title page
    And User create new job title with "<jobTitleName>"
    And User update a job title from "<jobTitleName>" to "<newName>"
    Then Job title has been updated successfully with "<newName>"

    Examples:
      | jobTitleName   | newName          |
      | Job Title Edit | Job Title Update |

  @high @jobTitle @demo
  Scenario: JT_04 : User delete an job title
    When User access job title page
    And User create new job title with "<jobTitleName>"
    And User delete an job title: "<jobTitleName>"
    Then Job title has been deleted successfully: "<jobTitleName>"

    Examples:
      | jobTitleName              |
      | Hoa Test Job Title delete |

  @medium @jobTitle @demo @multiDeleteJob
  Scenario: JT_05 : User delete multi job titles
    When User access job title page
    And User create new job title with "multi1"
     And User create new job title with "multi2"
    And User delete multi job title contains "multi"
    Then Job title has been deleted successfully: "multi"

