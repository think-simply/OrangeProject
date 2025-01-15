@admin @skill
Feature: Function in admin menu- Skill qualification
Background: 
  Given User navigates to page
@low 
Scenario: SK_01: Displaying all elements of skill page successfully
  When User access to skill page
  Then All elements of skill page is displayed successfully
@high
Scenario: SK_02: Adding new skill successfully 
  When User access to skill page
  And User input valid data into name skill "skill 5" and description skill " test1"
  Then New skill is added successfully
   When User delete skill "skill 5"

@high 
Scenario: SK_03: Update an existing skill successfully
  When User access to skill page
  And User input valid data into name skill "skill 4" and description skill " test1"
  And User edit a skill "skill 4" into "new skill3"
  Then The skill is updated successfully
  When User delete skill "new skill3"
