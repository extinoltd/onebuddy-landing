import type { Metadata } from 'next';
import { UseCasePageLayout } from '@/components/UseCasePage';

export const metadata: Metadata = {
  title: 'Best Privacy Chrome Extension — OneBuddy',
  description:
    'OneBuddy is the all-in-one privacy Chrome extension. Ad blocker, tracker blocker, privacy blur, browser lock with SHA-256 encryption, and encrypted messaging — all in one free extension.',
  keywords: [
    'privacy chrome extension',
    'best privacy extension for chrome',
    'ad blocker tracker blocker',
    'browser lock extension',
    'privacy blur chrome',
    'encrypted messaging extension',
  ],
  alternates: {
    canonical: 'https://onebuddy.io/for-privacy-focused-users/',
  },
  openGraph: {
    title: 'OneBuddy for Privacy-Focused Users — Total Browser Privacy',
    description:
      'Ad blocking, tracker blocking, privacy blur, browser lock, and encrypted messaging — one free extension for complete browser privacy.',
  },
};

export default function ForPrivacyFocusedUsersPage() {
  return (
    <UseCasePageLayout
      persona="Privacy-Focused Users"
      heroTitle="The All-in-One Privacy Chrome Extension"
      heroSubtitle="Block ads and trackers, blur sensitive data on any page, lock your browser with a password, and send encrypted messages — all in one free extension that respects your privacy."
      painPoints={[
        {
          problem: 'Tracking scripts from Facebook, Google, and TikTok follow you everywhere',
          solution:
            'OneBuddy\'s Tracker Blocker blocks known tracking scripts from major platforms. Browse, research, and shop without advertising networks building a profile of your activity.',
        },
        {
          problem: 'Ads, popups, and autoplay videos slow down browsing and invade privacy',
          solution:
            'The Ad Blocker removes banner ads, popups, YouTube ads, and autoplay videos across all sites. Faster page loads and a cleaner browsing experience.',
        },
        {
          problem: 'Sensitive information visible on screen during sharing or screenshots',
          solution:
            'Privacy Blur lets you click or drag to hide account numbers, balances, personal details, and messages on any web page. Blurred areas persist across page revisits.',
        },
        {
          problem: 'Anyone can access your open browser tabs when you step away',
          solution:
            'Browser Lock password-protects all open tabs with SHA-256 encryption. Auto-lock engages after inactivity, ensuring your browsing session stays private.',
        },
        {
          problem: 'Standard messaging lacks end-to-end encryption in the browser',
          solution:
            'OneBuddy\'s Encrypted Messaging lets you communicate securely directly from the browser side panel. End-to-end encryption ensures only the intended recipient reads your messages.',
        },
        {
          problem: 'Installing multiple privacy extensions creates conflicts and slowdowns',
          solution:
            'OneBuddy combines ad blocking, tracker blocking, privacy blur, browser lock, and encrypted messaging in one lightweight Manifest V3 extension — no conflicts, no bloat.',
        },
      ]}
      featureMappings={[
        {
          feature: 'Ad Blocker',
          benefit:
            'Remove banner ads, popups, YouTube ads, and autoplay videos across all websites. Faster page loads and fewer privacy-invasive advertising scripts.',
          icon: 'Shield',
        },
        {
          feature: 'Tracker Blocker',
          benefit:
            'Block Facebook Pixel, Google Analytics, TikTok tracking, and other surveillance scripts. Browse without being profiled by advertising networks.',
          icon: 'ShieldCross',
        },
        {
          feature: 'Privacy Blur',
          benefit:
            'Click or drag to blur sensitive data on any web page. Hide account numbers, emails, addresses, and personal details. Blurs persist across page revisits.',
          icon: 'EyeOff',
        },
        {
          feature: 'Browser Lock',
          benefit:
            'Password-protect all open tabs with SHA-256 encryption. Auto-lock after inactivity keeps your browsing session secure when you step away.',
          icon: 'Lock',
        },
        {
          feature: 'Encrypted Messaging',
          benefit:
            'Send and receive end-to-end encrypted messages directly from the browser side panel. Private conversations without relying on third-party messaging apps.',
          icon: 'Message',
        },
        {
          feature: 'Health Reminders',
          benefit:
            'Customizable reminders to hydrate, stand, and rest your eyes. Three scheduling modes fit any browsing pattern without collecting personal data.',
          icon: 'Heart',
        },
        {
          feature: 'Clipboard History',
          benefit:
            'Locally stored clipboard history with no cloud sync. Your copied data stays on your device with 100-item history and full-text search.',
          icon: 'Clipboard',
        },
        {
          feature: 'Pomodoro Timer',
          benefit:
            'Structure browsing sessions with focus and break intervals. Screen dim reduces visual distractions without any data collection or tracking.',
          icon: 'Timer',
        },
      ]}
      closingTitle="Your Privacy. Your Browser. Your Rules."
      closingSubtitle="Join privacy-conscious users who took back control of their browser with one free extension. No tracking, no profiling, no compromises."
      relatedLinks={[
        { label: 'Privacy Blur', href: '/privacy-blur-extension/' },
        { label: 'Browser Lock', href: '/browser-lock-extension/' },
        { label: 'uBlock Origin Alternative', href: '/alternative-to-ublock-origin/' },
        { label: 'Encrypted Messaging', href: '/encrypted-messaging-extension/' },
      ]}
    />
  );
}
