import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Loader2, Shield } from 'lucide-react';
import { FormSuccessMessage } from './FormSuccessMessage';
import { getSubmitErrorMessage, getSubmitErrorFromException } from './getSubmitErrorMessage';
import { WEBHOOK_URL } from '@/lib/webhook';

const creditSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Please enter a valid email address').max(255),
  phone: z.string().min(10, 'Please enter a valid phone number').max(20),
  address: z.string().max(500).optional(),
  employmentStatus: z.string().optional(),
  notes: z.string().max(1000).optional(),
});

type CreditFormData = z.infer<typeof creditSchema>;

const employmentOptions = [
  { value: 'employed', label: 'Employed Full-Time' },
  { value: 'part-time', label: 'Employed Part-Time' },
  { value: 'self-employed', label: 'Self-Employed' },
  { value: 'retired', label: 'Retired' },
  { value: 'other', label: 'Other' },
];

export function CreditApplicationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<CreditFormData>({
    resolver: zodResolver(creditSchema),
  });

  const onSubmit = async (data: CreditFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const payload = {
        Name: data.fullName,
        Phone: data.phone,
        Email: data.email,
        VehicleOrService: 'Credit Application',
        Notes: data.notes ?? '',
      };

      const res = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const json = await res.json().catch(() => ({}));
      if (res.status < 200 || res.status >= 300) {
        setSubmitError(getSubmitErrorMessage(res, json));
        return;
      }
      setIsSuccess(true);
      reset();
    } catch (e) {
      setSubmitError(getSubmitErrorFromException(e));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <FormSuccessMessage 
        title="Application received!"
        subtitle="Our finance team will review your information and contact you."
        timing="Within 1-2 business days"
      />
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Security Notice */}
      <div className="flex items-start gap-3 p-4 bg-muted rounded-lg">
        <Shield className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
        <div className="text-sm text-muted-foreground">
          <strong className="text-primary">Your information is secure.</strong> We use 
          industry-standard encryption to protect your data. This preliminary application 
          helps us understand your needs before a full credit check.
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        <div className="space-y-1.5">
          <Label htmlFor="fullName" className="text-sm font-medium">Full Legal Name *</Label>
          <Input
            id="fullName"
            {...register('fullName')}
            placeholder="John Smith"
            className={errors.fullName ? 'border-destructive bg-destructive/5' : ''}
          />
          {errors.fullName && (
            <p className="text-xs text-destructive mt-1">{errors.fullName.message}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="email" className="text-sm font-medium">Email *</Label>
          <Input
            id="email"
            type="email"
            {...register('email')}
            placeholder="john@example.com"
            className={errors.email ? 'border-destructive bg-destructive/5' : ''}
          />
          {errors.email && (
            <p className="text-xs text-destructive mt-1">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="phone" className="text-sm font-medium">Phone *</Label>
          <Input
            id="phone"
            type="tel"
            {...register('phone')}
            placeholder="(555) 123-4567"
            className={errors.phone ? 'border-destructive bg-destructive/5' : ''}
          />
          {errors.phone && (
            <p className="text-xs text-destructive mt-1">{errors.phone.message}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="employmentStatus" className="text-sm font-medium">Employment Status</Label>
          <Select onValueChange={(value) => setValue('employmentStatus', value)}>
            <SelectTrigger className="h-11 border-input/60 focus:border-accent focus:ring-2 focus:ring-accent/20">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              {employmentOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5 md:col-span-2">
          <Label htmlFor="address" className="text-sm font-medium">Address (Optional)</Label>
          <Input
            id="address"
            {...register('address')}
            placeholder="123 Main St, City, State, ZIP"
          />
        </div>

        <div className="space-y-1.5 md:col-span-2">
          <Label htmlFor="notes" className="text-sm font-medium">Additional Notes</Label>
          <Textarea
            id="notes"
            {...register('notes')}
            placeholder="Any additional information you'd like to share..."
            rows={4}
          />
        </div>
      </div>

      {/* Disclaimer */}
      <div className="text-xs text-muted-foreground border-t border-border pt-5">
        <p>
          By submitting this form, you authorize Capital Motor Cars to contact you regarding 
          your application. This is a preliminary application and does not constitute a 
          commitment to extend credit. A full credit check may be performed upon your consent 
          during the final application process.
        </p>
      </div>

      {submitError && (
        <p className="text-sm text-destructive" role="alert">
          {submitError}
        </p>
      )}

      <Button
        type="submit"
        disabled={isSubmitting}
        size="lg"
        className="w-full min-h-[44px] h-12 bg-accent hover:bg-accent/90 text-accent-foreground font-medium md:hover:scale-[1.01] transition-all duration-150"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin mr-2" />
            Submitting Application...
          </>
        ) : (
          'Submit Application'
        )}
      </Button>
    </form>
  );
}
