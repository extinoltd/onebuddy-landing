'use client';

import { useState } from 'react';
import { ArrowDown2 } from 'iconsax-react';

const faqs = [
  {
    q: 'Is OneBuddy really free?',
    a: 'Yes, 100% free with no premium tiers, no ads, and no hidden costs. Every feature is available from day one. We believe productivity and privacy tools should be accessible to everyone.',
  },
  {
    q: 'Does OneBuddy sell my data?',
    a: 'Never. OneBuddy uses local-first storage — your data stays on your device. We have no analytics tracking, no third-party SDKs, and zero data collection. Your privacy is our core principle.',
  },
  {
    q: 'How many extensions does OneBuddy replace?',
    a: 'OneBuddy consolidates 10+ standalone extensions into one: Pomodoro timer, ad blocker, tracker blocker, clipboard manager, notes app, habit tracker, screen recorder, privacy blur, bookmark manager, browser lock, and health reminders.',
  },
  {
    q: 'Will OneBuddy slow down my browser?',
    a: 'No. OneBuddy is built on Chrome\'s Manifest V3 with a single lightweight service worker. It\'s actually faster than running multiple separate extensions because it eliminates inter-extension conflicts and duplicate processes.',
  },
  {
    q: 'Does the ad blocker work on YouTube?',
    a: 'Yes! OneBuddy includes separate toggles for YouTube video ads, YouTube banner ads, and general website ads. You can customize blocking per-site with a whitelist for trusted domains.',
  },
  {
    q: 'What is Privacy Blur and how does it work?',
    a: 'Privacy Blur lets you click or drag over any element on a webpage to blur it. It supports 5 blur styles (Gaussian, Pixelate, Blackout, Frost, Noise) and persists blurs — they re-apply automatically when you revisit the page.',
  },
  {
    q: 'Can I use OneBuddy offline?',
    a: 'Yes, all core features work offline. The Pomodoro timer, notes, clipboard history, habit tracker, privacy blur, and browser lock function without an internet connection. Only Google Calendar sync and messaging require connectivity.',
  },
  {
    q: 'How does the Browser Lock work?',
    a: 'Browser Lock overlays a password-protected lock screen across all tabs. It uses SHA-256 password hashing, has a 5-attempt lockout with cooldown, blocks developer tools while locked, and supports auto-lock after inactivity.',
  },
  {
    q: 'What languages does OneBuddy support?',
    a: 'OneBuddy supports 40+ languages including English, Spanish, French, German, Japanese, Korean, Chinese, Arabic, Hindi, and many more. The interface automatically detects your browser language.',
  },
  {
    q: 'How is OneBuddy different from uBlock Origin or Ghostery?',
    a: 'uBlock Origin and Ghostery focus solely on ad/tracker blocking. OneBuddy includes ad blocking AND tracker blocking, plus a complete productivity suite (Pomodoro, notes, clipboard), health reminders, screen capture, and privacy tools like blur and browser lock.',
  },
  {
    q: 'Is OneBuddy still free? Why is there a support tier?',
    a: 'Yes, OneBuddy is and always will be 100% free with every feature available to everyone. The support tiers are completely optional — they exist to let users who love the product help fund continued development and new extensions. Supporters get early access and discounts as a thank-you, not as a paywall.',
  },
];

export function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 bg-slate-50 scroll-mt-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
            Frequently Asked <span className="text-primary">Questions</span>
          </h2>
          <p className="text-slate-500">Everything you need to know about OneBuddy</p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
              <button
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                className="w-full flex items-center justify-between p-5 sm:p-6 text-left hover:bg-slate-50/50 transition-colors"
                aria-expanded={openIdx === idx}
              >
                <span className="font-semibold text-slate-900 pr-4">{faq.q}</span>
                <ArrowDown2
                  size={20}
                  color="currentColor"
                  className={`text-slate-400 shrink-0 transition-transform duration-200 ${
                    openIdx === idx ? 'rotate-180 text-primary' : ''
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIdx === idx ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-5 sm:px-6 pb-5 sm:pb-6 text-slate-600 leading-relaxed text-sm">
                  {faq.a}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
