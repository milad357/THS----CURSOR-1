import Link from 'next/link';
import { ReactNode } from 'react';
import { Button as ShadcnButton } from './button-base';
import { cn } from '@/lib/utils';

interface ButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit';
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
}

export function PrimaryButton({ children, href, onClick, className = '', type = 'button', disabled }: ButtonProps) {
  const baseClasses = cn(
    'min-h-11 rounded-[4px] px-6 py-3 text-sm font-semibold tracking-wide',
    'shadow-lg shadow-red-950/40 hover:shadow-xl hover:shadow-red-950/50',
    'transition-[color,background-color,border-color,box-shadow,filter,opacity] duration-150',
    className
  );
  if (href) {
    return <ShadcnButton asChild variant="default" className={baseClasses}><Link href={href}>{children}</Link></ShadcnButton>;
  }
  return <ShadcnButton type={type} onClick={onClick} variant="default" className={baseClasses} disabled={disabled}>{children}</ShadcnButton>;
}

export function SecondaryButton({ children, href, onClick, className = '', type = 'button', disabled }: ButtonProps) {
  const baseClasses = cn(
    'min-h-11 rounded-[4px] px-6 py-3 text-sm font-semibold tracking-wide',
    'border border-white/50 text-white hover:border-white/80 hover:bg-white/10 active:bg-white/15',
    'transition-[color,background-color,border-color,box-shadow,filter,opacity] duration-150',
    className
  );
  if (href) {
    return <ShadcnButton asChild variant="outline" className={baseClasses}><Link href={href}>{children}</Link></ShadcnButton>;
  }
  return <ShadcnButton type={type} onClick={onClick} variant="outline" className={baseClasses} disabled={disabled}>{children}</ShadcnButton>;
}

export const OutlineButton = SecondaryButton;
