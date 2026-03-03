import type { Metadata } from 'next';
import { FeaturePageLayout } from '@/components/FeaturePage';
import { featurePagesData } from '@/lib/feature-pages-data';

const data = featurePagesData.find(f => f.slug === 'privacy-blur-extension')!;

export const metadata: Metadata = {
  title: data.seoTitle,
  description: data.metaDescription,
  keywords: data.keywords,
  alternates: { canonical: `https://onebuddy.io/${data.slug}/` },
  openGraph: { title: data.seoTitle, description: data.metaDescription },
};

export default function PrivacyBlurPage() {
  return <FeaturePageLayout {...data} />;
}
