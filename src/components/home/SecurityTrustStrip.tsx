import { Link } from 'react-router-dom';
import { Globe } from 'lucide-react';
import { cn } from '@/lib/utils';

const trustBadges = [
  {
    src: '/ssl-badge.png',
    alt: 'SSL secured — encrypted connection',
    line: 'SSL encryption',
    caption: 'HTTPS sitewide',
  },
  {
    src: '/privacy%20badge.png',
    alt: 'Privacy protected — your data handled responsibly',
    line: 'Privacy commitment',
    caption: 'Responsible data handling',
    renderWhite: true,
  },
  {
    src: '/ddos-badge.png',
    alt: 'DDoS protection — resilient hosting',
    line: 'DDoS protection',
    caption: 'Hardened edge network',
    renderWhite: true,
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

          {/* Trust badges (assets in /public) */}
          <div className="flex min-h-0 flex-1 flex-col">
            <div className="grid flex-1 grid-cols-1 sm:grid-cols-3">
              {trustBadges.map((item, index) => (
                <div
                  key={item.src}
                  className={cn(
                    'flex flex-col items-center justify-center px-4 py-10 sm:px-5 sm:py-12',
                    index > 0 && 'border-t border-border/50 sm:border-t-0 sm:border-l sm:border-border/50',
                  )}
                >
                  <div
                    className={cn(
                      'mb-4 flex w-full max-w-[200px] items-center justify-center sm:max-w-[220px]',
                      'renderWhite' in item &&
                        item.renderWhite &&
                        'rounded-xl bg-zinc-950 px-4 py-3 ring-1 ring-zinc-800/90 dark:bg-zinc-900/95 dark:ring-zinc-700/80',
                    )}
                  >
                    <img
                      src={item.src}
                      alt={item.alt}
                      className={cn(
                        'h-auto max-h-24 w-full object-contain sm:max-h-28',
                        'renderWhite' in item && item.renderWhite && 'brightness-0 invert',
                      )}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <span className="text-center text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground sm:text-[11px] sm:tracking-[0.2em]">
                    {item.line}
                  </span>
                  <span className="mt-1 text-center text-[10px] text-muted-foreground/80">{item.caption}</span>
                </div>
              ))}
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
