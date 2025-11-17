'use client';

import { useState, useEffect } from 'react';

export default function AgeGate() {
  const [isVerified, setIsVerified] = useState<boolean | null>(null);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    // Check localStorage on mount
    const verified = localStorage.getItem('ageVerified') === 'true';
    setIsVerified(verified);
  }, []);

  const handleEnter = () => {
    if (isChecked) {
      localStorage.setItem('ageVerified', 'true');
      setIsVerified(true);
    }
  };

  if (isVerified === null) {
    // Still checking localStorage
    return null;
  }

  if (isVerified) {
    // User has already verified
    return null;
  }

  // Show age gate
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="max-w-md w-full mx-4 bg-bg-elevated border border-white/15 rounded-2xl p-6 md:p-8 text-center space-y-4 shadow-[0_24px_60px_rgba(0,0,0,0.85)]">
        <h1 className="text-xl md:text-2xl font-semibold text-white">
          Age Verification – 21+ Only
        </h1>
        
        <p className="text-sm text-text-secondary leading-relaxed">
          You must be 21 or older to enter this site. By continuing, you acknowledge that all content is educational and based on hypothetical scenarios.
        </p>

        <div className="flex items-start gap-3 text-left text-sm text-text-secondary">
          <input
            type="checkbox"
            id="age-check"
            checked={isChecked}
            onChange={(e) => setIsChecked(e.target.checked)}
            className="mt-1 w-5 h-5 accent-accent-red cursor-pointer"
          />
          <label htmlFor="age-check" className="cursor-pointer">
            I understand and wish to enter
          </label>
        </div>

        <button
          onClick={handleEnter}
          disabled={!isChecked}
          className="w-full mt-4 inline-flex items-center justify-center px-6 py-3 rounded-[4px] bg-accent-red text-sm font-semibold tracking-wide text-white shadow-lg shadow-red-900/40 hover:bg-red-600 transition-all duration-200 hover:translate-y-[1px] disabled:bg-gray-700 disabled:cursor-not-allowed disabled:hover:translate-y-0"
        >
          Enter Site
        </button>
      </div>
    </div>
  );
}

