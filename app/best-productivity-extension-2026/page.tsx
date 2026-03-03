import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Chrome,
  Timer1,
  Clipboard,
  Health,
  ShieldTick,
  VideoPlay,
  Lock1,
  Note,
  Calendar,
  ArrowDown2,
  TickCircle,
  CloseCircle,
  Star1,
  ArrowRight2,
} from 'iconsax-react';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Best All-in-One Productivity Chrome Extension 2026 — OneBuddy',
  description:
    'OneBuddy is the best all-in-one productivity Chrome extension in 2026. Pomodoro timer, clipboard manager, health reminders, ad blocker, screen recorder — all in one free extension.',
  keywords: [
    'best productivity chrome extension 2026',
    'all in one chrome extension',
    'best chrome extension productivity',
    'productivity browser extension free',
    'pomodoro clipboard ad blocker extension',
    'chrome productivity suite',
  ],
  alternates: {
    canonical: 'https://onebuddy.io/best-productivity-extension-2026/',
  },
  openGraph: {
    title: 'Best All-in-One Productivity Chrome Extension 2026 — OneBuddy',
    description:
      'Pomodoro timer, clipboard manager, health reminders, ad blocker, screen recorder, privacy tools — all in one free Chrome extension.',
  },
};

const features = [
  {
    icon: Timer1,
    title: 'Pomodoro Timer with Screen Dim',
    description:
      'Structure your workday with focus and break cycles. Screen dim physically darkens your tab during sessions to reduce visual distractions.',
  },
  {
    icon: Clipboard,
    title: 'Clipboard History Manager',
    description:
      'Store your last 100 copies with instant search, source domain filtering, and one-click paste. Never lose a copied link or snippet again.',
  },
  {
    icon: Health,
    title: 'Health Reminders',
    description:
      'Stand-up, drink water, and 20-20-20 eye break reminders with customizable intervals. Take care of your body during long work sessions.',
  },
  {
    icon: ShieldTick,
    title: 'Ad & Tracker Blocking',
    description:
      'Block YouTube ads, popups, banners, and overlays. Block Facebook, TikTok, and Google trackers with per-service controls.',
  },
  {
    icon: VideoPlay,
    title: 'Screen Recording & Screenshots',
    description:
      'Tab recording with audio, full screen recording at 1080p/30fps, full-page scroll-and-stitch screenshots, and a built-in gallery. No time limits.',
  },
  {
    icon: Lock1,
    title: 'Privacy Blur & Browser Lock',
    description:
      'Click or drag to blur sensitive content on any page. Lock all tabs with a password and auto-lock after inactivity.',
  },
  {
    icon: Note,
    title: 'Notes with Slash Shortcuts',
    description:
      'Create note templates that auto-expand in any text field with slash commands. Perfect for email templates, code snippets, and canned responses.',
  },
  {
    icon: Calendar,
    title: 'Google Calendar & Habits',
    description:
      'View upcoming events in the side panel without switching tabs. Track daily habits with streaks and completion stats.',
  },
];

const alternatives = [
  {
    name: 'Using 5+ separate extensions',
    problem: 'Browser slowdown, extension conflicts, scattered UIs',
    solution: 'OneBuddy replaces Pomodoro, ad blocker, clipboard, recorder, and notes extensions with one lightweight tool',
  },
  {
    name: 'Momentum',
    problem: 'Beautiful new tab page but limited functional productivity tools',
    solution: 'OneBuddy provides 15+ functional tools in a side panel without replacing your new tab',
  },
  {
    name: 'Forest + Marinara + Loom + uBlock',
    problem: 'Four extensions for focus, timing, recording, and ad blocking',
    solution: 'OneBuddy combines all four use cases in one free extension with zero conflicts',
  },
  {
    name: 'Notion Web Clipper',
    problem: 'Single-purpose web clipping that requires a Notion account',
    solution: 'OneBuddy offers notes, clipboard, bookmarks, and more — no external accounts needed',
  },
];

const faqs = [
  {
    q: 'What makes OneBuddy the best productivity extension in 2026?',
    a: 'OneBuddy combines 15+ tools that typically require separate extensions: Pomodoro timer, clipboard manager, health reminders, ad blocker, tracker blocker, screen recorder, screenshot tool, privacy blur, browser lock, encrypted messaging, habit tracker, notes, Google Calendar, and bookmark manager. All free, all in one side panel.',
  },
  {
    q: 'Is OneBuddy really free?',
    a: 'Yes. OneBuddy is 100% free with no premium tier, no feature gating, no ads, and no data selling. Every feature is available to every user. It uses Manifest V3 and stores all data locally.',
  },
  {
    q: 'Does OneBuddy slow down my browser?',
    a: 'OneBuddy is built on Manifest V3, Chrome\'s latest and most efficient extension architecture. It\'s designed to be lightweight, and by replacing multiple extensions with one, it often reduces overall browser resource usage.',
  },
  {
    q: 'How does OneBuddy compare to using multiple separate extensions?',
    a: 'Multiple extensions mean multiple background processes, potential conflicts, and scattered interfaces. OneBuddy consolidates everything into one side panel with shared settings and a unified experience, using fewer resources than the sum of separate tools.',
  },
  {
    q: 'Does OneBuddy work with other browsers?',
    a: 'OneBuddy is currently available as a Chrome extension. It works on all Chromium-based browsers including Chrome, Brave, Edge, and Opera.',
  },
];

