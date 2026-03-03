import Link from 'next/link';
import { TickCircle, Chrome, ArrowRight2, Profile2User } from 'iconsax-react';
import { siteConfig } from '@/lib/site-config';

export interface PainPoint {
  problem: string;
  solution: string;
}

export interface FeatureMapping {
  feature: string;
  benefit: string;
  icon: string;
}

export interface UseCasePageProps {
  persona: string;
  heroTitle: string;
  heroSubtitle: string;
  painPoints: PainPoint[];
  featureMappings: FeatureMapping[];
  closingTitle: string;
  closingSubtitle: string;
  relatedLinks: { label: string; href: string }[];
}

export function UseCasePageLayout({
  persona,
  heroTitle,
  heroSubtitle,
  painPoints,
  featureMappings,
  closingTitle,
  closingSubtitle,
  relatedLinks,
}: UseCasePageProps) {
  return (
    <>
      {/* Hero */}
      <section className="pt-28 lg:pt-36 pb-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6">
            <Profile2User size={14} color="currentColor" />
            {persona}
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight mb-6">
            {heroTitle}
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            {heroSubtitle}
          </p>
          <a
            href={siteConfig.extensionUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary hover:bg-primary-dark text-white font-bold rounded-full text-lg transition-colors"
          >
            <Chrome size={20} color="currentColor" variant="Bold" />
            Add to Chrome — Free
          </a>
        </div>
      </section>

      {/* Pain Points */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-10 text-center">
            Common Challenges for {persona}
          </h2>
          <div className="space-y-5">
            {painPoints.map((pp, i) => (
              <div key={i} className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-red-100 text-red-500 flex items-center justify-center shrink-0 mt-0.5 text-sm font-bold">
                    {i + 1}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-slate-900 mb-2">{pp.problem}</h3>
                    <div className="flex items-start gap-2 text-sm text-slate-600 bg-white rounded-xl p-4 border border-slate-100">
                      <TickCircle size={16} color="currentColor" variant="Bold" className="text-primary shrink-0 mt-0.5" />
                      <span>{pp.solution}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Mapping */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-10 text-center">
            How OneBuddy Helps {persona}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {featureMappings.map((fm, i) => (
              <div key={i} className="feature-card">
                <h3 className="font-bold text-lg text-slate-900 mb-2">{fm.feature}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{fm.benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-white mb-5">{closingTitle}</h2>
          <p className="text-slate-400 mb-8">{closingSubtitle}</p>
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
            Explore More
          </h3>
          <div className="flex flex-wrap gap-3">
            {relatedLinks.map((link) => (
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
