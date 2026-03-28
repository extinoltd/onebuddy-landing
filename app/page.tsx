import Link from 'next/link';
import {
  Chrome,
  ArrowRight2,
  Star1,
  Gift,
  ShieldTick,
  Cpu,
  Global,
  TickCircle,
  Flash,
  Timer1,
  DocumentText,
  ClipboardText,
  TaskSquare,
  Calendar,
  Bookmark2,
  Drop,
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
  Heart,
  Camera,
  ArrowDown2,
  CloseCircle,
  Profile2User,
  NotificationBing,
  Activity,
  TrendDown,
  Element3,
} from 'iconsax-react';
import { siteConfig } from '@/lib/site-config';
import { FloatingCTA } from '@/components/FloatingCTA';
import { featureClusters, problemExtensions } from '@/lib/features-data';
import { FAQSection } from '@/components/FAQ';
import { ComparisonTable } from '@/components/ComparisonTable';
import { SupportSection } from '@/components/SupportSection';

const iconMap: Record<string, any> = {
  Timer1, DocumentText, ClipboardText, TaskSquare, Calendar, Bookmark2,
  Drop, Activity, Eye, Clock, Forbidden2, ShieldSlash, EyeSlash,
  Lock1, MessageText1, Gallery, Scan, VideoPlay, MonitorRecorder, Category,
  Heart, ShieldTick, Camera, Flash, NotificationBing,
  Gift, Cpu, Global, TickCircle,
};

const clusterIconMap: Record<string, any> = {
  Flash, Heart, ShieldTick, Camera,
};

