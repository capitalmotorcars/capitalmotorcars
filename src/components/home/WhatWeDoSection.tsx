import { Link } from 'react-router-dom';
import { ArrowRight, Car, CreditCard, RefreshCw, Wrench, CircleDot, Sparkles, LucideIcon } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

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

interface ServiceCardProps {
  service: Service;
  index: number;
  isRevealed: boolean;
}

function ServiceCard({ service, index, isRevealed }: ServiceCardProps) {
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
        "group relative block h-full",
        // Staggered reveal animation
        "opacity-0 translate-y-8 scale-[0.97]",
        hasAnimated && "animate-card-reveal"
      )}
      style={{ 
        animationDelay: `${index * 120}ms`,
        animationFillMode: 'forwards'
      }}
    >
      {/* Breathing glow backdrop - appears on hover */}
      <div className={cn(
        "absolute -inset-3 rounded-3xl blur-2xl transition-opacity duration-700",
        "bg-gradient-to-br from-accent/25 via-accent/15 to-accent/25",
        "opacity-0 group-hover:opacity-100",
        "group-hover:animate-breathe-glow"
      )} />
      
      {/* Glass card with 3D perspective */}
      <div className={cn(
        "relative h-full flex flex-col p-6 md:p-8 rounded-2xl overflow-hidden",
        "bg-white/[0.03] backdrop-blur-md",
        "border border-white/[0.08]",
        "transition-all duration-500",
        // 3D tilt on hover
        "group-hover:border-accent/50 group-hover:bg-white/[0.07]",
        "group-hover:-translate-y-2",
        "md:group-hover:[transform:perspective(1000px)_rotateX(-2deg)_translateY(-8px)]"
      )}
      style={{
        transformStyle: 'preserve-3d',
      }}>
        {/* Animated border gradient overlay */}
        <div className={cn(
          "absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500",
          "overflow-hidden"
        )}>
          <div className={cn(
            "absolute inset-0 rounded-2xl",
            "bg-[length:200%_100%]",
            "bg-gradient-to-r from-transparent via-accent/30 to-transparent",
            "group-hover:animate-border-flow"
          )} />
          <div className="absolute inset-[1px] rounded-2xl bg-[hsl(216_27%_6%)]" />
        </div>
        
        {/* Number indicator with glow */}
        <span className={cn(
          "absolute top-4 right-4 text-[10px] font-mono tracking-wider",
          "text-white/20 group-hover:text-accent/60",
          "transition-all duration-500"
        )}>
          0{index + 1}
        </span>
        
        {/* Glowing icon container with morphing */}
        <div className="relative mb-6">
          <div className={cn(
            "relative w-14 h-14 rounded-xl flex items-center justify-center",
            "bg-accent/10",
            "shadow-[0_0_25px_rgba(31,106,225,0.25)]",
            "group-hover:shadow-[0_0_50px_rgba(31,106,225,0.5)]",
            "transition-all duration-500",
            // Icon morphing on hover
            "group-hover:scale-110 group-hover:rotate-3"
          )}>
            {/* Pulsing ring */}
            <div className={cn(
              "absolute inset-0 rounded-xl",
              "bg-accent/5",
              "group-hover:animate-icon-ring-pulse"
            )} />
            {/* Secondary ring */}
            <div className={cn(
              "absolute -inset-1 rounded-xl",
              "border border-accent/0 group-hover:border-accent/20",
              "transition-all duration-700",
              "group-hover:scale-110 group-hover:opacity-0"
            )} />
            <Icon className={cn(
              "relative z-10 w-7 h-7 text-accent",
              "transition-transform duration-500",
              "group-hover:scale-110"
            )} />
          </div>
          
          {/* Enhanced floating particles */}
          <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-accent/40 animate-float-1" />
          <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 rounded-full bg-accent/30 animate-float-2" />
          <div className={cn(
            "absolute top-1/2 -right-3 w-1 h-1 rounded-full",
            "bg-accent/0 group-hover:bg-accent/50",
            "transition-all duration-500 delay-100",
            "group-hover:animate-particle-drift"
          )} />
        </div>
        
        {/* Content */}
        <div className="relative z-10 flex-grow">
          <h3 className={cn(
            "text-lg md:text-xl font-semibold text-white mb-2",
            "transition-all duration-300",
            "group-hover:text-white group-hover:tracking-wide"
          )}>
            {service.title}
          </h3>
          <p className={cn(
            "text-white/50 text-sm md:text-base leading-relaxed",
            "transition-all duration-500",
            "group-hover:text-white/75"
          )}>
            {service.description}
          </p>
        </div>
        
        {/* Arrow indicator with enhanced animation */}
        <div className="mt-6 flex items-center gap-2 text-accent">
          <span className={cn(
            "text-sm font-medium",
            "opacity-0 -translate-x-3",
            "group-hover:opacity-100 group-hover:translate-x-0",
            "transition-all duration-400 ease-out"
          )}>
            Learn more
          </span>
          <ArrowRight className={cn(
            "w-4 h-4",
            "opacity-0 -translate-x-2",
            "group-hover:opacity-100 group-hover:translate-x-1",
            "transition-all duration-400 delay-75 ease-out"
          )} />
        </div>
        
        {/* Enhanced bottom accent line with glow */}
        <div className={cn(
          "absolute bottom-0 left-0 h-[2px] w-0",
          "bg-gradient-to-r from-accent via-accent/80 to-transparent",
          "group-hover:w-full",
          "transition-all duration-700 ease-out",
          "shadow-[0_0_10px_rgba(31,106,225,0.5)]"
        )} />
      </div>
    </Link>
  );
}

