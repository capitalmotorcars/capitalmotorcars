import { useState, useCallback, useRef, useEffect } from 'react';
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
import { Loader2, Building, User, Landmark, Upload, Shield, ChevronLeft, ChevronRight, CheckCircle2, X, FileText, Lock, Calendar, Phone, DollarSign, MapPin } from 'lucide-react';
import { FormSuccessMessage } from './FormSuccessMessage';
import { getSubmitErrorMessage, getSubmitErrorFromException } from './getSubmitErrorMessage';
import { WEBHOOK_URL_CREDIT_APPLICATION } from '@/lib/webhook';
import { CONSULTANT_OPTIONS, getConsultantEmail, US_STATES } from '@/lib/creditConstants';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'motion/react';

const formatPhoneNumber = (value: string) => {
  if (!value) return value;
  const phoneNumber = value.replace(/[^\d]/g, '');
  const phoneNumberLength = phoneNumber.length;
  if (phoneNumberLength < 4) return phoneNumber;
  if (phoneNumberLength < 7) {
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
  }
  return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
};

const businessSchema = z.object({
  businessName: z.string().min(1, 'Business name is required').max(100),
  taxIdNumber: z.string().min(9, 'Tax ID must be exactly 9 digits').max(20).refine((val) => {
    const digitsOnly = val.replace(/\D/g, '');
    if (digitsOnly.length !== 9) return false;
    
    // Reject obviously fake patterns
    if (/^(\d)\1+$/.test(digitsOnly)) return false;
    
    const testPatterns = [
      '123456789', '987654321', '123123123',
      '111111111', '222222222', '333333333', '444444444',
      '555555555', '666666666', '777777777', '888888888', '999999999'
    ];
    
    return !testPatterns.includes(digitsOnly);
  }, 'Please enter a valid 9-digit Tax ID Number'),
  businessType: z.string().min(1, 'Business type is required').max(100),
  businessStreet: z.string().min(1, 'Street is required').max(200),
  businessCity: z.string().min(1, 'City is required').max(100),
  businessState: z.string().min(1, 'State is required').max(50),
  businessZip: z.string().min(5, 'ZIP is required').max(20),
  emailAddress: z.string().email('Valid email is required').max(255),
  businessPhone: z.string().trim().refine((value) => {
    if (!value) return false;
    let phoneNumber = parsePhoneNumberFromString(value, 'US');
    if (!phoneNumber?.isValid()) {
      phoneNumber = parsePhoneNumberFromString(value);
    }
    return phoneNumber?.isValid() ?? false;
  }, 'Please enter a valid phone number'),
  grossAnnualIncome: z.string().min(1, 'Gross annual income is required').max(50),
  yearOfEstablishment: z.string().min(4, 'Year of establishment is required').max(10),

  guarantorOwnOrRent: z.enum(['Own', 'Rent'], { required_error: 'Please select Own or Rent' }),

  bankName: z.string().min(1, 'Bank name is required').max(100),
  bankPhone: z.string().trim().refine((value) => {
    if (!value) return false;
    let phoneNumber = parsePhoneNumberFromString(value, 'US');
    if (!phoneNumber?.isValid()) {
      phoneNumber = parsePhoneNumberFromString(value);
    }
    return phoneNumber?.isValid() ?? false;
  }, 'Please enter a valid phone number'),
  branchAddress: z.string().min(1, 'Branch address is required').max(200),

  consultant: z.string().optional(),
  legalAgree: z.boolean().optional(),
  signature: z.string().optional(),
  signatureDate: z.string().max(20).optional(),
});

type BusinessFormData = z.infer<typeof businessSchema>;

const STEPS = [
  { id: 1, label: 'Business Info', icon: Building },
  { id: 2, label: 'Guarantor', icon: User },
  { id: 3, label: 'Bank Info', icon: Landmark },
  // { id: 4, label: 'Uploads', icon: Upload },
  // { id: 5, label: 'Legal', icon: Shield },
] as const;

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

