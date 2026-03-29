'use client';

import { useState, useEffect } from 'react';
import { Chrome, CloseCircle } from 'iconsax-react';
import { siteConfig } from '@/lib/site-config';

export function FloatingCTA() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 600);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible || dismissed) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40 animate-fade-up">
      <div className="flex items-center gap-2 bg-primary text-white rounded-full shadow-2xl pl-5 pr-2 py-2">
        <a
          href={siteConfig.extensionUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 font-semibold text-sm whitespace-nowrap"
        >
          <Chrome size={16} color="currentColor" variant="Bold" />
          Start Free Trial
        </a>
        <button
          onClick={() => setDismissed(true)}
          className="p-1.5 hover:bg-white/20 rounded-full transition-colors"
          aria-label="Dismiss"
        >
          <CloseCircle size={14} color="currentColor" />
        </button>
      </div>
    </div>
  );
}
