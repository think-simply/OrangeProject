@guest
Feature: Login Security Testing
    @login @security1
    Scenario: Login attempt with SQL injection
        Given User navigates to page
        When I try to login with SQL injection credentials
            | username         | password         |
            | admin' OR '1'='1 | admin' OR '1'='1 |
        Then User should see an error message
        And User should not be logged in

    @login @security
    Scenario: Login attempt with XSS payload
        Given User navigates to page
        When I try to login with XSS payload
            | username                      | password |
            | <script>alert('XSS')</script> | test123  |
        # Then the payload should be sanitized
        Then User should see an error message

    #   @login @security
    #   Scenario Outline: Login with invalid credentials should be rate limited
    #     When I attempt to login with "<username>" and "<password>" <attempts> times
    #     Then I should be temporarily blocked after <maxAttempts> failed attempts
    #     And I should see a lockout message

    #     Examples:
    #       | username | password | attempts | maxAttempts |
    #       | test     | wrong    | 5        | 3           |

    #   @login @security
    #   Scenario: Password field should be properly masked
    #     When I enter "password123" in the password field
    #     Then the password should be masked
    #     And the password should not be visible in page source

    #   @login @security
    #   Scenario: Login form should enforce HTTPS
    #     When I am on the login page
    #     Then the connection should be secure
    #     And the form should submit to HTTPS endpoint
