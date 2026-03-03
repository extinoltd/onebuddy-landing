import type { Metadata } from 'next';
import { UseCasePageLayout } from '@/components/UseCasePage';

export const metadata: Metadata = {
  title: 'Best Chrome Extension for Remote Workers — OneBuddy',
  description:
    'OneBuddy is the best productivity extension for remote workers. Pomodoro timer, health reminders, ad blocker, privacy blur, screen recording, clipboard manager — all in one free Chrome extension.',
  keywords: [
    'best productivity extension for remote workers',
    'remote work chrome extension',
    'work from home browser tools',
    'productivity tools remote workers',
    'focus timer remote work',
    'health reminder work from home',
  ],
  alternates: {
    canonical: 'https://onebuddy.io/for-remote-workers/',
  },
  openGraph: {
    title: 'OneBuddy for Remote Workers — Your Complete Browser Toolkit',
    description:
      'Pomodoro timer, health reminders, privacy blur, screen recording, and more. One free extension for remote workers.',
  },
};

export default function ForRemoteWorkersPage() {
  return (
    <UseCasePageLayout
      persona="Remote Workers"
      heroTitle="The All-in-One Chrome Extension Built for Remote Work"
      heroSubtitle="Spend 6-12 hours in your browser every day? OneBuddy gives you focus tools, health reminders, privacy protection, and screen capture — all in one side panel, so you can do your best work from anywhere."
      painPoints={[
        {
          problem: 'Sitting too long without breaks leads to back pain and fatigue',
          solution:
            'OneBuddy\'s Stand Up Reminder and Drink Water Reminder ping you at customizable intervals. The 20-20-20 Eye Break rule protects your vision during long sessions.',
        },
        {
          problem: 'Losing focus with constant browser distractions',
          solution:
            'The Pomodoro Timer with Screen Dim physically darkens your tab during focus sessions. The ad blocker removes distracting banners and popups across all sites.',
        },
        {
          problem: 'Sharing your screen exposes sensitive information',
          solution:
            'Privacy Blur lets you click or drag to hide sensitive data before screen sharing. Blurred areas persist across page revisits — perfect for recurring meetings.',
        },
        {
          problem: 'Recording walkthroughs requires a separate paid tool',
          solution:
            'OneBuddy includes tab recording, screen recording, and full-page screenshots — completely free with no time limits. Built-in gallery manages all captures.',
        },
        {
          problem: 'Managing 8+ separate extensions slows down the browser',
          solution:
            'OneBuddy replaces your Pomodoro timer, ad blocker, clipboard manager, notes app, screen recorder, and more with a single lightweight Manifest V3 extension.',
        },
        {
          problem: 'Copying and re-finding snippets wastes time',
          solution:
            'Clipboard History stores your last 100 copies with search, source domain filtering, and one-click paste. Notes with slash shortcuts auto-expand templates in any text field.',
        },
      ]}
      featureMappings={[
        {
          feature: 'Pomodoro Timer with Screen Dim',
          benefit:
            'Structure your remote workday with focus/break cycles. The screen dim feature physically reinforces concentration by darkening your active tab during focus sessions.',
          icon: 'Timer',
        },
        {
          feature: 'Health Reminders (Water, Stand, Eyes)',
          benefit:
            'Combat the sedentary remote work lifestyle with customizable reminders to hydrate, stand, and rest your eyes. Three scheduling modes fit any work pattern.',
          icon: 'Heart',
        },
        {
          feature: 'Privacy Blur',
          benefit:
            'Hide sensitive Slack messages, financial data, or personal tabs before hopping on a screen share. Blurs persist across page revisits.',
          icon: 'EyeOff',
        },
        {
          feature: 'Screen Capture & Recording',
          benefit:
            'Record bug reports, create async walkthroughs, or capture full-page designs — no Loom subscription needed. Recordings have no time limits.',
          icon: 'Video',
        },
        {
          feature: 'Clipboard History & Notes',
          benefit:
            'Stop losing copied links, code snippets, and meeting notes. 100-item clipboard history with search, plus slash-shortcut notes for instant templates.',
          icon: 'Clipboard',
        },
        {
          feature: 'Google Calendar Integration',
          benefit:
            'See upcoming meetings right in the side panel without switching tabs. Chrome alarm notifications ensure you never miss a call.',
          icon: 'Calendar',
        },
        {
          feature: 'Ad & Tracker Blocking',
          benefit:
            'Faster page loads, fewer distractions. Block YouTube ads, popups, and privacy-invasive trackers from Facebook, TikTok, and Google.',
          icon: 'Shield',
        },
        {
          feature: 'Browser Lock',
          benefit:
            'Step away from your desk? Lock all tabs with a password. Auto-lock after inactivity keeps your work protected from curious housemates.',
          icon: 'Lock',
        },
      ]}
      closingTitle="Your Remote Office, Upgraded"
      closingSubtitle="Join thousands of remote workers who simplified their browser with one free extension. Focus better, stay healthy, protect your privacy."
      relatedLinks={[
        { label: 'For Students', href: '/for-students/' },
        { label: 'uBlock Origin Alternative', href: '/alternative-to-ublock-origin/' },
        { label: 'Loom Alternative', href: '/alternative-to-loom/' },
        { label: 'All Features', href: '/#features' },
        { label: 'Comparison Table', href: '/#comparison' },
      ]}
    />
  );
}
