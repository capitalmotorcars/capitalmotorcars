import { User, Award, CheckCircle, CalendarCheck, Car, Building2 } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { StatCard } from '@/components/ui/StatCard';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

const benefits = [
  {
    icon: User,
    title: 'Single Point of Contact',
    text: 'One dedicated consultant manages your entire process, from initial conversation through delivery.',
  },
  {
    icon: Award,
    title: 'Real Industry Experience',
    text: 'Our team has worked inside dealerships and understands pricing, financing, and negotiations.',
  },
  {
    icon: CheckCircle,
    title: 'Clear, Practical Process',
    text: 'We explain each step before it happens. You always know where you are and what comes next.',
  },
];

const stats = [
  { value: '30+', label: 'Years of Industry Experience', icon: CalendarCheck },
  { value: 'Hundreds', label: 'of Vehicles Managed End to End', icon: Car },
  { value: 'Direct Access', label: 'to Major Automotive Brands', icon: Building2 },
];

export function WhyUsAndExperienceSection() {
  const { ref, isRevealed } = useScrollReveal();
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isRevealed && !hasAnimated) {
      const t = setTimeout(() => setHasAnimated(true), 150);
      return () => clearTimeout(t);
    }
  }, [isRevealed, hasAnimated]);

  return (
    <section className="relative py-16 lg:py-20 overflow-hidden">
      {/* Subtle ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(100%,700px)] h-[380px] pointer-events-none"
        aria-hidden
      >
        <div
          className="absolute inset-0 rounded-full opacity-80"
          style={{
            background:
              'radial-gradient(ellipse 70% 60% at 50% 50%, hsl(var(--accent) / 0.08) 0%, hsl(var(--accent) / 0.03) 50%, transparent 75%)',
            filter: 'blur(50px)',
          }}
        />
      </div>

      <div ref={ref} className="container relative mx-auto px-4 lg:px-8">
        <SectionHeading
          title="Why Work with Capital Motor Cars"
          subtitle="Experience you can trust, transparency, expertise, and numbers that speak."
        />

        <div
          className={cn(
            'max-w-7xl mx-auto rounded-2xl border border-border dark:border-white/10',
            'bg-card dark:bg-white/[0.04] overflow-hidden',
            'shadow-sm dark:shadow-[0_8px_32px_rgba(0,0,0,0.2)]'
          )}
        >
          {/* Split layout: Why Us (left) | Experience (right) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-border dark:divide-white/10">
            {/* Left: What sets us apart */}
            <div className="p-6 md:p-8 lg:p-10">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground dark:text-white/70 mb-6">
                What sets us apart
              </h3>
              <div className="space-y-6">
                {benefits.map((item, i) => (
                  <div
                    key={item.title}
                    className={cn(
                      'flex gap-4 opacity-0 translate-y-4 transition-all duration-500 ease-out',
                      hasAnimated && 'opacity-100 translate-y-0'
                    )}
                    style={{ transitionDelay: hasAnimated ? `${i * 80}ms` : '0ms' }}
                  >
                    <div className="shrink-0 w-11 h-11 rounded-xl border border-border dark:border-white/10 bg-muted/50 dark:bg-white/5 flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-muted-foreground dark:text-white/70" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground dark:text-white mb-1">{item.title}</h4>
                      <p className="text-sm text-muted-foreground dark:text-white/80 leading-relaxed">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Experience you can trust */}
            <div className="p-6 md:p-8 lg:p-10 bg-muted/30 dark:bg-white/[0.02]">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground dark:text-white/70 mb-6">
                Experience you can trust
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-5 sm:items-stretch">
                {stats.map((stat) => (
                  <StatCard key={stat.label} value={stat.value} label={stat.label} icon={stat.icon} className="h-full" />
                ))}
              </div>
          
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
