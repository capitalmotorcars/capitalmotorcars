import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  value: string;
  label: string;
  /** Optional icon shown above the value, centered */
  icon?: LucideIcon;
  /** @deprecated Use theme; kept for backward compatibility, ignored */
  dark?: boolean;
  /** Optional class name for the root (e.g. h-full for equal-height grids) */
  className?: string;
}

export function StatCard({ value, label, icon: Icon, dark: _dark, className }: StatCardProps) {
  return (
    <div className={cn('glass-card-theme p-4 md:py-10 md:px-2 flex flex-col items-center text-center h-full min-h-0', className)}>
      {Icon && (
        <div className="flex justify-center mb-4">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl border border-accent bg-card dark:bg-white/[0.04]">
            <Icon className="w-6 h-6 text-accent" />
          </div>
        </div>
      )}
      <div className="text-lg font-semibold  mb-3 text-accent">{value}</div>
      <p className="text-sm sm:text-base text-section-muted leading-relaxed max-w-[16rem] text-center">{label}</p>
    </div>
  );
}
