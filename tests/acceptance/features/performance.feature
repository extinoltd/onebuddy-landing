@performance
Feature: Performance & Loading
  As a visitor
  I want pages to load quickly
  So that I have a smooth browsing experience

  # ──────────────────────────────────────────────
  # PAGE LOAD TIMES
  # ──────────────────────────────────────────────
  Scenario Outline: Pages load within acceptable time
    Given I navigate to "<path>"
    Then the page should reach First Contentful Paint within 2 seconds
    And the page should be fully interactive within 4 seconds

    Examples:
      | path                          |
      | /                             |
      | /features/                    |
      | /blog/                        |
      | /knowledge-base/              |
      | /pomodoro-timer-extension/    |
      | /onboarding/                  |
      | /uninstall/                   |

  # ──────────────────────────────────────────────
  # BUNDLE SIZE
  # ──────────────────────────────────────────────
  Scenario: Shared JS bundle is reasonably sized
    Then the shared first-load JS should be under 120 kB

  Scenario: Static pages have minimal JS overhead
    Given I check the build output
    Then static pages should have a first-load JS under 115 kB

  Scenario: Client-side pages have acceptable JS size
    Given I check the build output
    Then the "/onboarding/" page JS should be under 130 kB
    And the "/uninstall/" page JS should be under 120 kB

  # ──────────────────────────────────────────────
  # STATIC GENERATION
  # ──────────────────────────────────────────────
  Scenario: All pages are statically generated
    Given I run the production build
    Then all pages should be marked as "○ (Static)"
    And no pages should be marked as server-rendered

  Scenario: Build produces correct number of pages
    Given I run the production build
    Then the build should generate at least 76 pages
    And the build should complete without errors

  # ──────────────────────────────────────────────
  # ASSETS
  # ──────────────────────────────────────────────
  Scenario: Images are optimized
    Given I am on the homepage "/"
    Then images should use next/image or optimized formats
    And images should have explicit width and height attributes

  Scenario: No render-blocking resources
    Given I navigate to "/"
    Then CSS should not block initial render excessively
    And fonts should be loaded with display swap or optional
