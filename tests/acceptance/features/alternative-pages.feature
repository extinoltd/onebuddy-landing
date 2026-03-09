@alternative-pages
Feature: Alternative To Pages
  As a visitor looking for alternatives to popular extensions
  I want to learn why OneBuddy is a better choice
  So that I can switch to a single all-in-one extension

  # ──────────────────────────────────────────────
  # PAGE LOADING & SEO
  # ──────────────────────────────────────────────
  Scenario Outline: Alternative page loads with correct metadata
    Given I am on the alternative page "<slug>"
    Then the page title should contain "<competitor>"
    And the page should have a meta description
    And the canonical URL should be "https://onebuddy.io/<slug>/"
    And the page should have OpenGraph meta tags

    Examples:
      | slug                         | competitor          |
      | alternative-to-ublock-origin | uBlock Origin       |
      | alternative-to-ghostery      | Ghostery            |
      | alternative-to-loom          | Loom                |
      | alternative-to-stretchly     | Stretchly           |
      | alternative-to-marina-pomodoro | Marinara Pomodoro |

  # ──────────────────────────────────────────────
  # CONTENT SECTIONS
  # ──────────────────────────────────────────────
  Scenario Outline: Alternative page has hero with competitor name
    Given I am on the alternative page "<slug>"
    Then I should see an H1 heading mentioning "<competitor>"
    And I should see a description explaining why OneBuddy is a better alternative

    Examples:
      | slug                         | competitor       |
      | alternative-to-ublock-origin | uBlock Origin    |
      | alternative-to-ghostery      | Ghostery         |
      | alternative-to-loom          | Loom             |

  Scenario Outline: Alternative page explains feature comparisons
    Given I am on the alternative page "<slug>"
    When I scroll to the comparison content
    Then I should see a comparison between OneBuddy and "<competitor>"
    And the comparison should highlight OneBuddy's advantages
    And I should see feature cards or comparison points

    Examples:
      | slug                         | competitor       |
      | alternative-to-ublock-origin | uBlock Origin    |
      | alternative-to-ghostery      | Ghostery         |
      | alternative-to-loom          | Loom             |
      | alternative-to-stretchly     | Stretchly        |

  Scenario Outline: Alternative page has FAQ section
    Given I am on the alternative page "<slug>"
    When I scroll to the FAQ section
    Then I should see at least 3 FAQ items

    Examples:
      | slug                         |
      | alternative-to-ublock-origin |
      | alternative-to-ghostery      |
      | alternative-to-loom          |

  Scenario Outline: Alternative page has CTA button
    Given I am on the alternative page "<slug>"
    Then I should see a "Add to Chrome — Free" CTA button
    And the CTA should link to the Chrome Web Store

    Examples:
      | slug                         |
      | alternative-to-ublock-origin |
      | alternative-to-ghostery      |
      | alternative-to-loom          |
      | alternative-to-stretchly     |
      | alternative-to-marina-pomodoro |

  # ──────────────────────────────────────────────
  # ADDITIONAL ALTERNATIVE PAGES
  # ──────────────────────────────────────────────
  Scenario: Best Ghostery Alternative page loads
    Given I am on the page "/best-ghostery-alternative/"
    Then the page title should contain "Ghostery"
    And I should see content about privacy and ad blocking

  Scenario: Free Loom Alternative page loads
    Given I am on the page "/free-loom-alternative/"
    Then the page title should contain "Loom"
    And I should see content about screen recording

  Scenario: Best Productivity Extension 2026 page loads
    Given I am on the page "/best-productivity-extension-2026/"
    Then the page title should contain "Productivity"
    And I should see content positioning OneBuddy as the best option
