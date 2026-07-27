'use client';

import { useEffect, useRef, useState, FormEvent } from 'react';
import { PrimaryButton } from '@/components/ui/Button';
import CTAInlineBar from '@/components/ui/CTAInlineBar';
import Card from '@/components/ui/Card';
import SectionHeading from '@/components/ui/SectionHeading';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    contactMethod: 'email',
    message: '',
    disclaimer: false,
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [disclaimerError, setDisclaimerError] = useState<string | null>(null);
  const errorSummaryRef = useRef<HTMLDivElement>(null);
  const disclaimerRef = useRef<HTMLButtonElement>(null);
  const successTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (successTimerRef.current) clearTimeout(successTimerRef.current);
    };
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (successTimerRef.current) {
      clearTimeout(successTimerRef.current);
      successTimerRef.current = null;
    }
    setSubmitted(false);
    setSubmitError(null);

    if (!formData.disclaimer) {
      setDisclaimerError('You must acknowledge the training disclaimer before submitting.');
      requestAnimationFrame(() => disclaimerRef.current?.focus());
      return;
    }

    setDisclaimerError(null);
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to submit form');
      }

      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        contactMethod: 'email',
        message: '',
        disclaimer: false,
      });
      successTimerRef.current = setTimeout(() => {
        setSubmitted(false);
        successTimerRef.current = null;
      }, 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      setSubmitError(
        `There was an error submitting your form: ${errorMessage}. Please try again or contact us directly at info@ths247.com.`
      );
      requestAnimationFrame(() => errorSummaryRef.current?.focus());
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg-base pt-28 md:pt-32">
      <div className="max-w-5xl mx-auto px-4 md:px-6 lg:px-8 pb-12 md:pb-16">
        <header className="mb-6">
          <SectionHeading sector="SECTOR: CONTACT / 06">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3 text-white">Contact Us</h1>
          </SectionHeading>
          <p className="text-text-secondary max-w-2xl">
            Get in touch to schedule training or ask questions
          </p>
        </header>

        <CTAInlineBar
          title="Have questions about training?"
          description="Call or text 818-825-3104 and we'll help you pick the right course."
          phone="8188253104"
          className="mt-0 mb-8"
        />

        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-12">
          {/* Left: Contact Info */}
          <div>
            <Card hover={false}>
              <h2 className="text-base font-semibold text-white mb-4">Contact Information</h2>
              <div className="space-y-2 text-text-secondary">
                <p>
                  <strong className="text-text-primary">Email:</strong>{' '}
                  <a href="mailto:info@ths247.com" className="inline-flex min-h-11 items-center text-accent-red hover:text-red-400 transition-colors duration-150">
                    info@ths247.com
                  </a>
                </p>
                <p>
                  <strong className="text-text-primary">Phone:</strong>{' '}
                  <a href="tel:8188253104" className="inline-flex min-h-11 items-center text-accent-red hover:text-red-400 transition-colors duration-150">
                    818-825-3104
                  </a>
                </p>
              </div>
            </Card>
          </div>

          {/* Right: Form */}
          <div>
            <Card className="p-4 sm:p-6 md:p-8" hover={false}>
              <form onSubmit={handleSubmit} className="space-y-5" aria-labelledby="contact-form-heading">
                <h2 id="contact-form-heading" className="text-xl font-semibold text-white">
                  Send an inquiry
                </h2>

                {submitted && (
                  <Alert className="bg-green-900/20 border-green-800/50" role="status" aria-live="polite">
                    <AlertDescription className="text-green-300 text-sm font-semibold">
                      Thank you! Your inquiry has been submitted. We'll be in touch soon.
                    </AlertDescription>
                  </Alert>
                )}

                {submitError && (
                  <Alert
                    ref={errorSummaryRef}
                    variant="destructive"
                    tabIndex={-1}
                    aria-labelledby="contact-error-heading"
                  >
                    <AlertDescription>
                      <p id="contact-error-heading" className="text-sm font-semibold">
                        We couldn't submit your inquiry.
                      </p>
                      <p className="mt-1 text-sm">{submitError}</p>
                    </AlertDescription>
                  </Alert>
                )}

                <div className="space-y-2">
                  <Label htmlFor="name">
                    Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    required
                    autoComplete="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">
                    Email <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    required
                    autoComplete="email"
                    inputMode="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your.email@example.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone (Optional)</Label>
                  <Input
                    type="tel"
                    id="phone"
                    name="phone"
                    autoComplete="tel"
                    inputMode="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="(555) 123-4567"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contactMethod">Preferred Contact Method</Label>
                  <Select value={formData.contactMethod} onValueChange={(value) => setFormData({ ...formData, contactMethod: value })}>
                    <SelectTrigger id="contactMethod">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="phone">Phone</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">
                    Message <span className="text-destructive">*</span>
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your training needs..."
                  />
                </div>

                <div className="flex items-start gap-3">
                  <Checkbox
                    ref={disclaimerRef}
                    id="disclaimer"
                    aria-required="true"
                    aria-invalid={Boolean(disclaimerError)}
                    aria-describedby={disclaimerError ? 'disclaimer-error' : undefined}
                    checked={formData.disclaimer}
                    onCheckedChange={(checked) => {
                      const isChecked = checked === true;
                      setFormData({ ...formData, disclaimer: isChecked });
                      if (isChecked) setDisclaimerError(null);
                    }}
                  />
                  <Label htmlFor="disclaimer" className="min-h-11 cursor-pointer py-2 text-sm leading-relaxed">
                    I understand that T.H.S. does not provide legal advice and all training is for educational purposes only. <span className="text-destructive">*</span>
                  </Label>
                </div>
                {disclaimerError && (
                  <p id="disclaimer-error" role="alert" className="text-sm text-destructive">
                    {disclaimerError}
                  </p>
                )}

                <PrimaryButton 
                  type="submit" 
                  className="w-full md:w-auto md:min-w-[200px]"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Inquiry'}
                </PrimaryButton>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
