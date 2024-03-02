Feature: Create User

  Background:
    Given I am on the create user page

  Scenario: Create user with valid data
    And I mocking the response with "success" of the request to create a user
    When I fill in "Name" with "John Doe"
    And I fill in "Email" with "email@email.com.br"
    And I fill in "Phone" with "11555554444"
    And I click button
    Then I should navigate to the list users page

  Scenario: Create user with invalid data
    And I mocking the response with "error" of the request to create a user
    When I fill in "Name" with "John"
    And I fill in "Email" with "email@email.com"
    And I fill in "Phone" with "11555554444"
    And I click button
    Then I should see "Internal server error"
    And I should not navigate to the list users page
