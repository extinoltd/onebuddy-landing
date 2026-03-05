'use client';

const tiers = [
  {
    icon: '🤝',
    label: 'Supporter',
    price: '$1',
    period: '/month',
    color: 'blue' as const,
    perks: [
      'Early access to new features',
      'Beta tester badge in extension',
      'Monthly vote on next feature',
      '$1 discount coupon on future products',
      'Private supporters Discord channel',
    ],
    cta: 'Become a Supporter',
    href: 'https://www.patreon.com/onebuddy',
    featured: false,
  },
  {
    icon: '⭐',
    label: 'Patreon Pro',
    price: '$5',
    period: '/month',
    color: 'gold' as const,
    perks: [
      'Everything in Supporter tier',
      '40% discount on all premium extensions',
      'Priority support (24hr response)',
      'Extension roadmap access',
      'Exclusive Pro themes & UI skins',
      'Early access 2 weeks before public',
    ],
    cta: 'Go Pro on Patreon',
    href: 'https://www.patreon.com/onebuddy',
    featured: true,
  },
  {
    icon: '💎',
    label: 'Lifetime Partner',
    price: '$100',
    period: 'one-time',
    color: 'purple' as const,
    perks: [
      'All Pro benefits — permanently',
      'All current premium extensions FREE',
      'Future extensions (12 months) free',
      'Quarterly extension feature request',
      'SEO & ASO support consultation',
      'Extension marketing consultation',
      'Founding Partner badge',
    ],
    cta: 'Get Lifetime Access',
    href: 'https://ko-fi.com/onebuddy/tiers',
    featured: false,
  },
];

const colorMap = {
  blue: {
    border: 'border-blue-200',
    btn: 'bg-blue-600 hover:bg-blue-700',
  },
  gold: {
    border: 'border-amber-300',
    btn: 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700',
  },
  purple: {
    border: 'border-violet-200',
    btn: 'bg-violet-600 hover:bg-violet-700',
  },
};

export function SupportSection() {
  return (
    <section id="support" className="py-24 bg-gradient-to-b from-slate-50 to-white scroll-mt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-block bg-indigo-100 text-indigo-800 text-xs font-semibold uppercase tracking-wider px-4 py-1.5 rounded-full mb-4">
            Open Source &amp; Free Forever
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
            Support OneBuddy&apos;s <span className="text-primary">Development</span>
          </h2>
          <p className="text-slate-500 leading-relaxed">
            OneBuddy is 100% free with no ads and no data selling — and it will stay that way.
            If it saves you time, protects your privacy, or reminds you to drink water,
            consider supporting the one developer behind it.
          </p>
        </div>

        {/* Tier Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12 items-start">
          {tiers.map((tier) => (
            <div
              key={tier.label}
              className={`relative bg-white rounded-2xl border-2 ${colorMap[tier.color].border} p-7 shadow-sm hover:shadow-lg transition-all duration-200 hover:-translate-y-1 ${
                tier.featured ? '-translate-y-2 shadow-md shadow-amber-100' : ''
              }`}
            >
              {tier.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-[11px] font-bold uppercase tracking-wider px-4 py-1 rounded-full whitespace-nowrap">
                  Most Popular
                </span>
              )}
              <div className="text-3xl mb-2">{tier.icon}</div>
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                {tier.label}
              </div>
              <div className="text-4xl font-extrabold text-slate-900 mb-1">
                {tier.price}
                <span className="text-sm font-medium text-slate-400 ml-1">{tier.period}</span>
              </div>
              <ul className="mt-5 mb-6 space-y-0">
                {tier.perks.map((perk) => (
                  <li
                    key={perk}
                    className="text-sm text-slate-600 py-2 border-b border-slate-50 last:border-b-0 leading-relaxed"
                  >
                    <span className="text-green-500 mr-2">✓</span>
                    {perk}
                  </li>
                ))}
              </ul>
              <a
                href={tier.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`block text-center px-5 py-3 rounded-xl text-white font-semibold text-sm transition-all ${colorMap[tier.color].btn}`}
              >
                {tier.cta} →
              </a>
            </div>
          ))}
        </div>

        {/* Stripe One-Time Donation Strip */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 max-w-5xl mx-auto bg-white border border-slate-200 rounded-2xl px-7 py-5 shadow-sm">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <span className="text-3xl shrink-0">☕</span>
            <div>
              <p className="font-semibold text-slate-900">Prefer a one-time donation?</p>
              <p className="text-sm text-slate-500">
                Any amount helps — keeps the servers on and the dev caffeinated.
              </p>
            </div>
          </div>
          <a
            href="https://buy.stripe.com/YOUR_STRIPE_PAYMENT_LINK"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm px-6 py-3 rounded-xl transition-colors shrink-0"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm1 14.5h-2v-5H9.5v-2H11V8h2v1.5h1.5v2H13v5z"
                fill="currentColor"
              />
            </svg>
            Donate with Stripe
          </a>
        </div>
      </div>
    </section>
  );
}
