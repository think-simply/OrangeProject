Feature: Functions in Admin Menu

  Background:
    Given User navigates to page

  @low
  Scenario: JT_01: Admin add new job title
    When User logs in as Admin
    And User access job title page
    Then Job title page has been displayed

  @high
  Scenario: JT_02 : User create new job title
    When User logs in as Admin
    And User access job title page
    And User create new job title
    Then New title has been created successfully

  @high
  Scenario: JT_03 : User update an job title
    When User logs in as Admin
    And User access job title page
    And User update an job title
    Then Job title has been updated successfully

  @high
  Scenario: JT_04 : User delete an job title
    When User logs in as Admin
    And User access job title page
    And User delete an job title
    Then Job title has been deleted successfully

  @medium
  Scenario: JT_05 : User delete multi job titles
    When User logs in as Admin
    And User access job title page
    And User delete multi job title
    Then Job titles has been deleted successfully
