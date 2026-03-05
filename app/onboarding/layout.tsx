import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Welcome to OneBuddy — Your All-in-One Chrome Companion',
  description:
    'Get started with OneBuddy. Set up your productivity, wellness, and privacy tools in 30 seconds.',
  robots: { index: false, follow: false },
};

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <style>{`
        nav { display: none !important; }
        footer { display: none !important; }
        body { background: #0a0815 !important; overflow: hidden; }
      `}</style>
      {children}
    </>
  );
}
