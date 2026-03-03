import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'iconsax-react';
import { kbArticles } from '@/lib/knowledge-base-data';

const article = kbArticles.find(a => a.slug === 'how-to-install-onebuddy')!;

export const metadata: Metadata = {
  title: `${article.title} | OneBuddy Knowledge Base`,
  description: article.metaDescription,
  alternates: { canonical: `https://onebuddy.io/knowledge-base/${article.slug}/` },
};

export default function Page() {
  return (
    <>
      <section className="pt-28 lg:pt-36 pb-12 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/knowledge-base/" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-primary mb-6">
            <ArrowLeft size={14} color="currentColor" /> Back to Knowledge Base
          </Link>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">{article.title}</h1>
        </div>
      </section>
      <article className="py-12 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {article.content.map((paragraph, i) => (
            <p key={i} className="text-slate-600 leading-relaxed mb-6">{paragraph}</p>
          ))}
        </div>
      </article>
    </>
  );
}
