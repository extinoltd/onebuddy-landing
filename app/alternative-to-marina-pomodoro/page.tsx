import type { Metadata } from 'next';
import { AlternativePageLayout } from '@/components/AlternativePage';

export const metadata: Metadata = {
  title: 'Best Marinara Pomodoro Alternative 2026 — OneBuddy (Free)',
  description:
    'Looking for a Marinara Pomodoro alternative? OneBuddy offers a Pomodoro timer with screen dim plus health reminders, ad blocker, clipboard manager, screen recorder, and more — all in one free extension.',
  keywords: [
    'marinara pomodoro alternative',
    'pomodoro timer chrome extension',
    'focus timer extension',
    'marinara replacement',
    'pomodoro with screen dim',
  ],
  alternates: {
    canonical: 'https://onebuddy.io/alternative-to-marina-pomodoro/',
  },
  openGraph: {
    title: 'Best Marinara Pomodoro Alternative — OneBuddy',
    description:
      'OneBuddy replaces Marinara Pomodoro with a screen-dim focus timer plus 10+ extra productivity, privacy, and wellness tools. 100% free.',
  },
};

export default function MarinaPomodoroAlternativePage() {
  return (
    <AlternativePageLayout
      competitorName="Marinara Pomodoro"
      competitorDescription="Marinara: Pomodoro Assistant is a popular Chrome extension that provides a simple Pomodoro timer with customizable work and break intervals, browser notifications, and usage history. It focuses exclusively on time management using the Pomodoro technique and does not include any additional productivity, wellness, or privacy features."
      heroTitle="The Best Marinara Pomodoro Alternative — Focus Timer + 10 More Tools"
      heroSubtitle="OneBuddy gives you a Pomodoro timer with screen dim to physically reduce distractions, plus health reminders, ad blocking, clipboard history, screen recording, and 10+ more tools. All free, all in one extension."
      whySwitchTitle="Why Users Switch from Marinara Pomodoro to OneBuddy"
      whySwitchPoints={[
        'Pomodoro timer with screen dim physically darkens distractions during focus',
        'Health reminders for water, standing, and eye breaks complement focus sessions',
        'Ad blocker removes popups and banners that interrupt your flow',
        'Clipboard history stores your last 100 copies for instant access',
        'Notes with slash shortcuts let you expand templates in any text field',
        'Screen recording and screenshots with no time limits',
        'Privacy Blur hides sensitive content before screen sharing',
        'One extension instead of a timer plus five other tools',
      ]}
      features={[
        { name: 'Pomodoro Timer', onebuddy: true, competitor: true },
        { name: 'Customizable Work/Break Intervals', onebuddy: true, competitor: true },
        { name: 'Browser Notifications', onebuddy: true, competitor: true },
        { name: 'Timer History/Statistics', onebuddy: false, competitor: true },
        { name: 'Screen Dim During Focus', onebuddy: true, competitor: false },
        { name: 'Health Reminders (Water, Stand, Eyes)', onebuddy: true, competitor: false },
        { name: 'Ad Blocking', onebuddy: true, competitor: false },
        { name: 'Tracker Blocking', onebuddy: true, competitor: false },
        { name: 'Clipboard History', onebuddy: true, competitor: false },
        { name: 'Notes with Shortcuts', onebuddy: true, competitor: false },
        { name: 'Screen Recording', onebuddy: true, competitor: false },
        { name: 'Full-Page Screenshots', onebuddy: true, competitor: false },
        { name: 'Privacy Blur', onebuddy: true, competitor: false },
        { name: 'Browser Lock', onebuddy: true, competitor: false },
        { name: 'Habit Tracker', onebuddy: true, competitor: false },
        { name: 'Google Calendar', onebuddy: true, competitor: false },
        { name: 'E2E Encrypted Messaging', onebuddy: true, competitor: false },
        { name: 'Free', onebuddy: true, competitor: true },
      ]}
      faqs={[
        {
          q: 'How does OneBuddy\'s Pomodoro timer compare to Marinara?',
          a: 'Both offer customizable focus and break intervals with browser notifications. OneBuddy adds screen dim during focus sessions, which physically darkens your active tab to reduce visual distractions — a feature Marinara does not have. Marinara includes timer history and statistics that OneBuddy does not track.',
        },
        {
          q: 'Does OneBuddy track Pomodoro session statistics?',
          a: 'OneBuddy focuses on the active timer experience with screen dim rather than historical statistics. If detailed session tracking is your primary need, Marinara may be better suited. However, OneBuddy compensates with 10+ additional tool categories.',
        },
        {
          q: 'Can I customize focus and break durations in OneBuddy?',
          a: 'Yes. OneBuddy lets you set custom work duration and break intervals, just like Marinara. You can adjust these from the side panel timer settings.',
        },
        {
          q: 'Why would I need health reminders with a Pomodoro timer?',
          a: 'Pomodoro breaks are for mental rest, but they do not remind you to hydrate, stand, or rest your eyes. OneBuddy\'s health reminders complement Pomodoro sessions by ensuring you take care of your physical health during long work periods.',
        },
      ]}
      relatedLinks={[
        { label: 'Pomodoro Timer Extension', href: '/pomodoro-timer-extension/' },
        { label: 'Stretchly Alternative', href: '/alternative-to-stretchly/' },
        { label: 'For Students', href: '/for-students/' },
        { label: 'For Remote Workers', href: '/for-remote-workers/' },
        { label: 'All Features', href: '/#features' },
      ]}
    />
  );
}
