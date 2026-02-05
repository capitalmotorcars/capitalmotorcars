import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { cn } from '@/lib/utils';
import { vehicleTypes, VehicleTypeData } from '@/data/vehicleTypes';
import { Button } from '@/components/ui/button';
import bg1 from '@/assets/brand-backgrounds/bg-1.jpeg';
import bg2 from '@/assets/brand-backgrounds/bg-2.jpg';
import bg3 from '@/assets/brand-backgrounds/bg-3.jpg';

type FilterType = 'all' | 'suv' | 'hybrid-electric' | 'sedan';

const getFilterCount = (filterId: FilterType): number | undefined => {
  const vehicles = getFilteredVehicles(filterId);
  return vehicles.length > 0 ? vehicles.length : undefined;
};

const filters: { id: FilterType; label: string }[] = [
  { id: 'suv', label: 'SUV / CUV / MPV' },
  { id: 'hybrid-electric', label: 'Hybrid / Electric' },
  { id: 'sedan', label: 'Sedan' },
  { id: 'all', label: 'All Vehicles' },
];

function getFilteredVehicles(filter: FilterType): VehicleTypeData[] {
  if (filter === 'all') return vehicleTypes.filter((v) => v.isFeatured);
  if (filter === 'suv') return vehicleTypes.filter((v) => ['suv', 'crossover', 'minivan'].includes(v.slug));
  if (filter === 'hybrid-electric') return vehicleTypes.filter((v) => v.fuelTypes.includes('hybrid') || v.fuelTypes.includes('electric'));
  if (filter === 'sedan') return vehicleTypes.filter((v) => v.slug === 'sedan' || v.slug === 'luxury');
  return [];
}

function getVehicleSpecs(vehicle: VehicleTypeData) {
  const isElectric = vehicle.fuelTypes.includes('electric');
  const range = isElectric ? '305' : undefined;
  const mpge = isElectric ? '82-89 MPGe Comb.' : undefined;
  return {
    startingPrice: vehicle.startingPrice || 499,
    range,
    mpge,
  };
}

