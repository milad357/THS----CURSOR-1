'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Card from '@/components/ui/Card';

interface ParticipantInfoSectionProps {
  formData: any;
  setFormData: (data: any) => void;
  errors: any;
}

export default function ParticipantInfoSection({ formData, setFormData, errors }: ParticipantInfoSectionProps) {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <Card className="space-y-4">
      <h2 className="text-xl font-semibold text-white mb-4">1. Participant Information</h2>
      
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">
            First Name <span className="text-destructive">*</span>
          </Label>
          <Input
            id="firstName"
            required
            value={formData.firstName || ''}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            placeholder="John"
            className={errors.firstName ? 'border-destructive' : ''}
          />
          {errors.firstName && <p className="text-sm text-destructive">{errors.firstName}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="lastName">
            Last Name <span className="text-destructive">*</span>
          </Label>
          <Input
            id="lastName"
            required
            value={formData.lastName || ''}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            placeholder="Doe"
            className={errors.lastName ? 'border-destructive' : ''}
          />
          {errors.lastName && <p className="text-sm text-destructive">{errors.lastName}</p>}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="phone">
            Phone <span className="text-destructive">*</span>
          </Label>
          <Input
            id="phone"
            type="tel"
            required
            value={formData.phone || ''}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="(818) 555-1234"
            className={errors.phone ? 'border-destructive' : ''}
          />
          {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">
            Email <span className="text-destructive">*</span>
          </Label>
          <Input
            id="email"
            type="email"
            required
            value={formData.email || ''}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="john.doe@example.com"
            className={errors.email ? 'border-destructive' : ''}
          />
          {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label>
          Date of Birth <span className="text-destructive">*</span>
        </Label>
        <div className="grid grid-cols-3 gap-4">
          <Select
            value={formData.birthMonth?.toString() || ''}
            onValueChange={(value) => setFormData({ ...formData, birthMonth: parseInt(value) })}
          >
            <SelectTrigger className={errors.birthMonth ? 'border-destructive' : ''}>
              <SelectValue placeholder="Month" />
            </SelectTrigger>
            <SelectContent>
              {months.map((month) => (
                <SelectItem key={month} value={month.toString()}>
                  {new Date(2000, month - 1, 1).toLocaleString('default', { month: 'long' })}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={formData.birthDay?.toString() || ''}
            onValueChange={(value) => setFormData({ ...formData, birthDay: parseInt(value) })}
          >
            <SelectTrigger className={errors.birthDay ? 'border-destructive' : ''}>
              <SelectValue placeholder="Day" />
            </SelectTrigger>
            <SelectContent>
              {days.map((day) => (
                <SelectItem key={day} value={day.toString()}>
                  {day}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={formData.birthYear?.toString() || ''}
            onValueChange={(value) => setFormData({ ...formData, birthYear: parseInt(value) })}
          >
            <SelectTrigger className={errors.birthYear ? 'border-destructive' : ''}>
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              {years.map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {(errors.birthMonth || errors.birthDay || errors.birthYear) && (
          <p className="text-sm text-destructive">Date of birth is required</p>
        )}
      </div>

      <div className="space-y-2">
        <Label>
          Participant Type <span className="text-destructive">*</span>
        </Label>
        <div className="flex gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="participantType"
              value="adult"
              checked={formData.participantType === 'adult'}
              onChange={(e) => setFormData({ ...formData, participantType: e.target.value })}
              className="w-4 h-4 accent-accent-red"
            />
            <span className="text-sm text-white">Adult</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="participantType"
              value="minor"
              checked={formData.participantType === 'minor'}
              onChange={(e) => setFormData({ ...formData, participantType: e.target.value })}
              className="w-4 h-4 accent-accent-red"
            />
            <span className="text-sm text-white">Minor</span>
          </label>
        </div>
        {errors.participantType && <p className="text-sm text-destructive">{errors.participantType}</p>}
      </div>
    </Card>
  );
}
