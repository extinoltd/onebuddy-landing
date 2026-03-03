import type { Metadata } from 'next';
import Link from 'next/link';
import { Chrome, ArrowRight2, Calendar, Clock } from 'iconsax-react';
import { blogPosts, blogCategories } from '@/lib/blog-data';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Blog | OneBuddy',
  description:
    'Tips, guides, and insights on productivity, privacy, and wellness for Chrome users. Learn how to get the most out of your browser.',
  alternates: { canonical: 'https://onebuddy.io/blog/' },
  openGraph: {
    title: 'Blog | OneBuddy',
    description:
      'Tips, guides, and insights on productivity, privacy, and wellness for Chrome users. Learn how to get the most out of your browser.',
  },
};

export default function BlogPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-28 lg:pt-36 pb-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight mb-6">
            OneBuddy Blog
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Tips, guides, and insights on productivity, online privacy, and
            digital wellness. Everything you need to make the most of your
            browser.
          </p>
        </div>
      </section>

      {/* Category Pills */}
      <section className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-wrap items-center gap-3">
            {blogCategories.map((category) => (
              <span
                key={category}
                className="inline-flex px-4 py-1.5 rounded-full bg-slate-100 text-slate-700 text-sm font-medium"
              >
                {category}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Post Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <article
                key={post.slug}
                className="group rounded-2xl border border-slate-200 bg-white hover:border-primary/30 hover:shadow-lg transition-all overflow-hidden"
              >
                <div className="p-6">
                  <span className="inline-flex px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4">
                    {post.category}
                  </span>
                  <h2 className="text-lg font-bold text-slate-900 group-hover:text-primary transition-colors mb-3 leading-snug">
                    <Link href={`/blog/${post.slug}/`}>{post.title}</Link>
                  </h2>
                  <p className="text-slate-500 text-sm leading-relaxed mb-5 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-slate-400">
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar size={12} color="currentColor" />
                      {post.date}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Clock size={12} color="currentColor" />
                      {post.readTime}
                    </span>
                  </div>
                </div>
                <div className="px-6 pb-5">
                  <Link
                    href={`/blog/${post.slug}/`}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
                  >
                    Read Article
                    <ArrowRight2 size={14} color="currentColor" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-6">
            Ready to Boost Your Productivity?
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-10">
            All the tools we write about — in one free Chrome extension.
          </p>
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
      </section>
    </>
  );
}
