@knowledge-base
Feature: Knowledge Base Hub & Articles
  As a user or potential user
  I want to browse help articles and guides
  So that I can learn how to use OneBuddy or troubleshoot issues

  # ──────────────────────────────────────────────
  # KNOWLEDGE BASE HUB
  # ──────────────────────────────────────────────
  Scenario: Knowledge base hub loads with correct metadata
    Given I am on the knowledge base page "/knowledge-base/"
    Then the page title should contain "Knowledge Base"
    And the page should have a meta description

  Scenario: Knowledge base hub displays all 5 categories
    Given I am on the knowledge base page "/knowledge-base/"
    Then I should see the following KB categories:
      | category            |
      | Getting Started     |
      | Feature Guides      |
      | Troubleshooting     |
      | Privacy & Security  |
      | FAQ                 |

  Scenario: Each category has a colored icon
    Given I am on the knowledge base page "/knowledge-base/"
    Then each category should have a visual icon
    And each category should have a label

  Scenario: Knowledge base hub displays article cards
    Given I am on the knowledge base page "/knowledge-base/"
    Then I should see at least 19 article cards
    And each article card should have a title
    And each article card should be clickable

  Scenario: Article cards have hover effect
    Given I am on the knowledge base page "/knowledge-base/"
    When I hover over an article card
    Then the card should show a hover state with arrow icon

  Scenario Outline: KB article card links to correct page
    Given I am on the knowledge base page "/knowledge-base/"
    When I click on the article "<articleTitle>"
    Then I should be navigated to "/knowledge-base/<slug>/"

    Examples:
      | articleTitle                      | slug                            |
      | How to Install OneBuddy          | how-to-install-onebuddy         |
      | How to Set Health Reminder       | how-to-set-health-reminder      |
      | Extension Not Opening            | extension-not-opening           |
      | What Data is Stored              | what-data-is-stored             |
      | Is OneBuddy Free                 | is-onebuddy-free                |

  # ──────────────────────────────────────────────
  # GETTING STARTED ARTICLES
  # ──────────────────────────────────────────────
  Scenario Outline: Getting started article loads correctly
    Given I am on the KB article "/knowledge-base/<slug>/"
    Then the page title should contain "<keyword>"
    And the page should have a meta description
    And the canonical URL should be "https://onebuddy.io/knowledge-base/<slug>/"

    Examples:
      | slug                          | keyword           |
      | how-to-install-onebuddy       | Install           |
      | how-to-set-health-reminder    | Health Reminder   |
      | how-to-enable-pomodoro-timer  | Pomodoro          |
      | how-to-use-privacy-blur       | Privacy Blur      |

  # ──────────────────────────────────────────────
  # FEATURE GUIDE ARTICLES
  # ──────────────────────────────────────────────
  Scenario Outline: Feature guide article loads correctly
    Given I am on the KB article "/knowledge-base/<slug>/"
    Then the page title should contain "<keyword>"
    And the article body should have at least 2 content sections

    Examples:
      | slug                              | keyword           |
      | how-clipboard-history-works       | Clipboard         |
      | how-encrypted-messaging-works     | Encrypted         |
      | how-browser-lock-works            | Browser Lock      |
      | how-ad-blocker-settings-work      | Ad Blocker        |

  # ──────────────────────────────────────────────
  # TROUBLESHOOTING ARTICLES
  # ──────────────────────────────────────────────
  Scenario Outline: Troubleshooting article loads correctly
    Given I am on the KB article "/knowledge-base/<slug>/"
    Then the page title should contain "<keyword>"
    And the article should provide troubleshooting steps

    Examples:
      | slug                          | keyword             |
      | extension-not-opening         | Not Opening         |
      | reminders-not-showing         | Reminders           |
      | permissions-explanation       | Permissions         |
      | storage-data-questions        | Storage             |

  # ──────────────────────────────────────────────
  # PRIVACY & SECURITY ARTICLES
  # ──────────────────────────────────────────────
  Scenario Outline: Privacy article loads correctly
    Given I am on the KB article "/knowledge-base/<slug>/"
    Then the page title should contain "<keyword>"
    And the article should address privacy or security concerns

    Examples:
      | slug                          | keyword             |
      | what-data-is-stored           | Data                |
      | does-onebuddy-track-users     | Track               |
      | how-encryption-works          | Encryption          |

  # ──────────────────────────────────────────────
  # FAQ ARTICLES
  # ──────────────────────────────────────────────
  Scenario Outline: FAQ article loads correctly
    Given I am on the KB article "/knowledge-base/<slug>/"
    Then the page title should contain "<keyword>"
    And the article should answer the question clearly

    Examples:
      | slug                                         | keyword             |
      | is-onebuddy-free                             | Free                |
      | does-onebuddy-work-offline                   | Offline             |
      | does-onebuddy-slow-chrome                    | Slow                |
      | is-onebuddy-better-than-multiple-extensions  | Multiple Extensions |

  # ──────────────────────────────────────────────
  # ARTICLE PAGE STRUCTURE
  # ──────────────────────────────────────────────
  Scenario Outline: KB article has standard page structure
    Given I am on the KB article "/knowledge-base/<slug>/"
    Then I should see the article title as H1
    And I should see multi-section article content
    And I should see a "Add to Chrome — Free" CTA button

    Examples:
      | slug                          |
      | how-to-install-onebuddy       |
      | extension-not-opening         |
      | is-onebuddy-free              |

  Scenario Outline: KB article shows related articles
    Given I am on the KB article "/knowledge-base/<slug>/"
    When I scroll to the related articles section
    Then I should see at least 2 related KB article links
    And clicking a related article should navigate to a valid KB page

    Examples:
      | slug                          |
      | how-to-install-onebuddy       |
      | how-clipboard-history-works   |
      | does-onebuddy-track-users     |

  Scenario: KB article has breadcrumbs
    Given I am on the KB article "/knowledge-base/how-to-install-onebuddy/"
    Then I should see breadcrumbs
    And the breadcrumb "Knowledge Base" should link to "/knowledge-base/"
    And the breadcrumb "Home" should link to "/"
