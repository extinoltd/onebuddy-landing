import type { Metadata } from 'next';
import { UseCasePageLayout } from '@/components/UseCasePage';

export const metadata: Metadata = {
  title: 'Best Chrome Extension for Knowledge Workers — OneBuddy',
  description:
    'OneBuddy is the best productivity extension for knowledge workers. Clipboard manager for research, notes with slash shortcuts, bookmark organizer, Pomodoro timer, Google Calendar, and health reminders — all in one free Chrome extension.',
  keywords: [
    'best chrome extension for knowledge workers',
    'knowledge worker productivity extension',
    'clipboard manager research',
    'information management chrome',
    'bookmark organizer extension',
    'focus tools knowledge workers',
  ],
  alternates: {
    canonical: 'https://onebuddy.io/for-knowledge-workers/',
  },
  openGraph: {
    title: 'OneBuddy for Knowledge Workers — Your Complete Browser Toolkit',
    description:
      'Clipboard manager, notes, bookmarks, Pomodoro timer, Google Calendar, and health reminders — one free extension for knowledge workers.',
  },
};

export default function ForKnowledgeWorkersPage() {
  return (
    <UseCasePageLayout
      persona="Knowledge Workers"
      heroTitle="The All-in-One Chrome Extension for Knowledge Workers"
      heroSubtitle="Capture every copied insight, organize research with notes and bookmarks, stay focused with Pomodoro, and never miss a meeting — all in one free extension built for information-heavy work."
      painPoints={[
        {
          problem: 'Losing copied research, data points, and key findings across dozens of tabs',
          solution:
            'Clipboard History stores your last 100 copies with full-text search and source domain filtering. Retrieve that statistic, quote, or URL you copied hours ago in seconds.',
        },
        {
          problem: 'No quick way to store and reuse text templates and notes',
          solution:
            'Notes with Slash Shortcuts let you store reusable templates, standard responses, and reference text. Type a slash command in any text field to auto-expand your saved content.',
        },
        {
          problem: 'Bookmarks buried in nested folders and impossible to find quickly',
          solution:
            'The Bookmark Manager provides side-panel access to organized bookmarks. Browse, search, and open saved resources without leaving your current workflow.',
        },
        {
          problem: 'Deep research sessions lost to email notifications and tab distractions',
          solution:
            'The Pomodoro Timer with Screen Dim structures focused research intervals. Screen dim physically darkens your tab to reinforce concentration during critical analysis.',
        },
        {
          problem: 'Switching tabs to check calendar disrupts research flow',
          solution:
            'Google Calendar Integration shows upcoming meetings, deadlines, and events right in the side panel. Chrome alarm notifications keep you on schedule without context switching.',
        },
        {
          problem: 'Sedentary work habits during long research and analysis sessions',
          solution:
            'Health Reminders ping you to hydrate, stand, and rest your eyes at customizable intervals. The 20-20-20 Eye Break rule protects your vision during extended reading.',
        },
      ]}
      featureMappings={[
        {
          feature: 'Clipboard History',
          benefit:
            'Never lose a copied insight, data point, or URL again. 100-item history with full-text search and source URL tracking makes information retrieval instant.',
          icon: 'Clipboard',
        },
        {
          feature: 'Notes & Slash Shortcuts',
          benefit:
            'Store research templates, meeting agendas, and reusable text blocks. Slash shortcuts auto-expand saved content in any text field across the browser.',
          icon: 'Document',
        },
        {
          feature: 'Bookmark Manager',
          benefit:
            'Organize research sources, reference documents, and key resources in the side panel. Quick access without leaving your current workflow.',
          icon: 'Bookmark',
        },
        {
          feature: 'Pomodoro Timer with Screen Dim',
          benefit:
            'Structure deep research sessions with focused intervals and mandatory breaks. Screen dim reinforces concentration during critical analysis work.',
          icon: 'Timer',
        },
        {
          feature: 'Google Calendar Integration',
          benefit:
            'View upcoming meetings and deadlines in the side panel without switching tabs. Stay on schedule while maintaining research focus.',
          icon: 'Calendar',
        },
        {
          feature: 'Health Reminders (Water, Stand, Eyes)',
          benefit:
            'Combat sedentary research habits with automated reminders. Customizable intervals for hydration, standing, and eye rest fit any work pattern.',
          icon: 'Heart',
        },
        {
          feature: 'Ad & Tracker Blocker',
          benefit:
            'Faster loading on research sites, news platforms, and documentation pages. Fewer distractions mean deeper focus on the content that matters.',
          icon: 'Shield',
        },
        {
          feature: 'Screen Capture & Recording',
          benefit:
            'Capture full-page research documents and record walkthrough presentations. Share findings with colleagues through async screen recordings.',
          icon: 'Video',
        },
      ]}
      closingTitle="Capture Knowledge. Stay Focused. Work Smarter."
      closingSubtitle="Join knowledge workers who simplified their browser with one free extension. Research, organize, focus, and deliver — all from a single side panel."
      relatedLinks={[
        { label: 'Clipboard Manager', href: '/clipboard-manager-extension/' },
        { label: 'Notes & Shortcuts', href: '/notes-shortcuts-extension/' },
        { label: 'For Remote Workers', href: '/for-remote-workers/' },
        { label: 'Pomodoro Timer', href: '/pomodoro-timer-extension/' },
      ]}
    />
  );
}
