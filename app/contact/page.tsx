'use client';

import { useState, FormEvent } from 'react';
import { PrimaryButton, SecondaryButton } from '@/components/ui/Button';
import CTAInlineBar from '@/components/ui/CTAInlineBar';
import Card from '@/components/ui/Card';
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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setSubmitted(true);
    
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        contactMethod: 'email',
        message: '',
        disclaimer: false,
      });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-bg-base pt-28 md:pt-32">
      <div className="max-w-5xl mx-auto px-4 md:px-6 lg:px-8 pb-16 md:pb-24">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {/* Left: Contact Info */}
          <div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3 text-white">Contact Us</h1>
            <p className="text-text-secondary max-w-2xl mb-4">
              Get in touch to schedule training or ask questions
            </p>
            
            <div className="mb-8">
              <CTAInlineBar
                title="Have questions about training?"
                description="Call or text 818-825-3104 and we'll help you pick the right course."
                phone="8188253104"
              />
            </div>

            <Card className="mb-8" hover={false}>
              <h2 className="text-base font-semibold text-white mb-4">Contact Information</h2>
              <div className="space-y-2 text-text-secondary">
                <p>
                  <strong className="text-text-primary">Email:</strong>{' '}
                  <a href="mailto:info@ths247.com" className="text-accent-red hover:text-red-400 transition-colors duration-150">
                    info@ths247.com
                  </a>
                </p>
                <p>
                  <strong className="text-text-primary">Phone:</strong>{' '}
                  <a href="tel:8188253104" className="text-accent-red hover:text-red-400 transition-colors duration-150">
                    818-825-3104
                  </a>
                </p>
              </div>
            </Card>
          </div>

          {/* Right: Form */}
          <div>
            <Card className="p-6 md:p-8">
              <form onSubmit={handleSubmit} className="space-y-5">
                {submitted && (
                  <Alert className="bg-green-900/20 border-green-800/50">
                    <AlertDescription className="text-green-300 text-sm font-semibold">
                      Thank you! Your inquiry has been submitted. We'll be in touch soon.
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
                    required
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
                    required
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
                    required
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your training needs..."
                  />
                </div>

                <div className="flex items-start gap-3">
                  <Checkbox
                    id="disclaimer"
                    required
                    checked={formData.disclaimer}
                    onCheckedChange={(checked) => setFormData({ ...formData, disclaimer: checked as boolean })}
                  />
                  <Label htmlFor="disclaimer" className="text-sm cursor-pointer">
                    I understand that T.H.S. does not provide legal advice and all training is for educational purposes only. <span className="text-destructive">*</span>
                  </Label>
                </div>

                <PrimaryButton type="submit" className="w-full md:w-auto md:min-w-[200px]">
                  Submit Inquiry
                </PrimaryButton>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
