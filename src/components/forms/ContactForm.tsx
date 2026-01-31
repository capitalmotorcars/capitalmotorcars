import { useState, useRef } from 'react';
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
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { FormSuccessMessage } from './FormSuccessMessage';
import { getSubmitErrorMessage, getSubmitErrorFromException } from './getSubmitErrorMessage';
import { WEBHOOK_URL } from '@/lib/webhook';

const contactSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Please enter a valid email address').max(255),
  phone: z.string().min(10, 'Please enter a valid phone number').max(20),
  service: z.string().optional(),
  vehicleType: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters').max(1000),
});

type ContactFormData = z.infer<typeof contactSchema>;

const services = [
  { value: 'leasing', label: 'Car Leasing' },
  { value: 'financing', label: 'Financing & Credit' },
  { value: 'trade-in', label: 'Trade-In' },
  { value: 'wear-tear', label: 'Wear & Tear Repair' },
  { value: 'wheel-repair', label: 'Wheel & Tire Repair' },
  { value: 'detailing', label: 'Car Detailing' },
  { value: 'other', label: 'Other' },
];

const vehicleTypeOptions = [
  { value: 'luxury', label: 'Luxury Vehicle' },
  { value: 'electric', label: 'Electric Vehicle' },
  { value: 'hatchback', label: 'Hatchback' },
  { value: 'sedan', label: 'Sedan' },
  { value: 'truck', label: 'Truck' },
  { value: 'sports', label: 'Sports Car' },
  { value: 'suv', label: 'SUV' },
  { value: 'coupe', label: 'Coupe' },
  { value: 'minivan', label: 'Minivan' },
  { value: 'crossover', label: 'Crossover' },
];

const messageSuggestions = [
  { value: 'lease', label: 'Lease a new car', fullText: "I'm looking to lease a new car and want to understand my options." },
  { value: 'quote', label: 'Get a price quote', fullText: "I'd like a price quote for a specific vehicle." },
  { value: 'budget', label: 'Budget-based recommendations', fullText: "I have a monthly budget and need help choosing the right car." },
  { value: 'trade-in', label: 'Trade-in value', fullText: "I want to trade in my current vehicle and see how it affects a lease." },
  { value: 'guidance', label: 'General guidance', fullText: "I'm not sure where to start and would like some guidance." },
];

interface ContactFormProps {
  compact?: boolean;
  initialValues?: Partial<ContactFormData>;
  hideServiceField?: boolean;
  showVehicleField?: boolean;
  /** Source of the form for the lead email (contact page, service page, vehicle page). */
  source?: 'contact' | 'service' | 'vehicle';
  /** Vehicle name when source is "vehicle" (for webhook payload). */
  vehicleName?: string;
  /** Service/page title when source is "service" (for webhook payload). */
  serviceTitle?: string;
}

export function ContactForm({ 
  compact = false, 
  initialValues, 
  hideServiceField = false,
  showVehicleField = true,
  source = 'contact',
  vehicleName,
  serviceTitle,
}: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      fullName: initialValues?.fullName ?? "",
      email: initialValues?.email ?? "",
      phone: initialValues?.phone ?? "",
      service: initialValues?.service ?? undefined,
      vehicleType: initialValues?.vehicleType ?? undefined,
      message: initialValues?.message ?? "",
    },
  });

  const selectedService = watch('service');
  const { ref: messageRef, ...messageRegister } = register('message');

  const handleSuggestionSelect = (value: string) => {
    const suggestion = messageSuggestions.find(s => s.value === value);
    if (suggestion) {
      setValue('message', suggestion.fullText, { shouldValidate: false });
      setTimeout(() => {
        textareaRef.current?.focus();
        if (textareaRef.current) {
          const len = suggestion.fullText.length;
          textareaRef.current.setSelectionRange(len, len);
        }
      }, 0);
    }
  };

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const serviceLabel =
        source === 'contact'
          ? (services.find((s) => s.value === data.service)?.label ?? 'Contact')
          : source === 'service'
            ? (serviceTitle ?? 'Service inquiry')
            : 'N/A';
      const vehicleLabel =
        source === 'vehicle'
          ? (vehicleName ?? data.vehicleType ?? 'N/A')
          : (vehicleTypeOptions.find((v) => v.value === data.vehicleType)?.label ?? (data.vehicleType ? String(data.vehicleType) : 'N/A'));

      const payload = {
        Name: data.fullName,
        Phone: data.phone,
        Email: data.email,
        Service: serviceLabel,
        Vehicle: vehicleLabel,
        Message: data.message,
        Source: source,
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
        title="You're all set!"
        subtitle="A team member will reach out to you shortly."
        timing="Usually within a few hours"
      />
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className={compact ? 'space-y-4' : 'grid md:grid-cols-2 gap-5'}>
        <div className="space-y-1.5">
          <Label htmlFor="fullName" className="text-sm font-medium">Full Name *</Label>
          <Input
            id="fullName"
            {...register('fullName')}
            placeholder="John Smith"
            className={cn(
              errors.fullName && 'border-destructive bg-destructive/5'
            )}
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
            className={cn(
              errors.email && 'border-destructive bg-destructive/5'
            )}
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
            className={cn(
              errors.phone && 'border-destructive bg-destructive/5'
            )}
          />
          {errors.phone && (
            <p className="text-xs text-destructive mt-1">{errors.phone.message}</p>
          )}
        </div>

        {!hideServiceField && (
          <div className="space-y-1.5">
            <Label htmlFor="service" className="text-sm font-medium">Service of Interest</Label>
            <Select value={selectedService} onValueChange={(value) => setValue('service', value)}>
              <SelectTrigger className="h-11 border-input/60 focus:border-accent focus:ring-2 focus:ring-accent/20">
                <SelectValue placeholder="Select a service" />
              </SelectTrigger>
              <SelectContent>
                {services.map((service) => (
                  <SelectItem key={service.value} value={service.value}>
                    {service.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <Label htmlFor="message" className="text-sm font-medium">Message *</Label>
          <Select onValueChange={handleSuggestionSelect}>
            <SelectTrigger className="w-auto h-7 text-xs text-muted-foreground border-dashed border-input/60">
              <SelectValue placeholder="Need help getting started?" />
            </SelectTrigger>
            <SelectContent>
              {messageSuggestions.map((suggestion) => (
                <SelectItem key={suggestion.value} value={suggestion.value}>
                  {suggestion.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <Textarea
          id="message"
          {...messageRegister}
          ref={(e) => {
            messageRef(e);
            (textareaRef as React.MutableRefObject<HTMLTextAreaElement | null>).current = e;
          }}
          placeholder="You can edit the message or write your own…"
          rows={compact ? 3 : 5}
          className={cn(
            errors.message && 'border-destructive bg-destructive/5'
          )}
        />
        {errors.message && (
          <p className="text-xs text-destructive mt-1">{errors.message.message}</p>
        )}
      </div>

      {submitError && (
        <p className="text-sm text-destructive" role="alert">
          {submitError}
        </p>
      )}

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full min-h-[44px] h-11 bg-accent hover:bg-accent/90 text-accent-foreground font-medium md:hover:scale-[1.01] transition-all duration-150"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin mr-2" />
            Sending...
          </>
        ) : (
          'Continue'
        )}
      </Button>
    </form>
  );
}
