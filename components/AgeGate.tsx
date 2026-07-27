'use client';

import { KeyboardEvent, useEffect, useRef, useState } from 'react';

export default function AgeGate() {
  const [isVerified, setIsVerified] = useState<boolean | null>(null);
  const [isChecked, setIsChecked] = useState(false);
  const gateRef = useRef<HTMLDivElement>(null);
  const checkboxRef = useRef<HTMLInputElement>(null);
  const enterButtonRef = useRef<HTMLButtonElement>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    let verified = false;

    try {
      verified = window.localStorage.getItem('ageVerified') === 'true';
    } catch {
      // Storage may be unavailable in privacy-restricted contexts.
    }

    setIsVerified(verified);
  }, []);

  useEffect(() => {
    if (isVerified !== false || !gateRef.current) {
      return;
    }

    const gate = gateRef.current;
    const pageElements = Array.from(document.body.children).filter(
      (element): element is HTMLElement =>
        element instanceof HTMLElement &&
        element !== gate &&
        !element.contains(gate) &&
        element.tagName !== 'SCRIPT'
    );
    const previousPageState = pageElements.map((element) => ({
      element,
      inert: element.inert,
      ariaHidden: element.getAttribute('aria-hidden'),
    }));
    const previousBodyOverflow = document.body.style.overflow;
    const previousBodyOverscroll = document.body.style.overscrollBehavior;
    const previousHtmlOverflow = document.documentElement.style.overflow;

    previouslyFocusedRef.current =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;

    pageElements.forEach((element) => {
      element.inert = true;
      element.setAttribute('aria-hidden', 'true');
    });
    document.body.style.overflow = 'hidden';
    document.body.style.overscrollBehavior = 'none';
    document.documentElement.style.overflow = 'hidden';

    const focusFrame = window.requestAnimationFrame(() => {
      checkboxRef.current?.focus();
    });

    return () => {
      window.cancelAnimationFrame(focusFrame);
      previousPageState.forEach(({ element, inert, ariaHidden }) => {
        element.inert = inert;
        if (ariaHidden === null) {
          element.removeAttribute('aria-hidden');
        } else {
          element.setAttribute('aria-hidden', ariaHidden);
        }
      });
      document.body.style.overflow = previousBodyOverflow;
      document.body.style.overscrollBehavior = previousBodyOverscroll;
      document.documentElement.style.overflow = previousHtmlOverflow;

      const previousFocus = previouslyFocusedRef.current;
      if (previousFocus?.isConnected) {
        previousFocus.focus();
      }
    };
  }, [isVerified]);

  const handleEnter = () => {
    if (!isChecked) {
      return;
    }

    try {
      window.localStorage.setItem('ageVerified', 'true');
    } catch {
      // Continue for this session if persistent storage is unavailable.
    }

    setIsVerified(true);
  };

  const handleDialogKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') {
      // Verification is required, so Escape must not expose the page underneath.
      event.preventDefault();
      checkboxRef.current?.focus();
      return;
    }

    if (event.key !== 'Tab') {
      return;
    }

    const focusableElements = [checkboxRef.current, enterButtonRef.current].filter(
      (element): element is HTMLInputElement | HTMLButtonElement =>
        element !== null &&
        !element.disabled
    );

    if (focusableElements.length === 0) {
      event.preventDefault();
      return;
    }

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    const activeElement = document.activeElement;

    if (event.shiftKey && (activeElement === firstElement || !gateRef.current?.contains(activeElement))) {
      event.preventDefault();
      lastElement.focus();
    } else if (!event.shiftKey && (activeElement === lastElement || !gateRef.current?.contains(activeElement))) {
      event.preventDefault();
      firstElement.focus();
    }
  };

  if (isVerified === null) {
    return (
      <div
        className="fixed inset-0 z-[100000] bg-background"
        aria-live="polite"
        aria-label="Checking age verification status"
      >
        <span className="sr-only">Checking age verification status</span>
      </div>
    );
  }

  if (isVerified) {
    return null;
  }

  return (
    <div
      ref={gateRef}
      className="fixed inset-0 z-[100000] flex items-center justify-center overflow-y-auto bg-black/85 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="age-gate-title"
      aria-describedby="age-gate-description age-gate-requirement"
      onKeyDown={handleDialogKeyDown}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          checkboxRef.current?.focus();
        }
      }}
    >
      <div className="my-auto w-full max-w-md space-y-5 rounded-2xl border border-input bg-bg-elevated p-6 text-center shadow-[0_24px_60px_rgba(0,0,0,0.85)] md:p-8">
        <h2 id="age-gate-title" className="text-xl font-semibold text-white md:text-2xl">
          Age Verification – 21+ Only
        </h2>
        
        <p id="age-gate-description" className="text-sm leading-relaxed text-text-secondary">
          You must be 21 or older to enter this site. By continuing, you acknowledge that all content is educational and based on hypothetical scenarios.
        </p>

        <label
          htmlFor="age-check"
          className="flex min-h-11 cursor-pointer items-center gap-3 rounded-md border border-white/20 bg-white/[0.03] px-3 py-2 text-left text-sm text-text-secondary hover:border-white/35"
        >
          <input
            ref={checkboxRef}
            type="checkbox"
            id="age-check"
            checked={isChecked}
            onChange={(e) => setIsChecked(e.target.checked)}
            className="h-5 w-5 shrink-0 cursor-pointer accent-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg-elevated"
          />
          <span>I confirm that I am 21 or older and wish to enter.</span>
        </label>

        <button
          ref={enterButtonRef}
          type="button"
          onClick={handleEnter}
          disabled={!isChecked}
          className="inline-flex min-h-11 w-full items-center justify-center rounded-[4px] bg-primary px-6 py-3 text-sm font-semibold tracking-wide text-primary-foreground shadow-lg shadow-red-950/40 transition-[color,background-color,box-shadow,filter,opacity] duration-150 hover:bg-primary/90 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg-elevated active:brightness-95 disabled:cursor-not-allowed disabled:bg-neutral-700 disabled:text-neutral-300 disabled:opacity-70"
        >
          Enter Site
        </button>

        <p id="age-gate-requirement" className="text-xs leading-relaxed text-muted-foreground">
          Age confirmation is required before the rest of the site can be accessed.
        </p>
      </div>
    </div>
  );
}
