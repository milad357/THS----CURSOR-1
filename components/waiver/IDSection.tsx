'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Card from '@/components/ui/Card';

interface IDSectionProps {
  formData: any;
  setFormData: (data: any) => void;
  errors: any;
}

const US_STATES = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware',
  'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky',
  'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
  'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico',
  'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania',
  'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
  'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
];

export default function IDSection({ formData, setFormData, errors }: IDSectionProps) {
  return (
    <Card className="space-y-4">
      <h2 className="text-xl font-semibold text-white mb-4">4. Driver's License / ID</h2>
      
      <div className="space-y-2">
        <Label htmlFor="licenseNumber">
          Driver's License / ID Card Number <span className="text-destructive">*</span>
        </Label>
        <Input
          id="licenseNumber"
          required
          value={formData.licenseNumber || ''}
          onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
          placeholder="Enter license or ID number"
          className={errors.licenseNumber ? 'border-destructive' : ''}
        />
        {errors.licenseNumber && <p className="text-sm text-destructive">{errors.licenseNumber}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="licenseState">
          Issuing State <span className="text-destructive">*</span>
        </Label>
        <Select
          value={formData.licenseState || ''}
          onValueChange={(value) => setFormData({ ...formData, licenseState: value })}
        >
          <SelectTrigger className={errors.licenseState ? 'border-destructive' : ''}>
            <SelectValue placeholder="Select issuing state" />
          </SelectTrigger>
          <SelectContent>
            {US_STATES.map((state) => (
              <SelectItem key={state} value={state}>
                {state}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.licenseState && <p className="text-sm text-destructive">{errors.licenseState}</p>}
      </div>
    </Card>
  );
}
