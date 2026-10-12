import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CheckCircle2, Gift, Loader2, Phone, Sparkles, Tag } from 'lucide-react';
import { WEBHOOK_CONTACT_PATH } from '@/lib/webhook';

const formatPhoneNumber = (value: string) => {
  const digits = value.replace(/\D/g, '');
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
};

interface EventLeadModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const INTENT_OPTIONS = [
  { value: 'Looking to lease/finance', label: 'Looking to lease / finance' },
  { value: 'Just checking out options', label: 'Just checking out options' },
  { value: 'Get out of current lease', label: 'Get out of current lease' },
  { value: 'Other', label: 'Other' },
];

export function EventLeadModal({ open, onOpenChange }: EventLeadModalProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [intent, setIntent] = useState('');
  const [otherNotes, setOtherNotes] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const resetForm = () => {
    setName('');
    setPhone('');
    setEmail('');
    setIntent('');
    setOtherNotes('');
    setIsSubmitting(false);
    setIsSuccess(false);
    setErrorMessage(null);
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      setTimeout(resetForm, 300);
    }
    onOpenChange(newOpen);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(formatPhoneNumber(e.target.value));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const cleanName = name.trim();
    const cleanPhone = phone.trim();
    const cleanEmail = email.trim();

    if (!cleanName) {
      setErrorMessage('Please enter your name.');
      return;
    }
    if (!cleanPhone || cleanPhone.replace(/\D/g, '').length < 10) {
      setErrorMessage('Please enter a valid 10-digit phone number.');
      return;
    }
    if (!cleanEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    if (!intent) {
      setErrorMessage('Please select what you are looking to do.');
      return;
    }

    setIsSubmitting(true);

    try {
      const messageContent = [
        `Event Lead: Claimed $500 Discount Voucher (Promo: CMC-EVENT500)`,
        `Goal / Intent: ${intent}`,
        intent === 'Other' && otherNotes.trim() ? `Additional Details: ${otherNotes.trim()}` : '',
      ]
        .filter(Boolean)
        .join(' | ');

      const payload = {
        Type: 'Event Lead ($500 Voucher)',
        Source: 'event_qr',
        Name: cleanName,
        Phone: cleanPhone,
        Email: cleanEmail,
        Service: 'Event Promotion ($500 Discount)',
        Vehicle: intent,
        Intent: intent,
        OtherDetails: otherNotes.trim() || undefined,
        PromoCode: 'CMC-EVENT500',
        DiscountAmount: '$500',
        Message: messageContent,
      };

      const res = await fetch(WEBHOOK_CONTACT_PATH, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}));
        throw new Error(errJson.error || errJson.message || 'Submission failed. Please try again.');
      }

      setIsSuccess(true);
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'Unable to submit at this time. Please call us at (201) 509-5555.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[520px] max-h-[92vh] overflow-y-auto p-6 md:p-8 rounded-3xl border border-border/60 bg-background shadow-2xl">
        {!isSuccess ? (
          <>
            <DialogHeader className="text-left space-y-3">
              {/* Event Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-bold uppercase tracking-wider w-fit">
                <Tag className="w-3.5 h-3.5" />
                <span>In-Person Event Exclusive • $500 Voucher</span>
              </div>

              <DialogTitle className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-foreground flex items-center gap-2">
                <span>Claim Your $500 Discount</span>
              </DialogTitle>

              <DialogDescription className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                Thank you for visiting us! Fill out your details below to activate your <strong className="text-foreground">$500 discount voucher</strong> valid on any car lease or purchase.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              {errorMessage && (
                <div className="p-3.5 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm font-medium">
                  {errorMessage}
                </div>
              )}

              {/* Full Name */}
              <div className="space-y-1.5">
                <Label htmlFor="event-name" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Your Full Name <span className="text-accent">*</span>
                </Label>
                <Input
                  id="event-name"
                  type="text"
                  placeholder="e.g. John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={isSubmitting}
                  className="h-12 rounded-xl bg-muted/40 border-border/60 focus:border-accent text-foreground"
                  required
                />
              </div>

              {/* Phone & Email Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="space-y-1.5">
                  <Label htmlFor="event-phone" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Phone Number <span className="text-accent">*</span>
                  </Label>
                  <Input
                    id="event-phone"
                    type="tel"
                    placeholder="(201) 555-0199"
                    value={phone}
                    onChange={handlePhoneChange}
                    disabled={isSubmitting}
                    className="h-12 rounded-xl bg-muted/40 border-border/60 focus:border-accent text-foreground"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="event-email" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Email Address <span className="text-accent">*</span>
                  </Label>
                  <Input
                    id="event-email"
                    type="email"
                    placeholder="john@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isSubmitting}
                    className="h-12 rounded-xl bg-muted/40 border-border/60 focus:border-accent text-foreground"
                    required
                  />
                </div>
              </div>

              {/* Dropdown: What are you looking to do? */}
              <div className="space-y-1.5">
                <Label htmlFor="event-intent" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  What are you looking to do? <span className="text-accent">*</span>
                </Label>
                <Select value={intent} onValueChange={setIntent} disabled={isSubmitting}>
                  <SelectTrigger id="event-intent" className="h-12 rounded-xl bg-muted/40 border-border/60 focus:border-accent text-foreground">
                    <SelectValue placeholder="Choose an option..." />
                  </SelectTrigger>
                  <SelectContent>
                    {INTENT_OPTIONS.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Conditional Other Textbox */}
              {intent === 'Other' && (
                <div className="space-y-1.5 animate-in fade-in-50 duration-200">
                  <Label htmlFor="event-other-notes" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Please specify your requirements
                  </Label>
                  <Textarea
                    id="event-other-notes"
                    placeholder="Tell us what vehicle or service you are interested in..."
                    value={otherNotes}
                    onChange={(e) => setOtherNotes(e.target.value)}
                    disabled={isSubmitting}
                    rows={3}
                    className="rounded-xl bg-muted/40 border-border/60 focus:border-accent text-foreground resize-none"
                  />
                </div>
              )}

              {/* Auto-applied promo notice */}
              <div className="p-3 rounded-xl bg-muted/30 border border-border/40 flex items-center gap-2.5 text-xs text-muted-foreground">
                <Sparkles className="w-4 h-4 text-accent shrink-0" />
                <span>
                  <strong>Promo Code CMC-EVENT500</strong> will be automatically credited to your phone and email.
                </span>
              </div>

              {/* Submit CTA */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-14 rounded-2xl bg-accent hover:bg-accent/90 text-white font-bold text-base shadow-lg shadow-accent/25 uppercase tracking-wider flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Activating Voucher...</span>
                  </>
                ) : (
                  <>
                    <Gift className="w-5 h-5" />
                    <span>Claim My $500 Voucher</span>
                  </>
                )}
              </Button>

              {/* Alternative Call Link */}
              <div className="text-center pt-2">
                <p className="text-xs text-muted-foreground">
                  Prefer to talk now?{' '}
                  <a
                    href="tel:+12015095555"
                    className="text-accent font-bold hover:underline inline-flex items-center gap-1"
                  >
                    <Phone className="w-3 h-3" /> Call (201) 509-5555
                  </a>
                </p>
              </div>
            </form>
          </>
        ) : (
          /* Success Screen */
          <div className="py-6 text-center space-y-5 animate-in fade-in-50 duration-300">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border-2 border-emerald-500/30 text-emerald-500 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-500">
                Voucher Activated Successfully
              </span>
              <h3 className="text-2xl sm:text-3xl font-black uppercase text-foreground">
                You’re All Set, {name.split(' ')[0]}!
              </h3>
              <p className="text-sm text-muted-foreground max-w-sm mx-auto leading-relaxed">
                Your $500 discount voucher has been locked in. One of our auto specialists will reach out shortly to help you apply it to your dream vehicle.
              </p>
            </div>

            {/* Voucher Card */}
            <div className="p-4 rounded-2xl bg-muted/40 border-2 border-dashed border-accent/40 max-w-sm mx-auto">
              <div className="text-xs uppercase tracking-widest text-muted-foreground mb-1">
                Your Exclusive Voucher Code
              </div>
              <div className="text-2xl font-black tracking-widest text-accent font-mono">
                CMC-EVENT500
              </div>
              <div className="text-[11px] text-muted-foreground mt-1">
                Value: $500 Off Any Lease or Finance
              </div>
            </div>

            {/* Actions */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="tel:+12015095555"
                className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-xl bg-accent text-white font-bold text-sm shadow-md hover:bg-accent/90 transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>Call (201) 509-5555</span>
              </a>
              <Button
                variant="outline"
                onClick={() => handleOpenChange(false)}
                className="h-12 px-6 rounded-xl font-bold text-sm"
              >
                Close & Browse Deals
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
