'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useState } from 'react';
import { PrimaryButton } from '@/components/ui/Button';
import SectionHeading from '@/components/ui/SectionHeading';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Card, { CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { waiverSections } from '@/lib/waiverSections';
import { cn } from '@/lib/utils';

// Zod schema
const waiverFormSchema = z.object({
  // Participant Info
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  confirmEmail: z.string().email('Invalid email address'),
  phone: z.string().min(1, 'Phone number is required').trim(),
  dateOfBirth: z.object({
    month: z.string().min(1, 'Month is required'),
    day: z.string().min(1, 'Day is required'),
    year: z.string().min(1, 'Year is required'),
  }),
  // Address
  addressLine1: z.string().min(1, 'Address is required'),
  addressLine2: z.string().default(''),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  zip: z.string().min(1, 'Zip code is required'),
  country: z.string().default('United States'),
  // Emergency Contact
  emergencyFirstName: z.string().min(1, 'Emergency contact first name is required'),
  emergencyLastName: z.string().min(1, 'Emergency contact last name is required'),
  emergencyPhone: z.string().min(1, 'Emergency contact phone is required'),
  // ID
  driversLicenseNumber: z.string().min(1, 'Driver\'s license number is required'),
  driversLicenseState: z.string().min(1, 'Issuing state is required'),
  // Legal Consents
  isAdult: z.boolean(),
  mediaConsent: z.enum(['allow', 'deny'], {
    required_error: 'Please select a media consent option',
  }),
  emailOptIn: z.boolean().optional(),
  signatureConsent: z.boolean().refine((val) => val === true, {
    message: 'You must consent to electronic signature',
  }),
  ackFinalRead: z.boolean().refine((val) => val === true, {
    message: 'You must acknowledge that you have read the entire agreement',
  }),
  // Waiver Sections - validate each section individually
  sections: z.record(z.string(), z.boolean()).refine(
    (sections) => {
      return waiverSections.every((section) => sections[section.id] === true);
    },
    {
      message: 'You must acknowledge all waiver sections',
    }
  ),
}).refine((data) => data.email === data.confirmEmail, {
  message: 'Email addresses must match',
  path: ['confirmEmail'],
}).superRefine((data, ctx) => {
  // Validate each section individually for better error messages
  waiverSections.forEach((section) => {
    const sectionValue = data.sections[section.id];
    if (sectionValue !== true) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['sections', section.id],
        message: 'You must acknowledge this section',
      });
    }
  });
});

type WaiverFormValues = z.infer<typeof waiverFormSchema>;

// Months array for date of birth
const months = [
  { value: '01', label: 'January' },
  { value: '02', label: 'February' },
  { value: '03', label: 'March' },
  { value: '04', label: 'April' },
  { value: '05', label: 'May' },
  { value: '06', label: 'June' },
  { value: '07', label: 'July' },
  { value: '08', label: 'August' },
  { value: '09', label: 'September' },
  { value: '10', label: 'October' },
  { value: '11', label: 'November' },
  { value: '12', label: 'December' },
];

// Days 1-31
const days = Array.from({ length: 31 }, (_, i) => ({
  value: String(i + 1).padStart(2, '0'),
  label: String(i + 1),
}));

// Years (1900 to current year)
const currentYear = new Date().getFullYear();
const years = Array.from({ length: currentYear - 1899 }, (_, i) => ({
  value: String(currentYear - i),
  label: String(currentYear - i),
}));

// US States
const usStates = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware',
  'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky',
  'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
  'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico',
  'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania',
  'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
  'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming',
];

