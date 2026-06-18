export interface TrustStat {
  stat: string;
  label: string;
}

export interface TrustStatsBarProps {
  stats?: TrustStat[];
  className?: string;
}

export function TrustStatsBar({ stats, className }: TrustStatsBarProps) {
  const defaultStats = [
    { stat: '760+', label: 'NJ Leases Closed' },
    { stat: 'Buy-Rate', label: 'Pricing Guarantee' },
    { stat: '1 Day', label: 'Quote Turnaround' },
    { stat: 'Free', label: 'NJ Door Delivery' },
  ];

  const displayStats = stats || defaultStats;

  return (
    <section className={`py-8 border-b border-border/40 bg-accent/5 ${className || ''}`}>
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {displayStats.map((item, i) => (
            <div key={i} className="flex flex-col items-center">
              <span className="text-3xl md:text-4xl font-black text-accent">{item.stat}</span>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground mt-1">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

