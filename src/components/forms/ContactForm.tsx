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

const messagePrompts = [
  "I'm looking to lease a new car and want to understand my options.",
  "I'd like a price quote for a specific vehicle.",
  "I have a monthly budget and need help choosing the right car.",
  "I want to trade in my current vehicle and see how it affects a lease.",
  "I'm not sure where to start and would like some guidance.",
];

interface ContactFormProps {
  compact?: boolean;
  initialValues?: Partial<ContactFormData>;
}

export function ContactForm({ compact = false, initialValues }: ContactFormProps) {
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

  const handlePromptClick = (prompt: string) => {
    setValue('message', prompt, { shouldValidate: false });
    // Focus the textarea after inserting text
    setTimeout(() => {
      textareaRef.current?.focus();
      // Move cursor to end
      if (textareaRef.current) {
        const len = prompt.length;
        textareaRef.current.setSelectionRange(len, len);
      }
    }, 0);
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
      </div>

      <div className="space-y-3">
        <Label htmlFor="message">Message *</Label>
        
        {/* Helper text */}
        <p className="text-xs text-muted-foreground">
          Not sure what to write? Start with one of these — you can edit it anytime.
        </p>
        
        {/* Prompt chips */}
        <div className="flex flex-wrap gap-2">
          {messagePrompts.map((prompt, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handlePromptClick(prompt)}
              className={cn(
                "px-3 py-1.5 text-xs text-left rounded-md",
                "bg-muted text-muted-foreground",
                "border border-border",
                "hover:bg-muted/80 hover:text-foreground",
                "transition-colors duration-150",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1"
              )}
            >
              {prompt}
            </button>
          ))}
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
