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
  /** @deprecated Use theme; kept for backward compatibility, ignored */
  dark?: boolean;
}

export function ServiceCard({
  title,
  description,
  href,
  icon: Icon,
  variant = 'supporting',
  dark: _dark,
}: ServiceCardProps) {
  const isCore = variant === 'core';

  return (
    <Link
      to={href}
      aria-label={`Learn more about ${title}`}
      className={cn(
        'group block transition-all duration-300 min-h-[44px] glass-card-theme service-card-hover hover:ring-2 hover:ring-accent/20 hover:ring-offset-2 dark:hover:ring-offset-[hsl(0_0%_4%)]',
        isCore ? 'p-7' : 'p-6'
      )}
    >
      <div className="flex items-start gap-4">
        <div
          className={cn(
            'flex-shrink-0 rounded-lg flex items-center justify-center bg-muted dark:bg-white/10',
            isCore ? 'w-14 h-14' : 'w-12 h-12'
          )}
        >
          <Icon className={cn('text-foreground dark:text-white', isCore ? 'w-7 h-7' : 'w-6 h-6')} />
        </div>
        <div className="flex-1 min-w-0">
          <h4
            className={cn(
              'mb-2 text-section',
              isCore ? 'text-lg font-semibold' : 'text-[15px] font-semibold'
            )}
          >
            {title}
          </h4>
          <p className="text-sm leading-relaxed text-section-muted">{description}</p>
          <div className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent group-hover:gap-2 transition-[gap] duration-200">
            <span className="story-link">Learn more</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </div>
        </div>
      </div>
    </Link>
  );
}
