import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowRight2,
  Flash,
  Category,
  ShieldTick,
  MessageQuestion,
  InfoCircle,
} from 'iconsax-react';
import { kbCategories, kbArticles } from '@/lib/knowledge-base-data';

export const metadata: Metadata = {
  title: 'Knowledge Base | OneBuddy',
  description:
    'Help articles, setup guides, and troubleshooting for OneBuddy Chrome extension. Find answers to common questions about productivity, privacy, and wellness features.',
  alternates: { canonical: 'https://onebuddy.io/knowledge-base/' },
  openGraph: {
    title: 'Knowledge Base | OneBuddy',
    description:
      'Help articles, setup guides, and troubleshooting for OneBuddy Chrome extension. Find answers to common questions about productivity, privacy, and wellness features.',
  },
};

const iconMap: Record<string, any> = {
  'getting-started': Flash,
  'feature-guides': Category,
  'troubleshooting': InfoCircle,
  'privacy-security': ShieldTick,
  'faq': MessageQuestion,
};

export default function KnowledgeBasePage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-28 lg:pt-36 pb-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight mb-6">
            Knowledge Base
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Everything you need to know about OneBuddy. Setup guides,
            feature walkthroughs, troubleshooting, and frequently asked
            questions.
          </p>
        </div>
      </section>

      {/* Category Sections */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {kbCategories.map((cat) => {
            const Icon = iconMap[cat.id] || Flash;
            const articles = kbArticles.filter((a) => a.category === cat.id);
            if (articles.length === 0) return null;

            return (
              <div key={cat.id}>
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${cat.color}15`, color: cat.color }}
                  >
                    <Icon size={20} color="currentColor" variant="Bold" />
                  </div>
                  <h2 className="text-xl font-extrabold tracking-tight text-slate-900">
                    {cat.label}
                  </h2>
                </div>

                {/* Article Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {articles.map((article) => (
                    <Link
                      key={article.slug}
                      href={`/knowledge-base/${article.slug}/`}
                      className="group flex items-center justify-between gap-3 p-4 rounded-xl border border-slate-200 bg-white hover:border-primary/30 hover:shadow-md transition-all"
                    >
                      <span className="text-sm font-medium text-slate-700 group-hover:text-primary transition-colors">
                        {article.title}
                      </span>
                      <ArrowRight2
                        size={14}
                        color="currentColor"
                        className="shrink-0 text-slate-400 group-hover:text-primary transition-colors"
                      />
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
