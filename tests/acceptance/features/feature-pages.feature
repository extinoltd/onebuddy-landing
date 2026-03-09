@feature-pages
Feature: Individual Feature Pages
  As a visitor interested in a specific feature
  I want to read detailed information about that feature
  So that I can decide if OneBuddy meets my needs

  # ──────────────────────────────────────────────
  # PAGE STRUCTURE (applies to all 14 feature pages)
  # ──────────────────────────────────────────────
  Scenario Outline: Feature page loads with correct SEO metadata
    Given I am on the feature page "<slug>"
    Then the page title should contain "<keyword>"
    And the page should have a meta description
    And the canonical URL should be "https://onebuddy.io/<slug>/"
    And the page should have OpenGraph meta tags

    Examples:
      | slug                           | keyword            |
      | pomodoro-timer-extension       | Pomodoro           |
      | health-reminder-extension      | Health Reminder    |
      | clipboard-manager-extension    | Clipboard          |
      | notes-shortcuts-extension      | Notes              |
      | habit-tracker-extension        | Habit Tracker      |
      | google-calendar-extension      | Google Calendar    |
      | bookmark-manager-extension     | Bookmark           |
      | ad-blocker-extension           | Ad Blocker         |
      | tracker-blocker-extension      | Tracker Blocker    |
      | privacy-blur-extension         | Privacy Blur       |
      | browser-lock-extension         | Browser Lock       |
      | screen-recorder-extension      | Screen Recorder    |
      | full-page-screenshot-extension | Screenshot         |
      | encrypted-messaging-extension  | Encrypted          |

  Scenario Outline: Feature page has hero section
    Given I am on the feature page "<slug>"
    Then I should see a badge label
    And I should see an H1 heading
    And I should see a hero description

    Examples:
      | slug                           |
      | pomodoro-timer-extension       |
      | health-reminder-extension      |
      | ad-blocker-extension           |
      | screen-recorder-extension      |
      | encrypted-messaging-extension  |

  Scenario Outline: Feature page has "What It Does" section
    Given I am on the feature page "<slug>"
    When I scroll to the "What It Does" section
    Then I should see a description of what the feature does
    And the description should contain at least 50 words

    Examples:
      | slug                           |
      | pomodoro-timer-extension       |
      | clipboard-manager-extension    |
      | privacy-blur-extension         |

  Scenario Outline: Feature page has "Why Better" section
    Given I am on the feature page "<slug>"
    When I scroll to the "Why Better" section
    Then I should see a comparison with alternatives
    And the content should explain OneBuddy's advantages

    Examples:
      | slug                           |
      | pomodoro-timer-extension       |
      | ad-blocker-extension           |
      | screen-recorder-extension      |

  Scenario Outline: Feature page has feature breakdown grid
    Given I am on the feature page "<slug>"
    When I scroll to the feature breakdown section
    Then I should see at least 3 feature breakdown cards
    And each card should have an icon, title, and description

    Examples:
      | slug                           |
      | pomodoro-timer-extension       |
      | health-reminder-extension      |
      | clipboard-manager-extension    |
      | notes-shortcuts-extension      |
      | ad-blocker-extension           |

  Scenario Outline: Feature page has benefits list
    Given I am on the feature page "<slug>"
    When I scroll to the benefits section
    Then I should see at least 3 benefits listed

    Examples:
      | slug                           |
      | pomodoro-timer-extension       |
      | tracker-blocker-extension      |
      | browser-lock-extension         |

  Scenario Outline: Feature page has use cases
    Given I am on the feature page "<slug>"
    When I scroll to the use cases section
    Then I should see at least 2 use cases

    Examples:
      | slug                           |
      | pomodoro-timer-extension       |
      | clipboard-manager-extension    |
      | encrypted-messaging-extension  |

  # ──────────────────────────────────────────────
  # FAQ SECTION
  # ──────────────────────────────────────────────
  Scenario Outline: Feature page has FAQ section
    Given I am on the feature page "<slug>"
    When I scroll to the FAQ section
    Then I should see at least 3 FAQ items
    And all FAQ items should be collapsed by default

    Examples:
      | slug                           |
      | pomodoro-timer-extension       |
      | ad-blocker-extension           |
      | privacy-blur-extension         |
      | screen-recorder-extension      |

  Scenario: FAQ items expand and collapse
    Given I am on the feature page "pomodoro-timer-extension"
    When I scroll to the FAQ section
    And I click the first FAQ question
    Then the answer should expand and be visible
    When I click the first FAQ question again
    Then the answer should collapse

  # ──────────────────────────────────────────────
  # CTA AND RELATED LINKS
  # ──────────────────────────────────────────────
  Scenario Outline: Feature page has CTA button
    Given I am on the feature page "<slug>"
    Then I should see a "Add to Chrome — Free" CTA button
    And the CTA should link to the Chrome Web Store

    Examples:
      | slug                           |
      | pomodoro-timer-extension       |
      | health-reminder-extension      |
      | ad-blocker-extension           |

  Scenario Outline: Feature page shows related features
    Given I am on the feature page "<slug>"
    When I scroll to the related features section
    Then I should see at least 2 related feature links
    And each related link should navigate to a valid feature page

    Examples:
      | slug                           |
      | pomodoro-timer-extension       |
      | clipboard-manager-extension    |
      | encrypted-messaging-extension  |

  # ──────────────────────────────────────────────
  # BREADCRUMBS
  # ──────────────────────────────────────────────
  Scenario Outline: Feature page shows breadcrumbs
    Given I am on the feature page "<slug>"
    Then I should see breadcrumbs
    And the breadcrumb "Home" should link to "/"

    Examples:
      | slug                           |
      | pomodoro-timer-extension       |
      | ad-blocker-extension           |

  # ──────────────────────────────────────────────
  # SCHEMA MARKUP
  # ──────────────────────────────────────────────
  Scenario Outline: Feature page has JSON-LD schema
    Given I am on the feature page "<slug>"
    Then the page should contain JSON-LD structured data
    And the JSON-LD should include "@type" "SoftwareApplication" or "FAQPage"

    Examples:
      | slug                           |
      | pomodoro-timer-extension       |
      | ad-blocker-extension           |
      | screen-recorder-extension      |
