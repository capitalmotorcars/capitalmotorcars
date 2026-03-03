import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { SEO } from '@/components/SEO';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, X } from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';
import { motion } from 'framer-motion';
import bg1 from '@/assets/background-mercedes.jpeg';
import bg2 from '@/assets/background-audi.jpg';
import bg3 from '@/assets/background-ford.jpg';

type BrandCategory = 'all' | 'luxury' | 'popular';

const brandCategories: { id: BrandCategory; label: string }[] = [
  { id: 'luxury', label: 'Luxury' },
  { id: 'popular', label: 'Popular' },
  { id: 'all', label: 'All Brands' },
];

const brands = [
  // Luxury brands
  { name: 'BMW', logo: 'https://www.carlogos.org/car-logos/bmw-logo.png', category: 'luxury' as BrandCategory },
  { name: 'Mercedes-Benz', logo: 'https://www.carlogos.org/car-logos/mercedes-benz-logo.png', category: 'luxury' as BrandCategory },
  { name: 'Audi', logo: 'https://www.carlogos.org/car-logos/audi-logo.png', category: 'luxury' as BrandCategory },
  { name: 'Lexus', logo: 'https://www.carlogos.org/car-logos/lexus-logo.png', category: 'luxury' as BrandCategory },
  { name: 'Porsche', logo: 'https://www.carlogos.org/car-logos/porsche-logo.png', category: 'luxury' as BrandCategory },
  { name: 'Acura', logo: 'https://www.carlogos.org/car-logos/acura-logo.png', category: 'luxury' as BrandCategory },
  { name: 'Alfa Romeo', logo: 'https://www.carlogos.org/car-logos/alfa-romeo-logo.png', category: 'luxury' as BrandCategory },
  { name: 'Aston Martin', logo: 'https://www.carlogos.org/car-logos/aston-martin-logo.png', category: 'luxury' as BrandCategory },
  { name: 'Bentley', logo: 'https://www.carlogos.org/car-logos/bentley-logo.png', category: 'luxury' as BrandCategory },
  { name: 'Cadillac', logo: 'https://www.carlogos.org/car-logos/cadillac-logo.png', category: 'luxury' as BrandCategory },
  { name: 'Infiniti', logo: 'https://www.carlogos.org/car-logos/infiniti-logo.png', category: 'luxury' as BrandCategory },
  { name: 'Jaguar', logo: 'https://www.carlogos.org/car-logos/jaguar-logo-2012-download.png', category: 'luxury' as BrandCategory },
  { name: 'Lamborghini', logo: 'https://www.carlogos.org/car-logos/lamborghini-logo.png', category: 'luxury' as BrandCategory },
  { name: 'Land Rover', logo: 'https://www.carlogos.org/car-logos/land-rover-logo.png', category: 'luxury' as BrandCategory },
  { name: 'Lincoln', logo: 'https://www.carlogos.org/car-logos/lincoln-logo.png', category: 'luxury' as BrandCategory },
  { name: 'Maserati', logo: 'https://www.carlogos.org/car-logos/maserati-logo.png', category: 'luxury' as BrandCategory },
  { name: 'Volvo', logo: 'https://www.carlogos.org/car-logos/volvo-logo.png', category: 'luxury' as BrandCategory },

  // Popular brands
  { name: 'Toyota', logo: 'https://www.carlogos.org/car-logos/toyota-logo.png', category: 'popular' as BrandCategory },
  { name: 'Honda', logo: 'https://www.carlogos.org/car-logos/honda-logo.png', category: 'popular' as BrandCategory },
  { name: 'Ford', logo: 'https://www.carlogos.org/car-logos/ford-logo.png', category: 'popular' as BrandCategory },
  { name: 'Chevrolet', logo: 'https://www.carlogos.org/car-logos/chevrolet-logo.png', category: 'popular' as BrandCategory },
  { name: 'Volkswagen', logo: 'https://www.carlogos.org/car-logos/volkswagen-logo.png', category: 'popular' as BrandCategory },
  { name: 'Hyundai', logo: 'https://www.carlogos.org/car-logos/hyundai-logo.png', category: 'popular' as BrandCategory },
  { name: 'Kia', logo: 'https://www.carlogos.org/car-logos/kia-logo.png', category: 'popular' as BrandCategory },
  { name: 'Nissan', logo: 'https://www.carlogos.org/car-logos/nissan-logo.png', category: 'popular' as BrandCategory },
  { name: 'Buick', logo: 'https://www.carlogos.org/car-logos/buick-logo.png', category: 'popular' as BrandCategory },
  { name: 'Chrysler', logo: 'https://www.carlogos.org/car-logos/chrysler-logo.png', category: 'popular' as BrandCategory },
  { name: 'Dodge', logo: 'https://www.carlogos.org/car-logos/dodge-logo.png', category: 'popular' as BrandCategory },
  { name: 'Fiat', logo: 'https://www.carlogos.org/car-logos/fiat-logo.png', category: 'popular' as BrandCategory },
  { name: 'Genesis', logo: 'https://www.carlogos.org/car-logos/genesis-logo.png', category: 'popular' as BrandCategory },
  { name: 'GMC', logo: 'https://www.carlogos.org/car-logos/gmc-logo.png', category: 'popular' as BrandCategory },
  { name: 'Jeep', logo: 'https://www.carlogos.org/car-logos/jeep-logo.png', category: 'popular' as BrandCategory },
  { name: 'Mazda', logo: 'https://www.carlogos.org/car-logos/mazda-logo.png', category: 'popular' as BrandCategory },
  { name: 'Mini', logo: 'https://www.carlogos.org/car-logos/mini-logo.png', category: 'popular' as BrandCategory },
  { name: 'Mitsubishi', logo: 'https://www.carlogos.org/car-logos/mitsubishi-logo.png', category: 'popular' as BrandCategory },
  { name: 'Ram', logo: 'https://www.carlogos.org/car-logos/ram-logo.png', category: 'popular' as BrandCategory },
  { name: 'Subaru', logo: 'https://www.carlogos.org/car-logos/subaru-logo.png', category: 'popular' as BrandCategory },
];

