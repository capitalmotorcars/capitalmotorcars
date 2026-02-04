import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HeroProcessStepProps {
  stepNumber: number;
  title: string;
  icon: LucideIcon;
  isActive: boolean;
  onClick: () => void;
  onMouseEnter: () => void;
  prefersReducedMotion: boolean;
}

export function HeroProcessStep({
  stepNumber,
  title,
  icon: Icon,
  isActive,
  onClick,
  onMouseEnter,
  prefersReducedMotion,
}: HeroProcessStepProps) {
  return (
    <button
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onFocus={onClick}
      aria-current={isActive ? 'step' : undefined}
      className={cn(
        'group flex items-center gap-3 p-3 rounded-lg w-full text-left',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary',
        !prefersReducedMotion && 'transition-all duration-300 ease-out',
        isActive
          ? 'bg-accent/15 border border-accent/40 scale-[1.03]'
          : 'bg-white/5 border border-transparent opacity-70 hover:opacity-90 hover:bg-white/10'
      )}
    >
      {/* Step Number Badge */}
      <div
        className={cn(
          'flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold',
          !prefersReducedMotion && 'transition-colors duration-300',
          isActive
            ? 'bg-accent text-accent-foreground'
            : 'bg-white/10 text-primary-foreground/60'
        )}
      >
        {stepNumber}
      </div>

      {/* Icon */}
      <Icon
        className={cn(
          'w-5 h-5 flex-shrink-0',
          !prefersReducedMotion && 'transition-colors duration-300',
          isActive ? 'text-accent' : 'text-primary-foreground/60'
        )}
        strokeWidth={1.5}
      />

      {/* Title */}
      <span
        className={cn(
          'text-sm font-medium',
          !prefersReducedMotion && 'transition-colors duration-300',
          isActive ? 'text-primary-foreground' : 'text-primary-foreground/70'
        )}
      >
        {title}
      </span>
    </button>
  );
}
