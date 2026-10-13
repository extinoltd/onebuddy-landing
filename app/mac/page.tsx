import type { Metadata } from 'next';
import { MacLanding } from '@/components/MacLanding';
import { siteConfig } from '@/lib/site-config';
import './mac.css';

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

export default function MacPage() {
  return <MacLanding />;
}
