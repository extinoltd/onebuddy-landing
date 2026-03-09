@accessibility
Feature: Accessibility (a11y)
  As a visitor using assistive technology
  I want the website to be accessible
  So that I can navigate and understand all content

  # ──────────────────────────────────────────────
  # LANDMARKS & STRUCTURE
  # ──────────────────────────────────────────────
  Scenario Outline: Pages have proper landmark structure
    Given I am on the page "<path>"
    Then the page should have a <nav> landmark
    And the page should have a <main> landmark
    And the page should have a <footer> landmark

    Examples:
      | path                          |
      | /                             |
      | /features/                    |
      | /blog/                        |
      | /pomodoro-timer-extension/    |

  Scenario: Onboarding page has no nav/footer landmarks
    Given I am on the page "/onboarding/"
    Then the page should not have a visible <nav> landmark
    And the page should not have a visible <footer> landmark

  # ──────────────────────────────────────────────
  # IMAGES & ALT TEXT
  # ──────────────────────────────────────────────
  Scenario Outline: All images have alt attributes
    Given I am on the page "<path>"
    Then every <img> element should have an alt attribute
    And decorative images should have alt=""

    Examples:
      | path                          |
      | /                             |
      | /features/                    |
      | /blog/                        |
      | /onboarding/                  |

  # ──────────────────────────────────────────────
  # KEYBOARD NAVIGATION
  # ──────────────────────────────────────────────
  Scenario: Tab navigation works on homepage
    Given I am on the homepage "/"
    When I press the Tab key multiple times
    Then focus should move through interactive elements in logical order
    And each focused element should have a visible focus indicator

  Scenario: Skip to content link is available
    Given I am on the homepage "/"
    When I press the Tab key once
    Then a "Skip to content" link should appear or focus should reach main content

  Scenario: All buttons are keyboard accessible
    Given I am on the homepage "/"
    Then all buttons should be focusable via Tab key
    And all buttons should be activatable via Enter or Space key

  Scenario: FAQ accordion is keyboard accessible
    Given I am on the homepage "/"
    When I Tab to a FAQ question
    And I press Enter
    Then the FAQ answer should expand
    When I press Enter again
    Then the FAQ answer should collapse

  Scenario: Onboarding keyboard navigation
    Given I am on the page "/onboarding/"
    When I press the ArrowRight key
    Then the next slide should be displayed
    When I press the ArrowLeft key
    Then the previous slide should be displayed

  # ──────────────────────────────────────────────
  # COLOR CONTRAST
  # ──────────────────────────────────────────────
  Scenario Outline: Text has sufficient contrast ratio
    Given I am on the page "<path>"
    Then body text should meet WCAG AA contrast ratio (4.5:1)
    And heading text should meet WCAG AA contrast ratio (3:1)

    Examples:
      | path                          |
      | /                             |
      | /features/                    |
      | /pomodoro-timer-extension/    |
      | /onboarding/                  |
      | /uninstall/                   |

  # ──────────────────────────────────────────────
  # LINKS
  # ──────────────────────────────────────────────
  Scenario: External links have appropriate attributes
    Given I am on the homepage "/"
    Then all links opening in new tabs should have rel="noopener noreferrer"
    And all external links should have target="_blank"

  Scenario Outline: Links have descriptive text
    Given I am on the page "<path>"
    Then there should be no links with text "click here" or "read more" without context

    Examples:
      | path                          |
      | /                             |
      | /features/                    |
      | /blog/                        |

  # ──────────────────────────────────────────────
  # FORMS
  # ──────────────────────────────────────────────
  Scenario: Uninstall feedback form is accessible
    Given I am on the page "/uninstall/"
    Then the textarea should have a label element
    And reason buttons should be focusable and activatable via keyboard
    And the submit button should be keyboard accessible

  Scenario: Onboarding survey is accessible
    Given I am on the page "/onboarding/"
    When I navigate to slide 2
    Then survey option buttons should be focusable
    And selected options should convey state to screen readers

  # ──────────────────────────────────────────────
  # ANIMATIONS & MOTION
  # ──────────────────────────────────────────────
  Scenario: Animations respect prefers-reduced-motion
    Given the user has "prefers-reduced-motion: reduce" enabled
    And I am on the homepage "/"
    Then animations should be reduced or disabled
    And the page should still be fully functional

  Scenario: Onboarding particles respect motion preferences
    Given the user has "prefers-reduced-motion: reduce" enabled
    And I am on the page "/onboarding/"
    Then particle animations should be disabled or static
