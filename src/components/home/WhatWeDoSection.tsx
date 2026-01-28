import { Link } from 'react-router-dom';
import { ArrowRight, Car, CreditCard, RefreshCw, Wrench, CircleDot, Sparkles, LucideIcon } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { cn } from '@/lib/utils';

interface Service {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
}

const services: Service[] = [
  {
    title: 'Vehicle Leasing',
    description: 'We help you secure the right lease without spending hours negotiating at dealerships.',
    href: '/services/car-leasing',
    icon: Car,
  },
  {
    title: 'Financing & Credit',
    description: 'A straightforward credit application, so we can review financing options with you.',
    href: '/services/financing',
    icon: CreditCard,
  },
  {
    title: 'Trade-In Services',
    description: 'We evaluate your current vehicle and manage the trade-in process from start to finish.',
    href: '/services/trade-in',
    icon: RefreshCw,
  },
  {
    title: 'Wear & Tear Repair',
    description: 'End-of-lease repairs to reduce wear charges and avoid surprises at return.',
    href: '/services/wear-and-tear',
    icon: Wrench,
  },
  {
    title: 'Rim, Wheel & Tire',
    description: 'Wheel and tire repairs, cosmetic or functional, depending on what is needed.',
    href: '/services/wheel-repair',
    icon: CircleDot,
  },
  {
    title: 'Professional Detailing',
    description: 'Interior and exterior detailing for return, resale, or a proper clean.',
    href: '/services/detailing',
    icon: Sparkles,
  },
];

const featuredService = services[0];
const primaryServices = services.slice(1, 3);
const supportingServices = services.slice(3);

interface FeaturedCardProps {
  service: Service;
  className?: string;
}

function FeaturedCard({ service, className }: FeaturedCardProps) {
  const Icon = service.icon;
  
  return (
    <Link
      to={service.href}
      className={cn(
        "group relative flex flex-col justify-between p-8 md:p-10 rounded-2xl overflow-hidden",
        "bg-card border border-border",
        "transition-all duration-300 ease-out",
        "hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5",
        className
      )}
    >
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Number badge */}
      <span className="absolute top-6 right-6 text-[11px] font-mono text-muted-foreground/30 tracking-wider">
        01
      </span>
      
      {/* Icon with glow */}
      <div className="relative mb-8">
        <div className="absolute -inset-4 bg-accent/10 rounded-full blur-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-500" />
        <div className="relative w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center">
          <Icon className="w-7 h-7 text-accent" />
        </div>
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        <h3 className="text-xl md:text-2xl font-semibold text-primary mb-3">
          {service.title}
        </h3>
        <p className="text-muted-foreground leading-relaxed mb-6 group-hover:text-foreground/70 transition-colors duration-300">
          {service.description}
        </p>
        <div className="inline-flex items-center gap-2 text-accent font-medium">
          <span>Learn more</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
        </div>
      </div>
      
      {/* Animated bottom border */}
      <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-accent to-accent/50 group-hover:w-full transition-all duration-500 ease-out" />
    </Link>
  );
}

interface PrimaryCardProps {
  service: Service;
  index: number;
  className?: string;
}

function PrimaryCard({ service, index, className }: PrimaryCardProps) {
  const Icon = service.icon;
  
  return (
    <Link
      to={service.href}
      className={cn(
        "group relative flex flex-col p-6 md:p-7 rounded-xl overflow-hidden",
        "bg-card border border-border",
        "transition-all duration-300 ease-out",
        "hover:border-accent/20 hover:shadow-md",
        className
      )}
    >
      {/* Number badge */}
      <span className="absolute top-5 right-5 text-[10px] font-mono text-muted-foreground/25 tracking-wider">
        0{index + 2}
      </span>
      
      {/* Icon */}
      <div className="relative mb-5">
        <div className="w-11 h-11 rounded-lg bg-muted flex items-center justify-center group-hover:bg-accent/10 transition-colors duration-300">
          <Icon className="w-5 h-5 text-muted-foreground group-hover:text-accent transition-colors duration-300" />
        </div>
      </div>
      
      {/* Content */}
      <h3 className="text-lg font-semibold text-primary mb-2">
        {service.title}
      </h3>
      <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
        {service.description}
      </p>
      <div className="inline-flex items-center gap-1.5 text-accent text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <span>Learn more</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </div>
    </Link>
  );
}

interface CompactCardProps {
  service: Service;
  index: number;
  className?: string;
}

function CompactCard({ service, index, className }: CompactCardProps) {
  const Icon = service.icon;
  
  return (
    <Link
      to={service.href}
      className={cn(
        "group flex items-center gap-4 p-4 md:p-5 rounded-xl",
        "bg-card border border-border",
        "transition-all duration-200 ease-out",
        "hover:border-accent/20 hover:bg-accent/[0.02]",
        className
      )}
    >
      {/* Icon */}
      <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center flex-shrink-0 group-hover:bg-accent/10 transition-colors duration-200">
        <Icon className="w-5 h-5 text-muted-foreground group-hover:text-accent transition-colors duration-200" />
      </div>
      
      {/* Content */}
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-primary text-sm md:text-base">
          {service.title}
        </h4>
        <p className="text-xs md:text-sm text-muted-foreground mt-0.5 hidden md:block">
          {service.description.slice(0, 60)}...
        </p>
      </div>
      
      {/* Arrow */}
      <ArrowRight className="w-4 h-4 text-muted-foreground/50 group-hover:text-accent group-hover:translate-x-0.5 transition-all duration-200 flex-shrink-0" />
    </Link>
  );
}

export function WhatWeDoSection() {
  const { ref, isRevealed } = useScrollReveal();
  
  return (
    <section className="pt-8 md:pt-14 pb-12 md:pb-28 bg-background">
      <div 
        ref={ref}
        className={cn(
          "container mx-auto px-4 lg:px-8",
          "scroll-reveal",
          isRevealed && "revealed"
        )}
      >
        <SectionHeading
          title="What We Do"
          subtitle="We support customers at every stage of the automotive process."
        />

        <div className="max-w-6xl mx-auto">
          {/* Desktop Bento Grid */}
          <div className="hidden md:grid grid-cols-[1.3fr_1fr] gap-5">
            {/* Left: Featured card spanning 2 rows */}
            <div className="row-span-2">
              <FeaturedCard service={featuredService} className="h-full" />
            </div>
            
            {/* Right: Two primary cards stacked */}
            <div className="space-y-5">
              {primaryServices.map((service, idx) => (
                <PrimaryCard 
                  key={service.href} 
                  service={service} 
                  index={idx}
                />
              ))}
            </div>
          </div>
          
          {/* Desktop: Supporting services row */}
          <div className="hidden md:grid grid-cols-3 gap-4 mt-5">
            {supportingServices.map((service, idx) => (
              <CompactCard 
                key={service.href} 
                service={service} 
                index={idx}
              />
            ))}
          </div>
          
          {/* Mobile Layout */}
          <div className="md:hidden space-y-4">
            {/* Featured card */}
            <FeaturedCard service={featuredService} />
            
            {/* Primary services */}
            {primaryServices.map((service, idx) => (
              <PrimaryCard 
                key={service.href} 
                service={service} 
                index={idx}
              />
            ))}
            
            {/* Supporting services - 3 in a row on larger mobile, stacked on small */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              {supportingServices.map((service, idx) => (
                <CompactCard 
                  key={service.href} 
                  service={service} 
                  index={idx}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
