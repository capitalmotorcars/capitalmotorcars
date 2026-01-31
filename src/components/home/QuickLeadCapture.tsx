import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

const phoneRegex = /^[\d\s\-\+\(\)]{10,20}$/;

const quickLeadSchema = z.object({
  fullName: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().trim().email("Please enter a valid email address").max(255),
  phone: z.string().trim().regex(phoneRegex, "Please enter a valid phone number"),
  service: z.string().optional(),
});

type QuickLeadData = z.infer<typeof quickLeadSchema>;

const services = [
  { value: "leasing", label: "Car Leasing" },
  { value: "financing", label: "Financing & Credit" },
  { value: "trade-in", label: "Trade-In" },
  { value: "wear-tear", label: "Wear & Tear Repair" },
  { value: "wheel-repair", label: "Wheel & Tire Repair" },
  { value: "detailing", label: "Car Detailing" },
  { value: "other", label: "Other" },
];

export function QuickLeadCapture() {
  const navigate = useNavigate();
  const [data, setData] = useState<QuickLeadData>({ fullName: "", email: "", phone: "", service: undefined });
  const [errors, setErrors] = useState<Partial<Record<keyof QuickLeadData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const serviceLabel = useMemo(() => {
    if (!data.service) return undefined;
    return services.find((s) => s.value === data.service)?.label;
  }, [data.service]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const parsed = quickLeadSchema.safeParse(data);
    if (!parsed.success) {
      const nextErrors: Partial<Record<keyof QuickLeadData, string>> = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof QuickLeadData;
        nextErrors[key] = issue.message;
      }
      setErrors(nextErrors);
      setIsSubmitting(false);
      return;
    }

    setErrors({});

    const params = new URLSearchParams();
    params.set("fullName", parsed.data.fullName);
    params.set("email", parsed.data.email);
    params.set("phone", parsed.data.phone);
    if (parsed.data.service) params.set("service", parsed.data.service);
    // Help the contact form user by prefilling a short message skeleton.
    params.set(
      "message",
      `Hi Capital Motor Cars, I'm interested in ${serviceLabel ?? "your services"}. Please contact me.`
    );

    navigate(`/contact?${params.toString()}`);
    setIsSubmitting(false);
  };

  return (
    <section className="py-14 md:py-16 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">Get a call back</h2>
              <p className="mt-2 text-muted-foreground">
                Leave your details and we will reach out with next steps. No dealership runaround.
              </p>
            </div>

            <form
              onSubmit={onSubmit}
              className={cn(
                "bg-muted border border-border rounded-lg p-5 md:p-6",
                "grid gap-4"
              )}
            >
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="quickLeadFullName">Full Name *</Label>
                  <Input
                    id="quickLeadFullName"
                    value={data.fullName}
                    onChange={(e) => setData((s) => ({ ...s, fullName: e.target.value }))}
                    placeholder="John Smith"
                    className={errors.fullName ? "border-destructive" : ""}
                    autoComplete="name"
                  />
                  {errors.fullName ? <p className="text-sm text-destructive">{errors.fullName}</p> : null}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="quickLeadEmail">Email *</Label>
                  <Input
                    id="quickLeadEmail"
                    type="email"
                    value={data.email}
                    onChange={(e) => setData((s) => ({ ...s, email: e.target.value }))}
                    placeholder="john@example.com"
                    className={errors.email ? "border-destructive" : ""}
                    autoComplete="email"
                    inputMode="email"
                  />
                  {errors.email ? <p className="text-sm text-destructive">{errors.email}</p> : null}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="quickLeadPhone">Phone *</Label>
                  <Input
                    id="quickLeadPhone"
                    value={data.phone}
                    onChange={(e) => setData((s) => ({ ...s, phone: e.target.value }))}
                    placeholder="(555) 123-4567"
                    className={errors.phone ? "border-destructive" : ""}
                    autoComplete="tel"
                    inputMode="tel"
                  />
                  {errors.phone ? <p className="text-sm text-destructive">{errors.phone}</p> : null}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="quickLeadService">Service of Interest</Label>
                <Select
                  value={data.service}
                  onValueChange={(value) => setData((s) => ({ ...s, service: value }))}
                >
                  <SelectTrigger id="quickLeadService">
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

              <Button type="submit" disabled={isSubmitting} className="w-full bg-accent hover:bg-accent/90">
                Request a Call
              </Button>
              <p className="text-xs text-muted-foreground">
                By submitting, you agree we may contact you about your request.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
