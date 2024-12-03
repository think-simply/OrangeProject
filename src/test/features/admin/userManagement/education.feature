Feature: qualifications feature in admin menu
Background: 
  Given User is on the admin login page
  And User has valid admin credentials
@low
Scenario: ED_01: Displaying of all elements in qualification page
When User logs in as admin role
And User navigate to Qualifications dropdown list
And User selects Education option
Then All elements of Education page is displayed
@high
Scenario: ED_02: Adding level of edication
Given User is navigated to Education page
When User click Add button
And User input valid data to level field
And User clickk Save button
Then new Education level is created successfully