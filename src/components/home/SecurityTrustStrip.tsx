import { Link } from 'react-router-dom';
import { ArrowRight, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TrustBadgesGrid } from '@/components/security/TrustBadgesGrid';

const trustMeta = [
  'Encrypted transit',
  'Secure forms',
  'Broker discretion',
] as const;

/** Trust + security strip after hero. Desktop: headline + CTA row, then full-width badge band, then meta rail. */
export function SecurityTrustStrip() {
  return (
    <section
      className="border-y border-border/60 bg-background"
      aria-labelledby="security-trust-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Top: headline + intro + CTA (balanced on large screens) */}
        <div className="flex flex-col gap-8 border-b border-border/50 py-10 lg:flex-row lg:items-start lg:justify-between lg:gap-12 lg:py-12 xl:gap-16">
          <div className="min-w-0 lg:max-w-xl lg:flex-1">
            <h2
              id="security-trust-heading"
              className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl md:text-[1.85rem] md:leading-snug"
            >
              <span className="text-foreground">Your information,</span>
              <br />
              <span className="font-normal text-muted-foreground">handled with care.</span>
            </h2>
            <p className="mt-4 max-w-prose text-sm leading-relaxed text-muted-foreground sm:text-[15px] sm:leading-relaxed">
              Endtoend encryption for your data.
            </p>
          </div>

          <div className="w-full shrink-0 rounded-xl border border-border/80 bg-muted/30 p-5 sm:p-6 lg:max-w-[22rem] lg:self-stretch lg:border-border/60">
            <p className="text-sm font-semibold leading-snug text-foreground">How we protect your data</p>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
              Encryption in transit, secure uploads, access controls, and what we tell lenders: all in one place.
            </p>
            <Button asChild variant="default" size="sm" className="mt-5 w-full gap-2 sm:w-auto">
              <Link to="/credit-application/data-security">
                Read the security overview
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </Button>
          </div>
        </div>

        {/* Badges: full content width so tiles are not squeezed beside copy */}
        <div className="min-w-0 border-b border-border/40 bg-muted/[0.12] py-10 sm:py-12 lg:rounded-2xl lg:border lg:border-border/50 lg:px-8 lg:py-12 xl:px-10 xl:py-14 dark:bg-white/[0.02]">
          <TrustBadgesGrid variant="surface" layout="strip" />
        </div>

        {/* Meta rail: single aligned row on desktop */}
        <div className="flex flex-col items-stretch gap-4 border-t border-border/40 py-6 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:py-7">
          <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
            <Globe className="h-4 w-4 shrink-0 opacity-70" aria-hidden />
            Serving NJ &amp; NY
          </div>
          <ul className="flex flex-wrap items-center gap-x-1 gap-y-2 text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground sm:justify-end">
            {trustMeta.map((label, i) => (
              <li key={label} className="flex items-center gap-x-1">
                {i > 0 && (
                  <span className="select-none px-1.5 text-border" aria-hidden>
                    ·
                  </span>
                )}
                <span>{label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
