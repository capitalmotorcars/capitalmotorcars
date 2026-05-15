import { useState, useRef, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
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
import { Loader2, Upload, X } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import { FormSuccessMessage } from './FormSuccessMessage';
import { getSubmitErrorMessage, getSubmitErrorFromException } from './getSubmitErrorMessage';
import { WEBHOOK_CONTACT_PATH, WEBHOOK_TRADE_IN_PATH } from '@/lib/webhook';
import { CONSULTANT_OPTIONS, getConsultantEmail } from '@/lib/creditConstants';

const MAX_EXTERIOR = 5;
const MAX_INTERIOR = 5;

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = (reader.result as string).split(',')[1] ?? '';
      resolve(base64.replace(/\s/g, ''));
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

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
      if (!phoneNumber?.isPossible()) {
        phoneNumber = parsePhoneNumberFromString(value);
      }
      return phoneNumber?.isPossible() ?? false;
    }, 'Please enter a valid phone number'),

  service: z.string().optional(),

  vehicleType: z.string().optional(),

  message: z
    .string()
    .max(1000, 'Message cannot exceed 1000 characters')
    .optional(),

  messageSuggestion: z.string().optional(),

  vin: z.string().optional(),
  make: z.string().optional(),
  model: z.string().optional(),
  color: z.string().optional(),
  mileage: z.string().optional(),
  brakes: z.boolean().optional(),
  engine: z.boolean().optional(),
  transmission: z.boolean().optional(),
  scratches: z.boolean().optional(),
  accidents: z.boolean().optional(),
  salesAgent: z.string().optional(),
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

