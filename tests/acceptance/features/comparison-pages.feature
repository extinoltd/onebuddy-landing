@comparison-pages
Feature: Comparison (VS) Pages
  As a visitor comparing OneBuddy with competitors
  I want to see side-by-side feature comparisons
  So that I can make an informed decision

  # ──────────────────────────────────────────────
  # PAGE LOADING & SEO
  # ──────────────────────────────────────────────
  Scenario Outline: Comparison page loads with correct metadata
    Given I am on the comparison page "<slug>"
    Then the page title should contain "OneBuddy vs <competitor>"
    And the page should have a meta description mentioning "<competitor>"
    And the canonical URL should be "https://onebuddy.io/<slug>/"

    Examples:
      | slug                          | competitor         |
      | onebuddy-vs-ublock           | uBlock             |
      | onebuddy-vs-loom             | Loom               |
      | onebuddy-vs-forest           | Forest             |
      | onebuddy-vs-momentum         | Momentum           |
      | onebuddy-vs-notion-extension | Notion             |

  # ──────────────────────────────────────────────
  # HERO SECTION
  # ──────────────────────────────────────────────
  Scenario Outline: Comparison page displays hero section
    Given I am on the comparison page "<slug>"
    Then I should see an H1 heading mentioning "<competitor>"
    And I should see a hero description explaining the comparison

    Examples:
      | slug                          | competitor  |
      | onebuddy-vs-ublock           | uBlock      |
      | onebuddy-vs-loom             | Loom        |
      | onebuddy-vs-forest           | Forest      |

  # ──────────────────────────────────────────────
  # FEATURE COMPARISON TABLE
  # ──────────────────────────────────────────────
  Scenario Outline: Comparison table shows feature matrix
    Given I am on the comparison page "<slug>"
    When I scroll to the comparison table
    Then the table should have a column for "OneBuddy"
    And the table should have a column for "<competitor>"
    And the table should list at least 5 feature rows
    And OneBuddy should have more checkmarks than "<competitor>"

    Examples:
      | slug                          | competitor  |
      | onebuddy-vs-ublock           | uBlock      |
      | onebuddy-vs-loom             | Loom        |
      | onebuddy-vs-forest           | Forest      |
      | onebuddy-vs-momentum         | Momentum    |
      | onebuddy-vs-notion-extension | Notion      |

  Scenario: Comparison table uses visual indicators
    Given I am on the comparison page "onebuddy-vs-ublock"
    When I scroll to the comparison table
    Then checkmark icons should indicate supported features
    And X mark icons should indicate missing features

  # ──────────────────────────────────────────────
  # PROS SECTIONS
  # ──────────────────────────────────────────────
  Scenario Outline: Both OneBuddy and competitor pros are listed
    Given I am on the comparison page "<slug>"
    When I scroll to the pros section
    Then I should see a "OneBuddy Pros" section with at least 3 items
    And I should see a "<competitor> Pros" section with at least 2 items

    Examples:
      | slug                          | competitor  |
      | onebuddy-vs-ublock           | uBlock      |
      | onebuddy-vs-loom             | Loom        |
      | onebuddy-vs-forest           | Forest      |

  # ──────────────────────────────────────────────
  # VERDICT
  # ──────────────────────────────────────────────
  Scenario Outline: Verdict section explains the recommendation
    Given I am on the comparison page "<slug>"
    When I scroll to the verdict section
    Then I should see a verdict recommending OneBuddy
    And the verdict should be at least 30 words long

    Examples:
      | slug                          |
      | onebuddy-vs-ublock           |
      | onebuddy-vs-loom             |
      | onebuddy-vs-forest           |
      | onebuddy-vs-momentum         |
      | onebuddy-vs-notion-extension |

  # ──────────────────────────────────────────────
  # FAQ
  # ──────────────────────────────────────────────
  Scenario Outline: Comparison page has FAQ section
    Given I am on the comparison page "<slug>"
    When I scroll to the FAQ section
    Then I should see at least 3 FAQ items
    And FAQs should be expandable/collapsible

    Examples:
      | slug                          |
      | onebuddy-vs-ublock           |
      | onebuddy-vs-loom             |
      | onebuddy-vs-forest           |

  # ──────────────────────────────────────────────
  # CTA AND LINKS
  # ──────────────────────────────────────────────
  Scenario Outline: Comparison page has CTA
    Given I am on the comparison page "<slug>"
    Then I should see a "Add to Chrome — Free" CTA button
    And the CTA should link to the Chrome Web Store

    Examples:
      | slug                          |
      | onebuddy-vs-ublock           |
      | onebuddy-vs-loom             |

  Scenario Outline: Comparison page has related links
    Given I am on the comparison page "<slug>"
    When I scroll to the related links section
    Then I should see links to other comparison or feature pages

    Examples:
      | slug                          |
      | onebuddy-vs-ublock           |
      | onebuddy-vs-forest           |
