Feature: Username Validation

  Scenario: Show red border for short username
    Given I navigate to the application
    When I type "Short1!" into the username field
    Then the username field should have a red border
    And a screenshot should be taken