export default function HomePage() {
  return (
    <>
      <FloatingCTA />

      {/* ==================== HERO ==================== */}
      <section className="relative pt-28 lg:pt-36 pb-24 overflow-hidden bg-white">
        <div className="absolute inset-0 dot-pattern opacity-40 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-sm font-semibold text-primary mb-8 animate-fade-up">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              100% Free &middot; No Data Selling &middot; Manifest V3
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.08] mb-6 animate-fade-up" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
              One Extension.{' '}
              <span className="text-primary">Everything You Need.</span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-up" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
              Productivity, Health Reminders, Focus Timer, Privacy Tools &amp; Screen Capture
              — All Inside One Chrome Side Panel. Stop installing 10 extensions.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 animate-fade-up" style={{ animationDelay: '0.3s', animationFillMode: 'both' }}>
              <a
                href={siteConfig.extensionUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-8 py-4 bg-primary hover:bg-primary-dark text-white font-bold rounded-full text-lg transition-colors"
              >
                <Chrome size={20} color="currentColor" variant="Bold" />
                Add to Chrome — Free
              </a>
              <a
                href="#how-it-works"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white hover:bg-slate-50 text-slate-800 font-semibold rounded-full border border-slate-200 transition-colors"
              >
                See How It Works
                <ArrowRight2 size={18} color="currentColor" />
              </a>
            </div>

            {/* Social Proof */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500 animate-fade-up" style={{ animationDelay: '0.4s', animationFillMode: 'both' }}>
              <div className="flex items-center gap-1.5">
                <div className="flex -space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star1 key={i} size={14} color="currentColor" variant="Bold" className="text-amber-400" />
                  ))}
                </div>
                <span className="font-semibold text-slate-700">4.9/5</span>
                <span>rating</span>
              </div>
              <div className="w-px h-4 bg-slate-300" />
              <div className="flex items-center gap-1.5">
                <Profile2User size={14} color="currentColor" />
                <span><span className="font-semibold text-slate-700">10,000+</span> active users</span>
              </div>
              <div className="w-px h-4 bg-slate-300 hidden sm:block" />
              <div className="flex items-center gap-1.5 hidden sm:flex">
                <Global size={14} color="currentColor" />
                <span><span className="font-semibold text-slate-700">40+</span> languages</span>
              </div>
            </div>
          </div>

          {/* Hero Mascot */}
          <div className="mt-16 flex justify-center animate-fade-up" style={{ animationDelay: '0.5s', animationFillMode: 'both' }}>
            <img
              src="/new/goodmorning.png"
              alt="OneBuddy mascot"
              className="w-40 h-40 sm:w-48 sm:h-48 drop-shadow-xl"
              width={192}
              height={192}
            />
          </div>
        </div>
      </section>

      {/* ==================== TRUST BAR ==================== */}
      <section className="py-12 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              { label: '100% Free', Icon: Gift, color: 'text-green-600' },
              { label: 'No Data Selling', Icon: ShieldTick, color: 'text-primary' },
              { label: 'Local-First Storage', Icon: Cpu, color: 'text-blue-600' },
              { label: '40+ Languages', Icon: Global, color: 'text-cyan-600' },
              { label: 'Manifest V3', Icon: TickCircle, color: 'text-emerald-600' },
              { label: 'Lightweight', Icon: Flash, color: 'text-amber-500' },
            ].map(({ label, Icon, color }) => (
              <div
                key={label}
                className="flex items-center gap-3 justify-center px-4 py-3 rounded-xl bg-slate-50 border border-slate-100"
              >
                <Icon size={20} className={color} color="currentColor" variant="Bold" />
                <span className="font-semibold text-sm text-slate-700">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== PROBLEM SECTION ==================== */}
      <section id="how-it-works" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-red-600 text-sm font-semibold mb-4">
              <TrendDown size={14} color="currentColor" variant="Bold" />
              The Problem
            </div>
            <img
              src="/new/sad.png"
              alt="Overwhelmed by too many extensions"
              className="w-24 h-24 mx-auto mb-4 drop-shadow-md"
              width={96}
              height={96}
            />
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-5">
              Tired of Managing{' '}
              <span className="text-red-500">Too Many Extensions?</span>
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              The average power user installs 8-12 extensions. Each one slows your browser,
              creates conflicts, and fragments your workflow.
            </p>
          </div>

          {/* Extension Grid - Before */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 max-w-4xl mx-auto mb-12">
            {problemExtensions.map((ext) => {
              const Icon = iconMap[ext.icon] || Element3;
              return (
                <div
                  key={ext.name}
                  className="flex flex-col items-center gap-2 p-4 bg-white rounded-xl border border-slate-200 text-center opacity-60"
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: ext.color + '15', color: ext.color }}
                  >
                    <Icon size={20} color="currentColor" variant="Bold" />
                  </div>
                  <span className="text-xs font-medium text-slate-500">{ext.name}</span>
                  <CloseCircle size={14} color="currentColor" variant="Bold" className="text-red-400" />
                </div>
              );
            })}
          </div>

          {/* Arrow */}
          <div className="flex justify-center mb-12">
            <div className="flex flex-col items-center gap-2">
              <ArrowDown2 size={32} color="currentColor" className="text-primary" />
              <span className="text-sm font-bold text-primary uppercase tracking-wider">
                Replace all with
              </span>
            </div>
          </div>

          {/* OneBuddy - After */}
          <div className="max-w-lg mx-auto">
            <div className="bg-white rounded-2xl border-2 border-primary/30 p-8 text-center shadow-sm">
              <img
                src="/logo.png"
                alt="OneBuddy"
                className="w-16 h-16 rounded-2xl mx-auto mb-4"
                width={64}
                height={64}
              />
              <h3 className="text-2xl font-extrabold mb-2">OneBuddy</h3>
              <p className="text-slate-600 mb-4">
                One Extension. All Your Tools. Zero Clutter.
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {['Productivity', 'Health', 'Privacy', 'Capture'].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== FEATURE CLUSTERS ==================== */}
      <section id="features" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-5">
              Everything You Need,{' '}
              <span className="text-primary">Beautifully Organized</span>
            </h2>
            <p className="text-lg text-slate-600">
              Four powerful suites working together in one unified side panel. Each feature is
              designed to replace a standalone extension.
            </p>
          </div>

          {featureClusters.map((cluster) => {
            const ClusterIcon = clusterIconMap[cluster.icon] || Flash;
            return (
              <div key={cluster.id} id={cluster.id} className="mb-24 last:mb-0 scroll-mt-24">
                {/* Cluster Header */}
                <div className="flex items-center gap-4 mb-10">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center"
                    style={{ backgroundColor: cluster.colorLight, color: cluster.color }}
                  >
                    <ClusterIcon size={24} color="currentColor" variant="Bold" />
                  </div>
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                      {cluster.seoTitle.split('—')[0].trim()}
                    </h3>
                    <p className="text-slate-500 text-sm mt-0.5">{cluster.label}</p>
                  </div>
                </div>

                {/* Feature Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-6">
                  {cluster.features.map((feature) => {
                    const FeatureIcon = iconMap[feature.icon] || Flash;
                    return (
                      <div
                        key={feature.title}
                        className="feature-card relative"
                      >
                        {feature.badge && (
                          <span
                            className="absolute top-4 right-4 px-2 py-0.5 text-xs font-bold rounded-full text-white"
                            style={{ backgroundColor: cluster.color }}
                          >
                            {feature.badge}
                          </span>
                        )}
                        {feature.image ? (
                          <img
                            src={feature.image}
                            alt={feature.title}
                            className="w-14 h-14 rounded-full object-cover mb-4 shadow-sm"
                            width={56}
                            height={56}
                            loading="lazy"
                          />
                        ) : (
                          <div
                            className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                            style={{ backgroundColor: cluster.colorLight, color: cluster.color }}
                          >
                            <FeatureIcon size={20} color="currentColor" variant="Bold" />
                          </div>
                        )}
                        <h4 className="font-bold text-lg mb-2 text-slate-900">{feature.title}</h4>
                        <p className="text-slate-500 text-sm leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    );
                  })}
                </div>

                {/* Comparison note */}
                <div
                  className="flex items-start gap-3 px-5 py-4 rounded-xl text-sm"
                  style={{ backgroundColor: cluster.colorLight }}
                >
                  <TickCircle size={18} color="currentColor" variant="Bold" style={{ color: cluster.color }} className="mt-0.5 shrink-0" />
                  <span className="text-slate-700 font-medium">{cluster.comparison}</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ==================== COMPARISON TABLE ==================== */}
      <ComparisonTable />

      {/* ==================== TESTIMONIALS ==================== */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
              Loved by <span className="text-primary">Thousands</span> of Users
            </h2>
            <p className="text-slate-500">Join 10,000+ people who simplified their browser</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                quote: 'I replaced 8 extensions with OneBuddy. My browser is faster, cleaner, and I actually remember to drink water now.',
                name: 'Sarah K.',
                role: 'Remote Product Designer',
                rating: 5,
              },
              {
                quote: 'The Pomodoro timer with screen dim is genius. Combined with the clipboard history, this is the only productivity tool I need.',
                name: 'Marcus T.',
                role: 'Full-Stack Developer',
                rating: 5,
              },
              {
                quote: 'Privacy blur alone is worth it. I can screen share without worrying about sensitive data. The ad blocker is a bonus.',
                name: 'Elena R.',
                role: 'Freelance Journalist',
                rating: 5,
              },
            ].map((t, i) => (
              <div
                key={i}
                className="bg-slate-50 rounded-2xl p-8 border border-slate-100"
              >
                <div className="flex gap-0.5 mb-4">
                  {[...Array(t.rating)].map((_, j) => (
                    <Star1 key={j} size={16} color="currentColor" variant="Bold" className="text-amber-400" />
                  ))}
                </div>
                <p className="text-slate-700 leading-relaxed mb-6">&ldquo;{t.quote}&rdquo;</p>
                <div>
                  <div className="font-bold text-slate-900">{t.name}</div>
                  <div className="text-sm text-slate-500">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== FAQ ==================== */}
      <FAQSection />

      {/* ==================== SUPPORT / DONATE ==================== */}
      <SupportSection />

      {/* ==================== FINAL CTA ==================== */}
      <section className="py-24 bg-slate-900 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-6">
            Stop Installing 10 Extensions.
            <br />
            <span className="text-primary-light">Install OneBuddy.</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-10">
            Join 10,000+ users who simplified their browser with one free extension for
            productivity, health, privacy, and screen capture.
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

      {/* ==================== SEO INTERNAL LINKS ==================== */}
      <section className="py-16 bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-sm uppercase tracking-wider text-slate-400 mb-4">
                Popular Features
              </h3>
              <ul className="space-y-2">
                <li><Link href="/pomodoro-timer-extension/" className="text-sm text-slate-600 hover:text-primary transition-colors">Pomodoro Timer</Link></li>
                <li><Link href="/ad-blocker-extension/" className="text-sm text-slate-600 hover:text-primary transition-colors">Ad Blocker</Link></li>
                <li><Link href="/privacy-blur-extension/" className="text-sm text-slate-600 hover:text-primary transition-colors">Privacy Blur</Link></li>
                <li><Link href="/screen-recorder-extension/" className="text-sm text-slate-600 hover:text-primary transition-colors">Screen Recorder</Link></li>
                <li><Link href="/clipboard-manager-extension/" className="text-sm text-slate-600 hover:text-primary transition-colors">Clipboard Manager</Link></li>
                <li><Link href="/browser-lock-extension/" className="text-sm text-slate-600 hover:text-primary transition-colors">Browser Lock</Link></li>
                <li><Link href="/features/" className="text-sm text-primary font-semibold hover:text-primary-dark transition-colors">View All Features →</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-sm uppercase tracking-wider text-slate-400 mb-4">
                Alternative To
              </h3>
              <ul className="space-y-2">
                <li><Link href="/alternative-to-ublock-origin/" className="text-sm text-slate-600 hover:text-primary transition-colors">uBlock Origin Alternative</Link></li>
                <li><Link href="/alternative-to-ghostery/" className="text-sm text-slate-600 hover:text-primary transition-colors">Ghostery Alternative</Link></li>
                <li><Link href="/alternative-to-loom/" className="text-sm text-slate-600 hover:text-primary transition-colors">Loom Alternative (Free)</Link></li>
                <li><Link href="/alternative-to-stretchly/" className="text-sm text-slate-600 hover:text-primary transition-colors">Stretchly Alternative</Link></li>
                <li><Link href="/alternative-to-marina-pomodoro/" className="text-sm text-slate-600 hover:text-primary transition-colors">Marinara Pomodoro Alternative</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-sm uppercase tracking-wider text-slate-400 mb-4">
                Use Cases
              </h3>
              <ul className="space-y-2">
                <li><Link href="/for-remote-workers/" className="text-sm text-slate-600 hover:text-primary transition-colors">For Remote Workers</Link></li>
                <li><Link href="/for-students/" className="text-sm text-slate-600 hover:text-primary transition-colors">For Students</Link></li>
                <li><Link href="/for-developers/" className="text-sm text-slate-600 hover:text-primary transition-colors">For Developers</Link></li>
                <li><Link href="/for-content-creators/" className="text-sm text-slate-600 hover:text-primary transition-colors">For Content Creators</Link></li>
                <li><Link href="/for-freelancers/" className="text-sm text-slate-600 hover:text-primary transition-colors">For Freelancers</Link></li>
                <li><Link href="/for-privacy-focused-users/" className="text-sm text-slate-600 hover:text-primary transition-colors">For Privacy Users</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-sm uppercase tracking-wider text-slate-400 mb-4">
                Comparisons
              </h3>
              <ul className="space-y-2">
                <li><Link href="/onebuddy-vs-ublock/" className="text-sm text-slate-600 hover:text-primary transition-colors">OneBuddy vs uBlock Origin</Link></li>
                <li><Link href="/onebuddy-vs-loom/" className="text-sm text-slate-600 hover:text-primary transition-colors">OneBuddy vs Loom</Link></li>
                <li><Link href="/onebuddy-vs-forest/" className="text-sm text-slate-600 hover:text-primary transition-colors">OneBuddy vs Forest</Link></li>
                <li><Link href="/onebuddy-vs-momentum/" className="text-sm text-slate-600 hover:text-primary transition-colors">OneBuddy vs Momentum</Link></li>
                <li><Link href="/best-productivity-extension-2026/" className="text-sm text-slate-600 hover:text-primary transition-colors">Best Productivity Extension 2026</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
