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
import { CheckCircle, Loader2, Shield } from 'lucide-react';

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
    
    // Simulate API call - replace with actual webhook
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    console.log('Credit application submitted:', data);
    setIsSuccess(true);
    reset();
    setIsSubmitting(false);
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <CheckCircle className="w-20 h-20 text-green-500 mb-6" />
        <h3 className="text-2xl font-semibold text-primary mb-3">Application Received</h3>
        <p className="text-muted-foreground max-w-md">
          Thank you for your credit application. Our team will review your information 
          and contact you within 1-2 business days.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Security Notice */}
      <div className="flex items-start gap-3 p-4 bg-muted rounded-lg">
        <Shield className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
        <div className="text-sm text-muted-foreground">
          <strong className="text-primary">Your information is secure.</strong> We use 
          industry-standard encryption to protect your data. This preliminary application 
          helps us understand your needs before a full credit check.
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Legal Name *</Label>
          <Input
            id="fullName"
            {...register('fullName')}
            placeholder="John Smith"
            className={errors.fullName ? 'border-destructive' : ''}
          />
          {errors.fullName && (
            <p className="text-sm text-destructive">{errors.fullName.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            {...register('email')}
            placeholder="john@example.com"
            className={errors.email ? 'border-destructive' : ''}
          />
          {errors.email && (
            <p className="text-sm text-destructive">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone *</Label>
          <Input
            id="phone"
            type="tel"
            {...register('phone')}
            placeholder="(555) 123-4567"
            className={errors.phone ? 'border-destructive' : ''}
          />
          {errors.phone && (
            <p className="text-sm text-destructive">{errors.phone.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="employmentStatus">Employment Status</Label>
          <Select onValueChange={(value) => setValue('employmentStatus', value)}>
            <SelectTrigger>
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

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="address">Address (Optional)</Label>
          <Input
            id="address"
            {...register('address')}
            placeholder="123 Main St, City, State, ZIP"
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="notes">Additional Notes</Label>
          <Textarea
            id="notes"
            {...register('notes')}
            placeholder="Any additional information you'd like to share..."
            rows={4}
          />
        </div>
      </div>

      {/* Disclaimer */}
      <div className="text-xs text-muted-foreground border-t border-border pt-6">
        <p>
          By submitting this form, you authorize Capital Motor Cars to contact you regarding 
          your application. This is a preliminary application and does not constitute a 
          commitment to extend credit. A full credit check may be performed upon your consent 
          during the final application process.
        </p>
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        size="lg"
        className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
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