const getFilterCount = (filterId: BrandCategory): number | undefined => {
  const filtered = getFilteredBrands(filterId);
  return filtered.length > 0 ? filtered.length : undefined;
};

function getFilteredBrands(filter: BrandCategory) {
  if (filter === 'all') return brands;
  return brands.filter((b) => b.category === filter);
}

const categoryToBgIndex: Record<BrandCategory, number> = {
  'luxury': 0,
  'popular': 2,
  'all': 1,
};

const baseCardClass = cn(
  'rounded-2xl border bg-card overflow-hidden',
  'border-border dark:border-white/20 dark:bg-white/[0.03] dark:border-white/5 dark:shadow-black/30',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
);
const dialogPanelClass = cn(
  baseCardClass,
  'dark:bg-[#121212] dark:border-white/5 dark:shadow-black/30',
);
const dialogFadeTransition = { type: 'tween' as const, duration: 0.4, ease: 'easeOut' as const };

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
} as const;

export default function BrandsPage() {
  const [activeCategory, setActiveCategory] = useState<BrandCategory>('luxury');
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const { ref, isRevealed } = useScrollReveal();

  const filteredBrands = getFilteredBrands(activeCategory);

  const backgrounds = [bg1, bg2, bg3];
  const currentBgIndex = categoryToBgIndex[activeCategory];
  const currentBackground = backgrounds[currentBgIndex];

  return (
    <Layout >
      <SEO
        title="Car Brands We Lease | Luxury & Popular Models | Capital Motor Cars"
        description="Explore the wide range of car brands we lease in New Jersey, including BMW, Mercedes-Benz, Audi, Lexus, Toyota, and Ford. Get the best lease deals on any make or model."
        seoKeywords={['car brands', 'BMW lease NJ', 'Mercedes lease deals', 'Audi leasing', 'Lexus lease NJ', 'Toyota lease deals', 'popular car brands']}
        ogImage="/src/assets/hero-bg.jpg"
        canonicalPath="/brands"
      />

      <section className="pt-16 lg:pt-20  ">
        <div id="brands" className="relative h-full flex flex-col ">
          {/* Top half: Blurred background */}
          <div className="absolute top-0 left-0 right-0 h-[30vh] md:h-[45vh] overflow-hidden">
            <motion.img
              initial={{ scale: 1.1, opacity: 0 }}
              animate={{ scale: 1.05, opacity: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              src={currentBackground}
              alt=""
              className="w-full h-full object-cover object-center blur-[1.5px]"
              aria-hidden
            />
          </div>
          {/* Dark overlay on top half for text readability */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="absolute top-0 left-0 right-0 h-[30vh] md:h-[45vh] bg-gradient-to-b from-black/40 via-black/20 to-transparent"
            aria-hidden
          />

          {/* Gradient fade to bottom content */}
          <div
            className="absolute top-[17vh] md:top-[22.5vh] left-0 right-0 h-[17vh] md:h-[22.5vh] bg-gradient-to-b from-transparent via-white/20 to-white dark:to-[hsl(0,0%,4%)]"
            aria-hidden
          />

          {/* Bottom half: White background */}
          <div
            className="absolute top-[30vh] md:top-[45vh] left-0 right-0 bottom-0 bg-white dark:bg-[hsl(0,0%,4%)]"
            aria-hidden
          />

          {/* Content */}
          <div
            ref={ref}
            className={cn('relative z-10 flex-1 flex flex-col dark:bg-white/[0.02]', 'scroll-reveal', isRevealed && 'revealed')}
          >
            {/* Title and Filters */}
            <div className="relative z-50 mx-auto h-[30vh] md:h-[45vh] px-4 lg:px-8 flex flex-col items-center justify-center">
              <motion.h2
                {...fadeInUp}
                transition={{ ...fadeInUp.transition, delay: 0.1 }}
                className="text-2xl  md:text-7xl  font-bold text-white text-center pb-2 md:pb-4 xl:pb-6"
              >
                Brands We Work With
              </motion.h2>
              <motion.p
                {...fadeInUp}
                transition={{ ...fadeInUp.transition, delay: 0.2 }}
                className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-white/80 text-center max-w-3xl xl:max-w-5xl mx-auto pb-4 md:pb-6 xl:pb-8"
              >
                We work with a wide range of automotive brands and dealerships across New Jersey and beyond.
              </motion.p>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 md:gap-8 xl:gap-10 pb-4 md:pb-6 xl:pb-8"
              >
                <div className="flex flex-col items-center">
                  <span className="text-xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white">
                    12+
                  </span>
                  <span className="text-xs sm:text-sm md:text-base xl:text-lg text-white/80">
                    Brands
                  </span>
                </div>
                <div className="w-px h-12 sm:h-16 md:h-20 bg-white/30" />
                <div className="flex flex-col items-center">
                  <span className="text-xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white">
                    30+
                  </span>
                  <span className="text-xs sm:text-sm md:text-base xl:text-lg text-white/80">
                    Years Experience
                  </span>
                </div>
                <div className="w-px h-12 sm:h-16 md:h-20 bg-white/30" />
                <div className="flex flex-col items-center">
                  <span className="text-xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white">
                    35+
                  </span>
                  <span className="text-xs sm:text-sm md:text-base xl:text-lg text-white/80">
                    Dealerships
                  </span>
                </div>
              </motion.div>

              {/* Filter Navigation */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="relative z-50 mx-auto"
              >
                <div className="flex flex-wrap items-center gap-1 sm:gap-3 md:gap-4 xl:gap-6 justify-center max-w-[280px] sm:max-w-none">
                  {brandCategories.map((category) => {
                    const isActive = activeCategory === category.id;
                    const count = getFilterCount(category.id);
                    return (
                      <button
                        key={category.id}
                        onClick={() => setActiveCategory(category.id)}
                        className={cn(
                          'relative px-2 py-1.5 sm:px-4 sm:py-2 xl:px-6 xl:py-3 text-xs xl:text-xl font-bold transition-colors',
                          isActive
                            ? 'text-white'
                            : 'text-white/70 hover:text-white'
                        )}
                      >
                        {category.label}
                        {count !== undefined && (
                          <span className="ml-1 sm:ml-2 xl:ml-3 inline-flex items-center justify-center w-4 h-4 sm:w-5 sm:h-5 xl:w-6 xl:h-6 rounded-full bg-white/20 text-[10px] sm:text-xs xl:text-sm font-semibold">
                            {count}
                          </span>
                        )}
                        {isActive && (
                          <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-white" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            </div>

            {/* Brands Grid */}
            <div className="relative py-12 md:py-16 xl:py-20 z-10 overflow-hidden">
              {/* Subtle Background Glow - Matching ServicesPage */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[1000px] aspect-square pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 bg-accent/5 blur-[80px] rounded-full" />
              </div>
              <div className="mx-auto px-4 lg:px-8 xl:px-12">
                <div className="max-w-7xl xl:max-w-[90rem] mx-auto">
                  {/* Description */}
                  <div className="mb-8 sm:mb-10 md:mb-12 xl:mb-16 pb-6 sm:pb-8 md:pb-10 xl:pb-12 border-b border-border dark:border-white/20">
                    <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-black dark:text-white max-w-4xl xl:max-w-5xl text-center mx-auto">
                      Availability varies, so the best way to find out what is currently available is to talk to us directly.
                    </p>
                  </div>

                  {/* Brands Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4  gap-4 sm:gap-6 md:gap-8 xl:gap-10 mb-12 md:mb-16 xl:mb-20">
                    {filteredBrands.map((brand) => (
                      <Dialog.Root key={brand.name} open={selectedBrand === brand.name} onOpenChange={(open) => setSelectedBrand(open ? brand.name : null)}>
                        <Dialog.Trigger asChild>
                          <button
                            className="group flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 xl:p-10 rounded-xl border-2 border-border dark:border-white/10 bg-card dark:bg-white/[0.04] hover:border-accent hover:shadow-[0_0_40px_-10px_rgba(59,130,246,0.4)] transition-all duration-500 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                          >
                            <div className="flex items-center justify-center p-4 sm:p-6 mb-3 sm:mb-4 rounded-lg bg-muted dark:bg-white/10 w-full max-w-[160px] sm:max-w-[180px] md:max-w-[200px] xl:max-w-[220px] min-h-[100px] sm:min-h-[120px] md:min-h-[140px] xl:min-h-[160px] group-hover:bg-accent/10 transition-colors">
                              <img
                                src={brand.logo}
                                alt={brand.name}
                                loading="lazy"
                                decoding="async"
                                className="h-12 sm:h-16 md:h-20 xl:h-24 w-auto object-contain transition-transform group-hover:scale-110"
                              />
                            </div>
                            <span className="text-sm sm:text-base md:text-lg xl:text-xl font-semibold text-foreground group-hover:text-accent transition-colors text-center">
                              {brand.name}
                            </span>
                          </button>
                        </Dialog.Trigger>
                        <Dialog.Portal>
                          <Dialog.Overlay asChild>
                            <motion.div
                              className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={dialogFadeTransition}
                            />
                          </Dialog.Overlay>
                          <Dialog.Content asChild>
                            <motion.div
                              className="fixed inset-0 z-50 flex items-center justify-center p-4"
                              initial={{ opacity: 0, y: 24 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={dialogFadeTransition}
                              onClick={(e) => e.target === e.currentTarget && setSelectedBrand(null)}
                            >
                              <div className={cn(dialogPanelClass, 'w-full max-w-lg p-6 md:p-8')}>
                                <div className="flex items-start gap-4 mb-4">
                                  <div className="flex items-center justify-center shrink-0">
                                    <img
                                      src={brand.logo}
                                      alt={brand.name}
                                      className="h-16 w-16 md:h-20 md:w-20 object-contain"
                                    />
                                  </div>
                                  <div className="min-w-0 flex-1">
                                    <h3 className="text-xl md:text-2xl font-semibold text-foreground">{brand.name}</h3>
                                    <p className="text-sm md:text-base text-muted-foreground mt-1">
                                      {brand.category === 'luxury' ? 'Luxury Brand' : 'Popular Brand'}
                                    </p>
                                  </div>
                                  <Dialog.Close asChild>
                                    <button type="button" className="shrink-0 rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground" aria-label="Close">
                                      <X className="h-5 w-5" />
                                    </button>
                                  </Dialog.Close>
                                </div>
                                <p className="text-muted-foreground leading-relaxed mb-6">
                                  Interested in leasing a {brand.name} vehicle? Contact us to learn about current availability and special offers.
                                </p>
                                <Button
                                  asChild
                                  size="lg"
                                  className="w-full h-12 rounded-xl border border-accent/40 bg-accent hover:bg-accent/90 hover:border-accent text-accent-foreground font-semibold px-6 shadow-lg shadow-accent/30 hover:shadow-xl hover:shadow-accent/40 transition-all"
                                >
                                  <Link to="/contact" className="flex items-center justify-center gap-2" onClick={() => setSelectedBrand(null)}>
                                    Contact Us
                                    <ArrowRight className="w-5 h-5" />
                                  </Link>
                                </Button>
                              </div>
                            </motion.div>
                          </Dialog.Content>
                        </Dialog.Portal>
                      </Dialog.Root>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 xl:gap-6">
                    <Button
                      asChild
                      size="lg"
                      className="h-12 sm:h-14 xl:h-16 rounded-lg xl:rounded-xl border border-accent/40 bg-accent hover:bg-accent/90 hover:border-accent text-accent-foreground font-semibold xl:font-bold px-8 sm:px-10 xl:px-12 text-sm sm:text-base xl:text-lg glow-blue shadow-[0_2px_12px_hsl(214_77%_50%_/_0.25)] hover:shadow-[0_4px_18px_hsl(214_77%_55%_/_0.45)]"
                    >
                      <Link to="/contact" className="flex items-center justify-center gap-2 xl:gap-3">
                        Contact Us
                        <ArrowRight className="w-5 h-5 xl:w-6 xl:h-6" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout >
  );
}
