@skill
Feature: Function in admin menu- Skill qualification
Background: 
@low @now
Scenario: SK_01: Displaying all elements of skill page successfully
When user access to skill page
Then all elements of skill page is displayed successfully
@high @now
Scenario: Sk_02: Adding new skill successfully 
When user input valid data into name skill "skill1" and description skill " test1"
Then new skill is added successfully
@high @now
Scenario: Sk_03: Update an existing skill successfully
When user edit a skill
Then the skill is updated successfully
