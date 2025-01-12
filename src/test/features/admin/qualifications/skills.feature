 @admin
 Feature: Function in admin menu- Skill qualification
Background: 
 Given User navigates to Admin page

@low
Scenario: SK_01: Displaying all elements of skill page successfully
When User access to skill page
Then All elements of skill page is displayed successfully
@high
Scenario: SK_02: Adding new skill successfully
When User input valid data into all fields of adding skill
Then New skill is added successfully
@high
Scenario: SK_03: Update an existing skill successfully
When User edit a skill
Then The skill is updated successfully
