import type { Metadata } from 'next';
import { Instrument_Serif } from 'next/font/google';
import { MacLanding } from '@/components/MacLanding';
import { siteConfig } from '@/lib/site-config';
import './mac.css';

const serif = Instrument_Serif({ subsets: ['latin'], weight: '400', style: ['italic'], variable: '--font-serif', display: 'swap' });

const title = "OneBuddy for Mac — Your Mac's Buddy Lives in the Notch";
const description =
  'OneBuddy for Mac puts tasks, a Pomodoro timer, clipboard history, a launcher, on-device voice dictation and a cleaner behind the notch. One app instead of a drawer of utilities.';

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  keywords: [
    'mac notch app',
    'mac clipboard manager',
    'pomodoro timer mac',
    'mac launcher',
    'mac cleaner',
    'offline dictation mac',
    'window snapping mac',
    'paste alternative',
    'cleanmymac alternative',
    'raycast alternative',
    'clipboard icloud sync mac',
    'OneBuddy for Mac',
  ],
  alternates: { canonical: `${siteConfig.url}/mac/` },
  openGraph: {
    type: 'website',
    url: `${siteConfig.url}/mac/`,
    title,
    description,
    siteName: siteConfig.name,
    images: [{ url: '/images/mac/cleaner.png', width: 1700, height: 1245, alt: 'OneBuddy for Mac' }],
  },
  twitter: { card: 'summary_large_image', title, description, images: ['/images/mac/cleaner.png'] },
};

/** Structured data: the app with its prices, and the FAQ, for search results. */
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      name: 'OneBuddy for Mac',
      operatingSystem: 'macOS 14 or later',
      applicationCategory: 'ProductivityApplication',
      url: `${siteConfig.url}/mac/`,
      image: `${siteConfig.url}/images/mac/icon.png`,
      description,
      downloadUrl: siteConfig.macDownloadUrl || undefined,
      offers: [
        { '@type': 'Offer', name: 'Free trial (30 days)', price: '0', priceCurrency: 'USD' },
        { '@type': 'Offer', name: 'Monthly', price: '3.99', priceCurrency: 'USD' },
        { '@type': 'Offer', name: 'Yearly', price: '29.99', priceCurrency: 'USD' },
        { '@type': 'Offer', name: 'Lifetime', price: '49.99', priceCurrency: 'USD' },
      ],
    },
  ],
};

export default function MacPage() {
  return (
    <div className={serif.variable}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <MacLanding />
    </div>
  );
}
