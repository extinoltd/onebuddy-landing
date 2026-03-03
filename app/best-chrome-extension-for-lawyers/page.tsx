import type { Metadata } from 'next';
import { UseCasePageLayout } from '@/components/UseCasePage';
import { industryPagesData } from '@/lib/industry-data';

const data = industryPagesData.find(d => d.slug === 'best-chrome-extension-for-lawyers')!;

export const metadata: Metadata = {
  title: data.seoTitle,
  description: data.metaDescription,
  keywords: data.keywords,
  alternates: { canonical: `https://onebuddy.io/${data.slug}/` },
  openGraph: { title: data.seoTitle, description: data.metaDescription },
};

export default function Page() {
  return (
    <UseCasePageLayout
      persona={data.industry}
      heroTitle={data.h1}
      heroSubtitle={data.heroSubtitle}
      painPoints={data.painPoints}
      featureMappings={data.featureMappings}
      closingTitle={data.closingTitle}
      closingSubtitle={data.closingSubtitle}
      relatedLinks={data.relatedLinks}
    />
  );
}
