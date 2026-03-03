import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight, Search } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { cn } from '@/lib/utils';
import { getAllVehicleTypes } from '@/services/vehicleTypeService';
import type { VehicleType } from '@/types/vehicle';
import { Button } from '@/components/ui/button';
import bg1 from '@/assets/brand-backgrounds/bg-1.jpeg';
import bg2 from '@/assets/brand-backgrounds/bg-2.jpg';
import bg3 from '@/assets/brand-backgrounds/bg-3.jpg';
import bg4 from '@/assets/brand-backgrounds/bg-4.jpg';

type FilterType = 'all' | 'suv' | 'sedan' | 'luxury';


const filters: { id: FilterType; label: string }[] = [
  { id: 'suv', label: 'SUV / CUV / MPV' },
  { id: 'sedan', label: 'Sedan' },
  { id: 'luxury', label: 'Luxury' },
  { id: 'all', label: 'All' },
];

function getVehicleSpecs(vehicle: VehicleType) {
  const specs = {
    startingPrice: vehicle.startingPrice || (vehicle as any).starting_price || 0,
    range: vehicle.fuelEconomy?.range || (vehicle as any).fuel_economy?.range || 0,
    mpge: 0, 
    mpg: vehicle.fuelEconomy?.avg || (vehicle as any).fuel_economy?.avg || 0,
  };

  return specs;
}

interface VehicleTypesCarouselProps {
  title?: string;
  subtitle?: string;
  sectionId?: string;
}

