import { SectionHeading } from '@/components/ui/SectionHeading';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Marquee } from '@/components/ui/Marquee';
import { cn } from '@/lib/utils';

export const brands = [
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
];

interface BrandCardProps {
  name: string;
  logo: string;
  /** Use "card" for hero strip: rounded card with border, bg, shadow. Omit for plain marquee. */
  variant?: 'default' | 'card';
}

export function BrandCard({ name, logo, variant = 'default' }: BrandCardProps) {
  if (variant === 'card') {
    return (
      <div className="group/card relative flex h-full w-28 sm:w-32 p-2 shrink-0 cursor-default overflow-hidden flex-col items-center justify-center text-center transition-all duration-300 rounded-2xl border border-white/15 bg-white/5 dark:bg-white/[0.06] shadow-md shadow-black/5 dark:shadow-black/20 backdrop-blur-sm hover:border-white/25 hover:bg-white/10 dark:hover:bg-white/10 hover:shadow-lg hover:shadow-black/10 dark:hover:shadow-black/30">
        <div className="flex flex-col items-center justify-center gap-1">
          <img
            src={logo}
            alt={name}
            loading="lazy"
            decoding="async"
            className="h-10 w-10 sm:h-14 sm:w-14 object-contain grayscale transition-[filter] duration-300 group-hover/card:grayscale-0"
          />
          <span className="text-[10px] sm:text-xs font-medium text-white/90 dark:text-white/90">
            {name}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="group/card relative flex h-full w-44 shrink-0 cursor-default overflow-hidden p-4 flex-col items-center justify-center text-center transition-all duration-300">
      <div className="flex flex-col items-center justify-center gap-2">
        <img
          src={logo}
          alt={name}
          loading="lazy"
          decoding="async"
          className="h-12 w-12 md:h-14 md:w-14 object-contain grayscale transition-[filter] duration-300 group-hover/card:grayscale-0"
        />
        <span className="text-xs font-medium text-foreground dark:text-white/90">
          {name}
        </span>
      </div>
    </div>
  );
}

export function BrandsCarousel() {
  const { ref, isRevealed } = useScrollReveal();

  return (
    <section className="pt-6 pb-6 md:pt-20 md:pb-24 section-bg">
      <div ref={ref} className={cn('scroll-reveal', isRevealed && 'revealed')}>
        <div className="container mx-auto px-4 lg:px-8 mb-6 md:mb-10">
          <SectionHeading
            title="Brands We Work With"
            subtitle="Access to vehicles from all major manufacturers"
          />
        </div>

        <div className="relative flex w-full max-w-[100rem] items-center justify-center overflow-hidden mx-auto px-4 lg:px-8">
          <Marquee pauseOnHover className="[--duration:30s] [--gap:1.5rem]">
            {brands.map((brand) => (
              <BrandCard key={brand.name} name={brand.name} logo={brand.logo} />
            ))}
          </Marquee>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-muted to-transparent dark:from-[hsl(0_0%_4%)]" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-muted to-transparent dark:from-[hsl(0_0%_4%)]" />
        </div>
      </div>
    </section>
  );
}
