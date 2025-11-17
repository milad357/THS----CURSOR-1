import { ReactNode } from 'react';
import MetaLabel from './MetaLabel';

interface SectionHeadingProps {
  sector?: string;
  children: ReactNode;
  className?: string;
}

export default function SectionHeading({ sector, children, className = '' }: SectionHeadingProps) {
  return (
    <div className={className}>
      {sector && (
        <MetaLabel className="mb-2">
          {sector}
        </MetaLabel>
      )}
      {children}
    </div>
  );
}

