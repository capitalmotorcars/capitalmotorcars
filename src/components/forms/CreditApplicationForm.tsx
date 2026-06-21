import { useState, useCallback, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Loader2,
  Shield,
  ChevronLeft,
  ChevronRight,
  UserPlus,
  Upload,
  User,
  Mail,
  Phone,
  MapPin,
  Home,
  Briefcase,
  DollarSign,
  Calendar,
  Lock,
  CheckCircle2,
  X,
  FileText,
  Clock,
  Building,
} from "lucide-react";
import { FormSuccessMessage } from "./FormSuccessMessage";
import {
  getSubmitErrorMessage,
  getSubmitErrorFromException,
} from "./getSubmitErrorMessage";
import { WEBHOOK_CREDIT_APPLICATION_PATH } from "@/lib/webhook";
import { Link } from "react-router-dom";
import {
  US_STATES,
  HOUSING_OPTIONS,
  CONSULTANT_OPTIONS,
  getConsultantEmail,
} from "@/lib/creditConstants";
import { parsePhoneNumberFromString } from "libphonenumber-js";

// Phone formatting function
const formatPhoneNumber = (value: string) => {
  if (!value) return value;
  const phoneNumber = value.replace(/[^\d]/g, "");
  const phoneNumberLength = phoneNumber.length;
  if (phoneNumberLength < 4) return phoneNumber;
  if (phoneNumberLength < 7) {
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
  }
  return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(
    3,
    6,
  )}-${phoneNumber.slice(6, 10)}`;
};

// DOB formatting function
const formatDOB = (value: string) => {
  if (!value) return value;
  const digits = value.replace(/[^\d]/g, "");
  if (digits.length <= 2) return digits;
  if (digits.length <= 4) return `${digits.slice(0, 2)}-${digits.slice(2)}`;
  return `${digits.slice(0, 2)}-${digits.slice(2, 4)}-${digits.slice(4, 8)}`;
};

// Housing payment options
const HOUSING_PAYMENT_OPTIONS = [
  { value: "rent", label: "Rent" },
  { value: "mortgage", label: "Mortgage" },
  { value: "own", label: "Own Outright" },
  { value: "family", label: "Live with Family" },
  { value: "other", label: "Other" },
];

import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "motion/react";

// Applicant address + info (Step 1)
const applicantInfoSchema = z.object({
  firstName: z.string().min(1, "First name is required").max(100),
  lastName: z.string().min(1, "Last name is required").max(100),
  ssn: z
    .string()
    .min(9, "SSN must be exactly 9 digits")
    .max(20)
    .refine((val) => {
      // Remove all non-digit characters
      const digitsOnly = val.replace(/\D/g, "");
      // Must be exactly 9 digits
      if (digitsOnly.length !== 9) return false;

      // Reject obviously fake patterns
      // All same digits (like 111111111, 222222222, etc.)
      if (/^(\d)\1+$/.test(digitsOnly)) return false;

      // Common test patterns
      const testPatterns = [
        "123456789",
        "987654321",
        "123123123",
        "111111111",
        "222222222",
        "333333333",
        "444444444",
        "555555555",
        "666666666",
        "777777777",
        "888888888",
        "999999999",
      ];

      return !testPatterns.includes(digitsOnly);
    }, "Please enter a valid 9-digit Social Security Number"),
  dob: z.string().min(1, "Date of birth is required").max(20),
  housing: z.string().min(1, "Housing status is required"),
  phone: z
    .string()
    .trim()
    .refine((value) => {
      if (!value) return false;
      let phoneNumber = parsePhoneNumberFromString(value, "US");
      if (!phoneNumber?.isValid()) {
        phoneNumber = parsePhoneNumberFromString(value);
      }
      return phoneNumber?.isValid() ?? false;
    }, "Please enter a valid phone number"),
  email: z.string().email("Valid email is required").max(255),
  street: z.string().min(1, "Street is required").max(200),
  city: z.string().min(1, "City is required").max(100),
  state: z.string().min(1, "State is required"),
  zip: z.string().min(5, "ZIP is required").max(10),
  yearsAtResidence: z.string().min(1, "Years at residence is required").max(10),
  monthlyPayment: z.string().min(1, "Monthly payment is required").max(20),
  housingPaymentType: z.enum(["rent", "mortgage", "own", "family", "other"], {
    required_error: "Payment type is required",
  }),
});

// Employment (Step 2)
const employmentSchema = z.object({
  employer: z.string().min(1, "Employer is required").max(200),
  employmentPhone: z
    .string()
    .trim()
    .refine((value) => {
      if (!value) return false;
      let phoneNumber = parsePhoneNumberFromString(value, "US");
      if (!phoneNumber?.isValid()) {
        phoneNumber = parsePhoneNumberFromString(value);
      }
      return phoneNumber?.isValid() ?? false;
    }, "Please enter a valid phone number"),
  employmentStreet: z.string().min(1, "Employment street is required").max(200),
  employmentCity: z.string().min(1, "Employment city is required").max(100),
  employmentState: z.string().min(1, "Employment state is required"),
  employmentZip: z.string().min(5, "Employment ZIP is required").max(10),
  yearsAtJob: z.string().min(1, "Years at job is required").max(10),
  position: z.string().min(1, "Position is required").max(200),
  grossAnnualIncome: z
    .string()
    .min(1, "Gross annual income is required")
    .max(30),
  otherAnnualIncome: z.string().max(30).optional(),
  organizationAffiliation: z.string().max(200).optional(),
});

// Co-applicant: same as applicant + employment when enabled
const coApplicantSchema = z.object({
  coApplicantEnabled: z.boolean(),
  coFirstName: z.string().max(100).optional(),
  coLastName: z.string().max(100).optional(),
  coSsn: z
    .string()
    .max(20)
    .optional()
    .refine((val) => {
      if (!val || val.trim() === "") return true; // Optional field
      const digitsOnly = val.replace(/\D/g, "");
      if (digitsOnly.length !== 9) return false;

      // Reject obviously fake patterns
      if (/^(\d)\1+$/.test(digitsOnly)) return false;

      const testPatterns = [
        "123456789",
        "987654321",
        "123123123",
        "111111111",
        "222222222",
        "333333333",
        "444444444",
        "555555555",
        "666666666",
        "777777777",
        "888888888",
        "999999999",
      ];

      return !testPatterns.includes(digitsOnly);
    }, "Please enter a valid 9-digit Social Security Number"),
  coDob: z.string().max(20).optional(),
  coHousing: z.string().optional(),
  coPhone: z
    .string()
    .trim()
    .refine((value) => {
      if (!value) return true; // Optional field
      let phoneNumber = parsePhoneNumberFromString(value, "US");
      if (!phoneNumber?.isValid()) {
        phoneNumber = parsePhoneNumberFromString(value);
      }
      return phoneNumber?.isValid() ?? false;
    }, "Please enter a valid phone number")
    .optional(),
  coEmail: z.string().max(255).optional(),
  coStreet: z.string().max(200).optional(),
  coCity: z.string().max(100).optional(),
  coState: z.string().optional(),
  coZip: z.string().max(10).optional(),
  coYearsAtResidence: z.string().max(10).optional(),
  coMonthlyPayment: z.string().max(20).optional(),
  coHousingPaymentType: z
    .enum(["rent", "mortgage", "own", "family", "other"])
    .optional(),
  coEmployer: z.string().max(200).optional(),
  coEmploymentPhone: z
    .string()
    .trim()
    .refine((value) => {
      if (!value) return true; // Optional field
      let phoneNumber = parsePhoneNumberFromString(value, "US");
      if (!phoneNumber?.isValid()) {
        phoneNumber = parsePhoneNumberFromString(value);
      }
      return phoneNumber?.isValid() ?? false;
    }, "Please enter a valid phone number")
    .optional(),
  coEmploymentStreet: z.string().max(200).optional(),
  coEmploymentCity: z.string().max(100).optional(),
  coEmploymentState: z.string().optional(),
  coEmploymentZip: z.string().max(10).optional(),
  coYearsAtJob: z.string().max(10).optional(),
  coPosition: z.string().max(200).optional(),
  coGrossAnnualIncome: z.string().max(30).optional(),
  coOtherAnnualIncome: z.string().max(30).optional(),
  coOrganizationAffiliation: z.string().max(200).optional(),
});

// Legal (Step 5)
const legalSchema = z.object({
  consultant: z.string().min(1, "Please select a consultant"),
  legalAgree: z
    .boolean()
    .refine((v) => v === true, "You must agree to the authorization."),
  signature: z
    .string()
    .min(2, "Full legal name signature is required")
    .max(100),
  signatureDate: z.string().max(20).optional(),
});

const creditSchema = applicantInfoSchema
  .merge(employmentSchema)
  .merge(coApplicantSchema)
  .merge(legalSchema)
  .superRefine((data, ctx) => {
    if (data.coApplicantEnabled) {
      if (!data.coEmploymentStreet?.trim()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Employment street is required",
          path: ["coEmploymentStreet"],
        });
      }
      if (!data.coEmploymentCity?.trim()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Employment city is required",
          path: ["coEmploymentCity"],
        });
      }
      if (!data.coEmploymentState?.trim()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Employment state is required",
          path: ["coEmploymentState"],
        });
      }
      if (
        !data.coEmploymentZip?.trim() ||
        data.coEmploymentZip.replace(/\D/g, "").length < 5
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Employment ZIP is required",
          path: ["coEmploymentZip"],
        });
      }
      if (!data.coEmploymentPhone?.trim()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Employment phone is required",
          path: ["coEmploymentPhone"],
        });
      }
    }
  });

type CreditFormData = z.infer<typeof creditSchema>;

const STEPS = [
  { id: 1, label: "Applicant Info", icon: User },
  { id: 2, label: "Employment", icon: Briefcase },
  { id: 3, label: "Co-Applicant", icon: UserPlus },
  { id: 4, label: "Uploads", icon: Upload },
  { id: 5, label: "Legal", icon: Shield },
] as const;

// Vercel serverless functions reject request bodies over ~4.5MB (HTTP 413).
// Base64 inflates bytes ~37% and two files share the budget, so cap raw bytes
// well under the limit. Keep per-file and combined budgets conservative.
const MAX_FILE_BYTES = 3 * 1024 * 1024; // 3 MB per file
const MAX_TOTAL_UPLOAD_BYTES = 3 * 1024 * 1024; // 3 MB combined
const formatMb = (bytes: number) => `${(bytes / (1024 * 1024)).toFixed(0)} MB`;

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = (reader.result as string).split(",")[1] ?? "";
      // Strip all whitespace (spaces, newlines) - pretty-printed Base64 breaks PDF/image decoding
      resolve(base64.replace(/\s/g, ""));
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/** Validation for co-applicant section – used when validating step 3. */
function isCoApplicantSectionValid(data: Partial<CreditFormData>): boolean {
  if (!data.coApplicantEnabled) return true;
  const email = data.coEmail?.trim() ?? "";
  const isValidEmail = !email || z.string().email().safeParse(email).success;
  return (
    (data.coFirstName?.trim()?.length ?? 0) > 0 &&
    (data.coLastName?.trim()?.length ?? 0) > 0 &&
    (data.coSsn?.replace(/\D/g, "").length ?? 0) === 9 &&
    (data.coDob?.trim()?.length ?? 0) > 0 &&
    (data.coHousing?.trim()?.length ?? 0) > 0 &&
    (data.coPhone?.trim()?.length ?? 0) >= 10 &&
    email.length > 0 &&
    isValidEmail &&
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

interface CreditApplicationFormProps {
  applicationType?: "personal" | "business" | null;
  setApplicationType?: React.Dispatch<
    React.SetStateAction<"personal" | "business" | null>
  >;
}

export function CreditApplicationForm({
  applicationType,
  setApplicationType,
}: CreditApplicationFormProps = {}) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [file1, setFile1] = useState<File | null>(null);
  const [file2, setFile2] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [direction, setDirection] = useState<"forward" | "backward">("forward");

  // Reject oversized uploads up front so submissions never exceed the serverless
  // body limit (which would fail with a 413 only after the user hits submit).
  const selectFile = (
    slot: 1 | 2,
    file: File | null,
    otherFile: File | null,
  ): void => {
    setFileError(null);
    const apply = (f: File | null) => (slot === 1 ? setFile1(f) : setFile2(f));
    if (!file) {
      apply(null);
      return;
    }
    if (file.size > MAX_FILE_BYTES) {
      setFileError(
        `"${file.name}" is ${formatMb(file.size)}. Each file must be under ${formatMb(MAX_FILE_BYTES)}.`,
      );
      return;
    }
    if ((otherFile?.size ?? 0) + file.size > MAX_TOTAL_UPLOAD_BYTES) {
      setFileError(
        `Combined uploads exceed ${formatMb(MAX_TOTAL_UPLOAD_BYTES)}. Remove or shrink a file.`,
      );
      return;
    }
    apply(file);
  };
  const formTopRef = useRef<HTMLDivElement | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    getValues,
    setError,
    trigger,
    formState: { errors, touchedFields },
    reset,
  } = useForm<CreditFormData>({
    resolver: zodResolver(creditSchema),
    defaultValues: {
      coApplicantEnabled: false,
      legalAgree: false,
    },
  });

  const coApplicantEnabled = watch("coApplicantEnabled");

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      const cardElement = document.getElementById("credit-application-card");
      if (cardElement) {
        cardElement.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
      formTopRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 50);

    return () => window.clearTimeout(timeoutId);
  }, [currentStep]);

  // Helper function to check if a field is valid (has been touched and has no errors)
  const isFieldValid = (fieldName: keyof CreditFormData): boolean => {
    const fieldValue = watch(fieldName);
    const fieldError = errors[fieldName];
    const isTouched = touchedFields[fieldName];

    // If there's an error, field is invalid
    if (fieldError) return false;

    // If field has been touched, has a value, and no error, it's valid
    if (
      isTouched &&
      fieldValue !== undefined &&
      fieldValue !== null &&
      fieldValue !== ""
    ) {
      return true;
    }

    return false;
  };

  // Set signature date when user reaches step 5 so the field shows current date; payload always uses submission date.
  useEffect(() => {
    if (currentStep === 5) {
      setValue("signatureDate", new Date().toISOString().slice(0, 10));
    }
  }, [currentStep, setValue]);

  // Reset form after 6 seconds when success message is shown
  // useEffect(() => {
  //   if (isSuccess) {
  //     const timer = setTimeout(() => {
  //       setIsSuccess(false);
  //       reset();
  //       setCurrentStep(1);
  //       setFile1(null);
  //       setFile2(null);
  //     }, 6000);

  //     return () => clearTimeout(timer);
  //   }
  // }, [isSuccess, reset]);

  const onSubmit = useCallback(
    async (data: CreditFormData) => {
      setIsSubmitting(true);
      setSubmitError(null);
      try {
        const document1Base64 = file1 ? await fileToBase64(file1) : undefined;
        const document2Base64 = file2 ? await fileToBase64(file2) : undefined;
        const consultantEmail = getConsultantEmail(data.consultant);

        const missingField =
          !data.firstName?.trim() ? "first name" :
          !data.lastName?.trim()  ? "last name" :
          !data.email?.trim()     ? "email" :
          !data.phone?.trim()     ? "phone number" :
          !data.consultant?.trim() ? "consultant selection" :
          !consultantEmail        ? "consultant email" :
          null;

        if (missingField) {
          setSubmitError(`Missing required field: ${missingField}. Please go back and complete all steps.`);
          return;
        }
        const payload = {
          VehicleOrService: "Credit Application",
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
          HousingPaymentType: data.housingPaymentType,
          // Step 2
          Employer: data.employer,
          EmploymentPhone: data.employmentPhone,
          EmploymentStreet: data.employmentStreet,
          EmploymentCity: data.employmentCity,
          EmploymentState: data.employmentState,
          EmploymentZip: data.employmentZip,
          YearsAtJob: data.yearsAtJob,
          Position: data.position,
          GrossAnnualIncome: data.grossAnnualIncome,
          OtherAnnualIncome: data.otherAnnualIncome ?? "",
          OrganizationAffiliation: data.organizationAffiliation ?? "",
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
            CoHousingPaymentType: data.coHousingPaymentType,
            CoEmployer: data.coEmployer,
            CoEmploymentPhone: data.coEmploymentPhone,
            CoEmploymentStreet: data.coEmploymentStreet,
            CoEmploymentCity: data.coEmploymentCity,
            CoEmploymentState: data.coEmploymentState,
            CoEmploymentZip: data.coEmploymentZip,
            CoYearsAtJob: data.coYearsAtJob,
            CoPosition: data.coPosition,
            CoGrossAnnualIncome: data.coGrossAnnualIncome,
            CoOtherAnnualIncome: data.coOtherAnnualIncome ?? "",
            CoOrganizationAffiliation: data.coOrganizationAffiliation ?? "",
          }),
          // Step 4 - only include upload fields when files are present
          ...(file1 &&
            document1Base64 && {
              Document1FileName: file1.name,
              Document1Base64: document1Base64,
            }),
          ...(file2 &&
            document2Base64 && {
              Document2FileName: file2.name,
              Document2Base64: document2Base64,
            }),
          // Step 5
          Consultant: data.consultant,
          ConsultantEmail: consultantEmail,
          Signature: data.signature,
          SignatureDate: new Date().toISOString().slice(0, 10),
          LegalAgreed: data.legalAgree,
        };

        const res = await fetch(WEBHOOK_CREDIT_APPLICATION_PATH, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const json = await res.json().catch(() => ({}));
        if (res.status < 200 || res.status >= 300) {
          setSubmitError(getSubmitErrorMessage(res, json));
          return;
        }
        if (typeof window.gtag === 'function') {
          window.gtag('event', 'credit_app_submit', {
            event_category: 'engagement',
            event_label: 'Personal Credit Application Submit',
            value: 1
          });
        }
        setIsSuccess(true);
        reset();
        setCurrentStep(1);
        setFile1(null);
        setFile2(null);
        setFileError(null);
      } catch (e) {
        setSubmitError(getSubmitErrorFromException(e));
      } finally {
        setIsSubmitting(false);
      }
    },
    [file1, file2, reset],
  );

  const goNext = async () => {
    let fieldsToValidate: (keyof CreditFormData)[] = [];
    if (currentStep === 1) {
      fieldsToValidate = [
        "firstName",
        "lastName",
        "ssn",
        "dob",
        "housing",
        "phone",
        "email",
        "street",
        "city",
        "state",
        "zip",
        "yearsAtResidence",
        "monthlyPayment",
        "housingPaymentType",
      ];
    } else if (currentStep === 2) {
      fieldsToValidate = [
        "employer",
        "employmentPhone",
        "employmentStreet",
        "employmentCity",
        "employmentState",
        "employmentZip",
        "yearsAtJob",
        "position",
        "grossAnnualIncome",
      ];
    } else if (currentStep === 3) {
      // Step 3: Validate co-applicant fields
      const values = getValues();
      if (values.coApplicantEnabled) {
        // First, trigger validation on all co-applicant fields to show individual errors
        const coApplicantFields: (keyof CreditFormData)[] = [
          "coFirstName",
          "coLastName",
          "coSsn",
          "coDob",
          "coHousing",
          "coPhone",
          "coEmail",
          "coStreet",
          "coCity",
          "coState",
          "coZip",
          "coYearsAtResidence",
          "coMonthlyPayment",
          "coHousingPaymentType",
          "coEmployer",
          "coEmploymentPhone",
          "coEmploymentStreet",
          "coEmploymentCity",
          "coEmploymentState",
          "coEmploymentZip",
          "coYearsAtJob",
          "coPosition",
          "coGrossAnnualIncome",
        ];

        // Validate email format if provided
        const email = values.coEmail?.trim() ?? "";
        if (email && !z.string().email().safeParse(email).success) {
          setError("coEmail", {
            message: "Please enter a valid email address",
            type: "manual",
          });
        }

        // Trigger validation on all fields
        const validationResult = await trigger(coApplicantFields);

        // Check if all required fields are filled
        if (!isCoApplicantSectionValid(values)) {
          // Set individual field errors for missing required fields
          if (!values.coFirstName?.trim()) {
            setError("coFirstName", {
              message: "First name is required",
              type: "manual",
            });
          }
          if (!values.coLastName?.trim()) {
            setError("coLastName", {
              message: "Last name is required",
              type: "manual",
            });
          }
          if (
            !values.coSsn?.trim() ||
            (values.coSsn?.replace(/\D/g, "").length ?? 0) !== 9
          ) {
            setError("coSsn", {
              message: "SSN must be exactly 9 digits",
              type: "manual",
            });
          }
          if (!values.coDob?.trim()) {
            setError("coDob", {
              message: "Date of birth is required",
              type: "manual",
            });
          }
          if (!values.coHousing?.trim()) {
            setError("coHousing", {
              message: "Housing status is required",
              type: "manual",
            });
          }
          if (
            !values.coPhone?.trim() ||
            (values.coPhone?.trim()?.length ?? 0) < 10
          ) {
            setError("coPhone", {
              message: "Valid phone number is required",
              type: "manual",
            });
          }
          if (!email) {
            setError("coEmail", {
              message: "Email is required",
              type: "manual",
            });
          }
          if (!values.coStreet?.trim()) {
            setError("coStreet", {
              message: "Street is required",
              type: "manual",
            });
          }
          if (!values.coCity?.trim()) {
            setError("coCity", { message: "City is required", type: "manual" });
          }
          if (!values.coState?.trim()) {
            setError("coState", {
              message: "State is required",
              type: "manual",
            });
          }
          if (
            !values.coZip?.trim() ||
            (values.coZip?.trim()?.length ?? 0) < 5
          ) {
            setError("coZip", { message: "ZIP is required", type: "manual" });
          }
          if (!values.coYearsAtResidence?.trim()) {
            setError("coYearsAtResidence", {
              message: "Years at residence is required",
              type: "manual",
            });
          }
          if (!values.coMonthlyPayment?.trim()) {
            setError("coMonthlyPayment", {
              message: "Monthly payment is required",
              type: "manual",
            });
          }
          if (!values.coEmployer?.trim()) {
            setError("coEmployer", {
              message: "Employer is required",
              type: "manual",
            });
          }
          if (!values.coPosition?.trim()) {
            setError("coPosition", {
              message: "Position is required",
              type: "manual",
            });
          }
          if (!values.coGrossAnnualIncome?.trim()) {
            setError("coGrossAnnualIncome", {
              message: "Gross annual income is required",
              type: "manual",
            });
          }

          // Scroll to first error
          setTimeout(() => {
            const firstError = document.querySelector(".border-destructive");
            if (firstError) {
              firstError.scrollIntoView({
                behavior: "smooth",
                block: "center",
              });
              (firstError as HTMLElement).focus();
            }
          }, 100);
          return;
        }

        // If validation failed, don't proceed
        if (!validationResult) {
          setTimeout(() => {
            const firstError = document.querySelector(".border-destructive");
            if (firstError) {
              firstError.scrollIntoView({
                behavior: "smooth",
                block: "center",
              });
              (firstError as HTMLElement).focus();
            }
          }, 100);
          return;
        }
      }
      fieldsToValidate = ["coApplicantEnabled"];
    } else if (currentStep === 5) {
      fieldsToValidate = ["consultant", "legalAgree", "signature"];
    }
    const ok =
      fieldsToValidate.length === 0 || (await trigger(fieldsToValidate));

    // If validation failed, scroll to first error
    if (!ok) {
      setTimeout(() => {
        const firstError = document.querySelector(".border-destructive");
        if (firstError) {
          firstError.scrollIntoView({ behavior: "smooth", block: "center" });
          (firstError as HTMLElement).focus();
        }
      }, 100);
    }

    if (ok && currentStep < 5) {
      setDirection("forward");
      setCurrentStep((s) => s + 1);
    }
  };

  const goBack = () => {
    setDirection("backward");
    setCurrentStep((s) => s - 1);
  };

  const goToStep = async (stepId: number) => {
    if (stepId === currentStep) return; // Already on this step

    // If going forward, validate current step first
    if (stepId > currentStep) {
      let fieldsToValidate: (keyof CreditFormData)[] = [];

      if (currentStep === 1) {
        fieldsToValidate = [
          "firstName",
          "lastName",
          "ssn",
          "dob",
          "housing",
          "phone",
          "email",
          "street",
          "city",
          "state",
          "zip",
          "yearsAtResidence",
          "monthlyPayment",
          "housingPaymentType",
        ];
      } else if (currentStep === 2) {
        fieldsToValidate = [
          "employer",
          "employmentPhone",
          "employmentStreet",
          "employmentCity",
          "employmentState",
          "employmentZip",
          "yearsAtJob",
          "position",
          "grossAnnualIncome",
        ];
      } else if (currentStep === 3) {
        const values = getValues();
        if (values.coApplicantEnabled) {
          const coApplicantFields: (keyof CreditFormData)[] = [
            "coFirstName",
            "coLastName",
            "coSsn",
            "coDob",
            "coHousing",
            "coPhone",
            "coEmail",
            "coStreet",
            "coCity",
            "coState",
            "coZip",
            "coYearsAtResidence",
            "coMonthlyPayment",
            "coHousingPaymentType",
            "coEmployer",
            "coEmploymentPhone",
            "coEmploymentStreet",
            "coEmploymentCity",
            "coEmploymentState",
            "coEmploymentZip",
            "coYearsAtJob",
            "coPosition",
            "coGrossAnnualIncome",
          ];
          await trigger(coApplicantFields);

          const email = values.coEmail?.trim() ?? "";
          if (email && !z.string().email().safeParse(email).success) {
            setError("coEmail", {
              message: "Please enter a valid email address",
              type: "manual",
            });
          }

          if (!isCoApplicantSectionValid(values)) {
            // Set individual field errors
            if (!values.coFirstName?.trim())
              setError("coFirstName", {
                message: "First name is required",
                type: "manual",
              });
            if (!values.coLastName?.trim())
              setError("coLastName", {
                message: "Last name is required",
                type: "manual",
              });
            if (
              !values.coSsn?.trim() ||
              (values.coSsn?.replace(/\D/g, "").length ?? 0) !== 9
            )
              setError("coSsn", {
                message: "SSN must be exactly 9 digits",
                type: "manual",
              });
            if (!values.coDob?.trim())
              setError("coDob", {
                message: "Date of birth is required",
                type: "manual",
              });
            if (!values.coHousing?.trim())
              setError("coHousing", {
                message: "Housing status is required",
                type: "manual",
              });
            if (
              !values.coPhone?.trim() ||
              (values.coPhone?.trim()?.length ?? 0) < 10
            )
              setError("coPhone", {
                message: "Valid phone number is required",
                type: "manual",
              });
            if (!email)
              setError("coEmail", {
                message: "Email is required",
                type: "manual",
              });
            if (!values.coStreet?.trim())
              setError("coStreet", {
                message: "Street is required",
                type: "manual",
              });
            if (!values.coCity?.trim())
              setError("coCity", {
                message: "City is required",
                type: "manual",
              });
            if (!values.coState?.trim())
              setError("coState", {
                message: "State is required",
                type: "manual",
              });
            if (
              !values.coZip?.trim() ||
              (values.coZip?.trim()?.length ?? 0) < 5
            )
              setError("coZip", { message: "ZIP is required", type: "manual" });
            if (!values.coYearsAtResidence?.trim())
              setError("coYearsAtResidence", {
                message: "Years at residence is required",
                type: "manual",
              });
            if (!values.coMonthlyPayment?.trim())
              setError("coMonthlyPayment", {
                message: "Monthly payment is required",
                type: "manual",
              });
            if (!values.coEmployer?.trim())
              setError("coEmployer", {
                message: "Employer is required",
                type: "manual",
              });
            if (!values.coPosition?.trim())
              setError("coPosition", {
                message: "Position is required",
                type: "manual",
              });
            if (!values.coGrossAnnualIncome?.trim())
              setError("coGrossAnnualIncome", {
                message: "Gross annual income is required",
                type: "manual",
              });

            setTimeout(() => {
              const firstError = document.querySelector(".border-destructive");
              if (firstError) {
                firstError.scrollIntoView({
                  behavior: "smooth",
                  block: "center",
                });
                (firstError as HTMLElement).focus();
              }
            }, 100);
            return; // Don't navigate if validation fails
          }
        }
        fieldsToValidate = ["coApplicantEnabled"];
      } else if (currentStep === 5) {
        fieldsToValidate = ["consultant", "legalAgree", "signature"];
      }

      // Validate current step before allowing navigation forward
      if (fieldsToValidate.length > 0) {
        const isValid = await trigger(fieldsToValidate);
        if (!isValid) {
          // Scroll to first error
          setTimeout(() => {
            const firstError = document.querySelector(".border-destructive");
            if (firstError) {
              firstError.scrollIntoView({
                behavior: "smooth",
                block: "center",
              });
              (firstError as HTMLElement).focus();
            }
          }, 100);
          return; // Don't navigate if validation fails
        }
      }
    }

    // Determine direction
    if (stepId < currentStep) {
      setDirection("backward");
    } else {
      setDirection("forward");
    }

    setCurrentStep(stepId);
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
      <div ref={formTopRef} />
      {/* Step Indicator */}
      <nav aria-label="Application steps" className="flex flex-col gap-4 mb-6">
        <div className="flex items-center justify-center gap-0 md:gap-2">
          {STEPS.map((step, index) => {
            const Icon = step.icon;
            const isCompleted = currentStep > step.id;
            const isCurrent = currentStep === step.id;
            const isPrevious = step.id < currentStep;
            // Allow clicking on any step - validation will happen in goToStep function

            return (
              <div key={step.id} className="flex items-center ">
                <Button
                  asChild // This is the magic key - it prevents the Button from rendering its own HTML/CSS
                  onClick={() => goToStep(step.id)}
                  className="p-0 h-auto bg-transparent hover:bg-transparent border-none shadow-none ring-0 focus-visible:ring-0"
                >
                  <div // Now this div handles the layout, completely ignoring Shadcn's "ghost" styles
                    className={cn(
                      "flex flex-col items-center gap-2 transition-all duration-300 cursor-pointer group",
                      !isCurrent && "hover:scale-105",
                    )}
                    role="button"
                    aria-label={`Go to step ${step.id}: ${step.label}`}
                  >
                    <div
                      className={cn(
                        "flex h-8 w-8 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-full text-xs font-semibold transition-all duration-300",
                        isCurrent
                          ? "bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)] scale-110"
                          : isCompleted
                            ? "bg-blue-100 text-blue-600"
                            : "bg-muted text-muted-foreground dark:bg-slate-800",
                      )}
                    >
                      <Icon
                        className={cn(
                          "w-2 h-2 sm:w-6 sm:h-6 transition-all",
                          isCurrent ? "scale-110" : "",
                        )}
                      />
                    </div>

                    <span
                      className={cn(
                        "text-[12px] md:text-lg font-medium transition-colors hidden md:block",
                        isCurrent
                          ? "text-blue-600 font-bold"
                          : "text-muted-foreground",
                      )}
                    >
                      {step.label}
                    </span>
                  </div>
                </Button>
                {index < STEPS.length - 1 && (
                  <div
                    className={cn(
                      "mx-1 md:mx-2 h-0.5 w-4 md:w-8 rounded transition-all duration-300",
                      isCompleted
                        ? "bg-accent/60"
                        : "bg-border dark:bg-white/20",
                    )}
                    aria-hidden
                  />
                )}
              </div>
            );
          })}
        </div>
      </nav>

      <AnimatePresence mode="wait" custom={direction}>
        {/* Security Notice - Step 1 only */}
        {currentStep === 1 && (
          <motion.div
            key="security-notice"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="mb-6 rounded-xl border border-emerald-500/25 bg-emerald-500/[0.06] dark:bg-emerald-500/10 px-4 py-3 sm:px-5 sm:py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
          >
            <div className="flex items-start gap-3 flex-1 min-w-0">
              <Shield
                className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mt-0.5 flex-shrink-0"
                aria-hidden
              />
              <p className="text-sm sm:text-base text-foreground dark:text-white/95 leading-snug">
                <span className="font-semibold text-emerald-700 dark:text-emerald-400">
                  Your information is end-to-end encrypted.
                </span>{" "}
                <span className="text-muted-foreground dark:text-white/75">
                  Everything you submit is protected in transit with
                  industry-standard encryption.
                </span>
              </p>
            </div>
            <Link
              to="/credit-application/data-security"
              className="shrink-0 inline-flex items-center text-sm font-semibold text-emerald-700 dark:text-emerald-400 hover:underline underline-offset-4 w-full sm:w-auto sm:ml-2 justify-end sm:justify-start"
            >
              Learn more
            </Link>
          </motion.div>
        )}

        {/* Mobile Toggle inside the step 1 content, underneath the security notice */}
        {currentStep === 1 && setApplicationType && (
          <div className="md:hidden flex p-1.5 bg-slate-100 dark:bg-slate-900/40 rounded-full border border-slate-200 dark:border-white/10 ring-1 ring-black/5 w-full relative mb-6">
            <button
              type="button"
              data-quick-action="true"
              onClick={() => setApplicationType("personal")}
              className={cn(
                "flex-1 rounded-full py-3 text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2",
                applicationType !== "business"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white",
              )}
            >
              <User className="w-4 h-4" /> Personal Use
            </button>
            <button
              type="button"
              data-quick-action="true"
              onClick={() => setApplicationType("business")}
              className={cn(
                "flex-1 rounded-full py-3 text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2",
                applicationType === "business"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white",
              )}
            >
              <Building className="w-4 h-4" /> Business Use
            </button>
          </div>
        )}

        {/* Step 1: Applicant Info */}
        {currentStep === 1 && (
          <motion.div
            key="step-1"
            custom={direction}
            initial={{ opacity: 0, x: direction === "forward" ? 50 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction === "forward" ? -50 : 50 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-lg font-semibold text-foreground dark:text-white mb-2 flex items-center gap-2">
                <User className="w-5 h-5 text-accent" />
                Personal Information
              </h3>
              <p className="text-sm text-muted-foreground dark:text-white/70">
                Let's start with your basic information
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <Label
                  htmlFor="firstName"
                  className="text-sm font-medium flex items-center gap-1.5"
                >
                  First Name <span className="text-destructive">*</span>
                  {isFieldValid("firstName") && (
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                  )}
                </Label>
                <div className="relative">
                  <Input
                    id="firstName"
                    {...register("firstName", {
                      onChange: () => trigger("firstName"),
                      onBlur: () => trigger("firstName"),
                    })}
                    placeholder="John"
                    className={cn(
                      errors.firstName
                        ? "border-destructive pr-10"
                        : isFieldValid("firstName")
                          ? "border-green-500 pr-10"
                          : "",
                    )}
                  />
                  {isFieldValid("firstName") && !errors.firstName && (
                    <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500 pointer-events-none" />
                  )}
                </div>
                {errors.firstName && (
                  <p className="text-xs text-destructive mt-1 flex items-center gap-1">
                    <X className="w-3 h-3" /> {errors.firstName.message}
                  </p>
                )}
              </div>
              <div className="space-y-1.5">
                <Label
                  htmlFor="lastName"
                  className="text-sm font-medium flex items-center gap-1.5"
                >
                  Last Name <span className="text-destructive">*</span>
                  {isFieldValid("lastName") && (
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                  )}
                </Label>
                <div className="relative">
                  <Input
                    id="lastName"
                    {...register("lastName", {
                      onChange: () => trigger("lastName"),
                      onBlur: () => trigger("lastName"),
                    })}
                    placeholder="Smith"
                    className={cn(
                      errors.lastName
                        ? "border-destructive pr-10"
                        : isFieldValid("lastName")
                          ? "border-green-500 pr-10"
                          : "",
                    )}
                  />
                  {isFieldValid("lastName") && !errors.lastName && (
                    <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500 pointer-events-none" />
                  )}
                </div>
                {errors.lastName && (
                  <p className="text-xs text-destructive mt-1 flex items-center gap-1">
                    <X className="w-3 h-3" /> {errors.lastName.message}
                  </p>
                )}
              </div>
              <div className="space-y-1.5">
                <Label
                  htmlFor="ssn"
                  className="text-sm font-medium flex items-center gap-1.5"
                >
                  <Lock className="w-3.5 h-3.5 text-muted-foreground" />
                  Social Security Number{" "}
                  <span className="text-destructive">*</span>
                  {isFieldValid("ssn") && (
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                  )}
                </Label>
                <div className="relative">
                  <Input
                    id="ssn"
                    type="text"
                    maxLength={9}
                    inputMode="numeric"
                    pattern="[0-9]*"
                    {...register("ssn", {
                      onChange: (e) => {
                        // Only allow numbers
                        e.target.value = e.target.value.replace(/[^0-9]/g, "");
                        trigger("ssn");
                      },
                      onBlur: () => trigger("ssn"),
                    })}
                    placeholder="123456789"
                    className={cn(
                      errors.ssn
                        ? "border-destructive pr-10"
                        : isFieldValid("ssn")
                          ? "border-green-500 pr-10"
                          : "",
                    )}
                  />
                  {isFieldValid("ssn") && !errors.ssn && (
                    <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500 pointer-events-none" />
                  )}
                </div>
                <p className="text-xs text-muted-foreground dark:text-white/60">
                  End-to-end encrypted in transit to our servers.
                </p>
                {errors.ssn && (
                  <p className="text-xs text-destructive mt-1 flex items-center gap-1">
                    <X className="w-3 h-3" /> {errors.ssn.message}
                  </p>
                )}
              </div>
              <div className="space-y-1.5">
                <Label
                  htmlFor="dob"
                  className="text-sm font-medium flex items-center gap-1.5"
                >
                  <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
                  Date of Birth <span className="text-destructive">*</span>
                  {isFieldValid("dob") && (
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                  )}
                </Label>
                <div className="relative">
                  <Input
                    id="dob"
                    type="text"
                    maxLength={10}
                    placeholder="MM-DD-YYYY"
                    {...register("dob", {
                      onChange: (e) => {
                        e.target.value = formatDOB(e.target.value);
                        trigger("dob");
                      },
                      onBlur: () => trigger("dob"),
                    })}
                    className={cn(
                      errors.dob
                        ? "border-destructive pr-10"
                        : isFieldValid("dob")
                          ? "border-green-500 pr-10"
                          : "",
                    )}
                  />
                  {isFieldValid("dob") && !errors.dob && (
                    <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500 pointer-events-none" />
                  )}
                </div>
                {errors.dob && (
                  <p className="text-xs text-destructive mt-1 flex items-center gap-1">
                    <X className="w-3 h-3" /> {errors.dob.message}
                  </p>
                )}
              </div>
              <div className="space-y-1.5 md:col-span-2">
                <Label className="text-sm font-medium flex items-center gap-1.5">
                  <Home className="w-3.5 h-3.5 text-muted-foreground" />
                  Current Housing Status{" "}
                  <span className="text-destructive">*</span>
                  {isFieldValid("housing") && (
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                  )}
                </Label>
                <Select
                  value={watch("housing") ?? ""}
                  onValueChange={async (v) => {
                    setValue("housing", v, {
                      shouldValidate: true,
                      shouldTouch: true,
                    });
                    await trigger("housing");
                  }}
                >
                  <SelectTrigger
                    className={cn(
                      errors.housing
                        ? "border-destructive"
                        : isFieldValid("housing")
                          ? "border-green-500"
                          : "",
                    )}
                  >
                    <SelectValue placeholder="Select your housing situation" />
                  </SelectTrigger>
                  <SelectContent>
                    {HOUSING_OPTIONS.map((o) => (
                      <SelectItem key={o.value} value={o.value}>
                        {o.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.housing && (
                  <p className="text-xs text-destructive mt-1 flex items-center gap-1">
                    <X className="w-3 h-3" /> {errors.housing.message}
                  </p>
                )}
              </div>
            </div>

            <div className="pt-4 border-t border-border dark:border-white/10">
              <h4 className="text-base font-semibold text-foreground dark:text-white mb-4 flex items-center gap-2">
                <Phone className="w-4 h-4 text-accent" />
                Contact Information
              </h4>
              <div className="grid md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <Label
                    htmlFor="phone"
                    className="text-sm font-medium flex items-center gap-1.5"
                  >
                    Phone Number <span className="text-destructive">*</span>
                    {isFieldValid("phone") && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                    )}
                  </Label>
                  <div className="relative">
                    <Input
                      id="phone"
                      type="tel"
                      {...register("phone", {
                        onChange: (e) => {
                          const formatted = formatPhoneNumber(e.target.value);
                          e.target.value = formatted;
                          trigger("phone");
                        },
                        onBlur: () => trigger("phone"),
                      })}
                      placeholder="201-509-5555"
                      className={cn(
                        errors.phone
                          ? "border-destructive pr-10"
                          : isFieldValid("phone")
                            ? "border-green-500 pr-10"
                            : "",
                      )}
                    />
                    {isFieldValid("phone") && !errors.phone && (
                      <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500 pointer-events-none" />
                    )}
                    {errors.phone && (
                      <p className="text-xs text-destructive mt-1 flex items-center gap-1">
                        <X className="w-3 h-3" /> {errors.phone.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label
                    htmlFor="email"
                    className="text-sm font-medium flex items-center gap-1.5"
                  >
                    Email <span className="text-destructive">*</span>
                    {isFieldValid("email") && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                    )}
                  </Label>
                  <div className="relative">
                    <Input
                      id="email"
                      type="email"
                      {...register("email", {
                        onChange: () => trigger("email"),
                        onBlur: () => trigger("email"),
                      })}
                      placeholder="john@example.com"
                      className={cn(
                        errors.email
                          ? "border-destructive pr-10"
                          : isFieldValid("email")
                            ? "border-green-500 pr-10"
                            : "",
                      )}
                    />
                    {isFieldValid("email") && !errors.email && (
                      <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500 pointer-events-none" />
                    )}
                    {errors.email && (
                      <p className="text-xs text-destructive mt-1 flex items-center gap-1">
                        <X className="w-3 h-3" /> {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-border dark:border-white/10">
              <h4 className="text-base font-semibold text-foreground dark:text-white mb-4 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-accent" />
                Residential Address
              </h4>
              <div className="grid md:grid-cols-2 gap-5">
                <div className="space-y-1.5 md:col-span-2">
                  <Label
                    htmlFor="street"
                    className="text-sm font-medium flex items-center gap-1.5"
                  >
                    Street Address <span className="text-destructive">*</span>
                    {isFieldValid("street") && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                    )}
                  </Label>
                  <div className="relative">
                    <Input
                      id="street"
                      {...register("street", {
                        onChange: () => trigger("street"),
                        onBlur: () => trigger("street"),
                      })}
                      placeholder="123 Main Street, Apt 4B"
                      className={cn(
                        errors.street
                          ? "border-destructive pr-10"
                          : isFieldValid("street")
                            ? "border-green-500 pr-10"
                            : "",
                      )}
                    />
                    {isFieldValid("street") && !errors.street && (
                      <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500 pointer-events-none" />
                    )}
                  </div>
                  {errors.street && (
                    <p className="text-xs text-destructive mt-1 flex items-center gap-1">
                      <X className="w-3 h-3" /> {errors.street.message}
                    </p>
                  )}
                </div>
                <div className="space-y-1.5">
                  <Label
                    htmlFor="city"
                    className="text-sm font-medium flex items-center gap-1.5"
                  >
                    City <span className="text-destructive">*</span>
                    {isFieldValid("city") && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                    )}
                  </Label>
                  <div className="relative">
                    <Input
                      id="city"
                      {...register("city", {
                        onChange: () => trigger("city"),
                        onBlur: () => trigger("city"),
                      })}
                      placeholder="New York"
                      className={cn(
                        errors.city
                          ? "border-destructive pr-10"
                          : isFieldValid("city")
                            ? "border-green-500 pr-10"
                            : "",
                      )}
                    />
                    {isFieldValid("city") && !errors.city && (
                      <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500 pointer-events-none" />
                    )}
                  </div>
                  {errors.city && (
                    <p className="text-xs text-destructive mt-1 flex items-center gap-1">
                      <X className="w-3 h-3" /> {errors.city.message}
                    </p>
                  )}
                </div>
                <div className="space-y-1.5">
                  <Label className="text-sm font-medium flex items-center gap-1.5">
                    State <span className="text-destructive">*</span>
                    {isFieldValid("state") && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                    )}
                  </Label>
                  <Select
                    value={watch("state") ?? ""}
                    onValueChange={async (v) => {
                      setValue("state", v, {
                        shouldValidate: true,
                        shouldTouch: true,
                      });
                      await trigger("state");
                    }}
                  >
                    <SelectTrigger
                      className={cn(
                        errors.state
                          ? "border-destructive"
                          : isFieldValid("state")
                            ? "border-green-500"
                            : "",
                      )}
                    >
                      <SelectValue placeholder="Select your state" />
                    </SelectTrigger>
                    <SelectContent>
                      {US_STATES.map((s) => (
                        <SelectItem key={s.value} value={s.value}>
                          {s.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.state && (
                    <p className="text-xs text-destructive mt-1 flex items-center gap-1">
                      <X className="w-3 h-3" /> {errors.state.message}
                    </p>
                  )}
                </div>
                <div className="space-y-1.5">
                  <Label
                    htmlFor="zip"
                    className="text-sm font-medium flex items-center gap-1.5"
                  >
                    ZIP Code <span className="text-destructive">*</span>
                    {isFieldValid("zip") && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                    )}
                  </Label>
                  <div className="relative">
                    <Input
                      id="zip"
                      {...register("zip", {
                        onChange: () => trigger("zip"),
                        onBlur: () => trigger("zip"),
                      })}
                      placeholder="10001"
                      className={cn(
                        errors.zip
                          ? "border-destructive pr-10"
                          : isFieldValid("zip")
                            ? "border-green-500 pr-10"
                            : "",
                      )}
                    />
                    {isFieldValid("zip") && !errors.zip && (
                      <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500 pointer-events-none" />
                    )}
                  </div>
                  {errors.zip && (
                    <p className="text-xs text-destructive mt-1 flex items-center gap-1">
                      <X className="w-3 h-3" /> {errors.zip.message}
                    </p>
                  )}
                </div>
                <div className="space-y-1.5">
                  <Label
                    htmlFor="yearsAtResidence"
                    className="text-sm font-medium flex items-center gap-1.5"
                  >
                    Years at This Address{" "}
                    <span className="text-destructive">*</span>
                    {isFieldValid("yearsAtResidence") && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                    )}
                  </Label>
                  <div className="relative">
                    <Input
                      id="yearsAtResidence"
                      {...register("yearsAtResidence", {
                        onChange: () => trigger("yearsAtResidence"),
                        onBlur: () => trigger("yearsAtResidence"),
                      })}
                      placeholder="e.g. 3"
                      className={cn(
                        errors.yearsAtResidence
                          ? "border-destructive pr-10"
                          : isFieldValid("yearsAtResidence")
                            ? "border-green-500 pr-10"
                            : "",
                      )}
                    />
                    {isFieldValid("yearsAtResidence") &&
                      !errors.yearsAtResidence && (
                        <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500 pointer-events-none" />
                      )}
                  </div>
                  <p className="text-xs text-muted-foreground dark:text-white/60">
                    How long have you lived here?
                  </p>
                  {errors.yearsAtResidence && (
                    <p className="text-xs text-destructive mt-1 flex items-center gap-1">
                      <X className="w-3 h-3" />{" "}
                      {errors.yearsAtResidence.message}
                    </p>
                  )}
                </div>
                <div className="space-y-1.5">
                  <Label
                    htmlFor="monthlyPayment"
                    className="text-sm font-medium flex items-center gap-1.5"
                  >
                    <DollarSign className="w-3.5 h-3.5 text-muted-foreground" />
                    Monthly Housing Payment{" "}
                    <span className="text-destructive">*</span>
                    {isFieldValid("monthlyPayment") && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                    )}
                  </Label>
                  <div className="relative">
                    <Input
                      id="monthlyPayment"
                      {...register("monthlyPayment", {
                        onChange: () => trigger("monthlyPayment"),
                        onBlur: () => trigger("monthlyPayment"),
                      })}
                      placeholder="e.g. 1500"
                      className={cn(
                        errors.monthlyPayment
                          ? "border-destructive pr-10"
                          : isFieldValid("monthlyPayment")
                            ? "border-green-500 pr-10"
                            : "",
                      )}
                    />
                    {isFieldValid("monthlyPayment") &&
                      !errors.monthlyPayment && (
                        <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500 pointer-events-none" />
                      )}
                  </div>
                  <p className="text-xs text-muted-foreground dark:text-white/60">
                    Rent or mortgage payment amount
                  </p>
                  {errors.monthlyPayment && (
                    <p className="text-xs text-destructive mt-1 flex items-center gap-1">
                      <X className="w-3 h-3" /> {errors.monthlyPayment.message}
                    </p>
                  )}
                </div>
                <div className="space-y-1.5">
                  <Label
                    htmlFor="housingPaymentType"
                    className="text-sm font-medium flex items-center gap-1.5"
                  >
                    <Home className="w-3.5 h-3.5 text-muted-foreground" />
                    Payment Type <span className="text-destructive">*</span>
                    {isFieldValid("housingPaymentType") && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                    )}
                  </Label>
                  <div className="relative">
                    <Select
                      onValueChange={(
                        value: "rent" | "mortgage" | "own" | "family" | "other",
                      ) => {
                        setValue("housingPaymentType", value);
                        trigger("housingPaymentType");
                      }}
                    >
                      <SelectTrigger
                        className={cn(
                          errors.housingPaymentType
                            ? "border-destructive pr-10"
                            : isFieldValid("housingPaymentType")
                              ? "border-green-500 pr-10"
                              : "",
                        )}
                      >
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        {HOUSING_PAYMENT_OPTIONS.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.housingPaymentType && (
                      <p className="text-xs text-destructive mt-1 flex items-center gap-1">
                        <X className="w-3 h-3" />{" "}
                        {errors.housingPaymentType.message}
                      </p>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground dark:text-white/60">
                    Select your housing payment type
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 2: Employment */}
        {currentStep === 2 && (
          <motion.div
            key="step-2"
            custom={direction}
            initial={{ opacity: 0, x: direction === "forward" ? 50 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction === "forward" ? -50 : 50 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-lg font-semibold text-foreground dark:text-white mb-2 flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-accent" />
                Employment Information
              </h3>
              <p className="text-sm text-muted-foreground dark:text-white/70">
                Tell us about your current employment
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              <div className="space-y-1.5 md:col-span-2">
                <Label
                  htmlFor="employer"
                  className="text-sm font-medium flex items-center gap-1.5"
                >
                  Company Name <span className="text-destructive">*</span>
                  {isFieldValid("employer") && (
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                  )}
                </Label>
                <div className="relative">
                  <Input
                    id="employer"
                    {...register("employer", {
                      onChange: () => trigger("employer"),
                      onBlur: () => trigger("employer"),
                    })}
                    placeholder="e.g. ABC Corporation"
                    className={cn(
                      errors.employer
                        ? "border-destructive pr-10"
                        : isFieldValid("employer")
                          ? "border-green-500 pr-10"
                          : "",
                    )}
                  />
                  {isFieldValid("employer") && !errors.employer && (
                    <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500 pointer-events-none" />
                  )}
                </div>
                {errors.employer && (
                  <p className="text-xs text-destructive mt-1 flex items-center gap-1">
                    <X className="w-3 h-3" /> {errors.employer.message}
                  </p>
                )}
              </div>

              <div className="space-y-1.5 md:col-span-2">
                <Label
                  htmlFor="employmentStreet"
                  className="text-sm font-medium flex items-center gap-1.5"
                >
                  <MapPin className="w-3.5 h-3.5 text-muted-foreground" />
                  Employment Street Address{" "}
                  <span className="text-destructive">*</span>
                  {isFieldValid("employmentStreet") && (
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                  )}
                </Label>
                <div className="relative">
                  <Input
                    id="employmentStreet"
                    {...register("employmentStreet", {
                      onChange: () => trigger("employmentStreet"),
                      onBlur: () => trigger("employmentStreet"),
                    })}
                    placeholder="e.g. 123 Business Ave, Suite 100"
                    className={cn(
                      errors.employmentStreet
                        ? "border-destructive pr-10"
                        : isFieldValid("employmentStreet")
                          ? "border-green-500 pr-10"
                          : "",
                    )}
                  />
                  {isFieldValid("employmentStreet") &&
                    !errors.employmentStreet && (
                      <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500 pointer-events-none" />
                    )}
                </div>
                {errors.employmentStreet && (
                  <p className="text-xs text-destructive mt-1 flex items-center gap-1">
                    <X className="w-3 h-3" /> {errors.employmentStreet.message}
                  </p>
                )}
              </div>
              <div className="space-y-1.5">
                <Label
                  htmlFor="employmentCity"
                  className="text-sm font-medium flex items-center gap-1.5"
                >
                  Employment City <span className="text-destructive">*</span>
                  {isFieldValid("employmentCity") && (
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                  )}
                </Label>
                <div className="relative">
                  <Input
                    id="employmentCity"
                    {...register("employmentCity", {
                      onChange: () => trigger("employmentCity"),
                      onBlur: () => trigger("employmentCity"),
                    })}
                    placeholder="e.g. New York"
                    className={cn(
                      errors.employmentCity
                        ? "border-destructive pr-10"
                        : isFieldValid("employmentCity")
                          ? "border-green-500 pr-10"
                          : "",
                    )}
                  />
                  {isFieldValid("employmentCity") && !errors.employmentCity && (
                    <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500 pointer-events-none" />
                  )}
                </div>
                {errors.employmentCity && (
                  <p className="text-xs text-destructive mt-1 flex items-center gap-1">
                    <X className="w-3 h-3" /> {errors.employmentCity.message}
                  </p>
                )}
              </div>
              <div className="space-y-1.5">
                <Label
                  htmlFor="employmentState"
                  className="text-sm font-medium flex items-center gap-1.5"
                >
                  Employment State <span className="text-destructive">*</span>
                  {isFieldValid("employmentState") && (
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                  )}
                </Label>
                <Select
                  onValueChange={(value) => {
                    setValue("employmentState", value);
                    trigger("employmentState");
                  }}
                >
                  <SelectTrigger
                    className={cn(
                      errors.employmentState
                        ? "border-destructive pr-10"
                        : isFieldValid("employmentState")
                          ? "border-green-500 pr-10"
                          : "",
                    )}
                  >
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent>
                    {US_STATES.map((state) => (
                      <SelectItem key={state.value} value={state.value}>
                        {state.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.employmentState && (
                  <p className="text-xs text-destructive mt-1 flex items-center gap-1">
                    <X className="w-3 h-3" /> {errors.employmentState.message}
                  </p>
                )}
              </div>
              <div className="space-y-1.5">
                <Label
                  htmlFor="employmentZip"
                  className="text-sm font-medium flex items-center gap-1.5"
                >
                  Employment ZIP <span className="text-destructive">*</span>
                  {isFieldValid("employmentZip") && (
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                  )}
                </Label>
                <div className="relative">
                  <Input
                    id="employmentZip"
                    {...register("employmentZip", {
                      onChange: () => trigger("employmentZip"),
                      onBlur: () => trigger("employmentZip"),
                    })}
                    placeholder="e.g. 10001"
                    className={cn(
                      errors.employmentZip
                        ? "border-destructive pr-10"
                        : isFieldValid("employmentZip")
                          ? "border-green-500 pr-10"
                          : "",
                    )}
                  />
                  {isFieldValid("employmentZip") && !errors.employmentZip && (
                    <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500 pointer-events-none" />
                  )}
                </div>
                {errors.employmentZip && (
                  <p className="text-xs text-destructive mt-1 flex items-center gap-1">
                    <X className="w-3 h-3" /> {errors.employmentZip.message}
                  </p>
                )}
              </div>
              <div className="space-y-1.5">
                <Label
                  htmlFor="yearsAtJob"
                  className="text-sm font-medium flex items-center gap-1.5"
                >
                  <Clock className="w-3.5 h-3.5 text-muted-foreground" />
                  Years at Job <span className="text-destructive">*</span>
                  {isFieldValid("yearsAtJob") && (
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                  )}
                </Label>
                <div className="relative">
                  <Input
                    id="yearsAtJob"
                    type="number"
                    min="0"
                    max="50"
                    step="0.5"
                    {...register("yearsAtJob", {
                      onChange: () => trigger("yearsAtJob"),
                      onBlur: () => trigger("yearsAtJob"),
                    })}
                    placeholder="e.g. 3"
                    className={cn(
                      errors.yearsAtJob
                        ? "border-destructive pr-10"
                        : isFieldValid("yearsAtJob")
                          ? "border-green-500 pr-10"
                          : "",
                    )}
                  />
                  {isFieldValid("yearsAtJob") && !errors.yearsAtJob && (
                    <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500 pointer-events-none" />
                  )}
                </div>
                <p className="text-xs text-muted-foreground dark:text-white/60">
                  How long you've worked at your current job
                </p>
                {errors.yearsAtJob && (
                  <p className="text-xs text-destructive mt-1 flex items-center gap-1">
                    <X className="w-3 h-3" /> {errors.yearsAtJob.message}
                  </p>
                )}
              </div>
              <div className="space-y-1.5">
                <Label
                  htmlFor="position"
                  className="text-sm font-medium flex items-center gap-1.5"
                >
                  Job Title / Position{" "}
                  <span className="text-destructive">*</span>
                  {isFieldValid("position") && (
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                  )}
                </Label>
                <div className="relative">
                  <Input
                    id="position"
                    {...register("position", {
                      onChange: () => trigger("position"),
                      onBlur: () => trigger("position"),
                    })}
                    placeholder="e.g. Software Engineer"
                    className={cn(
                      errors.position
                        ? "border-destructive pr-10"
                        : isFieldValid("position")
                          ? "border-green-500 pr-10"
                          : "",
                    )}
                  />
                  {isFieldValid("position") && !errors.position && (
                    <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500 pointer-events-none" />
                  )}
                </div>
                {errors.position && (
                  <p className="text-xs text-destructive mt-1 flex items-center gap-1">
                    <X className="w-3 h-3" /> {errors.position.message}
                  </p>
                )}
              </div>
              <div className="space-y-1.5">
                <Label
                  htmlFor="employmentPhone"
                  className="text-sm font-medium flex items-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5 text-muted-foreground" />
                  Employment Phone <span className="text-destructive">*</span>
                  {isFieldValid("employmentPhone") && (
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                  )}
                </Label>
                <div className="relative">
                  <Input
                    id="employmentPhone"
                    type="tel"
                    {...register("employmentPhone", {
                      onChange: (e) => {
                        const formatted = formatPhoneNumber(e.target.value);
                        e.target.value = formatted;
                        trigger("employmentPhone");
                      },
                      onBlur: () => trigger("employmentPhone"),
                    })}
                    placeholder="201-509-5555"
                    className={cn(
                      errors.employmentPhone
                        ? "border-destructive pr-10"
                        : isFieldValid("employmentPhone")
                          ? "border-green-500 pr-10"
                          : "",
                    )}
                  />
                  {isFieldValid("employmentPhone") &&
                    !errors.employmentPhone && (
                      <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500 pointer-events-none" />
                    )}
                  {errors.employmentPhone && (
                    <p className="text-xs text-destructive mt-1 flex items-center gap-1">
                      <X className="w-3 h-3" /> {errors.employmentPhone.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="space-y-1.5">
                <Label
                  htmlFor="grossAnnualIncome"
                  className="text-sm font-medium flex items-center gap-1.5"
                >
                  <DollarSign className="w-3.5 h-3.5 text-muted-foreground" />
                  Gross Annual Income{" "}
                  <span className="text-destructive">*</span>
                  {isFieldValid("grossAnnualIncome") && (
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                  )}
                </Label>
                <div className="relative">
                  <Input
                    id="grossAnnualIncome"
                    {...register("grossAnnualIncome", {
                      onChange: () => trigger("grossAnnualIncome"),
                      onBlur: () => trigger("grossAnnualIncome"),
                    })}
                    placeholder="e.g. 75000"
                    className={cn(
                      errors.grossAnnualIncome
                        ? "border-destructive pr-10"
                        : isFieldValid("grossAnnualIncome")
                          ? "border-green-500 pr-10"
                          : "",
                    )}
                  />
                  {isFieldValid("grossAnnualIncome") &&
                    !errors.grossAnnualIncome && (
                      <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500 pointer-events-none" />
                    )}
                </div>
                <p className="text-xs text-muted-foreground dark:text-white/60">
                  Your total income before taxes
                </p>
                {errors.grossAnnualIncome && (
                  <p className="text-xs text-destructive mt-1 flex items-center gap-1">
                    <X className="w-3 h-3" /> {errors.grossAnnualIncome.message}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="otherAnnualIncome"
                  className="text-sm font-medium flex items-center gap-1.5"
                >
                  <DollarSign className="w-3.5 h-3.5 text-muted-foreground" />
                  Other Annual Income
                </Label>
                <Input
                  id="otherAnnualIncome"
                  {...register("otherAnnualIncome")}
                  placeholder="e.g. 5000"
                />
                <p className="text-xs text-muted-foreground dark:text-white/60">
                  Additional income from investments, rental, etc.
                </p>
              </div>
              <div className="space-y-1.5 md:col-span-2">
                <Label
                  htmlFor="organizationAffiliation"
                  className="text-sm font-medium"
                >
                  Organization Affiliation
                </Label>
                <Input
                  id="organizationAffiliation"
                  {...register("organizationAffiliation")}
                  placeholder="e.g. Professional Association, Union, etc."
                />
                <p className="text-xs text-muted-foreground dark:text-white/60">
                  Any professional organizations or memberships (optional)
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 3: Co-Applicant */}
        {currentStep === 3 && (
          <motion.div
            key="step-3"
            custom={direction}
            initial={{ opacity: 0, x: direction === "forward" ? 50 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction === "forward" ? -50 : 50 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-lg font-semibold text-foreground dark:text-white mb-2 flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-accent" />
                Co-Applicant Information
              </h3>
              <p className="text-sm text-muted-foreground dark:text-white/70">
                Add a co-applicant to strengthen your application (optional)
              </p>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-xl border-2 border-border dark:border-white/10 bg-muted/30 dark:bg-white/[0.02]">
              <Checkbox
                id="coApplicantEnabled"
                checked={coApplicantEnabled}
                onCheckedChange={(checked) =>
                  setValue("coApplicantEnabled", checked === true)
                }
                className="border-border dark:border-white/30 data-[state=checked]:bg-accent data-[state=checked]:border-accent mt-0.5"
              />
              <div className="flex-1">
                <Label
                  htmlFor="coApplicantEnabled"
                  className="text-sm font-medium cursor-pointer flex items-center gap-2"
                >
                  I would like to add a co-applicant
                </Label>
                <p className="text-xs text-muted-foreground dark:text-white/60 mt-1">
                  A co-applicant can help improve your chances of approval
                </p>
              </div>
            </div>
            {errors.coApplicantEnabled && (
              <p className="text-xs text-destructive">
                {errors.coApplicantEnabled.message}
              </p>
            )}

            {coApplicantEnabled && (
              <div className="rounded-xl border border-border dark:border-white/10 bg-muted/50 dark:bg-white/[0.02] p-6 space-y-6">
                <p className="text-sm text-foreground dark:text-white font-medium">
                  Please provide the same information for your co-applicant
                </p>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-base font-semibold text-foreground dark:text-white mb-4 flex items-center gap-2">
                      <User className="w-4 h-4 text-accent" />
                      Co-Applicant Personal Information
                    </h4>
                    <div className="grid md:grid-cols-2 gap-5">
                      <div className="space-y-1.5">
                        <Label className="text-sm font-medium flex items-center gap-1.5">
                          First Name <span className="text-destructive">*</span>
                          {isFieldValid("coFirstName") && (
                            <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                          )}
                        </Label>
                        <div className="relative">
                          <Input
                            id="coFirstName"
                            {...register("coFirstName", {
                              onChange: () => trigger("coFirstName"),
                              onBlur: () => trigger("coFirstName"),
                            })}
                            placeholder="First name"
                            className={cn(
                              errors.coFirstName
                                ? "border-destructive pr-10"
                                : isFieldValid("coFirstName")
                                  ? "border-green-500 pr-10"
                                  : "",
                            )}
                          />
                          {isFieldValid("coFirstName") &&
                            !errors.coFirstName && (
                              <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500 pointer-events-none" />
                            )}
                        </div>
                        {errors.coFirstName && (
                          <p className="text-xs text-destructive mt-1 flex items-center gap-1">
                            <X className="w-3 h-3" />{" "}
                            {errors.coFirstName.message}
                          </p>
                        )}
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-sm font-medium flex items-center gap-1.5">
                          Last Name <span className="text-destructive">*</span>
                          {isFieldValid("coLastName") && (
                            <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                          )}
                        </Label>
                        <div className="relative">
                          <Input
                            {...register("coLastName", {
                              onChange: () => trigger("coLastName"),
                              onBlur: () => trigger("coLastName"),
                            })}
                            placeholder="Last name"
                            className={cn(
                              errors.coLastName
                                ? "border-destructive pr-10"
                                : isFieldValid("coLastName")
                                  ? "border-green-500 pr-10"
                                  : "",
                            )}
                          />
                          {isFieldValid("coLastName") && !errors.coLastName && (
                            <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500 pointer-events-none" />
                          )}
                        </div>
                        {errors.coLastName && (
                          <p className="text-xs text-destructive mt-1 flex items-center gap-1">
                            <X className="w-3 h-3" />{" "}
                            {errors.coLastName.message}
                          </p>
                        )}
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-sm font-medium flex items-center gap-1.5">
                          <Lock className="w-3.5 h-3.5 text-muted-foreground" />
                          Social Security Number{" "}
                          <span className="text-destructive">*</span>
                          {isFieldValid("coSsn") && (
                            <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                          )}
                        </Label>
                        <div className="relative">
                          <Input
                            id="coSsn"
                            type="text"
                            maxLength={9}
                            inputMode="numeric"
                            pattern="[0-9]*"
                            {...register("coSsn", {
                              onChange: (e) => {
                                // Only allow numbers
                                e.target.value = e.target.value.replace(
                                  /[^0-9]/g,
                                  "",
                                );
                                trigger("coSsn");
                              },
                              onBlur: () => trigger("coSsn"),
                            })}
                            placeholder="123456789"
                            className={cn(
                              errors.coSsn
                                ? "border-destructive pr-10"
                                : isFieldValid("coSsn")
                                  ? "border-green-500 pr-10"
                                  : "",
                            )}
                          />
                          {isFieldValid("coSsn") && !errors.coSsn && (
                            <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500 pointer-events-none" />
                          )}
                        </div>
                        {errors.coSsn && (
                          <p className="text-xs text-destructive mt-1 flex items-center gap-1">
                            <X className="w-3 h-3" /> {errors.coSsn.message}
                          </p>
                        )}
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-sm font-medium flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
                          Date of Birth{" "}
                          <span className="text-destructive">*</span>
                          {isFieldValid("coDob") && (
                            <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                          )}
                        </Label>
                        <div className="relative">
                          <Input
                            id="coDob"
                            type="text"
                            maxLength={10}
                            placeholder="MM-DD-YYYY"
                            {...register("coDob", {
                              onChange: (e) => {
                                e.target.value = formatDOB(e.target.value);
                                trigger("coDob");
                              },
                              onBlur: () => trigger("coDob"),
                            })}
                            className={cn(
                              errors.coDob
                                ? "border-destructive pr-10"
                                : isFieldValid("coDob")
                                  ? "border-green-500 pr-10"
                                  : "",
                            )}
                          />
                          {isFieldValid("coDob") && !errors.coDob && (
                            <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500 pointer-events-none" />
                          )}
                        </div>
                        {errors.coDob && (
                          <p className="text-xs text-destructive mt-1 flex items-center gap-1">
                            <X className="w-3 h-3" /> {errors.coDob.message}
                          </p>
                        )}
                      </div>
                      <div className="space-y-1.5 md:col-span-2">
                        <Label className="text-sm font-medium flex items-center gap-1.5">
                          <Home className="w-3.5 h-3.5 text-muted-foreground" />
                          Current Housing Status{" "}
                          <span className="text-destructive">*</span>
                          {isFieldValid("coHousing") && (
                            <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                          )}
                        </Label>
                        <Select
                          value={watch("coHousing") ?? ""}
                          onValueChange={async (v) => {
                            setValue("coHousing", v, {
                              shouldValidate: true,
                              shouldTouch: true,
                            });
                            await trigger("coHousing");
                          }}
                        >
                          <SelectTrigger
                            className={cn(
                              errors.coHousing
                                ? "border-destructive"
                                : isFieldValid("coHousing")
                                  ? "border-green-500"
                                  : "",
                            )}
                          >
                            <SelectValue placeholder="Select housing situation" />
                          </SelectTrigger>
                          <SelectContent>
                            {HOUSING_OPTIONS.map((o) => (
                              <SelectItem key={o.value} value={o.value}>
                                {o.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.coHousing && (
                          <p className="text-xs text-destructive mt-1 flex items-center gap-1">
                            <X className="w-3 h-3" /> {errors.coHousing.message}
                          </p>
                        )}
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-sm font-medium flex items-center gap-1.5">
                          Phone Number{" "}
                          <span className="text-destructive">*</span>
                          {isFieldValid("coPhone") && (
                            <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                          )}
                        </Label>
                        <div className="relative">
                          <Input
                            id="coPhone"
                            type="tel"
                            {...register("coPhone", {
                              onChange: () => trigger("coPhone"),
                              onBlur: () => trigger("coPhone"),
                            })}
                            placeholder="201-509-5555"
                            className={cn(
                              errors.coPhone
                                ? "border-destructive pr-10"
                                : isFieldValid("coPhone")
                                  ? "border-green-500 pr-10"
                                  : "",
                            )}
                          />
                          {isFieldValid("coPhone") && !errors.coPhone && (
                            <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500 pointer-events-none" />
                          )}
                        </div>
                        {errors.coPhone && (
                          <p className="text-xs text-destructive mt-1 flex items-center gap-1">
                            <X className="w-3 h-3" /> {errors.coPhone.message}
                          </p>
                        )}
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-sm font-medium flex items-center gap-1.5">
                          <Mail className="w-3.5 h-3.5 text-muted-foreground" />
                          Email Address{" "}
                          <span className="text-destructive">*</span>
                          {isFieldValid("coEmail") && (
                            <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                          )}
                        </Label>
                        <div className="relative">
                          <Input
                            id="coEmail"
                            type="email"
                            {...register("coEmail", {
                              onChange: () => trigger("coEmail"),
                              onBlur: () => trigger("coEmail"),
                            })}
                            placeholder="email@example.com"
                            className={cn(
                              errors.coEmail
                                ? "border-destructive pr-10"
                                : isFieldValid("coEmail")
                                  ? "border-green-500 pr-10"
                                  : "",
                            )}
                          />
                          {isFieldValid("coEmail") && !errors.coEmail && (
                            <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500 pointer-events-none" />
                          )}
                        </div>
                        {errors.coEmail && (
                          <p className="text-xs text-destructive mt-1 flex items-center gap-1">
                            <X className="w-3 h-3" /> {errors.coEmail.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border dark:border-white/10">
                    <h4 className="text-base font-semibold text-foreground dark:text-white mb-4 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-accent" />
                      Co-Applicant Address
                    </h4>
                    <div className="grid md:grid-cols-2 gap-5">
                      <div className="space-y-1.5 md:col-span-2">
                        <Label className="text-sm font-medium flex items-center gap-1.5">
                          Street Address{" "}
                          <span className="text-destructive">*</span>
                          {isFieldValid("coStreet") && (
                            <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                          )}
                        </Label>
                        <div className="relative">
                          <Input
                            id="coStreet"
                            {...register("coStreet", {
                              onChange: () => trigger("coStreet"),
                              onBlur: () => trigger("coStreet"),
                            })}
                            placeholder="123 Main Street"
                            className={cn(
                              errors.coStreet
                                ? "border-destructive pr-10"
                                : isFieldValid("coStreet")
                                  ? "border-green-500 pr-10"
                                  : "",
                            )}
                          />
                          {isFieldValid("coStreet") && !errors.coStreet && (
                            <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500 pointer-events-none" />
                          )}
                        </div>
                        {errors.coStreet && (
                          <p className="text-xs text-destructive mt-1 flex items-center gap-1">
                            <X className="w-3 h-3" /> {errors.coStreet.message}
                          </p>
                        )}
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-sm font-medium flex items-center gap-1.5">
                          City <span className="text-destructive">*</span>
                          {isFieldValid("coCity") && (
                            <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                          )}
                        </Label>
                        <div className="relative">
                          <Input
                            {...register("coCity", {
                              onChange: () => trigger("coCity"),
                              onBlur: () => trigger("coCity"),
                            })}
                            placeholder="City"
                            className={cn(
                              errors.coCity
                                ? "border-destructive pr-10"
                                : isFieldValid("coCity")
                                  ? "border-green-500 pr-10"
                                  : "",
                            )}
                          />
                          {isFieldValid("coCity") && !errors.coCity && (
                            <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500 pointer-events-none" />
                          )}
                        </div>
                        {errors.coCity && (
                          <p className="text-xs text-destructive mt-1 flex items-center gap-1">
                            <X className="w-3 h-3" /> {errors.coCity.message}
                          </p>
                        )}
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-sm font-medium flex items-center gap-1.5">
                          State <span className="text-destructive">*</span>
                          {isFieldValid("coState") && (
                            <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                          )}
                        </Label>
                        <Select
                          value={watch("coState") ?? ""}
                          onValueChange={async (v) => {
                            setValue("coState", v, {
                              shouldValidate: true,
                              shouldTouch: true,
                            });
                            await trigger("coState");
                          }}
                        >
                          <SelectTrigger
                            className={cn(
                              errors.coState
                                ? "border-destructive"
                                : isFieldValid("coState")
                                  ? "border-green-500"
                                  : "",
                            )}
                          >
                            <SelectValue placeholder="Select state" />
                          </SelectTrigger>
                          <SelectContent>
                            {US_STATES.map((s) => (
                              <SelectItem key={s.value} value={s.value}>
                                {s.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.coState && (
                          <p className="text-xs text-destructive mt-1 flex items-center gap-1">
                            <X className="w-3 h-3" /> {errors.coState.message}
                          </p>
                        )}
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-sm font-medium flex items-center gap-1.5">
                          ZIP Code <span className="text-destructive">*</span>
                          {isFieldValid("coZip") && (
                            <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                          )}
                        </Label>
                        <div className="relative">
                          <Input
                            id="coZip"
                            {...register("coZip", {
                              onChange: () => trigger("coZip"),
                              onBlur: () => trigger("coZip"),
                            })}
                            placeholder="10001"
                            className={cn(
                              errors.coZip
                                ? "border-destructive pr-10"
                                : isFieldValid("coZip")
                                  ? "border-green-500 pr-10"
                                  : "",
                            )}
                          />
                          {isFieldValid("coZip") && !errors.coZip && (
                            <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500 pointer-events-none" />
                          )}
                        </div>
                        {errors.coZip && (
                          <p className="text-xs text-destructive mt-1 flex items-center gap-1">
                            <X className="w-3 h-3" /> {errors.coZip.message}
                          </p>
                        )}
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-sm font-medium flex items-center gap-1.5">
                          Years at This Address{" "}
                          <span className="text-destructive">*</span>
                          {isFieldValid("coYearsAtResidence") && (
                            <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                          )}
                        </Label>
                        <div className="relative">
                          <Input
                            id="coYearsAtResidence"
                            {...register("coYearsAtResidence", {
                              onChange: () => trigger("coYearsAtResidence"),
                              onBlur: () => trigger("coYearsAtResidence"),
                            })}
                            placeholder="e.g. 3"
                            className={cn(
                              errors.coYearsAtResidence
                                ? "border-destructive pr-10"
                                : isFieldValid("coYearsAtResidence")
                                  ? "border-green-500 pr-10"
                                  : "",
                            )}
                          />
                          {isFieldValid("coYearsAtResidence") &&
                            !errors.coYearsAtResidence && (
                              <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500 pointer-events-none" />
                            )}
                        </div>
                        {errors.coYearsAtResidence && (
                          <p className="text-xs text-destructive mt-1 flex items-center gap-1">
                            <X className="w-3 h-3" />{" "}
                            {errors.coYearsAtResidence.message}
                          </p>
                        )}
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-sm font-medium flex items-center gap-1.5">
                          <DollarSign className="w-3.5 h-3.5 text-muted-foreground" />
                          Monthly Housing Payment{" "}
                          <span className="text-destructive">*</span>
                          {isFieldValid("coMonthlyPayment") && (
                            <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                          )}
                        </Label>
                        <div className="relative">
                          <Input
                            id="coMonthlyPayment"
                            {...register("coMonthlyPayment", {
                              onChange: () => trigger("coMonthlyPayment"),
                              onBlur: () => trigger("coMonthlyPayment"),
                            })}
                            placeholder="e.g. 1500"
                            className={cn(
                              errors.coMonthlyPayment
                                ? "border-destructive pr-10"
                                : isFieldValid("coMonthlyPayment")
                                  ? "border-green-500 pr-10"
                                  : "",
                            )}
                          />
                          {isFieldValid("coMonthlyPayment") &&
                            !errors.coMonthlyPayment && (
                              <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500 pointer-events-none" />
                            )}
                        </div>
                        {errors.coMonthlyPayment && (
                          <p className="text-xs text-destructive mt-1 flex items-center gap-1">
                            <X className="w-3 h-3" />{" "}
                            {errors.coMonthlyPayment.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border dark:border-white/10">
                    <h4 className="text-base font-semibold text-foreground dark:text-white mb-4 flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-accent" />
                      Co-Applicant Employment
                    </h4>
                    <div className="grid md:grid-cols-2 gap-5">
                      <div className="space-y-1.5 md:col-span-2">
                        <Label className="text-sm font-medium flex items-center gap-1.5">
                          Company Name{" "}
                          <span className="text-destructive">*</span>
                          {isFieldValid("coEmployer") && (
                            <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                          )}
                        </Label>
                        <div className="relative">
                          <Input
                            {...register("coEmployer", {
                              onChange: () => trigger("coEmployer"),
                              onBlur: () => trigger("coEmployer"),
                            })}
                            placeholder="e.g. ABC Corporation"
                            className={cn(
                              errors.coEmployer
                                ? "border-destructive pr-10"
                                : isFieldValid("coEmployer")
                                  ? "border-green-500 pr-10"
                                  : "",
                            )}
                          />
                          {isFieldValid("coEmployer") && !errors.coEmployer && (
                            <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500 pointer-events-none" />
                          )}
                        </div>
                        {errors.coEmployer && (
                          <p className="text-xs text-destructive mt-1 flex items-center gap-1">
                            <X className="w-3 h-3" />{" "}
                            {errors.coEmployer.message}
                          </p>
                        )}
                      </div>
                      <div className="space-y-1.5 md:col-span-2">
                        <Label
                          htmlFor="coEmploymentStreet"
                          className="text-sm font-medium flex items-center gap-1.5"
                        >
                          <MapPin className="w-3.5 h-3.5 text-muted-foreground" />
                          Employment Street Address{" "}
                          <span className="text-destructive">*</span>
                          {isFieldValid("coEmploymentStreet") && (
                            <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                          )}
                        </Label>
                        <div className="relative">
                          <Input
                            id="coEmploymentStreet"
                            {...register("coEmploymentStreet", {
                              onChange: () => trigger("coEmploymentStreet"),
                              onBlur: () => trigger("coEmploymentStreet"),
                            })}
                            placeholder="e.g. 123 Business Ave, Suite 100"
                            className={cn(
                              errors.coEmploymentStreet
                                ? "border-destructive pr-10"
                                : isFieldValid("coEmploymentStreet")
                                  ? "border-green-500 pr-10"
                                  : "",
                            )}
                          />
                          {isFieldValid("coEmploymentStreet") &&
                            !errors.coEmploymentStreet && (
                              <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500 pointer-events-none" />
                            )}
                        </div>
                        {errors.coEmploymentStreet && (
                          <p className="text-xs text-destructive mt-1 flex items-center gap-1">
                            <X className="w-3 h-3" />{" "}
                            {errors.coEmploymentStreet.message}
                          </p>
                        )}
                      </div>
                      <div className="space-y-1.5">
                        <Label
                          htmlFor="coEmploymentCity"
                          className="text-sm font-medium flex items-center gap-1.5"
                        >
                          Employment City{" "}
                          <span className="text-destructive">*</span>
                          {isFieldValid("coEmploymentCity") && (
                            <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                          )}
                        </Label>
                        <div className="relative">
                          <Input
                            id="coEmploymentCity"
                            {...register("coEmploymentCity", {
                              onChange: () => trigger("coEmploymentCity"),
                              onBlur: () => trigger("coEmploymentCity"),
                            })}
                            placeholder="e.g. New York"
                            className={cn(
                              errors.coEmploymentCity
                                ? "border-destructive pr-10"
                                : isFieldValid("coEmploymentCity")
                                  ? "border-green-500 pr-10"
                                  : "",
                            )}
                          />
                          {isFieldValid("coEmploymentCity") &&
                            !errors.coEmploymentCity && (
                              <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500 pointer-events-none" />
                            )}
                        </div>
                        {errors.coEmploymentCity && (
                          <p className="text-xs text-destructive mt-1 flex items-center gap-1">
                            <X className="w-3 h-3" />{" "}
                            {errors.coEmploymentCity.message}
                          </p>
                        )}
                      </div>
                      <div className="space-y-1.5">
                        <Label
                          htmlFor="coEmploymentState"
                          className="text-sm font-medium flex items-center gap-1.5"
                        >
                          Employment State{" "}
                          <span className="text-destructive">*</span>
                          {isFieldValid("coEmploymentState") && (
                            <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                          )}
                        </Label>
                        <Select
                          onValueChange={(value) => {
                            setValue("coEmploymentState", value);
                            trigger("coEmploymentState");
                          }}
                        >
                          <SelectTrigger
                            className={cn(
                              errors.coEmploymentState
                                ? "border-destructive pr-10"
                                : isFieldValid("coEmploymentState")
                                  ? "border-green-500 pr-10"
                                  : "",
                            )}
                          >
                            <SelectValue placeholder="Select state" />
                          </SelectTrigger>
                          <SelectContent>
                            {US_STATES.map((state) => (
                              <SelectItem key={state.value} value={state.value}>
                                {state.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.coEmploymentState && (
                          <p className="text-xs text-destructive mt-1 flex items-center gap-1">
                            <X className="w-3 h-3" />{" "}
                            {errors.coEmploymentState.message}
                          </p>
                        )}
                      </div>
                      <div className="space-y-1.5">
                        <Label
                          htmlFor="coEmploymentZip"
                          className="text-sm font-medium flex items-center gap-1.5"
                        >
                          Employment ZIP{" "}
                          <span className="text-destructive">*</span>
                          {isFieldValid("coEmploymentZip") && (
                            <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                          )}
                        </Label>
                        <div className="relative">
                          <Input
                            id="coEmploymentZip"
                            {...register("coEmploymentZip", {
                              onChange: () => trigger("coEmploymentZip"),
                              onBlur: () => trigger("coEmploymentZip"),
                            })}
                            placeholder="e.g. 10001"
                            className={cn(
                              errors.coEmploymentZip
                                ? "border-destructive pr-10"
                                : isFieldValid("coEmploymentZip")
                                  ? "border-green-500 pr-10"
                                  : "",
                            )}
                          />
                          {isFieldValid("coEmploymentZip") &&
                            !errors.coEmploymentZip && (
                              <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500 pointer-events-none" />
                            )}
                        </div>
                        {errors.coEmploymentZip && (
                          <p className="text-xs text-destructive mt-1 flex items-center gap-1">
                            <X className="w-3 h-3" />{" "}
                            {errors.coEmploymentZip.message}
                          </p>
                        )}
                      </div>
                      <div className="space-y-1.5">
                        <Label
                          htmlFor="coEmploymentPhone"
                          className="text-sm font-medium flex items-center gap-1.5"
                        >
                          <Phone className="w-3.5 h-3.5 text-muted-foreground" />
                          Employment Phone{" "}
                          <span className="text-destructive">*</span>
                          {isFieldValid("coEmploymentPhone") && (
                            <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                          )}
                        </Label>
                        <div className="relative">
                          <Input
                            id="coEmploymentPhone"
                            type="tel"
                            {...register("coEmploymentPhone", {
                              onChange: (e) => {
                                const formatted = formatPhoneNumber(
                                  e.target.value,
                                );
                                e.target.value = formatted;
                                trigger("coEmploymentPhone");
                              },
                              onBlur: () => trigger("coEmploymentPhone"),
                            })}
                            placeholder="201-509-5555"
                            className={cn(
                              errors.coEmploymentPhone
                                ? "border-destructive pr-10"
                                : isFieldValid("coEmploymentPhone")
                                  ? "border-green-500 pr-10"
                                  : "",
                            )}
                          />
                          {isFieldValid("coEmploymentPhone") &&
                            !errors.coEmploymentPhone && (
                              <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500 pointer-events-none" />
                            )}
                        </div>
                        {errors.coEmploymentPhone && (
                          <p className="text-xs text-destructive mt-1 flex items-center gap-1">
                            <X className="w-3 h-3" />{" "}
                            {errors.coEmploymentPhone.message}
                          </p>
                        )}
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-sm font-medium flex items-center gap-1.5">
                          Job Title / Position{" "}
                          <span className="text-destructive">*</span>
                          {isFieldValid("coPosition") && (
                            <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                          )}
                        </Label>
                        <div className="relative">
                          <Input
                            id="coPosition"
                            {...register("coPosition", {
                              onChange: () => trigger("coPosition"),
                              onBlur: () => trigger("coPosition"),
                            })}
                            placeholder="e.g. Software Engineer"
                            className={cn(
                              errors.coPosition
                                ? "border-destructive pr-10"
                                : isFieldValid("coPosition")
                                  ? "border-green-500 pr-10"
                                  : "",
                            )}
                          />
                          {isFieldValid("coPosition") && !errors.coPosition && (
                            <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500 pointer-events-none" />
                          )}
                        </div>
                        {errors.coPosition && (
                          <p className="text-xs text-destructive mt-1 flex items-center gap-1">
                            <X className="w-3 h-3" />{" "}
                            {errors.coPosition.message}
                          </p>
                        )}
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-sm font-medium flex items-center gap-1.5">
                          <DollarSign className="w-3.5 h-3.5 text-muted-foreground" />
                          Gross Annual Income{" "}
                          <span className="text-destructive">*</span>
                          {isFieldValid("coGrossAnnualIncome") && (
                            <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                          )}
                        </Label>
                        <div className="relative">
                          <Input
                            id="coGrossAnnualIncome"
                            {...register("coGrossAnnualIncome", {
                              onChange: () => trigger("coGrossAnnualIncome"),
                              onBlur: () => trigger("coGrossAnnualIncome"),
                            })}
                            placeholder="e.g. 75000"
                            className={cn(
                              errors.coGrossAnnualIncome
                                ? "border-destructive pr-10"
                                : isFieldValid("coGrossAnnualIncome")
                                  ? "border-green-500 pr-10"
                                  : "",
                            )}
                          />
                          {isFieldValid("coGrossAnnualIncome") &&
                            !errors.coGrossAnnualIncome && (
                              <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500 pointer-events-none" />
                            )}
                        </div>
                        {errors.coGrossAnnualIncome && (
                          <p className="text-xs text-destructive mt-1 flex items-center gap-1">
                            <X className="w-3 h-3" />{" "}
                            {errors.coGrossAnnualIncome.message}
                          </p>
                        )}
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-sm font-medium flex items-center gap-1.5">
                          <DollarSign className="w-3.5 h-3.5 text-muted-foreground" />
                          Other Annual Income
                        </Label>
                        <Input
                          {...register("coOtherAnnualIncome")}
                          placeholder="e.g. 5000"
                        />
                      </div>
                      <div className="space-y-1.5 md:col-span-2">
                        <Label className="text-sm font-medium">
                          Organization Affiliation
                        </Label>
                        <Input
                          {...register("coOrganizationAffiliation")}
                          placeholder="e.g. Professional Association, Union, etc."
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* Step 4: Uploads */}
        {currentStep === 4 && (
          <motion.div
            key="step-4"
            custom={direction}
            initial={{ opacity: 0, x: direction === "forward" ? 50 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction === "forward" ? -50 : 50 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-lg font-semibold text-foreground dark:text-white mb-2 flex items-center gap-2">
                <Upload className="w-5 h-5 text-accent" />
                Supporting Documents
              </h3>
              <p className="text-sm text-muted-foreground dark:text-white/70">
                Upload any supporting documents to help us process your
                application faster (optional)
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label
                  htmlFor="doc1"
                  className="text-sm font-medium flex items-center gap-2"
                >
                  <Upload className="w-4 h-4 text-muted-foreground" />
                  Document 1
                </Label>
                <div className="relative">
                  <input
                    id="doc1"
                    type="file"
                    accept=".pdf,image/*"
                    className="hidden"
                    onChange={(e) =>
                      selectFile(1, e.target.files?.[0] ?? null, file2)
                    }
                  />
                  <label
                    htmlFor="doc1"
                    className={cn(
                      "flex items-center justify-center gap-2 h-11 w-full rounded-lg border-2 border-dashed transition-all cursor-pointer px-4",
                      file1
                        ? "border-accent bg-accent/10 dark:bg-accent/5"
                        : "border-border dark:border-white/20 bg-muted/50 dark:bg-white/5 hover:border-accent/50 hover:bg-accent/5 dark:hover:bg-accent/10",
                    )}
                  >
                    {file1 ? (
                      <>
                        <FileText className="w-4 h-4 text-accent flex-shrink-0" />
                        <span className="text-sm font-medium text-foreground dark:text-white truncate flex-1 text-left">
                          {file1.name}
                        </span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setFile1(null);
                            setFileError(null);
                            const input = document.getElementById(
                              "doc1",
                            ) as HTMLInputElement;
                            if (input) input.value = "";
                          }}
                          className="ml-2 p-1 hover:bg-destructive/10 rounded transition-colors flex-shrink-0"
                        >
                          <X className="w-4 h-4 text-destructive" />
                        </button>
                      </>
                    ) : (
                      <>
                        <Upload className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm font-medium text-muted-foreground dark:text-white/70">
                          Choose File
                        </span>
                      </>
                    )}
                  </label>
                </div>
                <p className="text-xs text-muted-foreground dark:text-white/60">
                  e.g. Pay stubs, bank statements, ID
                </p>
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="doc2"
                  className="text-sm font-medium flex items-center gap-2"
                >
                  <Upload className="w-4 h-4 text-muted-foreground" />
                  Document 2
                </Label>
                <div className="relative">
                  <input
                    id="doc2"
                    type="file"
                    accept=".pdf,image/*"
                    className="hidden"
                    onChange={(e) =>
                      selectFile(2, e.target.files?.[0] ?? null, file1)
                    }
                  />
                  <label
                    htmlFor="doc2"
                    className={cn(
                      "flex items-center justify-center gap-2 h-11 w-full rounded-lg border-2 border-dashed transition-all cursor-pointer px-4",
                      file2
                        ? "border-accent bg-accent/10 dark:bg-accent/5"
                        : "border-border dark:border-white/20 bg-muted/50 dark:bg-white/5 hover:border-accent/50 hover:bg-accent/5 dark:hover:bg-accent/10",
                    )}
                  >
                    {file2 ? (
                      <>
                        <FileText className="w-4 h-4 text-accent flex-shrink-0" />
                        <span className="text-sm font-medium text-foreground dark:text-white truncate flex-1 text-left">
                          {file2.name}
                        </span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setFile2(null);
                            setFileError(null);
                            const input = document.getElementById(
                              "doc2",
                            ) as HTMLInputElement;
                            if (input) input.value = "";
                          }}
                          className="ml-2 p-1 hover:bg-destructive/10 rounded transition-colors flex-shrink-0"
                        >
                          <X className="w-4 h-4 text-destructive" />
                        </button>
                      </>
                    ) : (
                      <>
                        <Upload className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm font-medium text-muted-foreground dark:text-white/70">
                          Choose File
                        </span>
                      </>
                    )}
                  </label>
                </div>
                <p className="text-xs text-muted-foreground dark:text-white/60">
                  e.g. Tax returns, proof of income
                </p>
              </div>
            </div>
            <div className="p-4 rounded-xl bg-accent/10 dark:bg-accent/5 border border-accent/20 dark:border-accent/10">
              <p className="text-xs text-muted-foreground dark:text-white/80">
                <strong className="text-foreground dark:text-white">
                  Tip:
                </strong>{" "}
                Accepted formats include PDF files and images (JPG, PNG). Each
                file must be under {formatMb(MAX_FILE_BYTES)} (
                {formatMb(MAX_TOTAL_UPLOAD_BYTES)} combined). For large scans,
                compress the PDF or take a lower-resolution photo.
              </p>
            </div>
            {fileError && (
              <p className="text-sm text-destructive" role="alert">
                {fileError}
              </p>
            )}
          </motion.div>
        )}

        {/* Step 5: Legal */}
        {currentStep === 5 && (
          <motion.div
            key="step-5"
            custom={direction}
            initial={{ opacity: 0, x: direction === "forward" ? 50 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction === "forward" ? -50 : 50 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-lg font-semibold text-foreground dark:text-white mb-2 flex items-center gap-2">
                <Shield className="w-5 h-5 text-accent" />
                Final Review & Authorization
              </h3>
              <p className="text-sm text-muted-foreground dark:text-white/70">
                Review your information and complete the authorization
              </p>
            </div>
            <div className="space-y-1.5">
              <Label className="text-sm font-medium flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-muted-foreground" />
                Preferred Consultant <span className="text-destructive">*</span>
                {isFieldValid("consultant") && (
                  <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                )}
              </Label>
              <Select
                value={watch("consultant") ?? ""}
                onValueChange={async (v) => {
                  setValue("consultant", v, {
                    shouldValidate: true,
                    shouldTouch: true,
                  });
                  await trigger("consultant");
                }}
              >
                <SelectTrigger
                  className={cn(
                    errors.consultant
                      ? "border-destructive "
                      : isFieldValid("consultant")
                        ? "border-green-500 "
                        : "",
                  )}
                >
                  <SelectValue placeholder="Select your preferred consultant" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-black text-foreground dark:text-white boder border-border dark:border-white/10">
                  {CONSULTANT_OPTIONS.filter((o) => o.value).map((o) => (
                    <SelectItem key={o.value} value={o.value}>
                      {o.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground dark:text-white/60">
                Who would you like to work with?
              </p>
              {errors.consultant && (
                <p className="text-xs text-destructive mt-1">
                  {errors.consultant.message}
                </p>
              )}
            </div>
            <div className="rounded-xl border border-border dark:border-white/10 bg-muted/50 dark:bg-white/[0.02] p-5 text-sm text-muted-foreground dark:text-white/85 leading-relaxed">
              <p className="font-semibold text-foreground dark:text-white mb-2">
                Authorization & Agreement
              </p>
              <p>
                By submitting this form, you authorize Capital Motor Cars to
                obtain and use consumer reports and other information in
                connection with your application. You agree that this is a
                preliminary application and does not constitute a commitment to
                extend credit. A full credit check may be performed upon your
                consent. You certify that the information provided is true and
                complete.
              </p>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-xl border-2 border-border dark:border-white/10 bg-muted/30 dark:bg-white/[0.02]">
              <Checkbox
                id="legalAgree"
                checked={watch("legalAgree")}
                onCheckedChange={(checked) =>
                  setValue("legalAgree", checked === true)
                }
                className="border-border dark:border-white/30 data-[state=checked]:bg-accent data-[state=checked]:border-accent mt-0.5"
              />
              <div className="flex-1">
                <Label
                  htmlFor="legalAgree"
                  className="text-sm cursor-pointer flex items-center gap-1.5"
                >
                  I have read and agree to the authorization above{" "}
                  <span className="text-destructive">*</span>
                </Label>
              </div>
            </div>
            {errors.legalAgree && (
              <p className="text-xs text-destructive">
                {errors.legalAgree.message}
              </p>
            )}
            <div className="space-y-1.5">
              <Label
                htmlFor="signature"
                className="text-sm font-medium flex items-center gap-1.5"
              >
                <Lock className="w-3.5 h-3.5 text-muted-foreground" />
                Electronic Signature <span className="text-destructive">*</span>
                {isFieldValid("signature") && (
                  <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                )}
              </Label>
              <div className="relative">
                <Input
                  id="signature"
                  {...register("signature", {
                    onChange: () => trigger("signature"),
                    onBlur: () => trigger("signature"),
                  })}
                  placeholder="Type your full legal name as it appears on your ID"
                  className={cn(
                    errors.signature
                      ? "border-destructive pr-10"
                      : isFieldValid("signature")
                        ? "border-green-500 pr-10"
                        : "",
                  )}
                />
                {isFieldValid("signature") && !errors.signature && (
                  <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500 pointer-events-none" />
                )}
              </div>
              <p className="text-xs text-muted-foreground dark:text-white/60">
                This serves as your electronic signature
              </p>
              {errors.signature && (
                <p className="text-xs text-destructive mt-1 flex items-center gap-1">
                  <X className="w-3 h-3" /> {errors.signature.message}
                </p>
              )}
            </div>
            <div className="space-y-1.5">
              <Label
                htmlFor="signatureDate"
                className="text-sm font-medium flex items-center gap-1.5"
              >
                <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
                Date
              </Label>
              <Input
                id="signatureDate"
                type="date"
                {...register("signatureDate")}
                className={errors.signatureDate ? "border-destructive" : ""}
              />
              <p className="text-xs text-muted-foreground dark:text-white/60">
                Today&apos;s date will be automatically recorded when you submit
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {submitError && (
        <p className="text-sm text-destructive" role="alert">
          {submitError}
        </p>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between gap-4 pt-4 border-t border-border dark:border-white/10">
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
              "Apply for Credit"
            )}
          </Button>
        )}
      </div>
    </form>
  );
}
