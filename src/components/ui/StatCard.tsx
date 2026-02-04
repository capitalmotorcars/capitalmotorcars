import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
  value: string;
  label: string;
  /** Optional icon shown above the value, centered */
  icon?: LucideIcon;
  /** @deprecated Use theme; kept for backward compatibility, ignored */
  dark?: boolean;
}

export function StatCard({ value, label, icon: Icon, dark: _dark }: StatCardProps) {
  return (
    <div className="glass-card-theme p-4 md:p-7 lg:p-8 transition-all duration-300 hover:scale-[1.02] dark:hover:brightness-110 flex flex-col items-center text-center">
      {Icon && (
        <div className="flex justify-center mb-4">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl border border-border dark:border-white/10 bg-card dark:bg-white/[0.04]">
            <Icon className="w-6 h-6 text-section-muted" />
          </div>
        </div>
      )}
      <div className="text-lg font-semibold text-section mb-3">{value}</div>
      <p className="text-sm sm:text-base text-section-muted leading-relaxed max-w-[16rem] text-center">{label}</p>
    </div>
  );
}
