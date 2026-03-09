@homepage
Feature: Homepage
  As a visitor to onebuddy.io
  I want to see a compelling landing page
  So that I understand what OneBuddy does and can install it

  Background:
    Given I am on the homepage "/"

  # ──────────────────────────────────────────────
  # HERO SECTION
  # ──────────────────────────────────────────────
  Scenario: Hero section displays correctly
    Then I should see the heading "Stop Juggling 10 Extensions."
    And I should see the subheading containing "OneBuddy replaces"
    And I should see a primary CTA button "Add to Chrome — Free"
    And I should see a secondary CTA button "See How It Works"
    And I should see the OneBuddy side panel mockup image

  Scenario: Primary CTA links to Chrome Web Store
    When I click the hero "Add to Chrome — Free" button
    Then a new tab should open to "https://chromewebstore.google.com/detail/kcclkkcbbfgcpknpnanhbpiffidjifgm"

  Scenario: Secondary CTA scrolls to How It Works section
    When I click the "See How It Works" button
    Then the page should scroll to the "#how-it-works" section
    And the "#how-it-works" section should be visible in the viewport

  # ──────────────────────────────────────────────
  # TRUST BAR
  # ──────────────────────────────────────────────
  Scenario: Trust bar displays all badges
    Then I should see the following trust badges:
      | badge                |
      | 100% Free            |
      | No Data Selling      |
      | Local-First Storage  |
      | 40+ Languages        |
      | Manifest V3          |
      | Lightweight          |

  # ──────────────────────────────────────────────
  # PROBLEM / SOLUTION SECTION
  # ──────────────────────────────────────────────
  Scenario: Problem section shows extension overload
    Then I should see the "The Problem" section
    And I should see at least 5 single-purpose extension icons
    And I should see an arrow pointing to the OneBuddy solution

  Scenario: Solution section highlights OneBuddy consolidation
    Then I should see text about replacing multiple extensions with one
    And I should see a OneBuddy solution card

  # ──────────────────────────────────────────────
  # FEATURE CLUSTERS
  # ──────────────────────────────────────────────
  Scenario: All four feature clusters are displayed
    Then I should see the following feature clusters:
      | cluster       |
      | Productivity  |
      | Health        |
      | Privacy       |
      | Capture       |

  Scenario Outline: Feature cluster shows its features
    When I scroll to the "<cluster>" feature cluster
    Then I should see at least 3 feature cards within that cluster
    And each feature card should have an icon, title, and description

    Examples:
      | cluster       |
      | Productivity  |
      | Health        |
      | Privacy       |
      | Capture       |

  Scenario: Feature cards link to individual feature pages
    When I click on a feature card titled "Pomodoro Timer"
    Then I should be navigated to "/pomodoro-timer-extension/"

  # ──────────────────────────────────────────────
  # COMPARISON TABLE
  # ──────────────────────────────────────────────
  Scenario: Comparison table is displayed
    When I scroll to the "#comparison" section
    Then I should see a comparison table
    And the table should have a column for "OneBuddy"
    And the table should show checkmarks for OneBuddy features
    And the table should show X marks for missing competitor features

  Scenario: Comparison table includes major competitors
    When I scroll to the comparison table
    Then the table should include comparison with at least 3 competitor tools

  # ──────────────────────────────────────────────
  # TESTIMONIALS
  # ──────────────────────────────────────────────
  Scenario: Testimonials section displays user reviews
    When I scroll to the testimonials section
    Then I should see at least 3 testimonial cards
    And each testimonial should show a user name
    And each testimonial should show a role or title
    And each testimonial should show a 5-star rating
    And each testimonial should show a quote

  # ──────────────────────────────────────────────
  # FAQ SECTION
  # ──────────────────────────────────────────────
  Scenario: FAQ section is displayed with expandable items
    When I scroll to the FAQ section
    Then I should see at least 4 FAQ items
    And all FAQ answers should be collapsed by default

  Scenario: FAQ item expands on click
    When I scroll to the FAQ section
    And I click on the first FAQ question
    Then the answer for the first FAQ should be visible
    And the other FAQ answers should remain collapsed

  Scenario: FAQ item collapses on second click
    When I scroll to the FAQ section
    And I click on the first FAQ question
    And I click on the first FAQ question again
    Then the answer for the first FAQ should be collapsed

  # ──────────────────────────────────────────────
  # SUPPORT SECTION
  # ──────────────────────────────────────────────
  Scenario: Support section is displayed
    When I scroll to the "#support" section
    Then I should see a support call-to-action

  # ──────────────────────────────────────────────
  # FINAL CTA
  # ──────────────────────────────────────────────
  Scenario: Final CTA section encourages installation
    When I scroll to the final CTA section
    Then I should see the heading "Stop Installing 10 Extensions. Install OneBuddy."
    And I should see a "Add to Chrome — Free" button
    And I should see trust signals:
      | signal           |
      | Free forever     |
      | No credit card   |
      | Works offline    |

  Scenario: Final CTA button links to Chrome Web Store
    When I scroll to the final CTA section
    And I click the "Add to Chrome — Free" button
    Then a new tab should open to the Chrome Web Store extension page

  # ──────────────────────────────────────────────
  # SEO INTERNAL LINKS
  # ──────────────────────────────────────────────
  Scenario: SEO internal links section has all categories
    When I scroll to the internal links section
    Then I should see a "Popular Features" column with at least 6 links
    And I should see an "Alternative To" column with at least 5 links
    And I should see a "Use Cases" column with at least 6 links
    And I should see a "Comparisons" column with at least 4 links

  Scenario Outline: SEO internal link navigates correctly
    When I scroll to the internal links section
    And I click the "<linkText>" link
    Then I should be navigated to "<expectedPath>"

    Examples:
      | linkText              | expectedPath                  |
      | Pomodoro Timer        | /pomodoro-timer-extension/    |
      | Ad Blocker            | /ad-blocker-extension/        |
      | uBlock Origin Alt     | /alternative-to-ublock-origin/|
      | For Remote Workers    | /for-remote-workers/          |
      | OneBuddy vs Forest    | /onebuddy-vs-forest/          |
