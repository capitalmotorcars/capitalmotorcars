import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import validator from 'validator';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Loader2, Upload, X, Car } from 'lucide-react';
import { cn } from '@/lib/utils';
import { FormSuccessMessage } from './FormSuccessMessage';
import { getSubmitErrorMessage, getSubmitErrorFromException } from './getSubmitErrorMessage';
import { WEBHOOK_TRADE_IN_PATH } from '@/lib/webhook';
import { CONSULTANT_OPTIONS, getConsultantEmail } from '@/lib/creditConstants';

const MAX_EXTERIOR = 5;
const MAX_INTERIOR = 5;

const tradeInValueSchema = z.object({
  fullName: z.string().min(2, 'Name is required').max(100).trim(),
  email: z.string().trim().refine((v) => validator.isEmail(v), 'Valid email required'),
  phone: z.string().trim().refine((v) => {
    if (!v) return false;
    const p = parsePhoneNumberFromString(v, 'US') ?? parsePhoneNumberFromString(v);
    return p?.isValid() ?? false;
  }, 'Valid phone required'),
  vin: z.string().min(1, 'VIN is required').max(20).trim().toUpperCase(),
  make: z.string().min(1, 'Make is required').max(100).trim(),
  model: z.string().min(1, 'Model is required').max(100).trim(),
  color: z.string().optional(),
  mileage: z.string().optional(),
  brakes: z.boolean().optional(),
  engine: z.boolean().optional(),
  transmission: z.boolean().optional(),
  scratches: z.boolean().optional(),
  accidents: z.boolean().optional(),
  salesAgent: z.string().min(1, 'Please select a sales agent'),
});

type TradeInValueFormData = z.infer<typeof tradeInValueSchema>;

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

const formatPhoneNumber = (value: string) => {
  if (!value) return value;
  const digits = value.replace(/\D/g, '');
  if (digits.length < 4) return digits;
  if (digits.length < 7) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
};

