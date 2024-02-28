Feature: Validate Filter Rule refresh option is working fine

    As a fortishield user
    i want to see the Rules pages
    in order to manage them

    @rules
    Scenario Outline: Filter Rule are displayed after refreshing the page
        Given The fortishield admin user is logged
        When The user navigates to rules
        And The user search a rule by Level <condition>
        And The user clicks the refresh button
        Then The filtered label <condition> is still visible
        Examples:
            | condition |
            | 2         |