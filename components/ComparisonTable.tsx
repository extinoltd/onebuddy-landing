import { TickCircle, CloseCircle, Chrome } from 'iconsax-react';
import { siteConfig } from '@/lib/site-config';

const features = [
  'Health Reminders',
  'Pomodoro Timer',
  'Screen Dim (Focus)',
  'Google Calendar',
  'Notes + Shortcuts',
  'Clipboard History',
  'Bookmark Manager',
  'Habit Tracker',
  'E2E Encrypted Messaging',
  'Ad Blocker',
  'Tracker Blocker',
  'Privacy Blur',
  'Screen Capture',
  'Screen Recording',
  'Browser Lock',
  '40+ Languages',
  'Side Panel UI',
  'Free',
];

interface Competitor {
  name: string;
  checks: boolean[];
}

const competitors: Competitor[] = [
  {
    name: 'OneBuddy',
    checks: Array(18).fill(true),
  },
  {
    name: 'Stretchly',
    checks: [true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, false, true],
  },
  {
    name: 'Forest',
    checks: [false, true, false, false, false, false, false, false, false, false, false, false, false, false, false, true, false, false],
  },
  {
    name: 'uBlock Origin',
    checks: [false, false, false, false, false, false, false, false, false, true, true, false, false, false, false, true, false, true],
  },
  {
    name: 'Ghostery',
    checks: [false, false, false, false, false, false, false, false, false, true, true, false, false, false, false, true, false, false],
  },
  {
    name: 'Loom',
    checks: [false, false, false, false, false, false, false, false, false, false, false, false, true, true, false, false, false, false],
  },
];

export function ComparisonTable() {
  return (
    <section id="comparison" className="py-24 bg-slate-50 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-5">
            OneBuddy vs <span className="text-primary">The Competition</span>
          </h2>
          <p className="text-lg text-slate-600">
            See how OneBuddy stacks up against popular single-purpose extensions. One extension
            does what five others can&apos;t.
          </p>
        </div>

        <div className="overflow-x-auto -mx-4 sm:mx-0">
          <div className="inline-block min-w-full align-middle">
            <table className="min-w-full bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
              <thead>
                <tr className="bg-slate-50">
                  <th className="text-left py-4 px-5 text-sm font-semibold text-slate-500 min-w-[180px]">
                    Feature
                  </th>
                  {competitors.map((c) => (
                    <th
                      key={c.name}
                      className={`py-4 px-4 text-center text-sm font-bold min-w-[100px] ${
                        c.name === 'OneBuddy'
                          ? 'text-primary bg-primary/5'
                          : 'text-slate-700'
                      }`}
                    >
                      {c.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {features.map((feature, rowIdx) => (
                  <tr key={feature} className="border-t border-slate-100">
                    <td className="py-3 px-5 text-sm font-medium text-slate-700">{feature}</td>
                    {competitors.map((c) => (
                      <td
                        key={c.name}
                        className={`py-3 px-4 text-center ${
                          c.name === 'OneBuddy' ? 'bg-primary/5' : ''
                        }`}
                      >
                        {c.checks[rowIdx] ? (
                          <TickCircle size={18} color="currentColor" variant="Bold" className="inline-block text-green-500" />
                        ) : (
                          <CloseCircle size={18} color="currentColor" className="inline-block text-slate-300" />
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="text-center mt-10">
          <a
            href={siteConfig.extensionUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-primary hover:bg-primary-dark text-white font-bold rounded-full transition-colors"
          >
            <Chrome size={18} color="currentColor" variant="Bold" />
            Get OneBuddy — Free
          </a>
        </div>
      </div>
    </section>
  );
}
