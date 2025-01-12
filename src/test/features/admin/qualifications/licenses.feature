@Licenses
Feature: Licenses in Admin > Qualifications menu

    Background:
        Given User go to Qualifications > Licenses page

    @low
    Scenario: QL-01 - Verify UI of Licenses page
        Then UI of Licenses page is displayed as expected

    @medium
    Scenario: QL-02 - Add new license record then Cancel
        When User clicks Add button for Licenses
        And User input valid data for Licenses
        And User clicks Cancel button after data input for Licenses
        Then User is taken back to Licenses page

    @medium
    Scenario: QL-03 - Add new license record then Empty input
        When User clicks Add button for Licenses
        And User clicks Save button after data input for Licenses
        Then Error message appears for required field for Licenses

    @high
    Scenario: QL-04 - Add new license record then Save
        When User clicks Add button for Licenses
        And User input valid data for Licenses
        And User clicks Save button after data input for Licenses
        Then New license record is created

    @high
    Scenario: QL-05 - Update new license record
        When User adds new license record
        And User clicks Edit button for Licenses
        And User update valid data for Licenses
        And User clicks Save button after data input for Licenses
        Then License record is updated for Licenses

    @low
    Scenario: QL-06 - Verify Delete dialog then Dismiss
        When User adds new license record
        And User clicks Delete button for Licenses
        Then Delete confirmation dialog appears as expected for Licenses

        When User clicks Close button for Licenses
        Then Delete confirmation dialog disappears for Licenses

    @medium
    Scenario: QL-07 - Delete dialog then Cancel
        When User adds new license record
        And User clicks Delete button for Licenses
        And User clicks Cancel button for Licenses
        Then Delete confirmation dialog disappears for Licenses

    @high
    Scenario: QL-08 - Delete dialog then Delete
        When User adds new license record
        And User clicks Delete button for Licenses
        And User clicks Yes in delete dialog for Licenses
        Then Delete confirmation dialog disappears & record is deleted for Licenses