export function BusinessCreditApplicationForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [file1, setFile1] = useState<File | null>(null);
  const [file2, setFile2] = useState<File | null>(null);
  const formTopRef = useRef<HTMLDivElement | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    trigger,
    formState: { errors, touchedFields },
    reset,
  } = useForm<BusinessFormData>({
    resolver: zodResolver(businessSchema),
    defaultValues: {
      legalAgree: false,
    },
  });

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      const cardElement = document.getElementById('credit-application-card');
      if (cardElement) {
        cardElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
      formTopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);

    return () => window.clearTimeout(timeoutId);
  }, [currentStep]);

  useEffect(() => {
    if (currentStep === 5) {
      setValue('signatureDate', new Date().toISOString().slice(0, 10));
    }
  }, [currentStep, setValue]);

  const isFieldValid = (fieldName: keyof BusinessFormData): boolean => {
    const fieldValue = watch(fieldName);
    const fieldError = errors[fieldName];
    const isTouched = touchedFields[fieldName];
    if (fieldError) return false;
    if (isTouched && fieldValue !== undefined && fieldValue !== null && fieldValue !== '') {
      return true;
    }
    return false;
  };

  const onSubmit = useCallback(
    async (data: BusinessFormData) => {
      setIsSubmitting(true);
      setSubmitError(null);
      try {
        const document1Base64 = file1 ? await fileToBase64(file1) : undefined;
        const document2Base64 = file2 ? await fileToBase64(file2) : undefined;

        const payload = {
          VehicleOrService: 'Business Credit Application',
          BusinessName: data.businessName,
          TaxIDNumber: data.taxIdNumber,
          BusinessType: data.businessType,
          BusinessAddress: `${data.businessStreet}, ${data.businessCity}, ${data.businessState} ${data.businessZip}`,
          EmailAddress: data.emailAddress,
          BusinessPhone: data.businessPhone,
          GrossAnnualIncome: data.grossAnnualIncome,
          YearOfEstablishment: data.yearOfEstablishment,
          PersonalGuarantorOwnOrRent: data.guarantorOwnOrRent,
          BankName: data.bankName,
          BankPhone: data.bankPhone,
          BankBranchAddress: data.branchAddress,
          Consultant: data.consultant,
          ConsultantEmail: getConsultantEmail(data.consultant),
          Signature: data.signature,
          SignatureDate: new Date().toISOString().slice(0, 10),
          LegalAgreed: data.legalAgree,
          ...(file1 && document1Base64 && {
            Document1FileName: file1.name,
            Document1Base64: document1Base64,
          }),
          ...(file2 && document2Base64 && {
            Document2FileName: file2.name,
            Document2Base64: document2Base64,
          }),
        };

        const res = await fetch(WEBHOOK_URL_CREDIT_APPLICATION, {
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
    let fieldsToValidate: (keyof BusinessFormData)[] = [];
    if (currentStep === 1) {
      fieldsToValidate = ['businessName', 'taxIdNumber', 'businessType', 'businessStreet', 'businessCity', 'businessState', 'businessZip', 'emailAddress', 'businessPhone', 'grossAnnualIncome', 'yearOfEstablishment'];
    } else if (currentStep === 2) {
      fieldsToValidate = ['guarantorOwnOrRent'];
    } else if (currentStep === 3) {
      fieldsToValidate = ['bankName', 'bankPhone', 'branchAddress'];
    } else if (currentStep === 5) {
      fieldsToValidate = ['consultant', 'legalAgree', 'signature'];
    }
    
    const ok = fieldsToValidate.length === 0 || (await trigger(fieldsToValidate));
    
    if (!ok) {
      setTimeout(() => {
        const firstError = document.querySelector('.border-destructive');
        if (firstError) {
          firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
          (firstError as HTMLElement).focus();
        }
      }, 100);
      return;
    }
    
    if (ok && currentStep < 5) {
      setDirection('forward');
      setCurrentStep((s) => s + 1);
    }
  };

  const goBack = () => {
    setDirection('backward');
    setCurrentStep((s) => s - 1);
  };

  const goToStep = async (stepId: number) => {
    if (stepId === currentStep) return;
    
    if (stepId > currentStep) {
      let fieldsToValidate: (keyof BusinessFormData)[] = [];
      if (currentStep === 1) {
        fieldsToValidate = ['businessName', 'taxIdNumber', 'businessType', 'businessStreet', 'businessCity', 'businessState', 'businessZip', 'emailAddress', 'businessPhone', 'grossAnnualIncome', 'yearOfEstablishment'];
      } else if (currentStep === 2) {
        fieldsToValidate = ['guarantorOwnOrRent'];
      } else if (currentStep === 3) {
        fieldsToValidate = ['bankName', 'bankPhone', 'branchAddress'];
      } else if (currentStep === 5) {
        fieldsToValidate = ['consultant', 'legalAgree', 'signature'];
      }
      
      if (fieldsToValidate.length > 0) {
        const isValid = await trigger(fieldsToValidate);
        if (!isValid) {
          setTimeout(() => {
            const firstError = document.querySelector('.border-destructive');
            if (firstError) {
              firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
              (firstError as HTMLElement).focus();
            }
          }, 100);
          return;
        }
      }
    }
    
    setDirection(stepId < currentStep ? 'backward' : 'forward');
    setCurrentStep(stepId);
  };

  if (isSuccess) {
    return (
      <FormSuccessMessage
        title="Application received!"
        subtitle="Our finance team will review your business information and contact you."
        timing="Within 1-2 business days"
        showQuickQuestionsCta={false}
      />
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div ref={formTopRef} />
      
      {/* Step Indicator */}
      <nav aria-label="Application steps" className="flex flex-col gap-4 mb-6">
        <div className="flex items-center justify-center gap-0 md:gap-2">
          {STEPS.map((step, index) => {
            const Icon = step.icon;
            const isCompleted = currentStep > step.id;
            const isCurrent = currentStep === step.id;
            
            return (
              <div key={step.id} className="flex items-center ">
                <Button
                  asChild
                  onClick={() => goToStep(step.id)}
                  className="p-0 h-auto bg-transparent hover:bg-transparent border-none shadow-none ring-0 focus-visible:ring-0"
                >
                  <div
                    className={cn(
                      "flex flex-col items-center gap-2 transition-all duration-300 cursor-pointer group",
                      !isCurrent && "hover:scale-105"
                    )}
                    role="button"
                    aria-label={`Go to step ${step.id}: ${step.label}`}
                  >
                    <div
                      className={cn(
                        'flex h-8 w-8 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-full text-xs font-semibold transition-all duration-300',
                        isCurrent
                          ? 'bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)] scale-110'
                          : isCompleted
                            ? 'bg-blue-100 text-blue-600'
                            : 'bg-muted text-muted-foreground dark:bg-slate-800'
                      )}
                    >
                      <Icon className={cn(
                        "w-2 h-2 sm:w-6 sm:h-6 transition-all",
                        isCurrent ? "scale-110" : ""
                      )} />
                    </div>
                    <span className={cn(
                      "text-[12px] md:text-lg font-medium transition-colors hidden md:block",
                      isCurrent ? "text-blue-600 font-bold" : "text-muted-foreground"
                    )}>
                      {step.label}
                    </span>
                  </div>
                </Button>
                {index < STEPS.length - 1 && (
                  <div className={cn(
                    "mx-1 md:mx-2 h-0.5 w-4 md:w-8 rounded transition-all duration-300",
                    isCompleted
                      ? "bg-accent/60"
                      : "bg-border dark:bg-white/20"
                  )} aria-hidden />
                )}
              </div>
            );
          })}
        </div>
      </nav>

      <AnimatePresence mode="wait" custom={direction}>
        {currentStep === 1 && (
          <motion.div
            key="security-notice"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="flex items-start gap-3 p-4 rounded-xl bg-accent/10 dark:bg-accent/5 border border-accent/20 dark:border-accent/10 mb-6"
          >
            <Shield className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
            <div className="text-sm text-foreground dark:text-white/90">
              <strong className="text-foreground dark:text-white">Your information is secure.</strong> We use industry standard encryption.
            </div>
          </motion.div>
        )}

        {/* Step 1: Business Information */}
        {currentStep === 1 && (
          <motion.div
            key="step-1"
            custom={direction}
            initial={{ opacity: 0, x: direction === 'forward' ? 50 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction === 'forward' ? -50 : 50 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-lg font-semibold text-foreground dark:text-white mb-2 flex items-center gap-2">
                <Building className="w-5 h-5 text-accent" />
                Business Information
              </h3>
              <p className="text-sm text-muted-foreground dark:text-white/70">Let's start with your business details</p>
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <Label htmlFor="businessName" className="text-sm font-medium flex items-center gap-1.5">
                  Business Name <span className="text-destructive">*</span>
                  {isFieldValid('businessName') && <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />}
                </Label>
                <div className="relative">
                  <Input
                    id="businessName"
                    {...register('businessName', {
                      onChange: () => trigger('businessName'),
                      onBlur: () => trigger('businessName'),
                    })}
                    placeholder="Idea Nuova Inc"
                    className={cn(errors.businessName ? 'border-destructive pr-10' : isFieldValid('businessName') ? 'border-green-500 pr-10' : '')}
                  />
                  {isFieldValid('businessName') && !errors.businessName && <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500 pointer-events-none" />}
                </div>
                {errors.businessName && <p className="text-xs text-destructive mt-1 flex items-center gap-1"><X className="w-3 h-3" /> {errors.businessName.message}</p>}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="taxIdNumber" className="text-sm font-medium flex items-center gap-1.5">
                  Tax ID Number <span className="text-destructive">*</span>
                  {isFieldValid('taxIdNumber') && <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />}
                </Label>
                <div className="relative">
                  <Input
                    id="taxIdNumber"
                    type="text"
                    maxLength={9}
                    inputMode="numeric"
                    pattern="[0-9]*"
                    {...register('taxIdNumber', {
                      onChange: (e) => {
                        e.target.value = e.target.value.replace(/[^0-9]/g, '');
                        trigger('taxIdNumber');
                      },
                      onBlur: () => trigger('taxIdNumber'),
                    })}
                    placeholder="133418913"
                    className={cn(errors.taxIdNumber ? 'border-destructive pr-10' : isFieldValid('taxIdNumber') ? 'border-green-500 pr-10' : '')}
                  />
                  {isFieldValid('taxIdNumber') && !errors.taxIdNumber && <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500 pointer-events-none" />}
                </div>
                {errors.taxIdNumber && <p className="text-xs text-destructive mt-1 flex items-center gap-1"><X className="w-3 h-3" /> {errors.taxIdNumber.message}</p>}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="businessType" className="text-sm font-medium flex items-center gap-1.5">
                  Business Type <span className="text-destructive">*</span>
                  {isFieldValid('businessType') && <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />}
                </Label>
                <div className="relative">
                  <Input
                    id="businessType"
                    {...register('businessType', {
                      onChange: () => trigger('businessType'),
                      onBlur: () => trigger('businessType'),
                    })}
                    placeholder="Limited Liability Corporation"
                    className={cn(errors.businessType ? 'border-destructive pr-10' : isFieldValid('businessType') ? 'border-green-500 pr-10' : '')}
                  />
                  {isFieldValid('businessType') && !errors.businessType && <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500 pointer-events-none" />}
                </div>
                {errors.businessType && <p className="text-xs text-destructive mt-1 flex items-center gap-1"><X className="w-3 h-3" /> {errors.businessType.message}</p>}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="emailAddress" className="text-sm font-medium flex items-center gap-1.5">
                  Email Address <span className="text-destructive">*</span>
                  {isFieldValid('emailAddress') && <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />}
                </Label>
                <div className="relative">
                  <Input
                    id="emailAddress"
                    type="email"
                    {...register('emailAddress', {
                      onChange: () => trigger('emailAddress'),
                      onBlur: () => trigger('emailAddress'),
                    })}
                    placeholder="isaac@ideanuova.com"
                    className={cn(errors.emailAddress ? 'border-destructive pr-10' : isFieldValid('emailAddress') ? 'border-green-500 pr-10' : '')}
                  />
                  {isFieldValid('emailAddress') && !errors.emailAddress && <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500 pointer-events-none" />}
                </div>
                {errors.emailAddress && <p className="text-xs text-destructive mt-1 flex items-center gap-1"><X className="w-3 h-3" /> {errors.emailAddress.message}</p>}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="businessPhone" className="text-sm font-medium flex items-center gap-1.5">
                  Business Phone <span className="text-destructive">*</span>
                  {isFieldValid('businessPhone') && <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />}
                </Label>
                <div className="relative">
                  <Input
                    id="businessPhone"
                    type="tel"
                    {...register('businessPhone', {
                      onChange: (e) => {
                        const formatted = formatPhoneNumber(e.target.value);
                        e.target.value = formatted;
                        trigger('businessPhone');
                      },
                      onBlur: () => trigger('businessPhone'),
                    })}
                    placeholder="(212) 643-0680"
                    className={cn(errors.businessPhone ? 'border-destructive pr-10' : isFieldValid('businessPhone') ? 'border-green-500 pr-10' : '')}
                  />
                  {isFieldValid('businessPhone') && !errors.businessPhone && <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500 pointer-events-none" />}
                </div>
                {errors.businessPhone && <p className="text-xs text-destructive mt-1 flex items-center gap-1"><X className="w-3 h-3" /> {errors.businessPhone.message}</p>}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="grossAnnualIncome" className="text-sm font-medium flex items-center gap-1.5">
                  Gross Annual Income <span className="text-destructive">*</span>
                  {isFieldValid('grossAnnualIncome') && <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />}
                </Label>
                <div className="relative">
                  <Input
                    id="grossAnnualIncome"
                    {...register('grossAnnualIncome', {
                      onChange: () => trigger('grossAnnualIncome'),
                      onBlur: () => trigger('grossAnnualIncome'),
                    })}
                    placeholder="210,000,000"
                    className={cn(errors.grossAnnualIncome ? 'border-destructive pr-10' : isFieldValid('grossAnnualIncome') ? 'border-green-500 pr-10' : '')}
                  />
                  {isFieldValid('grossAnnualIncome') && !errors.grossAnnualIncome && <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500 pointer-events-none" />}
                </div>
                {errors.grossAnnualIncome && <p className="text-xs text-destructive mt-1 flex items-center gap-1"><X className="w-3 h-3" /> {errors.grossAnnualIncome.message}</p>}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="yearOfEstablishment" className="text-sm font-medium flex items-center gap-1.5">
                  Year of Establishment <span className="text-destructive">*</span>
                  {isFieldValid('yearOfEstablishment') && <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />}
                </Label>
                <div className="relative">
                  <Input
                    id="yearOfEstablishment"
                    {...register('yearOfEstablishment', {
                      onChange: () => trigger('yearOfEstablishment'),
                      onBlur: () => trigger('yearOfEstablishment'),
                    })}
                    placeholder="1987"
                    className={cn(errors.yearOfEstablishment ? 'border-destructive pr-10' : isFieldValid('yearOfEstablishment') ? 'border-green-500 pr-10' : '')}
                  />
                  {isFieldValid('yearOfEstablishment') && !errors.yearOfEstablishment && <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500 pointer-events-none" />}
                </div>
                {errors.yearOfEstablishment && <p className="text-xs text-destructive mt-1 flex items-center gap-1"><X className="w-3 h-3" /> {errors.yearOfEstablishment.message}</p>}
              </div>

              <div className="col-span-1 md:col-span-2 grid md:grid-cols-4 gap-5 pt-4">
                <div className="space-y-1.5 col-span-1 md:col-span-2">
                  <Label htmlFor="businessStreet" className="text-sm font-medium flex items-center gap-1.5">
                    Street Address <span className="text-destructive">*</span>
                    {isFieldValid('businessStreet') && <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />}
                  </Label>
                  <div className="relative">
                    <Input
                      id="businessStreet"
                      {...register('businessStreet', {
                        onChange: () => trigger('businessStreet'),
                        onBlur: () => trigger('businessStreet'),
                      })}
                      placeholder="302 Fifth Avenue"
                      className={cn(errors.businessStreet ? 'border-destructive pr-10' : isFieldValid('businessStreet') ? 'border-green-500 pr-10' : '')}
                    />
                    {isFieldValid('businessStreet') && !errors.businessStreet && <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500 pointer-events-none" />}
                  </div>
                  {errors.businessStreet && <p className="text-xs text-destructive mt-1 flex items-center gap-1"><X className="w-3 h-3" /> {errors.businessStreet.message}</p>}
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="businessCity" className="text-sm font-medium flex items-center gap-1.5">
                    City <span className="text-destructive">*</span>
                    {isFieldValid('businessCity') && <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />}
                  </Label>
                  <div className="relative">
                    <Input
                      id="businessCity"
                      {...register('businessCity', {
                        onChange: () => trigger('businessCity'),
                        onBlur: () => trigger('businessCity'),
                      })}
                      placeholder="New York"
                      className={cn(errors.businessCity ? 'border-destructive pr-10' : isFieldValid('businessCity') ? 'border-green-500 pr-10' : '')}
                    />
                    {isFieldValid('businessCity') && !errors.businessCity && <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500 pointer-events-none" />}
                  </div>
                  {errors.businessCity && <p className="text-xs text-destructive mt-1 flex items-center gap-1"><X className="w-3 h-3" /> {errors.businessCity.message}</p>}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label htmlFor="businessState" className="text-sm font-medium flex items-center gap-1.5">
                      State <span className="text-destructive">*</span>
                    </Label>
                    <Select value={watch('businessState') ?? ''} onValueChange={async (v) => {
                      setValue('businessState', v, { shouldValidate: true, shouldTouch: true });
                      await trigger('businessState');
                    }}>
                      <SelectTrigger className={cn(errors.businessState ? 'border-destructive' : isFieldValid('businessState') ? 'border-green-500' : '')}>
                        <SelectValue placeholder="State" />
                      </SelectTrigger>
                      <SelectContent>
                        {US_STATES.map((s) => (
                          <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.businessState && <p className="text-xs text-destructive mt-1 flex items-center gap-1"><X className="w-3 h-3" /> {errors.businessState.message}</p>}
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="businessZip" className="text-sm font-medium flex items-center gap-1.5">
                      ZIP <span className="text-destructive">*</span>
                      {isFieldValid('businessZip') && <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />}
                    </Label>
                    <Input
                      id="businessZip"
                      type="text"
                      maxLength={5}
                      inputMode="numeric"
                      pattern="[0-9]*"
                      {...register('businessZip', {
                        onChange: (e) => {
                          e.target.value = e.target.value.replace(/[^0-9]/g, '');
                          trigger('businessZip');
                        },
                        onBlur: () => trigger('businessZip'),
                      })}
                      placeholder="10001"
                      className={cn(errors.businessZip ? 'border-destructive' : isFieldValid('businessZip') ? 'border-green-500' : '')}
                    />
                    {errors.businessZip && <p className="text-xs text-destructive mt-1 flex items-center gap-1"><X className="w-3 h-3" /> {errors.businessZip.message}</p>}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 2: Guarantor */}
        {currentStep === 2 && (
          <motion.div
            key="step-2"
            custom={direction}
            initial={{ opacity: 0, x: direction === 'forward' ? 50 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction === 'forward' ? -50 : 50 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-lg font-semibold text-foreground dark:text-white mb-2 flex items-center gap-2">
                <User className="w-5 h-5 text-accent" />
                Personal Guarantor Information
              </h3>
              <p className="text-sm text-muted-foreground dark:text-white/70">Information regarding the guarantor</p>
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <Label htmlFor="guarantorOwnOrRent" className="text-sm font-medium flex items-center gap-1.5">
                  Own or Rent <span className="text-destructive">*</span>
                </Label>
                <Select
                  value={watch('guarantorOwnOrRent') ?? ''}
                  onValueChange={async (v) => {
                    setValue('guarantorOwnOrRent', v as 'Own' | 'Rent', { shouldValidate: true, shouldTouch: true });
                    await trigger('guarantorOwnOrRent');
                  }}
                >
                  <SelectTrigger className={cn(errors.guarantorOwnOrRent ? 'border-destructive' : isFieldValid('guarantorOwnOrRent') ? 'border-green-500' : '')}>
                    <SelectValue placeholder="Select Own or Rent" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Own">Own</SelectItem>
                    <SelectItem value="Rent">Rent</SelectItem>
                  </SelectContent>
                </Select>
                {errors.guarantorOwnOrRent && <p className="text-xs text-destructive mt-1 flex items-center gap-1"><X className="w-3 h-3" /> {errors.guarantorOwnOrRent.message}</p>}
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 3: Bank Information */}
        {currentStep === 3 && (
          <motion.div
            key="step-3"
            custom={direction}
            initial={{ opacity: 0, x: direction === 'forward' ? 50 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction === 'forward' ? -50 : 50 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-lg font-semibold text-foreground dark:text-white mb-2 flex items-center gap-2">
                <Landmark className="w-5 h-5 text-accent" />
                Bank Information
              </h3>
              <p className="text-sm text-muted-foreground dark:text-white/70">Details about your associated bank</p>
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <Label htmlFor="bankName" className="text-sm font-medium flex items-center gap-1.5">
                  Bank Name <span className="text-destructive">*</span>
                  {isFieldValid('bankName') && <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />}
                </Label>
                <div className="relative">
                  <Input
                    id="bankName"
                    {...register('bankName', {
                      onChange: () => trigger('bankName'),
                      onBlur: () => trigger('bankName'),
                    })}
                    placeholder="BHI USA"
                    className={cn(errors.bankName ? 'border-destructive pr-10' : isFieldValid('bankName') ? 'border-green-500 pr-10' : '')}
                  />
                  {isFieldValid('bankName') && !errors.bankName && <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500 pointer-events-none" />}
                </div>
                {errors.bankName && <p className="text-xs text-destructive mt-1 flex items-center gap-1"><X className="w-3 h-3" /> {errors.bankName.message}</p>}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="bankPhone" className="text-sm font-medium flex items-center gap-1.5">
                  Bank Phone <span className="text-destructive">*</span>
                  {isFieldValid('bankPhone') && <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />}
                </Label>
                <div className="relative">
                  <Input
                    id="bankPhone"
                    type="tel"
                    {...register('bankPhone', {
                      onChange: (e) => {
                        const formatted = formatPhoneNumber(e.target.value);
                        e.target.value = formatted;
                        trigger('bankPhone');
                      },
                      onBlur: () => trigger('bankPhone'),
                    })}
                    placeholder="(212) 782-2154"
                    className={cn(errors.bankPhone ? 'border-destructive pr-10' : isFieldValid('bankPhone') ? 'border-green-500 pr-10' : '')}
                  />
                  {isFieldValid('bankPhone') && !errors.bankPhone && <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500 pointer-events-none" />}
                </div>
                {errors.bankPhone && <p className="text-xs text-destructive mt-1 flex items-center gap-1"><X className="w-3 h-3" /> {errors.bankPhone.message}</p>}
              </div>

              <div className="space-y-1.5 md:col-span-2">
                <Label htmlFor="branchAddress" className="text-sm font-medium flex items-center gap-1.5">
                  Branch Address <span className="text-destructive">*</span>
                  {isFieldValid('branchAddress') && <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />}
                </Label>
                <div className="relative">
                  <Input
                    id="branchAddress"
                    {...register('branchAddress', {
                      onChange: () => trigger('branchAddress'),
                      onBlur: () => trigger('branchAddress'),
                    })}
                    placeholder="1177 Avenue of the Americas"
                    className={cn(errors.branchAddress ? 'border-destructive pr-10' : isFieldValid('branchAddress') ? 'border-green-500 pr-10' : '')}
                  />
                  {isFieldValid('branchAddress') && !errors.branchAddress && <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500 pointer-events-none" />}
                </div>
                {errors.branchAddress && <p className="text-xs text-destructive mt-1 flex items-center gap-1"><X className="w-3 h-3" /> {errors.branchAddress.message}</p>}
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 4: Uploads */}
        {/* {currentStep === 4 && (
          <motion.div
            key="step-4"
            custom={direction}
            initial={{ opacity: 0, x: direction === 'forward' ? 50 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction === 'forward' ? -50 : 50 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-lg font-semibold text-foreground dark:text-white mb-2 flex items-center gap-2">
                <Upload className="w-5 h-5 text-accent" />
                Supporting Documents
              </h3>
              <p className="text-sm text-muted-foreground dark:text-white/70">Upload any supporting documents (optional)</p>
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label htmlFor="doc1" className="text-sm font-medium flex items-center gap-2">
                  <Upload className="w-4 h-4 text-muted-foreground" />
                  Document 1
                </Label>
                <div className="relative">
                  <input
                    id="doc1"
                    type="file"
                    accept=".pdf,image/*"
                    className="hidden"
                    onChange={(e) => setFile1(e.target.files?.[0] ?? null)}
                  />
                  <label
                    htmlFor="doc1"
                    className={cn(
                      "flex items-center justify-center gap-2 h-11 w-full rounded-lg border-2 border-dashed transition-all cursor-pointer px-4",
                      file1
                        ? "border-accent bg-accent/10 dark:bg-accent/5"
                        : "border-border dark:border-white/20 bg-muted/50 dark:bg-white/5 hover:border-accent/50 hover:bg-accent/5"
                    )}
                  >
                    {file1 ? (
                      <>
                        <FileText className="w-4 h-4 text-accent flex-shrink-0" />
                        <span className="text-sm font-medium text-foreground dark:text-white truncate flex-1 text-left">{file1.name}</span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setFile1(null);
                            const input = document.getElementById('doc1') as HTMLInputElement;
                            if (input) input.value = '';
                          }}
                          className="ml-2 p-1 hover:bg-destructive/10 rounded transition-colors flex-shrink-0"
                        >
                          <X className="w-4 h-4 text-destructive" />
                        </button>
                      </>
                    ) : (
                      <>
                        <Upload className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm font-medium text-muted-foreground dark:text-white/70">Choose File</span>
                      </>
                    )}
                  </label>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="doc2" className="text-sm font-medium flex items-center gap-2">
                  <Upload className="w-4 h-4 text-muted-foreground" />
                  Document 2
                </Label>
                <div className="relative">
                  <input
                    id="doc2"
                    type="file"
                    accept=".pdf,image/*"
                    className="hidden"
                    onChange={(e) => setFile2(e.target.files?.[0] ?? null)}
                  />
                  <label
                    htmlFor="doc2"
                    className={cn(
                      "flex items-center justify-center gap-2 h-11 w-full rounded-lg border-2 border-dashed transition-all cursor-pointer px-4",
                      file2
                        ? "border-accent bg-accent/10 dark:bg-accent/5"
                        : "border-border dark:border-white/20 bg-muted/50 dark:bg-white/5 hover:border-accent/50 hover:bg-accent/5"
                    )}
                  >
                    {file2 ? (
                      <>
                        <FileText className="w-4 h-4 text-accent flex-shrink-0" />
                        <span className="text-sm font-medium text-foreground dark:text-white truncate flex-1 text-left">{file2.name}</span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setFile2(null);
                            const input = document.getElementById('doc2') as HTMLInputElement;
                            if (input) input.value = '';
                          }}
                          className="ml-2 p-1 hover:bg-destructive/10 rounded transition-colors flex-shrink-0"
                        >
                          <X className="w-4 h-4 text-destructive" />
                        </button>
                      </>
                    ) : (
                      <>
                        <Upload className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm font-medium text-muted-foreground dark:text-white/70">Choose File</span>
                      </>
                    )}
                  </label>
                </div>
              </div>
            </div>
            <div className="p-4 rounded-xl bg-accent/10 dark:bg-accent/5 border border-accent/20 dark:border-accent/10">
              <p className="text-xs text-muted-foreground dark:text-white/80">
                <strong className="text-foreground dark:text-white">Tip:</strong> Accepted formats include PDF files and images (JPG, PNG). Maximum file size is typically 2MB per file.
              </p>
            </div>
          </motion.div>
        )} */}

        {/* Step 5: Legal */}
        {/* {currentStep === 5 && (
          <motion.div
            key="step-5"
            custom={direction}
            initial={{ opacity: 0, x: direction === 'forward' ? 50 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction === 'forward' ? -50 : 50 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-lg font-semibold text-foreground dark:text-white mb-2 flex items-center gap-2">
                <Shield className="w-5 h-5 text-accent" />
                Final Review & Authorization
              </h3>
              <p className="text-sm text-muted-foreground dark:text-white/70">Review your information and complete the authorization</p>
            </div>
            
            <div className="space-y-1.5">
              <Label className="text-sm font-medium flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-muted-foreground" />
                Preferred Consultant <span className="text-destructive">*</span>
                {isFieldValid('consultant') && <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />}
              </Label>
              <Select 
                value={watch('consultant') ?? ''} 
                onValueChange={async (v) => {
                  setValue('consultant', v, { shouldValidate: true, shouldTouch: true });
                  await trigger('consultant');
                }}
              >
                <SelectTrigger className={cn(errors.consultant ? 'border-destructive' : isFieldValid('consultant') ? 'border-green-500' : '')}>
                  <SelectValue placeholder="Select your preferred consultant" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-black text-foreground dark:text-white boder border-border dark:border-white/10">
                  {CONSULTANT_OPTIONS.filter((o) => o.value).map((o) => (
                    <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.consultant && <p className="text-xs text-destructive mt-1">{errors.consultant.message}</p>}
            </div>

            <div className="rounded-xl border border-border dark:border-white/10 bg-muted/50 dark:bg-white/[0.02] p-5 text-sm text-muted-foreground dark:text-white/85 leading-relaxed">
              <p className="font-semibold text-foreground dark:text-white mb-2">Authorization & Agreement</p>
              <p>
                By submitting this form, you authorize Capital Motor Cars to obtain and use consumer reports and other information in connection with your application. You agree that this is a preliminary application and does not constitute a commitment to extend credit. A full credit check may be performed upon your consent. You certify that the information provided is true and complete.
              </p>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-xl border-2 border-border dark:border-white/10 bg-muted/30 dark:bg-white/[0.02]">
              <Checkbox
                id="legalAgree"
                checked={watch('legalAgree')}
                onCheckedChange={(checked) => setValue('legalAgree', checked === true)}
                className="border-border dark:border-white/30 data-[state=checked]:bg-accent data-[state=checked]:border-accent mt-0.5"
              />
              <div className="flex-1">
                <Label htmlFor="legalAgree" className="text-sm cursor-pointer flex items-center gap-1.5">
                  I have read and agree to the authorization above <span className="text-destructive">*</span>
                </Label>
              </div>
            </div>
            {errors.legalAgree && <p className="text-xs text-destructive">{errors.legalAgree.message}</p>}

            <div className="space-y-1.5">
              <Label htmlFor="signature" className="text-sm font-medium flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-muted-foreground" />
                Electronic Signature <span className="text-destructive">*</span>
                {isFieldValid('signature') && <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />}
              </Label>
              <div className="relative">
                <Input 
                  id="signature" 
                  {...register('signature', {
                    onChange: () => trigger('signature'),
                    onBlur: () => trigger('signature'),
                  })} 
                  placeholder="Type your full legal name as it appears on your ID" 
                  className={cn(errors.signature ? 'border-destructive pr-10' : isFieldValid('signature') ? 'border-green-500 pr-10' : '')} 
                />
                {isFieldValid('signature') && !errors.signature && (
                  <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500 pointer-events-none" />
                )}
              </div>
              {errors.signature && <p className="text-xs text-destructive mt-1 flex items-center gap-1"><X className="w-3 h-3" /> {errors.signature.message}</p>}
            </div>

            <div className="space-y-1.5 hidden">
              <Label htmlFor="signatureDate" className="text-sm font-medium flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
                Date
              </Label>
              <Input id="signatureDate" type="date" {...register('signatureDate')} />
            </div>
          </motion.div>
        )} */}
      </AnimatePresence>

      {submitError && (
        <p className="text-sm text-destructive" role="alert">{submitError}</p>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between gap-4 pt-4 border-t border-border dark:border-white/10 mt-8">
        <Button
          type="button"
          variant="outline"
          className="min-h-[44px] border-border dark:border-white/25 bg-muted dark:bg-white/10 text-foreground dark:text-white hover:bg-muted/80 dark:hover:bg-white/20"
          onClick={goBack}
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
              'Apply for Business Credit'
            )}
          </Button>
        )}
      </div>
    </form>
  );
}
