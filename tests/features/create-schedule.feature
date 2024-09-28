Feature: Create Schedule

  Scenario: Create a schedule
    Given I mocking the responses with "success" of the request
    And I click on button 'Agendar consulta'
    And I am on the schedule page
    When I select a date
    And I select a time
    And I click on button "Enviar"
    Then I should navigate to the schedule page
