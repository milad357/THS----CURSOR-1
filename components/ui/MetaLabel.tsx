import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface MetaLabelProps {
  children: ReactNode;
  className?: string;
}

export default function MetaLabel({ children, className = '' }: MetaLabelProps) {
  return (
    <div className={cn(
      'font-mono text-xs font-medium uppercase leading-5 tracking-[0.14em] text-muted-foreground',
      className
    )}>
      {children}
    </div>
  );
}
