export const siteConfig = {
  name: 'OneBuddy',
  tagline: 'One Extension. Everything You Need.',
  description:
    'Productivity, Health Reminders, Focus Timer, Privacy Tools & Screen Capture — All Inside One Chrome Side Panel. Replace 10+ extensions with OneBuddy.',
  url: 'https://onebuddy.io',
  extensionUrl:
    'https://chromewebstore.google.com/detail/kcclkkcbbfgcpknpnanhbpiffidjifgm',
  ogImage: '/og-image.jpg',
  twitterHandle: '@onebuddyio',
  creator: 'OneBuddy Team',
};

export const navLinks = [
  { label: 'Features', href: '/#features' },
  { label: 'How It Works', href: '/#how-it-works' },
  { label: 'Compare', href: '/#comparison' },
  { label: 'FAQ', href: '/#faq' },
  { label: 'Use Cases', href: '/for-remote-workers/' },
];

export const footerLinks = {
  product: [
    { label: 'Features', href: '/#features' },
    { label: 'Comparison', href: '/#comparison' },
    { label: 'FAQ', href: '/#faq' },
    { label: 'Add to Chrome', href: siteConfig.extensionUrl },
  ],
  alternatives: [
    { label: 'uBlock Origin Alternative', href: '/alternative-to-ublock-origin/' },
    { label: 'Ghostery Alternative', href: '/alternative-to-ghostery/' },
    { label: 'Loom Alternative', href: '/alternative-to-loom/' },
  ],
  useCases: [
    { label: 'For Remote Workers', href: '/for-remote-workers/' },
    { label: 'For Students', href: '/for-students/' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy/' },
    { label: 'Terms of Service', href: '/terms/' },
  ],
};

export const trustBadges = [
  { label: '100% Free', icon: 'Gift' },
  { label: 'No Data Selling', icon: 'ShieldCheck' },
  { label: 'Local-First Storage', icon: 'HardDrive' },
  { label: '40+ Languages', icon: 'Globe' },
  { label: 'Manifest V3', icon: 'CheckCircle' },
  { label: 'Lightweight & Fast', icon: 'Zap' },
];
