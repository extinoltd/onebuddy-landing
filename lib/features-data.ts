export interface Feature {
  title: string;
  description: string;
  icon: string;
  badge?: string;
  image?: string;
  tier?: 'free' | 'pro';
}

export interface FeatureCluster {
  id: string;
  seoTitle: string;
  seoDescription: string;
  label: string;
  tagline?: string;
  costComparison?: string;
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
    tagline: 'Get More Done Without The Burnout',
    costComparison: '~£15/month',
    features: [
      {
        title: 'Pomodoro Timer with Screen Dim',
        description:
          'Custom focus sessions that automatically dim distractions. Track your productivity streaks and see how you improve over time.',
        icon: 'Timer1',
        badge: 'Popular',
        image: '/new/focus timer.png',
        tier: 'free',
      },
      {
        title: 'Notes with Slash Shortcuts',
        description:
          'Quick notes that live right in your browser. Slash commands for formatting.',
        icon: 'DocumentText',
        image: '/new/note.png',
        tier: 'free',
      },
      {
        title: 'Clipboard History (100 Items)',
        description:
          'Never lose a copied link, code snippet, or text again. Search and reuse your last 100 copies.',
        icon: 'ClipboardText',
        image: '/new/clipboard.png',
        tier: 'pro',
      },
      {
        title: 'Habit Tracker',
        description:
          'Build daily routines with streak tracking. See your consistency grow day by day.',
        icon: 'TaskSquare',
        image: '/new/habbit.png',
        tier: 'pro',
      },
      {
        title: 'Google Calendar Integration',
        description:
          'Meeting notifications right in your side panel. Never miss a call again.',
        icon: 'Calendar',
        image: '/new/calander.png',
        tier: 'pro',
      },
      {
        title: 'Bookmark Manager',
        description:
          'Organize your bookmarks with folders, search, and quick access from the side panel.',
        icon: 'Bookmark2',
        image: '/new/bookmark.png',
        tier: 'pro',
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
    tagline: 'Your Browser Shouldn\'t Hurt Your Body',
    costComparison: '~£3/month',
    color: '#06B6D4',
    colorLight: '#ECFEFF',
    icon: 'Heart',
    features: [
      {
        title: 'Drink Water Reminder',
        description:
          'Customizable hydration notifications. Your body needs 8 glasses a day; most of us forget after 2.',
        icon: 'Drop',
        badge: 'Health',
        image: '/new/remiders.png',
        tier: 'free',
      },
      {
        title: 'Stand Up Reminder',
        description:
          'Gentle nudges to move every 15-90 minutes. Customize your schedule.',
        icon: 'Activity',
        tier: 'free',
      },
      {
        title: 'Eye Break (20-20-20 Rule)',
        description:
          'Every 20 minutes, look at something 20 feet away for 20 seconds. OneBuddy reminds you automatically.',
        icon: 'Eye',
        image: '/new/eye care.png',
        tier: 'free',
      },
      {
        title: 'Custom Schedules',
        description:
          'Three scheduling modes with website exclusions. Set different reminders for work hours vs. personal time.',
        icon: 'Clock',
        image: '/new/setting.png',
        tier: 'pro',
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
    tagline: 'Your Data Stays on YOUR Device. Period.',
    costComparison: '~£5/month',
    color: '#EC4899',
    colorLight: '#FDF2F8',
    icon: 'ShieldTick',
    features: [
      {
        title: 'Ad Blocker',
        description:
          'Block popups, banners, and overlays. Whitelist sites you want to support.',
        icon: 'Forbidden2',
        badge: 'Essential',
        image: '/new/ad block.png',
        tier: 'free',
      },
      {
        title: 'Ad Blocker PRO',
        description:
          'YouTube ad blocking, per-site whitelist, popup & banner blocking with advanced controls.',
        icon: 'Forbidden2',
        image: '/new/ad block.png',
        tier: 'pro',
      },
      {
        title: 'Tracker Blocker',
        description:
          'Block Facebook Pixel, TikTok tracking, Google Analytics, and 200+ known trackers. See exactly what\'s being blocked.',
        icon: 'ShieldSlash',
        image: '/new/block tracker.png',
        tier: 'pro',
      },
      {
        title: 'Privacy Blur (Persistent)',
        description:
          'Click any element to blur it. 5 blur styles. Changes persist across page reloads. Perfect for screenshots and screen sharing.',
        icon: 'EyeSlash',
        image: '/new/privet.png',
        tier: 'pro',
      },
      {
        title: 'Browser Lock with Password',
        description:
          'SHA-256 encrypted password protection. Auto-lock when you step away. Nobody touches your tabs.',
        icon: 'Lock1',
        tier: 'pro',
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
    tagline: 'Record, Capture, Create — Without Paying Loom £150/Year',
    costComparison: '~£12.50/month (Loom Pro)',
    color: '#F59E0B',
    colorLight: '#FFFBEB',
    icon: 'Camera',
    features: [
      {
        title: 'Visible Tab Screenshot',
        description:
          'One-click capture of your current tab. Instant PNG.',
        icon: 'Gallery',
        image: '/new/screenshot.png',
        tier: 'free',
      },
      {
        title: 'Full Page Capture',
        description:
          'Scroll-and-stitch technology captures entire web pages, even ones that scroll for miles.',
        icon: 'Scan',
        tier: 'pro',
      },
      {
        title: 'Tab Recording',
        description:
          'Record your tab with audio. Perfect for tutorials, bug reports, and presentations.',
        icon: 'VideoPlay',
        badge: 'Pro',
        image: '/new/videos.png',
        tier: 'pro',
      },
      {
        title: 'Screen Recording',
        description:
          'Full HD 1920x1080 @ 30fps. Pause and resume. No watermarks. No time limits.',
        icon: 'MonitorRecorder',
        tier: 'pro',
      },
      {
        title: 'Built-in Gallery',
        description:
          'All your captures organized in a thumbnail grid. No cloud upload needed. Your content stays yours.',
        icon: 'Category',
        tier: 'pro',
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
