import { useId } from 'react';
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
  const gradientId = useId();
  const fill = nextSectionDark ? 'hsl(0 0% 3%)' : 'hsl(216 33% 97%)';

  if (variant === 'diagonal') {
    return (
      <div
        className={cn('relative h-16 w-full shrink-0', className)}
        aria-hidden
      >
        <div
          className="absolute inset-0 w-full"
          style={{
            background: `linear-gradient(to bottom right, transparent 49.5%, ${fill} 50%)`,
          }}
        />
      </div>
    );
  }

  if (variant === 'wave') {
    return (
      <div className={cn('relative h-12 w-full shrink-0 overflow-hidden', className)} aria-hidden>
        <svg
          className="absolute bottom-0 w-full"
          viewBox="0 0 1440 60"
          preserveAspectRatio="none"
          fill={fill}
        >
          <path d="M0 60V35c240 0 480-25 720-25s480 25 720 25V60z" />
        </svg>
      </div>
    );
  }

  /* curved — subtle gradient for smoother transition when next section is dark */
  return (
    <div className={cn('relative h-10 w-full shrink-0 overflow-hidden', className)} aria-hidden>
      <svg className="absolute bottom-0 w-full" viewBox="0 0 1440 60" preserveAspectRatio="none">
        {nextSectionDark && (
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="hsl(0 0% 5%)" />
              <stop offset="100%" stopColor="hsl(0 0% 3%)" />
            </linearGradient>
          </defs>
        )}
        <path fill={nextSectionDark ? `url(#${gradientId})` : fill} d="M0 60V30c360 0 720-30 1440-30V60z" />
      </svg>
    </div>
  );
}
