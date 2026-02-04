import { CalendarCheck, Car, Building2 } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { StatCard } from '@/components/ui/StatCard';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

export function ExperienceTrustSection() {
  const { ref, isRevealed } = useScrollReveal();
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isRevealed && !hasAnimated) {
      const t = setTimeout(() => setHasAnimated(true), 150);
      return () => clearTimeout(t);
    }
  }, [isRevealed, hasAnimated]);

  return (
    <section className="py-10 md:py-16 lg:py-20 section-bg relative overflow-hidden">
      {/* Subtle radial glow for depth */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(100%,600px)] h-[320px] rounded-full bg-accent/[0.04] dark:bg-accent/[0.06] blur-[80px] pointer-events-none"
        aria-hidden
      />
      <div ref={ref} className="container relative mx-auto px-4 lg:px-8">
        <SectionHeading
          title="Experience You Can Trust"
          subtitle="Numbers that reflect our commitment to every client we serve."
        />
        <div
          className={cn(
            'max-w-6xl mx-auto rounded-2xl border border-border dark:border-white/10',
            'bg-card dark:bg-white/[0.04] p-6 md:p-8',
            'shadow-sm dark:shadow-[0_8px_32px_rgba(0,0,0,0.2)]'
          )}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {[
              { value: '30+', label: 'Years of Industry Experience', icon: CalendarCheck },
              { value: 'Hundreds', label: 'of Vehicles Managed End-to-End', icon: Car },
              { value: 'Direct Access', label: 'to Major Automotive Brands', icon: Building2 },
            ].map((stat, i) => (
              <div
                key={stat.label}
                className={cn(
                  'opacity-0 translate-y-6 transition-all duration-500 ease-out',
                  hasAnimated && 'opacity-100 translate-y-0'
                )}
                style={{
                  transitionDelay: hasAnimated ? `${i * 80}ms` : '0ms',
                }}
              >
                <StatCard value={stat.value} label={stat.label} icon={stat.icon} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
