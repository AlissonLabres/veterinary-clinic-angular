Feature: List users

  Scenario: List all users
    Given I mocking the response "success" from the API users endpoint
    And I am on the users page
    Then I should see the following users
      | John Due | john@email.com | (11) 55555-4444 |
      | Jane Due | jane@email.com | (11) 55555-4445 |
      | Jack Due | jack@email.com | (11) 55555-4446 |

  Scenario: List all users
    Given I mocking the response "empty" from the API users endpoint
    And I am on the users page
    Then I should see empty users list
