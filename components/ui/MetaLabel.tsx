import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface MetaLabelProps {
  children: ReactNode;
  className?: string;
}

export default function MetaLabel({ children, className = '' }: MetaLabelProps) {
  return (
    <div className={cn(
      'text-[10px] uppercase tracking-[0.18em] text-muted-foreground font-mono',
      className
    )}>
      {children}
    </div>
  );
}
