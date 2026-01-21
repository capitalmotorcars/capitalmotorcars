import { useEffect, useRef } from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const vehicleTypes = [
  {
    name: 'Luxury',
    // Real car photos (not illustrated/graphic)
    image:
      'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=900&h=520&fit=crop&auto=format',
  },
  {
    name: 'Electric',
    image:
      'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=900&h=520&fit=crop&auto=format',
  },
  {
    name: 'SUV',
    image:
      'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=900&h=520&fit=crop&auto=format',
  },
  {
    name: 'Sedan',
    image:
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=900&h=520&fit=crop&auto=format',
  },
  {
    name: 'Sports',
    image:
      'https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?w=900&h=520&fit=crop&auto=format',
  },
  {
    name: 'Coupe',
    image:
      'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=900&h=520&fit=crop&auto=format',
  },
  {
    name: 'Crossover',
    image:
      'https://images.unsplash.com/photo-1605559424843-9e7712e66b52?w=900&h=520&fit=crop&auto=format',
  },
  {
    name: 'Truck',
    image:
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=900&h=520&fit=crop&auto=format',
  },
  {
    name: 'Minivan',
    image:
      'https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?w=900&h=520&fit=crop&auto=format',
  },
  {
    name: 'Convertible',
    image:
      'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=900&h=520&fit=crop&auto=format',
  },
];

export function VehicleTypesCarousel() {
  const { ref, isRevealed } = useScrollReveal();
  const scrollRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();
  const scrollPositionRef = useRef(0);
  const isPausedRef = useRef(false);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const scrollSpeed = 0.4;

    const animate = () => {
      if (!isPausedRef.current && scrollContainer) {
        scrollPositionRef.current += scrollSpeed;
        
        const halfWidth = scrollContainer.scrollWidth / 2;
        if (scrollPositionRef.current >= halfWidth) {
          scrollPositionRef.current = 0;
        }
        
        scrollContainer.scrollLeft = scrollPositionRef.current;
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    const handleMouseEnter = () => { isPausedRef.current = true; };
    const handleMouseLeave = () => { isPausedRef.current = false; };

    scrollContainer.addEventListener('mouseenter', handleMouseEnter);
    scrollContainer.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      scrollContainer.removeEventListener('mouseenter', handleMouseEnter);
      scrollContainer.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;
    
    const scrollAmount = 300;
    const newPosition = direction === 'left' 
      ? scrollPositionRef.current - scrollAmount 
      : scrollPositionRef.current + scrollAmount;
    
    scrollPositionRef.current = Math.max(0, newPosition);
    scrollContainer.scrollTo({ left: scrollPositionRef.current, behavior: 'smooth' });
  };

  const duplicatedTypes = [...vehicleTypes, ...vehicleTypes];

  return (
    <section className="py-16 md:py-24 bg-muted">
      <div
        ref={ref}
        className={`scroll-reveal ${isRevealed ? 'revealed' : ''}`}
      >
        <div className="container mx-auto px-4 lg:px-8 mb-10">
          <SectionHeading
            title="Discover The Car Of Your Dreams"
            subtitle="Find the perfect vehicle type for your lifestyle"
          />
        </div>

        {/* Carousel container */}
        <div className="relative">
          {/* Navigation arrows */}
          <button
            onClick={() => scroll('left')}
            className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-background/80 hover:bg-background rounded-full shadow-lg transition-all text-primary"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-background/80 hover:bg-background rounded-full shadow-lg transition-all text-primary"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
          </button>

          {/* Gradient fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-r from-muted to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-l from-muted to-transparent z-10 pointer-events-none" />
          
          {/* Scrolling content */}
          <div
            ref={scrollRef}
            className="flex gap-6 md:gap-8 overflow-x-hidden py-4 px-12 md:px-20"
            style={{ scrollBehavior: 'auto' }}
          >
            {duplicatedTypes.map((type, index) => (
              <div
                key={`${type.name}-${index}`}
                className="flex-shrink-0 flex flex-col items-center group cursor-pointer"
              >
                <div className="w-44 h-28 md:w-60 md:h-36 flex items-center justify-center overflow-hidden rounded-lg bg-background shadow-sm border border-border px-3">
                  <img
                    src={type.image}
                    alt={type.name}
                    loading="lazy"
                    className="w-full h-full object-contain group-hover:scale-[1.03] transition-transform duration-300"
                  />
                </div>
                <span className="mt-4 text-sm md:text-base font-semibold text-primary group-hover:text-accent transition-colors">
                  {type.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
