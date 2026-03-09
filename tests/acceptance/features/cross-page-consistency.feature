@cross-page
Feature: Cross-Page Consistency & User Journeys
  As a visitor navigating the entire site
  I want consistent design and working user journeys
  So that I have a seamless experience

  # ──────────────────────────────────────────────
  # USER JOURNEY: DISCOVERY TO INSTALL
  # ──────────────────────────────────────────────
  Scenario: Visitor discovers features and installs
    Given I am on the homepage "/"
    When I click "Features" in the navbar
    Then I should be on "/features/"
    When I click the "Pomodoro Timer" feature card
    Then I should be on "/pomodoro-timer-extension/"
    When I click the "Add to Chrome — Free" CTA
    Then a new tab should open to the Chrome Web Store

  Scenario: Visitor reads blog then installs
    Given I am on the homepage "/"
    When I click "Blog" in the navbar
    Then I should be on "/blog/"
    When I click on the first blog post
    Then I should be on a blog post page
    And I should see a "Add to Chrome — Free" CTA
    When I click the CTA
    Then a new tab should open to the Chrome Web Store

  Scenario: Visitor compares then installs
    Given I am on the page "/onebuddy-vs-ublock/"
    When I read the comparison and scroll to the CTA
    And I click "Add to Chrome — Free"
    Then a new tab should open to the Chrome Web Store

  Scenario: Visitor uses KB for help then installs
    Given I am on the page "/knowledge-base/"
    When I click on "How to Install OneBuddy"
    Then I should be on "/knowledge-base/how-to-install-onebuddy/"
    And I should see installation instructions
    And I should see a "Add to Chrome — Free" CTA

  # ──────────────────────────────────────────────
  # USER JOURNEY: USE CASE PAGES
  # ──────────────────────────────────────────────
  Scenario: Student finds relevant page and installs
    Given I am on the homepage "/"
    When I scroll to the internal links section
    And I click "For Students"
    Then I should be on "/for-students/"
    And the content should be targeted at students
    And I should see a CTA to install

  Scenario: Lawyer finds industry page from search
    Given I land directly on "/best-chrome-extension-for-lawyers/"
    Then the page should load correctly
    And the content should target lawyers
    And I should see relevant features for legal professionals
    And I should see a CTA to install

  # ──────────────────────────────────────────────
  # USER JOURNEY: ALTERNATIVE SEEKER
  # ──────────────────────────────────────────────
  Scenario: User looking for uBlock Origin alternative
    Given I land directly on "/alternative-to-ublock-origin/"
    Then I should see content about uBlock Origin
    And I should see why OneBuddy is a better choice
    When I want more detail
    And I click a link to "/onebuddy-vs-ublock/"
    Then I should see a detailed feature comparison table

  # ──────────────────────────────────────────────
  # USER JOURNEY: NEW INSTALL → ONBOARDING
  # ──────────────────────────────────────────────
  Scenario: New user goes through onboarding
    Given I am on the page "/onboarding/"
    When I click "Get Started"
    And I view the features on slide 1
    And I click "Next"
    And I select "Student" in the survey
    And I select "Task Deadlines" use case
    And I click "Continue"
    And I select "Daily" frequency
    Then I should be on the "How it works" slide
    When I click "Next"
    Then I should see the pin guide animation
    When I click "Next"
    Then I should see "You're all set!"

  # ──────────────────────────────────────────────
  # USER JOURNEY: UNINSTALL FEEDBACK
  # ──────────────────────────────────────────────
  Scenario: User provides uninstall feedback
    Given I am on the page "/uninstall/"
    When I select "Slowed down my browser" reason
    And I select "Bugs or errors" reason
    And I type "The extension crashed twice" in the comment
    And I click "Submit Feedback"
    Then I should see the thank you message
    And I should see a reinstall option

  Scenario: User skips uninstall feedback
    Given I am on the page "/uninstall/"
    When I click "No thanks"
    Then I should see the thank you message

  # ──────────────────────────────────────────────
  # DESIGN CONSISTENCY
  # ──────────────────────────────────────────────
  Scenario Outline: All standard pages have consistent layout
    Given I am on the page "<path>"
    Then the page should have a navbar at the top
    And the page should have a footer at the bottom
    And the page should have proper spacing and padding
    And the font family should be consistent

    Examples:
      | path                              |
      | /                                 |
      | /features/                        |
      | /blog/                            |
      | /knowledge-base/                  |
      | /pomodoro-timer-extension/        |
      | /onebuddy-vs-ublock/             |
      | /for-remote-workers/             |
      | /alternative-to-ublock-origin/   |

  Scenario Outline: CTA buttons have consistent styling
    Given I am on the page "<path>"
    Then the primary CTA button should have gradient background
    And the primary CTA button should have white text
    And the primary CTA button should have rounded corners

    Examples:
      | path                              |
      | /                                 |
      | /features/                        |
      | /pomodoro-timer-extension/        |
      | /onebuddy-vs-ublock/             |

  Scenario: Dark themed pages have consistent styling
    Given I am on the page "/onboarding/"
    Then the background should be "#0a0815"
    And text should be light colored for readability
    Given I am on the page "/uninstall/"
    Then the background should be "#0a0815"
    And text should be light colored for readability

  # ──────────────────────────────────────────────
  # BREADCRUMB CONSISTENCY
  # ──────────────────────────────────────────────
  Scenario Outline: Pages with breadcrumbs show correct path
    Given I am on the page "<path>"
    Then breadcrumbs should be visible
    And the first breadcrumb should be "Home" linking to "/"
    And the breadcrumb trail should reflect the page hierarchy

    Examples:
      | path                              |
      | /features/                        |
      | /pomodoro-timer-extension/        |
      | /blog/                            |
      | /knowledge-base/                  |

  # ──────────────────────────────────────────────
  # ERROR HANDLING
  # ──────────────────────────────────────────────
  Scenario: 404 page displays for non-existent routes
    Given I navigate to "/this-page-does-not-exist/"
    Then I should see a 404 error page or be redirected
    And the page should have navigation back to the homepage
