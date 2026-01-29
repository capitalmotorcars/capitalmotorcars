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
  const fill = nextSectionDark ? 'hsl(220 14% 4%)' : 'hsl(216 33% 97%)';

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

  /* curved */
  return (
    <div className={cn('relative h-10 w-full shrink-0 overflow-hidden', className)} aria-hidden>
      <svg
        className="absolute bottom-0 w-full"
        viewBox="0 0 1440 60"
        preserveAspectRatio="none"
        fill={fill}
      >
        <path d="M0 60V30c360 0 720-30 1440-30V60z" />
      </svg>
    </div>
  );
}