function ConnectingLines() {
  return (
    <svg 
      className="absolute inset-0 w-full h-full pointer-events-none hidden md:block"
      style={{ zIndex: 0 }}
    >
      <defs>
        <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="hsl(214 77% 50% / 0.05)" />
          <stop offset="50%" stopColor="hsl(214 77% 50% / 0.25)" />
          <stop offset="100%" stopColor="hsl(214 77% 50% / 0.05)" />
        </linearGradient>
        <linearGradient id="lineGradientV" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="hsl(214 77% 50% / 0.05)" />
          <stop offset="50%" stopColor="hsl(214 77% 50% / 0.25)" />
          <stop offset="100%" stopColor="hsl(214 77% 50% / 0.05)" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      {/* Horizontal connecting lines - Row 1 */}
      <line 
        x1="22%" y1="25%" x2="38%" y2="25%" 
        stroke="url(#lineGradient)" 
        strokeWidth="1"
        className="animate-line-flow"
        filter="url(#glow)"
      />
      <line 
        x1="62%" y1="25%" x2="78%" y2="25%" 
        stroke="url(#lineGradient)" 
        strokeWidth="1"
        className="animate-line-flow"
        style={{ animationDelay: '0.5s' }}
        filter="url(#glow)"
      />
      
      {/* Horizontal connecting lines - Row 2 */}
      <line 
        x1="22%" y1="75%" x2="38%" y2="75%" 
        stroke="url(#lineGradient)" 
        strokeWidth="1"
        className="animate-line-flow"
        style={{ animationDelay: '1s' }}
        filter="url(#glow)"
      />
      <line 
        x1="62%" y1="75%" x2="78%" y2="75%" 
        stroke="url(#lineGradient)" 
        strokeWidth="1"
        className="animate-line-flow"
        style={{ animationDelay: '1.5s' }}
        filter="url(#glow)"
      />
      
      {/* Vertical connecting lines */}
      <line 
        x1="17%" y1="35%" x2="17%" y2="65%" 
        stroke="url(#lineGradientV)" 
        strokeWidth="1"
        className="animate-line-flow-v"
        filter="url(#glow)"
      />
      <line 
        x1="50%" y1="35%" x2="50%" y2="65%" 
        stroke="url(#lineGradientV)" 
        strokeWidth="1"
        className="animate-line-flow-v"
        style={{ animationDelay: '0.7s' }}
        filter="url(#glow)"
      />
      <line 
        x1="83%" y1="35%" x2="83%" y2="65%" 
        stroke="url(#lineGradientV)" 
        strokeWidth="1"
        className="animate-line-flow-v"
        style={{ animationDelay: '1.4s' }}
        filter="url(#glow)"
      />
      
      {/* Enhanced glowing nodes */}
      <circle cx="17%" cy="25%" r="4" className="fill-accent/20 animate-node-pulse" filter="url(#glow)" />
      <circle cx="17%" cy="25%" r="2" className="fill-accent/60" />
      <circle cx="50%" cy="25%" r="4" className="fill-accent/20 animate-node-pulse" style={{ animationDelay: '0.3s' }} filter="url(#glow)" />
      <circle cx="50%" cy="25%" r="2" className="fill-accent/60" />
      <circle cx="83%" cy="25%" r="4" className="fill-accent/20 animate-node-pulse" style={{ animationDelay: '0.6s' }} filter="url(#glow)" />
      <circle cx="83%" cy="25%" r="2" className="fill-accent/60" />
      <circle cx="17%" cy="75%" r="4" className="fill-accent/20 animate-node-pulse" style={{ animationDelay: '0.9s' }} filter="url(#glow)" />
      <circle cx="17%" cy="75%" r="2" className="fill-accent/60" />
      <circle cx="50%" cy="75%" r="4" className="fill-accent/20 animate-node-pulse" style={{ animationDelay: '1.2s' }} filter="url(#glow)" />
      <circle cx="50%" cy="75%" r="2" className="fill-accent/60" />
      <circle cx="83%" cy="75%" r="4" className="fill-accent/20 animate-node-pulse" style={{ animationDelay: '1.5s' }} filter="url(#glow)" />
      <circle cx="83%" cy="75%" r="2" className="fill-accent/60" />
    </svg>
  );
}

