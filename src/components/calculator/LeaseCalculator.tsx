import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Calculator, DollarSign, Zap, Info, Car } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { ContactForm } from '@/components/forms/ContactForm';
import { Mail } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { cn } from '@/lib/utils';

const TERM_OPTIONS = [24, 27, 30, 36, 39, 42, 48];
const MILEAGE_OPTIONS = [
  { value: 7500, label: '7.5k' },
  { value: 10000, label: '10k' },
  { value: 12000, label: '12k' },
  { value: 15000, label: '15k' },
];

function fmtDollar(n: number) {
  return '$' + Math.round(n).toLocaleString('en-US');
}

function fmtDecimal(n: number, places = 2) {
  return n.toLocaleString('en-US', { minimumFractionDigits: places, maximumFractionDigits: places });
}

export function LeaseCalculator() {
  const [searchParams] = useSearchParams();
  const make = searchParams.get('make');
  const model = searchParams.get('model');
  const initialMsrp = Number(searchParams.get('msrp')) || 50000;
  const initialPrice = Number(searchParams.get('price')) || initialMsrp * 0.96;

  const [isModalOpen, setIsModalOpen] = useState(false);
  // Vehicle
  const [msrp, setMsrp] = useState(initialMsrp);
  const [sellingPrice, setSellingPrice] = useState(initialPrice);

  // Terms
  const [months, setMonths] = useState(36);
  const [annualMiles, setAnnualMiles] = useState(12000);

  // Money
  const [mfInput, setMfInput] = useState('0.00175');
  const [moneyFactor, setMoneyFactor] = useState(0.00175);
  const [residualPercent, setResidualPercent] = useState(58);

  // Reductions
  const [downPayment, setDownPayment] = useState(0);
  const [tradeIn, setTradeIn] = useState(0);
  const [rebate, setRebate] = useState(0);

  // Fees
  const [acquisitionFee, setAcquisitionFee] = useState(895);
  const [rollAcqFee, setRollAcqFee] = useState(true);
  const [docFee, setDocFee] = useState(499);
  const [regFee, setRegFee] = useState(400);
  const [taxRate, setTaxRate] = useState(6.625);
  const [isEV, setIsEV] = useState(false);

  const effectiveTaxRate = isEV ? 0 : taxRate;

  const calc = useMemo(() => {
    const residualValue = msrp * (residualPercent / 100);

    // Gross cap cost: selling price + acquisition fee if rolled in
    const grossCapCost = sellingPrice + (rollAcqFee ? acquisitionFee : 0);

    // Adjusted (net) cap cost after all reductions
    const adjCapCost = Math.max(0, grossCapCost - downPayment - tradeIn - rebate);

    // Depreciation: what you pay for the portion you use
    const depreciation = months > 0 ? Math.max(0, (adjCapCost - residualValue) / months) : 0;

    // Finance charge: bank's interest on average balance
    const financeCharge = (adjCapCost + residualValue) * moneyFactor;

    // Base pre-tax payment
    const basePayment = depreciation + financeCharge;

    // NJ taxes on the monthly payment (0% for EV)
    const monthlyTax = basePayment * (effectiveTaxRate / 100);

    // Total monthly
    const totalMonthly = basePayment + monthlyTax;

    // Due at signing breakdown
    const acqFeeUpfront = rollAcqFee ? 0 : acquisitionFee;
    const totalDue = totalMonthly + downPayment + acqFeeUpfront + docFee + regFee;

    // Total cost of the lease (all money out of pocket)
    const totalLeaseCost = totalMonthly * months + downPayment + acqFeeUpfront + docFee + regFee;

    const aprEquivalent = moneyFactor * 2400;
    const discountPct = msrp > 0 ? ((msrp - sellingPrice) / msrp) * 100 : 0;
    const evTaxSavings = isEV ? (basePayment * (taxRate / 100)) * months : 0;

    return {
      residualValue,
      adjCapCost,
      depreciation,
      financeCharge,
      basePayment,
      monthlyTax,
      totalMonthly,
      acqFeeUpfront,
      totalDue,
      totalLeaseCost,
      aprEquivalent,
      discountPct,
      evTaxSavings,
    };
  }, [msrp, sellingPrice, months, moneyFactor, residualPercent, downPayment, tradeIn, rebate, acquisitionFee, rollAcqFee, docFee, regFee, effectiveTaxRate, isEV, taxRate]);

  return (
    <TooltipProvider delayDuration={100}>
      <div className="bg-card dark:bg-white/[0.02] border border-border/50 dark:border-white/10 rounded-3xl overflow-hidden shadow-2xl">
        <div className="grid lg:grid-cols-[1fr_320px]">

          {/* ── Inputs ── */}
          <div className="p-6 md:p-8 space-y-7 lg:border-r lg:border-border/30">

            {make && model && (
              <div className="bg-accent/10 border border-accent/20 rounded-2xl p-4 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                  <Car className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground">Calculating {make} {model}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">Customize your exact lease terms below.</p>
                </div>
              </div>
            )}

            {/* Vehicle */}
            <InputSection title="Vehicle">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FieldGroup label="MSRP" hint="Sticker price">
                  <MoneyInput value={msrp} onChange={setMsrp} />
                </FieldGroup>
                <FieldGroup
                  label="Selling Price"
                  hint={calc.discountPct > 0
                    ? `${fmtDecimal(calc.discountPct, 1)}% off MSRP`
                    : calc.discountPct < 0
                    ? `${fmtDecimal(Math.abs(calc.discountPct), 1)}% over MSRP`
                    : 'Equal to MSRP'
                  }
                  hintGreen={calc.discountPct > 0}
                  hintRed={calc.discountPct < 0}
                >
                  <MoneyInput value={sellingPrice} onChange={setSellingPrice} />
                </FieldGroup>
              </div>
            </InputSection>

            {/* Lease Terms */}
            <InputSection title="Lease Terms">
              <div className="space-y-4">
                <div>
                  <Label className="text-xs text-muted-foreground mb-2.5 block">Term (months)</Label>
                  <div className="flex flex-wrap gap-2">
                    {TERM_OPTIONS.map(t => (
                      <button
                        key={t}
                        onClick={() => setMonths(t)}
                        className={cn(
                          'px-3.5 py-1.5 rounded-lg text-sm font-semibold border transition-all',
                          months === t
                            ? 'bg-accent text-white border-accent shadow-sm'
                            : 'border-border/60 text-muted-foreground hover:border-accent/50 hover:text-foreground'
                        )}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground mb-2.5 block">Annual Mileage</Label>
                  <div className="flex flex-wrap gap-2">
                    {MILEAGE_OPTIONS.map(m => (
                      <button
                        key={m.value}
                        onClick={() => setAnnualMiles(m.value)}
                        className={cn(
                          'px-3.5 py-1.5 rounded-lg text-sm font-semibold border transition-all',
                          annualMiles === m.value
                            ? 'bg-accent text-white border-accent shadow-sm'
                            : 'border-border/60 text-muted-foreground hover:border-accent/50 hover:text-foreground'
                        )}
                      >
                        {m.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </InputSection>

            {/* Money Factor & Residual */}
            <InputSection title="Money Factor & Residual">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FieldGroup
                  label="Money Factor"
                  hint={`APR equivalent: ${fmtDecimal(calc.aprEquivalent, 2)}%`}
                  tooltip="The interest rate expressed as a small decimal. Multiply by 2,400 to get the equivalent APR. A lower number is better."
                >
                  <Input
                    type="number"
                    step="0.00001"
                    value={mfInput}
                    onChange={e => {
                      setMfInput(e.target.value);
                      const n = parseFloat(e.target.value);
                      if (!isNaN(n) && n >= 0) setMoneyFactor(n);
                    }}
                    className="h-11 bg-background/50 font-mono"
                  />
                </FieldGroup>
                <FieldGroup
                  label={`Residual: ${residualPercent}% = ${fmtDollar(calc.residualValue)}`}
                  tooltip="The percentage of MSRP the car is worth at lease end. Higher = lower monthly payment. Set by the bank, not negotiable."
                >
                  <div className="pt-2.5">
                    <Slider
                      value={[residualPercent]}
                      min={30}
                      max={75}
                      step={1}
                      onValueChange={([v]) => setResidualPercent(v)}
                      className="py-2"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>30%</span><span>75%</span>
                    </div>
                  </div>
                </FieldGroup>
              </div>
            </InputSection>

            {/* Cap Cost Reductions */}
            <InputSection title="Cap Cost Reductions" tooltip="These all reduce your adjusted cap cost, which directly lowers your monthly payment.">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <FieldGroup label="Down Payment">
                  <MoneyInput value={downPayment} onChange={setDownPayment} />
                </FieldGroup>
                <FieldGroup label="Trade-in Value">
                  <MoneyInput value={tradeIn} onChange={setTradeIn} />
                </FieldGroup>
                <FieldGroup label="Manufacturer Rebate">
                  <MoneyInput value={rebate} onChange={setRebate} />
                </FieldGroup>
              </div>
            </InputSection>

            {/* Fees & Tax */}
            <InputSection title="Fees & Tax">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FieldGroup
                  label="Acquisition Fee"
                  tooltip="Bank fee to initiate the lease. Usually $595 to $1,095 depending on brand. Toggle to roll it into your payment or pay upfront."
                >
                  <MoneyInput value={acquisitionFee} onChange={setAcquisitionFee} />
                  <label className="flex items-center gap-2 mt-2 cursor-pointer select-none">
                    <Switch checked={rollAcqFee} onCheckedChange={setRollAcqFee} />
                    <span className="text-xs text-muted-foreground">Roll into payment</span>
                  </label>
                </FieldGroup>

                <FieldGroup label="Doc Fee" tooltip="Dealer documentation fee. Typically $400 to $799 in NJ. Paid upfront, not rolled into the lease.">
                  <MoneyInput value={docFee} onChange={setDocFee} />
                </FieldGroup>

                <FieldGroup label="Registration / DMV" tooltip="NJ MVC registration and title transfer fees. Varies by vehicle value and county.">
                  <MoneyInput value={regFee} onChange={setRegFee} />
                </FieldGroup>

                <FieldGroup
                  label={isEV ? 'Sales Tax Rate (NJ EV: 0%)' : 'Sales Tax Rate'}
                  tooltip="NJ charges 6.625% on monthly lease payments. Fully electric vehicles are exempt from NJ sales tax, saving you hundreds over the lease term."
                >
                  <div className="relative">
                    <Input
                      type="number"
                      step="0.001"
                      value={isEV ? 0 : taxRate}
                      onChange={e => setTaxRate(Number(e.target.value))}
                      disabled={isEV}
                      className="pr-8 h-11 bg-background/50"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">%</span>
                  </div>
                  <label className="flex items-center gap-2 mt-2 cursor-pointer select-none">
                    <Switch checked={isEV} onCheckedChange={setIsEV} />
                    <span className={cn('text-xs flex items-center gap-1', isEV ? 'text-green-500 font-semibold' : 'text-muted-foreground')}>
                      <Zap className="w-3 h-3" />
                      Electric vehicle (NJ 0% tax)
                    </span>
                  </label>
                </FieldGroup>
              </div>
            </InputSection>
          </div>

          {/* ── Results ── */}
          <div className="p-6 md:p-8 bg-accent/5 dark:bg-white/[0.01] flex flex-col gap-5 lg:sticky lg:top-24 lg:self-start">

            {/* Main number */}
            <div className="text-center pb-5 border-b border-accent/10">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground mb-1">Monthly Payment</p>
              <p className="text-5xl font-black text-accent tracking-tight">{fmtDollar(calc.totalMonthly)}</p>
              <p className="text-xs text-muted-foreground mt-1.5">{months} months &bull; {(annualMiles / 1000).toFixed(1)}k mi/yr</p>
            </div>

            {/* Monthly breakdown */}
            <div>
              <SectionLabel>Monthly Breakdown</SectionLabel>
              <div className="space-y-2.5">
                <ResultRow label="Depreciation" value={fmtDollar(calc.depreciation)} tooltip="What you pay for using the car: (adj cap cost - residual) / months" />
                <ResultRow label="Finance charge" value={fmtDollar(calc.financeCharge)} tooltip="Bank interest: (adj cap cost + residual) x money factor" />
                <ResultRow
                  label={isEV ? 'Tax (EV exempt)' : `Tax (${fmtDecimal(effectiveTaxRate, 3)}%)`}
                  value={isEV ? '$0' : fmtDollar(calc.monthlyTax)}
                  green={isEV}
                />
              </div>
            </div>

            {/* Due at signing */}
            <div className="border-t border-border/30 pt-4">
              <SectionLabel>Due at Signing</SectionLabel>
              <div className="space-y-2">
                <ResultRow label="First month" value={fmtDollar(calc.totalMonthly)} />
                {downPayment > 0 && <ResultRow label="Down payment" value={fmtDollar(downPayment)} />}
                {calc.acqFeeUpfront > 0 && <ResultRow label="Acquisition fee" value={fmtDollar(calc.acqFeeUpfront)} />}
                <ResultRow label="Doc fee" value={fmtDollar(docFee)} />
                <ResultRow label="Registration" value={fmtDollar(regFee)} />
                <ResultRow label="Total due" value={fmtDollar(calc.totalDue)} bold />
              </div>
            </div>

            {/* Totals */}
            <div className="border-t border-border/30 pt-4 space-y-2">
              <ResultRow label="Total lease cost" value={fmtDollar(calc.totalLeaseCost)} bold tooltip={`All payments over ${months} months plus upfront costs`} />
              <ResultRow label="Effective APR" value={`${fmtDecimal(calc.aprEquivalent, 2)}%`} />
              {isEV && calc.evTaxSavings > 0 && (
                <div className="flex justify-between items-center text-sm text-green-600 dark:text-green-400 font-semibold mt-1 pt-1 border-t border-green-500/20">
                  <span className="flex items-center gap-1"><Zap className="w-3.5 h-3.5" /> NJ EV tax savings</span>
                  <span>{fmtDollar(calc.evTaxSavings)}</span>
                </div>
              )}
            </div>

            <div className="pt-4">
              <Button
                onClick={() => setIsModalOpen(true)}
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-black uppercase tracking-widest h-14 rounded-xl shadow-[0_10px_40px_-10px_rgba(59,130,246,0.5)]"
              >
                <Mail className="w-5 h-5 mr-2" />
                Send Me This Quote
              </Button>
            </div>

            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
              <DialogContent className="sm:max-w-[425px] rounded-[2rem] p-0 overflow-hidden bg-background border-border/10">
                <div className="bg-accent/5 p-6 border-b border-border/10 text-center">
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail className="w-6 h-6 text-accent" />
                  </div>
                  <DialogTitle className="text-2xl font-black uppercase tracking-tight text-foreground mb-2">
                    Save Your Quote
                  </DialogTitle>
                  <DialogDescription className="text-muted-foreground font-medium">
                    Enter your details below and one of our expert brokers will email you this exact breakdown of {fmtDollar(calc.totalMonthly)}/month with {fmtDollar(calc.totalDue)} due at signing to help you lock in this price.
                  </DialogDescription>
                </div>
                <div className="p-6">
                  <ContactForm 
                    source="contact"
                    initialValues={{ 
                      message: `Please send me the breakdown for my lease calculator quote${make && model ? ` for the ${make} ${model}` : ''}:\n\nMSRP: $${msrp}\nSelling Price: $${sellingPrice}\nTerm: ${months} months\nMiles: ${annualMiles}/yr\nMonthly: ${fmtDollar(calc.totalMonthly)}\nDue at Signing: ${fmtDollar(calc.totalDue)}`
                    }}
                    hideServiceField={true}
                    showVehicleField={false}
                    onSubmitSuccess={() => setIsModalOpen(false)}
                  />
                </div>
              </DialogContent>
            </Dialog>

            <div className="mt-auto p-3.5 bg-background/60 rounded-2xl border border-border/40">
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                Estimate only. Final payment depends on your credit tier, exact bank fees, and specific dealership terms. Get a real quote from us to see your actual number.
              </p>
            </div>
          </div>

        </div>
      </div>
    </TooltipProvider>
  );
}

// ── Sub-components ──────────────────────────────────────────────────

function InputSection({
  title,
  tooltip,
  children,
}: {
  title: string;
  tooltip?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-accent">{title}</span>
        {tooltip && <HintIcon text={tooltip} />}
      </div>
      {children}
    </div>
  );
}

function FieldGroup({
  label,
  hint,
  hintGreen,
  hintRed,
  tooltip,
  children,
}: {
  label: string;
  hint?: string;
  hintGreen?: boolean;
  hintRed?: boolean;
  tooltip?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-2">
        <Label className="flex items-center gap-1.5 text-sm font-medium">
          {label}
          {tooltip && <HintIcon text={tooltip} />}
        </Label>
        {hint && (
          <span className={cn('text-xs font-semibold', hintGreen ? 'text-green-500' : hintRed ? 'text-red-500' : 'text-muted-foreground')}>
            {hint}
          </span>
        )}
      </div>
      {children}
    </div>
  );
}

function MoneyInput({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  return (
    <div className="relative">
      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
      <Input
        type="number"
        value={value}
        onChange={e => onChange(Number(e.target.value))}
        className="pl-8 h-11 bg-background/50"
      />
    </div>
  );
}

function ResultRow({
  label,
  value,
  bold,
  green,
  tooltip,
}: {
  label: string;
  value: string;
  bold?: boolean;
  green?: boolean;
  tooltip?: string;
}) {
  return (
    <div className={cn('flex justify-between items-center text-sm', bold ? 'font-bold pt-1 border-t border-border/30' : '')}>
      <span className={cn('flex items-center gap-1.5', bold ? 'text-foreground' : 'text-muted-foreground')}>
        {label}
        {tooltip && <HintIcon text={tooltip} small />}
      </span>
      <span className={cn('font-mono', bold ? 'text-base text-foreground' : green ? 'text-green-500' : 'text-foreground')}>
        {value}
      </span>
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground mb-3">{children}</p>;
}

function HintIcon({ text, small }: { text: string; small?: boolean }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Info className={cn('text-muted-foreground/50 cursor-help hover:text-muted-foreground transition-colors', small ? 'w-3 h-3' : 'w-3.5 h-3.5')} />
      </TooltipTrigger>
      <TooltipContent className="max-w-[220px] text-xs leading-relaxed">{text}</TooltipContent>
    </Tooltip>
  );
}
