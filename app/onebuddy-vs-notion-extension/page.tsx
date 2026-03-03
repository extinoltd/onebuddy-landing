import type { Metadata } from 'next';
import { ComparisonVsPageLayout } from '@/components/ComparisonVsPage';
import { comparisonPagesData } from '@/lib/comparison-data';

const data = comparisonPagesData.find(d => d.slug === 'onebuddy-vs-notion-extension')!;

export const metadata: Metadata = {
  title: data.seoTitle,
  description: data.metaDescription,
  keywords: data.keywords,
  alternates: { canonical: `https://onebuddy.io/${data.slug}/` },
  openGraph: { title: data.seoTitle, description: data.metaDescription },
};

export default function Page() {
  return <ComparisonVsPageLayout {...data} />;
}
