@Memberships
Feature: Manage Memberships - Qualifications

  Background:
    Given User accessed Memberships page

  @low
  Scenario: ME_01: Check UI of Memberships page
    Then All elements are displayed as expected in Memberships

  @high
  Scenario: ME_02: Add a new Membership
    When User clicks Add button for Membership
    And User inputs valid data for Membership contains name "NewMemberships"
    And User clicks Save button for Membership
    Then New membership has been created

  @high
  Scenario: ME_03: Update a Membership
    When User clicks Update icon for Membership has name "MembershipToUpdate"
    And User updates data for Membership
    And User clicks Save button for Membership
    Then Membership has been updated

  @high
  Scenario: ME_04: Delete a Membership
    When User clicks Delete icon for Membership has name "MembershipToDelete"
    And User confirms delete for Membership
    Then Membership has been deleted

  @medium
  Scenario: ME_05: Delete multiple Memberships
    When User selects multiple memberships contain name "Membership1" and "Membership2"
    And User clicks Delete button for multiple Memberships
    And User confirms delete for Membership
    Then All selected memberships have been deleted