function BackgroundEffects() {
  return (
    <>
      {/* Premium gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/[0.02] to-transparent" />
      
      {/* Subtle shimmer effect */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, hsl(214 77% 50% / 0.1) 50%, transparent 100%)',
          backgroundSize: '200% 100%',
          animation: 'shimmer 8s ease-in-out infinite',
        }}
      />
      
      {/* Noise texture */}
      <div 
        className="absolute inset-0 opacity-[0.012]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
      
      {/* Floating orbs with enhanced animation */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-accent/5 blur-[100px] animate-float-orb" />
      <div className="absolute bottom-1/4 right-1/4 w-56 h-56 rounded-full bg-accent/5 blur-[80px] animate-float-orb-delayed" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-accent/[0.02] blur-[120px] animate-pulse-slow" />
      
      {/* Star-like dots */}
      <div className="absolute top-[15%] left-[10%] w-1 h-1 rounded-full bg-white/20 animate-twinkle" />
      <div className="absolute top-[25%] right-[15%] w-1.5 h-1.5 rounded-full bg-white/15 animate-twinkle" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-[30%] left-[20%] w-1 h-1 rounded-full bg-white/20 animate-twinkle" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-[20%] right-[25%] w-1 h-1 rounded-full bg-white/25 animate-twinkle" style={{ animationDelay: '0.5s' }} />
      <div className="absolute top-[40%] left-[5%] w-0.5 h-0.5 rounded-full bg-white/30 animate-twinkle" style={{ animationDelay: '1.5s' }} />
      <div className="absolute top-[60%] right-[8%] w-1 h-1 rounded-full bg-white/20 animate-twinkle" style={{ animationDelay: '2.5s' }} />
    </>
  );
}

export function WhatWeDoSection() {
  const { ref, isRevealed } = useScrollReveal();
  
  return (
    <section 
      className="relative py-16 md:py-28 overflow-hidden"
      style={{ backgroundColor: 'hsl(216 27% 6%)' }}
    >
      <BackgroundEffects />
      
      <div 
        ref={ref}
        className={cn(
          "container relative mx-auto px-4 lg:px-8",
          "scroll-reveal",
          isRevealed && "revealed"
        )}
      >
        <SectionHeading
          title="What We Do"
          subtitle="We support customers at every stage of the automotive process."
          dark
        />

        <div className="relative max-w-6xl mx-auto">
          {/* Connecting lines SVG - Desktop only */}
          <ConnectingLines />
          
          {/* Services Grid */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
            {services.map((service, index) => (
              <ServiceCard 
                key={service.href} 
                service={service} 
                index={index}
                isRevealed={isRevealed}
              />
            ))}
          </div>
          
          {/* Mobile connecting line */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-accent/20 to-transparent md:hidden" />
        </div>
      </div>
    </section>
  );
}
