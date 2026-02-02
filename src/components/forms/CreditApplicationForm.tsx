import { useState, useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
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
import { Loader2, Shield, ChevronLeft, ChevronRight, UserPlus, Upload } from 'lucide-react';
import { FormSuccessMessage } from './FormSuccessMessage';
import { getSubmitErrorMessage, getSubmitErrorFromException } from './getSubmitErrorMessage';
import { WEBHOOK_URL } from '@/lib/webhook';
import { US_STATES, HOUSING_OPTIONS, CONSULTANT_OPTIONS } from '@/lib/creditConstants';
import { cn } from '@/lib/utils';

// Applicant address + info (Step 1)
const applicantInfoSchema = z.object({
  firstName: z.string().min(1, 'First name is required').max(100),
  lastName: z.string().min(1, 'Last name is required').max(100),
  ssn: z.string().min(9, 'SSN must be at least 9 digits').max(20),
  dob: z.string().min(1, 'Date of birth is required').max(20),
  housing: z.string().min(1, 'Housing status is required'),
  phone: z.string().min(10, 'Valid phone number is required').max(20),
  email: z.string().email('Valid email is required').max(255),
  street: z.string().min(1, 'Street is required').max(200),
  city: z.string().min(1, 'City is required').max(100),
  state: z.string().min(1, 'State is required'),
  zip: z.string().min(5, 'ZIP is required').max(10),
  yearsAtResidence: z.string().min(1, 'Years at residence is required').max(10),
  monthlyPayment: z.string().min(1, 'Monthly payment is required').max(20),
});

// Employment (Step 2)
const employmentSchema = z.object({
  employer: z.string().min(1, 'Employer is required').max(200),
  position: z.string().min(1, 'Position is required').max(200),
  grossAnnualIncome: z.string().min(1, 'Gross annual income is required').max(30),
  otherAnnualIncome: z.string().max(30).optional(),
  organizationAffiliation: z.string().max(200).optional(),
});

// Co-applicant: same as applicant + employment when enabled
const coApplicantSchema = z.object({
  coApplicantEnabled: z.boolean(),
  coFirstName: z.string().max(100).optional(),
  coLastName: z.string().max(100).optional(),
  coSsn: z.string().max(20).optional(),
  coDob: z.string().max(20).optional(),
  coHousing: z.string().optional(),
  coPhone: z.string().max(20).optional(),
  coEmail: z
    .string()
    .max(255)
    .optional()
    .refine(
      (v) => !v || v.trim() === '' || z.string().email().safeParse(v.trim()).success,
      'Please enter a valid email address'
    ),
  coStreet: z.string().max(200).optional(),
  coCity: z.string().max(100).optional(),
  coState: z.string().optional(),
  coZip: z.string().max(10).optional(),
  coYearsAtResidence: z.string().max(10).optional(),
  coMonthlyPayment: z.string().max(20).optional(),
  coEmployer: z.string().max(200).optional(),
  coPosition: z.string().max(200).optional(),
  coGrossAnnualIncome: z.string().max(30).optional(),
  coOtherAnnualIncome: z.string().max(30).optional(),
  coOrganizationAffiliation: z.string().max(200).optional(),
}).refine(
  (data) => {
    if (!data.coApplicantEnabled) return true;
    return (
      (data.coFirstName?.trim()?.length ?? 0) > 0 &&
      (data.coLastName?.trim()?.length ?? 0) > 0 &&
      (data.coSsn?.trim()?.length ?? 0) >= 9 &&
      (data.coDob?.trim()?.length ?? 0) > 0 &&
      (data.coHousing?.trim()?.length ?? 0) > 0 &&
      (data.coPhone?.trim()?.length ?? 0) >= 10 &&
      (data.coEmail?.trim()?.length ?? 0) > 0 &&
      (data.coStreet?.trim()?.length ?? 0) > 0 &&
      (data.coCity?.trim()?.length ?? 0) > 0 &&
      (data.coState?.trim()?.length ?? 0) > 0 &&
      (data.coZip?.trim()?.length ?? 0) >= 5 &&
      (data.coYearsAtResidence?.trim()?.length ?? 0) > 0 &&
      (data.coMonthlyPayment?.trim()?.length ?? 0) > 0 &&
      (data.coEmployer?.trim()?.length ?? 0) > 0 &&
      (data.coPosition?.trim()?.length ?? 0) > 0 &&
      (data.coGrossAnnualIncome?.trim()?.length ?? 0) > 0
    );
  },
  { message: 'Please complete all required co-applicant fields.', path: ['coApplicantEnabled'] }
);

// Legal (Step 5)
const legalSchema = z.object({
  consultant: z.string().min(1, 'Please select a consultant'),
  legalAgree: z.boolean().refine((v) => v === true, 'You must agree to the authorization.'),
  signature: z.string().min(2, 'Full legal name signature is required').max(100),
  signatureDate: z.string().max(20).optional(),
});

const creditSchema = applicantInfoSchema
  .merge(employmentSchema)
  .merge(coApplicantSchema)
  .merge(legalSchema);

type CreditFormData = z.infer<typeof creditSchema>;

const STEPS = [
  { id: 1, label: 'Applicant Info' },
  { id: 2, label: 'Employment' },
  { id: 3, label: 'Co-Applicant' },
  { id: 4, label: 'Uploads' },
  { id: 5, label: 'Legal' },
] as const;

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve((reader.result as string).split(',')[1] ?? '');
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/** Same logic as coApplicantSchema.refine – used when validating step 3 so the refine runs even when triggering specific fields. */
function isCoApplicantSectionValid(data: Partial<CreditFormData>): boolean {
  if (!data.coApplicantEnabled) return true;
  return (
    (data.coFirstName?.trim()?.length ?? 0) > 0 &&
    (data.coLastName?.trim()?.length ?? 0) > 0 &&
    (data.coSsn?.trim()?.length ?? 0) >= 9 &&
    (data.coDob?.trim()?.length ?? 0) > 0 &&
    (data.coHousing?.trim()?.length ?? 0) > 0 &&
    (data.coPhone?.trim()?.length ?? 0) >= 10 &&
    (data.coEmail?.trim()?.length ?? 0) > 0 &&
    (data.coStreet?.trim()?.length ?? 0) > 0 &&
    (data.coCity?.trim()?.length ?? 0) > 0 &&
    (data.coState?.trim()?.length ?? 0) > 0 &&
    (data.coZip?.trim()?.length ?? 0) >= 5 &&
    (data.coYearsAtResidence?.trim()?.length ?? 0) > 0 &&
    (data.coMonthlyPayment?.trim()?.length ?? 0) > 0 &&
    (data.coEmployer?.trim()?.length ?? 0) > 0 &&
    (data.coPosition?.trim()?.length ?? 0) > 0 &&
    (data.coGrossAnnualIncome?.trim()?.length ?? 0) > 0
  );
}

export function CreditApplicationForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [file1, setFile1] = useState<File | null>(null);
  const [file2, setFile2] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    getValues,
    setError,
    trigger,
    formState: { errors },
    reset,
  } = useForm<CreditFormData>({
    resolver: zodResolver(creditSchema),
    defaultValues: {
      coApplicantEnabled: false,
      legalAgree: false,
    },
  });

  const coApplicantEnabled = watch('coApplicantEnabled');

  // Set signature date when user reaches step 5 so the field shows current date; payload always uses submission date.
  useEffect(() => {
    if (currentStep === 5) {
      setValue('signatureDate', new Date().toISOString().slice(0, 10));
    }
  }, [currentStep, setValue]);

  const onSubmit = useCallback(
    async (data: CreditFormData) => {
      setIsSubmitting(true);
      setSubmitError(null);
      try {
        const document1Base64 = file1 ? await fileToBase64(file1) : undefined;
        const document2Base64 = file2 ? await fileToBase64(file2) : undefined;

        const payload = {
          VehicleOrService: 'Credit Application',
          // Step 1
          FirstName: data.firstName,
          LastName: data.lastName,
          Name: `${data.firstName} ${data.lastName}`,
          SSN: data.ssn,
          DOB: data.dob,
          Housing: data.housing,
          Phone: data.phone,
          Email: data.email,
          Street: data.street,
          City: data.city,
          State: data.state,
          ZIP: data.zip,
          YearsAtResidence: data.yearsAtResidence,
          MonthlyPayment: data.monthlyPayment,
          // Step 2
          Employer: data.employer,
          Position: data.position,
          GrossAnnualIncome: data.grossAnnualIncome,
          OtherAnnualIncome: data.otherAnnualIncome ?? '',
          OrganizationAffiliation: data.organizationAffiliation ?? '',
          // Co-applicant
          CoApplicantEnabled: data.coApplicantEnabled,
          ...(data.coApplicantEnabled && {
            CoFirstName: data.coFirstName,
            CoLastName: data.coLastName,
            CoSSN: data.coSsn,
            CoDOB: data.coDob,
            CoHousing: data.coHousing,
            CoPhone: data.coPhone,
            CoEmail: data.coEmail,
            CoStreet: data.coStreet,
            CoCity: data.coCity,
            CoState: data.coState,
            CoZIP: data.coZip,
            CoYearsAtResidence: data.coYearsAtResidence,
            CoMonthlyPayment: data.coMonthlyPayment,
            CoEmployer: data.coEmployer,
            CoPosition: data.coPosition,
            CoGrossAnnualIncome: data.coGrossAnnualIncome,
            CoOtherAnnualIncome: data.coOtherAnnualIncome ?? '',
            CoOrganizationAffiliation: data.coOrganizationAffiliation ?? '',
          }),
          // Step 4
          Document1FileName: file1?.name ?? '',
          Document2FileName: file2?.name ?? '',
          ...(document1Base64 && { Document1Base64: document1Base64 }),
          ...(document2Base64 && { Document2Base64: document2Base64 }),
          // Step 5
          Consultant: data.consultant,
          Signature: data.signature,
          SignatureDate: new Date().toISOString().slice(0, 10),
          LegalAgreed: data.legalAgree,
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
        setCurrentStep(1);
        setFile1(null);
        setFile2(null);
      } catch (e) {
        setSubmitError(getSubmitErrorFromException(e));
      } finally {
        setIsSubmitting(false);
      }
    },
    [file1, file2, reset]
  );

  const goNext = async () => {
    let fieldsToValidate: (keyof CreditFormData)[] = [];
    if (currentStep === 1) {
      fieldsToValidate = ['firstName', 'lastName', 'ssn', 'dob', 'housing', 'phone', 'email', 'street', 'city', 'state', 'zip', 'yearsAtResidence', 'monthlyPayment'];
    } else if (currentStep === 2) {
      fieldsToValidate = ['employer', 'position', 'grossAnnualIncome'];
    } else if (currentStep === 3) {
      // Step 3: trigger() only validates individual fields (all co-* are optional), so the
      // schema-level .refine() never runs. Run the same refine logic manually so incomplete
      // co-applicant data cannot pass when coApplicantEnabled is true.
      const values = getValues();
      if (!isCoApplicantSectionValid(values)) {
        setError('coApplicantEnabled', { message: 'Please complete all required co-applicant fields.', type: 'manual' });
        return;
      }
      fieldsToValidate = ['coApplicantEnabled', 'coFirstName', 'coLastName', 'coSsn', 'coDob', 'coHousing', 'coPhone', 'coEmail', 'coStreet', 'coCity', 'coState', 'coZip', 'coYearsAtResidence', 'coMonthlyPayment', 'coEmployer', 'coPosition', 'coGrossAnnualIncome'];
    } else if (currentStep === 5) {
      fieldsToValidate = ['consultant', 'legalAgree', 'signature'];
    }
    const ok = fieldsToValidate.length === 0 || (await trigger(fieldsToValidate));
    if (ok && currentStep < 5) setCurrentStep((s) => s + 1);
  };

  if (isSuccess) {
    return (
      <FormSuccessMessage
        title="Application received!"
        subtitle="Our finance team will review your information and contact you."
        timing="Within 1-2 business days"
        showQuickQuestionsCta={false}
      />
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Step Indicator */}
      <nav aria-label="Application steps" className="flex items-center justify-center gap-1 sm:gap-2">
        {STEPS.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div
              className={cn(
                'flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold transition-colors',
                currentStep === step.id
                  ? 'bg-accent text-accent-foreground ring-2 ring-accent/40'
                  : currentStep > step.id
                    ? 'bg-accent/60 text-accent-foreground'
                    : 'bg-white/10 text-white/70'
              )}
              aria-current={currentStep === step.id ? 'step' : undefined}
              aria-label={step.label}
            >
              {step.id}
            </div>
            {index < STEPS.length - 1 && (
              <div className="mx-0.5 h-0.5 w-3 sm:w-4 bg-white/20 rounded" aria-hidden />
            )}
          </div>
        ))}
      </nav>

      {/* Security Notice - Step 1 only */}
      {currentStep === 1 && (
        <div className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/10">
          <Shield className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
          <div className="text-sm text-white/90">
            <strong className="text-white">Your information is secure.</strong> We use industry-standard encryption. This application helps us understand your needs before a full credit check.
          </div>
        </div>
      )}

      {/* Step 1: Applicant Info */}
      {currentStep === 1 && (
        <div className="space-y-5">
          <h3 className="text-lg font-semibold text-white">Applicant Information</h3>
          <div className="grid md:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <Label htmlFor="firstName" className="text-sm font-medium text-white">First Name (Required)</Label>
              <Input id="firstName" {...register('firstName')} placeholder="John" className={errors.firstName ? 'border-destructive' : ''} />
              {errors.firstName && <p className="text-xs text-destructive mt-1">{errors.firstName.message}</p>}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="lastName" className="text-sm font-medium text-white">Last Name (Required)</Label>
              <Input id="lastName" {...register('lastName')} placeholder="Smith" className={errors.lastName ? 'border-destructive' : ''} />
              {errors.lastName && <p className="text-xs text-destructive mt-1">{errors.lastName.message}</p>}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="ssn" className="text-sm font-medium text-white">SSN (Required)</Label>
              <Input id="ssn" {...register('ssn')} placeholder="XXX-XX-XXXX" className={errors.ssn ? 'border-destructive' : ''} />
              {errors.ssn && <p className="text-xs text-destructive mt-1">{errors.ssn.message}</p>}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="dob" className="text-sm font-medium text-white">Date of Birth (Required)</Label>
              <Input id="dob" type="date" {...register('dob')} className={errors.dob ? 'border-destructive' : ''} />
              {errors.dob && <p className="text-xs text-destructive mt-1">{errors.dob.message}</p>}
            </div>
            <div className="space-y-1.5 md:col-span-2">
              <Label className="text-sm font-medium text-white">Housing (Required)</Label>
              <Select value={watch('housing') ?? ''} onValueChange={(v) => setValue('housing', v)}>
                <SelectTrigger className={errors.housing ? 'border-destructive' : ''}>
                  <SelectValue placeholder="Select housing" />
                </SelectTrigger>
                <SelectContent>
                  {HOUSING_OPTIONS.map((o) => (
                    <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.housing && <p className="text-xs text-destructive mt-1">{errors.housing.message}</p>}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="phone" className="text-sm font-medium text-white">Phone (Required)</Label>
              <Input id="phone" type="tel" {...register('phone')} placeholder="(555) 123-4567" className={errors.phone ? 'border-destructive' : ''} />
              {errors.phone && <p className="text-xs text-destructive mt-1">{errors.phone.message}</p>}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-sm font-medium text-white">Email (Required)</Label>
              <Input id="email" type="email" {...register('email')} placeholder="john@example.com" className={errors.email ? 'border-destructive' : ''} />
              {errors.email && <p className="text-xs text-destructive mt-1">{errors.email.message}</p>}
            </div>
            <div className="space-y-1.5 md:col-span-2">
              <Label htmlFor="street" className="text-sm font-medium text-white">Street Address (Required)</Label>
              <Input id="street" {...register('street')} placeholder="123 Main St" className={errors.street ? 'border-destructive' : ''} />
              {errors.street && <p className="text-xs text-destructive mt-1">{errors.street.message}</p>}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="city" className="text-sm font-medium text-white">City (Required)</Label>
              <Input id="city" {...register('city')} placeholder="City" className={errors.city ? 'border-destructive' : ''} />
              {errors.city && <p className="text-xs text-destructive mt-1">{errors.city.message}</p>}
            </div>
            <div className="space-y-1.5">
              <Label className="text-sm font-medium text-white">State (Required)</Label>
              <Select value={watch('state') ?? ''} onValueChange={(v) => setValue('state', v)}>
                <SelectTrigger className={errors.state ? 'border-destructive' : ''}>
                  <SelectValue placeholder="State" />
                </SelectTrigger>
                <SelectContent>
                  {US_STATES.map((s) => (
                    <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.state && <p className="text-xs text-destructive mt-1">{errors.state.message}</p>}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="zip" className="text-sm font-medium text-white">ZIP (Required)</Label>
              <Input id="zip" {...register('zip')} placeholder="12345" className={errors.zip ? 'border-destructive' : ''} />
              {errors.zip && <p className="text-xs text-destructive mt-1">{errors.zip.message}</p>}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="yearsAtResidence" className="text-sm font-medium text-white">Years at Residence (Required)</Label>
              <Input id="yearsAtResidence" {...register('yearsAtResidence')} placeholder="e.g. 3" className={errors.yearsAtResidence ? 'border-destructive' : ''} />
              {errors.yearsAtResidence && <p className="text-xs text-destructive mt-1">{errors.yearsAtResidence.message}</p>}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="monthlyPayment" className="text-sm font-medium text-white">Monthly Payment (Required)</Label>
              <Input id="monthlyPayment" {...register('monthlyPayment')} placeholder="e.g. 1500" className={errors.monthlyPayment ? 'border-destructive' : ''} />
              {errors.monthlyPayment && <p className="text-xs text-destructive mt-1">{errors.monthlyPayment.message}</p>}
            </div>
          </div>
        </div>
      )}

      {/* Step 2: Employment */}
      {currentStep === 2 && (
        <div className="space-y-5">
          <h3 className="text-lg font-semibold text-white">Employment</h3>
          <div className="grid md:grid-cols-2 gap-5">
            <div className="space-y-1.5 md:col-span-2">
              <Label htmlFor="employer" className="text-sm font-medium text-white">Employer (Required)</Label>
              <Input id="employer" {...register('employer')} placeholder="Company name" className={errors.employer ? 'border-destructive' : ''} />
              {errors.employer && <p className="text-xs text-destructive mt-1">{errors.employer.message}</p>}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="position" className="text-sm font-medium text-white">Position (Required)</Label>
              <Input id="position" {...register('position')} placeholder="Job title" className={errors.position ? 'border-destructive' : ''} />
              {errors.position && <p className="text-xs text-destructive mt-1">{errors.position.message}</p>}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="grossAnnualIncome" className="text-sm font-medium text-white">Gross Annual Income (Required)</Label>
              <Input id="grossAnnualIncome" {...register('grossAnnualIncome')} placeholder="e.g. 75000" className={errors.grossAnnualIncome ? 'border-destructive' : ''} />
              {errors.grossAnnualIncome && <p className="text-xs text-destructive mt-1">{errors.grossAnnualIncome.message}</p>}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="otherAnnualIncome" className="text-sm font-medium text-white">Other Annual Income (Optional)</Label>
              <Input id="otherAnnualIncome" {...register('otherAnnualIncome')} placeholder="e.g. 5000" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="organizationAffiliation" className="text-sm font-medium text-white">Organization Affiliation (Optional)</Label>
              <Input id="organizationAffiliation" {...register('organizationAffiliation')} placeholder="e.g. N/A" />
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Co-Applicant */}
      {currentStep === 3 && (
        <div className="space-y-5">
          <h3 className="text-lg font-semibold text-white">Co-Applicant</h3>
          <div className="flex items-center gap-3">
            <Checkbox
              id="coApplicantEnabled"
              checked={coApplicantEnabled}
              onCheckedChange={(checked) => setValue('coApplicantEnabled', checked === true)}
              className="border-white/30 data-[state=checked]:bg-accent data-[state=checked]:border-accent"
            />
            <Label htmlFor="coApplicantEnabled" className="text-sm font-medium text-white cursor-pointer flex items-center gap-2">
              <UserPlus className="w-4 h-4" />
              Add Co-Applicant
            </Label>
          </div>
          {errors.coApplicantEnabled && <p className="text-xs text-destructive">{errors.coApplicantEnabled.message}</p>}

          {coApplicantEnabled && (
            <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-5">
              <p className="text-sm text-white/80">Co-applicant information (mirrors main applicant).</p>
              <div className="grid md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <Label className="text-sm font-medium text-white">First Name (Required)</Label>
                  <Input {...register('coFirstName')} placeholder="First" />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-sm font-medium text-white">Last Name (Required)</Label>
                  <Input {...register('coLastName')} placeholder="Last" />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-sm font-medium text-white">SSN (Required)</Label>
                  <Input {...register('coSsn')} placeholder="XXX-XX-XXXX" />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-sm font-medium text-white">DOB (Required)</Label>
                  <Input type="date" {...register('coDob')} />
                </div>
                <div className="space-y-1.5 md:col-span-2">
                  <Label className="text-sm font-medium text-white">Housing (Required)</Label>
                  <Select value={watch('coHousing') ?? ''} onValueChange={(v) => setValue('coHousing', v)}>
                    <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                    <SelectContent>
                      {HOUSING_OPTIONS.map((o) => (
                        <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-sm font-medium text-white">Phone (Required)</Label>
                  <Input type="tel" {...register('coPhone')} />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-sm font-medium text-white">Email (Required)</Label>
                  <Input type="email" {...register('coEmail')} className={errors.coEmail ? 'border-destructive' : ''} />
                  {errors.coEmail && <p className="text-xs text-destructive mt-1">{errors.coEmail.message}</p>}
                </div>
                <div className="space-y-1.5 md:col-span-2">
                  <Label className="text-sm font-medium text-white">Street (Required)</Label>
                  <Input {...register('coStreet')} />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-sm font-medium text-white">City (Required)</Label>
                  <Input {...register('coCity')} />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-sm font-medium text-white">State (Required)</Label>
                  <Select value={watch('coState') ?? ''} onValueChange={(v) => setValue('coState', v)}>
                    <SelectTrigger><SelectValue placeholder="State" /></SelectTrigger>
                    <SelectContent>
                      {US_STATES.map((s) => (
                        <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-sm font-medium text-white">ZIP (Required)</Label>
                  <Input {...register('coZip')} />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-sm font-medium text-white">Years at Residence (Required)</Label>
                  <Input {...register('coYearsAtResidence')} />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-sm font-medium text-white">Monthly Payment (Required)</Label>
                  <Input {...register('coMonthlyPayment')} />
                </div>
                <div className="space-y-1.5 md:col-span-2">
                  <Label className="text-sm font-medium text-white">Employer (Required)</Label>
                  <Input {...register('coEmployer')} />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-sm font-medium text-white">Position (Required)</Label>
                  <Input {...register('coPosition')} />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-sm font-medium text-white">Gross Annual Income (Required)</Label>
                  <Input {...register('coGrossAnnualIncome')} />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-sm font-medium text-white">Other Annual Income (Optional)</Label>
                  <Input {...register('coOtherAnnualIncome')} />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-sm font-medium text-white">Organization Affiliation (Optional)</Label>
                  <Input {...register('coOrganizationAffiliation')} />
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Step 4: Uploads */}
      {currentStep === 4 && (
        <div className="space-y-5">
          <h3 className="text-lg font-semibold text-white">Documentation (Optional)</h3>
          <div className="grid md:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <Label htmlFor="doc1" className="text-sm font-medium text-white flex items-center gap-2">
                <Upload className="w-4 h-4" /> Document 1 (Optional)
              </Label>
              <Input
                id="doc1"
                type="file"
                accept=".pdf,image/*"
                className="file:mr-2 file:rounded-lg file:border-0 file:bg-accent/20 file:px-3 file:py-2 file:text-sm file:text-white cursor-pointer"
                onChange={(e) => setFile1(e.target.files?.[0] ?? null)}
              />
              {file1 && <p className="text-xs text-white/70 truncate">{file1.name}</p>}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="doc2" className="text-sm font-medium text-white flex items-center gap-2">
                <Upload className="w-4 h-4" /> Document 2 (Optional)
              </Label>
              <Input
                id="doc2"
                type="file"
                accept=".pdf,image/*"
                className="file:mr-2 file:rounded-lg file:border-0 file:bg-accent/20 file:px-3 file:py-2 file:text-sm file:text-white cursor-pointer"
                onChange={(e) => setFile2(e.target.files?.[0] ?? null)}
              />
              {file2 && <p className="text-xs text-white/70 truncate">{file2.name}</p>}
            </div>
          </div>
        </div>
      )}

      {/* Step 5: Legal */}
      {currentStep === 5 && (
        <div className="space-y-5">
          <h3 className="text-lg font-semibold text-white">Legal & Authorization</h3>
          <div className="space-y-1.5">
            <Label className="text-sm font-medium text-white">Consultant (Required)</Label>
            <Select value={watch('consultant') ?? ''} onValueChange={(v) => setValue('consultant', v)}>
              <SelectTrigger className={errors.consultant ? 'border-destructive' : ''}>
                <SelectValue placeholder="Select consultant" />
              </SelectTrigger>
              <SelectContent>
                {CONSULTANT_OPTIONS.filter((o) => o.value).map((o) => (
                  <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.consultant && <p className="text-xs text-destructive mt-1">{errors.consultant.message}</p>}
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 text-sm text-white/85 leading-relaxed">
            <p>
              By submitting this form, you authorize Capital Motor Cars to obtain and use consumer reports and other information in connection with your application. You agree that this is a preliminary application and does not constitute a commitment to extend credit. A full credit check may be performed upon your consent. You certify that the information provided is true and complete.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <Checkbox
              id="legalAgree"
              checked={watch('legalAgree')}
              onCheckedChange={(checked) => setValue('legalAgree', checked === true)}
              className="border-white/30 data-[state=checked]:bg-accent data-[state=checked]:border-accent mt-0.5"
            />
            <Label htmlFor="legalAgree" className="text-sm text-white cursor-pointer">
              I have read and agree to the authorization above. (Required)
            </Label>
          </div>
          {errors.legalAgree && <p className="text-xs text-destructive">{errors.legalAgree.message}</p>}
          <div className="space-y-1.5">
            <Label htmlFor="signature" className="text-sm font-medium text-white">Full Legal Name – Signature (Required)</Label>
            <Input id="signature" {...register('signature')} placeholder="Type your full legal name" className={errors.signature ? 'border-destructive' : ''} />
            {errors.signature && <p className="text-xs text-destructive mt-1">{errors.signature.message}</p>}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="signatureDate" className="text-sm font-medium text-white">Date (recorded at submission)</Label>
            <Input id="signatureDate" type="date" {...register('signatureDate')} className={errors.signatureDate ? 'border-destructive' : ''} />
            <p className="text-xs text-white/70">Today&apos;s date will be recorded when you submit.</p>
          </div>
        </div>
      )}

      {submitError && (
        <p className="text-sm text-destructive" role="alert">{submitError}</p>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between gap-4 pt-4 border-t border-white/10">
        <Button
          type="button"
          variant="outline"
          className="min-h-[44px] border-white/25 bg-white/10 text-white hover:bg-white/20"
          onClick={() => setCurrentStep((s) => s - 1)}
          disabled={currentStep === 1}
        >
          <ChevronLeft className="w-4 h-4 mr-1" /> Back
        </Button>
        {currentStep < 5 ? (
          <Button
            type="button"
            className="min-h-[44px] bg-accent hover:bg-accent/90 text-accent-foreground"
            onClick={goNext}
          >
            Next <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        ) : (
          <Button
            type="submit"
            disabled={isSubmitting}
            className="min-h-[44px] bg-accent hover:bg-accent/90 text-accent-foreground"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                Submitting...
              </>
            ) : (
              'Apply for Credit'
            )}
          </Button>
        )}
      </div>
    </form>
  );
}
