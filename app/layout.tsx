import type { Metadata } from 'next';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

import { siteConfig } from '@/lib/site-config';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: 'OneBuddy — One Extension. All Your Productivity, Privacy & Wellness Tools.',
    template: '%s | OneBuddy',
  },
  description: siteConfig.description,
  keywords: [
    'productivity browser extension',
    'all in one chrome extension',
    'health reminder extension',
    'pomodoro timer chrome extension',
    'privacy chrome extension',
    'screen recorder chrome extension',
    'clipboard manager chrome',
    'browser lock extension',
    'privacy blur tool',
    'ad blocker chrome',
    'tracker blocker extension',
    'break reminder chrome',
    'best productivity extension',
  ],
  authors: [{ name: siteConfig.creator }],
  creator: siteConfig.creator,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: 'OneBuddy — One Extension. Everything You Need.',
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'OneBuddy Chrome Extension' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OneBuddy — One Extension. Everything You Need.',
    description: siteConfig.description,
    images: ['/og-image.jpg'],
    creator: siteConfig.twitterHandle,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  alternates: {
    canonical: siteConfig.url,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        {/* Schema.org SoftwareApplication */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'SoftwareApplication',
              name: 'OneBuddy',
              applicationCategory: 'BrowserApplication',
              operatingSystem: 'Chrome',
              url: siteConfig.url,
              description: siteConfig.description,
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'USD',
              },
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: '4.9',
                ratingCount: '2480',
                bestRating: '5',
                worstRating: '1',
              },
            }),
          }}
        />
      </head>
      <body className="font-sans antialiased bg-white text-slate-900">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
