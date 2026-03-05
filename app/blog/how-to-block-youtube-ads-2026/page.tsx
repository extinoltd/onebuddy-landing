import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Chrome, ArrowLeft, ArrowRight2 } from 'iconsax-react';
import { blogPosts } from '@/lib/blog-data';
import { siteConfig } from '@/lib/site-config';

const post = blogPosts.find(p => p.slug === 'how-to-block-youtube-ads-2026')!;

export const metadata: Metadata = {
  title: post.title,
  description: post.metaDescription,
  keywords: post.keywords,
  alternates: { canonical: `https://onebuddy.io/blog/${post.slug}/` },
  openGraph: { title: post.title, description: post.metaDescription },
};

export default function Page() {
  return (
    <>
      <section className="pt-28 lg:pt-36 pb-12 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/blog/" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-primary mb-6">
            <ArrowLeft size={14} color="currentColor" /> Back to Blog
          </Link>
          <div className="inline-flex px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4">
            {post.category}
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">{post.title}</h1>
          <div className="flex items-center gap-4 text-sm text-slate-500">
            <span>{post.date}</span>
            <span>{post.readTime}</span>
          </div>
        </div>
      </section>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 -mt-2 pb-8 bg-slate-50">
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-lg">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 768px"
          />
        </div>
      </div>
      <article className="py-12 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-slate max-w-none">
          {post.content.map((paragraph, i) => (
            <p key={i} className="text-slate-600 leading-relaxed mb-6">{paragraph}</p>
          ))}
        </div>
      </article>
      <section className="py-16 bg-slate-50 border-t border-slate-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Try OneBuddy Free</h2>
          <p className="text-slate-600 mb-6">All the tools mentioned in this article — in one free Chrome extension.</p>
          <a href={siteConfig.extensionUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-dark text-white font-bold rounded-full transition-colors">
            <Chrome size={18} color="currentColor" variant="Bold" />
            Add to Chrome — Free
          </a>
        </div>
      </section>
    </>
  );
}