export default function BestProductivityExtension2026Page() {
  return (
    <>
      {/* Hero */}
      <section className="pt-28 lg:pt-36 pb-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6">
            <Star1 size={14} color="currentColor" variant="Bold" />
            Best Productivity Extension 2026
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight mb-6">
            The Best All-in-One Productivity Chrome Extension in 2026
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            Stop juggling 5+ browser extensions. OneBuddy packs a Pomodoro timer, clipboard manager,
            health reminders, ad blocker, screen recorder, privacy tools, and more into one free
            Chrome side panel.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={siteConfig.extensionUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary hover:bg-primary-dark text-white font-bold rounded-full text-lg transition-colors"
            >
              <Chrome size={20} color="currentColor" variant="Bold" />
              Add to Chrome — Free
            </a>
            <Link
              href="/#features"
              className="inline-flex items-center gap-2 px-6 py-3 text-slate-700 font-semibold hover:text-primary transition-colors"
            >
              Explore All Features
              <ArrowRight2 size={16} color="currentColor" />
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Summary Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-center mb-4">
            15+ Tools in One Extension
          </h2>
          <p className="text-slate-600 text-center max-w-2xl mx-auto mb-12">
            Everything you need for productivity, health, privacy, and screen capture — accessible
            from a single side panel.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f) => (
              <div
                key={f.title}
                className="bg-slate-50 rounded-2xl p-6 border border-slate-100 hover:border-primary/20 transition-colors"
              >
                <f.icon size={28} color="currentColor" variant="Bold" className="text-primary mb-4" />
                <h3 className="font-bold text-slate-900 mb-2">{f.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison to Alternatives */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-center mb-4">
            Why OneBuddy Beats the Alternatives
          </h2>
          <p className="text-slate-600 text-center max-w-2xl mx-auto mb-12">
            See how OneBuddy compares to common productivity setups.
          </p>
          <div className="space-y-5">
            {alternatives.map((alt) => (
              <div
                key={alt.name}
                className="bg-white rounded-2xl border border-slate-100 p-6"
              >
                <h3 className="font-bold text-slate-900 mb-3">{alt.name}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex gap-3">
                    <CloseCircle
                      size={18}
                      color="currentColor"
                      className="text-red-400 shrink-0 mt-0.5"
                    />
                    <span className="text-slate-600 text-sm">{alt.problem}</span>
                  </div>
                  <div className="flex gap-3">
                    <TickCircle
                      size={18}
                      color="currentColor"
                      variant="Bold"
                      className="text-green-500 shrink-0 mt-0.5"
                    />
                    <span className="text-slate-700 text-sm">{alt.solution}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-center mb-10">
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <details
                key={idx}
                className="group bg-slate-50 rounded-2xl border border-slate-100 overflow-hidden"
              >
                <summary className="flex items-center justify-between p-5 sm:p-6 cursor-pointer list-none hover:bg-slate-100/50 transition-colors">
                  <span className="font-semibold text-slate-900 pr-4">{faq.q}</span>
                  <ArrowDown2
                    size={20}
                    color="currentColor"
                    className="text-slate-400 shrink-0 group-open:rotate-180 transition-transform"
                  />
                </summary>
                <div className="px-5 sm:px-6 pb-5 sm:pb-6 text-slate-600 leading-relaxed text-sm">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-white mb-5">
            Replace 10+ Extensions with One
          </h2>
          <p className="text-slate-400 mb-8">
            Pomodoro timer, clipboard manager, health reminders, ad blocker, screen recorder,
            privacy tools — all free, all in one Chrome extension.
          </p>
          <a
            href={siteConfig.extensionUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary hover:bg-primary-light text-white font-bold rounded-full text-lg transition-colors"
          >
            <Chrome size={20} color="currentColor" variant="Bold" />
            Add to Chrome — Free
          </a>
        </div>
      </section>

      {/* Related Links */}
      <section className="py-12 bg-slate-50 border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="font-bold text-sm uppercase tracking-wider text-slate-400 mb-4">
            Related Pages
          </h3>
          <div className="flex flex-wrap gap-3">
            {[
              { label: 'For Remote Workers', href: '/for-remote-workers/' },
              { label: 'For Students', href: '/for-students/' },
              { label: 'uBlock Origin Alternative', href: '/alternative-to-ublock-origin/' },
              { label: 'Loom Alternative', href: '/alternative-to-loom/' },
              { label: 'OneBuddy vs Momentum', href: '/onebuddy-vs-momentum/' },
              { label: 'All Features', href: '/#features' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 bg-white rounded-full border border-slate-200 text-sm font-medium text-slate-600 hover:border-primary/30 hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
