import { Link } from 'react-router-dom';
import { Car, CreditCard, RefreshCw, ShieldCheck, LucideIcon } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';

interface ServiceItem {
  title: string;
  description: string;
  href: string;
  ctaText: string;
  icon: LucideIcon;
  image?: string;
}

const services: ServiceItem[] = [
  {
    title: 'Vehicle Leasing',
    description: 'We help you secure the right lease without spending hours negotiating at dealerships.',
    href: '/services/car-leasing',
    ctaText: 'Explore Leasing',
    icon: Car,
  },
  {
    title: 'Financing & Credit',
    description: 'A straightforward credit application, so we can review financing options with you.',
    href: '/services/financing',
    ctaText: 'Get Started',
    icon: CreditCard,
  },
  {
    title: 'Trade-In Services',
    description: 'We evaluate your current vehicle and manage the trade in process from start to finish.',
    href: '/services/trade-in',
    ctaText: 'Learn More',
    icon: RefreshCw,
  },
  {
    title: 'Protection & Coverage Services',
    description: 'Extended warranties, glass repairs, key replacements, and comprehensive protection plans.',
    href: '/services',
    ctaText: 'View Services',
    icon: ShieldCheck,
  },
];

interface ServiceColumnProps {
  service: ServiceItem;
  index: number;
  isRevealed: boolean;
}

function ServiceColumn({ service, index, isRevealed }: ServiceColumnProps) {
  const Icon = service.icon;
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isRevealed && !hasAnimated) {
      const timer = setTimeout(() => setHasAnimated(true), index * 120);
      return () => clearTimeout(timer);
    }
  }, [isRevealed, index, hasAnimated]);

  return (
    <Link
      to={service.href}
      className={cn(
        'group flex flex-col h-full text-center',
        'opacity-0 translate-y-6',
        hasAnimated && 'animate-card-reveal'
      )}
      style={{ animationDelay: `${index * 120}ms`, animationFillMode: 'forwards' }}
    >
      <div
        className={cn(
          'relative flex flex-col h-full rounded-2xl overflow-hidden',
          'bg-card dark:bg-white/[0.04] shadow-md dark:shadow-sm',
          'hover:border-accent/30 hover:shadow-lg',
          'transition-all duration-300'
        )}
      >
        {/* Top visual: gradient + icon */}
        <div className="relative  w-full h-[150px] md:h-[150px] lg:h-[200px] overflow-hidden bg-muted/50 dark:bg-white/5">
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-accent/10 to-accent/5 dark:from-accent/15 dark:to-accent/10">
            <Icon className="w-16 h-16 lg:w-20 lg:h-20 text-accent/60 dark:text-accent/70" strokeWidth={1.25} />
          </div>
        </div>

        {/* Icon, title, description, CTA - centered */}
        <div className="flex flex-col items-center flex-grow p-3 sm:p-5 lg:p-6">

          <h3 className="text-lg sm:text-lg lg:text-xl font-bold text-foreground mb-2 sm:mb-3">
            {service.title}
          </h3>
          <p className="text-muted-foreground dark:text-white/70 text-sm sm:text-sm lg:text-base leading-relaxed mb-4 sm:mb-5 flex-grow">
            {service.description}
          </p>
          <Button
            asChild
            size="sm"
            className="bg-accent hover:bg-accent/90 text-accent-foreground glow-blue w-full text-sm sm:text-sm"
          >
            <Link to={service.href}>{service.ctaText}</Link>
          </Button>
        </div>
      </div>
    </Link>
  );
}

export function WhatWeDoSection() {
  const { ref, isRevealed } = useScrollReveal();

  return (
    <section className="relative py-16 lg:py-20 overflow-hidden ">
      <div
        ref={ref}
        className={cn(
          'container relative mx-auto px-4 lg:px-8',
          'scroll-reveal',
          isRevealed && 'revealed'
        )}
      >
        <SectionHeading
          title="What We Do"
          subtitle="We support customers at every stage of the automotive process."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-6 lg:gap-8 max-w-7xl mx-auto mt-10 md:mt-14">
          {services.map((service, index) => (
            <ServiceColumn
              key={service.href}
              service={service}
              index={index}
              isRevealed={isRevealed}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
