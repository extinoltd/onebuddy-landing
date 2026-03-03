import type { Metadata } from 'next';
import { UseCasePageLayout } from '@/components/UseCasePage';

export const metadata: Metadata = {
  title: 'Best Chrome Extension for Developers — OneBuddy',
  description:
    'OneBuddy is the best productivity extension for developers. Clipboard history for code snippets, Pomodoro timer for focused coding sessions, screen recording for bug reports, and privacy tools for secure browsing — all in one free Chrome extension.',
  keywords: [
    'best chrome extension for developers',
    'developer productivity extension',
    'code snippet clipboard manager',
    'pomodoro timer for coding',
    'screen recording bug reports',
    'developer browser tools',
  ],
  alternates: {
    canonical: 'https://onebuddy.io/for-developers/',
  },
  openGraph: {
    title: 'OneBuddy for Developers — Your Complete Browser Toolkit',
    description:
      'Clipboard history for code snippets, Pomodoro for focused coding, screen recording for bug reports, and privacy tools — one free extension for developers.',
  },
};

export default function ForDevelopersPage() {
  return (
    <UseCasePageLayout
      persona="Developers"
      heroTitle="The All-in-One Chrome Extension Built for Developers"
      heroSubtitle="Clipboard history for code snippets, Pomodoro for focused coding sessions, screen recording for bug reports, and privacy tools for secure browsing — all in one free extension."
      painPoints={[
        {
          problem: 'Losing copied code snippets, terminal outputs, and API responses',
          solution:
            'Clipboard History stores your last 100 copies with search and source domain filtering. Instantly retrieve that regex pattern, API key format, or Stack Overflow snippet you copied three hours ago.',
        },
        {
          problem: 'Context switching between coding and browser research kills flow',
          solution:
            'The Pomodoro Timer with Screen Dim physically darkens your tab during focus intervals, reinforcing deep work. Structured break cycles prevent burnout during long debugging sessions.',
        },
        {
          problem: 'Recording bug reproductions requires a separate paid tool',
          solution:
            'OneBuddy includes tab recording, full-screen recording, and full-page screenshots — completely free with no time limits. Attach screen captures directly to issue trackers and pull requests.',
        },
        {
          problem: 'Managing dozens of bookmarked docs, repos, and reference pages',
          solution:
            'The Bookmark Manager gives you side-panel access to organized bookmarks. Group documentation, GitHub repos, and API references without cluttering your browser toolbar.',
        },
        {
          problem: 'Sitting for hours during long coding sessions damages health',
          solution:
            'Health Reminders ping you to hydrate, stand, and rest your eyes at customizable intervals. The 20-20-20 Eye Break rule protects your vision during marathon coding sessions.',
        },
        {
          problem: 'Running 6+ separate extensions slows down the browser',
          solution:
            'OneBuddy replaces your clipboard manager, Pomodoro timer, ad blocker, screen recorder, notes app, and more with a single lightweight Manifest V3 extension.',
        },
      ]}
      featureMappings={[
        {
          feature: 'Clipboard History',
          benefit:
            'Never lose a copied code snippet, terminal output, or API response again. 100-item history with full-text search and source URL tracking for instant retrieval.',
          icon: 'Clipboard',
        },
        {
          feature: 'Pomodoro Timer with Screen Dim',
          benefit:
            'Structure coding sessions with focus and break intervals. Screen dim physically reinforces concentration by darkening your active tab during deep work.',
          icon: 'Timer',
        },
        {
          feature: 'Screen Capture & Recording',
          benefit:
            'Record bug reproductions, create async code reviews, and capture full-page documentation — no Loom subscription needed. No time limits or watermarks.',
          icon: 'Video',
        },
        {
          feature: 'Notes & Slash Shortcuts',
          benefit:
            'Store reusable code templates, commit message formats, and PR descriptions. Slash shortcuts auto-expand templates in any text field across the browser.',
          icon: 'Document',
        },
        {
          feature: 'Ad & Tracker Blocker',
          benefit:
            'Faster page loads on documentation sites, Stack Overflow, and tutorials. Block tracking scripts that slow down research and compromise browsing privacy.',
          icon: 'Shield',
        },
        {
          feature: 'Health Reminders (Water, Stand, Eyes)',
          benefit:
            'Combat the sedentary developer lifestyle with customizable reminders. The 20-20-20 eye break rule protects your vision during extended screen time.',
          icon: 'Heart',
        },
        {
          feature: 'Bookmark Manager',
          benefit:
            'Organize documentation, GitHub repos, API references, and learning resources in the side panel. Quick access without cluttering your toolbar.',
          icon: 'Bookmark',
        },
        {
          feature: 'Browser Lock',
          benefit:
            'Lock all tabs with a password when stepping away from your workstation. Protect source code, internal tools, and API dashboards from unauthorized access.',
          icon: 'Lock',
        },
      ]}
      closingTitle="Code Smarter. Ship Faster."
      closingSubtitle="Join developers who simplified their browser with one free extension."
      relatedLinks={[
        { label: 'For Students', href: '/for-students/' },
        { label: 'For Remote Workers', href: '/for-remote-workers/' },
        { label: 'Loom Alternative', href: '/alternative-to-loom/' },
        { label: 'Clipboard Manager', href: '/clipboard-manager-extension/' },
      ]}
    />
  );
}
