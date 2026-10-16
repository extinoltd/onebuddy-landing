import type { Metadata } from 'next';
import Link from 'next/link';
import { HomeLanding } from '@/components/HomeLanding';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = {
  title: { absolute: 'OneBuddy — One Buddy for Chrome and Mac' },
  description:
    'OneBuddy puts a focus timer, notes, clipboard, ad blocker, privacy tools and screen recording in one Chrome side panel, and tasks, a launcher, dictation and a cleaner behind your Mac’s notch. Try both free.',
  alternates: { canonical: siteConfig.url },
};

export default function HomePage() {
  return (
    <>
      <HomeLanding />

      {/* ==================== SEO INTERNAL LINKS ==================== */}
      <section className="seo-links">
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
