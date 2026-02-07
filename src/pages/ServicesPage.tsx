import { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { SEO } from '@/components/SEO';
import { JsonLd } from '@/components/JsonLd';
import { servicesPageLinks } from '@/components/ui/RelatedLinks';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { 
  Car, 
  CreditCard, 
  RefreshCw, 
  Wrench, 
  CircleDot, 
  Sparkles,
  ArrowRight,
  Phone,
  FileText,
  Building2,
  CheckCircle2,
  Shield,
  Award
} from 'lucide-react';
import bg1 from '@/assets/brand-backgrounds/bg-1.jpeg';
import bg2 from '@/assets/brand-backgrounds/bg-2.jpg';
import bg3 from '@/assets/brand-backgrounds/bg-3.jpg';
import bg4 from '@/assets/brand-backgrounds/bg-4.jpg';

type CategoryType = 'all' | 'leasing' | 'financing' | 'trade-in' | 'vehicle-services';

const categories: { id: CategoryType; label: string }[] = [
  { id: 'all', label: 'All Services' },
  { id: 'leasing', label: 'Leasing' },
  { id: 'financing', label: 'Financing' },
  { id: 'trade-in', label: 'Trade-In' },
  { id: 'vehicle-services', label: 'Vehicle Services' },
];

const services = [
  {
    title: 'Car Leasing',
    description: 'Find the right lease for your budget and needs without spending hours negotiating at dealerships.',
    href: '/services/car-leasing',
    icon: Car,
    category: 'leasing' as CategoryType,
    highlights: ['No dealership visits required', 'Transparent pricing upfront', '30+ years of experience'],
  },
  {
    title: 'Financing & Credit',
    description: 'A simple credit application to review financing options without unnecessary paperwork.',
    href: '/services/financing',
    icon: CreditCard,
    category: 'financing' as CategoryType,
    highlights: ['Simple application process', 'Quick approval', 'Competitive rates'],
  },
  {
    title: 'Trade-In',
    description: 'We evaluate your current vehicle and manage the trade-in process to prevent undervaluation.',
    href: '/services/trade-in',
    icon: RefreshCw,
    category: 'trade-in' as CategoryType,
    highlights: ['Fair evaluation', 'Maximize value', 'Seamless process'],
  },
  {
    title: 'Wear & Tear Repair',
    description: 'End-of-lease repairs focused on reducing penalties and unexpected charges.',
    href: '/services/wear-and-tear',
    icon: Wrench,
    category: 'vehicle-services' as CategoryType,
    highlights: ['Reduce penalties', 'Expert repairs', 'Cost-effective'],
  },
  {
    title: 'Rim, Wheel & Tire Repair',
    description: 'Repair and restoration of wheels and tires, both cosmetic and functional.',
    href: '/services/wheel-repair',
    icon: CircleDot,
    category: 'vehicle-services' as CategoryType,
    highlights: ['Cosmetic & functional', 'Specialized shops', 'Quality guaranteed'],
  },
  {
    title: 'Professional Detailing',
    description: 'Interior and exterior detailing for vehicles being returned, sold or simply cleaned properly.',
    href: '/services/detailing',
    icon: Sparkles,
    category: 'vehicle-services' as CategoryType,
    highlights: ['Interior & exterior', 'Lease return ready', 'Professional-grade'],
  },
];

const getFilterCount = (filterId: CategoryType): number | undefined => {
  const filtered = getFilteredServices(filterId);
  return filtered.length > 0 ? filtered.length : undefined;
};

function getFilteredServices(filter: CategoryType) {
  if (filter === 'all') return services;
  return services.filter((s) => s.category === filter);
}

const categoryToBgIndex: Record<CategoryType, number> = {
  'all': 3,
  'leasing': 0,
  'financing': 1,
  'trade-in': 2,
  'vehicle-services': 3,
};

export default function ServicesPage() {
  const [activeCategory, setActiveCategory] = useState<CategoryType>('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const { ref, isRevealed } = useScrollReveal();

  const filteredServices = getFilteredServices(activeCategory);
  const currentService = filteredServices[currentIndex] || filteredServices[0];

  useEffect(() => {
    setCurrentIndex(0);
  }, [activeCategory]);

  const backgrounds = [bg1, bg2, bg3, bg4];
  const currentBgIndex = categoryToBgIndex[activeCategory];
  const currentBackground = backgrounds[currentBgIndex];

  const servicesListSchema = useMemo(() => ({
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Capital Motor Cars Services',
    description: 'Automotive services including leasing, financing, trade-in, and vehicle maintenance.',
    itemListElement: services.map((service, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Service',
        name: service.title,
        description: service.description,
        url: `https://capitalmotorcars.com${service.href}`,
      },
    })),
  }), []);

  return (
    <Layout>
      <SEO 
        title="Our Services | Capital Motor Cars"
        description="Leasing, financing, trade-in, detailing, and end-of-lease repairs. Practical automotive services handled by professionals in New Jersey."
      />
      <JsonLd data={servicesListSchema} />
      
      <section className="pt-16 lg:pt-20">
        <div id="services" className="relative h-full flex flex-col">
          {/* Top half: Blurred background */}
          <div className="absolute top-0 left-0 right-0 h-[30vh] md:h-[45vh] overflow-hidden">
            <img
              src={currentBackground}
              alt=""
              className="w-full h-full object-cover object-center blur-[1.5px] transition-opacity duration-1000"
              aria-hidden
            />
          </div>
          {/* Dark overlay on top half for text readability */}
          <div
            className="absolute top-0 left-0 right-0 h-[30vh] md:h-[45vh] bg-gradient-to-b from-black/40 via-black/20 to-transparent transition-opacity duration-1000"
            aria-hidden
          />
          {/* Bottom half: White background */}
          <div
            className="absolute top-[30vh] md:top-[45vh] left-0 right-0 bottom-0 bg-white dark:bg-background"
            aria-hidden
          />

          {/* Content */}
          <div ref={ref} className={cn('relative z-10 flex-1 flex flex-col', 'scroll-reveal', isRevealed && 'revealed')}>
            {/* Title and Filters */}
            <div className="relative z-50 mx-auto h-[30vh] md:h-[45vh] px-4 lg:px-8 flex flex-col items-center justify-center">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl  font-bold text-white text-center pb-2 md:pb-4 xl:pb-6">
                Our Services
              </h2>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-white/80 text-center max-w-3xl xl:max-w-5xl mx-auto pb-4 md:pb-6 xl:pb-8">
                Practical automotive solutions for customers who want things done right and without unnecessary hassle.
              </p>

              {/* Filter Navigation */}
              <div className="relative z-50 mx-auto">
                <div className="flex flex-wrap items-center gap-1 sm:gap-3 md:gap-4 xl:gap-6 justify-center max-w-[380px] sm:max-w-none">
                  {categories.map((category) => {
                    const isActive = activeCategory === category.id;
                    const count = getFilterCount(category.id);
                    return (
                      <button
                        key={category.id}
                        onClick={() => setActiveCategory(category.id)}
                        className={cn(
                          'relative px-2 py-1.5 sm:px-4 sm:py-2 xl:px-6 xl:py-3 text-xs sm:text-sm md:text-base xl:text-lg font-medium transition-colors',
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
              </div>
            </div>

            {/* Service Details */}
            {currentService && (
              <div className="relative bg-white dark:bg-[hsl(0_0%_4%)] h-full py-8 md:py-16 xl:py-20 z-10">
                <div className="mx-auto px-4 lg:px-8 xl:px-12">
                  <div className="max-w-7xl xl:max-w-[90rem] mx-auto">
                    {/* Service Name */}
                    <div className="flex items-start sm:items-baseline justify-between sm:justify-center gap-3 mb-4 sm:mb-6 md:mb-8 xl:mb-10">
                      <div className="flex flex-col sm:flex-row items-start sm:items-baseline gap-1 sm:gap-2 md:gap-3 xl:gap-4">
                        <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-black dark:text-white">
                          {currentService.title}
                        </h3>
                      </div>
                   
                    </div>

                    {/* Description */}
                    <div className="mb-6 sm:mb-8 md:mb-10 xl:mb-12 pb-4 sm:pb-6 md:pb-8 xl:pb-10 border-b border-border dark:border-white/20">
                      <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-black dark:text-white max-w-4xl xl:max-w-5xl">
                        {currentService.description}
                      </p>
                    </div>

                    {/* Highlights */}
                    {currentService.highlights && currentService.highlights.length > 0 && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10 xl:gap-12 mb-8 md:mb-12 xl:mb-16">
                        <div className="sm:border-r sm:border-border dark:sm:border-white/20 pr-6 sm:pr-8 md:pr-10 xl:pr-24">
                          <h4 className="text-xs sm:text-sm md:text-base xl:text-lg font-semibold text-black dark:text-white uppercase mb-6 sm:mb-8 xl:mb-10">Highlights</h4>
                          
                          {/* Stats - Simplified */}
                          <div className="space-y-6 sm:space-y-8 md:space-y-10">
                            {/* Stat 1 */}
                            <div className="flex flex-col items-center text-center gap-3 sm:gap-4">
                              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg bg-accent/10 dark:bg-accent/20 flex items-center justify-center">
                                <CheckCircle2 className="w-6 h-6 sm:w-7 sm:h-7 text-accent" />
                              </div>
                              <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-br from-accent to-accent/70 bg-clip-text text-transparent">
                                100%
                              </span>
                              <span className="text-xs sm:text-sm md:text-base text-gray-700 dark:text-gray-300">
                                No dealership visits required
                              </span>
                            </div>
                            
                            {/* Stat 2 */}
                            <div className="flex flex-col items-center text-center gap-3 sm:gap-4 pt-6 sm:pt-8 md:pt-10 border-t border-gray-200 dark:border-white/20">
                              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg bg-accent/10 dark:bg-accent/20 flex items-center justify-center">
                                <Shield className="w-6 h-6 sm:w-7 sm:h-7 text-accent" />
                              </div>
                              <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-br from-accent to-accent/70 bg-clip-text text-transparent">
                                100%
                              </span>
                              <span className="text-xs sm:text-sm md:text-base text-gray-700 dark:text-gray-300">
                                Transparent pricing upfront
                              </span>
                            </div>
                            
                            {/* Stat 3 */}
                            <div className="flex flex-col items-center text-center gap-3 sm:gap-4 pt-6 sm:pt-8 md:pt-10 border-t border-gray-200 dark:border-white/20">
                              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg bg-accent/10 dark:bg-accent/20 flex items-center justify-center">
                                <Award className="w-6 h-6 sm:w-7 sm:h-7 text-accent" />
                              </div>
                              <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-br from-accent to-accent/70 bg-clip-text text-transparent">
                                30+
                              </span>
                              <span className="text-xs sm:text-sm md:text-base text-gray-700 dark:text-gray-300">
                                Years of experience
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* All Services Grid */}
                        <div className="sm:col-span-2 sm:pl-6 sm:pl-8 md:pl-10 xl:pl-12">
                          <h4 className="text-xs sm:text-sm md:text-base xl:text-lg font-semibold text-black dark:text-white uppercase mb-6 sm:mb-8 xl:mb-10">All Services</h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
                            {filteredServices.map((service) => {
                              const Icon = service.icon;
                              const isActive = currentService.href === service.href;
                              return (
                                <Link
                                  key={service.href}
                                  to={service.href}
                                  className={cn(
                                    "group relative flex flex-col gap-4 sm:gap-5 p-6 sm:p-7 md:p-8 rounded-xl transition-all duration-300",
                                    "border border-gray-200 dark:border-white/20",
                                    "bg-white dark:bg-white/[0.04]",
                                    "hover:border-accent hover:shadow-lg hover:shadow-accent/20 dark:hover:bg-white/[0.04] hover:bg-accent/5 dark:hover:bg-accent/10",
                                    isActive && "border-accent bg-accent/5 dark:bg-accent/10 shadow-lg shadow-accent/20"
                                  )}
                                >
                                  <div className="flex items-start gap-4 sm:gap-5 md:gap-6">
                                    {/* Icon */}
                                    <div className={cn(
                                      "flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 rounded-xl flex items-center justify-center transition-all duration-300",
                                      isActive
                                        ? "bg-accent/20 dark:bg-accent/30 scale-105"
                                        : "bg-gray-100 dark:bg-gray-800 group-hover:bg-accent/15 dark:group-hover:bg-accent/25 group-hover:scale-105"
                                    )}>
                                      <Icon className={cn(
                                        "w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 transition-colors duration-300",
                                        isActive
                                          ? "text-accent"
                                          : "text-gray-600 dark:text-gray-400 group-hover:text-accent"
                                      )} />
                                    </div>
                                    
                                    {/* Content */}
                                    <div className="flex-1 min-w-0">
                                      <h5 className={cn(
                                        "mb-2 sm:mb-2.5 font-semibold text-base sm:text-lg md:text-xl lg:text-2xl transition-colors duration-300",
                                        isActive
                                          ? "text-accent"
                                          : "text-gray-900 dark:text-white group-hover:text-accent"
                                      )}>
                                        {service.title}
                                      </h5>
                                      <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed">
                                        {service.description}
                                      </p>
                                    </div>
                                  </div>
                                  
                                  {/* CTA */}
                                  <div className={cn(
                                    "flex items-center gap-2 text-sm sm:text-base font-semibold transition-all duration-300 pt-3 border-t border-border dark:border-white/20",
                                    isActive
                                      ? "text-accent "
                                      : "text-gray-500 dark:text-gray-500 group-hover:text-accent group-hover:gap-2.5"
                                  )}>
                                    <span>View Service</span>
                                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1" />
                                  </div>
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* CTA Button */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 xl:gap-6 pt-6 md:pt-8 xl:pt-10">
                      <Button
                        asChild
                        size="lg"
                        className="h-12 sm:h-14 xl:h-16 rounded-lg xl:rounded-xl border-2 border-gray-200 dark:border-white/20 bg-white dark:bg-white/[0.10] hover:bg-gray-200 dark:hover:bg-white/[0.20] text-black dark:text-white font-semibold xl:font-bold px-8 sm:px-10 xl:px-12 text-sm sm:text-base xl:text-lg transition-all"
                      >
                        <Link to={currentService.href} className="flex items-center justify-center gap-2 xl:gap-3">
                          Learn more about {currentService.title}
                        </Link>
                      </Button>
                      <Button
                        asChild
                        size="lg"
                        className="h-12 sm:h-14 xl:h-16 rounded-lg xl:rounded-xl border border-accent/40 bg-accent hover:bg-accent/90 hover:border-accent text-accent-foreground font-semibold xl:font-bold px-8 sm:px-10 xl:px-12 text-sm sm:text-base xl:text-lg glow-blue shadow-[0_2px_12px_hsl(214_77%_50%_/_0.25)] hover:shadow-[0_4px_18px_hsl(214_77%_55%_/_0.45)]"
                      >
                        <Link to="/contact" className="flex items-center justify-center gap-2 xl:gap-3">
                          Contact us directly
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Next Steps Section */}
      <section className=" py-8 md:py-20 bg-white w-full  bg-white dark:bg-[hsl(0_0%_4%)]  ">
        <div className="container mx-auto  px-4 lg:px-8 xl:px-12 max-w-7xl xl:max-w-[90rem] mx-auto border-t border-border dark:border-white/20">
          <div className="mt-6 sm:mt-8 md:mt-10 pb-6 sm:pb-8 md:pb-10">
            <div className="text-center mb-6 sm:mb-8 md:mb-10">
              <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl  font-semibold text-foreground mb-3 md:mb-4">
                Next Steps
              </h3>
              <p className="text-base sm:text-lg md:text-xl xl:text-2xl text-black dark:text-white max-w-3xl mx-auto">
                Ready to get started? Choose your next step and let's make it happen.
              </p>
            </div>  
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 xl:gap-10">
              {servicesPageLinks.map((link, idx) => {
                const icons = [Phone, FileText, Building2];
                const Icon = icons[idx] || ArrowRight;
                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    className="group flex flex-col h-full gap-4 xl:gap-6 p-6 sm:p-8 xl:p-10 rounded-xl border-2 border-border dark:border-white/20 bg-white dark:bg-white/[0.04] hover:border-accent hover:shadow-[0_0_30px_hsl(214_77%_50%_/_0.4)] hover:shadow-accent/30 transition-all duration-300"
                  >
                    <div className="flex items-start gap-4 xl:gap-6 flex-1">
                      <div className="flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 xl:w-20 xl:h-20 rounded-lg flex items-center justify-center bg-accent/10 dark:bg-accent/20 group-hover:bg-accent/20 transition-colors">
                        <Icon className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 xl:w-10 xl:h-10 text-accent" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="mb-2 xl:mb-3 font-medium text-lg sm:text-xl md:text-2xl  text-foreground group-hover:text-accent transition-colors">
                          {link.title}
                        </h4>
                        <p className="text-sm sm:text-base xl:text-lg text-black dark:text-white">
                          {link.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-black dark:text-white font-semibold text-sm sm:text-base xl:text-lg group-hover:gap-3 transition-[gap] group-hover:text-accent mt-auto">
                      <span>Get started</span>
                      <ArrowRight className="w-4 h-4 xl:w-5 xl:h-5 transition-transform group-hover:translate-x-1" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
