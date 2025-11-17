'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import Card from '@/components/ui/Card';

interface ElectronicSignatureSectionProps {
  formData: any;
  setFormData: (data: any) => void;
  errors: any;
}

export default function ElectronicSignatureSection({ formData, setFormData, errors }: ElectronicSignatureSectionProps) {
  return (
    <Card className="space-y-4">
      <h2 className="text-xl font-semibold text-white mb-4">7. Electronic Signature Consent</h2>
      <p className="text-sm text-text-muted mb-4">
        By providing your electronic signature below, you consent to the use of electronic signatures in place of original handwritten signatures.
      </p>

      <div className="flex items-start gap-3">
        <Checkbox
          id="electronicSignatureConsent"
          checked={formData.electronicSignatureConsent || false}
          onCheckedChange={(checked) => setFormData({ ...formData, electronicSignatureConsent: checked })}
        />
        <Label
          htmlFor="electronicSignatureConsent"
          className="text-sm cursor-pointer flex-1"
        >
          By checking here, I consent to use of my electronic signature in place of an original signature on paper. <span className="text-destructive">*</span>
        </Label>
      </div>
      {errors.electronicSignatureConsent && (
        <p className="text-sm text-destructive ml-7">{errors.electronicSignatureConsent}</p>
      )}
    </Card>
  );
}
