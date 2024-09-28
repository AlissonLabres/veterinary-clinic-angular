Feature: List animals by user

  Scenario: List all users
    Given I mocking the response "success" from the API animals endpoint
    And I am on the animals page
    Then I should see the following animals
      | Scott | CAT | 5 |

  Scenario: List all users
    Given I mocking the response "empty" from the API animals endpoint
    And I am on the animals page
    Then I should see empty animals list
