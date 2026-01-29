import * as React from 'react';
import { useMagneticButton } from '@/hooks/useMagneticButton';
import { cn } from '@/lib/utils';

interface MagneticButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}

export function MagneticButton({
  children,
  className,
  strength = 0.35,
  ...props
}: MagneticButtonProps) {
  const { ref, handleMouseMove, handleMouseLeave } = useMagneticButton({ strength });

  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const moveHandlers = prefersReducedMotion
    ? {}
    : { onMouseMove: handleMouseMove, onMouseLeave: handleMouseLeave };

  return (
    <div
      ref={ref}
      className={cn('inline-block transition-transform duration-150 ease-out', className)}
      {...moveHandlers}
      {...props}
    >
      {children}
    </div>
  );
}