export function VehicleTypesCarousel() {
  const { ref, isRevealed } = useScrollReveal();
  const [activeFilter, setActiveFilter] = useState<FilterType>('hybrid-electric');
  const [currentIndex, setCurrentIndex] = useState(0);
  const filteredVehicles = getFilteredVehicles(activeFilter);
  const currentVehicle = filteredVehicles[currentIndex] || filteredVehicles[0];
  const specs = currentVehicle ? getVehicleSpecs(currentVehicle) : null;

  useEffect(() => {
    setCurrentIndex(0);
  }, [activeFilter]);

  const nextVehicle = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredVehicles.length);
  };

  const prevVehicle = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredVehicles.length) % filteredVehicles.length);
  };

  const prevVehicleData = filteredVehicles[(currentIndex - 1 + filteredVehicles.length) % filteredVehicles.length];
  const nextVehicleData = filteredVehicles[(currentIndex + 1) % filteredVehicles.length];

  const backgrounds = [bg1, bg2, bg3];
  const currentBgIndex = currentIndex % backgrounds.length;
  const currentBackground = backgrounds[currentBgIndex];

  return (
    <section id="discover" className="relative min-h-[90vh] flex flex-col overflow-hidden">
      {/* Top half: Blurred cityscape background */}
      <div
        className="absolute top-0 left-0 right-0 h-full bg-cover bg-center bg-no-repeat transition-opacity duration-1000"
        style={{
          backgroundImage: `url(${currentBackground})`,
          backgroundPosition: 'center top',
          filter: 'blur(4px)',
        }}
        aria-hidden
      />
      {/* Dark overlay on top half for text readability */}
      <div
        className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-black/40 via-black/20 to-transparent transition-opacity duration-1000"
        aria-hidden
      />
      {/* Bottom half: White background */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1/2 bg-white dark:bg-background"
        aria-hidden
      />

      {/* Content */}
      <div ref={ref} className={cn('relative z-10 flex-1 flex flex-col', 'scroll-reveal', isRevealed && 'revealed')}>
        {/* Title and Filters */}
        <div className=" mx-auto h-[45vh] px-4 lg:px-8 pt-12 md:pt-16 lg:pt-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center mb-8 md:mb-12">
            Discover The Car Of Your Dreams
          </h2>

          {/* Filter Navigation */}
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 mb-8 md:mb-12">
            {filters.map((filter) => {
              const isActive = activeFilter === filter.id;
              const count = getFilterCount(filter.id);
              return (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={cn(
                    'relative px-4 py-2 text-sm md:text-base font-medium transition-colors',
                    isActive
                      ? 'text-white'
                      : 'text-white/70 hover:text-white'
                  )}
                >
                  {filter.label}
                  {count !== undefined && (
                    <span className="ml-2 inline-flex items-center justify-center w-5 h-5 rounded-full bg-white/20 text-xs font-semibold">
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
        </div>

        {/* Car Carousel - positioned exactly at 50% (transition between background and white) */}
        <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 z-30 flex items-center justify-center py-8">
          {/* Left Arrow */}
          <button
            onClick={prevVehicle}
            className="absolute left-4 md:left-8 z-40 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/90 dark:bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-foreground hover:bg-white transition-colors shadow-lg"
            aria-label="Previous vehicle"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
          </button>

          {/* Cars */}
          <div className="relative w-full max-w-7xl mx-auto px-12 md:px-20 lg:px-32 flex items-center justify-center">
            {/* Previous Car (Left) */}
            {prevVehicleData && (
              <div className="absolute left-0 w-[25%] opacity-40 scale-75 transition-all duration-500 z-20">
                <img
                  src={prevVehicleData.image}
                  alt={prevVehicleData.name}
                  className="w-full h-auto object-contain"
                />
              </div>
            )}

            {/* Current Car (Center) */}
            {currentVehicle && (
              <div className="relative z-30 w-[50%] transition-all duration-500">
                <img
                  src={currentVehicle.image}
                  alt={currentVehicle.name}
                  className="w-full h-auto object-contain drop-shadow-2xl"
                />
              </div>
            )}

            {/* Next Car (Right) */}
            {nextVehicleData && (
              <div className="absolute right-0 w-[25%] opacity-40 scale-75 transition-all duration-500 z-20">
                <img
                  src={nextVehicleData.image}
                  alt={nextVehicleData.name}
                  className="w-full h-auto object-contain"
                />
              </div>
            )}
          </div>

          {/* Right Arrow */}
          <button
            onClick={nextVehicle}
            className="absolute right-4 md:right-8 z-40 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/90 dark:bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-foreground hover:bg-white transition-colors shadow-lg"
            aria-label="Next vehicle"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        </div>

        {/* Car Details - White Foreground (bottom half) */}
        {currentVehicle && specs && (
          <div className="relative bg-white dark:bg-background pt-20 md:pt-24 pb-12 md:pb-16 z-10" style={{ minHeight: '50vh' }}>
            <div className=" mx-auto px-4 lg:px-8 pt-20">
              <div className="max-w-6xl mx-auto">
                {/* Car Name */}
                <div className="flex items-baseline justify-center gap-3 mb-6 md:mb-8">
                  <span className="text-sm md:text-base text-muted-foreground">2026</span>
                  <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
                    {currentVehicle.name}
                  </h3>
                  <Link
                    to={`/vehicles/${currentVehicle.slug}`}
                    className="text-xs md:text-sm text-muted-foreground hover:text-accent underline"
                  >
                    Disclaimers
                  </Link>
                </div>

                {/* Specs Grid */}
                <div className={cn(
                  'grid gap-4 md:gap-8 mb-8 md:mb-10 pb-6 md:pb-8 border-b border-border',
                  specs.range && specs.mpge ? 'grid-cols-3' : 'grid-cols-1 max-w-md mx-auto'
                )}>
                  <div className="text-center">
                    <p className="text-xs md:text-sm text-muted-foreground mb-1 md:mb-2">STARTING AT</p>
                    <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">
                      ${specs.startingPrice.toLocaleString()}/mo<sup className="text-xs md:text-sm ml-1">¹</sup>
                    </p>
                  </div>
                  {specs.range && (
                    <div className={cn('text-center', specs.mpge && 'border-x border-border')}>
                      <p className="text-xs md:text-sm text-muted-foreground mb-1 md:mb-2">RANGE UP TO</p>
                      <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">
                        {specs.range} miles<sup className="text-xs md:text-sm ml-1">²</sup>
                      </p>
                    </div>
                  )}
                  {specs.mpge && (
                    <div className="text-center">
                      <p className="text-xs md:text-sm text-muted-foreground mb-1 md:mb-2">MPGe UP TO</p>
                      <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">
                        {specs.mpge}<sup className="text-xs md:text-sm ml-1">³</sup>
                      </p>
                    </div>
                  )}
                </div>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6">
                  <Link
                    to={`/vehicles/${currentVehicle.slug}`}
                    className="text-sm md:text-base font-medium text-foreground hover:text-accent transition-colors flex items-center gap-1"
                  >
                    Build yours <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Button
                    asChild
                    size="lg"
                    className="bg-foreground dark:bg-white text-background dark:text-foreground hover:opacity-90 px-6 md:px-8"
                  >
                    <Link to={`/vehicles/${currentVehicle.slug}`}>Learn more</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
