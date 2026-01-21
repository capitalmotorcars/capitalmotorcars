import { useCountUp } from '@/hooks/useScrollReveal';

interface StatCardProps {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
}

export function StatCard({ value, suffix = '', prefix = '', label }: StatCardProps) {
  const { ref, count } = useCountUp(value, 1000);

  return (
    <div className="text-center p-6 bg-card border border-border rounded-lg">
      <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
        <span ref={ref}>
          {prefix}{count}{suffix}
        </span>
      </div>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
}
