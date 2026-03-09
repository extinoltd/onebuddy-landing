@responsive
Feature: Responsive Design & Cross-Device Experience
  As a visitor on mobile, tablet, or desktop
  I want the website to adapt to my screen size
  So that I have a good experience on any device

  # ──────────────────────────────────────────────
  # MOBILE (375px)
  # ──────────────────────────────────────────────
  Scenario: Homepage renders correctly on mobile
    Given the viewport width is 375 pixels
    And I am on the homepage "/"
    Then the hero heading should be readable (font-size >= 28px)
    And the CTA button should be full-width or centered
    And the trust badges should display in a 2-column grid
    And feature cluster cards should stack vertically
    And the testimonial cards should stack vertically

  Scenario: Navigation works on mobile
    Given the viewport width is 375 pixels
    And I am on the homepage "/"
    Then the desktop navigation links should be hidden
    And the hamburger icon should be visible
    When I click the hamburger icon
    Then the mobile menu should be visible with all links

  Scenario: Feature page renders correctly on mobile
    Given the viewport width is 375 pixels
    And I am on the page "/pomodoro-timer-extension/"
    Then the hero section should be centered
    And the feature breakdown cards should stack vertically
    And the CTA button should be visible and accessible

  Scenario: Blog hub renders correctly on mobile
    Given the viewport width is 375 pixels
    And I am on the page "/blog/"
    Then the blog post cards should display in a single column
    And category pills should be horizontally scrollable or wrapping

  Scenario: Comparison table is usable on mobile
    Given the viewport width is 375 pixels
    And I am on the page "/onebuddy-vs-ublock/"
    Then the comparison table should be horizontally scrollable
    Or the table should adapt to a card-based layout

  Scenario: Footer renders correctly on mobile
    Given the viewport width is 375 pixels
    And I am on the homepage "/"
    When I scroll to the footer
    Then footer columns should stack vertically
    And all footer links should be tappable (min 44px target)

  # ──────────────────────────────────────────────
  # TABLET (768px)
  # ──────────────────────────────────────────────
  Scenario: Homepage renders correctly on tablet
    Given the viewport width is 768 pixels
    And I am on the homepage "/"
    Then the feature cards should display in a 2-column grid
    And the comparison table should be fully visible
    And the testimonials should display in a row

  Scenario: Features hub renders on tablet
    Given the viewport width is 768 pixels
    And I am on the page "/features/"
    Then the feature cards should display in a 2-column grid

  Scenario: Knowledge base renders on tablet
    Given the viewport width is 768 pixels
    And I am on the page "/knowledge-base/"
    Then the article cards should display in a 2-column grid

  # ──────────────────────────────────────────────
  # DESKTOP (1280px+)
  # ──────────────────────────────────────────────
  Scenario: Homepage renders correctly on desktop
    Given the viewport width is 1280 pixels
    And I am on the homepage "/"
    Then the desktop navigation links should be visible
    And the hamburger icon should be hidden
    And feature cluster cards should display in a 3-column grid
    And the comparison table should display in full width
    And the trust badges should display in a 6-column row

  Scenario: Features hub renders on desktop
    Given the viewport width is 1280 pixels
    And I am on the page "/features/"
    Then the feature cards should display in a 3 or 4-column grid

  Scenario: Blog hub renders on desktop
    Given the viewport width is 1280 pixels
    And I am on the page "/blog/"
    Then the blog post cards should display in a 3-column grid

  # ──────────────────────────────────────────────
  # TOUCH TARGETS
  # ──────────────────────────────────────────────
  Scenario Outline: All interactive elements have minimum touch target size
    Given the viewport width is 375 pixels
    And I am on the page "<path>"
    Then all buttons should have a minimum height of 44px
    And all links should have adequate padding for touch

    Examples:
      | path                          |
      | /                             |
      | /features/                    |
      | /blog/                        |
      | /pomodoro-timer-extension/    |
      | /onboarding/                  |
      | /uninstall/                   |

  # ──────────────────────────────────────────────
  # NO HORIZONTAL SCROLL
  # ──────────────────────────────────────────────
  Scenario Outline: No unwanted horizontal scrollbar
    Given the viewport width is <width> pixels
    And I am on the page "<path>"
    Then there should be no horizontal scrollbar on the page body

    Examples:
      | width | path                          |
      | 375   | /                             |
      | 375   | /features/                    |
      | 375   | /blog/                        |
      | 375   | /knowledge-base/              |
      | 375   | /pomodoro-timer-extension/    |
      | 375   | /for-remote-workers/          |
      | 768   | /                             |
      | 768   | /onebuddy-vs-ublock/          |

  # ──────────────────────────────────────────────
  # IMAGES
  # ──────────────────────────────────────────────
  Scenario Outline: Images are responsive
    Given the viewport width is 375 pixels
    And I am on the page "<path>"
    Then all images should not exceed the viewport width
    And images should have alt text attributes

    Examples:
      | path                          |
      | /                             |
      | /features/                    |
      | /blog/                        |
