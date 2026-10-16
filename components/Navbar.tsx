'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HambergerMenu, CloseSquare, Chrome, Apple } from 'iconsax-react';
import { siteConfig, navLinks } from '@/lib/site-config';

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  // On the Mac page the trial starts in the Mac app, so the button downloads it instead of opening the Chrome Web Store.
  const onMacPage = (usePathname() ?? '').startsWith('/mac') && !!siteConfig.macDownloadUrl;
  const cta = onMacPage
    ? { href: siteConfig.macDownloadUrl, external: {}, Icon: Apple, label: 'Download' }
    : { href: siteConfig.extensionUrl, external: { target: '_blank', rel: 'noopener noreferrer' }, Icon: Chrome, label: 'Start Free Trial' };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 backdrop-blur-xl backdrop-saturate-150 ${
        scrolled || open ? 'bg-white/80 border-b border-black/[0.06]' : 'bg-white/60 border-b border-transparent'
      }`}
    >
      <div className="max-w-[1120px] mx-auto px-5">
        <div className="flex items-center justify-between h-14">
          <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
            <img src="/logo.png" alt="OneBuddy Logo" className="w-7 h-7 rounded-lg" width={28} height={28} />
            <span className="font-semibold text-[17px] tracking-tight text-[#1d1d1f]">OneBuddy</span>
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="text-[13px] text-[#1d1d1f]/80 hover:text-[#1d1d1f] transition-colors">
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center">
            <a
              href={cta.href}
              {...cta.external}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-[#0071E3] hover:bg-[#0077ED] text-white text-[13px] font-medium rounded-full transition-colors"
            >
              <cta.Icon size={14} color="currentColor" variant="Bold" />
              {cta.label}
            </a>
          </div>

          <button className="lg:hidden p-2 -mr-2 text-[#1d1d1f]" onClick={() => setOpen(!open)} aria-label="Toggle menu" aria-expanded={open}>
            {open ? <CloseSquare size={22} color="currentColor" /> : <HambergerMenu size={22} color="currentColor" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden h-[calc(100vh-56px)] overflow-y-auto bg-white/95 animate-fade-in">
          <div className="max-w-[1120px] mx-auto px-8 py-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block py-3 text-[28px] font-semibold tracking-tight text-[#1d1d1f]"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-8 grid gap-3">
              <a href={siteConfig.extensionUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 py-3 bg-[#0071E3] text-white font-medium rounded-full" onClick={() => setOpen(false)}>
                <Chrome size={16} color="currentColor" variant="Bold" /> Add to Chrome
              </a>
              <a href={siteConfig.macDownloadUrl || '/mac/'} className="flex items-center justify-center gap-2 py-3 bg-[#1d1d1f] text-white font-medium rounded-full" onClick={() => setOpen(false)}>
                <Apple size={16} color="currentColor" variant="Bold" /> Download for Mac
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
