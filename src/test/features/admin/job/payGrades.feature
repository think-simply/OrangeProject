Feature: Functions in Admin Menu

    Background:
        Given User navigates to page

    @high @payGrade @addPayGrade
    Scenario: PG_02: Admin add new pay grade
        When User create Pay Grade with Pay Grade Name: "<payGradeName>"
        And User go to Pay Grade page
        Then New Pay Grade has been created successfully with name: "<payGradeName>"
        When User delete Pay Grade from Pay Grade Name: "<payGradeName>"
        Then Pay Grade has been deleted successfully with Pay Grade Name: "<payGradeName>"


        Examples:
            | payGradeName        |
            | Pay Grade name test |

    @high @payGrade
    Scenario: PG_03: Admin update a pay grade
        When User create Pay Grade with Pay Grade Name: "<payGradeName>"
        And User update Pay Grade from Pay Grade Name: "<payGradeName>" to "<newPayGrade>"
        Then Pay Grade has been updated successfully to "<newPayGrade>"
        When User delete Pay Grade from Pay Grade Name: "<newPayGrade>"
        Then Pay Grade has been deleted successfully with Pay Grade Name: "<payGradeName>"

        Examples:
            | payGradeName             | newPayGrade                 |
            | Pay Grade name test edit | Pay Grade name test updated |

    @high @payGrade @delete
    Scenario: PG_04: Admin delete a pay grade
        When User create Pay Grade with Pay Grade Name: "<payGradeName>"
        And User go to Pay Grade page
        And User delete Pay Grade from Pay Grade Name: "<payGradeName>"
        Then Pay Grade has been deleted successfully with Pay Grade Name: "<payGradeName>"

        Examples:
            | payGradeName               |
            | Pay Grade name test delete |