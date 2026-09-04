import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShieldCheck, Sparkles, CarFront, ArrowRight, Phone, CheckCircle2 } from 'lucide-react';

interface RepairToLeaseCtaProps {
  vehicleModel?: string;
  className?: string;
}

export function RepairToLeaseCta({ vehicleModel, className = '' }: RepairToLeaseCtaProps) {
  const modelText = vehicleModel ? `your ${vehicleModel}` : 'your current car';

  return (
    <aside
      aria-label="Trade In and Lease Upgrade Special"
      className={`my-12 overflow-hidden rounded-3xl border-2 border-accent/30 bg-gradient-to-br from-card via-accent/[0.05] to-card p-6 sm:p-8 md:p-10 shadow-xl relative ${className}`}
    >
      {/* Decorative top accent pill */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-accent text-accent-foreground shadow-sm">
          <Sparkles className="w-3.5 h-3.5" />
          Smart Ownership Upgrade
        </span>
        <span className="inline-flex items-center gap-1 text-xs font-semibold text-muted-foreground bg-muted/50 px-3 py-1 rounded-full">
          <ShieldCheck className="w-3.5 h-3.5 text-accent" />
          100% Bumper-to-Bumper Warranty
        </span>
      </div>

      {/* Main Headline */}
      <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-foreground leading-snug">
        Tired of Repair Bills &amp; Mechanical Headaches?
      </h3>

      <p className="mt-3 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-3xl">
        Don&apos;t pour thousands into aging parts, brake overhauls, or transmission diagnostics. Trade in {modelText} at top market value—even with existing squeaks or issues—and drive a brand-new 2026 vehicle with <strong>$0 down</strong> and <strong>complete factory warranty coverage</strong>.
      </p>

      {/* Value prop matrix */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-sm text-foreground">
        <div className="flex items-start gap-2.5 p-3 rounded-xl bg-background/60 border border-accent/10">
          <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
          <span><strong>We Buy Problem Cars:</strong> Get top dollar trade-in credit regardless of warning lights, squeaks, or wear.</span>
        </div>
        <div className="flex items-start gap-2.5 p-3 rounded-xl bg-background/60 border border-accent/10">
          <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
          <span><strong>$0 Out-of-Pocket Maintenance:</strong> 36 months of bumper-to-bumper manufacturer warranty protection.</span>
        </div>
        <div className="flex items-start gap-2.5 p-3 rounded-xl bg-background/60 border border-accent/10">
          <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
          <span><strong>Wholesale Fleet Pricing:</strong> Pre-negotiated fleet discounts saving you $1,500 to $4,000 off dealer MSRP.</span>
        </div>
        <div className="flex items-start gap-2.5 p-3 rounded-xl bg-background/60 border border-accent/10">
          <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
          <span><strong>Free White-Glove Delivery:</strong> Delivered straight to your driveway across NJ, NYC, and the Tri-State area.</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
        <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-black px-6 py-6 rounded-xl shadow-lg hover:shadow-accent/20 transition-all text-base">
          <Link to="/trade-in-value" className="inline-flex items-center justify-center gap-2">
            Value Your Trade-In &amp; Get Lease Quote
            <ArrowRight className="w-5 h-5" />
          </Link>
        </Button>

        <Button asChild variant="outline" size="lg" className="border-accent/30 text-foreground hover:bg-accent/10 font-bold px-6 py-6 rounded-xl text-base">
          <Link to="/car-lease-deals-new-jersey" className="inline-flex items-center justify-center gap-2">
            <CarFront className="w-5 h-5 text-accent" />
            Browse NJ Lease Specials
          </Link>
        </Button>

        <a
          href="tel:12015095555"
          className="inline-flex items-center justify-center gap-2 text-sm font-bold text-muted-foreground hover:text-accent transition-colors py-2 px-3 text-center"
        >
          <Phone className="w-4 h-4 text-accent" />
          (201) 509-5555
        </a>
      </div>
    </aside>
  );
}
