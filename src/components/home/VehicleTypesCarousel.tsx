import { useEffect, useState } from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { MotionCarousel } from '@/components/home/MotionCarousel';
import { cn } from '@/lib/utils';

function useCarouselSize() {
  const [baseWidth, setBaseWidth] = useState(520);
  const [cardHeight, setCardHeight] = useState(320);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 640) {
        setBaseWidth(260);
        setCardHeight(240);
      } else if (w < 768) {
        setBaseWidth(320);
        setCardHeight(280);
      } else if (w < 1024) {
        setBaseWidth(420);
        setCardHeight(300);
      } else {
        setBaseWidth(520);
        setCardHeight(320);
      }
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return { baseWidth, cardHeight };
}
import minivanImage from '@/assets/minivan-odyssey.png';
import hatchbackImage from '@/assets/hatchback-audi-rs5.png';
import electricImage from '@/assets/electric-mercedes-eqc.png';
import truckImage from '@/assets/truck-ford-raptor.png';
import luxuryImage from '@/assets/luxury-sedan.png';
import mercedesLuxurySedanImage from '@/assets/mercedes-luxury-sedan.png';
import crossoverImage from '@/assets/crossover-lexus-ux.png';

const vehicleTypes = [
  { name: 'Luxury', slug: 'luxury', image: luxuryImage, description: 'Premium comfort, refined style, and top-tier features.' },
  { name: 'Electric', slug: 'electric', image: electricImage, description: 'Zero emissions, lower running costs, quiet drive.' },
  { name: 'Hatchback', slug: 'hatchback', image: hatchbackImage, description: 'Compact, practical, and fun to drive.' },
  { name: 'Sedan', slug: 'sedan', image: 'https://pngimg.com/uploads/audi/audi_PNG1736.png', description: 'Classic four-door comfort and everyday versatility.' },
  { name: 'Truck', slug: 'truck', image: truckImage, description: 'Towing, payload, and off-road capability.' },
  { name: 'Sports', slug: 'sports', image: 'https://pngimg.com/uploads/porsche/porsche_PNG10620.png', description: 'Performance-focused driving and agility.' },
  { name: 'SUV', slug: 'suv', image: 'https://pngimg.com/uploads/land_rover/land_rover_PNG55.png', description: 'Space, visibility, and all-weather confidence.' },
  { name: 'Coupe', slug: 'coupe', image: mercedesLuxurySedanImage, description: 'Sleek two-door design and sporty character.' },
  { name: 'Minivan', slug: 'minivan', image: minivanImage, description: 'Maximum passenger and cargo space for families.' },
  { name: 'Crossover', slug: 'crossover', image: crossoverImage, description: 'SUV versatility with car-like handling.' },
].map((t, i) => ({ ...t, id: i + 1 }));

export function VehicleTypesCarousel() {
  const { ref, isRevealed } = useScrollReveal();
  const { baseWidth, cardHeight } = useCarouselSize();

  return (
    <section id="discover" className="pt-16 pb-16 md:pt-20 md:pb-24  ">
      <div ref={ref} className={cn('scroll-reveal', isRevealed && 'revealed')}>
        <div className="container mx-auto px-4 lg:px-8 mb-6 md:mb-10">
          <SectionHeading
            title="Discover The Car Of Your Dreams"
            subtitle="Find the perfect vehicle type for your lifestyle"
          />
        </div>

        <div className="relative w-full max-w-[120rem] mx-auto px-4 lg:px-8 rounded-2xl py-4 md:py-6">
          <MotionCarousel
            items={vehicleTypes}
            baseWidth={baseWidth}
            cardHeight={cardHeight}
            autoplay
            pauseOnHover
            loop
            round={false}
            className="min-h-[280px] sm:min-h-[320px] md:min-h-[360px]"
          />

          <div className="pointer-events-none absolute inset-y-0 left-0 w-12 md:w-24 bg-gradient-to-r from-muted to-transparent dark:from-[hsl(0_0%_4%)] z-10 rounded-l-2xl" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-12 md:w-24 bg-gradient-to-l from-muted to-transparent dark:from-[hsl(0_0%_4%)] z-10 rounded-r-2xl" />
        </div>
      </div>
    </section>
  );
}
