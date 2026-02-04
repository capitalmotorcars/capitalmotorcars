import { cn } from '@/lib/utils';

type DividerVariant = 'diagonal' | 'curved' | 'wave';

interface SectionDividerProps {
  variant?: DividerVariant;
  className?: string;
  /** Next section background (e.g. dark) for the fill */
  nextSectionDark?: boolean;
}

export function SectionDivider({
  variant = 'curved',
  className,
  nextSectionDark = true,
}: SectionDividerProps) {
  const fillLight = 'hsl(216 33% 97%)';
  const fillStyle = nextSectionDark
    ? { background: 'linear-gradient(to bottom right, transparent 49.5%, hsl(var(--section-divider-fill)) 50%)' as const }
    : { background: `linear-gradient(to bottom right, transparent 49.5%, ${fillLight} 50%)` };

  if (variant === 'diagonal') {
    return (
      <div
        className={cn('relative h-16 w-full shrink-0', className)}
        aria-hidden
      >
        <div className="absolute inset-0 w-full" style={fillStyle} />
      </div>
    );
  }

  if (variant === 'wave') {
    return (
      <div className={cn('relative h-12 w-full shrink-0 overflow-hidden', className)} aria-hidden>
        <svg className="absolute bottom-0 w-full" viewBox="0 0 1440 60" preserveAspectRatio="none">
          <path
            d="M0 60V35c240 0 480-25 720-25s480 25 720 25V60z"
            fill={nextSectionDark ? undefined : fillLight}
            style={nextSectionDark ? { fill: 'hsl(var(--section-divider-fill))' } : undefined}
          />
        </svg>
      </div>
    );
  }

  /* curved — theme-aware fill via CSS variable */
  return (
    <div className={cn('relative h-10 w-full shrink-0 overflow-hidden', className)} aria-hidden>
      <svg className="absolute bottom-0 w-full" viewBox="0 0 1440 60" preserveAspectRatio="none">
        {/* <path
          fill={nextSectionDark ? undefined : fill}
          style={nextSectionDark ? { fill: 'hsl(var(--section-divider-fill))' } : undefined}
          d="M0 60V30c360 0 720-30 1440-30V60z"
        /> */}
      </svg>
    </div>
  );
}
