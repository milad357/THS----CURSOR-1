import { ReactNode } from 'react';
import { Card as ShadcnCard, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from './card-base';
import { cn } from '@/lib/utils';

interface THSCardProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'intel' | 'elevated';
  hover?: boolean;
}

function THSCard({ 
  children, 
  className = '', 
  variant = 'default', 
  hover = true 
}: THSCardProps) {
  const variantClasses = {
    default: 'gap-3',
    intel: 'border-t-2 border-t-red-500/70 relative overflow-hidden group gap-3',
    elevated: 'bg-bg-elevated gap-3',
  };
  
  const hoverClasses = hover 
    ? 'hover:border-white/15 hover:-translate-y-[2px] hover:shadow-[0_22px_50px_rgba(0,0,0,0.9)] transition-all duration-200'
    : '';
  
  return (
    <ShadcnCard 
      className={cn(
        'border-white/5 rounded-xl p-5 md:p-6 flex flex-col shadow-[0_18px_40px_rgba(0,0,0,0.55)]',
        variantClasses[variant],
        hoverClasses,
        className
      )}
    >
      {children}
    </ShadcnCard>
  );
}

// Export shadcn card components for direct use
export { CardContent, CardHeader, CardTitle, CardDescription, CardFooter };

// Default export
export default THSCard;