export function VehicleTypesCarousel({
  title = "Discover The Car Of Your Dreams",
  subtitle,
  sectionId = "discover"
}: VehicleTypesCarouselProps) {
  const { ref, isRevealed } = useScrollReveal();
  const [activeFilter, setActiveFilter] = useState<FilterType>('sedan');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [allVehicles, setAllVehicles] = useState<VehicleType[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function load() {
      const res = await getAllVehicleTypes();
      if (res.success && res.data) {
        setAllVehicles(res.data);
      } else {
        console.error("Failed to load vehicles:", res.error);
      }
      setLoading(false);
    }
    load();
  }, []);

  const getFilteredVehicles = (filter: FilterType): VehicleType[] => {
    const visibleVehicles = allVehicles.filter(v => v.showInHero === true);

    if (filter === 'all') {
      return visibleVehicles.sort((a, b) => {
        const orderA = a.sortOrder || (a as any).sort_order || 999;
        const orderB = b.sortOrder || (b as any).sort_order || 999;
        return orderA - orderB;
      });
    }

    const normalizedBodyStyle = (v: VehicleType) => (v.bodyStyle || (v as any).body_style || '').toLowerCase();
    const normalizedSlug = (v: VehicleType) => (v.slug || '').toLowerCase();
    const displayCategory = (v: VehicleType) => (v.displayCategory || (v as any).display_category || '').toLowerCase();

    return visibleVehicles.filter((v) => {
      const category = displayCategory(v);
      const isLux = (v.isLuxury || (v as any).is_luxury);

      if (filter === 'luxury') {
        return isLux || category === 'luxury';
      }

      if (category && category !== '') {
        return category === filter;
      }

      if (filter === 'suv') {
        const style = normalizedBodyStyle(v);
        return style.includes('suv') || style.includes('crossover') || style.includes('minivan');
      }

      if (filter === 'sedan') {
        const style = normalizedBodyStyle(v);
        const slug = normalizedSlug(v);
        return style.includes('sedan') || slug.startsWith('sedan-');
      }

      return false;
    }).sort((a, b) => {
      const orderA = a.sortOrder || (a as any).sort_order || 999;
      const orderB = b.sortOrder || (b as any).sort_order || 999;
      return orderA - orderB;
    });
  };

  const filteredVehicles = getFilteredVehicles(activeFilter);

  const getFilterCount = (filterId: FilterType): number | undefined => {
    const vehicles = getFilteredVehicles(filterId);
    return vehicles.length > 0 ? vehicles.length : undefined;
  };

  const currentVehicle = filteredVehicles[currentIndex] || filteredVehicles[0];
  const specs = currentVehicle ? getVehicleSpecs(currentVehicle) : null;

  useEffect(() => {
    setCurrentIndex(0);
  }, [activeFilter, allVehicles]);

  const nextVehicle = () => {
    if (filteredVehicles.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % filteredVehicles.length);
  };

  const prevVehicle = () => {
    if (filteredVehicles.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + filteredVehicles.length) % filteredVehicles.length);
  };

  const prevVehicleData = filteredVehicles.length > 0 ? filteredVehicles[(currentIndex - 1 + filteredVehicles.length) % filteredVehicles.length] : null;
  const nextVehicleData = filteredVehicles.length > 0 ? filteredVehicles[(currentIndex + 1) % filteredVehicles.length] : null;

  const backgrounds = [bg1, bg2, bg3, bg4];
  const filterToBgIndex: Record<FilterType, number> = {
    'all': 3,
    'suv': 1,
    'sedan': 2,
    'luxury': 0,
  };
  const currentBgIndex = filterToBgIndex[activeFilter];
  const currentBackground = backgrounds[currentBgIndex];

 
  const isEmpty = filteredVehicles.length === 0 && !loading;


  return (

    <section className="py-16 lg:py-20 ">
      <div id={sectionId} className="relative h-full flex flex-col  ">
        <div
          className=" absolute  top-0 left-0 right-0 h-[30vh] md:h-[42vh] bg-no-repeat transition-opacity duration-1000 overflow-hidden"
          style={{
            backgroundImage: `url(${currentBackground})`,
            backgroundPosition: 'center bottom ',
            backgroundSize: 'cover',
            filter: 'blur(3px)',
          }}
          aria-hidden
        />


        <div ref={ref} className={cn('relative z-10 flex-1 flex flex-col  ', 'scroll-reveal', isRevealed && 'revealed')}>

          {loading && (
            <div className="absolute inset-0 flex items-center justify-center z-50">
              <div className="text-white">Loading vehicles...</div>
            </div>
          )}

          {isEmpty && (
            <div className="absolute inset-0 flex items-center justify-center z-50 pt-32">
              <p className="text-white">No vehicles found for this category.</p>
            </div>
          )}

          <div className="relative z-50 mx-auto h-[35vh] md:h-[45vh]  px-0 lg:px-8 pt-6 sm:pt-8 md:pt-12 lg:pt-16 xl:pt-20">
            <h2 className="text-xl sm:text-3xl  md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white text-center pb-2 md:pb-4">
              {title}
            </h2>
            {subtitle && (
              <p className="text-sm sm:text-base md:text-lg text-white/80 text-center max-w-2xl mx-auto mb-4 ">
                {subtitle}
              </p>
            )}

            {/* Filter Navigation - wraps on mobile */}
            <div className="relative z-50 mx-auto flex flex-col  justify-center items-center pb-2 md:pb-4">
              <div className="flex flex-wrap items-center gap-1 sm:gap-3 md:gap-4 justify-center a max-w-[280px] sm:max-w-none">
                {filters.map((filter) => {
                  const isActive = activeFilter === filter.id;
                  const count = getFilterCount(filter.id);
                  return (
                    <button
                      key={filter.id}
                      onClick={() => setActiveFilter(filter.id)}
                      className={cn(
                        'relative px-2 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm md:text-base font-bold transition-colors',
                        isActive
                          ? 'text-white'
                          : 'text-white/70 hover:text-white'
                      )}
                    >
                      {filter.label}
                      {count !== undefined && (
                        <span className="ml-1 sm:ml-2 inline-flex items-center justify-center w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-white/20 text-[10px] sm:text-xs font-semibold">
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
          </div>

          {/* Car Carousel - positioned exactly at transition between background and white */}
          <div className="absolute top-[30vh] md:top-[42vh] left-0 right-0 -translate-y-1/2 z-30 flex items-center justify-center py-4 sm:py-8 pointer-events-none">
            {/* Left Arrow */}
            <button
              onClick={prevVehicle}
              type="button"
              style={{ touchAction: 'manipulation' }}
              className="absolute left-2 sm:left-4 md:left-8 z-50 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-white/90 dark:bg-white/20 backdrop-blur-sm border-2 border-white/40 flex items-center justify-center text-foreground hover:text-foreground hover:bg-white transition-colors shadow-lg pointer-events-auto"
              aria-label="Previous vehicle"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 pointer-events-none" />
            </button>

            {/* Cars */}
            <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-8 md:px-12 lg:px-20 xl:px-32 flex items-center justify-center">
              {/* Previous Car (Left) - hidden on mobile */}
              {prevVehicleData && (
                <button
                  onClick={prevVehicle}
                  type="button"
                  style={{ touchAction: 'manipulation' }}
                  className="hidden sm:block absolute left-[-10%] sm:left-[-20%] w-[30%] md:w-[38%] scale-80 z-20 cursor-pointer pointer-events-auto"
                  aria-label={`Previous: ${prevVehicleData.name}`}
                >
                  <img
                    src={prevVehicleData.image}
                    alt={prevVehicleData.name}
                    className="w-full h-auto object-contain"
                  />
                </button>
              )}

              {/* Current Car (Center) */}
              {currentVehicle && (
                <div className="relative z-30 w-[85%] sm:w-[60%] md:w-[80%] pointer-events-none">
                  <img
                    src={currentVehicle.image || (currentVehicle as any).image_url}
                    alt={currentVehicle.name}
                    className="w-full h-auto object-contain drop-shadow-2xl pointer-events-none"
                  />
                </div>
              )}

              {/* Next Car (Right) - hidden on mobile */}
              {nextVehicleData && (
                <button
                  onClick={nextVehicle}
                  type="button"
                  style={{ touchAction: 'manipulation' }}
                  className="hidden sm:block absolute right-[-10%] sm:right-[-20%] w-[30%] sm:w-[38%] scale-80 z-20 cursor-pointer pointer-events-auto"
                  aria-label={`Next: ${nextVehicleData.name}`}
                >
                  <img
                    src={nextVehicleData.image}
                    alt={nextVehicleData.name}
                    className="w-full h-auto object-contain"
                  />
                </button>
              )}
            </div>

            {/* Right Arrow */}
            <button
              onClick={nextVehicle}
              type="button"
              style={{ touchAction: 'manipulation' }}
              className="absolute right-2 sm:right-4 md:right-8 z-50 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-white/90 dark:bg-white/20 backdrop-blur-sm border-2 border-white/40 flex items-center justify-center text-foreground hover:text-foreground hover:bg-white transition-colors shadow-lg pointer-events-auto"
              aria-label="Next vehicle"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 pointer-events-none" />
            </button>
          </div>

          {/* Car Details - positioned below vehicles */}
          {currentVehicle && specs && (
            <div className="relative   h-full pt-[5vh] md:pt-16  z-40">
              <div className="mx-auto px-4 lg:px-8 md:pt-24">
                <div className="max-w-7xl mx-auto">
                  {/* Car Name - column layout on mobile, row on desktop */}
                  <div className="flex items-start sm:items-baseline justify-between sm:justify-center gap-3 mb-4 sm:mb-6 md:mb-8">
                    <div className="flex flex-col sm:flex-row items-start sm:items-baseline gap-1 sm:gap-2 md:gap-3">
                      <span className="text-xs sm:text-sm md:text-base text-muted-foreground">{currentVehicle.year || 2026}</span>
                      <Link
                        to={`/vehicles/${currentVehicle.slug}`}
                        className="text-xs md:text-sm text-muted-foreground "
                      >
                        <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold hover:text-accent hover:underline transition-colors duration-300 ease-in-out text-foreground">
                          {currentVehicle.name}
                        </h3>
                      </Link>
                      <span className="hidden sm:inline text-xs md:text-sm text-muted-foreground ml-2">
                        Disclaimers
                      </span>
                    </div>
                    {/* Carousel dots indicator - mobile only */}
                    <div className="sm:hidden flex items-center gap-2">
                      {/* Simplified dots for mobile perf */}
                      <span className="text-xs text-muted-foreground">{currentIndex + 1} / {filteredVehicles.length}</span>
                    </div>
                  </div>

                  {/* Specs Grid */}
                  {(() => {
                    const hasRange = !!specs.range;
                    const hasMpge = !!specs.mpge;
                    const hasMpg = !!specs.mpg;
                    // Count how many spec columns we have (excluding starting price)
                    const specCount = (hasRange ? 1 : 0) + (hasMpge ? 1 : 0) + (hasMpg ? 1 : 0);
                    // Show 3 cols if we have 2+ specs, 2 cols if we have 1 spec, 1 col if no specs
                    const gridCols = specCount >= 2 ? 'grid-cols-3' : specCount === 1 ? 'grid-cols-2' : 'grid-cols-1 max-w-md mx-auto';

                    const getBorderClasses = (isFirst: boolean, isLast: boolean) => {
                      if (isFirst && isLast) return '';
                      if (isFirst) return 'border-x border-border dark:border-gray-600';
                      if (isLast) return 'border-x border-border dark:border-gray-600';
                      return 'border-x border-border dark:border-gray-600';
                    };

                    return (
                      <div className={cn(
                        'grid gap-3 sm:gap-4 md:gap-8 mb-6 sm:mb-8 md:mb-10 pb-4 sm:pb-6 md:pb-8 border-b border-border dark:border-gray-600',
                        gridCols
                      )}>
                        <div className={cn('text-center', specCount > 0 && 'border-x border-border dark:border-gray-600')}>
                          <p className="text-[10px] sm:text-xs md:text-sm text-muted-foreground mb-1 sm:mb-1.5 md:mb-2">STARTING AT</p>
                          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-foreground">
                            ${specs.startingPrice.toLocaleString()}/mo<sup className="text-[10px] sm:text-xs md:text-sm ml-0.5 sm:ml-1">¹</sup>
                          </p>
                        </div>
                        {hasRange && (
                          <div className={cn('text-center', getBorderClasses(false, !hasMpge && !hasMpg))}>
                            <p className="text-[10px] sm:text-xs md:text-sm text-muted-foreground mb-1 sm:mb-1.5 md:mb-2">RANGE UP TO</p>
                            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-foreground">
                              {specs.range} miles<sup className="text-[10px] sm:text-xs md:text-sm ml-0.5 sm:ml-1">²</sup>
                            </p>
                          </div>
                        )}
                        {hasMpge && (
                          <div className={cn('text-center', getBorderClasses(!hasRange, !hasMpg))}>
                            <p className="text-[10px] sm:text-xs md:text-sm text-muted-foreground mb-1 sm:mb-1.5 md:mb-2">MPGe UP TO</p>
                            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-foreground">
                              {specs.mpge}<sup className="text-[10px] sm:text-xs md:text-sm ml-0.5 sm:ml-1">³</sup>
                            </p>
                          </div>
                        )}
                        {hasMpg && (
                          <div className={cn('text-center', getBorderClasses(!hasRange && !hasMpge, true))}>
                            <p className="text-[10px] sm:text-xs md:text-sm text-muted-foreground mb-1 sm:mb-1.5 md:mb-2">MPG UP TO</p>
                            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-foreground">
                              {specs.mpg}<sup className="text-[10px] sm:text-xs md:text-sm ml-0.5 sm:ml-1">³</sup>
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })()}

                  {/* Additional Details Section */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
                    {/* Highlights */}
                    {currentVehicle.highlights && currentVehicle.highlights.length > 0 && (
                      <div>
                        <h4 className="text-xs sm:text-sm md:text-base font-semibold text-muted-foreground uppercase mb-3 sm:mb-4">Highlights</h4>
                        <ul className="space-y-2">
                          {currentVehicle.highlights.map((highlight, idx) => (
                            <li key={idx} className="text-sm sm:text-base md:text-lg text-foreground flex items-start gap-2">
                              <span className="text-accent mt-1">•</span>
                              <span>{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Popular Brands */}
                    {currentVehicle.popularBrands && currentVehicle.popularBrands.length > 0 && (
                      <div>
                        <h4 className="text-xs sm:text-sm md:text-base font-semibold text-muted-foreground uppercase mb-3 sm:mb-4">Popular Brands</h4>
                        <div className="flex flex-wrap gap-2 sm:gap-3">
                          {currentVehicle.popularBrands.map((brand, idx) => (
                            <button
                              key={idx}
                              onClick={() => navigate(`/vehicles/${currentVehicle.slug}?brand=${encodeURIComponent(brand)}`)}
                              className="px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm md:text-base rounded-full bg-muted text-foreground hover:bg-muted/80 transition-all"
                            >
                              {brand}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Vehicle Specs */}
                    <div>
                      <h4 className="text-xs sm:text-sm md:text-base font-semibold text-muted-foreground uppercase mb-3 sm:mb-4">Vehicle Specs</h4>
                      <div className="space-y-3 sm:space-y-4">
                        {/* Fuel Types */}
                        {currentVehicle.fuelTypes && currentVehicle.fuelTypes.length > 0 && (
                          <div>
                            <p className="text-xs sm:text-sm text-muted-foreground mb-1">Fuel Types</p>
                            <p className="text-sm sm:text-base md:text-lg font-medium text-foreground capitalize">
                              {currentVehicle.fuelTypes.join(', ')}
                            </p>
                          </div>
                        )}

                        {/* Drivetrain */}
                        {currentVehicle.drivetrain && currentVehicle.drivetrain.length > 0 && (
                          <div>
                            <p className="text-xs sm:text-sm text-muted-foreground mb-1">Drivetrain</p>
                            <p className="text-sm sm:text-base md:text-lg font-medium text-foreground">
                              {currentVehicle.drivetrain.join(', ')}
                            </p>
                          </div>
                        )}

                        {/* Passenger Capacity */}
                        {currentVehicle.passengerCapacity && (
                          <div>
                            <p className="text-xs sm:text-sm text-muted-foreground mb-1">Passenger Capacity</p>
                            <p className="text-sm sm:text-base md:text-lg font-medium text-foreground">
                              {currentVehicle.passengerCapacity} {currentVehicle.passengerCapacity === 1 ? 'person' : 'people'}
                            </p>
                          </div>
                        )}

                        {/* Cargo Space */}
                        {currentVehicle.cargoSpace && (
                          <div>
                            <p className="text-xs sm:text-sm text-muted-foreground mb-1">Cargo Space</p>
                            <p className="text-sm sm:text-base md:text-lg font-medium text-foreground capitalize">
                              {currentVehicle.cargoSpace}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  {/* Learn More Button */}
                  <div className="flex flex-row items-center justify-center pt-4 sm:pt-6">
                    <Button
                      asChild
                      variant="outline"
                      size="lg"
                      className="h-12 sm:h-14 md:h-16 rounded-lg border-2 border-foreground/20 hover:border-foreground/40 bg-transparent hover:bg-foreground/5 text-foreground font-semibold px-8 sm:px-10 md:px-12 text-base sm:text-lg md:text-xl transition-all duration-300"
                    >
                      <Link
                        to={`/vehicles/${currentVehicle.slug}`}
                        className="flex items-center justify-center gap-2 sm:gap-3"
                      >
                        Learn more about {currentVehicle.name}
                        <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
                      </Link>
                    </Button>


                  </div>
                  {/* Quiz Section */}
                  <div className="mt-6 sm:mt-8 md:mt-10 py-4 md:py-10 border-t border-border dark:border-gray-600">
                    <div className="flex flex-col items-center gap-4 sm:gap-5">
                      <div className="flex flex-col items-center gap-2 sm:gap-3">

                        <p className="text-base sm:text-lg md:text-xl text-foreground font-medium text-center max-w-xl">
                          Find your perfect vehicle match in just 5 quick questions.
                        </p>
                      </div>
                      <Button
                        asChild
                        size="lg"
                        className="h-12 sm:h-14 rounded-xl border-2 border-accent/40 bg-accent hover:bg-accent/90 hover:border-accent text-accent-foreground font-bold px-8 sm:px-10 text-base sm:text-lg glow-blue shadow-[0_4px_16px_hsl(214_77%_50%_/_0.3)] hover:shadow-[0_6px_24px_hsl(214_77%_55%_/_0.5)] transition-all duration-300"
                      >
                        <Link to="/quiz" className="flex items-center justify-center gap-2.5">
                          Start Quiz
                          <Search className="w-5 h-5" />
                        </Link>
                      </Button>
                    </div>
                  </div>


                </div>
              </div>

            </div>
          )}
        </div>
      </div>
    </section>
  );
}
