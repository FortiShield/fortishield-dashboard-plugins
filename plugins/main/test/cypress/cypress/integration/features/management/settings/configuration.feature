Feature: add Configuration to modules

    As a fortishield user
    I want to add sample data indices
    in order to check modules

    @Configuration
    Scenario: Add configuration data
        Given The fortishield admin user is logged
        When The user navigates to Configuration settings
        Then The app current settings are displayed