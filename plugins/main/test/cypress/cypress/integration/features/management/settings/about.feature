Feature: Fortishield version information

  As a fortishield user
  I want to check the about information
  in order to see information about the system

  @about @actions
  Scenario: Check Fortishield version information
    Given The fortishield admin user is logged
    When The user navigates to About settings
    Then The Fortishield information is displayed
