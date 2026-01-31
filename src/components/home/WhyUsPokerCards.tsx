import { useState, useEffect } from 'react';
import { User, Award, CheckCircle, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

const cards = [
  {
    id: 1,
    icon: User,
    title: 'Single Point of Contact',
    shortText: 'One dedicated consultant manages everything.',
    fullText: 'One dedicated consultant manages your entire process, from initial conversation through delivery.',
  },
  {
    id: 2,
    icon: Award,
    title: 'Real Industry Experience',
    shortText: 'We know how dealerships actually work.',
    fullText: 'Our team has worked inside dealerships and understands how pricing, financing, and negotiations actually work.',
  },
  {
    id: 3,
    icon: CheckCircle,
    title: 'Clear, Practical Process',
    shortText: 'You always know what comes next.',
    fullText: 'We explain each step before it happens. You always know where you are and what comes next.',
  },
];

// Particle component for floating effects
function Particles({ isActive }: { isActive: boolean }) {
  return (
    <div className={cn(
      "absolute inset-0 pointer-events-none overflow-hidden rounded-2xl",
      "opacity-0 transition-opacity duration-700",
      isActive && "opacity-100"
    )}>
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className={cn(
            "absolute w-1 h-1 rounded-full bg-accent/60",
            "animate-particle-float"
          )}
          style={{
            left: `${15 + i * 15}%`,
            top: `${20 + (i % 3) * 25}%`,
            animationDelay: `${i * 0.3}s`,
            animationDuration: `${3 + i * 0.5}s`,
          }}
        />
      ))}
    </div>
  );
}

// Energy lines connecting cards
function EnergyLines({ activeCard }: { activeCard: number | null }) {
  return (
    <div className="absolute inset-0 pointer-events-none hidden md:block">
      {/* Left to center line */}
      <div 
        className={cn(
          "absolute top-1/2 left-[22%] w-[12%] h-[2px] -translate-y-1/2",
          "bg-gradient-to-r from-accent/10 via-accent/40 to-accent/10",
          "transition-all duration-700 origin-left",
          activeCard === 1 || activeCard === 2 ? "scale-x-100 opacity-100" : "scale-x-50 opacity-30"
        )}
      >
        <div className={cn(
          "absolute inset-0",
          "bg-gradient-to-r from-transparent via-white/50 to-transparent",
          "animate-energy-pulse"
        )} />
      </div>
      
      {/* Center to right line */}
      <div 
        className={cn(
          "absolute top-1/2 right-[22%] w-[12%] h-[2px] -translate-y-1/2",
          "bg-gradient-to-r from-accent/10 via-accent/40 to-accent/10",
          "transition-all duration-700 origin-right",
          activeCard === 2 || activeCard === 3 ? "scale-x-100 opacity-100" : "scale-x-50 opacity-30"
        )}
      >
        <div className={cn(
          "absolute inset-0",
          "bg-gradient-to-r from-transparent via-white/50 to-transparent",
          "animate-energy-pulse"
        )} style={{ animationDelay: '0.5s' }} />
      </div>
    </div>
  );
}

