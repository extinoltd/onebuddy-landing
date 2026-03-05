import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "We're Sorry to See You Go — OneBuddy",
  description:
    'Help us improve OneBuddy by sharing why you uninstalled. Your feedback makes OneBuddy better for everyone.',
  robots: { index: false, follow: false },
};

export default function UninstallLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <style>{`
        nav { display: none !important; }
        footer { display: none !important; }
        body { background: #0a0815 !important; }
      `}</style>
      {children}
    </>
  );
}
