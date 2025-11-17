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

export function PrimaryButton({ children, href, onClick, className = '', type = 'button', variant = 'primary', disabled }: ButtonProps) {
  const baseClasses = cn('rounded-[4px] px-6 py-3 text-sm font-semibold tracking-wide', 'shadow-lg shadow-red-900/40 hover:shadow-xl hover:shadow-red-900/50', 'transition-all duration-150 hover:translate-y-[1px] active:translate-y-[2px]', className);
  if (href) {
    return <ShadcnButton asChild variant="default" className={baseClasses}><Link href={href}>{children}</Link></ShadcnButton>;
  }
  return <ShadcnButton type={type} onClick={onClick} variant="default" className={baseClasses} disabled={disabled}>{children}</ShadcnButton>;
}

export function SecondaryButton({ children, href, onClick, className = '', type = 'button', variant = 'secondary' }: ButtonProps) {
  const baseClasses = cn('rounded-[4px] px-6 py-3 text-sm font-semibold tracking-wide', 'border border-white/35 text-white/90 hover:border-white hover:bg-white/5', 'transition-all duration-150 hover:translate-y-[1px] active:translate-y-[2px] active:bg-white/10', className);
  if (href) {
    return <ShadcnButton asChild variant="outline" className={baseClasses}><Link href={href}>{children}</Link></ShadcnButton>;
  }
  return <ShadcnButton type={type} onClick={onClick} variant="outline" className={baseClasses}>{children}</ShadcnButton>;
}

export const OutlineButton = SecondaryButton;
