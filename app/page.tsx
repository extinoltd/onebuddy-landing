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
              30-Day Free Trial &middot; No Card Required &middot; Cancel Anytime
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.08] mb-6 animate-fade-up" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
              One Extension Replaces 10.{' '}
              <span className="text-primary">Try Everything Free.</span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-up" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
              Pomodoro Timer, Ad Blocker, Screen Recorder, Health Reminders, Privacy Tools &amp; Clipboard Manager
              — all inside one Chrome side panel. No more extension clutter.
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
                Start 30-Day Free Trial
              </a>
              <a
                href="#pricing"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white hover:bg-slate-50 text-slate-800 font-semibold rounded-full border border-slate-200 transition-colors"
              >
                See what&apos;s included
                <ArrowRight2 size={18} color="currentColor" />
              </a>
            </div>

            {/* Trust Bar */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500 animate-fade-up" style={{ animationDelay: '0.4s', animationFillMode: 'both' }}>
              <div className="flex items-center gap-1.5">
                <div className="flex -space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star1 key={i} size={14} color="currentColor" variant="Bold" className="text-amber-400" />
                  ))}
                </div>
                <span className="font-semibold text-slate-700">4.9/5</span>
                <span>from 2,480+ reviews</span>
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
              { label: '30-Day Free Trial', Icon: Gift, color: 'text-green-600' },
              { label: 'No Data Selling', Icon: ShieldTick, color: 'text-primary' },
              { label: 'Local-First Storage', Icon: Cpu, color: 'text-blue-600' },
              { label: '40+ Languages', Icon: Global, color: 'text-cyan-600' },
              { label: 'Manifest V3', Icon: TickCircle, color: 'text-emerald-600' },
              { label: 'Cancel Anytime', Icon: Flash, color: 'text-amber-500' },
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
              alt="Browser problems"
              className="w-24 h-24 mx-auto mb-4 drop-shadow-md"
              width={96}
              height={96}
            />
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-5">
              Your Browser Is Working{' '}
              <span className="text-red-500">Against You.</span>
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed mb-8">
              Right now, you probably have 8-12 Chrome extensions installed. Each one slows your browser by 50-200MB of RAM, requests permissions it doesn&apos;t need, and may be selling your browsing data.
            </p>
            <p className="text-base text-slate-700 font-semibold">
              What if one extension could do everything — while actually making your browser faster?
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
              Four Powerful Suites.{' '}
              <span className="text-primary">One Side Panel.</span>
            </h2>
            <p className="text-lg text-slate-600">
              Each feature is designed to replace a standalone extension. Start free, unlock everything with Pro.
            </p>
          </div>

          {featureClusters.map((cluster) => {
            const ClusterIcon = clusterIconMap[cluster.icon] || Flash;
            return (
              <div key={cluster.id} id={cluster.id} className="mb-24 last:mb-0 scroll-mt-24">
                {/* Cluster Header */}
                <div className="flex items-center gap-4 mb-3">
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

                {/* Tagline */}
                {cluster.tagline && (
                  <p className="text-slate-600 italic mb-8 ml-16">&ldquo;{cluster.tagline}&rdquo;</p>
                )}

                {/* Feature Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-6">
                  {cluster.features.map((feature) => {
                    const FeatureIcon = iconMap[feature.icon] || Flash;
                    return (
                      <div
                        key={feature.title}
                        className="feature-card relative"
                      >
                        {/* Tier badge */}
                        {feature.tier && (
                          <span
                            className={`absolute top-4 right-4 px-2 py-0.5 text-xs font-bold rounded-full ${
                              feature.tier === 'free'
                                ? 'bg-green-100 text-green-700'
                                : 'bg-primary/10 text-primary'
                            }`}
                          >
                            {feature.tier === 'free' ? 'Free' : 'Pro'}
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

                {/* Comparison note with cost */}
                <div
                  className="flex items-start gap-3 px-5 py-4 rounded-xl text-sm"
                  style={{ backgroundColor: cluster.colorLight }}
                >
                  <TickCircle size={18} color="currentColor" variant="Bold" style={{ color: cluster.color }} className="mt-0.5 shrink-0" />
                  <span className="text-slate-700 font-medium">
                    {cluster.comparison}
                    {cluster.costComparison && (
                      <span className="text-slate-500"> Combined cost of alternatives: {cluster.costComparison}</span>
                    )}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ==================== SAVINGS CALCULATOR ==================== */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
              You&apos;re Already Paying <span className="text-primary">More Than You Think.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Current Cost */}
            <div className="bg-white rounded-2xl border border-slate-200 p-8">
              <h3 className="text-lg font-bold text-red-500 mb-6 uppercase tracking-wider text-sm">What you&apos;re paying now</h3>
              <div className="space-y-3 text-sm">
                {[
                  { name: 'Loom Pro', cost: '£12.50/mo' },
                  { name: 'Momentum Plus', cost: '£2.80/mo' },
                  { name: 'Forest Pro', cost: '£3.30/mo' },
                  { name: 'Ghostery Premium', cost: '£4.20/mo' },
                  { name: 'Raindrop Pro', cost: '£1.95/mo' },
                  { name: 'Stretchly (donation)', cost: '£1.00/mo' },
                  { name: '+ Others', cost: '£8.25/mo' },
                ].map((item) => (
                  <div key={item.name} className="flex justify-between text-slate-600">
                    <span>{item.name}</span>
                    <span className="font-medium">{item.cost}</span>
                  </div>
                ))}
                <div className="border-t border-slate-200 pt-3 flex justify-between font-bold text-lg text-slate-900">
                  <span>Total</span>
                  <span className="text-red-500">£34.00/month</span>
                </div>
                <p className="text-slate-400 text-xs text-right">£408/year</p>
              </div>
            </div>

            {/* OneBuddy Pro */}
            <div className="bg-primary/5 rounded-2xl border-2 border-primary/30 p-8">
              <h3 className="text-lg font-bold text-primary mb-6 uppercase tracking-wider text-sm">With OneBuddy Pro</h3>
              <div className="text-center py-6">
                <div className="text-5xl font-extrabold text-slate-900 mb-2">£2.99<span className="text-lg font-medium text-slate-500">/month</span></div>
                <p className="text-slate-500 mb-1">or £29.99/year (just £2.50/mo)</p>
                <p className="text-slate-500 mb-6">or £49.99 lifetime (pay once!)</p>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full font-bold text-lg">
                  You save: £378/year
                </div>
              </div>
              <p className="text-center text-slate-600 text-sm mt-4">
                That&apos;s less than 10p per day for 20+ premium tools.
              </p>
            </div>
          </div>

          <div className="text-center mt-10">
            <a
              href={siteConfig.extensionUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary hover:bg-primary-dark text-white font-bold rounded-full text-lg transition-colors"
            >
              <Chrome size={20} color="currentColor" variant="Bold" />
              Start Your 30-Day Free Trial
            </a>
            <p className="text-sm text-slate-500 mt-3">No credit card required. Cancel anytime.</p>
          </div>
        </div>
      </section>

      {/* ==================== PRICING TABLE ==================== */}
      <section id="pricing" className="py-24 bg-white scroll-mt-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
              Simple, Honest Pricing. <span className="text-primary">Start Free.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {/* Free */}
            <div className="rounded-2xl border border-slate-200 p-6 bg-white">
              <h3 className="font-bold text-lg mb-1">Free</h3>
              <div className="text-3xl font-extrabold mb-1">£0</div>
              <p className="text-sm text-slate-500 mb-6">forever</p>
              <ul className="space-y-2 text-sm text-slate-600 mb-6">
                <li className="flex items-center gap-2"><TickCircle size={14} color="currentColor" variant="Bold" className="text-green-500 shrink-0" /> Basic Pomodoro (25 min)</li>
                <li className="flex items-center gap-2"><TickCircle size={14} color="currentColor" variant="Bold" className="text-green-500 shrink-0" /> Basic Notes</li>
                <li className="flex items-center gap-2"><TickCircle size={14} color="currentColor" variant="Bold" className="text-green-500 shrink-0" /> Health Reminders</li>
                <li className="flex items-center gap-2"><TickCircle size={14} color="currentColor" variant="Bold" className="text-green-500 shrink-0" /> Tab Screenshot</li>
                <li className="flex items-center gap-2"><TickCircle size={14} color="currentColor" variant="Bold" className="text-green-500 shrink-0" /> Basic Ad Blocking</li>
              </ul>
              <a href={siteConfig.extensionUrl} target="_blank" rel="noopener noreferrer" className="block text-center py-3 px-4 rounded-full border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 transition-colors text-sm">
                Stay Free
              </a>
            </div>

            {/* Monthly */}
            <div className="rounded-2xl border border-slate-200 p-6 bg-white">
              <h3 className="font-bold text-lg mb-1">Monthly</h3>
              <div className="text-3xl font-extrabold mb-1">£2.99<span className="text-base font-medium text-slate-500">/mo</span></div>
              <p className="text-sm text-slate-500 mb-6">billed monthly</p>
              <ul className="space-y-2 text-sm text-slate-600 mb-6">
                <li className="flex items-center gap-2"><TickCircle size={14} color="currentColor" variant="Bold" className="text-green-500 shrink-0" /> Everything in Pro</li>
                <li className="flex items-center gap-2"><TickCircle size={14} color="currentColor" variant="Bold" className="text-green-500 shrink-0" /> 30-day free trial</li>
                <li className="flex items-center gap-2"><TickCircle size={14} color="currentColor" variant="Bold" className="text-green-500 shrink-0" /> Cancel anytime</li>
              </ul>
              <a href={siteConfig.extensionUrl} target="_blank" rel="noopener noreferrer" className="block text-center py-3 px-4 rounded-full bg-primary/10 text-primary font-semibold hover:bg-primary/20 transition-colors text-sm">
                Start Trial
              </a>
            </div>

            {/* Yearly - Featured */}
            <div className="rounded-2xl border-2 border-primary p-6 bg-primary/5 relative">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-primary text-white text-xs font-bold rounded-full">Most Popular</span>
              <h3 className="font-bold text-lg mb-1">Yearly</h3>
              <div className="text-3xl font-extrabold mb-1">£29.99<span className="text-base font-medium text-slate-500">/yr</span></div>
              <p className="text-sm text-slate-500 mb-1">just £2.50/month</p>
              <p className="text-sm font-semibold text-green-600 mb-6">Save 16%</p>
              <ul className="space-y-2 text-sm text-slate-600 mb-6">
                <li className="flex items-center gap-2"><TickCircle size={14} color="currentColor" variant="Bold" className="text-green-500 shrink-0" /> Everything in Pro</li>
                <li className="flex items-center gap-2"><TickCircle size={14} color="currentColor" variant="Bold" className="text-green-500 shrink-0" /> 30-day free trial</li>
                <li className="flex items-center gap-2"><TickCircle size={14} color="currentColor" variant="Bold" className="text-green-500 shrink-0" /> Cancel anytime</li>
              </ul>
              <a href={siteConfig.extensionUrl} target="_blank" rel="noopener noreferrer" className="block text-center py-3 px-4 rounded-full bg-primary text-white font-semibold hover:bg-primary-dark transition-colors text-sm">
                Start Trial
              </a>
            </div>

            {/* Lifetime */}
            <div className="rounded-2xl border border-slate-200 p-6 bg-white">
              <span className="inline-block px-2 py-0.5 bg-amber-100 text-amber-700 text-xs font-bold rounded-full mb-2">Best Value</span>
              <h3 className="font-bold text-lg mb-1">Lifetime</h3>
              <div className="text-3xl font-extrabold mb-1">£49.99</div>
              <p className="text-sm text-slate-500 mb-1">one-time payment</p>
              <p className="text-sm font-semibold text-green-600 mb-6">Save 85%+</p>
              <ul className="space-y-2 text-sm text-slate-600 mb-6">
                <li className="flex items-center gap-2"><TickCircle size={14} color="currentColor" variant="Bold" className="text-green-500 shrink-0" /> Everything in Pro</li>
                <li className="flex items-center gap-2"><TickCircle size={14} color="currentColor" variant="Bold" className="text-green-500 shrink-0" /> Pay once, own forever</li>
                <li className="flex items-center gap-2"><TickCircle size={14} color="currentColor" variant="Bold" className="text-green-500 shrink-0" /> All future updates</li>
              </ul>
              <a href={siteConfig.extensionUrl} target="_blank" rel="noopener noreferrer" className="block text-center py-3 px-4 rounded-full bg-primary/10 text-primary font-semibold hover:bg-primary/20 transition-colors text-sm">
                Start Trial
              </a>
            </div>
          </div>

          {/* Trust signals under pricing */}
          <div className="flex flex-wrap items-center justify-center gap-8 mt-10 text-sm text-slate-500">
            <span className="flex items-center gap-2">
              <TickCircle size={14} color="currentColor" variant="Bold" className="text-green-500" /> 30-Day Money-Back Guarantee
            </span>
            <span className="flex items-center gap-2">
              <TickCircle size={14} color="currentColor" variant="Bold" className="text-green-500" /> No Credit Card for Trial
            </span>
            <span className="flex items-center gap-2">
              <TickCircle size={14} color="currentColor" variant="Bold" className="text-green-500" /> Downgrade Anytime — Keep Free Features
            </span>
          </div>
        </div>
      </section>

      {/* ==================== COMPARISON TABLE ==================== */}
      <ComparisonTable />

      {/* ==================== HOW IT WORKS ==================== */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
              Set Up in <span className="text-primary">60 Seconds.</span> Not Kidding.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: '1', image: '/new/setting.png', title: 'Add to Chrome', desc: 'Click one button. No signup needed. No email required.' },
              { step: '2', image: '/new/goodmorning.png', title: 'Choose Your Tools', desc: 'Pick what you need. Skip what you don\'t. Customize later.' },
              { step: '3', image: '/new/focus timer.png', title: 'Start Working Smarter', desc: 'Everything lives in one side panel. Open with one click.' },
            ].map((s) => (
              <div key={s.step} className="text-center">
                <div className="w-10 h-10 rounded-full bg-primary text-white font-bold flex items-center justify-center mx-auto mb-4 text-lg">{s.step}</div>
                <img src={s.image} alt={s.title} className="w-16 h-16 rounded-full object-cover mx-auto mb-4" width={64} height={64} />
                <h3 className="font-bold text-lg mb-2">{s.title}</h3>
                <p className="text-slate-500 text-sm">{s.desc}</p>
              </div>
            ))}
          </div>

          <p className="text-center text-slate-600 mt-10 font-medium">
            That&apos;s it. No account creation. No email verification. No credit card. Just install and go.
          </p>
        </div>
      </section>

      {/* ==================== TESTIMONIALS ==================== */}
      <section className="py-24 bg-slate-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
              10,000+ People <span className="text-primary">Simplified Their Browser.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                quote: 'I was paying £15/month for Loom, plus Forest, plus Ghostery. OneBuddy Pro replaced all three for £2.99. My browser went from using 4GB RAM to under 1GB.',
                name: 'Sarah K.',
                role: 'Remote Product Designer',
                detail: 'Using OneBuddy for 6 months',
                rating: 5,
              },
              {
                quote: 'The 30-day trial convinced me in 3 days. The clipboard history and screen recording alone are worth £2.99/month. The rest is a bonus.',
                name: 'Marcus T.',
                role: 'Full-Stack Developer',
                detail: 'Pro since Day 4',
                rating: 5,
              },
              {
                quote: 'I teach journalism students and recommended OneBuddy to my entire class. The free tier is genuinely useful, and I upgraded to Pro for the privacy blur.',
                name: 'Elena R.',
                role: 'Freelance Journalist',
                detail: 'Lifetime member',
                rating: 5,
              },
              {
                quote: 'Got the lifetime deal for £49.99. That\'s less than what I was paying PER MONTH for separate extensions. Best £50 I\'ve spent on productivity.',
                name: 'James W.',
                role: 'Startup Founder',
                detail: 'Lifetime member',
                rating: 5,
              },
            ].map((t, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 border border-slate-100"
              >
                <div className="flex gap-0.5 mb-4">
                  {[...Array(t.rating)].map((_, j) => (
                    <Star1 key={j} size={14} color="currentColor" variant="Bold" className="text-amber-400" />
                  ))}
                </div>
                <p className="text-slate-700 text-sm leading-relaxed mb-6">&ldquo;{t.quote}&rdquo;</p>
                <div>
                  <div className="font-bold text-slate-900 text-sm">{t.name}</div>
                  <div className="text-xs text-slate-500">{t.role}</div>
                  <div className="text-xs text-primary font-medium mt-0.5">{t.detail}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <a
              href={siteConfig.extensionUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-primary hover:bg-primary-dark text-white font-bold rounded-full transition-colors"
            >
              <Chrome size={18} color="currentColor" variant="Bold" />
              Join 10,000+ Users — Start Free Trial
            </a>
          </div>
        </div>
      </section>

      {/* ==================== FAQ ==================== */}
      <FAQSection />

      {/* ==================== FINAL CTA ==================== */}
      <section className="py-24 bg-slate-900 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-6">
            Your 30-Day Free Trial
            <br />
            <span className="text-primary-light">Is Waiting.</span>
          </h2>
          <div className="text-left max-w-md mx-auto mb-10">
            <ul className="space-y-3 text-slate-300">
              {[
                'Ad-free YouTube',
                'A focus timer that dims your distractions',
                'Screen recording with no time limits',
                'A clipboard that remembers everything',
                'Health reminders that actually work',
                'A browser that runs faster, not slower',
              ].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <TickCircle size={16} color="currentColor" variant="Bold" className="text-green-400 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
            <a
              href={siteConfig.extensionUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-8 py-4 bg-primary hover:bg-primary-light text-white font-bold rounded-full text-lg transition-colors"
            >
              <Chrome size={20} color="currentColor" variant="Bold" />
              Start Your 30-Day Free Trial
            </a>
          </div>
          <p className="text-sm text-slate-500 mb-2">No credit card required. Cancel anytime.</p>
          <p className="text-xs text-slate-600">
            30-day free trial → £2.99/mo, £29.99/yr, or £49.99 lifetime. 30-day money-back guarantee.
          </p>
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
                Compare
              </h3>
              <ul className="space-y-2">
                <li><Link href="/onebuddy-vs-ublock/" className="text-sm text-slate-600 hover:text-primary transition-colors">vs uBlock Origin</Link></li>
                <li><Link href="/onebuddy-vs-loom/" className="text-sm text-slate-600 hover:text-primary transition-colors">vs Loom</Link></li>
                <li><Link href="/onebuddy-vs-forest/" className="text-sm text-slate-600 hover:text-primary transition-colors">vs Forest</Link></li>
                <li><Link href="/onebuddy-vs-momentum/" className="text-sm text-slate-600 hover:text-primary transition-colors">vs Momentum</Link></li>
                <li><Link href="/alternative-to-ghostery/" className="text-sm text-slate-600 hover:text-primary transition-colors">vs Ghostery</Link></li>
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
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-sm uppercase tracking-wider text-slate-400 mb-4">
                Resources
              </h3>
              <ul className="space-y-2">
                <li><Link href="/blog/" className="text-sm text-slate-600 hover:text-primary transition-colors">Blog</Link></li>
                <li><Link href="/knowledge-base/" className="text-sm text-slate-600 hover:text-primary transition-colors">Knowledge Base</Link></li>
                <li><Link href="/best-productivity-extension-2026/" className="text-sm text-slate-600 hover:text-primary transition-colors">Best Extension 2026</Link></li>
                <li><Link href="/#pricing" className="text-sm text-slate-600 hover:text-primary transition-colors">Pricing</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
