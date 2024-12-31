@Licenses
Feature: Licenses in Admin > Qualifications menu

    Background:
        Given User go to Qualifications > Licenses page

    @low
    Scenario: QL_01: Verify UI of Licenses page
        Then UI of Licenses page is displayed as expected

    @medium
    Scenario: QL_02: Add new license record -> Cancel
        When User clicks Add button for Licenses
        And User input valid data for Licenses
        And User clicks Cancel button after data input for Licenses
        Then User is taken back to Licenses page

    @medium
    Scenario: QL_03: Add new license record -> Empty input
        When User clicks Add button for Licenses
        And User clicks Save button after data input for Licenses
        Then Error message appears for required field for Licenses

    @high
    Scenario: QL_04: Add new license record -> Save
        When User input valid data for Licenses
        And User clicks Save button after data input for Licenses
        Then New license record is created

    @high
    Scenario: QL_05: Update new license record
        When User clicks Edit button for Licenses
        And User input valid data for Licenses
        And User clicks Save button after data input for Licenses
        Then License record is updated

    @low
    Scenario: QL_06: Verify Delete dialog
        When User clicks Delete button for Licenses
        Then Delete confirmation dialog appears as expected for Licenses

    @medium
    Scenario: QL_07: Delete dialog -> Dismiss
        When User clicks Close button for Licenses
        Then Delete confirmation dialog disappears for Licenses

    @medium
    Scenario: QL_08: Delete dialog -> Cancel
        When User clicks Cancel button for Licenses
        Then Delete confirmation dialog disappears for Licenses

    @high
    Scenario: Delete dialog -> Delete
        When User clicks Delete button for Licenses
        And User clicks Yes in delete dialog for Licenses
        Then Delete confirmation dialog disappears & record is deleted for Licenses