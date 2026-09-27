/**
 * Legacy LeadCaptureForm interface retained for compatibility.
 * The implementation now uses Calendly instead of direct form submission.
 */
'use client';

import CalendlyWidget from '@/components/calendly/CalendlyWidget';

export interface LeadCaptureFormProps {
  source?: string;
  stage?: string;
  defaultTags?: string[];
  formType?: 'contact' | 'property-search' | 'home-valuation' | 'newsletter';
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

export function LeadCaptureForm({
  formType = 'contact',
}: LeadCaptureFormProps) {
  const calendlyUrl =
    formType === 'home-valuation' ? 'https://calendly.com/drjanduffy/showing' : undefined;

  return (
    <section className="space-y-4">
      <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
        <h3 className="text-lg font-semibold text-slate-900">Book With Dr. Jan Duffy</h3>
        <p className="mt-1 text-sm text-slate-600">
          Use the Calendly widget to schedule your consultation instead of filling out a form.
        </p>
      </div>
      <CalendlyWidget url={calendlyUrl} height="700px" />
    </section>
  );
}
