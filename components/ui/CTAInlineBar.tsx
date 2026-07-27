import { PrimaryButton, SecondaryButton } from './Button';
import Card from './Card';
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
    <div data-contact-cta className={cn('mt-8', className)}>
      <Card className="mx-auto flex max-w-3xl flex-row flex-wrap items-center gap-4 rounded-xl border-border/70 bg-[#0C111C] px-4 py-4 shadow-[0_18px_40px_rgba(0,0,0,0.85)] md:px-5" hover={false}>
        <div className="min-w-0 flex-[999_1_20rem]">
          <h2 className="text-sm md:text-base font-semibold text-white">{title}</h2>
          <p className="mt-1 break-words text-sm leading-relaxed text-muted-foreground">{description}</p>
        </div>
        <div className="flex min-w-0 max-w-sm flex-[1_1_13rem] items-center gap-2">
          <PrimaryButton 
            href={`tel:${phone}`}
            className="min-w-0 flex-1 px-4 text-sm"
          >
            Call Now
          </PrimaryButton>
          <SecondaryButton 
            href={`sms:${phone}`}
            className="min-w-0 flex-1 px-4 text-sm"
          >
            Text Us
          </SecondaryButton>
        </div>
      </Card>
    </div>
  );
}
