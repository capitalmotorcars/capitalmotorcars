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
import { CheckCircle, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const contactSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Please enter a valid email address').max(255),
  phone: z.string().min(10, 'Please enter a valid phone number').max(20),
  service: z.string().optional(),
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
}

export function ContactForm({ compact = false, initialValues, hideServiceField = false }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
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
    
    // Simulate API call - replace with actual webhook
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSuccess(true);
    reset();
    
    // Reset success state after 5 seconds
    setTimeout(() => setIsSuccess(false), 5000);
    setIsSubmitting(false);
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <CheckCircle className="w-16 h-16 text-accent mb-4" />
        <h3 className="text-xl font-semibold text-primary mb-2">Thank you!</h3>
        <p className="text-muted-foreground">
          We've received your message and will get back to you shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className={compact ? 'space-y-4' : 'grid md:grid-cols-2 gap-6'}>
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name *</Label>
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

        {!hideServiceField && (
          <div className="space-y-2">
            <Label htmlFor="service">Service of Interest</Label>
            <Select value={selectedService} onValueChange={(value) => setValue('service', value)}>
              <SelectTrigger>
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

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="message">Message *</Label>
          <Select onValueChange={handleSuggestionSelect}>
            <SelectTrigger className="w-auto h-8 text-xs text-muted-foreground border-dashed">
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
          className={errors.message ? 'border-destructive' : ''}
        />
        {errors.message && (
          <p className="text-sm text-destructive">{errors.message.message}</p>
        )}
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
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
