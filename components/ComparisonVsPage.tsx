import Link from 'next/link';
import { TickCircle, CloseCircle, Chrome, ArrowDown2, ArrowRight2 } from 'iconsax-react';
import { siteConfig } from '@/lib/site-config';

export interface ComparisonVsPageProps {
  competitorName: string;
  h1: string;
  intro: string;
  verdict: string;
  features: { name: string; onebuddy: boolean | string; competitor: boolean | string }[];
  onebuddyPros: string[];
  competitorPros: string[];
  faqs: { q: string; a: string }[];
  relatedLinks: { label: string; href: string }[];
}

export function ComparisonVsPageLayout({
  competitorName,
  h1,
  intro,
  verdict,
  features,
  onebuddyPros,
  competitorPros,
  faqs,
  relatedLinks,
}: ComparisonVsPageProps) {
  return (
    <>
      {/* Hero */}
      <section className="pt-28 lg:pt-36 pb-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6">
            Comparison
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight mb-6">
            {h1}
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            {intro}
          </p>
        </div>
      </section>

      {/* Feature Comparison Table */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-10 text-center">
            Feature-by-Feature Comparison
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-2xl border border-slate-200 overflow-hidden">
              <thead>
                <tr className="bg-slate-50">
                  <th className="text-left py-4 px-6 text-sm font-semibold text-slate-500">Feature</th>
                  <th className="text-center py-4 px-6 text-sm font-bold text-primary bg-primary/5">OneBuddy</th>
                  <th className="text-center py-4 px-6 text-sm font-bold text-slate-700">{competitorName}</th>
                </tr>
              </thead>
              <tbody>
                {features.map((f) => (
                  <tr key={f.name} className="border-t border-slate-100">
                    <td className="py-3 px-6 text-sm font-medium text-slate-700">{f.name}</td>
                    <td className="py-3 px-6 text-center bg-primary/5">
                      {typeof f.onebuddy === 'string' ? (
                        <span className="text-sm text-slate-600">{f.onebuddy}</span>
                      ) : f.onebuddy ? (
                        <TickCircle size={18} color="currentColor" variant="Bold" className="inline-block text-green-500" />
                      ) : (
                        <CloseCircle size={18} color="currentColor" className="inline-block text-slate-300" />
                      )}
                    </td>
                    <td className="py-3 px-6 text-center">
                      {typeof f.competitor === 'string' ? (
                        <span className="text-sm text-slate-600">{f.competitor}</span>
                      ) : f.competitor ? (
                        <TickCircle size={18} color="currentColor" variant="Bold" className="inline-block text-green-500" />
                      ) : (
                        <CloseCircle size={18} color="currentColor" className="inline-block text-slate-300" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Pros */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-center mb-12">Strengths of Each</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* OneBuddy Pros */}
            <div>
              <h3 className="font-bold text-lg text-primary mb-5">OneBuddy Strengths</h3>
              <div className="space-y-3">
                {onebuddyPros.map((pro, i) => (
                  <div key={i} className="flex gap-3 bg-white rounded-xl p-4 border border-slate-100">
                    <TickCircle size={18} color="currentColor" variant="Bold" className="text-primary shrink-0 mt-0.5" />
                    <span className="text-slate-700 text-sm">{pro}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Competitor Pros */}
            <div>
              <h3 className="font-bold text-lg text-slate-700 mb-5">{competitorName} Strengths</h3>
              <div className="space-y-3">
                {competitorPros.map((pro, i) => (
                  <div key={i} className="flex gap-3 bg-white rounded-xl p-4 border border-slate-100">
                    <TickCircle size={18} color="currentColor" variant="Bold" className="text-slate-400 shrink-0 mt-0.5" />
                    <span className="text-slate-700 text-sm">{pro}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Verdict */}
      <section className="py-16 bg-white border-y border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-4">The Verdict</h2>
          <p className="text-slate-600 leading-relaxed text-lg">{verdict}</p>
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
            Try OneBuddy Free
          </h2>
          <p className="text-slate-400 mb-8">
            Get everything {competitorName} offers and more — completely free, no account required.
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
            Related Comparisons & Pages
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
