import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { ChevronsLeft, ChevronsRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import minivanImage from '@/assets/minivan-odyssey.png';
import hatchbackImage from '@/assets/hatchback-audi-rs5.png';
import electricImage from '@/assets/electric-mercedes-eqc.png';
import truckImage from '@/assets/truck-ford-raptor.png';
import luxuryImage from '@/assets/luxury-sedan.png';
import mercedesLuxurySedanImage from '@/assets/mercedes-luxury-sedan.png';

const vehicleTypes = [
  {
    name: 'Luxury',
    slug: 'luxury',
    image: luxuryImage,
  },
  {
    name: 'Electric',
    slug: 'electric',
    image: electricImage,
  },
  {
    name: 'Hatchback',
    slug: 'hatchback',
    image: hatchbackImage,
  },
  {
    name: 'Sedan',
    slug: 'sedan',
    image: 'https://pngimg.com/uploads/audi/audi_PNG1736.png',
  },
  {
    name: 'Truck',
    slug: 'truck',
    image: truckImage,
  },
  {
    name: 'Sports',
    slug: 'sports',
    image: 'https://pngimg.com/uploads/porsche/porsche_PNG10620.png',
  },
  {
    name: 'SUV',
    slug: 'suv',
    image: 'https://pngimg.com/uploads/land_rover/land_rover_PNG55.png',
  },
  {
    name: 'Coupe',
    slug: 'coupe',
    image: mercedesLuxurySedanImage,
  },
  {
    name: 'Minivan',
    slug: 'minivan',
    image: minivanImage,
  },
  {
    name: 'Crossover',
    slug: 'crossover',
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
    <section id="discover" className="pt-10 pb-10 md:pt-20 md:pb-24 bg-[hsl(0_0%_4%)]">
      <div
        ref={ref}
        className={`scroll-reveal ${isRevealed ? 'revealed' : ''}`}
      >
        <div className="container mx-auto px-4 lg:px-8 mb-6 md:mb-10">
          <SectionHeading
            title="Discover The Car Of Your Dreams"
            subtitle="Find the perfect vehicle type for your lifestyle"
            dark
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
          <div className="pointer-events-none absolute inset-y-0 left-0 w-12 md:w-24 bg-gradient-to-r from-[hsl(0_0%_4%)] to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-12 md:w-24 bg-gradient-to-l from-[hsl(0_0%_4%)] to-transparent z-10" />
          
          {/* Scrolling content */}
          <div
            ref={scrollRef}
            className="flex gap-6 md:gap-16 lg:gap-20 overflow-x-hidden py-6 md:py-12 px-4 md:px-12 lg:px-28"
            style={{ scrollBehavior: 'auto' }}
          >
            {duplicatedTypes.map((type, index) => (
              <Link
                key={`${type.name}-${index}`}
                to={`/vehicles/${type.slug}`}
                className="flex-shrink-0 flex flex-col items-center group"
              >
                <div className="w-[220px] h-[140px] sm:w-[280px] sm:h-[175px] md:w-[320px] md:h-[200px] flex items-center justify-center overflow-visible shrink-0">
                  <img
                    src={type.image}
                    alt={type.name}
                    loading="lazy"
                    decoding="async"
                    className={cn(
                      'w-full h-full object-contain drop-shadow-lg group-hover:scale-[1.02] transition-transform duration-300',
                      type.slug === 'luxury' && 'scale-125'
                    )}
                  />
                </div>
                <span className="mt-4 md:mt-8 text-xs md:text-base font-semibold text-white/90 group-hover:text-white transition-colors">
                  {type.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
