'use client';

import { useForm, type FieldErrors } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useEffect, useRef, useState } from 'react';
import { PrimaryButton } from '@/components/ui/Button';
import SectionHeading from '@/components/ui/SectionHeading';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Card, { CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Input } from '@/components/ui/input';
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
  isAdult: z.boolean().refine((val) => val === true, {
    message: 'You must confirm that you are 18 years of age or older',
  }),
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

function fieldErrorProps(error: unknown, errorId: string) {
  return {
    'aria-invalid': Boolean(error),
    'aria-describedby': error ? errorId : undefined,
  };
}

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
  const [submitError, setSubmitError] = useState<string | null>(null);
  const submitErrorRef = useRef<HTMLDivElement>(null);
  const successTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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

  useEffect(() => {
    return () => {
      if (successTimerRef.current) clearTimeout(successTimerRef.current);
    };
  }, []);

  const onSubmit = async (data: WaiverFormValues) => {
    if (successTimerRef.current) {
      clearTimeout(successTimerRef.current);
      successTimerRef.current = null;
    }
    setSubmitError(null);
    setShowSuccess(false);
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/waiver', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to submit waiver');
      }

      setShowSuccess(true);
      
      // Scroll to top
      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;
      window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
      });
      
      // Reset form after success
      successTimerRef.current = setTimeout(() => {
        form.reset();
        setShowSuccess(false);
        successTimerRef.current = null;
      }, 10000);
    } catch (error) {
      console.error('Error submitting waiver:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      setSubmitError(
        `There was an error submitting your waiver: ${errorMessage}. Please try again or contact us directly at info@ths247.com.`
      );
      requestAnimationFrame(() => submitErrorRef.current?.focus());
    } finally {
      setIsSubmitting(false);
    }
  };

  const focusFirstError = (errors: FieldErrors<WaiverFormValues>) => {
    const candidates: Array<[unknown, string]> = [
      [errors.firstName, 'firstName'],
      [errors.lastName, 'lastName'],
      [errors.email, 'email'],
      [errors.confirmEmail, 'confirmEmail'],
      [errors.phone, 'phone'],
      [errors.dateOfBirth?.month, 'dateOfBirth-month'],
      [errors.dateOfBirth?.day, 'dateOfBirth-day'],
      [errors.dateOfBirth?.year, 'dateOfBirth-year'],
      [errors.addressLine1, 'addressLine1'],
      [errors.city, 'city'],
      [errors.state, 'state'],
      [errors.zip, 'zip'],
      [errors.emergencyFirstName, 'emergencyFirstName'],
      [errors.emergencyLastName, 'emergencyLastName'],
      [errors.emergencyPhone, 'emergencyPhone'],
      [errors.driversLicenseNumber, 'driversLicenseNumber'],
      [errors.driversLicenseState, 'driversLicenseState'],
      ...waiverSections.map(
        (section) => [errors.sections?.[section.id], `section-${section.id}`] as [unknown, string]
      ),
      [errors.isAdult, 'isAdult'],
      [errors.mediaConsent, 'media-allow'],
      [errors.signatureConsent, 'signatureConsent'],
      [errors.ackFinalRead, 'ackFinalRead'],
    ];
    const firstInvalidId = candidates.find(([error]) => Boolean(error))?.[1];

    requestAnimationFrame(() => {
      const target = document.getElementById(firstInvalidId || 'waiver-error-summary');
      target?.focus();
      target?.scrollIntoView({ block: 'center' });
    });
  };

  return (
    <div className="min-h-screen bg-bg-base pt-28 md:pt-32">
      <div className="max-w-5xl mx-auto px-4 md:px-6 lg:px-8 pb-12 md:pb-16">
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
          <Alert className="mb-6 bg-green-900/20 border-green-800/50" role="status" aria-live="polite">
            <AlertDescription className="text-green-300 text-sm font-semibold">
              ✓ Waiver submitted. Thank you. Please check your email for a copy of this agreement.
            </AlertDescription>
          </Alert>
        )}

        {submitError && (
          <Alert
            ref={submitErrorRef}
            variant="destructive"
            className="mb-6"
            tabIndex={-1}
            aria-labelledby="waiver-submit-error-heading"
          >
            <AlertDescription>
              <p id="waiver-submit-error-heading" className="text-sm font-semibold">
                We couldn't submit your waiver.
              </p>
              <p className="mt-1 text-sm">{submitError}</p>
            </AlertDescription>
          </Alert>
        )}

        {/* Form Errors Summary */}
        {Object.keys(form.formState.errors).length > 0 && !showSuccess && (
          <Alert
            id="waiver-error-summary"
            variant="destructive"
            className="mb-6"
            tabIndex={-1}
            aria-labelledby="waiver-error-heading"
          >
            <AlertDescription>
              <p id="waiver-error-heading" className="text-sm font-semibold">
                Please correct the errors below before submitting.
              </p>
              <p className="mt-1 text-sm">
                Each affected field is marked and includes instructions for resolving the error.
              </p>
            </AlertDescription>
          </Alert>
        )}

        <form
          onSubmit={form.handleSubmit(onSubmit, focusFirstError)}
          className="space-y-6"
          aria-describedby={Object.keys(form.formState.errors).length > 0 ? 'waiver-error-summary' : undefined}
          noValidate
        >
          {/* Participant Information */}
          <Card className="gap-0 p-0 md:p-0" hover={false}>
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
                    required
                    autoComplete="given-name"
                    {...form.register('firstName')}
                    {...fieldErrorProps(form.formState.errors.firstName, 'firstName-error')}
                    className={cn(
                      'bg-bg-card border-input text-white',
                      form.formState.errors.firstName && 'border-destructive'
                    )}
                  />
                  {form.formState.errors.firstName && (
                    <p id="firstName-error" role="alert" className="text-sm text-destructive">
                      {form.formState.errors.firstName.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-white">
                    Last Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="lastName"
                    required
                    autoComplete="family-name"
                    {...form.register('lastName')}
                    {...fieldErrorProps(form.formState.errors.lastName, 'lastName-error')}
                    className={cn(
                      'bg-bg-card border-input text-white',
                      form.formState.errors.lastName && 'border-destructive'
                    )}
                  />
                  {form.formState.errors.lastName && (
                    <p id="lastName-error" role="alert" className="text-sm text-destructive">
                      {form.formState.errors.lastName.message}
                    </p>
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
                    required
                    autoComplete="email"
                    inputMode="email"
                    {...form.register('email')}
                    {...fieldErrorProps(form.formState.errors.email, 'email-error')}
                    className={cn(
                      'bg-bg-card border-input text-white',
                      form.formState.errors.email && 'border-destructive'
                    )}
                  />
                  {form.formState.errors.email && (
                    <p id="email-error" role="alert" className="text-sm text-destructive">
                      {form.formState.errors.email.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmEmail" className="text-white">
                    Confirm Email <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="confirmEmail"
                    type="email"
                    required
                    autoComplete="email"
                    inputMode="email"
                    {...form.register('confirmEmail')}
                    {...fieldErrorProps(form.formState.errors.confirmEmail, 'confirmEmail-error')}
                    className={cn(
                      'bg-bg-card border-input text-white',
                      form.formState.errors.confirmEmail && 'border-destructive'
                    )}
                  />
                  {form.formState.errors.confirmEmail && (
                    <p id="confirmEmail-error" role="alert" className="text-sm text-destructive">
                      {form.formState.errors.confirmEmail.message}
                    </p>
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
                  required
                  autoComplete="tel"
                  inputMode="tel"
                  {...form.register('phone')}
                  {...fieldErrorProps(form.formState.errors.phone, 'phone-error')}
                  className={cn(
                    'bg-bg-card border-input text-white',
                    form.formState.errors.phone && 'border-destructive'
                  )}
                />
                {form.formState.errors.phone && (
                  <p id="phone-error" role="alert" className="text-sm text-destructive">
                    {form.formState.errors.phone.message}
                  </p>
                )}
              </div>

              <fieldset className="space-y-3">
                <legend className="text-sm font-medium text-white">
                  Date of Birth <span className="text-destructive">*</span>
                </legend>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="dateOfBirth-month" className="text-white">Month</Label>
                    <Select
                      value={form.watch('dateOfBirth.month')}
                      onValueChange={(value) => form.setValue('dateOfBirth.month', value, {
                        shouldDirty: true,
                        shouldTouch: true,
                        shouldValidate: form.formState.isSubmitted,
                      })}
                    >
                      <SelectTrigger
                        id="dateOfBirth-month"
                        aria-required="true"
                        {...fieldErrorProps(form.formState.errors.dateOfBirth?.month, 'dateOfBirth-month-error')}
                        className={cn(
                          'bg-bg-card border-input text-white',
                          form.formState.errors.dateOfBirth?.month && 'border-destructive'
                        )}
                      >
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
                      <p id="dateOfBirth-month-error" role="alert" className="text-sm text-destructive">
                        {form.formState.errors.dateOfBirth.month.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dateOfBirth-day" className="text-white">Day</Label>
                    <Select
                      value={form.watch('dateOfBirth.day')}
                      onValueChange={(value) => form.setValue('dateOfBirth.day', value, {
                        shouldDirty: true,
                        shouldTouch: true,
                        shouldValidate: form.formState.isSubmitted,
                      })}
                    >
                      <SelectTrigger
                        id="dateOfBirth-day"
                        aria-required="true"
                        {...fieldErrorProps(form.formState.errors.dateOfBirth?.day, 'dateOfBirth-day-error')}
                        className={cn(
                          'bg-bg-card border-input text-white',
                          form.formState.errors.dateOfBirth?.day && 'border-destructive'
                        )}
                      >
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
                      <p id="dateOfBirth-day-error" role="alert" className="text-sm text-destructive">
                        {form.formState.errors.dateOfBirth.day.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dateOfBirth-year" className="text-white">Year</Label>
                    <Select
                      value={form.watch('dateOfBirth.year')}
                      onValueChange={(value) => form.setValue('dateOfBirth.year', value, {
                        shouldDirty: true,
                        shouldTouch: true,
                        shouldValidate: form.formState.isSubmitted,
                      })}
                    >
                      <SelectTrigger
                        id="dateOfBirth-year"
                        aria-required="true"
                        {...fieldErrorProps(form.formState.errors.dateOfBirth?.year, 'dateOfBirth-year-error')}
                        className={cn(
                          'bg-bg-card border-input text-white',
                          form.formState.errors.dateOfBirth?.year && 'border-destructive'
                        )}
                      >
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
                      <p id="dateOfBirth-year-error" role="alert" className="text-sm text-destructive">
                        {form.formState.errors.dateOfBirth.year.message}
                      </p>
                    )}
                  </div>
                </div>
              </fieldset>
            </CardContent>
          </Card>

          {/* Address & Emergency Contact */}
          <Card className="gap-0 p-0 md:p-0" hover={false}>
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
                  required
                  autoComplete="address-line1"
                  {...form.register('addressLine1')}
                  {...fieldErrorProps(form.formState.errors.addressLine1, 'addressLine1-error')}
                  className={cn(
                    'bg-bg-card border-input text-white',
                    form.formState.errors.addressLine1 && 'border-destructive'
                  )}
                />
                {form.formState.errors.addressLine1 && (
                  <p id="addressLine1-error" role="alert" className="text-sm text-destructive">
                    {form.formState.errors.addressLine1.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="addressLine2" className="text-white">Address Line 2 (Optional)</Label>
                <Input
                  id="addressLine2"
                  autoComplete="address-line2"
                  {...form.register('addressLine2')}
                  className="bg-bg-card border-input text-white"
                />
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city" className="text-white">
                    City <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="city"
                    required
                    autoComplete="address-level2"
                    {...form.register('city')}
                    {...fieldErrorProps(form.formState.errors.city, 'city-error')}
                    className={cn(
                      'bg-bg-card border-input text-white',
                      form.formState.errors.city && 'border-destructive'
                    )}
                  />
                  {form.formState.errors.city && (
                    <p id="city-error" role="alert" className="text-sm text-destructive">
                      {form.formState.errors.city.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="state" className="text-white">
                    State <span className="text-destructive">*</span>
                  </Label>
                  <Select
                    value={form.watch('state')}
                    onValueChange={(value) => form.setValue('state', value, {
                      shouldDirty: true,
                      shouldTouch: true,
                      shouldValidate: form.formState.isSubmitted,
                    })}
                  >
                    <SelectTrigger
                      id="state"
                      aria-required="true"
                      {...fieldErrorProps(form.formState.errors.state, 'state-error')}
                      className={cn(
                        'bg-bg-card border-input text-white',
                        form.formState.errors.state && 'border-destructive'
                      )}
                    >
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
                    <p id="state-error" role="alert" className="text-sm text-destructive">
                      {form.formState.errors.state.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="zip" className="text-white">
                    Zip Code <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="zip"
                    required
                    autoComplete="postal-code"
                    inputMode="numeric"
                    {...form.register('zip')}
                    {...fieldErrorProps(form.formState.errors.zip, 'zip-error')}
                    className={cn(
                      'bg-bg-card border-input text-white',
                      form.formState.errors.zip && 'border-destructive'
                    )}
                  />
                  {form.formState.errors.zip && (
                    <p id="zip-error" role="alert" className="text-sm text-destructive">
                      {form.formState.errors.zip.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="country" className="text-white">Country</Label>
                <Input
                  id="country"
                  autoComplete="country-name"
                  {...form.register('country')}
                  className="bg-bg-card border-input text-white"
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
                    required
                    autoComplete="off"
                    {...form.register('emergencyFirstName')}
                    {...fieldErrorProps(form.formState.errors.emergencyFirstName, 'emergencyFirstName-error')}
                    className={cn(
                      'bg-bg-card border-input text-white',
                      form.formState.errors.emergencyFirstName && 'border-destructive'
                    )}
                  />
                  {form.formState.errors.emergencyFirstName && (
                    <p id="emergencyFirstName-error" role="alert" className="text-sm text-destructive">
                      {form.formState.errors.emergencyFirstName.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="emergencyLastName" className="text-white">
                    Emergency Contact Last Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="emergencyLastName"
                    required
                    autoComplete="off"
                    {...form.register('emergencyLastName')}
                    {...fieldErrorProps(form.formState.errors.emergencyLastName, 'emergencyLastName-error')}
                    className={cn(
                      'bg-bg-card border-input text-white',
                      form.formState.errors.emergencyLastName && 'border-destructive'
                    )}
                  />
                  {form.formState.errors.emergencyLastName && (
                    <p id="emergencyLastName-error" role="alert" className="text-sm text-destructive">
                      {form.formState.errors.emergencyLastName.message}
                    </p>
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
                  required
                  autoComplete="off"
                  inputMode="tel"
                  {...form.register('emergencyPhone')}
                  {...fieldErrorProps(form.formState.errors.emergencyPhone, 'emergencyPhone-error')}
                  className={cn(
                    'bg-bg-card border-input text-white',
                    form.formState.errors.emergencyPhone && 'border-destructive'
                  )}
                />
                {form.formState.errors.emergencyPhone && (
                  <p id="emergencyPhone-error" role="alert" className="text-sm text-destructive">
                    {form.formState.errors.emergencyPhone.message}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Identification */}
          <Card className="gap-0 p-0 md:p-0" hover={false}>
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
                    required
                    autoComplete="off"
                    {...form.register('driversLicenseNumber')}
                    {...fieldErrorProps(form.formState.errors.driversLicenseNumber, 'driversLicenseNumber-error')}
                    className={cn(
                      'bg-bg-card border-input text-white',
                      form.formState.errors.driversLicenseNumber && 'border-destructive'
                    )}
                  />
                  {form.formState.errors.driversLicenseNumber && (
                    <p id="driversLicenseNumber-error" role="alert" className="text-sm text-destructive">
                      {form.formState.errors.driversLicenseNumber.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="driversLicenseState" className="text-white">
                    Issuing State <span className="text-destructive">*</span>
                  </Label>
                  <Select
                    value={form.watch('driversLicenseState')}
                    onValueChange={(value) => form.setValue('driversLicenseState', value, {
                      shouldDirty: true,
                      shouldTouch: true,
                      shouldValidate: form.formState.isSubmitted,
                    })}
                  >
                    <SelectTrigger
                      id="driversLicenseState"
                      aria-required="true"
                      {...fieldErrorProps(
                        form.formState.errors.driversLicenseState,
                        'driversLicenseState-error'
                      )}
                      className={cn(
                        'bg-bg-card border-input text-white',
                        form.formState.errors.driversLicenseState && 'border-destructive'
                      )}
                    >
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
                    <p id="driversLicenseState-error" role="alert" className="text-sm text-destructive">
                      {form.formState.errors.driversLicenseState.message}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Waiver Sections */}
          <Card className="gap-0 p-0 md:p-0" hover={false}>
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-white">Waiver Sections</CardTitle>
              {form.formState.errors.sections && typeof form.formState.errors.sections === 'object' && 'message' in form.formState.errors.sections && (
                <p id="sections-error" role="alert" className="mt-2 text-sm text-destructive">
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
                    <div className="rounded-md border border-border/70 bg-bg-card p-4">
                      <p className="text-sm text-text-secondary leading-relaxed whitespace-pre-wrap">
                        {section.fullText}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Checkbox
                      id={`section-${section.id}`}
                      aria-required="true"
                      {...fieldErrorProps(
                        form.formState.errors.sections?.[section.id],
                        `section-${section.id}-error`
                      )}
                      checked={form.watch(`sections.${section.id}`) === true}
                      onCheckedChange={(checked) => {
                        form.setValue(`sections.${section.id}`, checked === true, {
                          shouldDirty: true,
                          shouldTouch: true,
                          shouldValidate: form.formState.isSubmitted,
                        });
                      }}
                    />
                    <Label
                      htmlFor={`section-${section.id}`}
                      className="min-h-11 cursor-pointer py-2 text-sm leading-relaxed text-white"
                    >
                      I acknowledge and agree to this section. <span className="text-destructive">*</span>
                    </Label>
                  </div>
                  {form.formState.errors.sections?.[section.id] && (
                    <p
                      id={`section-${section.id}-error`}
                      role="alert"
                      className="text-sm text-destructive"
                    >
                      {form.formState.errors.sections[section.id]?.message || 'You must acknowledge this section'}
                    </p>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Consents */}
          <Card className="gap-0 p-0 md:p-0" hover={false}>
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-white">Consents</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Adult / Minor Status */}
              <fieldset className="space-y-3">
                <legend className="text-sm font-medium text-white">
                  Participant Status <span className="text-destructive">*</span>
                </legend>
                <div className="flex items-start gap-2">
                  <Checkbox
                    id="isAdult"
                    aria-required="true"
                    {...fieldErrorProps(form.formState.errors.isAdult, 'isAdult-error')}
                    checked={form.watch('isAdult') === true}
                    onCheckedChange={(checked) => {
                      form.setValue('isAdult', checked === true, {
                        shouldDirty: true,
                        shouldTouch: true,
                        shouldValidate: form.formState.isSubmitted,
                      });
                    }}
                  />
                  <Label htmlFor="isAdult" className="min-h-11 cursor-pointer py-2 leading-relaxed text-white">
                    I am 18 years of age or older
                  </Label>
                </div>
                {form.formState.errors.isAdult && (
                  <p id="isAdult-error" role="alert" className="text-sm text-destructive">
                    {form.formState.errors.isAdult.message}
                  </p>
                )}
              </fieldset>

              <Separator className="bg-white/10" />

              {/* Media Consent */}
              <fieldset className="space-y-3">
                <legend className="text-sm font-medium text-white">
                  Media Consent <span className="text-destructive">*</span>
                </legend>
                <div className="space-y-3">
                  <div className="flex min-h-11 items-start gap-2">
                    <div className="relative h-11 w-11 shrink-0">
                      <input
                        type="radio"
                        id="media-allow"
                        name="mediaConsent"
                        value="allow"
                        required
                        checked={form.watch('mediaConsent') === 'allow'}
                        onChange={() => form.setValue('mediaConsent', 'allow', {
                          shouldDirty: true,
                          shouldTouch: true,
                          shouldValidate: form.formState.isSubmitted,
                        })}
                        aria-invalid={Boolean(form.formState.errors.mediaConsent)}
                        aria-describedby={form.formState.errors.mediaConsent ? 'mediaConsent-error' : undefined}
                        className="peer absolute inset-0 h-11 w-11 cursor-pointer opacity-0"
                      />
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-3 rounded-full border border-input bg-[#090d14] after:absolute after:inset-1 after:rounded-full after:bg-transparent peer-checked:border-accent-red peer-checked:after:bg-accent-red peer-focus-visible:ring-2 peer-focus-visible:ring-accent-red peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-bg-base"
                      />
                    </div>
                    <Label htmlFor="media-allow" className="min-h-11 cursor-pointer py-2 leading-relaxed text-white">
                      I DO consent to use of my image/voice in training documentation and promotional materials.
                    </Label>
                  </div>
                  <div className="flex min-h-11 items-start gap-2">
                    <div className="relative h-11 w-11 shrink-0">
                      <input
                        type="radio"
                        id="media-deny"
                        name="mediaConsent"
                        value="deny"
                        required
                        checked={form.watch('mediaConsent') === 'deny'}
                        onChange={() => form.setValue('mediaConsent', 'deny', {
                          shouldDirty: true,
                          shouldTouch: true,
                          shouldValidate: form.formState.isSubmitted,
                        })}
                        aria-invalid={Boolean(form.formState.errors.mediaConsent)}
                        aria-describedby={form.formState.errors.mediaConsent ? 'mediaConsent-error' : undefined}
                        className="peer absolute inset-0 h-11 w-11 cursor-pointer opacity-0"
                      />
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-3 rounded-full border border-input bg-[#090d14] after:absolute after:inset-1 after:rounded-full after:bg-transparent peer-checked:border-accent-red peer-checked:after:bg-accent-red peer-focus-visible:ring-2 peer-focus-visible:ring-accent-red peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-bg-base"
                      />
                    </div>
                    <Label htmlFor="media-deny" className="min-h-11 cursor-pointer py-2 leading-relaxed text-white">
                      I DO NOT consent to use of my image/voice in promotional materials.
                    </Label>
                  </div>
                </div>
                {form.formState.errors.mediaConsent && (
                  <p id="mediaConsent-error" role="alert" className="text-sm text-destructive">
                    {form.formState.errors.mediaConsent.message}
                  </p>
                )}
              </fieldset>

              <Separator className="bg-white/10" />

              {/* Email Opt-In */}
              <div className="flex items-start gap-2">
                <Checkbox
                  id="emailOptIn"
                  checked={form.watch('emailOptIn') === true}
                  onCheckedChange={(checked) => {
                    form.setValue('emailOptIn', checked === true, {
                      shouldDirty: true,
                      shouldTouch: true,
                    });
                  }}
                />
                <Label htmlFor="emailOptIn" className="min-h-11 cursor-pointer py-2 leading-relaxed text-white">
                  Check to receive training information, news, and discounts by email.
                </Label>
              </div>

              <Separator className="bg-white/10" />

              {/* Electronic Signature Consent */}
              <div className="flex items-start gap-2">
                <Checkbox
                  id="signatureConsent"
                  aria-required="true"
                  {...fieldErrorProps(form.formState.errors.signatureConsent, 'signatureConsent-error')}
                  checked={form.watch('signatureConsent') === true}
                  onCheckedChange={(checked) => {
                    form.setValue('signatureConsent', checked === true, {
                      shouldDirty: true,
                      shouldTouch: true,
                      shouldValidate: form.formState.isSubmitted,
                    });
                  }}
                />
                <Label htmlFor="signatureConsent" className="min-h-11 cursor-pointer py-2 leading-relaxed text-white">
                  I consent to the use of electronic signatures and electronic records in connection with this Agreement. <span className="text-destructive">*</span>
                </Label>
              </div>
              {form.formState.errors.signatureConsent && (
                <p id="signatureConsent-error" role="alert" className="text-sm text-destructive">
                  {form.formState.errors.signatureConsent.message}
                </p>
              )}

              <Separator className="bg-white/10" />

              {/* Final Acknowledgment */}
              <div className="flex items-start gap-2">
                <Checkbox
                  id="ackFinalRead"
                  aria-required="true"
                  {...fieldErrorProps(form.formState.errors.ackFinalRead, 'ackFinalRead-error')}
                  checked={form.watch('ackFinalRead') === true}
                  onCheckedChange={(checked) => {
                    form.setValue('ackFinalRead', checked === true, {
                      shouldDirty: true,
                      shouldTouch: true,
                      shouldValidate: form.formState.isSubmitted,
                    });
                  }}
                />
                <Label htmlFor="ackFinalRead" className="min-h-11 cursor-pointer py-2 leading-relaxed text-white">
                  I have read this Agreement in its entirety and understand I am giving up certain legal rights, including the right to sue for ordinary negligence. <span className="text-destructive">*</span>
                </Label>
              </div>
              {form.formState.errors.ackFinalRead && (
                <p id="ackFinalRead-error" role="alert" className="text-sm text-destructive">
                  {form.formState.errors.ackFinalRead.message}
                </p>
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
