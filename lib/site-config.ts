export const siteConfig = {
  name: 'OneBuddy',
  tagline: 'One Extension Replaces 10.',
  description:
    'Pomodoro Timer, Ad Blocker, Screen Recorder, Health Reminders, Privacy Tools & Clipboard Manager — all inside one Chrome side panel. Try everything free for 30 days.',
  url: 'https://onebuddy.io',
  extensionUrl:
    'https://chromewebstore.google.com/detail/kcclkkcbbfgcpknpnanhbpiffidjifgm',
  ogImage: '/og-image.jpg',
  twitterHandle: '@onebuddyio',
  creator: 'OneBuddy Team',
  pricing: {
    monthly: '£2.99',
    yearly: '£29.99',
    yearlyMonthly: '£2.50',
    lifetime: '£49.99',
    trialDays: 30,
    currency: 'GBP',
  },
};

export const navLinks = [
  { label: 'Features', href: '/features/' },
  { label: 'Pricing', href: '/#pricing' },
  { label: 'Compare', href: '/#comparison' },
  { label: 'Blog', href: '/blog/' },
  { label: 'Knowledge Base', href: '/knowledge-base/' },
];

export const footerLinks = {
  product: [
    { label: 'All Features', href: '/features/' },
    { label: 'Comparison', href: '/#comparison' },
    { label: 'Blog', href: '/blog/' },
    { label: 'Knowledge Base', href: '/knowledge-base/' },
    { label: 'Add to Chrome', href: siteConfig.extensionUrl },
  ],
  features: [
    { label: 'Pomodoro Timer', href: '/pomodoro-timer-extension/' },
    { label: 'Ad Blocker', href: '/ad-blocker-extension/' },
    { label: 'Privacy Blur', href: '/privacy-blur-extension/' },
    { label: 'Screen Recorder', href: '/screen-recorder-extension/' },
    { label: 'Clipboard Manager', href: '/clipboard-manager-extension/' },
    { label: 'Browser Lock', href: '/browser-lock-extension/' },
  ],
  alternatives: [
    { label: 'uBlock Origin Alternative', href: '/alternative-to-ublock-origin/' },
    { label: 'Ghostery Alternative', href: '/alternative-to-ghostery/' },
    { label: 'Loom Alternative', href: '/alternative-to-loom/' },
    { label: 'Stretchly Alternative', href: '/alternative-to-stretchly/' },
    { label: 'Marinara Alternative', href: '/alternative-to-marina-pomodoro/' },
  ],
  useCases: [
    { label: 'For Remote Workers', href: '/for-remote-workers/' },
    { label: 'For Students', href: '/for-students/' },
    { label: 'For Developers', href: '/for-developers/' },
    { label: 'For Content Creators', href: '/for-content-creators/' },
    { label: 'For Freelancers', href: '/for-freelancers/' },
  ],
  comparisons: [
    { label: 'OneBuddy vs uBlock', href: '/onebuddy-vs-ublock/' },
    { label: 'OneBuddy vs Loom', href: '/onebuddy-vs-loom/' },
    { label: 'OneBuddy vs Forest', href: '/onebuddy-vs-forest/' },
    { label: 'OneBuddy vs Momentum', href: '/onebuddy-vs-momentum/' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy/' },
    { label: 'Terms of Service', href: '/terms/' },
  ],
};

export const trustBadges = [
  { label: '30-Day Free Trial', icon: 'Gift' },
  { label: 'No Data Selling', icon: 'ShieldCheck' },
  { label: 'Local-First Storage', icon: 'HardDrive' },
  { label: '40+ Languages', icon: 'Globe' },
  { label: 'Manifest V3', icon: 'CheckCircle' },
  { label: 'Cancel Anytime', icon: 'Zap' },
];