export function TradeInValueForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [exteriorFiles, setExteriorFiles] = useState<File[]>([]);
  const [interiorFiles, setInteriorFiles] = useState<File[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<TradeInValueFormData>({
    mode: 'onChange',
    resolver: zodResolver(tradeInValueSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      vin: '',
      make: '',
      model: '',
      color: '',
      mileage: '',
      brakes: false,
      engine: false,
      transmission: false,
      scratches: false,
      accidents: false,
      salesAgent: '',
    },
  });

  const { ref: phoneRef, onChange: onPhoneChange, ...phoneRegister } = register('phone');

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

  const removeFile = (
    list: File[],
    setList: React.Dispatch<React.SetStateAction<File[]>>,
    index: number
  ) => {
    setList((prev) => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: TradeInValueFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const exteriorBase64 = await Promise.all(exteriorFiles.map((f) => fileToBase64(f)));
      const interiorBase64 = await Promise.all(interiorFiles.map((f) => fileToBase64(f)));

      const payload = {
        Type: 'Trade-In Value',
        Name: data.fullName,
        Email: data.email,
        Phone: data.phone,
        VIN: data.vin,
        Make: data.make,
        Model: data.model,
        Color: (data.color ?? '').trim(),
        Mileage: (data.mileage ?? '').trim(),
        IssuesBrakes: data.brakes ?? false,
        IssuesEngine: data.engine ?? false,
        IssuesTransmission: data.transmission ?? false,
        IssuesScratches: data.scratches ?? false,
        IssuesAccidents: data.accidents ?? false,
        SalesAgent: data.salesAgent,
        SalesAgentEmail: getConsultantEmail(data.salesAgent),
        ExteriorPhotoCount: exteriorFiles.length,
        InteriorPhotoCount: interiorFiles.length,
        ExteriorPhotos: exteriorFiles.length > 0
          ? exteriorFiles.map((f, i) => ({ filename: f.name, base64: exteriorBase64[i] }))
          : [],
        InteriorPhotos: interiorFiles.length > 0
          ? interiorFiles.map((f, i) => ({ filename: f.name, base64: interiorBase64[i] }))
          : [],
        Source: 'trade-in-value',
        Service: 'Trade-In Evaluation',
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
      setIsSuccess(true);
      reset();
      setExteriorFiles([]);
      setInteriorFiles([]);
    } catch (e) {
      setSubmitError(getSubmitErrorFromException(e));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <FormSuccessMessage
        title="Request received!"
        subtitle="We'll review your vehicle details and send you an offer shortly."
        timing="Usually within 24 hours"
        showQuickQuestionsCta={false}
      />
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Contact info */}
      <div>
        <h4 className="text-sm font-semibold text-foreground dark:text-white mb-4">Your Information</h4>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="fullName">Full Name *</Label>
            <Input id="fullName" {...register('fullName')} placeholder="John Smith" className={cn(errors.fullName && 'border-destructive')} />
            {errors.fullName && <p className="text-xs text-destructive">{errors.fullName.message}</p>}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="email">Email *</Label>
            <Input id="email" type="email" {...register('email')} placeholder="john@example.com" className={cn(errors.email && 'border-destructive')} />
            {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="phone">Phone *</Label>
            <Input
              id="phone"
              type="tel"
              {...phoneRegister}
              ref={phoneRef}
              onChange={(e) => {
                e.target.value = formatPhoneNumber(e.target.value);
                onPhoneChange(e);
              }}
              placeholder="201-509-5555"
              className={cn(errors.phone && 'border-destructive')}
            />
            {errors.phone && <p className="text-xs text-destructive">{errors.phone.message}</p>}
          </div>
        </div>
      </div>

      {/* Vehicle info */}
      <div>
        <h4 className="text-sm font-semibold text-foreground dark:text-white mb-4">Vehicle Details</h4>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="vin">VIN *</Label>
            <Input id="vin" {...register('vin')} placeholder="e.g. 1HGBH41JXMN109186" className={cn(errors.vin && 'border-destructive')} />
            {errors.vin && <p className="text-xs text-destructive">{errors.vin.message}</p>}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="make">Make *</Label>
            <Input id="make" {...register('make')} placeholder="e.g. Toyota" className={cn(errors.make && 'border-destructive')} />
            {errors.make && <p className="text-xs text-destructive">{errors.make.message}</p>}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="model">Model *</Label>
            <Input id="model" {...register('model')} placeholder="e.g. Camry" className={cn(errors.model && 'border-destructive')} />
            {errors.model && <p className="text-xs text-destructive">{errors.model.message}</p>}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="color">Color</Label>
            <Input id="color" {...register('color')} placeholder="e.g. Silver, Black" className={cn(errors.color && 'border-destructive')} />
            {errors.color && <p className="text-xs text-destructive">{errors.color.message}</p>}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="mileage">Mileage</Label>
            <Input id="mileage" {...register('mileage')} type="text" inputMode="numeric" placeholder="e.g. 45,000" className={cn(errors.mileage && 'border-destructive')} />
            {errors.mileage && <p className="text-xs text-destructive">{errors.mileage.message}</p>}
          </div>
        </div>
      </div>

      {/* Vehicle condition checkboxes */}
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

      {/* Photo uploads */}
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
              'flex flex-col items-center justify-center gap-2 min-h-[120px] rounded-xl border-2 border-dashed cursor-pointer transition-colors',
              'border-border dark:border-white/20 hover:border-accent hover:bg-accent/5'
            )}
          >
            <Upload className="w-8 h-8 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Click or drop images</span>
            <span className="text-xs text-muted-foreground">{exteriorFiles.length}/{MAX_EXTERIOR}</span>
          </label>
          {exteriorFiles.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {exteriorFiles.map((f, i) => (
                <div key={i} className="relative group">
                  <img src={URL.createObjectURL(f)} alt="" className="w-16 h-16 object-cover rounded-lg border" />
                  <button
                    type="button"
                    onClick={() => removeFile(exteriorFiles, setExteriorFiles, i)}
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
              'flex flex-col items-center justify-center gap-2 min-h-[120px] rounded-xl border-2 border-dashed cursor-pointer transition-colors',
              'border-border dark:border-white/20 hover:border-accent hover:bg-accent/5'
            )}
          >
            <Upload className="w-8 h-8 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Click or drop images</span>
            <span className="text-xs text-muted-foreground">{interiorFiles.length}/{MAX_INTERIOR}</span>
          </label>
          {interiorFiles.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {interiorFiles.map((f, i) => (
                <div key={i} className="relative group">
                  <img src={URL.createObjectURL(f)} alt="" className="w-16 h-16 object-cover rounded-lg border" />
                  <button
                    type="button"
                    onClick={() => removeFile(interiorFiles, setInteriorFiles, i)}
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

      {/* Sales agent */}
      <div>
        <h4 className="text-sm font-semibold text-foreground dark:text-white mb-2">Sales Agent *</h4>
        <Select value={watch('salesAgent')} onValueChange={(v) => setValue('salesAgent', v)}>
          <SelectTrigger className={cn(errors.salesAgent && 'border-destructive')}>
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

      {submitError && (
        <p className="text-sm text-destructive" role="alert">{submitError}</p>
      )}

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full min-h-[48px] bg-accent hover:bg-accent/90 text-accent-foreground font-semibold"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin mr-2" />
            Submitting...
          </>
        ) : (
          'Submit Trade-In Value Request'
        )}
      </Button>
    </form>
  );
}
