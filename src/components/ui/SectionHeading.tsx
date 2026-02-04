import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  children?: ReactNode;
  align?: 'left' | 'center';
  className?: string;
  /** Use 'h2' for main sections, 'h3' for subsections */
  as?: 'h2' | 'h3';
  /** @deprecated Use theme; kept for backward compatibility, ignored */
  dark?: boolean;
}

export { type SectionHeadingProps };

export function SectionHeading({
  title,
  subtitle,
  children,
  align = 'center',
  className,
  as: Component = 'h2',
  dark: _dark,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'mb-10 md:mb-14',
        align === 'center' && 'text-center max-w-2xl mx-auto',
        className
      )}
    >
      <div className={cn(align === 'center' && 'flex flex-col items-center')}>
        <Component
          className={cn(
            'font-bold mb-4 lg:mb-5 leading-tight text-section',
            Component === 'h2' && 'text-xl sm:text-2xl md:text-3xl lg:text-4xl',
            Component === 'h3' && 'text-lg sm:text-xl md:text-2xl lg:text-3xl'
          )}
        >
          {title}
        </Component>
        {align === 'center' && (
          <div
            className="h-1 w-12 rounded-full shrink-0 mb-2 bg-accent"
            aria-hidden
          />
        )}
      </div>
      {subtitle && (
        <p className="text-base md:text-lg leading-relaxed text-section-muted">{subtitle}</p>
      )}
      {children}
    </div>
  );
}
