import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  children?: ReactNode;
  align?: 'left' | 'center';
  className?: string;
}

export function SectionHeading({ 
  title, 
  subtitle, 
  children, 
  align = 'center',
  className 
}: SectionHeadingProps) {
  return (
    <div className={cn(
      'mb-12',
      align === 'center' && 'text-center max-w-2xl mx-auto',
      className
    )}>
      <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg text-muted-foreground leading-relaxed">
          {subtitle}
        </p>
      )}
      {children}
    </div>
  );
}
