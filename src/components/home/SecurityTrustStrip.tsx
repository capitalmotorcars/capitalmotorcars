import { Link } from 'react-router-dom';
import { ArrowRight, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TrustBadgesGrid } from '@/components/security/TrustBadgesGrid';

/** Minimal trust strip after hero — monochrome, reference-inspired layout. */
export function SecurityTrustStrip() {
  return (
    <section
      className="border-y border-border/60 bg-background"
      aria-labelledby="security-trust-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-stretch">
          {/* Copy block */}
          <div className="flex flex-col justify-center border-b border-border/50 py-10 lg:w-[40%] lg:border-b-0 lg:border-r lg:py-14 lg:pr-10 xl:pr-14">
            <h2
              id="security-trust-heading"
              className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl md:text-[1.75rem] md:leading-snug"
            >
              <span className="text-foreground">Your information,</span>
              <br />
              <span className="font-normal text-muted-foreground">handled with care.</span>
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-[15px] sm:leading-relaxed">
              Credit and contact flows use encrypted connections and secure processing—so you can apply with
              confidence from New Jersey or New York.
            </p>
            <div className="mt-7 rounded-xl border border-border/80 bg-muted/30 p-4 sm:p-5">
              <p className="text-sm font-medium leading-snug text-foreground">
                How we protect your data
              </p>
              <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                Encryption in transit, secure uploads, access controls, and what we tell lenders—all in one place.
              </p>
              <Button asChild variant="default" size="sm" className="mt-4 w-full gap-2 sm:w-auto">
                <Link to="/credit-application/data-security">
                  Read the security overview
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </Button>
            </div>
          </div>

          {/* Trust badges (assets in /public) */}
          <div className="flex min-h-0 flex-1 flex-col">
            <TrustBadgesGrid variant="surface" />

            {/* Footer rail */}
            <div className="flex flex-col gap-3 border-t border-border/50 px-4 py-3.5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
              <div className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
                <Globe className="h-3.5 w-3.5 shrink-0 opacity-70" aria-hidden />
                Serving NJ &amp; NY
              </div>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground sm:justify-end sm:gap-x-8 sm:tracking-[0.2em]">
                <span>Encrypted transit</span>
                <span className="hidden sm:inline">·</span>
                <span>Secure forms</span>
                <span className="hidden sm:inline">·</span>
                <span>Broker discretion</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
