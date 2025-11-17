import CTAInlineBar from './ui/CTAInlineBar';

interface CallWidgetProps {
  variant?: 'inline' | 'card';
  showText?: boolean;
}

export default function CallWidget({ variant = 'inline', showText = true }: CallWidgetProps) {
  const phoneNumber = '818-825-3104';
  
  if (variant === 'inline') {
    return (
      <div className="flex flex-wrap items-center gap-2 text-sm text-text-secondary">
        <span>Call or text us at</span>
        <a
          href={`tel:${phoneNumber.replace(/-/g, '')}`}
          className="font-semibold text-white hover:text-accent-red transition-colors duration-150"
        >
          {phoneNumber}
        </a>
        {showText && (
          <a
            href={`sms:${phoneNumber.replace(/-/g, '')}`}
            className="text-xs text-text-muted underline-offset-2 hover:underline transition-colors duration-150"
          >
            Text instead
          </a>
        )}
      </div>
    );
  }

  // Card variant - use CTAInlineBar component
  return (
    <CTAInlineBar
      title="Have questions about training?"
      description={`Call or text ${phoneNumber} and we'll help you pick the right course.`}
      phone={phoneNumber.replace(/-/g, '')}
    />
  );
}

