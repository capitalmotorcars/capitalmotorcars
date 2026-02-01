interface StatCardProps {
  value: string;
  label: string;
  /** Use on dark section backgrounds */
  dark?: boolean;
}

export function StatCard({ value, label, dark }: StatCardProps) {
  return (
    <div
      className={
        dark
          ? 'glass-card-dark text-center p-4 md:p-7 lg:p-8 transition-all duration-300 hover:scale-[1.02] hover:brightness-110'
          : 'text-center p-4 md:p-7 lg:p-8 bg-card border border-border rounded-lg'
      }
    >
      <div
        className={
          dark
            ? 'text-2xl md:text-3xl font-semibold text-white mb-3'
            : 'text-2xl md:text-3xl font-semibold text-muted-foreground mb-3'
        }
      >
        {value}
      </div>
      <p
        className={
          dark
            ? 'text-base md:text-lg font-semibold text-white/85 leading-snug'
            : 'text-base md:text-lg font-semibold text-primary leading-snug'
        }
      >
        {label}
      </p>
    </div>
  );
}
