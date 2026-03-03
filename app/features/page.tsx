import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Flash,
  Heart,
  ShieldTick,
  Camera,
  Chrome,
  ArrowRight2,
  Timer1,
  DocumentText,
  ClipboardText,
  TaskSquare,
  Calendar,
  Bookmark2,
  Drop,
  Activity,
  Eye,
  Clock,
  Forbidden2,
  ShieldSlash,
  EyeSlash,
  Lock1,
  MessageText1,
  Gallery,
  Scan,
  VideoPlay,
  MonitorRecorder,
  Category,
  TickCircle,
} from 'iconsax-react';
import { featureClusters } from '@/lib/features-data';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'All Features | OneBuddy',
  description:
    'Explore every OneBuddy feature — productivity tools, health reminders, privacy & security, and screen capture. onebuddy features, all in one chrome extension features.',
  alternates: { canonical: 'https://onebuddy.io/features/' },
  openGraph: {
    title: 'All Features | OneBuddy',
    description:
      'Explore every OneBuddy feature — productivity tools, health reminders, privacy & security, and screen capture. onebuddy features, all in one chrome extension features.',
  },
};

const iconMap: Record<string, any> = {
  Timer1, DocumentText, ClipboardText, TaskSquare, Calendar, Bookmark2,
  Drop, Activity, Eye, Clock, Forbidden2, ShieldSlash, EyeSlash,
  Lock1, MessageText1, Gallery, Scan, VideoPlay, MonitorRecorder, Category,
};

const clusterIconMap: Record<string, any> = {
  Flash, Heart, ShieldTick, Camera,
};

const featureSlugMap: Record<string, string> = {
  'Pomodoro Timer with Screen Dim': '/pomodoro-timer-extension/',
  'Notes with Slash Shortcuts': '/notes-shortcuts-extension/',
  'Clipboard History (100 Items)': '/clipboard-manager-extension/',
  'Habit Tracker': '/habit-tracker-extension/',
  'Google Calendar Integration': '/google-calendar-extension/',
  'Bookmark Manager': '/bookmark-manager-extension/',
  'Drink Water Reminder': '/health-reminder-extension/',
  'Stand Up Reminder': '/health-reminder-extension/',
  'Eye Break (20-20-20 Rule)': '/health-reminder-extension/',
  'Custom Schedules': '/health-reminder-extension/',
  'Ad Blocker': '/ad-blocker-extension/',
  'Tracker Blocker': '/tracker-blocker-extension/',
  'Privacy Blur (Persistent)': '/privacy-blur-extension/',
  'Browser Lock with Password': '/browser-lock-extension/',
  'End-to-End Encrypted Messaging': '/encrypted-messaging-extension/',
  'Visible Tab Screenshot': '/full-page-screenshot-extension/',
  'Full Page Capture': '/full-page-screenshot-extension/',
  'Tab Recording': '/screen-recorder-extension/',
  'Screen Recording': '/screen-recorder-extension/',
  'Built-in Gallery': '/screen-recorder-extension/',
};

export default function FeaturesPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-28 lg:pt-36 pb-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-sm font-semibold text-primary mb-8">
            <TickCircle size={14} color="currentColor" variant="Bold" />
            20+ Features in One Extension
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight mb-6">
            Every Tool You Need, in One Extension
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Explore all of OneBuddy&apos;s features organized into four powerful suites.
            Each feature replaces a standalone extension you no longer need.
          </p>
        </div>
      </section>

      {/* Feature Clusters */}
      {featureClusters.map((cluster) => {
        const ClusterIcon = clusterIconMap[cluster.icon] || Flash;
        return (
          <section
            key={cluster.id}
            id={cluster.id}
            className="py-20 bg-white even:bg-slate-50 border-b border-slate-100"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Cluster Header */}
              <div className="flex items-center gap-4 mb-4">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center"
                  style={{ backgroundColor: cluster.colorLight, color: cluster.color }}
                >
                  <ClusterIcon size={24} color="currentColor" variant="Bold" />
                </div>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                    {cluster.label}
                  </h2>
                  <p className="text-slate-500 text-sm mt-0.5">
                    {cluster.seoDescription}
                  </p>
                </div>
              </div>

              {/* Feature Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
                {cluster.features.map((feature) => {
                  const FeatureIcon = iconMap[feature.icon] || Flash;
                  const href = featureSlugMap[feature.title] || '/#features';
                  return (
                    <Link
                      key={feature.title}
                      href={href}
                      className="feature-card relative group hover:border-primary/30 transition-colors"
                    >
                      {feature.badge && (
                        <span
                          className="absolute top-4 right-4 px-2 py-0.5 text-xs font-bold rounded-full text-white"
                          style={{ backgroundColor: cluster.color }}
                        >
                          {feature.badge}
                        </span>
                      )}
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                        style={{ backgroundColor: cluster.colorLight, color: cluster.color }}
                      >
                        <FeatureIcon size={20} color="currentColor" variant="Bold" />
                      </div>
                      <h3 className="font-bold text-lg mb-2 text-slate-900 group-hover:text-primary transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-slate-500 text-sm leading-relaxed mb-4">
                        {feature.description}
                      </p>
                      <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                        Learn more
                        <ArrowRight2 size={14} color="currentColor" />
                      </span>
                    </Link>
                  );
                })}
              </div>

              {/* Comparison note */}
              <div
                className="flex items-start gap-3 px-5 py-4 rounded-xl text-sm mt-8"
                style={{ backgroundColor: cluster.colorLight }}
              >
                <TickCircle size={18} color="currentColor" variant="Bold" style={{ color: cluster.color }} className="mt-0.5 shrink-0" />
                <span className="text-slate-700 font-medium">{cluster.comparison}</span>
              </div>
            </div>
          </section>
        );
      })}

      {/* CTA */}
      <section className="py-24 bg-slate-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-6">
            All These Features. One Free Extension.
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-10">
            Stop juggling 10 extensions. Install OneBuddy and get every tool you need
            in one lightweight Chrome side panel.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <a
              href={siteConfig.extensionUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-8 py-4 bg-primary hover:bg-primary-light text-white font-bold rounded-full text-lg transition-colors"
            >
              <Chrome size={20} color="currentColor" variant="Bold" />
              Add to Chrome — Free
            </a>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500">
            <span className="flex items-center gap-2">
              <TickCircle size={14} color="currentColor" variant="Bold" className="text-green-400" /> Free forever
            </span>
            <span className="flex items-center gap-2">
              <TickCircle size={14} color="currentColor" variant="Bold" className="text-green-400" /> No credit card
            </span>
            <span className="flex items-center gap-2">
              <TickCircle size={14} color="currentColor" variant="Bold" className="text-green-400" /> Works offline
            </span>
          </div>
        </div>
      </section>
    </>
  );
}
