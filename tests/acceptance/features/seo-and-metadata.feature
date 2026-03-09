@seo
Feature: SEO, Metadata & Structured Data
  As a search engine crawler
  I want to find correct metadata and structured data on all pages
  So that the site ranks well and displays rich results

  # ──────────────────────────────────────────────
  # META TAGS - ALL PUBLIC PAGES
  # ──────────────────────────────────────────────
  Scenario Outline: Every public page has required meta tags
    Given I am on the page "<path>"
    Then the page should have a non-empty <title> tag
    And the page should have a meta description
    And the meta description should be between 50 and 160 characters
    And the page should have a canonical URL tag
    And the canonical URL should match "https://onebuddy.io<path>"

    Examples:
      | path                                    |
      | /                                       |
      | /features/                              |
      | /blog/                                  |
      | /knowledge-base/                        |
      | /pomodoro-timer-extension/              |
      | /health-reminder-extension/             |
      | /clipboard-manager-extension/           |
      | /ad-blocker-extension/                  |
      | /screen-recorder-extension/             |
      | /encrypted-messaging-extension/         |
      | /onebuddy-vs-ublock/                    |
      | /onebuddy-vs-loom/                      |
      | /onebuddy-vs-forest/                    |
      | /alternative-to-ublock-origin/          |
      | /alternative-to-ghostery/               |
      | /alternative-to-loom/                   |
      | /for-remote-workers/                    |
      | /for-students/                          |
      | /for-developers/                        |
      | /best-chrome-extension-for-lawyers/     |
      | /best-chrome-extension-for-designers/   |

  # ──────────────────────────────────────────────
  # OPENGRAPH TAGS
  # ──────────────────────────────────────────────
  Scenario Outline: Public pages have OpenGraph meta tags
    Given I am on the page "<path>"
    Then the page should have an og:title meta tag
    And the page should have an og:description meta tag

    Examples:
      | path                                |
      | /                                   |
      | /features/                          |
      | /pomodoro-timer-extension/          |
      | /onebuddy-vs-ublock/               |
      | /for-remote-workers/               |
      | /blog/pomodoro-technique-beginners-guide/ |

  # ──────────────────────────────────────────────
  # NOINDEX PAGES
  # ──────────────────────────────────────────────
  Scenario: Onboarding page has noindex
    Given I am on the page "/onboarding/"
    Then the page should have robots meta tag "noindex"
    And the page should have robots meta tag "nofollow"

  Scenario: Uninstall page has noindex
    Given I am on the page "/uninstall/"
    Then the page should have robots meta tag "noindex"
    And the page should have robots meta tag "nofollow"

  # ──────────────────────────────────────────────
  # JSON-LD STRUCTURED DATA
  # ──────────────────────────────────────────────
  Scenario: Homepage has SoftwareApplication schema
    Given I am on the homepage "/"
    Then the page should contain a JSON-LD script tag
    And the JSON-LD should include "@type" of "SoftwareApplication"
    And the JSON-LD should include the application name "OneBuddy"

  Scenario Outline: Feature pages have FAQ schema
    Given I am on the feature page "<slug>"
    Then the page should contain JSON-LD structured data
    And the JSON-LD should include "@type" of "FAQPage"
    And the FAQ schema should list at least 3 questions

    Examples:
      | slug                           |
      | pomodoro-timer-extension       |
      | ad-blocker-extension           |
      | screen-recorder-extension      |

  Scenario Outline: Pages with breadcrumbs have BreadcrumbList schema
    Given I am on the page "<path>"
    Then the page should contain JSON-LD for "BreadcrumbList"
    And the breadcrumb schema should have at least 2 items

    Examples:
      | path                              |
      | /features/                        |
      | /pomodoro-timer-extension/        |
      | /blog/                            |
      | /knowledge-base/                  |

  # ──────────────────────────────────────────────
  # SITEMAP
  # ──────────────────────────────────────────────
  Scenario: Sitemap XML exists and is valid
    Given I request the file "/sitemap.xml"
    Then the response should be valid XML
    And the sitemap should contain at least 70 URLs

  Scenario: Sitemap includes all major pages
    Given I request the file "/sitemap.xml"
    Then the sitemap should include the following URLs:
      | url                                                 |
      | https://onebuddy.io/                                |
      | https://onebuddy.io/features/                       |
      | https://onebuddy.io/blog/                           |
      | https://onebuddy.io/knowledge-base/                 |
      | https://onebuddy.io/pomodoro-timer-extension/       |
      | https://onebuddy.io/ad-blocker-extension/           |
      | https://onebuddy.io/onebuddy-vs-ublock/             |
      | https://onebuddy.io/alternative-to-ublock-origin/   |
      | https://onebuddy.io/for-remote-workers/             |
      | https://onebuddy.io/for-students/                   |

  Scenario: Sitemap does not include noindex pages
    Given I request the file "/sitemap.xml"
    Then the sitemap should not include "/onboarding/"
    And the sitemap should not include "/uninstall/"

  Scenario: Sitemap has correct priority values
    Given I request the file "/sitemap.xml"
    Then the homepage should have priority "1.0"
    And feature pages should have priority >= "0.8"
    And blog posts should have priority >= "0.6"

  # ──────────────────────────────────────────────
  # HEADING HIERARCHY
  # ──────────────────────────────────────────────
  Scenario Outline: Each page has exactly one H1 tag
    Given I am on the page "<path>"
    Then the page should have exactly 1 H1 element

    Examples:
      | path                              |
      | /                                 |
      | /features/                        |
      | /blog/                            |
      | /knowledge-base/                  |
      | /pomodoro-timer-extension/        |
      | /onebuddy-vs-ublock/             |
      | /for-remote-workers/             |

  # ──────────────────────────────────────────────
  # FAVICON & MANIFEST
  # ──────────────────────────────────────────────
  Scenario: Favicon files are present
    Given I request the file "/favicon.ico"
    Then the file should exist and be non-empty

  Scenario: Favicon SVG is present
    Given I request the file "/favicon.svg"
    Then the file should exist and be valid SVG

  Scenario: Apple touch icon is present
    Given I request the file "/apple-touch-icon.png"
    Then the file should exist and be a valid PNG

  Scenario: PWA manifest icons are present
    Given I request the file "/web-app-manifest-192x192.png"
    Then the file should exist
    Given I request the file "/web-app-manifest-512x512.png"
    Then the file should exist

  # ──────────────────────────────────────────────
  # INTERNAL LINKING
  # ──────────────────────────────────────────────
  Scenario: All internal links point to valid pages
    Given I crawl all pages on the site
    Then every internal link should resolve to a 200 status
    And there should be no broken internal links

  Scenario: No orphan pages (every page is linked from at least one other page)
    Given I crawl all pages on the site
    Then every indexed page should be linked from at least one other page

  # ──────────────────────────────────────────────
  # TRAILING SLASHES
  # ──────────────────────────────────────────────
  Scenario Outline: All URLs use trailing slashes
    Given I am on the page "<path>"
    Then the canonical URL should end with "/"

    Examples:
      | path                              |
      | /features/                        |
      | /blog/                            |
      | /pomodoro-timer-extension/        |
      | /for-remote-workers/             |
