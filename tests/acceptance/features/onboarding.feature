@onboarding
Feature: Onboarding Page
  As a new user who just installed the OneBuddy extension
  I want to go through a guided onboarding flow
  So that I understand how to use OneBuddy and set my preferences

  Background:
    Given I am on the onboarding page "/onboarding/"

  # ──────────────────────────────────────────────
  # PAGE SETUP
  # ──────────────────────────────────────────────
  Scenario: Onboarding page loads correctly
    Then the page title should contain "Welcome to OneBuddy"
    And the page should have robots "noindex, nofollow"
    And the navbar should not be visible
    And the footer should not be visible
    And the background should be dark (#0a0815)

  Scenario: Progress bar is visible
    Then I should see a progress bar at the top
    And the progress bar should show step 1 of 6

  Scenario: Navigation dots are visible
    Then I should see 6 navigation dots at the bottom
    And the first dot should be active

  Scenario: Floating particles animation is running
    Then I should see floating particle elements
    And the particles should be animated

  # ──────────────────────────────────────────────
  # SLIDE 0: WELCOME
  # ──────────────────────────────────────────────
  Scenario: Welcome slide displays correctly
    Then I should see the OneBuddy logo with glow effect
    And I should see "Welcome to OneBuddy" heading
    And I should see the gradient text "OneBuddy"
    And I should see "Your all-in-one productivity" subtitle
    And I should see a "Get Started" button
    And I should see "Takes about 30 seconds" hint text

  Scenario: Get Started button advances to slide 1
    When I click the "Get Started" button
    Then slide 0 should exit with left animation
    And slide 1 should enter with right animation
    And the progress bar should update to step 2 of 6
    And the second navigation dot should be active

  # ──────────────────────────────────────────────
  # SLIDE 1: FEATURES OVERVIEW
  # ──────────────────────────────────────────────
  Scenario: Features slide displays all 6 features
    When I navigate to slide 1
    Then I should see the badge "What you get"
    And I should see the heading "Everything you need"
    And I should see 6 feature cards in a grid:
      | feature              |
      | Smart Reminders      |
      | Calendar Sync        |
      | Quick Notes          |
      | Privacy Shield       |
      | E2E Messaging        |
      | Clipboard Manager    |

  Scenario: Each feature card has icon, title, and description
    When I navigate to slide 1
    Then each feature card should have a colored icon
    And each feature card should have a title
    And each feature card should have a description

  Scenario: Features slide has navigation buttons
    When I navigate to slide 1
    Then I should see a "Back" button
    And I should see a "Next" button

  Scenario: Back button returns to welcome slide
    When I navigate to slide 1
    And I click the "Back" button
    Then I should be on slide 0

  Scenario: Next button advances to survey slide
    When I navigate to slide 1
    And I click the "Next" button
    Then I should be on slide 2

  # ──────────────────────────────────────────────
  # SLIDE 2: SURVEY QUIZ
  # ──────────────────────────────────────────────
  Scenario: Survey slide displays first sub-step
    When I navigate to slide 2
    Then I should see the badge "About You"
    And I should see "Who are you?" heading
    And I should see the sub-step progress "Step 1 of 3"
    And I should see a "Skip" button

  Scenario: Survey sub-step 1 shows role options
    When I navigate to slide 2
    Then I should see the following role options:
      | option          | icon |
      | Student         | 🎓   |
      | Business Owner  | 💼   |
      | Employee        | 🏢   |
      | Freelancer      | 💻   |
      | Other           | ✨   |

  Scenario: Selecting a role auto-advances to sub-step 2
    When I navigate to slide 2
    And I click the "Student" option
    Then the "Student" option should show selected state
    And after a brief delay I should see "Step 2 of 3"
    And I should see "What do you need reminders for?" heading

  Scenario: Survey sub-step 2 allows multi-selection
    When I navigate to slide 2
    And I select "Student" role
    Then I should see the following reminder options:
      | option            | icon |
      | Bills & Payments  | 💳   |
      | Meetings          | 📅   |
      | Task Deadlines    | ⏰   |
      | Personal Goals    | 🎯   |
      | Follow-ups        | 📬   |

  Scenario: Multiple reminder options can be selected
    When I navigate to slide 2
    And I select "Student" role
    And I click "Meetings"
    And I click "Task Deadlines"
    Then both "Meetings" and "Task Deadlines" should show selected state
    And both should show checkmark indicators

  Scenario: Deselecting a reminder option works
    When I navigate to slide 2
    And I select "Student" role
    And I click "Meetings"
    And I click "Meetings" again
    Then "Meetings" should not show selected state

  Scenario: Continue button advances to sub-step 3
    When I navigate to slide 2
    And I select "Student" role
    And I click "Meetings"
    And I click the "Continue" button
    Then I should see "Step 3 of 3"
    And I should see "How often do you want reminders?" heading

  Scenario: Survey sub-step 3 shows frequency options
    When I navigate to slide 2 sub-step 3
    Then I should see the badge "Frequency"
    And I should see the following frequency options as pills:
      | option                  | icon |
      | Daily                   | 📆   |
      | Weekly                  | 📋   |
      | Occasionally            | 🔔   |
      | Only important events   | ⭐   |

  Scenario: Selecting frequency completes survey and advances
    When I navigate to slide 2 sub-step 3
    And I click "Weekly"
    Then the survey should be completed
    And I should be advanced to slide 3

  Scenario: Skip button completes survey without responses
    When I navigate to slide 2
    And I click the "Skip" button
    Then I should be advanced to slide 3

  Scenario: Back/forward navigation within survey is not available from main nav
    When I navigate to slide 2
    Then I should not see the "Back" and "Next" navigation buttons

  # ──────────────────────────────────────────────
  # SLIDE 3: HOW TO USE
  # ──────────────────────────────────────────────
  Scenario: How to use slide displays 3 steps
    When I navigate to slide 3
    Then I should see the badge "How it works"
    And I should see "Get started in 3 simple steps" heading
    And I should see 3 step cards:
      | step | title                       |
      | 1    | Click the extension icon    |
      | 2    | Explore the dashboard       |
      | 3    | Stay on track               |

  Scenario: Each step has number, icon, title, and description
    When I navigate to slide 3
    Then each step should have a numbered circle
    And each step should have a visual icon
    And each step should have a title
    And each step should have a description

  Scenario: Steps are connected with arrow connectors
    When I navigate to slide 3
    Then I should see arrow connectors between the steps

  Scenario: How to use slide has Back and Next buttons
    When I navigate to slide 3
    Then I should see a "Back" button
    And I should see a "Next" button

  # ──────────────────────────────────────────────
  # SLIDE 4: PIN GUIDE
  # ──────────────────────────────────────────────
  Scenario: Pin guide slide displays correctly
    When I navigate to slide 4
    Then I should see the badge "Quick Setup"
    And I should see "Pin OneBuddy for quick access" heading
    And I should see a Chrome toolbar mockup

  Scenario: Chrome toolbar mockup shows browser elements
    When I navigate to slide 4
    Then I should see a tab bar with "New Tab"
    And I should see navigation buttons (back, forward, refresh)
    And I should see a URL bar showing "chrome://extensions"
    And I should see a puzzle icon in the extensions area

  Scenario: Pin guide animation cycles through 4 steps
    When I navigate to slide 4
    Then the pin animation should start automatically
    And I should see step indicators:
      | step | label                 |
      | 1    | Click the puzzle icon |
      | 2    | Find OneBuddy        |
      | 3    | Click the pin icon    |
      | 4    | All done!             |

  Scenario: Pin animation step 1 highlights puzzle icon
    When I navigate to slide 4
    Then the puzzle icon should be highlighted with glow effect
    And step 1 should be active
    And the extensions dropdown should be hidden

  Scenario: Pin animation step 2 shows dropdown with OneBuddy
    When I navigate to slide 4
    And I wait for the animation to reach step 2
    Then the extensions dropdown should be visible
    And the OneBuddy row should be highlighted
    And step 2 should be active

  Scenario: Pin animation step 3 highlights pin button
    When I navigate to slide 4
    And I wait for the animation to reach step 3
    Then the pin button next to OneBuddy should be highlighted with glow
    And step 3 should be active

  Scenario: Pin animation step 4 shows pinned state
    When I navigate to slide 4
    And I wait for the animation to reach step 4
    Then the OneBuddy icon should appear in the toolbar
    And the pin button should show pinned state
    And step 4 should be active

  Scenario: Pin animation loops continuously
    When I navigate to slide 4
    And I wait for the animation to complete all 4 steps
    Then the animation should restart from step 1

  Scenario: Pin animation stops when leaving slide
    When I navigate to slide 4
    And I click "Next" to go to slide 5
    Then the pin animation should stop

  # ──────────────────────────────────────────────
  # SLIDE 5: SUCCESS / READY
  # ──────────────────────────────────────────────
  Scenario: Success slide displays correctly
    When I navigate to slide 5
    Then I should see a success checkmark icon with animation
    And I should see "You're all set!" heading
    And I should see encouraging subtitle text
    And I should see an "Open OneBuddy" button
    And I should see a "Close this tab" button

  Scenario: Open OneBuddy button triggers sidebar
    When I navigate to slide 5
    And I click the "Open OneBuddy" button
    Then it should attempt to open the OneBuddy side panel
    And it should mark onboarding as complete in chrome storage

  Scenario: Close this tab button closes the page
    When I navigate to slide 5
    And I click the "Close this tab" button
    Then it should mark onboarding as complete
    And it should attempt to close the tab

  Scenario: Success slide shows social links
    When I navigate to slide 5
    Then I should see a "Website" link to "https://onebuddy.io/"
    And I should see a "Support" link to "https://onebuddy.io/knowledge-base/"

  Scenario: Success slide has no Back/Next navigation buttons
    When I navigate to slide 5
    Then I should not see the "Back" and "Next" navigation buttons

  # ──────────────────────────────────────────────
  # KEYBOARD NAVIGATION
  # ──────────────────────────────────────────────
  Scenario: Right arrow key advances slides
    Given I am on slide 0
    When I press the "ArrowRight" key
    Then I should be on slide 1

  Scenario: Enter key advances slides
    Given I am on slide 0
    When I press the "Enter" key
    Then I should be on slide 1

  Scenario: Left arrow key goes back
    Given I am on slide 1
    When I press the "ArrowLeft" key
    Then I should be on slide 0

  Scenario: Keyboard navigation does not work on survey slide
    Given I am on slide 2
    When I press the "ArrowRight" key
    Then I should remain on slide 2

  Scenario: Keyboard navigation does not go past last slide
    Given I am on slide 5
    When I press the "ArrowRight" key
    Then I should remain on slide 5

  # ──────────────────────────────────────────────
  # DOT NAVIGATION
  # ──────────────────────────────────────────────
  Scenario: Clicking a dot navigates to that slide
    When I click navigation dot 3
    Then I should be on slide 3
    And dot 3 should be active (wider/colored)

  Scenario: Active dot has distinct visual style
    When I navigate to slide 2
    Then dot 2 should have the active style (wider, gradient background)
    And other dots should have the inactive style (small, border-colored)

  # ──────────────────────────────────────────────
  # RESPONSIVE DESIGN
  # ──────────────────────────────────────────────
  Scenario: Features grid adapts on mobile
    Given the viewport width is 375 pixels
    When I navigate to slide 1
    Then the features grid should show 1 column
    And feature cards should use horizontal layout

  Scenario: Steps stack vertically on mobile
    Given the viewport width is 375 pixels
    When I navigate to slide 3
    Then the steps should stack vertically
    And the arrow connectors should rotate 90 degrees

  Scenario: Survey options stack on mobile
    Given the viewport width is 375 pixels
    When I navigate to slide 2
    Then the survey options should stack vertically
    And each option should take full width

  Scenario: Pin guide mockup fits mobile
    Given the viewport width is 375 pixels
    When I navigate to slide 4
    Then the Chrome toolbar mockup should fit within the viewport
