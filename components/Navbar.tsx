'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import Logo from './Logo';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
  { href: '/services', label: 'Services / Training' },
  { href: '/surveillance', label: 'Surveillance Systems' },
  { href: '/products', label: 'Products' },
  { href: '/contact', label: 'Contact' },
  { href: '/waiver', label: 'Waiver' },
];

const focusRingClass =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-red focus-visible:ring-offset-2 focus-visible:ring-offset-[#05070D]';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  return (
    <nav
      className="fixed inset-x-0 top-0 z-30 border-b border-white/5 bg-[#05070D]/95 backdrop-blur-md"
      aria-label="Primary navigation"
    >
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 md:px-6 lg:px-8">
        {/* Logo - Height: 30px mobile, 36px desktop */}
        <Link
          href="/"
          className={`flex h-11 shrink-0 items-center overflow-hidden rounded-sm ${focusRingClass}`}
          aria-label="Tactical Home Solutions home"
        >
          <div className="flex h-[30px] w-auto items-center md:h-[36px]">
            <Logo
              width={80}
              priority
              className="!h-full !w-auto max-h-full"
            />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-3 lg:flex xl:gap-5">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? 'page' : undefined}
                className={`relative inline-flex min-h-11 items-center whitespace-nowrap rounded-sm text-xs font-medium transition-colors motion-reduce:transition-none xl:text-sm ${focusRingClass} ${
                  isActive
                    ? 'text-white after:absolute after:-bottom-0.5 after:left-0 after:h-[1px] after:w-full after:bg-accent-red after:origin-left after:scale-x-100 after:transition-transform after:duration-200'
                    : 'text-text-muted hover:text-white after:absolute after:-bottom-0.5 after:left-0 after:h-[1px] after:w-full after:bg-accent-red after:origin-left after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-200'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <a
            href="tel:8188253104"
            className={`inline-flex min-h-11 items-center justify-center whitespace-nowrap rounded-[4px] bg-primary px-3 text-xs font-semibold tracking-wide text-primary-foreground shadow-lg shadow-red-900/40 transition-all duration-200 hover:bg-primary/90 hover:shadow-[0_0_8px_rgba(229,57,53,0.15)] motion-reduce:transition-none xl:text-sm ${focusRingClass}`}
            aria-label="Call Tactical Home Solutions at 818-825-3104"
          >
            Call Us
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          ref={menuButtonRef}
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`inline-flex h-11 w-11 items-center justify-center rounded-sm text-text-muted transition-colors hover:text-white motion-reduce:transition-none lg:hidden ${focusRingClass}`}
          aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
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
        <div
          id="mobile-navigation"
          className="overflow-y-auto overscroll-contain border-t border-white/10 bg-bg-elevated lg:hidden"
          style={{
            maxHeight:
              'calc(100dvh - 4rem - env(safe-area-inset-bottom, 0px))',
          }}
        >
          <div className="mx-auto max-w-5xl space-y-1 px-4 py-2 md:px-6">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`flex min-h-11 items-center rounded-sm px-2 text-base font-medium transition-colors motion-reduce:transition-none ${focusRingClass} ${
                    isActive
                      ? 'bg-white/5 text-white'
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
