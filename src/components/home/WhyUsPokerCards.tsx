import { useState } from 'react';
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

export function WhyUsPokerCards() {
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [expandedMobile, setExpandedMobile] = useState<number | null>(null);
  const { ref, isRevealed } = useScrollReveal();

  const handleCardClick = (id: number) => {
    setActiveCard(activeCard === id ? null : id);
  };

  const handleMobileToggle = (id: number) => {
    setExpandedMobile(expandedMobile === id ? null : id);
  };

  return (
    <section className="py-12 md:py-28" style={{ backgroundColor: 'hsl(216 27% 6%)' }}>
      <div
        ref={ref}
        className={`container mx-auto px-4 lg:px-8 scroll-reveal ${isRevealed ? 'revealed' : ''}`}
      >
        <SectionHeading
          title="Why Work with Capital Motor Cars"
          dark
        />

        {/* Desktop: Poker Cards with overlap */}
        <div className="hidden md:flex justify-center items-center gap-0 max-w-4xl mx-auto">
          {cards.map((card, index) => {
            const isActive = activeCard === card.id;
            const isHovered = false; // Handled by CSS hover
            
            return (
              <div
                key={card.id}
                onClick={() => handleCardClick(card.id)}
                className={cn(
                  "relative w-72 p-6 rounded-xl cursor-pointer transition-all duration-200 ease-out",
                  "border bg-gradient-to-b from-white/[0.04] to-transparent",
                  // Overlap positioning
                  index === 0 && "z-10 -mr-4",
                  index === 1 && "z-20",
                  index === 2 && "z-10 -ml-4",
                  // Hover and active states
                  isActive
                    ? "z-30 -translate-y-2 border-accent shadow-lg shadow-accent/10"
                    : "border-white/[0.08] hover:z-25 hover:-translate-y-1 hover:border-white/20"
                )}
                style={{
                  boxShadow: isActive
                    ? '0 8px 32px -8px hsl(213 90% 55% / 0.2)'
                    : '0 4px 24px -4px hsl(0 0% 0% / 0.3)',
                }}
              >
                {/* Icon */}
                <div
                  className={cn(
                    "inline-flex items-center justify-center w-10 h-10 rounded-lg mb-4 transition-colors duration-200",
                    isActive
                      ? "bg-accent/20"
                      : "bg-white/[0.06]"
                  )}
                >
                  <card.icon
                    className={cn(
                      "w-5 h-5 transition-colors duration-200",
                      isActive ? "text-accent" : "text-white/70"
                    )}
                  />
                </div>

                {/* Title */}
                <h4 className="text-lg font-semibold text-white mb-2">
                  {card.title}
                </h4>

                {/* Description - short or full based on active state */}
                <p
                  className={cn(
                    "text-sm leading-relaxed transition-opacity duration-200",
                    isActive ? "text-white/80" : "text-white/50"
                  )}
                >
                  {isActive ? card.fullText : card.shortText}
                </p>

                {/* Active indicator */}
                {isActive && (
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-0.5 bg-accent rounded-full" />
                )}
              </div>
            );
          })}
        </div>

        {/* Mobile: Accordion-style vertical cards */}
        <div className="md:hidden space-y-3 max-w-md mx-auto">
          {cards.map((card) => {
            const isExpanded = expandedMobile === card.id;

            return (
              <Collapsible
                key={card.id}
                open={isExpanded}
                onOpenChange={() => handleMobileToggle(card.id)}
              >
                <div
                  className={cn(
                    "rounded-xl border transition-all duration-200",
                    isExpanded
                      ? "border-accent bg-white/[0.04]"
                      : "border-white/[0.08] bg-transparent"
                  )}
                >
                  <CollapsibleTrigger className="w-full p-4 flex items-center gap-3 text-left">
                    {/* Icon */}
                    <div
                      className={cn(
                        "flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center transition-colors duration-200",
                        isExpanded ? "bg-accent/20" : "bg-white/[0.06]"
                      )}
                    >
                      <card.icon
                        className={cn(
                          "w-4 h-4 transition-colors duration-200",
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
                        "w-4 h-4 text-white/50 transition-transform duration-200",
                        isExpanded && "rotate-180"
                      )}
                    />
                  </CollapsibleTrigger>

                  <CollapsibleContent className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                    <div className="px-4 pb-4 pt-0">
                      <p className="text-sm text-white/70 leading-relaxed pl-12">
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
