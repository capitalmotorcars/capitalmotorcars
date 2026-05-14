import { cn } from '@/lib/utils';

export const TRUST_BADGES = [
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

type TrustBadgesGridProps = {
  /** `surface`: light/dark page backgrounds (matches SecurityTrustStrip). `hero`: dark gradient hero (white labels, inverted monochrome marks). */
  variant?: 'surface' | 'hero';
  className?: string;
};

export function TrustBadgesGrid({ variant = 'surface', className }: TrustBadgesGridProps) {
  const onHero = variant === 'hero';
  const cellPad = onHero ? 'px-5 py-6 sm:px-6 sm:py-8' : 'px-5 py-10 sm:px-6 sm:py-12';

  return (
    <div
      className={cn('grid grid-cols-1 sm:grid-cols-3', className)}
      role="list"
      aria-label="Security and trust badges"
    >
      {TRUST_BADGES.map((item, index) => (
        <div
          key={item.src}
          role="listitem"
          className={cn(
            'flex flex-col items-center justify-center',
            cellPad,
            index > 0 &&
              (onHero
                ? 'border-t border-white/15 sm:border-t-0 sm:border-l sm:border-white/15'
                : 'border-t border-border/40 sm:border-t-0 sm:border-l sm:border-border/40'),
          )}
        >
          <div className="mb-5 flex w-full max-w-[200px] items-center justify-center sm:max-w-[220px]">
            <img
              src={item.src}
              alt={item.alt}
              className={cn(
                'h-auto max-h-[5.5rem] w-full object-contain sm:max-h-28',
                'renderWhite' in item &&
                  item.renderWhite &&
                  (onHero ? 'brightness-0 invert' : 'dark:brightness-0 dark:invert'),
              )}
              loading="lazy"
              decoding="async"
            />
          </div>
          <span
            className={cn(
              'text-center text-sm font-semibold',
              onHero ? 'text-white' : 'text-foreground',
            )}
          >
            {item.line}
          </span>
          <span
            className={cn(
              'mt-1.5 max-w-[14rem] text-center text-xs leading-snug',
              onHero ? 'text-white/75' : 'text-muted-foreground',
            )}
          >
            {item.caption}
          </span>
        </div>
      ))}
    </div>
  );
}
