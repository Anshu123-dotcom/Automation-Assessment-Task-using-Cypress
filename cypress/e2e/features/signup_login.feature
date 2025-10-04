Feature: Parabank Sign Up and Login

  Scenario: User registers a new account
    Given I navigate to the Parabank registration page
    When I fill the registration form with valid data
    And I submit the registration form
    Then I should see the registration success message

  Scenario: User logs in with valid credentials
    Given I navigate to the Parabank login page
    When I login with the registered credentials
    Then I should be redirected to the dashboard
    And I should see the account balance displayed
