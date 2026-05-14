import { Link } from 'react-router-dom';
import { BadgeCheck, Globe, Lock, Server, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';

const badges = [
  {
    icon: Lock,
    line: 'TLS encryption',
    caption: 'HTTPS sitewide',
  },
  {
    icon: Shield,
    line: 'Secure applications',
    caption: 'Protected in transit',
  },
  {
    icon: Server,
    line: 'Controlled handoff',
    caption: 'Server-side routing',
  },
  {
    icon: BadgeCheck,
    line: 'Industry standards',
    caption: 'Modern web security',
  },
] as const;

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
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Credit and contact flows use encrypted connections and secure processing—so you can apply with
              confidence from New Jersey or New York.
            </p>
            <Link
              to="/credit-application/data-security"
              className="mt-5 inline-flex w-fit text-[11px] font-medium uppercase tracking-[0.22em] text-foreground underline-offset-4 transition-colors hover:text-muted-foreground hover:underline"
            >
              How we protect your data
            </Link>
          </div>

          {/* Badges row */}
          <div className="flex min-h-0 flex-1 flex-col">
            <div className="grid flex-1 grid-cols-2 sm:grid-cols-4">
              {badges.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.line}
                    className={cn(
                      'flex flex-col items-center justify-center px-3 py-9 sm:px-4 sm:py-11',
                      index % 2 === 1 && 'border-l border-border/50',
                      index >= 2 && 'border-t border-border/50 sm:border-t-0',
                      index > 0 && 'sm:border-l sm:border-border/50',
                    )}
                  >
                    <div
                      className="mb-3 flex h-[52px] w-[52px] items-center justify-center rounded-full border border-border/70 text-foreground/85"
                      aria-hidden
                    >
                      <Icon className="h-5 w-5" strokeWidth={1.35} />
                    </div>
                    <span className="text-center text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground sm:text-[11px] sm:tracking-[0.2em]">
                      {item.line}
                    </span>
                    <span className="mt-1 text-center text-[10px] text-muted-foreground/80">
                      {item.caption}
                    </span>
                  </div>
                );
              })}
            </div>

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
