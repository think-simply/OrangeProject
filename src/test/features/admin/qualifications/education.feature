Feature: qualifications feature in admin menu
Background: 
  Given User navigates to Admin page
  

@high @education @demo
Scenario: ED_01: Adding level of education
And user navigate to admin menu
And create new level of education
Then new Education level is created successfully
@high @education @demo
Scenario: ED_02: Update existing level of education
When user updates an exisiting level
Then level is updated successfully
@high @education @demo
Scenario: ED_03: Delete education level
When user delete education level
Then education level is deleted successfully