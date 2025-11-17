'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Card from '@/components/ui/Card';

interface ContactSectionProps {
  formData: any;
  setFormData: (data: any) => void;
  errors: any;
}

export default function ContactSection({ formData, setFormData, errors }: ContactSectionProps) {
  return (
    <Card className="space-y-4">
      <h2 className="text-xl font-semibold text-white mb-4">3. Contact & Emergency Details</h2>
      
      <div className="space-y-2">
        <Label htmlFor="confirmEmail">
          Confirm Email <span className="text-destructive">*</span>
        </Label>
        <Input
          id="confirmEmail"
          type="email"
          required
          value={formData.confirmEmail || ''}
          onChange={(e) => setFormData({ ...formData, confirmEmail: e.target.value })}
          placeholder="john.doe@example.com"
          className={errors.confirmEmail ? 'border-destructive' : ''}
        />
        {errors.confirmEmail && <p className="text-sm text-destructive">{errors.confirmEmail}</p>}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="emergencyFirstName">
            Emergency Contact First Name <span className="text-destructive">*</span>
          </Label>
          <Input
            id="emergencyFirstName"
            required
            value={formData.emergencyFirstName || ''}
            onChange={(e) => setFormData({ ...formData, emergencyFirstName: e.target.value })}
            placeholder="Jane"
            className={errors.emergencyFirstName ? 'border-destructive' : ''}
          />
          {errors.emergencyFirstName && <p className="text-sm text-destructive">{errors.emergencyFirstName}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="emergencyLastName">
            Emergency Contact Last Name <span className="text-destructive">*</span>
          </Label>
          <Input
            id="emergencyLastName"
            required
            value={formData.emergencyLastName || ''}
            onChange={(e) => setFormData({ ...formData, emergencyLastName: e.target.value })}
            placeholder="Doe"
            className={errors.emergencyLastName ? 'border-destructive' : ''}
          />
          {errors.emergencyLastName && <p className="text-sm text-destructive">{errors.emergencyLastName}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="emergencyPhone">
          Emergency Contact Phone <span className="text-destructive">*</span>
        </Label>
        <Input
          id="emergencyPhone"
          type="tel"
          required
          value={formData.emergencyPhone || ''}
          onChange={(e) => setFormData({ ...formData, emergencyPhone: e.target.value })}
          placeholder="(818) 555-5678"
          className={errors.emergencyPhone ? 'border-destructive' : ''}
        />
        {errors.emergencyPhone && <p className="text-sm text-destructive">{errors.emergencyPhone}</p>}
      </div>
    </Card>
  );
}
