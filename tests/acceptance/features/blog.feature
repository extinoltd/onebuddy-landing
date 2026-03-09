@blog
Feature: Blog Hub & Blog Posts
  As a visitor interested in productivity and privacy topics
  I want to browse and read blog articles
  So that I can learn and discover OneBuddy's value

  # ──────────────────────────────────────────────
  # BLOG HUB PAGE
  # ──────────────────────────────────────────────
  Background:
    Given I am on the blog page "/blog/"

  Scenario: Blog hub loads with correct metadata
    Then the page title should contain "Blog"
    And the page should have a meta description

  Scenario: Blog hub displays category filter pills
    Then I should see the following category pills:
      | category              |
      | Productivity Tips     |
      | Privacy & Security    |
      | Remote Work           |
      | Student Focus         |
      | Extension Comparisons |

  Scenario: Blog hub displays all blog post cards
    Then I should see at least 10 blog post cards
    And each card should display:
      | element       |
      | title         |
      | excerpt       |
      | date          |
      | read time     |
      | category badge|

  Scenario Outline: Blog post card links to correct article
    When I click on the blog post titled "<title>"
    Then I should be navigated to "/blog/<slug>/"

    Examples:
      | title                                          | slug                                      |
      | Best Chrome Extensions for Productivity        | best-chrome-extensions-productivity-2026   |
      | How to Block YouTube Ads                       | how-to-block-youtube-ads-2026              |
      | Pomodoro Technique Beginner's Guide             | pomodoro-technique-beginners-guide         |
      | Remote Work Browser Setup                       | remote-work-browser-setup-guide            |

  # ──────────────────────────────────────────────
  # INDIVIDUAL BLOG POSTS
  # ──────────────────────────────────────────────
  Scenario Outline: Blog post loads with correct SEO metadata
    Given I am on the blog post "/blog/<slug>/"
    Then the page title should contain "<keyword>"
    And the page should have a meta description
    And the canonical URL should be "https://onebuddy.io/blog/<slug>/"
    And the page should have OpenGraph meta tags

    Examples:
      | slug                                      | keyword            |
      | best-chrome-extensions-productivity-2026  | Productivity       |
      | how-to-block-youtube-ads-2026             | YouTube Ads        |
      | pomodoro-technique-beginners-guide        | Pomodoro           |
      | remote-work-browser-setup-guide           | Remote Work        |
      | best-study-tools-chrome-students          | Study              |
      | online-privacy-guide-chrome-2026          | Privacy            |
      | why-too-many-chrome-extensions-bad        | Extensions         |
      | screen-recording-without-loom             | Screen Recording   |
      | clipboard-manager-why-you-need-one        | Clipboard          |
      | ublock-origin-vs-alternatives-2026        | uBlock             |

  Scenario Outline: Blog post displays article content
    Given I am on the blog post "/blog/<slug>/"
    Then I should see the article title as H1
    And I should see the publication date
    And I should see the read time
    And the article body should have at least 3 content sections
    And the article should be at least 300 words

    Examples:
      | slug                                      |
      | best-chrome-extensions-productivity-2026  |
      | pomodoro-technique-beginners-guide        |
      | online-privacy-guide-chrome-2026          |

  Scenario Outline: Blog post has CTA
    Given I am on the blog post "/blog/<slug>/"
    Then I should see a "Add to Chrome — Free" CTA button

    Examples:
      | slug                                      |
      | best-chrome-extensions-productivity-2026  |
      | how-to-block-youtube-ads-2026             |
      | pomodoro-technique-beginners-guide        |

  Scenario Outline: Blog post shows related articles
    Given I am on the blog post "/blog/<slug>/"
    When I scroll to the related articles section
    Then I should see at least 2 related blog post links

    Examples:
      | slug                                      |
      | best-chrome-extensions-productivity-2026  |
      | pomodoro-technique-beginners-guide        |
      | clipboard-manager-why-you-need-one        |

  Scenario: Blog post has breadcrumbs
    Given I am on the blog post "/blog/pomodoro-technique-beginners-guide/"
    Then I should see breadcrumbs showing "Home > Blog > Pomodoro"
    And clicking "Blog" in breadcrumbs should navigate to "/blog/"
    And clicking "Home" in breadcrumbs should navigate to "/"

  Scenario Outline: Blog post has internal links to features
    Given I am on the blog post "/blog/<slug>/"
    Then the article content should contain at least one internal link
    And internal links should point to valid OneBuddy pages

    Examples:
      | slug                                      |
      | best-chrome-extensions-productivity-2026  |
      | how-to-block-youtube-ads-2026             |
      | screen-recording-without-loom             |
