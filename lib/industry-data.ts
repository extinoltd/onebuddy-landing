export interface IndustryPageData {
  slug: string;
  industry: string;
  seoTitle: string;
  metaDescription: string;
  h1: string;
  heroSubtitle: string;
  painPoints: { problem: string; solution: string }[];
  featureMappings: { feature: string; benefit: string; icon: string }[];
  closingTitle: string;
  closingSubtitle: string;
  keywords: string[];
  relatedLinks: { label: string; href: string }[];
}

export const industryPagesData: IndustryPageData[] = [
  {
    slug: 'best-chrome-extension-for-lawyers',
    industry: 'Lawyers',
    seoTitle: 'Best Chrome Extension for Lawyers — Privacy, Productivity & Focus',
    metaDescription:
      'OneBuddy is the best Chrome extension for lawyers. Privacy blur for sensitive documents, browser lock for client data, Pomodoro timer for focused work, and clipboard manager for legal research.',
    h1: 'The Best Chrome Extension for Lawyers & Legal Professionals',
    heroSubtitle:
      'Protect client confidentiality, manage research efficiently, and stay focused during long case review sessions — all with one free Chrome extension.',
    painPoints: [
      { problem: 'Accidentally exposing client data during screen shares', solution: 'Privacy Blur lets you click to blur sensitive case details, client names, and financial data before sharing your screen in virtual hearings or team meetings.' },
      { problem: 'Long document review sessions without breaks', solution: 'The Pomodoro timer structures review sessions with focus and break intervals. Health reminders ensure you stand, hydrate, and rest your eyes during extended research.' },
      { problem: 'Losing copied case references across multiple tabs', solution: 'Clipboard history stores your last 100 copies with source URLs. Search through copied statutes, case citations, and legal references without re-visiting each source.' },
      { problem: 'Leaving sensitive tabs open when stepping away', solution: 'Browser Lock password-protects all open tabs with SHA-256 encryption. Auto-lock engages after inactivity for added protection.' },
      { problem: 'Tracking and advertising scripts compromising research privacy', solution: 'Tracker blocker prevents Facebook, Google, and TikTok from tracking your legal research activity. Ad blocker removes distracting advertisements.' },
      { problem: 'Documenting web-based evidence and procedures', solution: 'Full-page screenshots and screen recording capture evidence from websites. Built-in gallery organizes all captures for easy retrieval.' },
    ],
    featureMappings: [
      { feature: 'Privacy Blur', benefit: 'Blur sensitive client information, case details, and financial data before screen sharing. Blurs persist across page revisits.', icon: 'EyeSlash' },
      { feature: 'Browser Lock', benefit: 'Password-protect all tabs with SHA-256 encryption when stepping away from your desk. Auto-lock adds an extra security layer.', icon: 'Lock1' },
      { feature: 'Clipboard Manager', benefit: 'Store and search through copied legal citations, case references, and research notes. Source URL tracking aids attribution.', icon: 'ClipboardText' },
      { feature: 'Pomodoro Timer', benefit: 'Structure long document review sessions with timed focus and break intervals. Screen dim reduces visual distractions.', icon: 'Timer1' },
      { feature: 'Tracker Blocker', benefit: 'Prevent tracking scripts from recording your legal research activity. Protect client confidentiality at the browser level.', icon: 'ShieldSlash' },
      { feature: 'Full Page Screenshot', benefit: 'Capture complete web pages for evidence documentation or procedure reference. Archived in the built-in gallery.', icon: 'Scan' },
      { feature: 'Health Reminders', benefit: 'Stay healthy during long billable hours with reminders to hydrate, stand, and rest your eyes.', icon: 'Heart' },
      { feature: 'Screen Recording', benefit: 'Record browser-based workflows for training new associates or documenting digital procedures.', icon: 'MonitorRecorder' },
    ],
    closingTitle: 'Protect Client Data. Stay Focused. Work Smarter.',
    closingSubtitle: 'One free Chrome extension built for the privacy and productivity demands of legal work.',
    keywords: ['best chrome extension for lawyers', 'lawyer productivity extension', 'legal privacy chrome', 'browser security for attorneys'],
    relatedLinks: [
      { label: 'Privacy Blur', href: '/privacy-blur-extension/' },
      { label: 'Browser Lock', href: '/browser-lock-extension/' },
      { label: 'For Privacy Users', href: '/for-privacy-focused-users/' },
      { label: 'All Features', href: '/features/' },
    ],
  },
  {
    slug: 'best-chrome-extension-for-designers',
    industry: 'Designers',
    seoTitle: 'Best Chrome Extension for Designers — Screenshot, Recording & Focus',
    metaDescription:
      'OneBuddy is the best Chrome extension for designers. Full-page screenshots, screen recording, Pomodoro timer, and clipboard manager for design workflows.',
    h1: 'The Best Chrome Extension for Designers & Creatives',
    heroSubtitle:
      'Capture full-page designs, record walkthroughs, manage inspiration snippets, and stay focused during creative work — all with one free Chrome extension.',
    painPoints: [
      { problem: 'Capturing full-page website designs for reference', solution: 'Full-page screenshot uses scroll-and-stitch technology to capture entire web pages as a single image, regardless of page length.' },
      { problem: 'Recording design walkthroughs for client feedback', solution: 'Screen and tab recording with no time limits or watermarks. Record presentations, prototype walkthroughs, and client review sessions.' },
      { problem: 'Losing copied color values, URLs, and inspiration snippets', solution: 'Clipboard history stores 100 items with source URLs. Search through copied design tokens, hex codes, and reference links.' },
      { problem: 'Managing creative focus during long design sessions', solution: 'Pomodoro timer with screen dim helps maintain creative focus. Regular breaks prevent creative burnout.' },
      { problem: 'Ad-heavy inspiration sites disrupting the creative flow', solution: 'Ad blocker removes banner ads, popups, and overlays from design inspiration sites like Dribbble, Behance, and Pinterest.' },
      { problem: 'Eye strain during extended screen time', solution: 'The 20-20-20 eye break rule and health reminders protect your eyes during long pixel-pushing sessions.' },
    ],
    featureMappings: [
      { feature: 'Full Page Screenshot', benefit: 'Capture entire web page designs in a single image for reference, competitive analysis, or client presentations.', icon: 'Scan' },
      { feature: 'Screen Recording', benefit: 'Record design walkthroughs, prototype demonstrations, and tutorial content with no time limits or watermarks.', icon: 'MonitorRecorder' },
      { feature: 'Clipboard Manager', benefit: 'Store copied color values, font names, CSS snippets, and design URLs. Search and reuse across projects.', icon: 'ClipboardText' },
      { feature: 'Pomodoro Timer', benefit: 'Maintain creative focus with structured work intervals. Screen dim reduces visual noise during deep creative work.', icon: 'Timer1' },
      { feature: 'Ad Blocker', benefit: 'Browse inspiration sites like Dribbble and Behance without ad interruptions. Cleaner pages, better focus.', icon: 'Forbidden2' },
      { feature: 'Health Reminders', benefit: 'Prevent eye strain and physical discomfort during long design sessions with automated wellness reminders.', icon: 'Heart' },
      { feature: 'Privacy Blur', benefit: 'Blur client-sensitive content when presenting your browser during design review meetings.', icon: 'EyeSlash' },
      { feature: 'Bookmark Manager', benefit: 'Organize design inspiration, component libraries, and documentation links with side panel bookmark access.', icon: 'Bookmark2' },
    ],
    closingTitle: 'Design Better. Capture Everything. Stay Inspired.',
    closingSubtitle: 'One free Chrome extension for every designer\'s browser workflow.',
    keywords: ['best chrome extension for designers', 'designer productivity extension', 'screenshot extension for designers', 'design workflow chrome'],
    relatedLinks: [
      { label: 'Full Page Screenshot', href: '/full-page-screenshot-extension/' },
      { label: 'Screen Recorder', href: '/screen-recorder-extension/' },
      { label: 'For Content Creators', href: '/for-content-creators/' },
      { label: 'All Features', href: '/features/' },
    ],
  },
  {
    slug: 'best-chrome-extension-for-marketers',
    industry: 'Marketers',
    seoTitle: 'Best Chrome Extension for Marketers — Privacy, Capture & Productivity',
    metaDescription:
      'OneBuddy is the best Chrome extension for marketers. Tracker blocking for competitive research, screen capture for reporting, and productivity tools for campaign management.',
    h1: 'The Best Chrome Extension for Marketers & Growth Teams',
    heroSubtitle:
      'Research competitors privately, capture campaign evidence, manage content workflows, and stay productive during busy launch periods — all with one free extension.',
    painPoints: [
      { problem: 'Competitor research being tracked by their analytics', solution: 'Tracker blocker prevents competitor websites from tracking your visits via Facebook Pixel, Google Analytics, and other tracking scripts.' },
      { problem: 'Capturing campaign screenshots for reporting', solution: 'Full-page screenshots capture entire landing pages. Screen recording documents user flows and A/B test variants for stakeholder presentations.' },
      { problem: 'Losing copied URLs, UTM parameters, and ad copy', solution: 'Clipboard history stores 100 items with source URLs. Never lose a copied campaign link, ad copy snippet, or analytics data point again.' },
      { problem: 'Ad-heavy competitor sites slowing down research', solution: 'Ad blocker removes competitor ads and popups, letting you analyze their content and structure without distraction.' },
      { problem: 'Managing focus during campaign deadlines', solution: 'Pomodoro timer structures intense work periods. Health reminders keep you physically well during crunch times.' },
      { problem: 'Sharing screens with sensitive analytics data visible', solution: 'Privacy blur hides sensitive metrics, account details, and client data before screen shares and presentations.' },
    ],
    featureMappings: [
      { feature: 'Tracker Blocker', benefit: 'Research competitors without their analytics tracking your visits. Block Facebook Pixel and Google Analytics on rival sites.', icon: 'ShieldSlash' },
      { feature: 'Full Page Screenshot', benefit: 'Capture complete landing pages, email renders, and competitor sites for reports, audits, and presentations.', icon: 'Scan' },
      { feature: 'Screen Recording', benefit: 'Record user flows, A/B test walkthroughs, and bug reports. No time limits or watermarks for professional output.', icon: 'MonitorRecorder' },
      { feature: 'Clipboard Manager', benefit: 'Store copied UTM links, ad copy, analytics data, and campaign URLs. Source tracking aids attribution.', icon: 'ClipboardText' },
      { feature: 'Ad Blocker', benefit: 'Remove competitor advertising from research sites for clean analysis of content, structure, and messaging.', icon: 'Forbidden2' },
      { feature: 'Privacy Blur', benefit: 'Hide sensitive client metrics, account balances, and campaign data during screen share presentations.', icon: 'EyeSlash' },
      { feature: 'Notes & Shortcuts', benefit: 'Store campaign templates, standard UTM structures, and reusable ad copy with slash shortcut auto-expansion.', icon: 'DocumentText' },
      { feature: 'Pomodoro Timer', benefit: 'Structure work during campaign launches and deadline crunches. Stay focused without burning out.', icon: 'Timer1' },
    ],
    closingTitle: 'Research Privately. Capture Everything. Launch Faster.',
    closingSubtitle: 'One free Chrome extension for every marketer\'s competitive edge.',
    keywords: ['best chrome extension for marketers', 'marketing productivity extension', 'competitive research chrome', 'marketing tools browser'],
    relatedLinks: [
      { label: 'Tracker Blocker', href: '/tracker-blocker-extension/' },
      { label: 'Screen Recorder', href: '/screen-recorder-extension/' },
      { label: 'For Remote Workers', href: '/for-remote-workers/' },
      { label: 'All Features', href: '/features/' },
    ],
  },
  {
    slug: 'best-chrome-extension-for-accountants',
    industry: 'Accountants',
    seoTitle: 'Best Chrome Extension for Accountants — Privacy, Security & Focus',
    metaDescription:
      'OneBuddy is the best Chrome extension for accountants. Privacy blur for financial data, browser lock for client accounts, and focus tools for tax season.',
    h1: 'The Best Chrome Extension for Accountants & Finance Professionals',
    heroSubtitle:
      'Protect sensitive financial data, stay focused during busy season, and manage client research efficiently — all with one free Chrome extension.',
    painPoints: [
      { problem: 'Client financial data visible during screen shares', solution: 'Privacy Blur instantly hides account numbers, balances, and sensitive financial data with persistent, per-page blur that re-applies automatically.' },
      { problem: 'Leaving client portals open when stepping away', solution: 'Browser Lock password-protects all tabs with SHA-256 hashing. Auto-lock engages after inactivity to secure client data.' },
      { problem: 'Long tax preparation sessions without breaks', solution: 'Pomodoro timer structures work sessions. Health reminders ensure you hydrate, stand, and rest your eyes during busy season.' },
      { problem: 'Tracking scripts from financial sites collecting browsing data', solution: 'Tracker blocker prevents financial service trackers from building profiles of your research and browsing patterns.' },
      { problem: 'Losing copied figures, reference numbers, and account details', solution: 'Clipboard history stores 100 items with source tracking. Search through copied tax references, client IDs, and financial data.' },
      { problem: 'Documenting web-based procedures for audit trails', solution: 'Full-page screenshots and screen recording create visual documentation for audit trails and client records.' },
    ],
    featureMappings: [
      { feature: 'Privacy Blur', benefit: 'Hide client account numbers, balances, and tax data during screen shares and presentations. Blurs persist across visits.', icon: 'EyeSlash' },
      { feature: 'Browser Lock', benefit: 'Secure all open client portals with one-click password locking. SHA-256 encryption and auto-lock on inactivity.', icon: 'Lock1' },
      { feature: 'Pomodoro Timer', benefit: 'Maintain accuracy during long tax preparation sessions with structured focus intervals and mandatory breaks.', icon: 'Timer1' },
      { feature: 'Tracker Blocker', benefit: 'Prevent financial service trackers from profiling your research activity across tax and accounting platforms.', icon: 'ShieldSlash' },
      { feature: 'Clipboard Manager', benefit: 'Store and search through copied tax references, client IDs, and regulatory citation numbers.', icon: 'ClipboardText' },
      { feature: 'Health Reminders', benefit: 'Combat the physical toll of busy season with automated reminders to hydrate, stand, and rest your eyes.', icon: 'Heart' },
      { feature: 'Full Page Screenshot', benefit: 'Document web-based financial records and portal screens for audit trails and client files.', icon: 'Scan' },
      { feature: 'Ad Blocker', benefit: 'Remove distracting ads from financial news sites and research platforms for cleaner analysis.', icon: 'Forbidden2' },
    ],
    closingTitle: 'Protect Client Data. Stay Focused. Survive Busy Season.',
    closingSubtitle: 'One free Chrome extension built for the privacy and focus demands of financial work.',
    keywords: ['best chrome extension for accountants', 'accountant productivity extension', 'financial privacy chrome', 'tax season browser tools'],
    relatedLinks: [
      { label: 'Privacy Blur', href: '/privacy-blur-extension/' },
      { label: 'Browser Lock', href: '/browser-lock-extension/' },
      { label: 'For Privacy Users', href: '/for-privacy-focused-users/' },
      { label: 'All Features', href: '/features/' },
    ],
  },
];
