import type { Metadata } from 'next';
import { UseCasePageLayout } from '@/components/UseCasePage';

export const metadata: Metadata = {
  title: 'Best Chrome Extension for Students — OneBuddy',
  description:
    'OneBuddy is the best productivity extension for students. Pomodoro study timer, break reminders, ad blocker, notes, clipboard history, and habit tracker — all in one free Chrome extension.',
  keywords: [
    'best chrome extension for students',
    'study timer chrome extension',
    'pomodoro timer for students',
    'student productivity extension',
    'free study tools chrome',
    'break reminder for studying',
  ],
  alternates: {
    canonical: 'https://onebuddy.io/for-students/',
  },
  openGraph: {
    title: 'OneBuddy for Students — Study Smarter, Not Harder',
    description:
      'Pomodoro timer, break reminders, ad blocker, notes with shortcuts, and more. One free extension to ace your studies.',
  },
};

export default function ForStudentsPage() {
  return (
    <UseCasePageLayout
      persona="Students"
      heroTitle="The Study Companion Built Into Your Browser"
      heroSubtitle="From late-night research sessions to exam prep marathons — OneBuddy gives you a Pomodoro study timer, health reminders, distraction-free browsing, and smart notes, all free and all in one extension."
      painPoints={[
        {
          problem: 'Getting distracted by ads and social media while researching',
          solution:
            'OneBuddy\'s ad blocker removes YouTube ads, site popups, and banners. The tracker blocker prevents Facebook and TikTok from following your study sessions.',
        },
        {
          problem: 'Studying for hours without breaks leads to burnout',
          solution:
            'The Pomodoro Timer structures study sessions with breaks. Health reminders prompt you to hydrate and stretch. The 20-20-20 eye break rule protects your vision.',
        },
        {
          problem: 'Losing copied research snippets and reference material',
          solution:
            'Clipboard History saves your last 100 copies with source URLs. Search and filter by domain to find that quote you copied 3 hours ago.',
        },
        {
          problem: 'Typing the same email templates and citation formats repeatedly',
          solution:
            'Notes with Slash Shortcuts let you type /cite or /email in any text field to auto-expand saved templates. Like TextExpander, but free and built-in.',
        },
        {
          problem: 'Struggling to build consistent study habits',
          solution:
            'The Habit Tracker helps you build daily routines — "study 2 hours", "review flashcards", "read 30 pages" — with streak tracking and visual progress.',
        },
        {
          problem: 'Needing screenshots and recordings for projects and presentations',
          solution:
            'Capture visible tabs, full scrolling pages, or record your screen — all free with no time limits. Built-in gallery organizes captures for easy access.',
        },
      ]}
      featureMappings={[
        {
          feature: 'Pomodoro Study Timer',
          benefit:
            'Scientifically-backed focus technique with customizable sessions (1-120 min). Screen dim mode darkens distracting content during focus periods. Track daily sessions completed.',
          icon: 'Timer',
        },
        {
          feature: 'Break & Health Reminders',
          benefit:
            'Avoid burnout with water, standing, and eye break reminders. Set custom intervals that match your study schedule — from 15-minute micro breaks to 90-minute deep sessions.',
          icon: 'Heart',
        },
        {
          feature: 'Ad & Distraction Blocker',
          benefit:
            'Remove YouTube ads so you can watch educational videos uninterrupted. Block site popups, banners, and overlays that break your concentration.',
          icon: 'Ban',
        },
        {
          feature: 'Clipboard History (100 Items)',
          benefit:
            'Research involves copying from dozens of sources. Never lose a quote, URL, or code snippet — search your copy history by content or source domain.',
          icon: 'Clipboard',
        },
        {
          feature: 'Notes with Slash Shortcuts',
          benefit:
            'Create reusable templates for citations, email replies, code boilerplate. Type your shortcut (e.g., /apa) in any text field to auto-expand instantly.',
          icon: 'FileText',
        },
        {
          feature: 'Habit Tracker',
          benefit:
            'Build and maintain study habits with daily check-offs and streak tracking. Visual progress keeps you accountable throughout the semester.',
          icon: 'Target',
        },
        {
          feature: 'Screen Capture & Recording',
          benefit:
            'Capture lecture screenshots, record video presentations, or create tutorial walkthroughs for study groups. Full-page capture for long articles and papers.',
          icon: 'Camera',
        },
        {
          feature: 'Bookmark Manager',
          benefit:
            'Organize research bookmarks into folders right from the side panel. Search across all bookmarks — no more lost reference links.',
          icon: 'Bookmark',
        },
      ]}
      closingTitle="Study Smarter, Starting Now"
      closingSubtitle="Join thousands of students who boosted their productivity with one free extension. Focus better, stay healthy, get more done."
      relatedLinks={[
        { label: 'For Remote Workers', href: '/for-remote-workers/' },
        { label: 'uBlock Origin Alternative', href: '/alternative-to-ublock-origin/' },
        { label: 'Ghostery Alternative', href: '/alternative-to-ghostery/' },
        { label: 'All Features', href: '/#features' },
        { label: 'FAQ', href: '/#faq' },
      ]}
    />
  );
}