// Background shimmer effect
function BackgroundShimmer() {
  return (
    <>
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          background: 'linear-gradient(110deg, transparent 20%, hsl(214 77% 50% / 0.15) 40%, hsl(214 77% 50% / 0.15) 60%, transparent 80%)',
          backgroundSize: '200% 100%',
          animation: 'shimmer 6s ease-in-out infinite',
        }}
      />
      {/* Subtle radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-accent/[0.03] blur-[100px]" />
    </>
  );
}

export function WhyUsPokerCards() {
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [expandedMobile, setExpandedMobile] = useState<number | null>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const { ref, isRevealed } = useScrollReveal();

  useEffect(() => {
    if (isRevealed && !hasAnimated) {
      const timer = setTimeout(() => setHasAnimated(true), 200);
      return () => clearTimeout(timer);
    }
  }, [isRevealed, hasAnimated]);

  const handleCardClick = (id: number) => {
    setActiveCard(activeCard === id ? null : id);
  };

  const handleMobileToggle = (id: number) => {
    setExpandedMobile(expandedMobile === id ? null : id);
  };

  // Card height offsets for floating effect
  const getCardOffset = (index: number, isActive: boolean) => {
    if (isActive) return -16;
    const offsets = [-4, 0, -8]; // varied heights
    return offsets[index];
  };

  return (
    <section className="relative py-6 md:py-14 lg:py-20 overflow-hidden" style={{ backgroundColor: 'hsl(0 0% 3%)' }}>
      <BackgroundShimmer />
      
      <div
        ref={ref}
        className={`container relative mx-auto px-4 lg:px-8 scroll-reveal ${isRevealed ? 'revealed' : ''}`}
      >
        <SectionHeading
          title="Why Work with Capital Motor Cars"
          dark
        />

        {/* Desktop: Floating Cards with energy connections */}
        <div className="hidden md:block relative max-w-4xl mx-auto">
          <EnergyLines activeCard={activeCard} />
          
          <div className="flex justify-center items-center gap-6">
            {cards.map((card, index) => {
              const isActive = activeCard === card.id;
              const yOffset = getCardOffset(index, isActive);
              
              return (
                <div
                  key={card.id}
                  onClick={() => handleCardClick(card.id)}
                  className={cn(
                    "relative w-72 cursor-pointer",
                    // Staggered reveal
                    "opacity-0 translate-y-8",
                    hasAnimated && "animate-card-reveal"
                  )}
                  style={{
                    animationDelay: `${index * 150}ms`,
                    animationFillMode: 'forwards',
                    transform: hasAnimated ? `translateY(${yOffset}px)` : undefined,
                    transition: 'transform 500ms cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                >
                  {/* Glow backdrop for active card */}
                  <div className={cn(
                    "absolute -inset-4 rounded-3xl blur-2xl transition-all duration-700",
                    "bg-gradient-to-b from-accent/20 via-accent/30 to-accent/20",
                    isActive ? "opacity-100 scale-110" : "opacity-0 scale-100"
                  )} />
                  
                  {/* Particles around active card */}
                  <Particles isActive={isActive} />
                  
                  {/* Card */}
                  <div
                    className={cn(
                      "relative p-6 rounded-2xl transition-all duration-500",
                      "border bg-gradient-to-b from-white/[0.05] to-white/[0.02]",
                      "backdrop-blur-sm",
                      // Active/hover states
                      isActive
                        ? "border-accent/60 shadow-[0_0_40px_-10px_hsl(214_77%_50%/0.4)] scale-105"
                        : "border-white/[0.08] hover:border-white/20 hover:bg-white/[0.04]"
                    )}
                    style={{
                      boxShadow: isActive
                        ? '0 20px 50px -15px hsl(214 77% 50% / 0.3), 0 10px 30px -10px hsl(0 0% 0% / 0.4)'
                        : '0 8px 30px -10px hsl(0 0% 0% / 0.3)',
                    }}
                  >
                    {/* Icon with enhanced animation */}
                    <div
                      className={cn(
                        "inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4",
                        "transition-all duration-500",
                        isActive
                          ? "bg-accent/25 shadow-[0_0_20px_rgba(31,106,225,0.4)] scale-110"
                          : "bg-white/[0.06]"
                      )}
                    >
                      <card.icon
                        className={cn(
                          "w-6 h-6 transition-all duration-500",
                          isActive ? "text-accent scale-110" : "text-white/70"
                        )}
                      />
                    </div>

                    {/* Title */}
                    <h4 className={cn(
                      "text-lg font-semibold mb-2 transition-all duration-300",
                      isActive ? "text-white" : "text-white/90"
                    )}>
                      {card.title}
                    </h4>

                    {/* Description with smooth transition */}
                    <div className="relative overflow-hidden">
                      <p
                        className={cn(
                          "text-sm sm:text-base leading-relaxed transition-all duration-500",
                          isActive ? "text-white/80" : "text-white/50"
                        )}
                      >
                        {isActive ? card.fullText : card.shortText}
                      </p>
                    </div>

                    {/* Active indicator line */}
                    <div className={cn(
                      "absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] rounded-full",
                      "bg-gradient-to-r from-transparent via-accent to-transparent",
                      "transition-all duration-500",
                      isActive ? "w-16 opacity-100" : "w-0 opacity-0"
                    )} />
                    
                    {/* Corner accents */}
                    <div className={cn(
                      "absolute top-3 right-3 w-2 h-2 rounded-full",
                      "transition-all duration-500",
                      isActive ? "bg-accent/60" : "bg-white/10"
                    )} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile: Enhanced Accordion-style cards */}
        <div className="md:hidden space-y-3 max-w-md mx-auto">
          {cards.map((card, index) => {
            const isExpanded = expandedMobile === card.id;

            return (
              <Collapsible
                key={card.id}
                open={isExpanded}
                onOpenChange={() => handleMobileToggle(card.id)}
              >
                <div
                  className={cn(
                    "rounded-xl border transition-all duration-300",
                    "opacity-0 translate-y-4",
                    hasAnimated && "animate-card-reveal",
                    isExpanded
                      ? "border-accent/50 bg-white/[0.05] shadow-[0_0_30px_-10px_hsl(214_77%_50%/0.3)]"
                      : "border-white/[0.08] bg-transparent"
                  )}
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animationFillMode: 'forwards',
                  }}
                >
                  <CollapsibleTrigger className="w-full p-4 flex items-center gap-3 text-left">
                    {/* Icon */}
                    <div
                      className={cn(
                        "flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300",
                        isExpanded 
                          ? "bg-accent/20 shadow-[0_0_15px_rgba(31,106,225,0.3)]" 
                          : "bg-white/[0.06]"
                      )}
                    >
                      <card.icon
                        className={cn(
                          "w-5 h-5 transition-all duration-300",
                          isExpanded ? "text-accent" : "text-white/70"
                        )}
                      />
                    </div>

                    {/* Title */}
                    <span className="flex-1 text-base font-medium text-white">
                      {card.title}
                    </span>

                    {/* Chevron */}
                    <ChevronDown
                      className={cn(
                        "w-4 h-4 text-white/50 transition-transform duration-300",
                        isExpanded && "rotate-180 text-accent"
                      )}
                    />
                  </CollapsibleTrigger>

                  <CollapsibleContent className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                    <div className="px-4 pb-4 pt-0">
                      <p className="text-sm sm:text-base text-white/70 leading-relaxed pl-[52px]">
                        {card.fullText}
                      </p>
                    </div>
                  </CollapsibleContent>
                </div>
              </Collapsible>
            );
          })}
        </div>
      </div>
    </section>
  );
}
