@navigation
Feature: Site Navigation
  As a visitor
  I want to navigate the website using navbar and footer
  So that I can find all pages and features easily

  # ──────────────────────────────────────────────
  # NAVBAR - DESKTOP
  # ──────────────────────────────────────────────
  Scenario: Navbar is visible on all pages
    Given I am on the homepage "/"
    Then the navbar should be visible
    And the navbar should be fixed to the top of the page

  Scenario: Navbar displays the OneBuddy logo
    Given I am on the homepage "/"
    Then I should see the OneBuddy logo in the navbar
    And clicking the logo should navigate to "/"

  Scenario Outline: Navbar contains all navigation links
    Given I am on the homepage "/"
    Then the navbar should contain a link "<linkText>" pointing to "<href>"

    Examples:
      | linkText        | href              |
      | Features        | /features/        |
      | Blog            | /blog/            |
      | Knowledge Base  | /knowledge-base/  |

  Scenario: Navbar has anchor links for homepage sections
    Given I am on the homepage "/"
    Then the navbar should contain a link "How It Works" pointing to "/#how-it-works"
    And the navbar should contain a link "Compare" pointing to "/#comparison"
    And the navbar should contain a link "Support" pointing to "/#support"

  Scenario: Navbar CTA button links to Chrome Web Store
    Given I am on the homepage "/"
    Then the navbar should have a "Add to Chrome — Free" CTA button
    And the CTA button should link to the Chrome Web Store

  # ──────────────────────────────────────────────
  # NAVBAR - MOBILE
  # ──────────────────────────────────────────────
  Scenario: Mobile hamburger menu is visible on small screens
    Given I am on the homepage "/"
    And the viewport width is 375 pixels
    Then the hamburger menu icon should be visible
    And the desktop nav links should be hidden

  Scenario: Mobile menu opens on hamburger click
    Given I am on the homepage "/"
    And the viewport width is 375 pixels
    When I click the hamburger menu icon
    Then the mobile menu should slide open
    And I should see all navigation links in the mobile menu

  Scenario: Mobile menu closes after selecting a link
    Given I am on the homepage "/"
    And the viewport width is 375 pixels
    When I click the hamburger menu icon
    And I click the "Features" link in the mobile menu
    Then the mobile menu should close
    And I should be navigated to "/features/"

  Scenario: Mobile menu has CTA button
    Given I am on the homepage "/"
    And the viewport width is 375 pixels
    When I click the hamburger menu icon
    Then I should see a "Add to Chrome — Free" button in the mobile menu

  # ──────────────────────────────────────────────
  # NAVBAR PERSISTENCE ACROSS PAGES
  # ──────────────────────────────────────────────
  Scenario Outline: Navbar is present on content pages
    Given I am on the page "<page>"
    Then the navbar should be visible
    And the OneBuddy logo should be clickable

    Examples:
      | page                              |
      | /features/                        |
      | /blog/                            |
      | /knowledge-base/                  |
      | /pomodoro-timer-extension/        |
      | /onebuddy-vs-ublock/              |
      | /for-remote-workers/              |
      | /alternative-to-ublock-origin/    |

  Scenario: Navbar is hidden on onboarding page
    Given I am on the page "/onboarding/"
    Then the navbar should not be visible

  Scenario: Navbar is hidden on uninstall page
    Given I am on the page "/uninstall/"
    Then the navbar should not be visible

  # ──────────────────────────────────────────────
  # FOOTER
  # ──────────────────────────────────────────────
  Scenario: Footer is displayed on all standard pages
    Given I am on the homepage "/"
    When I scroll to the bottom of the page
    Then the footer should be visible
    And the footer should contain the OneBuddy logo

  Scenario: Footer brand section has CTA
    Given I am on the homepage "/"
    When I scroll to the footer
    Then the footer should have a "Add to Chrome — Free" button
    And the button should link to the Chrome Web Store

  Scenario: Footer Product column has correct links
    Given I am on the homepage "/"
    When I scroll to the footer
    Then the footer "Product" section should contain:
      | link             | href                |
      | All Features     | /features/          |
      | Blog             | /blog/              |
      | Knowledge Base   | /knowledge-base/    |

  Scenario: Footer Features column has correct links
    Given I am on the homepage "/"
    When I scroll to the footer
    Then the footer "Features" section should contain:
      | link               | href                            |
      | Pomodoro Timer     | /pomodoro-timer-extension/      |
      | Ad Blocker         | /ad-blocker-extension/          |
      | Privacy Blur       | /privacy-blur-extension/        |
      | Screen Recorder    | /screen-recorder-extension/     |
      | Clipboard Manager  | /clipboard-manager-extension/   |
      | Browser Lock       | /browser-lock-extension/        |

  Scenario: Footer Alternatives column has correct links
    Given I am on the homepage "/"
    When I scroll to the footer
    Then the footer "Alternatives" section should contain:
      | link                       | href                            |
      | uBlock Origin Alternative  | /alternative-to-ublock-origin/  |
      | Ghostery Alternative       | /alternative-to-ghostery/       |
      | Loom Alternative           | /alternative-to-loom/           |
      | Stretchly Alternative      | /alternative-to-stretchly/      |
      | Marinara Alternative       | /alternative-to-marina-pomodoro/|

  Scenario: Footer Use Cases column has correct links
    Given I am on the homepage "/"
    When I scroll to the footer
    Then the footer "Use Cases" section should contain at least 5 use case links

  Scenario: Footer Legal column has correct links
    Given I am on the homepage "/"
    When I scroll to the footer
    Then the footer should contain a "Privacy Policy" link to "/privacy/"
    And the footer should contain a "Terms of Service" link to "/terms/"

  Scenario: Footer displays copyright
    Given I am on the homepage "/"
    When I scroll to the footer
    Then I should see copyright text containing "OneBuddy"

  Scenario: Footer is hidden on onboarding page
    Given I am on the page "/onboarding/"
    Then the footer should not be visible

  Scenario: Footer is hidden on uninstall page
    Given I am on the page "/uninstall/"
    Then the footer should not be visible

  # ──────────────────────────────────────────────
  # FLOATING CTA
  # ──────────────────────────────────────────────
  Scenario: Floating CTA appears after scrolling
    Given I am on the homepage "/"
    When I scroll down 500 pixels
    Then the floating CTA should appear
    And the floating CTA should contain "Add to Chrome"
    And clicking the floating CTA should open the Chrome Web Store

  Scenario: Floating CTA is not visible at the top of the page
    Given I am on the homepage "/"
    Then the floating CTA should not be visible
