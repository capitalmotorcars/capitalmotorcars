import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ServiceCardProps {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  variant?: 'core' | 'supporting';
  /** Use on dark section backgrounds */
  dark?: boolean;
}

export function ServiceCard({
  title,
  description,
  href,
  icon: Icon,
  variant = 'supporting',
  dark = false,
}: ServiceCardProps) {
  const isCore = variant === 'core';

  return (
    <Link
      to={href}
      className={cn(
        'group block glass-card border border-white/10 rounded-xl service-card-hover service-card-glow-track transition-all duration-300',
        isCore ? 'p-7' : 'p-6'
      )}
    >
      <div className="flex items-start gap-4">
        <div
          className={cn(
            'flex-shrink-0 rounded-lg flex items-center justify-center',
            dark ? 'bg-white/10' : 'bg-muted',
            isCore ? 'w-14 h-14' : 'w-12 h-12'
          )}
        >
          <Icon className={cn(dark ? 'text-white' : 'text-primary', isCore ? 'w-7 h-7' : 'w-6 h-6')} />
        </div>
        <div className="flex-1 min-w-0">
          <h4
            className={cn(
              'mb-2',
              dark ? 'text-white' : 'text-primary',
              isCore ? 'text-lg font-semibold' : 'text-[15px] font-semibold'
            )}
          >
            {title}
          </h4>
          <p className={cn('text-sm leading-relaxed', dark ? 'text-white/85' : 'text-muted-foreground')}>
            {description}
          </p>
          <div className={cn('mt-4 inline-flex items-center gap-1 text-sm font-medium', dark ? 'text-accent' : 'text-accent')}>
            <span className="story-link">Learn more</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </Link>
  );
}