function getTradeInFromUrl(searchParams: URLSearchParams): boolean {
  const tradeIn = searchParams.get('trade-in');
  const service = searchParams.get('service');
  if (tradeIn === '1' || tradeIn === 'true') return true;
  if (service === 'trade-in') return true;
  return false;
}

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
  const [searchParams, setSearchParams] = useSearchParams();
  const tradeInFromUrl = getTradeInFromUrl(searchParams);
  const initialService = tradeInFromUrl ? 'trade-in' : (initialValues?.service ?? undefined);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [exteriorFiles, setExteriorFiles] = useState<File[]>([]);
  const [interiorFiles, setInteriorFiles] = useState<File[]>([]);
  const [successWasTradeIn, setSuccessWasTradeIn] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const formContentRef = useRef<HTMLDivElement>(null);

  const scrollToFormContent = () => {
    setTimeout(() => {
      const el = document.getElementById('contact-form-main') ?? formContentRef.current;
      el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 150);
  };

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
      service: initialService,
      vehicleType: initialValues?.vehicleType ?? undefined,
      message: initialValues?.message ?? "",
      messageSuggestion: "",
      vin: "",
      make: "",
      model: "",
      color: "",
      mileage: "",
      brakes: false,
      engine: false,
      transmission: false,
      scratches: false,
      accidents: false,
      salesAgent: "",
    },
  });

  const selectedService = watch('service');
  const { ref: messageRef, ...messageRegister } = register('message');

  const { ref: phoneRef, onChange: onPhoneChange, ...phoneRegister } = register('phone');

  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => {
        setIsSuccess(false);
        setSuccessWasTradeIn(false);
        reset();
      }, 6000);

      return () => clearTimeout(timer);
    }
  }, [isSuccess, reset]);

  // Scroll to form when landing with trade-in from URL
  useEffect(() => {
    if (tradeInFromUrl) {
      scrollToFormContent();
    }
  }, [tradeInFromUrl]);

  // Sync URL with trade-in selection so shared links work
  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    const hasTradeIn = selectedService === 'trade-in';
    const urlHasTradeIn = getTradeInFromUrl(params);

    if (hasTradeIn && !urlHasTradeIn) {
      params.set('trade-in', '1');
      setSearchParams(params, { replace: true });
    } else if (!hasTradeIn && urlHasTradeIn) {
      params.delete('trade-in');
      if (params.get('service') === 'trade-in') params.delete('service');
      setSearchParams(params, { replace: true });
    }
  }, [selectedService, searchParams, setSearchParams]);

  const handleSuggestionSelect = (value: string) => {
    const suggestion = messageSuggestions.find(s => s.value === value);
    if (suggestion) {
      if (value === 'trade-in') {
        setValue('service', 'trade-in', { shouldValidate: false });
        setValue('message', '', { shouldValidate: false });
        setValue('messageSuggestion', 'trade-in', { shouldValidate: false });
      } else {
        setValue('service', '', { shouldValidate: false });
        setValue('message', suggestion.fullText, { shouldValidate: false });
        setValue('messageSuggestion', value, { shouldValidate: false });
      }
      scrollToFormContent();
    }
  };

  const addFiles = (
    list: File[],
    setList: React.Dispatch<React.SetStateAction<File[]>>,
    files: FileList | null,
    max: number
  ) => {
    if (!files?.length) return;
    const remaining = max - list.length;
    const toAdd = Array.from(files).slice(0, remaining).filter((f) => f.type.startsWith('image/'));
    setList((prev) => [...prev, ...toAdd].slice(0, max));
  };

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      if (data.service === 'trade-in') {
        const vin = (data.vin ?? '').trim().toUpperCase();
        const make = (data.make ?? '').trim();
        const model = (data.model ?? '').trim();
        const salesAgent = (data.salesAgent ?? '').trim();
        if (!vin) {
          setSubmitError('VIN is required for trade-in requests.');
          return;
        }
        if (!make) {
          setSubmitError('Make is required for trade-in requests.');
          return;
        }
        if (!model) {
          setSubmitError('Model is required for trade-in requests.');
          return;
        }
        if (!salesAgent) {
          setSubmitError('Please select a sales agent.');
          return;
        }
        const exteriorBase64 = await Promise.all(exteriorFiles.map((f) => fileToBase64(f)));
        const interiorBase64 = await Promise.all(interiorFiles.map((f) => fileToBase64(f)));
        const payload = {
          Type: 'Trade-In Value',
          Name: data.fullName,
          Email: data.email,
          Phone: data.phone,
          VIN: vin,
          Make: make,
          Model: model,
          Color: (data.color ?? '').trim(),
          Mileage: (data.mileage ?? '').trim(),
          IssuesBrakes: data.brakes ?? false,
          IssuesEngine: data.engine ?? false,
          IssuesTransmission: data.transmission ?? false,
          IssuesScratches: data.scratches ?? false,
          IssuesAccidents: data.accidents ?? false,
          SalesAgent: salesAgent,
          SalesAgentEmail: getConsultantEmail(salesAgent),
          ExteriorPhotoCount: exteriorFiles.length,
          InteriorPhotoCount: interiorFiles.length,
          ExteriorPhotos: exteriorFiles.length > 0
            ? exteriorFiles.map((f, i) => ({ filename: f.name, base64: exteriorBase64[i] }))
            : [],
          InteriorPhotos: interiorFiles.length > 0
            ? interiorFiles.map((f, i) => ({ filename: f.name, base64: interiorBase64[i] }))
            : [],
          Source: source,
          Service: serviceTitle ?? 'Trade-In Evaluation',
        };
        const res = await fetch(WEBHOOK_TRADE_IN_PATH, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        const json = await res.json().catch(() => ({}));
        if (res.status < 200 || res.status >= 300) {
          setSubmitError(getSubmitErrorMessage(res, json));
          return;
        }
        setSuccessWasTradeIn(true);
        setIsSuccess(true);
        reset();
        setExteriorFiles([]);
        setInteriorFiles([]);
        if (onSubmitSuccess) onSubmitSuccess();
        return;
      }

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

      const suggestionLabel = data.messageSuggestion
        ? (messageSuggestions.find(s => s.value === data.messageSuggestion)?.label ?? data.messageSuggestion)
        : undefined;

      const typeLabel = suggestionLabel ?? (serviceLabel !== 'Contact' && serviceLabel !== 'N/A' ? serviceLabel : 'Contact');

      const payload = {
        Type: typeLabel,
        Name: data.fullName,
        Phone: data.phone,
        Email: data.email,
        Service: serviceLabel,
        Vehicle: vehicleLabel,
        Message: data.message,
        Source: source,
      };

      const res = await fetch(WEBHOOK_CONTACT_PATH, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const json = await res.json().catch(() => ({}));
      if (res.status < 200 || res.status >= 300) {
        setSubmitError(getSubmitErrorMessage(res, json));
        return;
      }
      setSuccessWasTradeIn(false);
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
        title={successWasTradeIn ? "Request received!" : "You're all set!"}
        subtitle={successWasTradeIn ? "We'll review your vehicle details and send you an offer shortly." : "A team member will reach out to you shortly."}
        timing={successWasTradeIn ? "Usually within 24 hours" : "Usually within a few hours"}
        showQuickQuestionsCta={false}
      />
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div id="contact-form-main" ref={formContentRef} className={cn(compact ? 'space-y-4' : 'grid md:grid-cols-2 gap-5', 'scroll-mt-28')}>
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
            placeholder="201-509-5555"
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
            <Select
              value={selectedService}
              onValueChange={(value) => {
                setValue('service', value);
                scrollToFormContent();
              }}
            >
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
          <Label className="text-sm font-medium">Quick options</Label>
          <div className="flex flex-wrap gap-2">
            {messageSuggestions.map((suggestion) => {
              const isSelected =
                suggestion.value === 'trade-in'
                  ? selectedService === 'trade-in'
                  : watch('message') === suggestion.fullText;
              return (
                <button
                  key={suggestion.value}
                  type="button"
                  data-quick-action
                  onClick={() => handleSuggestionSelect(suggestion.value)}
                  className={cn(
                    'px-3 py-1.5 rounded-full text-xs font-semibold border-2 transition-all bg-background/50 backdrop-blur-sm',
                    isSelected
                      ? 'border-blue-500 bg-blue-500/10 text-blue-600 dark:text-blue-400'
                      : 'border-border/60 hover:border-accent hover:bg-accent/5 text-muted-foreground hover:text-accent'
                  )}
                >
                  {suggestion.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {selectedService === 'trade-in' ? (
        <div className="space-y-5 pt-1">
          <div>
            <h4 className="text-sm font-semibold text-foreground dark:text-white mb-3">Vehicle Details</h4>
            <div className={compact ? 'space-y-4' : 'grid md:grid-cols-2 lg:grid-cols-3 gap-4'}>
              <div className="space-y-1.5">
                <Label htmlFor="vin" className="text-sm font-medium">VIN *</Label>
                <Input id="vin" {...register('vin')} placeholder="e.g. 1HGBH41JXMN109186" className={cn(errors.vin && 'border-destructive')} />
                {errors.vin && <p className="text-xs text-destructive">{errors.vin.message}</p>}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="make" className="text-sm font-medium">Make *</Label>
                <Input id="make" {...register('make')} placeholder="e.g. Toyota" className={cn(errors.make && 'border-destructive')} />
                {errors.make && <p className="text-xs text-destructive">{errors.make.message}</p>}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="model" className="text-sm font-medium">Model *</Label>
                <Input id="model" {...register('model')} placeholder="e.g. Camry" className={cn(errors.model && 'border-destructive')} />
                {errors.model && <p className="text-xs text-destructive">{errors.model.message}</p>}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="color" className="text-sm font-medium">Color</Label>
                <Input id="color" {...register('color')} placeholder="e.g. Silver, Black" className={cn(errors.color && 'border-destructive')} />
                {errors.color && <p className="text-xs text-destructive">{errors.color.message}</p>}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="mileage" className="text-sm font-medium">Mileage</Label>
                <Input id="mileage" {...register('mileage')} type="text" inputMode="numeric" placeholder="e.g. 45,000" className={cn(errors.mileage && 'border-destructive')} />
                {errors.mileage && <p className="text-xs text-destructive">{errors.mileage.message}</p>}
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground dark:text-white mb-3">Vehicle Condition (check any that apply)</h4>
            <div className="flex flex-wrap gap-6">
              {[
                { key: 'brakes' as const, label: 'Brakes' },
                { key: 'engine' as const, label: 'Engine' },
                { key: 'transmission' as const, label: 'Transmission' },
                { key: 'scratches' as const, label: 'Scratches' },
                { key: 'accidents' as const, label: 'Accidents' },
              ].map(({ key, label }) => (
                <div key={key} className="flex items-center gap-2">
                  <Checkbox id={key} checked={watch(key)} onCheckedChange={(v) => setValue(key, !!v)} />
                  <Label htmlFor={key} className="text-sm font-medium cursor-pointer">{label}</Label>
                </div>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-semibold text-foreground dark:text-white mb-2">Exterior Photos (up to {MAX_EXTERIOR})</h4>
              <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                id="exterior-photos"
                onChange={(e) => addFiles(exteriorFiles, setExteriorFiles, e.target.files, MAX_EXTERIOR)}
              />
              <label
                htmlFor="exterior-photos"
                className={cn(
                  'flex flex-col items-center justify-center gap-2 min-h-[100px] rounded-xl border-2 border-dashed cursor-pointer transition-colors',
                  'border-border dark:border-white/20 hover:border-accent hover:bg-accent/5'
                )}
              >
                <Upload className="w-6 h-6 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Click or drop images</span>
                <span className="text-xs text-muted-foreground">{exteriorFiles.length}/{MAX_EXTERIOR}</span>
              </label>
              {exteriorFiles.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {exteriorFiles.map((f, i) => (
                    <div key={i} className="relative group">
                      <img src={URL.createObjectURL(f)} alt="" className="w-14 h-14 object-cover rounded-lg border" />
                      <button
                        type="button"
                        onClick={() => setExteriorFiles((prev) => prev.filter((_, idx) => idx !== i))}
                        className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div>
              <h4 className="text-sm font-semibold text-foreground dark:text-white mb-2">Interior Photos (up to {MAX_INTERIOR})</h4>
              <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                id="interior-photos"
                onChange={(e) => addFiles(interiorFiles, setInteriorFiles, e.target.files, MAX_INTERIOR)}
              />
              <label
                htmlFor="interior-photos"
                className={cn(
                  'flex flex-col items-center justify-center gap-2 min-h-[100px] rounded-xl border-2 border-dashed cursor-pointer transition-colors',
                  'border-border dark:border-white/20 hover:border-accent hover:bg-accent/5'
                )}
              >
                <Upload className="w-6 h-6 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Click or drop images</span>
                <span className="text-xs text-muted-foreground">{interiorFiles.length}/{MAX_INTERIOR}</span>
              </label>
              {interiorFiles.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {interiorFiles.map((f, i) => (
                    <div key={i} className="relative group">
                      <img src={URL.createObjectURL(f)} alt="" className="w-14 h-14 object-cover rounded-lg border" />
                      <button
                        type="button"
                        onClick={() => setInteriorFiles((prev) => prev.filter((_, idx) => idx !== i))}
                        className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="salesAgent" className="text-sm font-medium">Sales Agent *</Label>
            <Select value={watch('salesAgent')} onValueChange={(v) => setValue('salesAgent', v)}>
              <SelectTrigger className={cn(errors.salesAgent && 'border-destructive', 'mt-1.5')}>
                <SelectValue placeholder="Select your sales agent" />
              </SelectTrigger>
              <SelectContent>
                {CONSULTANT_OPTIONS.filter((o) => o.value).map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.salesAgent && <p className="text-xs text-destructive mt-1">{errors.salesAgent.message}</p>}
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          <Label htmlFor="message" className="text-sm font-medium">Message</Label>
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
      )}

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
