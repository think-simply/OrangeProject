@apiSection
Feature: SubUnitService API testing
    As a user
    I want to test APIs of SubUnitService

    Background:
        Given We created the SubUnitService context

    @apiList 
    Scenario: Clean old SubUnitService
        Then I delete a subunit name "MyName"
