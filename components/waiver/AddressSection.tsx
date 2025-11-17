'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Card from '@/components/ui/Card';

interface AddressSectionProps {
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

export default function AddressSection({ formData, setFormData, errors }: AddressSectionProps) {
  return (
    <Card className="space-y-4">
      <h2 className="text-xl font-semibold text-white mb-4">2. Participant Address</h2>
      
      <div className="space-y-2">
        <Label htmlFor="addressLine1">
          Address Line 1 <span className="text-destructive">*</span>
        </Label>
        <Input
          id="addressLine1"
          required
          value={formData.addressLine1 || ''}
          onChange={(e) => setFormData({ ...formData, addressLine1: e.target.value })}
          placeholder="123 Main Street"
          className={errors.addressLine1 ? 'border-destructive' : ''}
        />
        {errors.addressLine1 && <p className="text-sm text-destructive">{errors.addressLine1}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="addressLine2">Address Line 2 (Optional)</Label>
        <Input
          id="addressLine2"
          value={formData.addressLine2 || ''}
          onChange={(e) => setFormData({ ...formData, addressLine2: e.target.value })}
          placeholder="Apt, Suite, Unit, etc."
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="city">
            City <span className="text-destructive">*</span>
          </Label>
          <Input
            id="city"
            required
            value={formData.city || ''}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            placeholder="Los Angeles"
            className={errors.city ? 'border-destructive' : ''}
          />
          {errors.city && <p className="text-sm text-destructive">{errors.city}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="state">
            State <span className="text-destructive">*</span>
          </Label>
          <Select
            value={formData.state || ''}
            onValueChange={(value) => setFormData({ ...formData, state: value })}
          >
            <SelectTrigger className={errors.state ? 'border-destructive' : ''}>
              <SelectValue placeholder="Select state" />
            </SelectTrigger>
            <SelectContent>
              {US_STATES.map((state) => (
                <SelectItem key={state} value={state}>
                  {state}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.state && <p className="text-sm text-destructive">{errors.state}</p>}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="zip">
            Zip / Postal Code <span className="text-destructive">*</span>
          </Label>
          <Input
            id="zip"
            required
            value={formData.zip || ''}
            onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
            placeholder="90001"
            className={errors.zip ? 'border-destructive' : ''}
          />
          {errors.zip && <p className="text-sm text-destructive">{errors.zip}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="country">
            Country <span className="text-destructive">*</span>
          </Label>
          <Input
            id="country"
            required
            value={formData.country || 'United States'}
            onChange={(e) => setFormData({ ...formData, country: e.target.value })}
            className={errors.country ? 'border-destructive' : ''}
          />
          {errors.country && <p className="text-sm text-destructive">{errors.country}</p>}
        </div>
      </div>
    </Card>
  );
}
