'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { HambergerMenu, CloseSquare, Chrome } from 'iconsax-react';
import { siteConfig, navLinks } from '@/lib/site-config';

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white border-b border-slate-200 shadow-sm'
          : 'bg-white/0'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group" onClick={() => setOpen(false)}>
            <img
              src="/logo.png"
              alt="OneBuddy Logo"
              className="w-9 h-9 rounded-xl"
              width={36}
              height={36}
            />
            <span className="font-extrabold text-xl tracking-tight text-slate-900">
              One<span className="text-primary">Buddy</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-slate-600 hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href={siteConfig.extensionUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary-dark text-white text-sm font-semibold rounded-full transition-colors"
            >
              <Chrome size={16} color="currentColor" variant="Bold" />
              Add to Chrome — Free
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden p-2 text-slate-700"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <CloseSquare size={24} color="currentColor" /> : <HambergerMenu size={24} color="currentColor" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="lg:hidden bg-white border-t border-slate-100 shadow-xl animate-fade-in">
          <div className="max-w-7xl mx-auto px-4 py-6 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-4 py-3 text-slate-700 hover:text-primary hover:bg-primary/5 rounded-xl font-medium transition-colors"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4">
              <a
                href={siteConfig.extensionUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full px-5 py-3 bg-primary text-white font-semibold rounded-full"
                onClick={() => setOpen(false)}
              >
                <Chrome size={16} color="currentColor" variant="Bold" />
                Add to Chrome — Free
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
