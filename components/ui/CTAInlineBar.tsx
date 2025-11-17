import { PrimaryButton, SecondaryButton } from './Button';
import THSCard from './THSCard';
import { cn } from '@/lib/utils';

interface CTAInlineBarProps {
  title?: string;
  description?: string;
  phone?: string;
  className?: string;
}

export default function CTAInlineBar({ 
  title = "Prefer to talk to someone?",
  description = "Call or text us at 818-825-3104 and we'll walk you through the best training option for your home.",
  phone = "8188253104",
  className = ''
}: CTAInlineBarProps) {
  return (
    <div className={cn('mt-8', className)}>
      <THSCard className="max-w-3xl mx-auto rounded-xl bg-[#0C111C] border-neutral-800/60 px-4 md:px-5 py-3 md:py-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-[0_18px_40px_rgba(0,0,0,0.85)]" hover={false}>
        <div className="flex flex-col gap-1">
          <h3 className="text-sm md:text-base font-semibold text-white">{title}</h3>
          <p className="text-xs md:text-sm text-muted-foreground">{description}</p>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <PrimaryButton 
            href={`tel:${phone}`}
            className="flex-1 sm:flex-none px-4 py-2 text-xs md:text-sm"
          >
            Call Now
          </PrimaryButton>
          <SecondaryButton 
            href={`sms:${phone}`}
            className="flex-1 sm:flex-none px-4 py-2 text-xs md:text-sm"
          >
            Text Us
          </SecondaryButton>
        </div>
      </THSCard>
    </div>
  );
}
