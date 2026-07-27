import Link from 'next/link';
import Logo from './Logo';
import MetaLabel from './ui/MetaLabel';

const footerLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Training' },
  { href: '/surveillance', label: 'Surveillance' },
  { href: '/products', label: 'Products' },
  { href: '/contact', label: 'Contact' },
  { href: '/waiver', label: 'Waiver' },
];

const footerLinkClass =
  'inline-flex min-h-11 min-w-11 items-center justify-center whitespace-nowrap px-1 transition-colors hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-red focus-visible:ring-offset-2 focus-visible:ring-offset-[#030509] motion-reduce:transition-none';

export default function Footer() {
  return (
    <footer
      id="site-footer"
      className="relative border-t border-neutral-800/60 bg-[#030509]"
    >
      {/* Top gradient shadow */}
      <div
        className="absolute inset-x-0 top-0 h-1 bg-gradient-to-b from-neutral-900/40 to-transparent"
        aria-hidden="true"
      />

      {/* Status bar */}
      <div className="border-b border-neutral-800/40">
        <div className="mx-auto max-w-5xl px-4 py-2 md:px-6 lg:px-8">
          <MetaLabel className="text-center">
            SYSTEM STATUS: ONLINE / VERSION 3.0
          </MetaLabel>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-5 py-6 text-xs text-text-muted md:grid-cols-[minmax(0,1fr)_auto] md:gap-x-8 md:py-8 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]">
          <div className="flex items-center justify-center gap-3 md:justify-start">
            <Logo
              width={160}
              className="!w-36 md:!w-40"
            />
          </div>

          <nav
            aria-label="Footer navigation"
            className="order-3 flex flex-wrap items-center justify-center gap-x-3 md:col-span-2 md:gap-x-5 lg:order-none lg:col-span-1 lg:flex-nowrap"
          >
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={footerLinkClass}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <address className="flex flex-col items-center not-italic md:items-end lg:justify-self-end">
            <a
              href="mailto:info@ths247.com"
              className={footerLinkClass}
            >
              info@ths247.com
            </a>
            <a
              href="tel:8188253104"
              className={footerLinkClass}
              aria-label="Call Tactical Home Solutions at 818-825-3104"
            >
              818-825-3104
            </a>
          </address>
        </div>

        <div className="border-t border-neutral-800/40 py-4">
          <p className="mx-auto max-w-3xl text-center text-xs leading-relaxed text-text-muted">
            All training is for educational and hypothetical scenarios only. For real emergencies, dial 911.
          </p>
        </div>
      </div>
    </footer>
  );
}
