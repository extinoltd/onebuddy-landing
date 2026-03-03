import Link from 'next/link';
import { siteConfig, footerLinks } from '@/lib/site-config';

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10 mb-16">
          {/* Brand */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-5">
              <img
                src="/logo.png"
                alt="OneBuddy"
                className="w-9 h-9 rounded-xl"
                width={36}
                height={36}
              />
              <span className="font-extrabold text-xl text-white">
                One<span className="text-primary-light">Buddy</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed max-w-xs mb-6">
              One extension to replace them all. Productivity, health reminders, privacy
              tools & screen capture in a single Chrome side panel.
            </p>
            <a
              href={siteConfig.extensionUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary/20 hover:bg-primary/30 text-primary-light text-sm font-semibold rounded-full transition-colors"
            >
              Add to Chrome — Free
            </a>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-semibold text-white text-sm uppercase tracking-wider mb-5">
              Product
            </h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.href}>
                  {link.href.startsWith('http') ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-sm hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Features */}
          <div>
            <h4 className="font-semibold text-white text-sm uppercase tracking-wider mb-5">
              Features
            </h4>
            <ul className="space-y-3">
              {footerLinks.features.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Alternatives */}
          <div>
            <h4 className="font-semibold text-white text-sm uppercase tracking-wider mb-5">
              Alternatives
            </h4>
            <ul className="space-y-3">
              {footerLinks.alternatives.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Use Cases & Legal */}
          <div className="col-span-2 md:col-span-1">
            <h4 className="font-semibold text-white text-sm uppercase tracking-wider mb-5">
              Use Cases
            </h4>
            <ul className="space-y-3">
              {footerLinks.useCases.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <h4 className="font-semibold text-white text-sm uppercase tracking-wider mt-8 mb-5">
              Legal
            </h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
          <p>&copy; {new Date().getFullYear()} OneBuddy. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              All systems operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
