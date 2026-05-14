import { cn } from '@/lib/utils';

/** Filenames in /public (see also trust-assurance-badge.png). */
export const TRUST_BADGES = [
  {
    src: '/ssl-secure-badge.png',
    alt: 'SSL secured: encrypted connection',
    line: 'SSL encryption',
    caption: 'HTTPS sitewide',
  },
  {
    src: '/encryption-badge.png',
    alt: 'Strong encryption for your data',
    line: 'Data encryption',
    caption: 'Protected in transit and at rest',
  },
  {
    src: '/privacy-protection.png',
    alt: 'Privacy protected: your information handled responsibly',
    line: 'Privacy protection',
    caption: 'Responsible data handling',
  },
  {
    src: '/dodos-badge.png',
    alt: 'DDoS protection: resilient hosting',
    line: 'DDoS protection',
    caption: 'Hardened edge network',
  },
  {
    src: '/trust-assurance-badge.png',
    alt: 'Security and trust commitment',
    line: 'Trust standards',
    caption: 'Aligned with industry expectations',
  },
] as const;

type TrustBadgesGridProps = {
  /** `surface`: home strip. `hero`: dark gradient hero on data-security page. */
  variant?: 'surface' | 'hero';
  /** `strip`: full-width comfortable grid for home section. `default`: hero / compact. */
  layout?: 'default' | 'strip';
  className?: string;
};

export function TrustBadgesGrid({
  variant = 'surface',
  layout = 'default',
  className,
}: TrustBadgesGridProps) {
  const onHero = variant === 'hero';
  const isStrip = layout === 'strip' && !onHero;

  const cellPad = onHero
    ? 'px-3 py-5 sm:px-4 sm:py-7'
    : isStrip
      ? 'px-2 py-6 sm:px-3 sm:py-8 lg:px-2 lg:py-6 xl:px-3'
      : 'px-3 py-8 sm:px-4 sm:py-10';

  return (
    <div
      className={cn(
        'grid',
        isStrip
          ? 'grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-5 lg:gap-x-4 lg:gap-y-6 xl:gap-x-8'
          : 'grid-cols-2 gap-x-2 gap-y-8 sm:grid-cols-3 sm:gap-x-4 lg:grid-cols-5 lg:gap-x-3',
        className,
      )}
      role="list"
      aria-label="Security and trust badges"
    >
      {TRUST_BADGES.map((item) => (
        <div
          key={item.src}
          role="listitem"
          className={cn('flex flex-col items-center justify-center text-center', cellPad)}
        >
          <div
            className={cn(
              'mb-4 flex w-full items-center justify-center',
              isStrip
                ? 'max-w-[200px] sm:max-w-[220px] lg:max-w-none lg:px-1 xl:max-w-[200px]'
                : 'max-w-[190px] sm:max-w-[210px] lg:max-w-[185px]',
            )}
          >
            <img
              src={item.src}
              alt={item.alt}
              className={cn(
                'h-auto w-full object-contain',
                isStrip
                  ? 'max-h-[5.75rem] sm:max-h-28 lg:max-h-[7rem] xl:max-h-32'
                  : 'max-h-[5.5rem] sm:max-h-28 lg:max-h-32',
              )}
              loading="lazy"
              decoding="async"
            />
          </div>
          <span
            className={cn(
              'text-center text-xs font-semibold leading-tight sm:text-sm',
              onHero ? 'text-white' : 'text-foreground',
            )}
          >
            {item.line}
          </span>
          <span
            className={cn(
              'mt-1.5 max-w-[11rem] text-center text-[10px] leading-snug sm:max-w-[12rem] sm:text-xs',
              isStrip && 'lg:max-w-[11rem]',
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
