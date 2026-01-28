import { useEffect, useRef } from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { ChevronsLeft, ChevronsRight } from 'lucide-react';
import minivanImage from '@/assets/minivan-odyssey.png';
import coupeImage from '@/assets/coupe-bmw-m8.png';

const vehicleTypes = [
  {
    name: 'Luxury',
    image: 'https://pngimg.com/uploads/mercedes/mercedes_PNG80134.png',
  },
  {
    name: 'Electric',
    image: 'https://pngimg.com/uploads/tesla_car/tesla_car_PNG51.png',
  },
  {
    name: 'Hatchback',
    image: 'https://pngimg.com/uploads/volkswagen/volkswagen_PNG1818.png',
  },
  {
    name: 'Sedan',
    image: 'https://pngimg.com/uploads/audi/audi_PNG1736.png',
  },
  {
    name: 'Truck',
    image: 'https://pngimg.com/uploads/ford/ford_PNG12251.png',
  },
  {
    name: 'Sports',
    image: 'https://pngimg.com/uploads/porsche/porsche_PNG10620.png',
  },
  {
    name: 'SUV',
    image: 'https://pngimg.com/uploads/land_rover/land_rover_PNG55.png',
  },
  {
    name: 'Coupe',
    image: coupeImage,
  },
  {
    name: 'Minivan',
    image: minivanImage,
  },
  {
    name: 'Crossover',
    image: 'https://pngimg.com/uploads/lexus/lexus_PNG10.png',
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

    const handleMouseEnter = () => {
      isPausedRef.current = true;
    };
    const handleMouseLeave = () => {
      isPausedRef.current = false;
    };

    // Pause while the user is dragging / touching (mobile + desktop)
    const handlePointerDown = () => {
      isPausedRef.current = true;
    };
    const handlePointerUp = () => {
      isPausedRef.current = false;
    };
    const handlePointerCancel = () => {
      isPausedRef.current = false;
    };

    scrollContainer.addEventListener('mouseenter', handleMouseEnter);
    scrollContainer.addEventListener('mouseleave', handleMouseLeave);
    scrollContainer.addEventListener('pointerdown', handlePointerDown);
    scrollContainer.addEventListener('pointerup', handlePointerUp);
    scrollContainer.addEventListener('pointercancel', handlePointerCancel);
    scrollContainer.addEventListener('pointerleave', handlePointerUp);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      scrollContainer.removeEventListener('mouseenter', handleMouseEnter);
      scrollContainer.removeEventListener('mouseleave', handleMouseLeave);
      scrollContainer.removeEventListener('pointerdown', handlePointerDown);
      scrollContainer.removeEventListener('pointerup', handlePointerUp);
      scrollContainer.removeEventListener('pointercancel', handlePointerCancel);
      scrollContainer.removeEventListener('pointerleave', handlePointerUp);
    };
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;
    
    const scrollAmount = 300;
    const halfWidth = scrollContainer.scrollWidth / 2;
    const rawPosition = direction === 'left'
      ? scrollPositionRef.current - scrollAmount
      : scrollPositionRef.current + scrollAmount;

    // Keep position within the looping range
    const nextPosition = ((rawPosition % halfWidth) + halfWidth) % halfWidth;
    scrollPositionRef.current = nextPosition;
    scrollContainer.scrollTo({ left: nextPosition, behavior: 'smooth' });
  };

  const duplicatedTypes = [...vehicleTypes, ...vehicleTypes];

  return (
    <section className="py-10 md:py-24 bg-muted">
      <div
        ref={ref}
        className={`scroll-reveal ${isRevealed ? 'revealed' : ''}`}
      >
        <div className="container mx-auto px-4 lg:px-8 mb-6 md:mb-10">
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
            className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-20 inline-flex items-center justify-center rounded-full border border-border bg-background/70 backdrop-blur-sm shadow-sm p-2 text-foreground hover:bg-background transition-colors"
            aria-label="Scroll left"
          >
            <ChevronsLeft className="w-7 h-7 md:w-9 md:h-9" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-20 inline-flex items-center justify-center rounded-full border border-border bg-background/70 backdrop-blur-sm shadow-sm p-2 text-foreground hover:bg-background transition-colors"
            aria-label="Scroll right"
          >
            <ChevronsRight className="w-7 h-7 md:w-9 md:h-9" />
          </button>

          {/* Edge fade masks (keeps the row looking like the reference) */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-muted to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-muted to-transparent z-10" />
          
          {/* Scrolling content */}
          <div
            ref={scrollRef}
            className="flex gap-6 md:gap-16 lg:gap-20 overflow-x-hidden py-6 md:py-12 px-12 md:px-28"
            style={{ scrollBehavior: 'auto' }}
          >
            {duplicatedTypes.map((type, index) => (
              <div
                key={`${type.name}-${index}`}
                className="flex-shrink-0 flex flex-col items-center group cursor-pointer"
              >
                <div className="w-[180px] h-[100px] sm:w-[240px] sm:h-[130px] md:w-[300px] md:h-[160px] flex items-center justify-center overflow-visible">
                  <img
                    src={type.image}
                    alt={type.name}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-contain drop-shadow-lg group-hover:scale-[1.02] transition-transform duration-300"
                  />
                </div>
                <span className="mt-4 md:mt-8 text-xs md:text-base font-semibold text-foreground/80 group-hover:text-foreground transition-colors">
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