export default function WaiverPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const form = useForm({
    resolver: zodResolver(waiverFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      confirmEmail: '',
      phone: '',
      dateOfBirth: {
        month: '',
        day: '',
        year: '',
      },
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      zip: '',
      country: 'United States',
      emergencyFirstName: '',
      emergencyLastName: '',
      emergencyPhone: '',
      driversLicenseNumber: '',
      driversLicenseState: '',
      isAdult: false,
      mediaConsent: undefined as 'allow' | 'deny' | undefined,
      emailOptIn: false,
      signatureConsent: false,
      ackFinalRead: false,
      sections: waiverSections.reduce((acc, section) => {
        acc[section.id] = false;
        return acc;
      }, {} as Record<string, boolean>),
    },
  });

  const onSubmit = async (data: WaiverFormValues) => {
    setIsSubmitting(true);
    
    // TODO: Replace with actual API call
    // await fetch('/api/waiver', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(data),
    // });
    
    console.log('Waiver submitted:', data);
    
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    setIsSubmitting(false);
    setShowSuccess(true);
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Reset form after success
    setTimeout(() => {
      form.reset();
      setShowSuccess(false);
    }, 10000);
  };

  return (
    <div className="min-h-screen bg-bg-base pt-28 md:pt-32">
      <div className="max-w-5xl mx-auto px-4 md:px-6 lg:px-8 pb-16 md:pb-24">
        {/* Header Block */}
        <div className="mb-8">
          <SectionHeading sector="SECTOR: WAIVER / LIABILITY / 05">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3 text-white">
              Training Waiver & Release
            </h1>
          </SectionHeading>
          <p className="text-text-secondary max-w-2xl">
            Please review each section carefully and confirm your understanding before training. All fields marked with <span className="text-destructive">*</span> are required.
          </p>
        </div>

        {/* Success Message */}
        {showSuccess && (
          <Alert className="mb-6 bg-green-900/20 border-green-800/50">
            <AlertDescription className="text-green-300 text-sm font-semibold">
              ✓ Waiver submitted. Thank you. Please check your email for a copy of this agreement.
            </AlertDescription>
          </Alert>
        )}

        {/* Form Errors Summary */}
        {Object.keys(form.formState.errors).length > 0 && !showSuccess && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription className="text-sm font-semibold">
              Please correct the errors below before submitting.
            </AlertDescription>
          </Alert>
        )}

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Participant Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-white">Participant Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-white">
                    First Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="firstName"
                    {...form.register('firstName')}
                    className={cn(
                      'bg-bg-card border-white/10 text-white',
                      form.formState.errors.firstName && 'border-destructive'
                    )}
                  />
                  {form.formState.errors.firstName && (
                    <p className="text-sm text-destructive">{form.formState.errors.firstName.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-white">
                    Last Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="lastName"
                    {...form.register('lastName')}
                    className={cn(
                      'bg-bg-card border-white/10 text-white',
                      form.formState.errors.lastName && 'border-destructive'
                    )}
                  />
                  {form.formState.errors.lastName && (
                    <p className="text-sm text-destructive">{form.formState.errors.lastName.message}</p>
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white">
                    Email <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    {...form.register('email')}
                    className={cn(
                      'bg-bg-card border-white/10 text-white',
                      form.formState.errors.email && 'border-destructive'
                    )}
                  />
                  {form.formState.errors.email && (
                    <p className="text-sm text-destructive">{form.formState.errors.email.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmEmail" className="text-white">
                    Confirm Email <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="confirmEmail"
                    type="email"
                    {...form.register('confirmEmail')}
                    className={cn(
                      'bg-bg-card border-white/10 text-white',
                      form.formState.errors.confirmEmail && 'border-destructive'
                    )}
                  />
                  {form.formState.errors.confirmEmail && (
                    <p className="text-sm text-destructive">{form.formState.errors.confirmEmail.message}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-white">
                  Phone <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  {...form.register('phone')}
                  className={cn(
                    'bg-bg-card border-white/10 text-white',
                    form.formState.errors.phone && 'border-destructive'
                  )}
                />
                {form.formState.errors.phone && (
                  <p className="text-sm text-destructive">{form.formState.errors.phone.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-white">
                  Date of Birth <span className="text-destructive">*</span>
                </Label>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Select
                      value={form.watch('dateOfBirth.month')}
                      onValueChange={(value) => form.setValue('dateOfBirth.month', value)}
                    >
                      <SelectTrigger className={cn(
                        'bg-bg-card border-white/10 text-white',
                        form.formState.errors.dateOfBirth?.month && 'border-destructive'
                      )}>
                        <SelectValue placeholder="Month" />
                      </SelectTrigger>
                      <SelectContent>
                        {months.map((month) => (
                          <SelectItem key={month.value} value={month.value}>
                            {month.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {form.formState.errors.dateOfBirth?.month && (
                      <p className="text-sm text-destructive">{form.formState.errors.dateOfBirth.month.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Select
                      value={form.watch('dateOfBirth.day')}
                      onValueChange={(value) => form.setValue('dateOfBirth.day', value)}
                    >
                      <SelectTrigger className={cn(
                        'bg-bg-card border-white/10 text-white',
                        form.formState.errors.dateOfBirth?.day && 'border-destructive'
                      )}>
                        <SelectValue placeholder="Day" />
                      </SelectTrigger>
                      <SelectContent>
                        {days.map((day) => (
                          <SelectItem key={day.value} value={day.value}>
                            {day.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {form.formState.errors.dateOfBirth?.day && (
                      <p className="text-sm text-destructive">{form.formState.errors.dateOfBirth.day.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Select
                      value={form.watch('dateOfBirth.year')}
                      onValueChange={(value) => form.setValue('dateOfBirth.year', value)}
                    >
                      <SelectTrigger className={cn(
                        'bg-bg-card border-white/10 text-white',
                        form.formState.errors.dateOfBirth?.year && 'border-destructive'
                      )}>
                        <SelectValue placeholder="Year" />
                      </SelectTrigger>
                      <SelectContent>
                        {years.map((year) => (
                          <SelectItem key={year.value} value={year.value}>
                            {year.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {form.formState.errors.dateOfBirth?.year && (
                      <p className="text-sm text-destructive">{form.formState.errors.dateOfBirth.year.message}</p>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Address & Emergency Contact */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-white">Address & Emergency Contact</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="addressLine1" className="text-white">
                  Address Line 1 <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="addressLine1"
                  {...form.register('addressLine1')}
                  className={cn(
                    'bg-bg-card border-white/10 text-white',
                    form.formState.errors.addressLine1 && 'border-destructive'
                  )}
                />
                {form.formState.errors.addressLine1 && (
                  <p className="text-sm text-destructive">{form.formState.errors.addressLine1.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="addressLine2" className="text-white">Address Line 2 (Optional)</Label>
                <Input
                  id="addressLine2"
                  {...form.register('addressLine2')}
                  className="bg-bg-card border-white/10 text-white"
                />
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city" className="text-white">
                    City <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="city"
                    {...form.register('city')}
                    className={cn(
                      'bg-bg-card border-white/10 text-white',
                      form.formState.errors.city && 'border-destructive'
                    )}
                  />
                  {form.formState.errors.city && (
                    <p className="text-sm text-destructive">{form.formState.errors.city.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="state" className="text-white">
                    State <span className="text-destructive">*</span>
                  </Label>
                  <Select
                    value={form.watch('state')}
                    onValueChange={(value) => form.setValue('state', value)}
                  >
                    <SelectTrigger className={cn(
                      'bg-bg-card border-white/10 text-white',
                      form.formState.errors.state && 'border-destructive'
                    )}>
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent>
                      {usStates.map((state) => (
                        <SelectItem key={state} value={state}>
                          {state}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {form.formState.errors.state && (
                    <p className="text-sm text-destructive">{form.formState.errors.state.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="zip" className="text-white">
                    Zip Code <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="zip"
                    {...form.register('zip')}
                    className={cn(
                      'bg-bg-card border-white/10 text-white',
                      form.formState.errors.zip && 'border-destructive'
                    )}
                  />
                  {form.formState.errors.zip && (
                    <p className="text-sm text-destructive">{form.formState.errors.zip.message}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="country" className="text-white">Country</Label>
                <Input
                  id="country"
                  {...form.register('country')}
                  className="bg-bg-card border-white/10 text-white"
                  readOnly
                />
              </div>

              <Separator className="bg-white/10 my-4" />

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="emergencyFirstName" className="text-white">
                    Emergency Contact First Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="emergencyFirstName"
                    {...form.register('emergencyFirstName')}
                    className={cn(
                      'bg-bg-card border-white/10 text-white',
                      form.formState.errors.emergencyFirstName && 'border-destructive'
                    )}
                  />
                  {form.formState.errors.emergencyFirstName && (
                    <p className="text-sm text-destructive">{form.formState.errors.emergencyFirstName.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="emergencyLastName" className="text-white">
                    Emergency Contact Last Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="emergencyLastName"
                    {...form.register('emergencyLastName')}
                    className={cn(
                      'bg-bg-card border-white/10 text-white',
                      form.formState.errors.emergencyLastName && 'border-destructive'
                    )}
                  />
                  {form.formState.errors.emergencyLastName && (
                    <p className="text-sm text-destructive">{form.formState.errors.emergencyLastName.message}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="emergencyPhone" className="text-white">
                  Emergency Contact Phone <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="emergencyPhone"
                  type="tel"
                  {...form.register('emergencyPhone')}
                  className={cn(
                    'bg-bg-card border-white/10 text-white',
                    form.formState.errors.emergencyPhone && 'border-destructive'
                  )}
                />
                {form.formState.errors.emergencyPhone && (
                  <p className="text-sm text-destructive">{form.formState.errors.emergencyPhone.message}</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Identification */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-white">Identification</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="driversLicenseNumber" className="text-white">
                    Driver's License / ID Number <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="driversLicenseNumber"
                    {...form.register('driversLicenseNumber')}
                    className={cn(
                      'bg-bg-card border-white/10 text-white',
                      form.formState.errors.driversLicenseNumber && 'border-destructive'
                    )}
                  />
                  {form.formState.errors.driversLicenseNumber && (
                    <p className="text-sm text-destructive">{form.formState.errors.driversLicenseNumber.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="driversLicenseState" className="text-white">
                    Issuing State <span className="text-destructive">*</span>
                  </Label>
                  <Select
                    value={form.watch('driversLicenseState')}
                    onValueChange={(value) => form.setValue('driversLicenseState', value)}
                  >
                    <SelectTrigger className={cn(
                      'bg-bg-card border-white/10 text-white',
                      form.formState.errors.driversLicenseState && 'border-destructive'
                    )}>
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent>
                      {usStates.map((state) => (
                        <SelectItem key={state} value={state}>
                          {state}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {form.formState.errors.driversLicenseState && (
                    <p className="text-sm text-destructive">{form.formState.errors.driversLicenseState.message}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Waiver Sections */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-white">Waiver Sections</CardTitle>
              {form.formState.errors.sections && typeof form.formState.errors.sections === 'object' && 'message' in form.formState.errors.sections && (
                <p className="text-sm text-destructive mt-2">
                  {String(form.formState.errors.sections.message)}
                </p>
              )}
            </CardHeader>
            <CardContent className="space-y-6">
              {waiverSections.map((section) => (
                <div key={section.id} className="space-y-3 pb-6 border-b border-white/10 last:border-0 last:pb-0">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">{section.title}</h3>
                    <p className="text-sm text-text-secondary font-medium mb-3">{section.summary}</p>
                    <div className="bg-bg-card border border-white/5 rounded-md p-4 max-h-48 overflow-y-auto">
                      <p className="text-sm text-text-secondary leading-relaxed whitespace-pre-wrap">
                        {section.fullText}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id={`section-${section.id}`}
                      checked={form.watch(`sections.${section.id}`) === true}
                      onCheckedChange={(checked) => {
                        form.setValue(`sections.${section.id}`, checked === true);
                      }}
                      className={cn(
                        form.formState.errors.sections?.[section.id] && 'border-destructive'
                      )}
                    />
                    <Label
                      htmlFor={`section-${section.id}`}
                      className="text-sm text-white cursor-pointer leading-relaxed"
                    >
                      I acknowledge and agree to this section. <span className="text-destructive">*</span>
                    </Label>
                  </div>
                  {form.formState.errors.sections?.[section.id] && (
                    <p className="text-sm text-destructive ml-6">
                      {form.formState.errors.sections[section.id]?.message || 'You must acknowledge this section'}
                    </p>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Consents */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-white">Consents</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Adult / Minor Status */}
              <div className="space-y-3">
                <Label className="text-white">
                  Participant Status <span className="text-destructive">*</span>
                </Label>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="isAdult"
                    checked={form.watch('isAdult') === true}
                    onCheckedChange={(checked) => {
                      form.setValue('isAdult', checked === true);
                    }}
                  />
                  <Label htmlFor="isAdult" className="text-white cursor-pointer">
                    I am 18 years of age or older
                  </Label>
                </div>
                {form.formState.errors.isAdult && (
                  <p className="text-sm text-destructive">{form.formState.errors.isAdult.message}</p>
                )}
              </div>

              <Separator className="bg-white/10" />

              {/* Media Consent */}
              <div className="space-y-3">
                <Label className="text-white">
                  Media Consent <span className="text-destructive">*</span>
                </Label>
                <div className="space-y-3">
                  <div className="flex items-start space-x-2">
                    <input
                      type="radio"
                      id="media-allow"
                      name="mediaConsent"
                      value="allow"
                      checked={form.watch('mediaConsent') === 'allow'}
                      onChange={() => form.setValue('mediaConsent', 'allow')}
                      className={cn(
                        "mt-0.5 w-4 h-4 text-accent-red bg-bg-card border-white/10 focus:ring-2 focus:ring-accent-red focus:ring-offset-0 cursor-pointer",
                        form.formState.errors.mediaConsent && 'border-destructive'
                      )}
                    />
                    <Label htmlFor="media-allow" className="text-white cursor-pointer leading-relaxed">
                      I DO consent to use of my image/voice in training documentation and promotional materials.
                    </Label>
                  </div>
                  <div className="flex items-start space-x-2">
                    <input
                      type="radio"
                      id="media-deny"
                      name="mediaConsent"
                      value="deny"
                      checked={form.watch('mediaConsent') === 'deny'}
                      onChange={() => form.setValue('mediaConsent', 'deny')}
                      className={cn(
                        "mt-0.5 w-4 h-4 text-accent-red bg-bg-card border-white/10 focus:ring-2 focus:ring-accent-red focus:ring-offset-0 cursor-pointer",
                        form.formState.errors.mediaConsent && 'border-destructive'
                      )}
                    />
                    <Label htmlFor="media-deny" className="text-white cursor-pointer leading-relaxed">
                      I DO NOT consent to use of my image/voice in promotional materials.
                    </Label>
                  </div>
                </div>
                {form.formState.errors.mediaConsent && (
                  <p className="text-sm text-destructive ml-6">{form.formState.errors.mediaConsent.message}</p>
                )}
              </div>

              <Separator className="bg-white/10" />

              {/* Email Opt-In */}
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="emailOptIn"
                  checked={form.watch('emailOptIn') === true}
                  onCheckedChange={(checked) => {
                    form.setValue('emailOptIn', checked === true);
                  }}
                />
                <Label htmlFor="emailOptIn" className="text-white cursor-pointer leading-relaxed">
                  Check to receive training information, news, and discounts by email.
                </Label>
              </div>

              <Separator className="bg-white/10" />

              {/* Electronic Signature Consent */}
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="signatureConsent"
                  checked={form.watch('signatureConsent') === true}
                  onCheckedChange={(checked) => {
                    form.setValue('signatureConsent', checked === true);
                  }}
                  className={cn(
                    form.formState.errors.signatureConsent && 'border-destructive'
                  )}
                />
                <Label htmlFor="signatureConsent" className="text-white cursor-pointer leading-relaxed">
                  I consent to the use of electronic signatures and electronic records in connection with this Agreement. <span className="text-destructive">*</span>
                </Label>
              </div>
              {form.formState.errors.signatureConsent && (
                <p className="text-sm text-destructive ml-6">{form.formState.errors.signatureConsent.message}</p>
              )}

              <Separator className="bg-white/10" />

              {/* Final Acknowledgment */}
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="ackFinalRead"
                  checked={form.watch('ackFinalRead') === true}
                  onCheckedChange={(checked) => {
                    form.setValue('ackFinalRead', checked === true);
                  }}
                  className={cn(
                    form.formState.errors.ackFinalRead && 'border-destructive'
                  )}
                />
                <Label htmlFor="ackFinalRead" className="text-white cursor-pointer leading-relaxed">
                  I have read this Agreement in its entirety and understand I am giving up certain legal rights, including the right to sue for ordinary negligence. <span className="text-destructive">*</span>
                </Label>
              </div>
              {form.formState.errors.ackFinalRead && (
                <p className="text-sm text-destructive ml-6">{form.formState.errors.ackFinalRead.message}</p>
              )}
            </CardContent>
          </Card>

          {/* Submit Section */}
          <div className="pt-6 border-t border-white/10">
            <p className="text-sm text-text-secondary mb-4">
              You will receive a copy of this waiver by email for your records.
            </p>
            <PrimaryButton
              type="submit"
              className="w-full md:w-auto md:min-w-[200px]"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Waiver'}
            </PrimaryButton>
          </div>
        </form>
      </div>
    </div>
  );
}
