@external-links
Feature: External Links & CTAs
  As a visitor
  I want all external links to work correctly
  So that I can install the extension and access related resources

  # ──────────────────────────────────────────────
  # CHROME WEB STORE LINKS
  # ──────────────────────────────────────────────
  Scenario Outline: "Add to Chrome" CTA links to Chrome Web Store on every page
    Given I am on the page "<path>"
    Then I should find at least one "Add to Chrome" link
    And it should point to "https://chromewebstore.google.com/detail/kcclkkcbbfgcpknpnanhbpiffidjifgm"
    And it should open in a new tab (target="_blank")
    And it should have rel="noopener noreferrer"

    Examples:
      | path                                  |
      | /                                     |
      | /features/                            |
      | /pomodoro-timer-extension/            |
      | /health-reminder-extension/           |
      | /clipboard-manager-extension/         |
      | /ad-blocker-extension/                |
      | /screen-recorder-extension/           |
      | /onebuddy-vs-ublock/                  |
      | /onebuddy-vs-loom/                    |
      | /onebuddy-vs-forest/                  |
      | /alternative-to-ublock-origin/        |
      | /alternative-to-ghostery/             |
      | /alternative-to-loom/                 |
      | /for-remote-workers/                  |
      | /for-students/                        |
      | /for-developers/                      |
      | /best-chrome-extension-for-lawyers/   |
      | /blog/best-chrome-extensions-productivity-2026/ |

  # ──────────────────────────────────────────────
  # UNINSTALL PAGE LINKS
  # ──────────────────────────────────────────────
  Scenario: Uninstall page reinstall link
    Given I am on the page "/uninstall/"
    When I submit the feedback form
    Then the "Reinstall OneBuddy" link should point to the Chrome Web Store
    And it should open in a new tab

  Scenario: Uninstall page website link
    Given I am on the page "/uninstall/"
    When I submit the feedback form
    Then the "Visit our website" link should point to "https://onebuddy.io/"

  # ──────────────────────────────────────────────
  # ONBOARDING PAGE LINKS
  # ──────────────────────────────────────────────
  Scenario: Onboarding success slide links
    Given I am on the page "/onboarding/"
    When I navigate to the final slide
    Then the "Website" link should point to "https://onebuddy.io/"
    And the "Support" link should point to "https://onebuddy.io/knowledge-base/"

  # ──────────────────────────────────────────────
  # FOOTER EXTERNAL LINKS
  # ──────────────────────────────────────────────
  Scenario: Footer CTA links to Chrome Web Store
    Given I am on the homepage "/"
    When I scroll to the footer
    Then the footer "Add to Chrome — Free" button should link to the Chrome Web Store
    And it should open in a new tab

  # ──────────────────────────────────────────────
  # LINK INTEGRITY
  # ──────────────────────────────────────────────
  Scenario: No broken external links on the homepage
    Given I am on the homepage "/"
    Then all external links should return HTTP 200 or 301

  Scenario: Chrome Web Store link is valid
    When I check "https://chromewebstore.google.com/detail/kcclkkcbbfgcpknpnanhbpiffidjifgm"
    Then the URL should be accessible (HTTP 200 or 301)
