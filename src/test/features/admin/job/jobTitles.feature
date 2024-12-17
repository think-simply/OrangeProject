Feature: Functions in Admin Menu

  Background:
    Given User navigates to page

  @low @now
  Scenario: JT_01: Admin add new job title
    And User access job title page
    Then Job title page has been displayed

  @high @now
  Scenario: JT_02 : User create new job title
    And User access job title page
    And User create new job title
    Then New title has been created successfully

  @high @now
  Scenario: JT_03 : User update an job title
    And User access job title page
    And User update an job title
    Then Job title has been updated successfully

  @high @now
  Scenario: JT_04 : User delete an job title
    And User access job title page
    And User delete an job title
    Then Job title has been deleted successfully

  @medium @now
  Scenario: JT_05 : User delete multi job titles
    And User access job title page
    And User delete multi job title
    Then Job titles has been deleted successfully
