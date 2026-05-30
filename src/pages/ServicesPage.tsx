import { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { SEO } from '@/components/SEO';
import { JsonLd } from '@/components/JsonLd';
import { servicesPageLinks } from '@/components/ui/RelatedLinks';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { renderSEOHeading } from '@/utils/seoUtils';
import {
  Car,
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
import { motion } from 'framer-motion';
import bg1 from '@/assets/brand-backgrounds/bg-1.jpeg';
import bg2 from '@/assets/brand-backgrounds/bg-2.jpg';
import bg3 from '@/assets/brand-backgrounds/bg-3.jpg';
import bg4 from '@/assets/brand-backgrounds/bg-4.jpg';


type CategoryType = 'all' | 'leasing' | 'trade-in' | 'vehicle-services';

const categories: { id: CategoryType; label: string }[] = [
  { id: 'all', label: 'All Services' },
  { id: 'leasing', label: 'Leasing' },
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
  'trade-in': 1,
  'vehicle-services': 2,
};

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
} as const;

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
    description: 'Automotive services including leasing, trade-in, and vehicle maintenance.',
    itemListElement: services.map((service, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Service',
        name: service.title,
        description: service.description,
        url: `https://www.capitalmotorcars.com${service.href}`,
      },
    })),
  }), []);

  return (
    <Layout>
      <SEO
        title="Auto Leasing Services, Car Lease Deals & Luxury Car Leasing in New Jersey & New York | Capital Motor Cars"
        description="Auto leasing services, car lease deals, monthly car lease deals, and luxury car leasing in New Jersey and New York from Capital Motor Cars."
        seoKeywords={['auto leasing services New Jersey', 'car lease deals NY', 'luxury car leasing NJ', 'Capital Motor Cars services']}
        ogImage="https://www.capitalmotorcars.com/og/hero-bg.jpg"
        canonicalPath="/services"
      />
      <JsonLd data={servicesListSchema} />

      <section className="pt-[max(4rem,calc(4rem+env(safe-area-inset-top,0px)))] lg:pt-[max(5rem,calc(5rem+env(safe-area-inset-top,0px)))]">
        <div id="services" className="relative h-full flex flex-col">
          {/* Top half: Blurred background - vh on mobile to prevent zoom on scroll; dvh on desktop */}
          <div className="absolute top-0 left-0 right-0 h-[30vh] md:h-[45dvh] overflow-hidden">
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
            className="absolute top-0 left-0 right-0 h-[30vh] md:h-[45dvh] bg-gradient-to-b from-black/40 via-black/20 to-transparent"
            aria-hidden
          />

          {/* Gradient fade to bottom content */}
          <div
            className="absolute top-[17vh] md:top-[22.5dvh] left-0 right-0 h-[17vh] md:h-[22.5dvh] bg-gradient-to-b from-transparent via-white/20 to-white dark:to-[hsl(0,0%,4%)]"
            aria-hidden
          />

          {/* Bottom half: White background */}
          <div
            className="absolute top-[30vh] md:top-[45dvh] left-0 right-0 bottom-0 bg-white dark:bg-[hsl(0,0%,4%)]"
            aria-hidden
          />

          {/* Content */}
          <div ref={ref} className={cn('relative z-10 flex-1 flex flex-col  dark:bg-white/[0.02]', 'scroll-reveal', isRevealed && 'revealed')}>
            {/* Title and Filters - vh on mobile for stable height (no zoom on scroll) */}
            <div className="relative z-50 mx-auto min-h-[30vh] md:min-h-[45dvh] pt-24 md:pt-32 pb-8 px-4 lg:px-8 flex flex-col items-center justify-center">
              <motion.h1
                {...fadeInUp}
                transition={{ ...fadeInUp.transition, delay: 0.1 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center pb-2 md:pb-4 xl:pb-6 tracking-tight"
              >
                {renderSEOHeading("Auto Leasing Services, Car Lease Deals & Luxury Car Leasing in New Jersey & New York | Capital Motor Cars")}
              </motion.h1>
              <motion.p
                {...fadeInUp}
                transition={{ ...fadeInUp.transition, delay: 0.2 }}
                className="text-xs  md:text-lg lg:text-xl xl:text-2xl text-white/80 text-center max-w-3xl xl:max-w-5xl mx-auto pb-2 md:pb-6 xl:pb-8"
              >
                Explore our complete auto leasing services tailored for NJ and NY drivers. Enjoy stress-free leasing, car lease deals, best car lease deals, and Zero Down options. Call Now!
              </motion.p>

              {/* Filter Navigation */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="relative z-50 mx-auto"
              >
                <div className="flex flex-wrap items-center gap-1 sm:gap-3 md:gap-4 xl:gap-6 justify-center max-w-[380px] sm:max-w-none">
                  {categories.map((category) => {
                    const isActive = activeCategory === category.id;
                    const count = getFilterCount(category.id);
                    return (
                      <button
                        key={category.id}
                        onClick={() => setActiveCategory(category.id)}
                        className={cn(
                          'relative px-2 py-1 sm:px-4 sm:py-2 xl:px-6 xl:py-3 text-sm xl:text-xl font-bold transition-colors ',
                          isActive
                            ? 'text-white'
                            : 'text-white hover:text-white'
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

            {/* Service Details */}
            {currentService && (
              <div className="relative  py-12 md:py-24 overflow-hidden">
                {/* Subtle Background Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[1000px] aspect-square pointer-events-none">
                  {/* <div className="w-full h-full bg-accent/[0.08] dark:bg-accent/[0.01] blur-[140px] rounded-full" /> */}

                  {/* Optional: Add a second, smaller, brighter core for depth */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 bg-accent/5 blur-[80px] rounded-full" />
                </div>

                <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">

                  {/* 1. Hero Header */}
                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b-2 border-border dark:border-white/20 pb-12">
                    <div className="space-y-4">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-bold uppercase tracking-widest">
                        Featured Service
                      </div>
                      <h3 className="text-4xl md:text-6xl font-black tracking-tighter text-foreground leading-none">
                        {currentService.title}
                      </h3>
                      <p className="text-lg md:text-2xl text-muted-foreground max-w-3xl leading-relaxed">
                        {currentService.description}
                      </p>
                    </div>

                    {/* Quick Contact Link */}
                    <Link to="/contact" className="hidden md:flex items-center gap-2 text-accent font-bold group">
                      Get Started <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

                    {/* 2. Highlights - Horizontal "Value Cards" */}
                    <div className="lg:col-span-4 space-y-6">
                      <h4 className="text-sm uppercase font-bold tracking-[0.3em] text-muted-foreground/60 mb-6">Service Excellence</h4>
                      <div className="grid grid-cols-1 gap-4">
                        {[
                          { icon: CheckCircle2, label: "Dealer Free", val: "100%", desc: "Skip the showroom hassle" },
                          { icon: Shield, label: "Pricing", val: "100%", desc: "Fully transparent quotes" },
                          { icon: Award, label: "Experience", val: "30+", desc: "Years of industry mastery" }
                        ].map((stat, i) => (
                          <div key={i} className="group p-6  border-b-2 border-border/60 dark:border-white/10  ">
                            <div className="flex items-center gap-6 h-full"> {/* Changed to items-center and increased gap */}

                              {/* Larger Icon Container */}
                              <div className="shrink-0 w-20 h-20 rounded-2xl bg-accent/10 text-accent flex items-center justify-center border border-accent/20 dark:border-white/10">
                                <stat.icon className="w-10 h-10" /> {/* Bigger Icon */}
                              </div>

                              {/* Info - Perfectly Centered Vertically */}
                              <div className="flex flex-col justify-center py-1">
                                <div className="flex items-baseline gap-2 mb-1">
                                  <span className="text-4xl font-black text-black dark:text-white tracking-tighter leading-none">
                                    {stat.val}  
                                  </span>
                                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-accent/80 whitespace-nowrap">
                                    {stat.label}
                                  </span>
                                </div>
                                <p className="text-sm font-semibold text-muted-foreground/80 leading-tight">
                                  {stat.desc}
                                </p>
                              </div>

                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 3. All Services - The "Switchboard" */}
                    <div className="lg:col-span-8">


                      {/* 3. Other Solutions - High Contrast & Glow */}
                      <div className="lg:col-span-8">
                        <div className="flex items-center gap-4 mb-8">
                          <span className="text-sm uppercase font-bold tracking-[0.4em] text-muted-foreground/40 whitespace-nowrap">
                            Explore Solutions
                          </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {filteredServices.map((service) => {
                            const Icon = service.icon;
                            const isActive = currentService.href === service.href;

                            return (
                              <Link
                                key={service.href}
                                to={service.href}
                                className={cn(
                                  "group relative p-8 rounded-[2rem] border-2 transition-all duration-500",
                                  "text-black dark:text-white",

                                  isActive
                                    ? "bg-accent/10 border-accent"
                                    : "border-2 border-border  bg-white dark:bg-white/[0.02] dark:border-white/20",

                                  "hover:border-accent hover:border-2  dark:hover:border-accent/40 hover:bg-accent/20 hover:bg-accent/5 dark:hover:bg-accent/10 hover:-translate-y-2 hover:shadow-[0_0_40px_-10px_rgba(59,130,246,0.4)]"



                                )}
                              >
                                <div className="flex flex-col gap-4">
                                  {/* Icon Container */}
                                  <div className={cn(
                                    "w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500",
                                    isActive
                                      ? "bg-accent text-accent-foreground"
                                      : "bg-muted dark:bg-white/5 group-hover:bg-accent/10 group-hover:text-accent"
                                  )}>
                                    <Icon className="w-7 h-7" />
                                  </div>

                                  {/* Text Content */}
                                  <div>
                                    {/* Title - Turns Blue on Hover */}
                                    <h5 className={cn(
                                      "font-bold text-xl md:text-xl tracking-tighter uppercase leading-none mb-2 transition-colors duration-300",
                                      "group-hover:text-accent"
                                    )}>
                                      {service.title}
                                    </h5>
                                    <p className="text-sm font-medium text-muted-foreground leading-relaxed line-clamp-2 group-hover:text-foreground/80 transition-colors">
                                      {service.description}
                                    </p>
                                  </div>

                                  {/* Bottom Arrow Indicator - Always Visible */}
                                  <div className="flex items-center gap-2 text-sm   font-bold uppercase tracking-[0.2em] text-muted-foreground/60 group-hover:text-accent transition-all duration-300">
                                    Select Service
                                    <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                                  </div>
                                </div>
                              </Link>
                            );
                          })}
                        </div>

                        {/* 4. Action Buttons (Unified) - Kept exactly how you liked it */}
                        <div className="mt-12 flex flex-col sm:flex-row gap-4">
                          <Button asChild variant="outline" size="lg" className="flex-1 p-4 text-lg rounded-2xl h-16 font-bold border-2 bg-white dark:bg-white/[0.02] dark:border-white/20 border-border hover:bg-accent/5 dark:hover:bg-white/[0.04] transition-all">
                            <Link to="/services/car-leasing">Learn More About {currentService.title}</Link>
                          </Button>
                          <Button asChild size="lg" className="flex-1 p-4 rounded-2xl bg-accent text-accent-foreground font-black text-lg h-16 shadow-lg shadow-accent/20  transition-all">
                            <Link to="/contact">Contact us directly</Link>
                          </Button>

                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Next Steps Section */}
      <section className=" py-8 md:py-20 w-full   ">
        <div className="container mx-auto  px-4 lg:px-8 xl:px-12 max-w-7xl xl:max-w-[90rem] mx-auto border-t-2 border-border dark:border-white/20">
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
                    className={cn(
                      // Base Styles: Black text in light mode, White text in dark mode
                      "group relative flex flex-col h-full p-8 rounded-[2rem] border-2 transition-all duration-500",
                      "text-black dark:text-white dark:bg-white/[0.01] border-2 border-border dark:border-white/10 ",

                      // Hover State: The Blue Glow & Lift
                      "hover:border-accent hover:dark:border-accent/40 hover:bg-accent/5 dark:hover:bg-accent/10 hover:-translate-y-2 hover:shadow-[0_0_40px_-10px_rgba(59,130,246,0.4)]"
                    )}
                  >
                    <div className="flex flex-col gap-6 flex-1">
                      {/* Icon Container - Matching the service card size/style */}
                      <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-muted dark:bg-white/5 group-hover:bg-accent text-accent group-hover:text-accent-foreground transition-all duration-500">
                        <Icon className="w-8 h-8" />
                      </div>

                      {/* Text Content */}
                      <div className="flex-1">
                        {/* Title - Turns Blue on Hover */}
                        <h4 className="font-bold text-xl sm:text-2xl tracking-tighter uppercase leading-tight mb-3 transition-colors duration-300 group-hover:text-accent">
                          {link.title}
                        </h4>
                        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed group-hover:text-foreground/80 transition-colors">
                          {link.description}
                        </p>
                      </div>

                      {/* Bottom Indicator - Always Visible & Bold */}
                      <div className="flex items-center gap-2 text-sm font-black uppercase tracking-[0.2em] text-muted-foreground/60 group-hover:text-accent transition-all duration-300 mt-auto pt-4">
                        <span>Get Started</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </div>
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
