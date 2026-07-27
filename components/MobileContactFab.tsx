'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function MobileContactFab() {
  const [shouldHide, setShouldHide] = useState(false);
  const pathname = usePathname();
  const isFormRoute = pathname === '/contact' || pathname === '/waiver';

  useEffect(() => {
    if (isFormRoute) return;

    setShouldHide(false);
    const footer = document.getElementById('site-footer');
    const inlineContactBars = Array.from(
      document.querySelectorAll('[data-contact-cta]')
    );
    const observedElements = [footer, ...inlineContactBars].filter(
      (element): element is Element => element !== null
    );

    if (observedElements.length === 0 || !('IntersectionObserver' in window)) {
      return;
    }

    const visibility = new Map<Element, boolean>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          visibility.set(entry.target, entry.isIntersecting);
        });
        setShouldHide(Array.from(visibility.values()).some(Boolean));
      },
      {
        // Hide before an inline contact bar or footer reaches the widget so
        // the fixed control never duplicates or covers those actions.
        rootMargin: '0px 0px 112px 0px',
      },
    );

    observedElements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [isFormRoute, pathname]);

  // Both form pages already provide direct contact paths; the floating bar
  // would otherwise obscure fields and validation messages on small screens.
  if (isFormRoute) return null;

  return (
    <div
      className={`fixed z-40 mx-auto max-w-md transition-[opacity,transform] duration-200 motion-reduce:transition-none sm:hidden ${
        shouldHide
          ? 'pointer-events-none translate-y-3 opacity-0'
          : 'translate-y-0 opacity-100'
      }`}
      style={{
        left: 'max(1rem, env(safe-area-inset-left, 0px))',
        right: 'max(1rem, env(safe-area-inset-right, 0px))',
        bottom: 'calc(1rem + env(safe-area-inset-bottom, 0px))',
      }}
      aria-hidden={shouldHide}
    >
      <div className="grid grid-cols-[minmax(0,1fr)_auto_auto] items-center gap-2 rounded-2xl border border-white/15 bg-bg-card p-2 shadow-[0_16px_40px_rgba(0,0,0,0.85)]">
        <a
          href="tel:8188253104"
          className="flex min-h-11 min-w-0 flex-col justify-center rounded-lg px-2 transition-colors hover:text-accent-red focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-red motion-reduce:transition-none"
          aria-label="Call Tactical Home Solutions at 818-825-3104"
          tabIndex={shouldHide ? -1 : undefined}
        >
          <span className="text-[10px] uppercase tracking-wide text-text-muted">
            Call or text
          </span>
          <span className="whitespace-nowrap text-xs font-semibold text-white">
            818-825-3104
          </span>
        </a>

        <a
          href="tel:8188253104"
          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full bg-primary px-3 text-xs font-semibold tracking-wide text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-bg-card motion-reduce:transition-none"
          aria-label="Call 818-825-3104"
          tabIndex={shouldHide ? -1 : undefined}
        >
          Call
        </a>
        <a
          href="sms:8188253104"
          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-white/25 px-3 text-xs font-semibold tracking-wide text-white hover:border-white hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-bg-card"
          aria-label="Text 818-825-3104"
          tabIndex={shouldHide ? -1 : undefined}
        >
          Text
        </a>
      </div>
    </div>
  );
}
