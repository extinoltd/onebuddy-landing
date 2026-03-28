export interface Feature {
  title: string;
  description: string;
  icon: string;
  badge?: string;
  image?: string;
}

export interface FeatureCluster {
  id: string;
  seoTitle: string;
  seoDescription: string;
  label: string;
  color: string;
  colorLight: string;
  icon: string;
  features: Feature[];
  comparison: string;
}

export const featureClusters: FeatureCluster[] = [
  {
    id: 'productivity',
    seoTitle: 'Productivity Suite — Pomodoro Timer, Notes, Clipboard & More',
    seoDescription:
      'Replace your Pomodoro timer, notes app, clipboard manager, habit tracker, and calendar extension with OneBuddy\'s unified productivity suite.',
    label: 'Productivity Suite',
    color: '#7C3AED',
    colorLight: '#EDE9FE',
    icon: 'Flash',
    features: [
      {
        title: 'Pomodoro Timer with Screen Dim',
        description:
          'Focus sessions with auto screen-dimming, session tracking, and break scheduling. A complete replacement for Marinara or Forest extensions.',
        icon: 'Timer1',
        badge: 'Popular',
        image: '/new/focus timer.png',
      },
      {
        title: 'Notes with Slash Shortcuts',
        description:
          'Create notes and trigger instant autocomplete in any text field with custom shortcuts. Like TextExpander built into your browser.',
        icon: 'DocumentText',
        image: '/new/note.png',
      },
      {
        title: 'Clipboard History (100 Items)',
        description:
          'Never lose a copied snippet. Search, filter by source domain, and reuse anything from your last 100 copy operations.',
        icon: 'ClipboardText',
        image: '/new/clipboard.png',
      },
      {
        title: 'Habit Tracker',
        description:
          'Build daily routines with one-tap check-offs, streak tracking, and progress visualization right in your browser.',
        icon: 'TaskSquare',
        image: '/new/habbit.png',
      },
      {
        title: 'Google Calendar Integration',
        description:
          'OAuth-powered calendar sync with event notifications. View upcoming events without leaving your browser.',
        icon: 'Calendar',
        image: '/new/calander.png',
      },
      {
        title: 'Bookmark Manager',
        description:
          'Navigate, search, and organize your entire bookmark library from the side panel with breadcrumb folder navigation.',
        icon: 'Bookmark2',
        image: '/new/bookmark.png',
      },
    ],
    comparison:
      'Replaces: Marinara Pomodoro, Forest, Google Keep, CopyClip, Habitica, and Raindrop.io — all in one.',
  },
  {
    id: 'health',
    seoTitle: 'Health & Wellness Reminders — Drink Water, Stand Up, Eye Break',
    seoDescription:
      'Stay healthy while browsing with customizable water, standing, and eye break reminders. Replaces Stretchly and Break Timer extensions.',
    label: 'Health & Wellness',
    color: '#06B6D4',
    colorLight: '#ECFEFF',
    icon: 'Heart',
    features: [
      {
        title: 'Drink Water Reminder',
        description:
          'Customizable interval reminders to stay hydrated throughout the day with beautiful in-page notifications.',
        icon: 'Drop',
        badge: 'Health',
        image: '/new/remiders.png',
      },
      {
        title: 'Stand Up Reminder',
        description:
          'Combat sedentary work with scheduled standing reminders. Set intervals from 15 to 90 minutes.',
        icon: 'Activity',
      },
      {
        title: 'Eye Break (20-20-20 Rule)',
        description:
          'Protect your eyes with the 20-20-20 rule: every 20 minutes, look at something 20 feet away for 20 seconds.',
        icon: 'Eye',
        image: '/new/eye care.png',
      },
      {
        title: 'Custom Schedules',
        description:
          'Three scheduling modes — interval-based, fixed-time, and date-range — with website exclusion lists.',
        icon: 'Clock',
        image: '/new/setting.png',
      },
    ],
    comparison:
      'Replaces: Stretchly, Break Timer, and Water Reminder Pro — with more customization.',
  },
  {
    id: 'privacy',
    seoTitle: 'Privacy & Security — Ad Blocker, Tracker Blocker, Browser Lock',
    seoDescription:
      'Block ads, prevent trackers, blur sensitive content, and lock your browser with a password. A comprehensive privacy suite replacing uBlock Origin + Ghostery.',
    label: 'Privacy & Security',
    color: '#EC4899',
    colorLight: '#FDF2F8',
    icon: 'ShieldTick',
    features: [
      {
        title: 'Ad Blocker',
        description:
          'Block YouTube ads, popups, banners, and overlays with per-site whitelisting. Surgical control over what gets blocked.',
        icon: 'Forbidden2',
        badge: 'Essential',
        image: '/new/ad block.png',
      },
      {
        title: 'Tracker Blocker',
        description:
          'Block Facebook Pixel, TikTok Pixel, Google Analytics, and other trackers. Per-tracker stats show exactly what\'s blocked.',
        icon: 'ShieldSlash',
        image: '/new/block tracker.png',
      },
      {
        title: 'Privacy Blur (Persistent)',
        description:
          'Click-to-blur or drag-to-blur any element with 5 blur styles. Blurred areas persist and re-apply on revisit.',
        icon: 'EyeSlash',
        image: '/new/privet.png',
      },
      {
        title: 'Browser Lock with Password',
        description:
          'Lock all tabs with SHA-256 hashed password protection, auto-lock on inactivity, and a custom lock screen.',
        icon: 'Lock1',
      },
    ],
    comparison:
      'Replaces: uBlock Origin + Ghostery + Privacy Badger + Browser Lock — unified.',
  },
  {
    id: 'capture',
    seoTitle: 'Screen Capture Tools — Screenshot, Full Page, Tab & Screen Recording',
    seoDescription:
      'Capture screenshots, full-page scrolling images, tab recordings, and screen recordings. Built-in gallery replaces Loom and Nimbus.',
    label: 'Screen Capture',
    color: '#F59E0B',
    colorLight: '#FFFBEB',
    icon: 'Camera',
    features: [
      {
        title: 'Visible Tab Screenshot',
        description:
          'Instant PNG capture of the current viewport with one click. No permissions popups.',
        icon: 'Gallery',
        image: '/new/screenshot.png',
      },
      {
        title: 'Full Page Capture',
        description:
          'Automated scroll-and-stitch technology for complete page screenshots, regardless of page length.',
        icon: 'Scan',
      },
      {
        title: 'Tab Recording',
        description:
          'Record your active tab with audio via Chrome Tab Capture API. Perfect for walkthroughs and tutorials.',
        icon: 'VideoPlay',
        badge: 'Pro',
        image: '/new/videos.png',
      },
      {
        title: 'Screen Recording',
        description:
          'Full display recording at 1920x1080 / 30fps. Pause, resume, and time display included.',
        icon: 'MonitorRecorder',
      },
      {
        title: 'Built-in Gallery',
        description:
          'Thumbnail grid gallery for up to 50 captures with preview, copy, download, and delete actions.',
        icon: 'Category',
      },
    ],
    comparison:
      'Replaces: Loom, Nimbus Screenshot, Awesome Screenshot — without any subscription.',
  },
];

export const problemExtensions = [
  { name: 'Pomodoro Timer', icon: 'Timer1', color: '#EF4444' },
  { name: 'Ad Blocker', icon: 'Forbidden2', color: '#F97316' },
  { name: 'Clipboard Manager', icon: 'ClipboardText', color: '#EAB308' },
  { name: 'Screen Recorder', icon: 'VideoPlay', color: '#22C55E' },
  { name: 'Notes App', icon: 'DocumentText', color: '#3B82F6' },
  { name: 'Habit Tracker', icon: 'TaskSquare', color: '#A855F7' },
  { name: 'Break Reminder', icon: 'NotificationBing', color: '#EC4899' },
  { name: 'Privacy Tools', icon: 'ShieldTick', color: '#06B6D4' },
  { name: 'Bookmark Manager', icon: 'Bookmark2', color: '#14B8A6' },
  { name: 'Browser Lock', icon: 'Lock1', color: '#6366F1' },
];
