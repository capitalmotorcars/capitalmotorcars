interface StatCardProps {
  value: string;
  label: string;
}

export function StatCard({ value, label }: StatCardProps) {
  return (
    <div className="text-center p-7 md:p-8 bg-card border border-border rounded-lg">
      <div className="text-2xl md:text-3xl font-semibold text-muted-foreground mb-3">
        {value}
      </div>
      <p className="text-base md:text-lg font-semibold text-primary leading-snug">{label}</p>
    </div>
  );
}
