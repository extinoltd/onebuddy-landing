@use-case-pages
Feature: Use Case & Industry Pages
  As a visitor from a specific profession or use case
  I want to see how OneBuddy fits my workflow
  So that I can understand its value for my situation

  # ──────────────────────────────────────────────
  # USE CASE PAGES
  # ──────────────────────────────────────────────
  Scenario Outline: Use case page loads with correct metadata
    Given I am on the use case page "<slug>"
    Then the page title should contain "<audience>"
    And the page should have a meta description mentioning "<audience>"
    And the canonical URL should be "https://onebuddy.io/<slug>/"

    Examples:
      | slug                       | audience           |
      | for-remote-workers         | Remote Workers     |
      | for-students               | Students           |
      | for-developers             | Developers         |
      | for-content-creators       | Content Creators   |
      | for-freelancers            | Freelancers        |
      | for-privacy-focused-users  | Privacy            |
      | for-knowledge-workers      | Knowledge Workers  |

  Scenario Outline: Use case page has hero section
    Given I am on the use case page "<slug>"
    Then I should see an H1 heading targeting "<audience>"
    And I should see a subtitle describing the use case

    Examples:
      | slug                   | audience          |
      | for-remote-workers     | Remote Workers    |
      | for-students           | Students          |
      | for-developers         | Developers        |

  Scenario Outline: Use case page shows pain points
    Given I am on the use case page "<slug>"
    When I scroll to the pain points section
    Then I should see at least 3 problem/solution pairs
    And each pain point should describe a real challenge for "<audience>"

    Examples:
      | slug                   | audience          |
      | for-remote-workers     | Remote Workers    |
      | for-students           | Students          |
      | for-developers         | Developers        |
      | for-freelancers        | Freelancers       |

  Scenario Outline: Use case page maps features to benefits
    Given I am on the use case page "<slug>"
    When I scroll to the features section
    Then I should see feature cards with icons
    And each feature card should explain benefits for the target audience

    Examples:
      | slug                       |
      | for-remote-workers         |
      | for-students               |
      | for-content-creators       |
      | for-privacy-focused-users  |

  Scenario Outline: Use case page has CTA
    Given I am on the use case page "<slug>"
    Then I should see a "Add to Chrome — Free" CTA button

    Examples:
      | slug                       |
      | for-remote-workers         |
      | for-students               |
      | for-developers             |
      | for-content-creators       |
      | for-freelancers            |
      | for-privacy-focused-users  |
      | for-knowledge-workers      |

  # ──────────────────────────────────────────────
  # INDUSTRY PAGES
  # ──────────────────────────────────────────────
  Scenario Outline: Industry page loads with correct metadata
    Given I am on the industry page "<slug>"
    Then the page title should contain "<profession>"
    And the page should have a meta description mentioning "<profession>"
    And the canonical URL should be "https://onebuddy.io/<slug>/"

    Examples:
      | slug                                    | profession   |
      | best-chrome-extension-for-lawyers       | Lawyers      |
      | best-chrome-extension-for-designers     | Designers    |
      | best-chrome-extension-for-marketers     | Marketers    |
      | best-chrome-extension-for-accountants   | Accountants  |

  Scenario Outline: Industry page has industry-specific content
    Given I am on the industry page "<slug>"
    Then I should see an H1 heading targeting "<profession>"
    And I should see feature recommendations specific to "<profession>"
    And I should see pain points relevant to "<profession>"

    Examples:
      | slug                                    | profession   |
      | best-chrome-extension-for-lawyers       | Lawyers      |
      | best-chrome-extension-for-designers     | Designers    |
      | best-chrome-extension-for-marketers     | Marketers    |
      | best-chrome-extension-for-accountants   | Accountants  |

  Scenario Outline: Industry page has CTA
    Given I am on the industry page "<slug>"
    Then I should see a "Add to Chrome — Free" CTA button
    And the CTA should link to the Chrome Web Store

    Examples:
      | slug                                    |
      | best-chrome-extension-for-lawyers       |
      | best-chrome-extension-for-designers     |
      | best-chrome-extension-for-marketers     |
      | best-chrome-extension-for-accountants   |

  # ──────────────────────────────────────────────
  # CROSS-LINKING
  # ──────────────────────────────────────────────
  Scenario Outline: Use case page has related links
    Given I am on the use case page "<slug>"
    When I scroll to the related links section
    Then I should see links to feature pages or other use cases

    Examples:
      | slug                   |
      | for-remote-workers     |
      | for-students           |
      | for-developers         |
