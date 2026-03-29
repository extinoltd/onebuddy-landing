'use client';

import { useState } from 'react';
import { ArrowDown2 } from 'iconsax-react';

const faqs = [
  {
    q: 'Is the free tier actually useful or just a teaser?',
    a: 'It\'s genuinely useful. You get a real Pomodoro timer, health reminders, basic ad blocking, and tab screenshots — forever free. Pro unlocks advanced features like screen recording, clipboard history, and YouTube ad blocking. We want you to love the free version before considering Pro.',
  },
  {
    q: 'Why should I pay when uBlock Origin is free?',
    a: 'Great question. uBlock Origin is an excellent ad blocker — and it\'s free. But it ONLY blocks ads. OneBuddy Pro gives you ad blocking PLUS 20 other tools (screen recording, Pomodoro, health reminders, privacy blur, clipboard history) for less than the price of a coffee. If you only need ad blocking, uBlock is perfect. If you want an all-in-one toolkit, OneBuddy Pro saves you money and browser resources.',
  },
  {
    q: 'What happens after my 30-day trial?',
    a: 'You choose: upgrade to Pro, or stay on the Free plan. Free features are yours forever. No pressure, no dark patterns. We also send a reminder 3 days before your trial ends so you\'re never surprised.',
  },
  {
    q: 'What happens to my data if I cancel?',
    a: 'Nothing changes. Everything is stored locally on your device. We never had your data to begin with. You keep your free features, your captures, your notes — everything stays on YOUR device.',
  },
  {
    q: 'Can I really cancel anytime?',
    a: 'Yes. One click in your account settings. No phone calls, no retention flows, no guilt trips. We also send a reminder 3 days before your trial ends so you\'re never surprised.',
  },
  {
    q: 'Is OneBuddy lightweight or will it slow my browser?',
    a: 'OneBuddy uses less memory than most single-purpose extensions. By replacing 10 extensions with one, most users see their browser RAM usage DROP by 30-60%. We\'re obsessive about performance.',
  },
  {
    q: 'Why is the lifetime deal so cheap?',
    a: 'Because we\'d rather have 10,000 happy lifetime users than 1,000 frustrated monthly subscribers. We\'re building for the long term. The lifetime deal is genuinely lifetime — every future update, every new feature, forever.',
  },
  {
    q: 'Does OneBuddy sell my data?',
    a: 'Never. Everything is stored locally on your device. We don\'t even have servers to store your data on. Our revenue comes from subscriptions, not your privacy.',
  },
  {
    q: 'Can I switch plans later?',
    a: 'Absolutely. Start monthly, switch to yearly, or grab lifetime whenever you want. We\'ll prorate your payment.',
  },
  {
    q: 'Is the lifetime deal really lifetime?',
    a: 'Yes. Pay once, get every future update forever. No tricks. We believe in building long-term relationships, not recurring charges.',
  },
];

export function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 bg-slate-50 scroll-mt-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
            Questions? We&apos;ve Got <span className="text-primary">Honest Answers.</span>
          </h2>
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
