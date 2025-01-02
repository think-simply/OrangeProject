Feature: Functions in Admin Menu

  Background:
    Given User navigates to page

  @low @jobTitle @demo
  Scenario: JT_01: Admin add new job title
    And User access job title page
    Then Job title page has been displayed

  @high @jobTitle @demo
  Scenario: JT_02 : User create new job title
    And User access job title page
    And User create new job title
    Then New title has been created successfully
    Then User delete an job title

  @high @jobTitle @demo
  Scenario: JT_03 : User update an job title
    When User access job title page
    And User create new job title
    And User access job title page
    And User update an job title
    Then Job title has been updated successfully

  @high @jobTitle @demo
  Scenario: JT_04 : User delete an job title
    When User access job title page
    And User create new job title
    And User access job title page
    And User delete an job title
    Then Job title has been deleted successfully

  @medium @jobTitle @demo
  Scenario: JT_05 : User delete multi job titles
    When User access job title page
    And User create new job title
    And User access job title page
    And User delete multi job title
    Then Job titles has been deleted successfully
