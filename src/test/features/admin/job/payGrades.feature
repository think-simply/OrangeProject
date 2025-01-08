Feature: Functions in Admin Menu

    Background:
        Given User navigates to page

    @high @payGrade
    Scenario: PG_02: Admin add,update and delete pay grade
        When User create Pay Grade with Pay Grade Name: "Hoa test 52"
        Then New Pay Grade has been created successfully
        When User update Pay Grade from Pay Grade Name: "Hoa test 52" to "Hoa test 53"
        Then Pay Grade has been updated successfully to "Hoa test 53"
        When User delete Pay Grade from Pay Grade Name: 'Hoa test 53'
        Then Pay Grade has been deleted successfully with Pay Grade Name: 'Hoa test 53'

#   @high @payGrade
#   Scenario: PG_03: Admin edit new pay grade
#     And User update Pay Grade from Pay Grade Name: "Name 1" to Pay Grade Name: "Name 2"
#     Then New Pay Grade has been updated successfully