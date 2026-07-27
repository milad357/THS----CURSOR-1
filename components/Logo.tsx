'use client';

import Image from 'next/image';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

interface LogoProps {
  variant?: 'light' | 'dark' | 'gray';
  width?: number;
  className?: string;
  alt?: string;
  decorative?: boolean;
  priority?: boolean;
}

export default function Logo({
  variant,
  width = 150,
  className = '',
  alt = 'T.H.S. Tactical Home Solutions',
  decorative = false,
  priority = false,
}: LogoProps) {
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Determine which variant to use
  let logoVariant: 'light' | 'dark' | 'gray' = variant || 'dark';
  
  if (!variant && mounted) {
    try {
      // Auto-detect theme if no variant specified
      const currentTheme = theme === 'system' ? systemTheme : theme;
      logoVariant = currentTheme === 'light' ? 'light' : 'dark';
    } catch (e) {
      // Fallback to dark if theme detection fails
      logoVariant = 'dark';
    }
  }

  const logoPath = `/logo-${logoVariant}.png`;

  // Fallback text if image fails to load
  if (imgError) {
    return (
      <div 
        className={`inline-block ${className}`} 
        style={{ width: `${width}px` }}
        role={decorative ? undefined : 'img'}
        aria-label={decorative ? undefined : alt}
        aria-hidden={decorative || undefined}
      >
        <span className="text-xl font-bold text-white">
          T.H.S. <span className="text-red-600">Tactical Home Solutions</span>
        </span>
      </div>
    );
  }

  // Preserve the transparent wordmark's native dimensions.
  const aspectRatio = 1200 / 601;
  const height = Math.round(width / aspectRatio);

  return (
    <div className={`inline-block ${className}`} style={{ width: `${width}px`, maxWidth: '100%', background: 'transparent' }}>
      <Image
        src={logoPath}
        alt={decorative ? '' : alt}
        aria-hidden={decorative || undefined}
        width={width}
        height={height}
        className="block h-full w-full select-none object-contain"
        priority={priority}
        loading={priority ? undefined : 'lazy'}
        sizes={`${width}px`}
        draggable={false}
        style={{ width: '100%', height: '100%', objectFit: 'contain', background: 'transparent' }}
        onError={() => setImgError(true)}
        unoptimized={process.env.NODE_ENV === 'development'}
      />
    </div>
  );
}
