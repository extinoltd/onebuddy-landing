import type { Metadata } from 'next';
import { UseCasePageLayout } from '@/components/UseCasePage';

export const metadata: Metadata = {
  title: 'Best Chrome Extension for Freelancers — OneBuddy',
  description:
    'OneBuddy is the best productivity extension for freelancers. Pomodoro timer for time tracking, Google Calendar integration, screen recording for client updates, clipboard manager for project notes — all in one free Chrome extension.',
  keywords: [
    'best chrome extension for freelancers',
    'freelancer productivity extension',
    'pomodoro timer freelancers',
    'screen recording client updates',
    'freelance browser tools',
    'time management chrome extension',
  ],
  alternates: {
    canonical: 'https://onebuddy.io/for-freelancers/',
  },
  openGraph: {
    title: 'OneBuddy for Freelancers — Your Complete Browser Toolkit',
    description:
      'Pomodoro timer, Google Calendar, screen recording, privacy blur, and clipboard manager — one free extension for freelancers.',
  },
};

export default function ForFreelancersPage() {
  return (
    <UseCasePageLayout
      persona="Freelancers"
      heroTitle="The All-in-One Chrome Extension for Freelancers"
      heroSubtitle="Track your time with Pomodoro, manage client meetings from your side panel, record async updates, blur sensitive client data, and keep every copied snippet organized — all in one free extension."
      painPoints={[
        {
          problem: 'Tracking billable time across multiple client projects',
          solution:
            'The Pomodoro Timer structures your workday into focused intervals. Use it to track time spent on each client project and maintain consistent productivity across gigs.',
        },
        {
          problem: 'Missing client meetings juggling multiple calendars',
          solution:
            'Google Calendar Integration shows upcoming meetings right in the side panel without switching tabs. Chrome alarm notifications ensure you never miss a client call.',
        },
        {
          problem: 'Recording client updates and walkthroughs requires paid tools',
          solution:
            'OneBuddy includes tab recording and screen recording with no time limits or watermarks. Create async client updates, project walkthroughs, and tutorial content for free.',
        },
        {
          problem: 'Exposing one client\'s data while screen sharing with another',
          solution:
            'Privacy Blur lets you click or drag to hide sensitive information before client calls. Blurred areas persist across page revisits — perfect for recurring client meetings.',
        },
        {
          problem: 'Losing copied project details, links, and notes across tabs',
          solution:
            'Clipboard History stores your last 100 copies with source URL tracking and search. Retrieve project URLs, client feedback, and reference material instantly.',
        },
        {
          problem: 'Health deteriorating from irregular work habits and no set schedule',
          solution:
            'Health Reminders ping you to hydrate, stand, and rest your eyes at customizable intervals. Maintain healthy habits even when client deadlines are pressing.',
        },
      ]}
      featureMappings={[
        {
          feature: 'Pomodoro Timer with Screen Dim',
          benefit:
            'Track focused work time across client projects. Structured intervals prevent overworking and help estimate billable hours accurately.',
          icon: 'Timer',
        },
        {
          feature: 'Google Calendar Integration',
          benefit:
            'See all client meetings, deadlines, and calls right in the side panel. Chrome alarm notifications keep you on schedule without tab switching.',
          icon: 'Calendar',
        },
        {
          feature: 'Screen Capture & Recording',
          benefit:
            'Record async client updates, project demos, and tutorial walkthroughs. No time limits or watermarks — professional output without the subscription cost.',
          icon: 'Video',
        },
        {
          feature: 'Privacy Blur',
          benefit:
            'Hide sensitive client data from one project while presenting another. Persistent blurs protect confidential information across screen sharing sessions.',
          icon: 'EyeOff',
        },
        {
          feature: 'Clipboard History & Notes',
          benefit:
            'Keep project details, client feedback, and copied references organized. 100-item clipboard history with search plus slash-shortcut notes for templates.',
          icon: 'Clipboard',
        },
        {
          feature: 'Ad & Tracker Blocker',
          benefit:
            'Faster page loads while researching for client projects. Remove ads and tracking scripts that slow down work and compromise privacy.',
          icon: 'Shield',
        },
        {
          feature: 'Health Reminders (Water, Stand, Eyes)',
          benefit:
            'Maintain healthy habits during irregular freelance schedules. Customizable reminders for hydration, standing, and eye breaks.',
          icon: 'Heart',
        },
        {
          feature: 'Browser Lock',
          benefit:
            'Lock all tabs with a password between client sessions. Protect project data when working from shared spaces or co-working environments.',
          icon: 'Lock',
        },
      ]}
      closingTitle="Work Smarter. Impress Clients. Stay Healthy."
      closingSubtitle="Join freelancers who simplified their browser with one free extension. Focus, record, protect, and deliver — all from a single side panel."
      relatedLinks={[
        { label: 'Pomodoro Timer', href: '/pomodoro-timer-extension/' },
        { label: 'Google Calendar Extension', href: '/features/' },
        { label: 'For Remote Workers', href: '/for-remote-workers/' },
        { label: 'Screen Recorder', href: '/screen-recorder-extension/' },
      ]}
    />
  );
}
