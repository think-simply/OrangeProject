Feature: qualifications feature in admin menu
Background: 
  Given User navigates to Admin page
  

@high @now
Scenario: ED_01: Adding level of education
When login to admin page
And user navigate to admin menu
And create new level of education
Then new Education level is created successfully