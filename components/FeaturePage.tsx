import Link from 'next/link';
import {
  TickCircle, Chrome, ArrowDown2, Star1, ArrowRight2,
  Timer1, DocumentText, ClipboardText, TaskSquare, Calendar, Bookmark2,
  Drop, Activity, Eye, Clock, Forbidden2, ShieldSlash, EyeSlash,
  Lock1, MessageText1, Gallery, Scan, VideoPlay, MonitorRecorder, Category,
  Heart, ShieldTick, Camera, Flash,
} from 'iconsax-react';
import { siteConfig } from '@/lib/site-config';

const iconMap: Record<string, any> = {
  Timer1, DocumentText, ClipboardText, TaskSquare, Calendar, Bookmark2,
  Drop, Activity, Eye, Clock, Forbidden2, ShieldSlash, EyeSlash,
  Lock1, MessageText1, Gallery, Scan, VideoPlay, MonitorRecorder, Category,
  Heart, ShieldTick, Camera, Flash,
};

export interface FeaturePageProps {
  badge: string;
  badgeColor: string;
  icon: string;
  h1: string;
  whatItDoes: string;
  whyBetter: string;
  featureBreakdown: { title: string; description: string }[];
  benefits: string[];
  useCases: string[];
  faqs: { q: string; a: string }[];
  relatedFeatures: { label: string; href: string }[];
}

export function FeaturePageLayout({
  badge,
  badgeColor,
  icon,
  h1,
  whatItDoes,
  whyBetter,
  featureBreakdown,
  benefits,
  useCases,
  faqs,
  relatedFeatures,
}: FeaturePageProps) {
  const Icon = iconMap[icon] || Flash;

  return (
    <>
      {/* Hero */}
      <section className="pt-28 lg:pt-36 pb-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold mb-6"
            style={{ backgroundColor: badgeColor + '15', color: badgeColor }}
          >
            <Icon size={14} color="currentColor" variant="Bold" />
            {badge}
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight mb-6">
            {h1}
          </h1>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
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
              href="/features/"
              className="inline-flex items-center gap-2 px-6 py-3 text-slate-700 font-semibold hover:text-primary transition-colors"
            >
              All Features
              <ArrowRight2 size={16} color="currentColor" />
            </Link>
          </div>
        </div>
      </section>

      {/* What It Does */}
      <section className="py-16 bg-white border-y border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-4">What It Does</h2>
          <p className="text-slate-600 leading-relaxed text-lg">{whatItDoes}</p>
        </div>
      </section>

      {/* Why It's Better */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-4">Why It&apos;s Better Than Standalone Extensions</h2>
          <p className="text-slate-600 leading-relaxed text-lg">{whyBetter}</p>
        </div>
      </section>

      {/* Feature Breakdown */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-center mb-12">Feature Breakdown</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {featureBreakdown.map((item, i) => (
              <div key={i} className="feature-card">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center mb-3"
                  style={{ backgroundColor: badgeColor + '15', color: badgeColor }}
                >
                  <TickCircle size={16} color="currentColor" variant="Bold" />
                </div>
                <h3 className="font-bold text-lg text-slate-900 mb-2">{item.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-center mb-10">Key Benefits</h2>
          <div className="space-y-4">
            {benefits.map((benefit, i) => (
              <div key={i} className="flex gap-3 bg-white rounded-xl p-5 border border-slate-100">
                <TickCircle size={20} color="currentColor" variant="Bold" className="text-primary shrink-0 mt-0.5" />
                <span className="text-slate-700">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-center mb-10">Who Uses This</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {useCases.map((uc, i) => (
              <div key={i} className="flex gap-3 p-5 bg-slate-50 rounded-xl border border-slate-100">
                <Star1 size={18} color="currentColor" variant="Bold" className="text-amber-400 shrink-0 mt-0.5" />
                <span className="text-slate-700 text-sm">{uc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-center mb-10">
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <details key={idx} className="group bg-white rounded-2xl border border-slate-100 overflow-hidden">
                <summary className="flex items-center justify-between p-5 sm:p-6 cursor-pointer list-none hover:bg-slate-50/50 transition-colors">
                  <span className="font-semibold text-slate-900 pr-4">{faq.q}</span>
                  <ArrowDown2 size={20} color="currentColor" className="text-slate-400 shrink-0 group-open:rotate-180 transition-transform" />
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
            Try It Free — No Account Needed
          </h2>
          <p className="text-slate-400 mb-8">
            Add OneBuddy to Chrome and access this feature plus 14 more tools — completely free.
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
            Related Features & Pages
          </h3>
          <div className="flex flex-wrap gap-3">
            {relatedFeatures.map((link) => (
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
