import type { Metadata } from 'next';
import { AlternativePageLayout } from '@/components/AlternativePage';

export const metadata: Metadata = {
  title: 'Best Ghostery Alternative 2026 — OneBuddy (Free)',
  description:
    'Looking for a Ghostery alternative? OneBuddy blocks trackers and ads, plus includes productivity tools, health reminders, privacy blur, screen capture, and browser lock — completely free.',
  keywords: [
    'ghostery alternative',
    'free tracker blocker chrome',
    'best privacy extension',
    'ghostery replacement',
    'tracker blocker with productivity',
    'privacy chrome extension free',
  ],
  alternates: {
    canonical: 'https://onebuddy.io/alternative-to-ghostery/',
  },
  openGraph: {
    title: 'Best Ghostery Alternative — OneBuddy',
    description:
      'OneBuddy replaces Ghostery with tracker blocking, ad blocking, and 10+ bonus tools. No freemium limits — everything is free.',
  },
};

export default function GhosteryAlternativePage() {
  return (
    <AlternativePageLayout
      competitorName="Ghostery"
      competitorDescription="Ghostery is a privacy-focused browser extension that blocks trackers, ads, and provides a privacy dashboard showing which companies track you across the web. While Ghostery excels at privacy visualization, its free tier has limitations, and it focuses exclusively on tracking prevention — it doesn't include productivity or wellness features."
      heroTitle="A Better Ghostery Alternative — Privacy + Productivity in One"
      heroSubtitle="OneBuddy matches Ghostery's tracker blocking and ad blocking, then goes further with productivity tools, health reminders, screen capture, encrypted messaging, and privacy blur — all completely free, no premium tier required."
      whySwitchTitle="Why Users Switch from Ghostery to OneBuddy"
      whySwitchPoints={[
        'Block Facebook, TikTok, and Google trackers with per-service stats',
        'Full ad blocking included — no separate extension needed',
        'Privacy Blur for instant screen content protection',
        'Browser Lock to secure your tabs with a password',
        'E2E encrypted messaging built right into the browser',
        'No freemium limitations — every feature is free',
        'Productivity suite: Pomodoro, notes, clipboard, habits',
        'Health reminders for water, standing, and eye breaks',
      ]}
      features={[
        { name: 'Tracker Blocking', onebuddy: true, competitor: true },
        { name: 'Ad Blocking', onebuddy: true, competitor: true },
        { name: 'Per-Tracker Statistics', onebuddy: true, competitor: true },
        { name: 'Privacy Dashboard', onebuddy: false, competitor: true },
        { name: 'Privacy Blur', onebuddy: true, competitor: false },
        { name: 'Browser Lock', onebuddy: true, competitor: false },
        { name: 'E2E Encrypted Messaging', onebuddy: true, competitor: false },
        { name: 'Pomodoro Timer', onebuddy: true, competitor: false },
        { name: 'Health Reminders', onebuddy: true, competitor: false },
        { name: 'Notes with Shortcuts', onebuddy: true, competitor: false },
        { name: 'Clipboard History', onebuddy: true, competitor: false },
        { name: 'Screen Recording', onebuddy: true, competitor: false },
        { name: 'Habit Tracker', onebuddy: true, competitor: false },
        { name: 'Google Calendar', onebuddy: true, competitor: false },
        { name: '40+ Languages', onebuddy: true, competitor: true },
        { name: 'Completely Free', onebuddy: true, competitor: false },
      ]}
      faqs={[
        {
          q: 'Is OneBuddy better at blocking trackers than Ghostery?',
          a: 'OneBuddy provides individual controls for Facebook/Meta Pixel, TikTok Pixel, Google Analytics/Tag Manager, and other common trackers with per-tracker statistics. It covers the major tracking services most users need blocked.',
        },
        {
          q: 'Does Ghostery have features OneBuddy does not?',
          a: "Ghostery includes a detailed privacy dashboard that visualizes tracking companies across the web. OneBuddy focuses on actionable blocking rather than visualization, but compensates with 10+ additional tool categories.",
        },
        {
          q: 'Is OneBuddy free unlike Ghostery Premium?',
          a: 'Yes. OneBuddy is 100% free with all features available. There is no premium tier, no feature gating, and no ads. Ghostery offers a free tier with limits and a paid premium plan.',
        },
        {
          q: 'Can OneBuddy replace Ghostery completely?',
          a: 'For most users, yes. OneBuddy covers ad blocking, tracker blocking with per-service controls, plus adds productivity, wellness, screen capture, and privacy tools that Ghostery does not offer.',
        },
      ]}
      relatedLinks={[
        { label: 'uBlock Origin Alternative', href: '/alternative-to-ublock-origin/' },
        { label: 'Loom Alternative', href: '/alternative-to-loom/' },
        { label: 'For Privacy-Conscious Users', href: '/#privacy' },
        { label: 'For Remote Workers', href: '/for-remote-workers/' },
        { label: 'All Features', href: '/#features' },
      ]}
    />
  );
}
