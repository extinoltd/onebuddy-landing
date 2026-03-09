@features-hub
Feature: Features Hub Page
  As a visitor
  I want to browse all OneBuddy features in one place
  So that I can understand the full product offering

  Background:
    Given I am on the features hub page "/features/"

  Scenario: Features hub page loads with correct metadata
    Then the page title should contain "Features"
    And the meta description should describe OneBuddy features

  Scenario: Features hub displays all 4 feature clusters
    Then I should see the following feature clusters:
      | cluster       |
      | Productivity  |
      | Health        |
      | Privacy       |
      | Capture       |

  Scenario: Each cluster shows its individual features
    Then the "Productivity" cluster should list features including:
      | feature               |
      | Pomodoro Timer        |
      | Notes & Shortcuts     |
      | Habit Tracker         |
      | Google Calendar       |
      | Bookmark Manager      |

  Scenario: Each feature card links to its dedicated page
    When I click the "Pomodoro Timer" feature card
    Then I should be navigated to "/pomodoro-timer-extension/"

  Scenario Outline: All feature links are valid
    Then I should see a link to "<featurePage>"

    Examples:
      | featurePage                      |
      | /pomodoro-timer-extension/       |
      | /health-reminder-extension/      |
      | /clipboard-manager-extension/    |
      | /notes-shortcuts-extension/      |
      | /habit-tracker-extension/        |
      | /google-calendar-extension/      |
      | /bookmark-manager-extension/     |
      | /ad-blocker-extension/           |
      | /tracker-blocker-extension/      |
      | /privacy-blur-extension/         |
      | /browser-lock-extension/         |
      | /screen-recorder-extension/      |
      | /full-page-screenshot-extension/ |
      | /encrypted-messaging-extension/  |

  Scenario: Features hub has a CTA
    Then I should see at least one "Add to Chrome — Free" button
    And the button should link to the Chrome Web Store

  Scenario: Breadcrumbs are displayed
    Then I should see breadcrumbs showing "Home > Features"
