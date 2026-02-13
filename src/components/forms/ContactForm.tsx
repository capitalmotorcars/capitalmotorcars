import { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import validator from 'validator';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
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

function levenshtein(a: string, b: string): number {
  const matrix = Array.from({ length: b.length + 1 }, () =>
    Array(a.length + 1).fill(0)
  );

  for (let i = 0; i <= a.length; i++) matrix[0][i] = i;
  for (let j = 0; j <= b.length; j++) matrix[j][0] = j;

  for (let j = 1; j <= b.length; j++) {
    for (let i = 1; i <= a.length; i++) {
      if (a[i - 1] === b[j - 1]) {
        matrix[j][i] = matrix[j - 1][i - 1];
      } else {
        matrix[j][i] = Math.min(
          matrix[j - 1][i] + 1,
          matrix[j][i - 1] + 1,
          matrix[j - 1][i - 1] + 1
        );
      }
    }
  }

  return matrix[b.length][a.length];
}

const bannedDomains = [
  'test.com',
  'example.com',
  'dummy.com',
  'temp-mail.org',
  'mailinator.com',
  'tempmail.com',
  '123.com',
];

const commonDomains = [
  'gmail.com',
  'yahoo.com',
  'outlook.com',
  'hotmail.com',
  'icloud.com',
  'aol.com',
  'live.com',
];

export const contactSchema = z.object({
  fullName: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100)
    .trim()
    .refine(
      (val) => !/^(.)\1+$/.test(val.replace(/\s/g, '')),
      'Please enter a valid name'
    ),

  email: z
    .string()
    .trim()
    .refine((val) => validator.isEmail(val), 'Please enter a valid email address')

    .refine((val) => {
      const [local] = val.split('@')
      if (!local) return false

      const clean = local.toLowerCase()

      if (/^(.)\1+$/.test(clean)) return false

      if (/^(.{2,4})\1+$/.test(clean)) return false

      if (new Set(clean).size < 4) return false

      return true
    }, 'Please enter a valid email address')

    .refine((val) => {
      const [, domain] = val.split('@')
      if (!domain) return false

      const lowerDomain = domain.toLowerCase()

      if (bannedDomains.includes(lowerDomain)) return false

      for (const validDomain of commonDomains) {
        const distance = levenshtein(lowerDomain, validDomain)

        if (distance > 0 && distance <= 2) {
          return false
        }
      }

      return true
    }, 'Please enter a valid email address'),

  phone: z
    .string()
    .trim()
    .refine((value) => {
      if (!value) return false;
      let phoneNumber = parsePhoneNumberFromString(value, 'US');
      if (!phoneNumber?.isValid()) {
        phoneNumber = parsePhoneNumberFromString(value);
      }
      return phoneNumber?.isValid() ?? false;
    }, 'Please enter a valid phone number'),

  service: z.string().optional(),

  vehicleType: z.string().optional(),

  message: z
    .string()
    .max(1000, 'Message cannot exceed 1000 characters')
    .optional(),
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
  source?: 'contact' | 'service' | 'vehicle' | 'vehicle_dialog' | 'quiz_result';
  vehicleName?: string;
  serviceTitle?: string;
  onSubmitSuccess?: () => void;
}

const formatPhoneNumber = (value: string) => {
  if (!value) return value;
  const phoneNumber = value.replace(/[^\d]/g, '');
  const phoneNumberLength = phoneNumber.length;
  if (phoneNumberLength < 4) return phoneNumber;
  if (phoneNumberLength < 7) {
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
  }
  return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(
    3,
    6
  )}-${phoneNumber.slice(6, 10)}`;
};

export function ContactForm({
  compact = false,
  initialValues,
  hideServiceField = false,
  showVehicleField = true,
  source = 'contact',
  vehicleName,
  serviceTitle,
  onSubmitSuccess,
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
    mode: 'onChange',
    resolver: zodResolver(contactSchema),
    defaultValues: {
      fullName: initialValues?.fullName ?? "",
      email: initialValues?.email ?? "",
      phone: formatPhoneNumber(initialValues?.phone ?? ""),
      service: initialValues?.service ?? undefined,
      vehicleType: initialValues?.vehicleType ?? undefined,
      message: initialValues?.message ?? "",
    },
  });

  const selectedService = watch('service');
  const { ref: messageRef, ...messageRegister } = register('message');

  const { ref: phoneRef, onChange: onPhoneChange, ...phoneRegister } = register('phone');

  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => {
        setIsSuccess(false);
        reset();
      }, 6000);

      return () => clearTimeout(timer);
    }
  }, [isSuccess, reset]);

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
            : source === 'vehicle' || source === 'vehicle_dialog'
              ? 'Vehicle Inquiry'
              : 'N/A';
      const vehicleLabel =
        source === 'vehicle' || source === 'vehicle_dialog'
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
      if (onSubmitSuccess) {
        onSubmitSuccess();
      }
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
        showQuickQuestionsCta={false}
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
            {...phoneRegister}
            ref={phoneRef}
            onChange={(e) => {
              const formatted = formatPhoneNumber(e.target.value);
              e.target.value = formatted;
              onPhoneChange(e);
            }}
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

      <div className="space-y-3">
        <div className="flex flex-col gap-2">
          <Label htmlFor="message" className="text-sm font-medium">Message</Label>
          <div className="flex flex-wrap gap-2">
            {messageSuggestions.map((suggestion) => (
              <button
                key={suggestion.value}
                type="button"
                onClick={() => handleSuggestionSelect(suggestion.value)}
                className="px-3 py-1.5 rounded-full text-xs font-semibold border border-border/60 hover:border-accent hover:bg-accent/5 transition-all text-muted-foreground hover:text-accent bg-background/50 backdrop-blur-sm"
              >
                {suggestion.label}
              </button>
            ))}
          </div>
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
