'use client';

import { Label } from '@/components/ui/label';
import Card from '@/components/ui/Card';

interface MediaSectionProps {
  formData: any;
  setFormData: (data: any) => void;
}

export default function MediaSection({ formData, setFormData }: MediaSectionProps) {
  return (
    <Card className="space-y-4">
      <h2 className="text-xl font-semibold text-white mb-4">6. Media & Photography</h2>
      <p className="text-sm text-text-muted mb-4">
        T.H.S. may capture images, video, or audio during training sessions. Your consent is optional.
      </p>

      <div className="space-y-3">
        <label className="flex items-start gap-3 cursor-pointer p-3 rounded border border-white/10 hover:border-white/20 transition-colors">
          <input
            type="radio"
            name="mediaConsent"
            value="yes"
            checked={formData.mediaConsent === 'yes'}
            onChange={(e) => setFormData({ ...formData, mediaConsent: e.target.value })}
            className="mt-1 w-4 h-4 accent-accent-red"
          />
          <div className="flex-1">
            <span className="text-sm font-medium text-white block">
              I DO consent to Tactical Home Solutions capturing and using my image, voice, and likeness for training documentation and marketing.
            </span>
          </div>
        </label>

        <label className="flex items-start gap-3 cursor-pointer p-3 rounded border border-white/10 hover:border-white/20 transition-colors">
          <input
            type="radio"
            name="mediaConsent"
            value="no"
            checked={formData.mediaConsent === 'no' || !formData.mediaConsent}
            onChange={(e) => setFormData({ ...formData, mediaConsent: e.target.value })}
            className="mt-1 w-4 h-4 accent-accent-red"
          />
          <div className="flex-1">
            <span className="text-sm font-medium text-white block">
              I DO NOT consent to use of my image for marketing. T.H.S. may still capture limited recordings for internal safety or legal purposes.
            </span>
          </div>
        </label>
      </div>
    </Card>
  );
}
