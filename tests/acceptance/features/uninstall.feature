@uninstall
Feature: Uninstall Feedback Page
  As a user who just uninstalled OneBuddy
  I want to share why I left
  So that the team can improve the extension

  Background:
    Given I am on the uninstall page "/uninstall/"

  # ──────────────────────────────────────────────
  # PAGE SETUP
  # ──────────────────────────────────────────────
  Scenario: Uninstall page loads correctly
    Then the page title should contain "Sorry to See You Go"
    And the page should have robots "noindex, nofollow"
    And the navbar should not be visible
    And the footer should not be visible
    And the background should be dark (#0a0815)

  Scenario: Floating particles are displayed
    Then I should see floating particle elements
    And the particles should be animated

  # ──────────────────────────────────────────────
  # FEEDBACK FORM - INITIAL STATE
  # ──────────────────────────────────────────────
  Scenario: Sad emoji icon is displayed
    Then I should see a sad face icon with gradient

  Scenario: Header text is displayed
    Then I should see "We're sorry to see you go" heading
    And I should see "Your feedback helps us improve" description

  Scenario: Feedback form shows question heading
    Then I should see "Why did you uninstall OneBuddy?" heading
    And I should see "Select all that apply" instruction

  Scenario: All 8 reason buttons are displayed
    Then I should see the following reason options:
      | reason                     |
      | Not useful for me          |
      | Too many notifications     |
      | Slowed down my browser     |
      | Found a better alternative |
      | Too confusing to use       |
      | Bugs or errors             |
      | Privacy concerns           |
      | Just temporary             |

  Scenario: Each reason button has icon and description
    Then each reason button should have an icon
    And each reason button should have a label
    And each reason button should have a short description

  Scenario: No reasons are selected by default
    Then no reason buttons should be in selected state

  Scenario: Comment textarea is displayed
    Then I should see "Anything else you'd like to share?" label
    And I should see a textarea with placeholder "Tell us how we can improve..."

  Scenario: Submit and skip buttons are displayed
    Then I should see a "Submit Feedback" button with gradient style
    And I should see a "No thanks" button with ghost style

  # ──────────────────────────────────────────────
  # REASON SELECTION
  # ──────────────────────────────────────────────
  Scenario: Clicking a reason selects it
    When I click the "Not useful for me" reason button
    Then the "Not useful for me" button should show selected state
    And it should have a red border
    And it should show a checkmark indicator

  Scenario: Multiple reasons can be selected
    When I click the "Bugs or errors" reason button
    And I click the "Slowed down my browser" reason button
    Then both "Bugs or errors" and "Slowed down my browser" should be selected

  Scenario: Clicking a selected reason deselects it
    When I click the "Privacy concerns" reason button
    And I click the "Privacy concerns" reason button again
    Then the "Privacy concerns" button should not be in selected state

  Scenario: Mixing selection and deselection
    When I click "Not useful for me"
    And I click "Too confusing to use"
    And I click "Not useful for me" again
    Then only "Too confusing to use" should be selected

  # ──────────────────────────────────────────────
  # COMMENT TEXTAREA
  # ──────────────────────────────────────────────
  Scenario: User can type in the comment field
    When I type "The extension was great but I switched to Firefox" in the textarea
    Then the textarea should contain "The extension was great but I switched to Firefox"

  Scenario: Textarea is resizable
    Then the textarea should have resize capability set to "vertical"

  # ──────────────────────────────────────────────
  # SUBMIT FEEDBACK
  # ──────────────────────────────────────────────
  Scenario: Submit with reasons and comment
    When I click the "Performance" reason button
    And I click the "Bugs or errors" reason button
    And I type "Some pages were loading slowly" in the textarea
    And I click the "Submit Feedback" button
    Then the feedback should be sent via sendBeacon
    And the page should transition to the success state
    And the page should scroll to the top

  Scenario: Submit with only reasons (no comment)
    When I click the "Just temporary" reason button
    And I click the "Submit Feedback" button
    Then the success state should be displayed

  Scenario: Submit with no selections (empty feedback)
    When I click the "Submit Feedback" button
    Then the feedback should still be submitted
    And the success state should be displayed

  # ──────────────────────────────────────────────
  # SKIP FEEDBACK
  # ──────────────────────────────────────────────
  Scenario: Skip button shows success state
    When I click the "No thanks" button
    Then the success state should be displayed
    And the page should scroll to the top

  # ──────────────────────────────────────────────
  # SUCCESS STATE
  # ──────────────────────────────────────────────
  Scenario: Success state displays correctly
    When I click the "Submit Feedback" button
    Then I should see a green checkmark icon
    And I should see "Thank you for your feedback!" heading
    And I should see appreciation message
    And I should see a "Reinstall OneBuddy" button
    And I should see a "Visit our website" link

  Scenario: Reinstall button links to Chrome Web Store
    When I click the "Submit Feedback" button
    Then the "Reinstall OneBuddy" button should link to the Chrome Web Store
    And it should open in a new tab

  Scenario: Visit website link goes to homepage
    When I click the "Submit Feedback" button
    Then the "Visit our website" link should point to "https://onebuddy.io/"

  Scenario: Success state shows footer links
    When I click the "Submit Feedback" button
    Then I should see a mini footer with:
      | link        | href                              |
      | Website     | https://onebuddy.io/              |
      | Support     | https://onebuddy.io/knowledge-base/ |

  # ──────────────────────────────────────────────
  # RESPONSIVE DESIGN
  # ──────────────────────────────────────────────
  Scenario: Feedback form adapts to mobile
    Given the viewport width is 375 pixels
    Then the reason buttons should display in a single column
    And the content should be centered with padding

  Scenario: Success state is readable on mobile
    Given the viewport width is 375 pixels
    When I click the "Submit Feedback" button
    Then all success content should be visible
    And buttons should stack vertically on small screens
