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
}

export function ServiceCard({
  title,
  description,
  href,
  icon: Icon,
  variant = 'supporting',
}: ServiceCardProps) {
  const isCore = variant === 'core';

  return (
    <Link
      to={href}
      className={cn(
        'group block bg-card border border-border rounded-lg service-card-hover',
        isCore ? 'p-7' : 'p-6'
      )}
    >
      <div className="flex items-start gap-4">
        <div
          className={cn(
            'flex-shrink-0 bg-muted rounded-lg flex items-center justify-center',
            isCore ? 'w-14 h-14' : 'w-12 h-12'
          )}
        >
          <Icon className={cn('text-primary', isCore ? 'w-7 h-7' : 'w-6 h-6')} />
        </div>
        <div className="flex-1 min-w-0">
          <h3
            className={cn(
              'text-primary mb-2',
              isCore ? 'text-lg font-semibold' : 'text-[15px] font-semibold'
            )}
          >
            {title}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {description}
          </p>
          <div className="mt-4 inline-flex items-center gap-1 text-accent text-sm font-medium">
            <span className="story-link">Learn more</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </Link>
  );
}
