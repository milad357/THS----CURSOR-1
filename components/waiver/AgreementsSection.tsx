'use client';

import { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import Card from '@/components/ui/Card';
import { waiverSections } from '@/lib/waiverSections';

interface AgreementsSectionProps {
  formData: any;
  setFormData: (data: any) => void;
  errors: any;
}

export default function AgreementsSection({ formData, setFormData, errors }: AgreementsSectionProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const handleAgreementChange = (sectionId: string, checked: boolean) => {
    const agreements = formData.agreements || {};
    setFormData({
      ...formData,
      agreements: { ...agreements, [sectionId]: checked }
    });
  };

  return (
    <Card className="space-y-6">
      <h2 className="text-xl font-semibold text-white mb-4">5. Agreement Sections</h2>
      <p className="text-sm text-text-muted mb-6">
        Please read each section carefully and check the box to indicate you have read and agree to each clause.
      </p>

      {waiverSections.map((section) => {
        const isExpanded = expandedSection === section.id;
        const isAgreed = formData.agreements?.[section.id] || false;

        return (
          <div key={section.id} className="border border-white/10 rounded-lg p-4 space-y-3">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h3 className="text-base font-semibold text-white mb-1">{section.title}</h3>
                <p className="text-sm text-text-muted">{section.summary}</p>
              </div>
            </div>

            <div className="space-y-2">
              <button
                type="button"
                onClick={() => setExpandedSection(isExpanded ? null : section.id)}
                className="text-sm text-accent-red hover:text-red-400 transition-colors"
              >
                {isExpanded ? 'Hide full text' : 'Read full text'}
              </button>

              {isExpanded && (
                <div className="max-h-60 overflow-y-auto p-3 bg-bg-elevated rounded border border-white/5 text-sm text-text-secondary leading-relaxed">
                  {section.fullText}
                </div>
              )}
            </div>

            <div className="flex items-start gap-3 pt-2 border-t border-white/5">
              <Checkbox
                id={`agreement-${section.id}`}
                checked={isAgreed}
                onCheckedChange={(checked) => handleAgreementChange(section.id, checked as boolean)}
                className="mt-1"
              />
              <Label
                htmlFor={`agreement-${section.id}`}
                className="text-sm cursor-pointer flex-1"
              >
                I have read and agree to this section. <span className="text-destructive">*</span>
              </Label>
            </div>
            {errors.agreements?.[section.id] && (
              <p className="text-sm text-destructive ml-7">{errors.agreements[section.id]}</p>
            )}
          </div>
        );
      })}
    </Card>
  );
}
