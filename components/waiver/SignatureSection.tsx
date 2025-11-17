'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Card from '@/components/ui/Card';

interface SignatureSectionProps {
  formData: any;
  setFormData: (data: any) => void;
  errors: any;
}

export default function SignatureSection({ formData, setFormData, errors }: SignatureSectionProps) {
  const today = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <Card className="space-y-4">
      <h2 className="text-xl font-semibold text-white mb-4">9. Final Signature</h2>

      <div className="space-y-2">
        <Label htmlFor="participantSignature">
          Participant Signature (typed full name) <span className="text-destructive">*</span>
        </Label>
        <Input
          id="participantSignature"
          required
          value={formData.participantSignature || ''}
          onChange={(e) => setFormData({ ...formData, participantSignature: e.target.value })}
          placeholder="Type your full name here"
          className={errors.participantSignature ? 'border-destructive' : ''}
        />
        {errors.participantSignature && <p className="text-sm text-destructive">{errors.participantSignature}</p>}
        <p className="text-xs text-text-muted">
          By typing your name, you are providing your electronic signature, which has the same legal effect as a handwritten signature.
        </p>
      </div>

      {formData.participantType === 'minor' && (
        <div className="space-y-2">
          <Label htmlFor="guardianSignature">
            Parent/Guardian Signature (typed full name) <span className="text-destructive">*</span>
          </Label>
          <Input
            id="guardianSignature"
            required
            value={formData.guardianSignature || ''}
            onChange={(e) => setFormData({ ...formData, guardianSignature: e.target.value })}
            placeholder="Type parent/guardian full name here"
            className={errors.guardianSignature ? 'border-destructive' : ''}
          />
          {errors.guardianSignature && <p className="text-sm text-destructive">{errors.guardianSignature}</p>}
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="signatureDate">Date</Label>
        <Input
          id="signatureDate"
          readOnly
          value={today}
          className="bg-bg-elevated cursor-not-allowed"
        />
      </div>
    </Card>
  );
}
