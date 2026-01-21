import { useEffect, useRef } from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const brands = [
  { name: 'BMW', logo: 'https://www.carlogos.org/car-logos/bmw-logo.png' },
  { name: 'Mercedes-Benz', logo: 'https://www.carlogos.org/car-logos/mercedes-benz-logo.png' },
  { name: 'Audi', logo: 'https://www.carlogos.org/car-logos/audi-logo.png' },
  { name: 'Lexus', logo: 'https://www.carlogos.org/car-logos/lexus-logo.png' },
  { name: 'Toyota', logo: 'https://www.carlogos.org/car-logos/toyota-logo.png' },
  { name: 'Honda', logo: 'https://www.carlogos.org/car-logos/honda-logo.png' },
  { name: 'Ford', logo: 'https://www.carlogos.org/car-logos/ford-logo.png' },
  { name: 'Chevrolet', logo: 'https://www.carlogos.org/car-logos/chevrolet-logo.png' },
  { name: 'Volkswagen', logo: 'https://www.carlogos.org/car-logos/volkswagen-logo.png' },
  { name: 'Hyundai', logo: 'https://www.carlogos.org/car-logos/hyundai-logo.png' },
  { name: 'Kia', logo: 'https://www.carlogos.org/car-logos/kia-logo.png' },
  { name: 'Nissan', logo: 'https://www.carlogos.org/car-logos/nissan-logo.png' },
  { name: 'Porsche', logo: 'https://www.carlogos.org/car-logos/porsche-logo.png' },
  { name: 'Tesla', logo: 'https://www.carlogos.org/car-logos/tesla-logo.png' },
];

export function BrandsCarousel() {
  const { ref, isRevealed } = useScrollReveal();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let animationId: number;
    let scrollPosition = 0;
    const scrollSpeed = 0.5; // pixels per frame

    const animate = () => {
      scrollPosition += scrollSpeed;
      
      // Reset position when we've scrolled half the content (since we duplicate it)
      const halfWidth = scrollContainer.scrollWidth / 2;
      if (scrollPosition >= halfWidth) {
        scrollPosition = 0;
      }
      
      scrollContainer.scrollLeft = scrollPosition;
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    // Pause on hover
    const handleMouseEnter = () => cancelAnimationFrame(animationId);
    const handleMouseLeave = () => {
      animationId = requestAnimationFrame(animate);
    };

    scrollContainer.addEventListener('mouseenter', handleMouseEnter);
    scrollContainer.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationId);
      scrollContainer.removeEventListener('mouseenter', handleMouseEnter);
      scrollContainer.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Duplicate brands for seamless infinite scroll
  const duplicatedBrands = [...brands, ...brands];

  return (
    <section className="py-16 md:py-20 bg-muted">
      <div
        ref={ref}
        className={`scroll-reveal ${isRevealed ? 'revealed' : ''}`}
      >
        <div className="container mx-auto px-4 lg:px-8 mb-10">
          <SectionHeading
            title="Brands We Work With"
            subtitle="Access to vehicles from all major manufacturers"
          />
        </div>

        {/* Carousel container */}
        <div className="relative overflow-hidden">
          {/* Gradient fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-r from-muted to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-l from-muted to-transparent z-10 pointer-events-none" />
          
          {/* Scrolling content */}
          <div
            ref={scrollRef}
            className="flex gap-8 md:gap-12 overflow-x-hidden py-4"
            style={{ scrollBehavior: 'auto' }}
          >
            {duplicatedBrands.map((brand, index) => (
              <div
                key={`${brand.name}-${index}`}
                className="flex-shrink-0 flex flex-col items-center justify-center px-4 md:px-6"
              >
                <div className="w-20 h-20 md:w-24 md:h-24 flex items-center justify-center bg-card rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="h-12 md:h-14 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
                  />
                </div>
                <span className="mt-3 text-xs md:text-sm font-medium text-muted-foreground">
                  {brand.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
