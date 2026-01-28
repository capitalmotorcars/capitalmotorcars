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
  /** Use dark mode for dark backgrounds */
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
  dark = false,
}: SectionHeadingProps) {
  return (
    <div className={cn(
      'mb-12',
      align === 'center' && 'text-center max-w-2xl mx-auto',
      className
    )}>
      <Component className={cn(
        'font-bold mb-4',
        dark ? 'text-white' : 'text-primary',
        Component === 'h2' && 'text-3xl md:text-4xl',
        Component === 'h3' && 'text-2xl md:text-3xl',
      )}>
        {title}
      </Component>
      {subtitle && (
        <p className={cn(
          'text-lg leading-relaxed',
          dark ? 'text-white/70' : 'text-muted-foreground'
        )}>
          {subtitle}
        </p>
      )}
      {children}
    </div>
  );
}
