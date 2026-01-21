import { useEffect, useRef } from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { ChevronsLeft, ChevronsRight } from 'lucide-react';

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
    name: 'Hatchback',
    image:
      'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=900&h=520&fit=crop&auto=format',
  },
  {
    name: 'Sedan',
    image:
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=900&h=520&fit=crop&auto=format',
  },
  {
    name: 'Truck',
    image:
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&h=520&fit=crop&auto=format',
  },
  {
    name: 'Sports',
    image:
      'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=900&h=520&fit=crop&auto=format',
  },
  {
    name: 'SUV',
    image:
      'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=900&h=520&fit=crop&auto=format',
  },
  {
    name: 'Coupe',
    image:
      'https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?w=900&h=520&fit=crop&auto=format',
  },
  {
    name: 'Minivan',
    image:
      'https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?w=900&h=520&fit=crop&auto=format',
  },
  {
    name: 'Crossover',
    image:
      'https://images.unsplash.com/photo-1605559424843-9e7712e66b52?w=900&h=520&fit=crop&auto=format',
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
    <section className="py-16 md:py-24 bg-background">
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
            className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-20 p-2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Scroll left"
          >
            <ChevronsLeft className="w-7 h-7 md:w-8 md:h-8" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-20 p-2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Scroll right"
          >
            <ChevronsRight className="w-7 h-7 md:w-8 md:h-8" />
          </button>
          
          {/* Scrolling content */}
          <div
            ref={scrollRef}
            className="flex gap-14 md:gap-24 overflow-x-hidden py-6 px-14 md:px-24"
            style={{ scrollBehavior: 'auto' }}
          >
            {duplicatedTypes.map((type, index) => (
              <div
                key={`${type.name}-${index}`}
                className="flex-shrink-0 flex flex-col items-center group cursor-pointer"
              >
                <div className="w-60 h-28 md:w-80 md:h-36 flex items-center justify-center overflow-visible">
                  <img
                    src={type.image}
                    alt={type.name}
                    loading="lazy"
                    className="w-full h-full object-contain drop-shadow-md group-hover:scale-[1.02] transition-transform duration-300"
                  />
                </div>
                <span className="mt-6 text-sm md:text-base font-semibold text-muted-foreground group-hover:text-foreground transition-colors">
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
