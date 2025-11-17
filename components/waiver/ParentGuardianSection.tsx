'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import Card from '@/components/ui/Card';

interface ParentGuardianSectionProps {
  formData: any;
  setFormData: (data: any) => void;
  errors: any;
}

const RELATIONSHIPS = [
  'Parent',
  'Legal Guardian',
  'Grandparent',
  'Other Relative',
  'Other'
];

export default function ParentGuardianSection({ formData, setFormData, errors }: ParentGuardianSectionProps) {
  if (formData.participantType !== 'minor') {
    return null;
  }

  return (
    <Card className="space-y-4">
      <h2 className="text-xl font-semibold text-white mb-4">8. Parent / Guardian Information</h2>
      <p className="text-sm text-text-muted mb-4">
        As the parent or legal guardian of a minor participant, you must complete this section and agree to all terms on the minor's behalf.
      </p>

      <div className="space-y-2">
        <Label htmlFor="guardianName">
          Parent/Guardian Full Name <span className="text-destructive">*</span>
        </Label>
        <Input
          id="guardianName"
          required
          value={formData.guardianName || ''}
          onChange={(e) => setFormData({ ...formData, guardianName: e.target.value })}
          placeholder="Jane Doe"
          className={errors.guardianName ? 'border-destructive' : ''}
        />
        {errors.guardianName && <p className="text-sm text-destructive">{errors.guardianName}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="guardianRelationship">
          Relationship to Minor <span className="text-destructive">*</span>
        </Label>
        <Select
          value={formData.guardianRelationship || ''}
          onValueChange={(value) => setFormData({ ...formData, guardianRelationship: value })}
        >
          <SelectTrigger className={errors.guardianRelationship ? 'border-destructive' : ''}>
            <SelectValue placeholder="Select relationship" />
          </SelectTrigger>
          <SelectContent>
            {RELATIONSHIPS.map((rel) => (
              <SelectItem key={rel} value={rel}>
                {rel}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.guardianRelationship && <p className="text-sm text-destructive">{errors.guardianRelationship}</p>}
      </div>

      <div className="flex items-start gap-3 pt-2">
        <Checkbox
          id="guardianAgreement"
          checked={formData.guardianAgreement || false}
          onCheckedChange={(checked) => setFormData({ ...formData, guardianAgreement: checked })}
        />
        <Label
          htmlFor="guardianAgreement"
          className="text-sm cursor-pointer flex-1"
        >
          I am the parent or legal guardian of the minor participant and agree to all terms on the minor's behalf. <span className="text-destructive">*</span>
        </Label>
      </div>
      {errors.guardianAgreement && (
        <p className="text-sm text-destructive ml-7">{errors.guardianAgreement}</p>
      )}
    </Card>
  );
}
