@admin 
Feature: Function in admin menu- Skill qualification
Background: 
  Given User navigates to Admin page
@low 
Scenario: SK_01: Displaying all elements of skill page successfully
  When user access to skill page
  Then all elements of skill page is displayed successfully
@high
Scenario: Sk_02: Adding new skill successfully 
  When user access to skill page
  And user input valid data into name skill "skill1" and description skill " test1"
  Then new skill is added successfully
@high 
Scenario: Sk_03: Update an existing skill successfully
  When user access to skill page
  And user edit a skill
  Then the skill is updated successfully
