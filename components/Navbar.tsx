'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Logo from './Logo';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About Us' },
    { href: '/services', label: 'Services / Training' },
    { href: '/surveillance', label: 'Surveillance Systems' },
    { href: '/products', label: 'Products' },
    { href: '/contact', label: 'Contact' },
    { href: '/waiver', label: 'Waiver' },
  ];

  return (
    <nav className="fixed top-0 inset-x-0 z-40 bg-[#05070D]/95 backdrop-blur-md border-b border-white/5">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-3 md:px-4 lg:px-5 h-14 md:h-16">
        {/* Logo - Height: 30px mobile, 36px desktop */}
        <Link href="/" className="flex-shrink-0 flex items-center h-full overflow-hidden">
          <div className="h-[30px] md:h-[36px] w-auto flex items-center">
            <Logo width={80} className="!h-full !w-auto max-h-full" />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-4 md:gap-5">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors relative ${
                  isActive
                    ? 'text-white after:absolute after:-bottom-0.5 after:left-0 after:h-[1px] after:w-full after:bg-accent-red after:origin-left after:scale-x-100 after:transition-transform after:duration-200'
                    : 'text-text-muted hover:text-white after:absolute after:-bottom-0.5 after:left-0 after:h-[1px] after:w-0 after:bg-accent-red after:origin-left after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-200'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <a
            href="tel:8188253104"
            className="inline-flex items-center justify-center px-3 py-1.5 rounded-[4px] bg-primary text-primary-foreground text-sm font-semibold tracking-wide shadow-lg shadow-red-900/40 hover:bg-primary/90 hover:shadow-[0_0_8px_rgba(229,57,53,0.15)] transition-all duration-200"
          >
            Call Us
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-text-muted hover:text-white focus:outline-none transition-colors"
          aria-label="Toggle menu"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden border-t border-white/10 bg-bg-elevated">
          <div className="px-3 py-2 space-y-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`block py-3 text-base font-medium transition-colors ${
                    isActive
                      ? 'text-white'
                      : 'text-text-muted hover:text-white'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}

