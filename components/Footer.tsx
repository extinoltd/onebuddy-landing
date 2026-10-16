import Link from 'next/link';
import { siteConfig, footerLinks } from '@/lib/site-config';

type FooterLink = { label: string; href: string };

function Column({ title, links }: { title: string; links: FooterLink[] }) {
  return (
    <div>
      <h4 className="font-semibold text-[#1d1d1f] text-xs mb-3">{title}</h4>
      <ul className="space-y-2.5">
        {links.map((link) => (
          <li key={link.href}>
            {link.href.startsWith('http') ? (
              <a href={link.href} target="_blank" rel="noopener noreferrer" className="text-xs hover:text-[#1d1d1f] hover:underline">{link.label}</a>
            ) : (
              <Link href={link.href} className="text-xs hover:text-[#1d1d1f] hover:underline">{link.label}</Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  const get: FooterLink[] = [
    { label: 'Add to Chrome', href: siteConfig.extensionUrl },
    { label: 'Download for Mac', href: siteConfig.macDownloadUrl || '/mac/' },
    { label: 'Pricing', href: '/#pricing' },
  ];
  return (
    <footer className="bg-[#f5f5f7] text-[#6e6e73] pt-14 pb-8">
      <div className="max-w-[1120px] mx-auto px-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-10 border-b border-black/10">
          <Link href="/" className="flex items-center gap-2.5">
            <img src="/logo.png" alt="OneBuddy" className="w-9 h-9 rounded-xl" width={36} height={36} />
            <span className="font-semibold text-lg text-[#1d1d1f] tracking-tight">OneBuddy</span>
          </Link>
          <p className="text-sm max-w-md">
            One buddy for your browser and your Mac: focus, clipboard, privacy and capture in Chrome; tasks, a launcher,
            dictation and a cleaner behind the notch.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 py-10">
          <Column title="Get OneBuddy" links={get} />
          <Column title="Product" links={footerLinks.product.filter((l) => !l.href.startsWith('http'))} />
          <Column title="Features" links={footerLinks.features} />
          <Column title="Alternatives" links={footerLinks.alternatives} />
          <Column title="Use cases" links={footerLinks.useCases} />
          <Column title="Compare" links={footerLinks.comparisons} />
        </div>

        <div className="border-t border-black/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
          <p>Copyright &copy; {new Date().getFullYear()} OneBuddy. All rights reserved.</p>
          <div className="flex items-center gap-5">
            {footerLinks.legal.map((l) => <Link key={l.href} href={l.href} className="hover:text-[#1d1d1f] hover:underline">{l.label}</Link>)}
          </div>
        </div>
      </div>
    </footer>
  );
}
