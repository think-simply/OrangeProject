@apiSection
Feature: OpenID Provider Validation API
    As a user
    I want to validate OpenID provider names
    So that I can ensure uniqueness of providers

    Background:
        Given The API endpoint is "https://buianthai.online/orangehrm/web/index.php/api/"

    @apiList 
    Scenario: Create a valid request to listing API: /v2/auth/openid-providers?limit=50&offset=0
        When I send a GET request to get listing API
        Then The response status should be 200
        And API should response correct properties
    @apiCreate
    Scenario: Create a new provider: Valid request with all parameters, POST method
        When I send a POST request to create new provider with parameters:
            | parameter    | value           |
            | clientId     | name1           |
            | clientSecret | OpenIdProvider  |
            | name         | NewProviderName |
            | url          | 1               |
        Then The response status should be 200
        And API should response correctly with provider name "NewProviderName"
    @apiCreate 
    Scenario:  Create a duplicate provider
        When I send a POST request to create new provider with parameters:
            | parameter    | value           |
            | clientId     | name1           |
            | clientSecret | OpenIdProvider  |
            | name         | NewProviderName |
            | url          | 1               |
        Then The response status should be 422
    @apiUpdate 
    Scenario: Update a provider : Valid request PUT
        When I send a PUT request to update a provider with parameters:
            | parameter    | value              |
            | clientId     | name1              |
            | clientSecret | OpenIdProvider     |
            | name         | UpdateProviderName |
            | url          | 1                  |
        Then The response status should be 200

    @apiDelete
    Scenario: Delete a provider : Valid request DELETE
        When I send a delete request to delete a provider
        Then The response status should be 200


